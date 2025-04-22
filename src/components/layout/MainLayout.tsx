
import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, Compass, BarChart2, User, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import PetAssistant from "../ui/PetAssistant";

export default function MainLayout() {
  const location = useLocation();
  const [showChatbot, setShowChatbot] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile Header */}
      <header className="lg:hidden p-4 flex items-center justify-between border-b">
        <Link to="/" className="text-xl font-bold text-primary">KSIT Hackathon</Link>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full bg-pastel-purple text-primary">
            <MessageCircle size={20} />
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation (desktop) */}
        <nav className="hidden lg:flex flex-col w-64 p-6 border-r bg-pastel-gray/30">
          <div className="mb-8">
            <Link to="/" className="text-2xl font-bold text-primary">KSIT Hackathon</Link>
          </div>
          
          <div className="flex flex-col space-y-2 flex-1">
            <NavItem to="/" icon={<Home size={20} />} label="Explore" isActive={isActive("/")} />
            <NavItem to="/reels" icon={<Compass size={20} />} label="Reels" isActive={isActive("/reels")} />
            <NavItem to="/dashboard" icon={<BarChart2 size={20} />} label="Dashboard" isActive={isActive("/dashboard")} />
            <NavItem to="/profile" icon={<User size={20} />} label="Profile" isActive={isActive("/profile")} />
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Bottom Navigation (mobile) */}
      <nav className="lg:hidden flex items-center justify-around p-3 border-t bg-white">
        <NavIcon to="/" icon={<Home size={24} />} isActive={isActive("/")} />
        <NavIcon to="/reels" icon={<Compass size={24} />} isActive={isActive("/reels")} />
        <NavIcon to="/dashboard" icon={<BarChart2 size={24} />} isActive={isActive("/dashboard")} />
        <NavIcon to="/profile" icon={<User size={24} />} isActive={isActive("/profile")} />
      </nav>

      {/* Pet Assistant */}
      <PetAssistant onClick={() => setShowChatbot(!showChatbot)} />

      {/* Chatbot Bubble */}
      {showChatbot && (
        <div className="chatbot-bubble glassmorphism bg-white animate-fade-in z-50">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">Study Buddy</h4>
            <button onClick={() => setShowChatbot(false)} className="text-gray-500">
              <X size={16} />
            </button>
          </div>
          <p className="text-sm text-gray-600">
            Need help focusing today? I can set up a Pomodoro timer or suggest a quick meditation!
          </p>
          <div className="mt-3 flex space-x-2">
            <button className="px-3 py-1 text-xs bg-pastel-blue rounded-full">
              Pomodoro
            </button>
            <button className="px-3 py-1 text-xs bg-pastel-green rounded-full">
              Meditate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 p-3 rounded-xl transition-colors ${
      isActive 
        ? "bg-primary text-white" 
        : "hover:bg-pastel-purple/30 text-gray-700"
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

interface NavIconProps {
  to: string;
  icon: React.ReactNode;
  isActive: boolean;
}

const NavIcon = ({ to, icon, isActive }: NavIconProps) => (
  <Link
    to={to}
    className={`p-2 rounded-full ${
      isActive 
        ? "text-primary" 
        : "text-gray-500"
    }`}
  >
    {icon}
  </Link>
);
