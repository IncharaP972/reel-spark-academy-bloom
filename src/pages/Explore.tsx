import { useState, useRef, useEffect } from "react";
import { Search, Filter, Clock, FilmIcon, Music, Zap, TrendingUp, Map, Camera, StopCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Interfaces
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

interface VideoAnalysis {
  isEducational: boolean;
  topics: string[];
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
      difficulty === "Easy" ? "bg-pastel-green" :
      difficulty === "Medium" ? "bg-pastel-yellow" :
      "bg-pastel-orange"
    }`}>
      {difficulty}
    </span>
  </li>
);

// Main Component
export default function Explore() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [isRecording, setIsRecording] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [cameraError, setCameraError] = useState<string>("");
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [youtubePreview, setYoutubePreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<VideoAnalysis | null>(null);

  const educationalKeywords = [
    "learn", "education", "tutorial", "course", "programming", "science", "math", "history",
    "skills", "development", "training", "guide", "lesson", "howto", "explanation",
    "javascript", "python", "typescript", "react", "nodejs", "frontend", "backend", "database",
    "cloud", "aws", "ml", "ai", "iot", "dsa", "sql", "web development"
  ];

  const handleYoutubeUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(e.target.value);
  };

  const startCamera = async () => {
    try {
      const permissions = await Promise.all([
        navigator.permissions.query({ name: 'camera' as PermissionName }),
        navigator.permissions.query({ name: 'microphone' as PermissionName })
      ]);

      if (permissions.some(perm => perm.state === 'denied')) {
        setCameraError("Camera or microphone access denied. Please enable permissions in your browser settings.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true
      });

      setCameraStream(stream);
      setCameraError("");
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      if ((err as Error).name === 'NotAllowedError') {
        setCameraError("Please allow camera and microphone access to record reels.");
      } else if ((err as Error).name === 'NotFoundError') {
        setCameraError("No camera or microphone found. Please check your devices.");
      } else {
        setCameraError("Unable to access camera. Please check your device settings.");
      }
    }
  };

  const startRecording = () => {
    if (!cameraStream) return;

    chunksRef.current = [];
    try {
      const options = [
        { mimeType: 'video/webm;codecs=vp9,opus' },
        { mimeType: 'video/webm;codecs=vp8,opus' },
        { mimeType: 'video/webm' },
        { mimeType: 'video/mp4' }
      ];

      let selectedOptions;
      for (const option of options) {
        if (MediaRecorder.isTypeSupported(option.mimeType)) {
          selectedOptions = option;
          break;
        }
      }

      if (!selectedOptions) {
        throw new Error('No supported media recorder format found');
      }

      mediaRecorderRef.current = new MediaRecorder(cameraStream, selectedOptions);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: selectedOptions.mimeType });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setIsRecording(false);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Recording error:", err);
      setCameraError("Unable to start recording. Your browser might not support video recording.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const analyzeVideoMetadata = async (videoId: string) => {
    try {
      const response = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
      const data = await response.json();

      const metadataText = (data.title + " " + (data.description || "")).toLowerCase();
      const educationalMatches = educationalKeywords.filter(keyword => metadataText.includes(keyword));
      const isEducational = educationalMatches.length > 0 || (data.duration_seconds && data.duration_seconds > 60);

      setAnalysisResult({ isEducational, topics: educationalMatches });
      return isEducational;
    } catch (err) {
      console.error("Error fetching metadata:", err);
      setCameraError("Unable to fetch video details.");
      return false;
    }
  };

  const processYoutubeUrl = async () => {
    if (!youtubeUrl) return;
    setIsLoading(true);
    try {
      const videoId = youtubeUrl.split("v=")[1]?.split("&")[0] || youtubeUrl.split("shorts/")[1]?.split("?")[0];
      if (!videoId) throw new Error("Invalid URL");

      const isEducational = await analyzeVideoMetadata(videoId);

      if (isEducational) {
        setYoutubePreview(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);
      } else {
        setCameraError("This video does not appear to be educational content.");
      }
    } catch (err) {
      console.error("Error processing YouTube URL:", err);
      setCameraError("Invalid YouTube URL or unable to analyze content.");
    }
    setIsLoading(false);
  };

  const handleCreateReel = () => {
    if ((videoUrl || youtubePreview) && (!youtubePreview || analysisResult?.isEducational)) {
      setIsLoading(true);

      const newReel = {
        id: Date.now(),
        title: "New Reel",
        author: "User",
        likes: 0,
        videoUrl: videoUrl || "",
        thumbnail: youtubePreview || "",
        topics: analysisResult?.topics || [],
        isEducational: true
      };

      const existingReels = JSON.parse(localStorage.getItem("createdReels") || "[]");
      localStorage.setItem("createdReels", JSON.stringify([newReel, ...existingReels]));

      setTimeout(() => {
        setIsLoading(false);
        navigate("/reels");
      }, 1000);
    }
  };

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

      {/* YouTube Reel Creator */}
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

          <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ minHeight: "400px" }}>
            {cameraStream ? (
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            ) : youtubePreview ? (
              <img src={youtubePreview} alt="YouTube Preview" className="w-full h-full object-cover" />
            ) : videoUrl ? (
              <video src={videoUrl} controls className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <FilmIcon size={48} />
              </div>
            )}

            {cameraError && (
              <div className="absolute top-0 left-0 right-0 bg-red-100 text-red-500 p-2 text-sm">{cameraError}</div>
            )}

            {isRecording && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs animate-pulse">
                Recording
              </div>
            )}
          </div>

          {/* Camera Controls */}
          <div className="flex justify-center space-x-4">
            {!cameraStream ? (
              <button onClick={startCamera} className="bg-pastel-blue hover:bg-blue-100 px-4 py-2 rounded-full flex items-center space-x-2">
                <Camera size={18} /> <span>Start Camera</span>
              </button>
            ) : !isRecording ? (
              <>
                <button onClick={startRecording} className="bg-pastel-red hover:bg-red-100 px-4 py-2 rounded-full flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div> <span>Record</span>
                </button>
                <button onClick={stopCamera} className="bg-pastel-gray hover:bg-gray-200 px-4 py-2 rounded-full">Stop Camera</button>
              </>
            ) : (
              <button onClick={stopRecording} className="bg-pastel-red hover:bg-red-100 px-4 py-2 rounded-full flex items-center space-x-2">
                <StopCircle size={18} /> <span>Stop Recording</span>
              </button>
            )}
          </div>

          <button
            onClick={handleCreateReel}
            disabled={!cameraStream && !videoUrl && !youtubeUrl || isLoading}
            className={`btn-pastel-primary self-center ${(!cameraStream && !videoUrl && !youtubeUrl) ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Processing..." : "Create Reel"}
          </button>
        </div>
      </section>
    </div>
  );
}
