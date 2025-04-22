
import { useState } from "react";
import { Play, Pause, SkipForward, Music, Clock, Wind, Settings, CheckCircle } from "lucide-react";

export default function Dashboard() {
  const [isPomodoro, setIsPomodoro] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [completedSessions, setCompletedSessions] = useState(2);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Productivity Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Pomodoro and Power Nap */}
        <div className="lg:col-span-2 space-y-6">
          {/* Timer Card */}
          <div className="card-pastel p-6 animate-fade-in">
            {/* Tabs */}
            <div className="flex space-x-2 mb-6">
              <button 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${isPomodoro ? 'bg-primary text-white' : 'bg-gray-100'}`}
                onClick={() => setIsPomodoro(true)}
              >
                Hyperfocus Pomodoro
              </button>
              <button 
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!isPomodoro ? 'bg-primary text-white' : 'bg-gray-100'}`}
                onClick={() => setIsPomodoro(false)}
              >
                Power Nap
              </button>
            </div>
            
            {/* Timer Display */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 mb-6">
                {/* Circular Progress */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#f1f1f1" 
                    strokeWidth="8"
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke={isPomodoro ? "rgb(var(--primary) / 1)" : "#FEC6A1"} 
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset="100" // This would be dynamic based on time progress
                    strokeLinecap="round"
                  />
                </svg>
                {/* Time Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold">{formatTime(timeLeft)}</span>
                  <span className="text-gray-500 text-sm mt-2">
                    {isPomodoro ? "Focus Session" : "Power Nap"}
                  </span>
                </div>
              </div>
              
              {/* Timer Controls */}
              <div className="flex space-x-4 mb-6">
                {isRunning ? (
                  <button 
                    className="w-12 h-12 rounded-full bg-pastel-pink flex items-center justify-center"
                    onClick={() => setIsRunning(false)}
                  >
                    <Pause size={24} />
                  </button>
                ) : (
                  <button 
                    className="w-12 h-12 rounded-full bg-pastel-green flex items-center justify-center"
                    onClick={() => setIsRunning(true)}
                  >
                    <Play size={24} />
                  </button>
                )}
                <button className="w-12 h-12 rounded-full bg-pastel-yellow flex items-center justify-center">
                  <SkipForward size={24} />
                </button>
                <button className="w-12 h-12 rounded-full bg-pastel-blue flex items-center justify-center">
                  <Settings size={24} />
                </button>
              </div>
              
              {/* Session Info */}
              {isPomodoro ? (
                <div className="grid grid-cols-3 w-full max-w-md text-center">
                  <div>
                    <p className="text-gray-500 text-sm">Sessions</p>
                    <p className="font-bold">{completedSessions}/4</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Focus Time</p>
                    <p className="font-bold">25:00</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Break Time</p>
                    <p className="font-bold">5:00</p>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-md space-y-4">
                  <p className="text-center text-gray-600">
                    Power nap with nature sounds to help you recharge
                  </p>
                  <div className="flex justify-center space-x-3">
                    <button className="p-2 bg-pastel-blue rounded-full">
                      <Wind size={20} />
                    </button>
                    <button className="p-2 bg-pastel-green rounded-full">
                      <Music size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Stats Card */}
          <div className="card-pastel p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h2 className="text-xl font-bold mb-4">Today's Progress</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard 
                title="Focus Time" 
                value="2h 15m" 
                color="bg-pastel-purple" 
                icon={<Clock size={20} />} 
              />
              <StatCard 
                title="Completed" 
                value="5 Tasks" 
                color="bg-pastel-green" 
                icon={<CheckCircle size={20} />} 
              />
              <StatCard 
                title="Streak" 
                value="4 Days" 
                color="bg-pastel-yellow" 
                icon={<CheckCircle size={20} />} 
              />
              <StatCard 
                title="Next Break" 
                value="25m" 
                color="bg-pastel-blue" 
                icon={<Clock size={20} />} 
              />
            </div>
          </div>
        </div>
        
        {/* Right Column - Meditation and Mini-games */}
        <div className="space-y-6">
          {/* Meditation Zone */}
          <div className="card-pastel overflow-hidden animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Meditation Zone</h2>
              <p className="text-gray-600 mb-6">Take a moment to clear your mind and relax.</p>
              
              <div className="space-y-4">
                <MeditationOption
                  title="Breathing Exercise"
                  color="bg-gradient-to-r from-pastel-blue to-pastel-purple"
                  duration="3 min"
                />
                <MeditationOption
                  title="Guided Meditation"
                  color="bg-gradient-to-r from-pastel-green to-pastel-blue"
                  duration="5 min"
                />
                <MeditationOption
                  title="Mindful Focus"
                  color="bg-gradient-to-r from-pastel-yellow to-pastel-orange"
                  duration="8 min"
                />
              </div>
            </div>
            
            {/* Bubble Wrap Section */}
            <div className="p-6 bg-pastel-gray/50 border-t">
              <h3 className="font-medium mb-3">Stress Relief</h3>
              <div className="grid grid-cols-5 gap-2">
                {[...Array(10)].map((_, i) => (
                  <button 
                    key={i}
                    className="aspect-square rounded-full bg-white/80 shadow-sm hover:shadow-md active:scale-90 transition-all duration-150"
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">Pop the bubbles for instant calm</p>
            </div>
          </div>
          
          {/* Micro-Win Widget */}
          <div className="card-pastel p-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <h2 className="text-xl font-bold mb-4">Micro-Win Tracker</h2>
            <p className="text-gray-600 mb-6">Celebrate small achievements!</p>
            
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-pastel-green/20 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-pastel-green flex items-center justify-center mr-3">
                  <CheckCircle size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Completed 2 Pomodoro sessions</p>
                  <p className="text-xs text-gray-500">Today at 10:45 AM</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-pastel-yellow/20 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-pastel-yellow flex items-center justify-center mr-3">
                  <CheckCircle size={16} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">Watched 3 educational reels</p>
                  <p className="text-xs text-gray-500">Today at 09:15 AM</p>
                </div>
              </div>
              
              <button className="w-full p-3 border border-dashed rounded-lg text-gray-500 text-sm">
                + Add a new micro-win
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  color: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, color, icon }: StatCardProps) => (
  <div className="p-4 rounded-xl bg-white soft-shadow">
    <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center mb-2`}>
      {icon}
    </div>
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="font-bold">{value}</p>
  </div>
);

interface MeditationOptionProps {
  title: string;
  color: string;
  duration: string;
}

const MeditationOption = ({ title, color, duration }: MeditationOptionProps) => (
  <div className={`p-4 rounded-xl ${color} flex items-center justify-between`}>
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-xs">{duration}</p>
    </div>
    <button className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
      <Play size={16} />
    </button>
  </div>
);
