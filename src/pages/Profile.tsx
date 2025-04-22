
import { User, Book, MessageSquare, Bell, UserCheck, ToggleRight, CloudOff, Heart, Play } from "lucide-react";

export default function Profile() {
  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Details - Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* User Profile Card */}
          <div className="card-pastel p-6 animate-fade-in">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white mb-4">
                <User size={36} />
              </div>
              <h2 className="text-xl font-bold">Alex Johnson</h2>
              <p className="text-gray-500 mb-4">Computer Science Student</p>
              
              <div className="grid grid-cols-3 w-full text-center border-t border-b py-3 mb-4">
                <div>
                  <p className="font-bold">28</p>
                  <p className="text-gray-500 text-xs">Days</p>
                </div>
                <div>
                  <p className="font-bold">42</p>
                  <p className="text-gray-500 text-xs">Reels</p>
                </div>
                <div>
                  <p className="font-bold">5</p>
                  <p className="text-gray-500 text-xs">Buddies</p>
                </div>
              </div>
              
              <button className="btn-pastel-primary w-full">
                <UserCheck size={16} className="mr-2" />
                Find Study Buddies
              </button>
            </div>
          </div>
          
          {/* Settings Card */}
          <div className="card-pastel p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h2 className="font-bold mb-4">Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell size={20} className="mr-3 text-gray-500" />
                  <span>Notifications</span>
                </div>
                <div className="w-10 h-6 bg-pastel-green rounded-full flex items-center justify-end p-1">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ToggleRight size={20} className="mr-3 text-gray-500" />
                  <span>Privacy Mode</span>
                </div>
                <div className="w-10 h-6 bg-gray-300 rounded-full flex items-center justify-start p-1">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CloudOff size={20} className="mr-3 text-gray-500" />
                  <span>Offline Mode</span>
                </div>
                <div className="w-10 h-6 bg-gray-300 rounded-full flex items-center justify-start p-1">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MessageSquare size={20} className="mr-3 text-gray-500" />
                  <span>Voice Check-ins</span>
                </div>
                <div className="w-10 h-6 bg-pastel-green rounded-full flex items-center justify-end p-1">
                  <div className="w-4 h-4 rounded-full bg-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Library & Encouragement - Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Offline Library */}
          <div className="card-pastel p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Offline Library</h2>
              <div className="text-sm text-gray-500">
                <span className="font-medium">250MB</span> / 1GB
              </div>
            </div>
            
            <div className="space-y-4">
              <LibraryItem 
                title="Data Structures Essentials"
                size="45MB"
                progress={100}
                date="Apr 18, 2023"
                type="Course"
              />
              <LibraryItem 
                title="Advanced JavaScript Patterns"
                size="120MB"
                progress={75}
                date="Apr 15, 2023"
                type="Series"
              />
              <LibraryItem 
                title="Algorithm Visualization"
                size="85MB"
                progress={30}
                date="Apr 10, 2023"
                type="Interactive"
              />
            </div>
            
            <button className="mt-4 text-sm text-primary flex items-center">
              <Book size={16} className="mr-1" />
              View All Downloaded Content
            </button>
          </div>
          
          {/* Encouragement Board */}
          <div className="card-pastel p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <h2 className="text-xl font-bold mb-6">Encouragement Board</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EncouragementCard 
                type="Doodle"
                message="You're doing great! Keep it up 🚀"
                color="bg-pastel-yellow"
              />
              <EncouragementCard 
                type="Affirmation"
                message="Smart is not something you are. Smart is something you get through practice."
                color="bg-pastel-blue"
              />
              <EncouragementCard 
                type="Voice Hug"
                message="Click to listen to a supportive message from your study buddy."
                color="bg-pastel-pink"
                hasAudio
              />
              <div className="p-4 border-2 border-dashed rounded-xl flex items-center justify-center min-h-[120px]">
                <button className="text-gray-500 flex flex-col items-center">
                  <Heart size={24} className="mb-2" />
                  <span>Send Encouragement</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LibraryItemProps {
  title: string;
  size: string;
  progress: number;
  date: string;
  type: string;
}

const LibraryItem = ({ title, size, progress, date, type }: LibraryItemProps) => (
  <div className="p-4 bg-pastel-gray/20 rounded-lg">
    <div className="flex justify-between mb-2">
      <h3 className="font-medium">{title}</h3>
      <span className="text-sm text-gray-500">{size}</span>
    </div>
    
    <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
      <div 
        className="bg-primary h-full rounded-full" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    
    <div className="flex justify-between text-xs text-gray-500">
      <span>{date}</span>
      <span className="px-2 py-0.5 bg-pastel-blue/30 rounded-full">
        {type}
      </span>
    </div>
  </div>
);

interface EncouragementCardProps {
  type: string;
  message: string;
  color: string;
  hasAudio?: boolean;
}

const EncouragementCard = ({ type, message, color, hasAudio }: EncouragementCardProps) => (
  <div className={`${color} p-4 rounded-xl`}>
    <div className="flex justify-between items-center mb-2">
      <span className="text-xs font-medium px-2 py-1 bg-white/30 rounded-full">
        {type}
      </span>
      <button className="text-gray-700">
        <Heart size={16} />
      </button>
    </div>
    
    <p className="text-sm mb-2">{message}</p>
    
    {hasAudio && (
      <div className="mt-2 w-full h-6 bg-white/30 rounded-full relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <Play size={14} />
        </div>
      </div>
    )}
  </div>
);
