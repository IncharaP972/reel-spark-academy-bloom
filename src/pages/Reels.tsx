
import { useState, useRef } from "react";
import { Lightbulb, HelpCircle, Heart, Bookmark, MessageCircle, Volume2, VolumeX, ChevronUp, ChevronDown } from "lucide-react";

export default function Reels() {
  const [currentReel, setCurrentReel] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [ghostMode, setGhostMode] = useState(false);
  const reelsContainerRef = useRef<HTMLDivElement>(null);
  
  const dummyReels = [
    {
      id: 1,
      title: "Data Structures Simplified",
      author: "CodeMaster",
      likes: 1245,
      videoUrl: "#",
      thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    },
    {
      id: 2,
      title: "React Hooks Advanced Tutorial",
      author: "WebDevPro",
      likes: 890,
      videoUrl: "#",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    },
    {
      id: 3,
      title: "Machine Learning in 60 Seconds",
      author: "AI_Enthusiast",
      likes: 2456,
      videoUrl: "#",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    }
  ];
  
  // Handle scroll with snapping
  const scrollToReel = (index: number) => {
    if (reelsContainerRef.current) {
      const height = reelsContainerRef.current.clientHeight;
      reelsContainerRef.current.scrollTo({
        top: height * index,
        behavior: 'smooth'
      });
      setCurrentReel(index);
    }
  };

  return (
    <div className="h-full flex">
      {/* Main Reels Area */}
      <div 
        ref={reelsContainerRef}
        className="reel-container flex-1"
      >
        {dummyReels.map((reel, index) => (
          <div key={reel.id} className="reel-item relative">
            {/* Video/Thumbnail Background */}
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src={reel.thumbnail} 
                alt={reel.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
            
            {/* Reel Content */}
            <div className="relative z-10 max-w-lg p-4 flex flex-col h-full">
              <div className="flex-1 flex flex-col justify-center items-center text-white">
                <h2 className="text-2xl font-bold mb-2">{reel.title}</h2>
                <p className="text-lg">By {reel.author}</p>
                
                {/* Interactive Elements */}
                <div className="mt-8 flex space-x-6">
                  <button className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-1">
                      <Lightbulb size={24} />
                    </div>
                    <span className="text-sm">Insights</span>
                  </button>
                  
                  <button className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-1">
                      <HelpCircle size={24} />
                    </div>
                    <span className="text-sm">Ask</span>
                  </button>
                </div>
              </div>
              
              {/* Bottom Controls */}
              <div className="pb-4 pt-8 flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <button onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </button>
                </div>
                
                {!ghostMode && (
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1">
                      <Heart size={24} />
                      <span>{reel.likes}</span>
                    </button>
                    <button>
                      <MessageCircle size={24} />
                    </button>
                    <button>
                      <Bookmark size={24} />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Navigation Arrows */}
            {index > 0 && (
              <button 
                className="absolute top-1/2 left-4 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                onClick={() => scrollToReel(index - 1)}
              >
                <ChevronUp size={24} className="text-white" />
              </button>
            )}
            
            {index < dummyReels.length - 1 && (
              <button 
                className="absolute top-1/2 right-4 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                onClick={() => scrollToReel(index + 1)}
              >
                <ChevronDown size={24} className="text-white" />
              </button>
            )}
          </div>
        ))}
      </div>
      
      {/* Sidebar */}
      <div className="hidden lg:block w-80 p-4 border-l bg-white soft-shadow animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">Study Assistant</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Ghost Mode</span>
            <button 
              onClick={() => setGhostMode(!ghostMode)}
              className={`w-10 h-6 rounded-full flex items-center ${ghostMode ? 'bg-primary justify-end' : 'bg-gray-300 justify-start'}`}
            >
              <div className="w-4 h-4 m-1 rounded-full bg-white"></div>
            </button>
          </div>
        </div>
        
        {/* Summary Section */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Quick Summary</h4>
          <p className="text-sm text-gray-600">
            This reel covers the fundamentals of {dummyReels[currentReel].title}. 
            The key concepts explained include organization, implementation, and optimization.
          </p>
        </div>
        
        {/* Save Options */}
        <div className="mb-6">
          <h4 className="font-medium mb-2">Save For Later</h4>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-3 bg-pastel-purple/30 rounded-lg text-sm">
              Add to Flashcards
            </button>
            <button className="p-3 bg-pastel-green/30 rounded-lg text-sm">
              Save to Collection
            </button>
          </div>
        </div>
        
        {/* Comments Section */}
        <div>
          <h4 className="font-medium mb-2">Voice Comments</h4>
          <button className="w-full p-3 border border-dashed rounded-lg flex items-center justify-center text-gray-500 mb-3">
            <MessageCircle size={18} className="mr-2" />
            Record Voice Note
          </button>
          
          <div className="space-y-3">
            <div className="p-3 bg-pastel-gray rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-sm">Sarah K.</span>
                <span className="text-xs text-gray-500">2h ago</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-full h-8 bg-gray-200 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-gray-500">1:24</span>
                  </div>
                </div>
                <button className="text-gray-500">
                  <Volume2 size={16} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                "Great explanation of the concept..."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
