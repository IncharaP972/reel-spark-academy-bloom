
import { Search, Filter, Clock, FilmIcon, Music, Zap, TrendingUp, Map } from "lucide-react";

export default function Explore() {
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
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-pastel-green p-4 rounded-xl">
              <h3 className="font-medium mb-2">Auto-Caption</h3>
              <p className="text-sm text-gray-600">Extract captions from video content</p>
            </div>
            <div className="bg-pastel-yellow p-4 rounded-xl">
              <h3 className="font-medium mb-2">Highlight Tagging</h3>
              <p className="text-sm text-gray-600">Mark important parts for review</p>
            </div>
            <div className="bg-pastel-peach p-4 rounded-xl">
              <h3 className="font-medium mb-2">Clip Segments</h3>
              <p className="text-sm text-gray-600">Cut video into focused snippets</p>
            </div>
          </div>
          
          <button className="btn-pastel-primary self-center">Create Reel</button>
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
          <FilterButton icon={<Filter size={18} />} label="Quiz" color="bg-pastel-orange" />
          <FilterButton icon={<Zap size={18} />} label="Low Energy" color="bg-pastel-blue" />
          <FilterButton icon={<Zap size={18} />} label="Hyper" color="bg-pastel-pink" />
        </div>
      </section>
      
      {/* AI Section */}
      <section className="animate-fade-in" style={{ animationDelay: "200ms" }}>
        <h2 className="text-xl font-bold mb-4">AI Learning Paths</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Trending Now */}
          <div className="card-pastel overflow-hidden">
            <div className="bg-gradient-to-r from-pastel-pink to-pastel-purple p-4">
              <div className="flex items-center space-x-2 mb-1">
                <TrendingUp size={18} className="text-primary" />
                <h3 className="font-bold">Trending Now</h3>
              </div>
              <p className="text-sm">Popular topics in your field</p>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                <TrendingItem title="Machine Learning Basics" views="2.4k" />
                <TrendingItem title="JavaScript ES2023 Features" views="1.8k" />
                <TrendingItem title="Design System Fundamentals" views="1.2k" />
              </ul>
            </div>
          </div>
          
          {/* Side Quests */}
          <div className="card-pastel overflow-hidden">
            <div className="bg-gradient-to-r from-pastel-blue to-pastel-green p-4">
              <div className="flex items-center space-x-2 mb-1">
                <Map size={18} className="text-primary" />
                <h3 className="font-bold">Side Quests</h3>
              </div>
              <p className="text-sm">Expand your knowledge</p>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                <QuestItem title="Intro to Cloud Computing" difficulty="Easy" />
                <QuestItem title="Blockchain Development" difficulty="Medium" />
                <QuestItem title="Advanced AI Algorithms" difficulty="Hard" />
              </ul>
            </div>
          </div>
          
          {/* Memory Island */}
          <div className="card-pastel overflow-hidden">
            <div className="bg-gradient-to-r from-pastel-orange to-pastel-yellow p-4">
              <div className="flex items-center space-x-2 mb-1">
                <Map size={18} className="text-primary" />
                <h3 className="font-bold">Memory Island</h3>
              </div>
              <p className="text-sm">Visualize your progress</p>
            </div>
            <div className="p-4 flex items-center justify-center">
              <div className="relative w-full h-40">
                {/* This would be a visual tree of progress */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-24 bg-pastel-green rounded-t-lg"></div>
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-24 h-12 bg-pastel-blue rounded-lg flex items-center justify-center text-xs font-medium">
                  50% Complete
                </div>
                <div className="absolute bottom-0 left-1/4 w-8 h-16 bg-pastel-yellow rounded-t-lg"></div>
                <div className="absolute bottom-0 right-1/4 w-8 h-12 bg-pastel-purple rounded-t-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

interface FilterButtonProps {
  icon: React.ReactNode;
  label: string;
  color: string;
}

const FilterButton = ({ icon, label, color }: FilterButtonProps) => (
  <button className={`${color} flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap`}>
    {icon}
    <span>{label}</span>
  </button>
);

interface TrendingItemProps {
  title: string;
  views: string;
}

const TrendingItem = ({ title, views }: TrendingItemProps) => (
  <li className="flex items-center justify-between">
    <span className="text-sm font-medium">{title}</span>
    <span className="text-xs text-gray-500">{views} views</span>
  </li>
);

interface QuestItemProps {
  title: string;
  difficulty: string;
}

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
