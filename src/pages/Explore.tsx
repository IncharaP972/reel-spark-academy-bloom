import { useState, useRef, useEffect } from "react";
import { Search, Filter, Clock, FilmIcon, Music, Zap, TrendingUp, Map, Camera, StopCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';

// Component interfaces
interface FilterButtonProps {
  icon: React.ReactNode;
  label: string;
  color: string;
}

interface TrendingItemProps {
  title: string;
  views: string;
}

interface QuestItemProps {
  title: string;
  difficulty: string;
}

// Helper components
const FilterButton = ({ icon, label, color }: FilterButtonProps) => (
  <button className={`${color} flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap`}>
    {icon}
    <span>{label}</span>
  </button>
);

const TrendingItem = ({ title, views }: TrendingItemProps) => (
  <li className="flex items-center justify-between">
    <span className="text-sm font-medium">{title}</span>
    <span className="text-xs text-gray-500">{views} views</span>
  </li>
);

const QuestItem = ({ title, difficulty }: QuestItemProps) => (
  <li className="flex items-center justify-between">
    <span className="text-sm font-medium">{title}</span>
    <span className={`text-xs px-2 py-1 rounded-full ${
      difficulty === "Easy" 
        ? "bg-pastel-green" 
        : difficulty === "Medium" 
          ? "bg-pastel-yellow" 
          : "bg-pastel-orange"
    }`}>
      {difficulty}
    </span>
  </li>
);

export default function Explore() {
  // States
  const [isRecording, setIsRecording] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [cameraError, setCameraError] = useState<string>("");
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [youtubePreview, setYoutubePreview] = useState<string | null>(null);

  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Handle YouTube URL input change
  const handleYoutubeUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(e.target.value);
  };

  // Process YouTube URL
  const processYoutubeUrl = async () => {
    if (!youtubeUrl) return;
    
    setIsLoading(true);
    try {
      // Extract video ID from YouTube URL
      const videoId = youtubeUrl.split('v=')[1]?.split('&')[0] || 
                      youtubeUrl.split('shorts/')[1]?.split('?')[0];
      
      if (!videoId) {
        throw new Error('Invalid YouTube URL');
      }

      // Set preview using video ID
      setYoutubePreview(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
      console.log('Processing video ID:', videoId);
    } catch (err) {
      console.error('Error processing YouTube URL:', err);
      setCameraError('Invalid YouTube URL. Please check the URL and try again.');
    }
    setIsLoading(false);
  };

  // Start camera function
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: true 
      });
      
      setCameraStream(stream);
      setCameraError("");
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError("Unable to access camera. Please check permissions.");
    }
  };

  // Stop camera function
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  // Start recording function
  const startRecording = () => {
    if (!cameraStream) return;
    
    chunksRef.current = [];
    const options = { mimeType: 'video/webm; codecs=vp9' };
    
    try {
      mediaRecorderRef.current = new MediaRecorder(cameraStream, options);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setIsRecording(false);
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error starting recording:", err);
      setCameraError("Unable to start recording. Please try again.");
    }
  };

  // Stop recording function
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Create reel function
  const handleCreateReel = () => {
    if (videoUrl || youtubePreview) {
      setIsLoading(true);
      
      // Create new reel object
      const newReel = {
        id: Date.now(),
        title: "New Reel",  // You can add a title input field if needed
        author: "User",     // You can get this from user context/auth
        likes: 0,
        videoUrl: videoUrl || "",
        thumbnail: youtubePreview || ""
      };

      // Save to localStorage
      const existingReels = JSON.parse(localStorage.getItem('createdReels') || '[]');
      localStorage.setItem('createdReels', JSON.stringify([newReel, ...existingReels]));

      setTimeout(() => {
        setIsLoading(false);
        navigate('/reels');  // Navigate to reels page
      }, 1000);
    }
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [cameraStream, videoUrl]);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Explore Learning Content</h1>
      
      {/* YouTube Reel Creator Tool */}
      <section className="card-pastel p-6 mb-8 animate-fade-in">
        <h2 className="text-xl font-bold mb-4">YouTube Reel Creator</h2>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2 p-3 border rounded-lg">
            <Search size={20} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Paste YouTube URL" 
              className="flex-1 bg-transparent outline-none"
              value={youtubeUrl}
              onChange={handleYoutubeUrlChange}
              onBlur={processYoutubeUrl}
            />
          </div>
          
          {/* Video Preview section */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ minHeight: "400px" }}>
            {cameraStream ? (
              <video 
                ref={videoRef} 
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
            ) : youtubePreview ? (
              <img 
                src={youtubePreview} 
                alt="YouTube Preview" 
                className="w-full h-full object-cover"
              />
            ) : videoUrl ? (
              <video 
                src={videoUrl} 
                controls 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full min-h-48 text-gray-400">
                <FilmIcon size={48} />
              </div>
            )}

            {cameraError && (
              <div className="absolute top-0 left-0 right-0 bg-red-100 text-red-500 p-2 text-sm">
                {cameraError}
              </div>
            )}

            {isRecording && (
              <div className="absolute top-2 right-2 flex items-center bg-red-500 text-white px-2 py-1 rounded-full text-xs animate-pulse">
                <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
                Recording
              </div>
            )}
          </div>

          {/* Camera controls */}
          <div className="flex justify-center space-x-4">
            {!cameraStream ? (
              <button 
                onClick={startCamera}
                className="bg-pastel-blue hover:bg-blue-100 px-4 py-2 rounded-full flex items-center space-x-2"
              >
                <Camera size={18} />
                <span>Start Camera</span>
              </button>
            ) : !isRecording ? (
              <>
                <button 
                  onClick={startRecording}
                  className="bg-pastel-red hover:bg-red-100 px-4 py-2 rounded-full flex items-center space-x-2"
                >
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Record</span>
                </button>
                <button 
                  onClick={stopCamera}
                  className="bg-pastel-gray hover:bg-gray-200 px-4 py-2 rounded-full"
                >
                  Stop Camera
                </button>
              </>
            ) : (
              <button 
                onClick={stopRecording}
                className="bg-pastel-red hover:bg-red-100 px-4 py-2 rounded-full flex items-center space-x-2"
              >
                <StopCircle size={18} />
                <span>Stop Recording</span>
              </button>
            )}
          </div>

          <button 
            onClick={handleCreateReel}
            className={`btn-pastel-primary self-center ${(!cameraStream && !videoUrl && !youtubeUrl) ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!cameraStream && !videoUrl && !youtubeUrl || isLoading}
          >
            {isLoading ? 'Processing...' : 'Create Reel'}
          </button>
        </div>
      </section>

      {/* Filters */}
      <section className="mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
        <h2 className="text-xl font-bold mb-4">Search Filters</h2>
        <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          <FilterButton icon={<Clock size={18} />} label="Slow" color="bg-pastel-blue" />
          <FilterButton icon={<Clock size={18} />} label="Mid" color="bg-pastel-purple" />
          <FilterButton icon={<Clock size={18} />} label="Fast" color="bg-pastel-pink" />
          <FilterButton icon={<FilmIcon size={18} />} label="Video" color="bg-pastel-green" />
          <FilterButton icon={<Music size={18} />} label="Podcast" color="bg-pastel-yellow" />
          <FilterButton icon={<Filter size={18} />} label="Others" color="bg-pastel-red" />
        </div>
      </section>

      {/* Trending section */}
      <section className="animate-fade-in" style={{ animationDelay: "200ms" }}>
        <h2 className="text-xl font-bold mb-4">Trending</h2>
        <ul className="space-y-2">
          <TrendingItem title="React Tips" views="1.5M" />
          <TrendingItem title="JavaScript Deep Dive" views="2.4M" />
          <TrendingItem title="AI for Beginners" views="3.3M" />
        </ul>
      </section>

      {/* Quest section */}
      <section className="animate-fade-in" style={{ animationDelay: "300ms" }}>
        <h2 className="text-xl font-bold mb-4">Quests</h2>
        <ul className="space-y-2">
          <QuestItem title="Build a Website" difficulty="Easy" />
          <QuestItem title="Create a Mobile App" difficulty="Medium" />
          <QuestItem title="Learn Data Science" difficulty="Hard" />
        </ul>
      </section>
    </div>
  );
}