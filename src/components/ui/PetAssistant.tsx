
import { useState } from "react";

interface PetAssistantProps {
  onClick: () => void;
}

export default function PetAssistant({ onClick }: PetAssistantProps) {
  const [isWaving, setIsWaving] = useState(false);

  const handleMouseEnter = () => {
    setIsWaving(true);
  };

  const handleMouseLeave = () => {
    setIsWaving(false);
  };

  return (
    <div 
      className="pet-assistant z-50 cursor-pointer"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg ${isWaving ? 'animate-bounce' : 'animate-float'}`}>
        <span className="text-2xl">🦊</span>
      </div>
      {isWaving && (
        <div className="absolute -top-8 right-0 bg-white px-3 py-1 rounded-full text-sm shadow-md animate-fade-in">
          Hi there!
        </div>
      )}
    </div>
  );
}
