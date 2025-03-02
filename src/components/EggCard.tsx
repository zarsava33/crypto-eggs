import { Egg } from 'lucide-react';

interface EggCardProps {
  type: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress: number;
  timeRemaining: number;
  onClick?: () => void;
}

const rarityColors = {
  common: 'text-gray-400',
  rare: 'text-blue-400',
  epic: 'text-purple-400',
  legendary: 'text-yellow-400'
};

export function EggCard({ type, rarity, progress, timeRemaining, onClick }: EggCardProps) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div 
      className="glass-card p-4 rounded-xl cursor-pointer hover:bg-white/5 transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative flex flex-col items-center">
        <Egg size={48} className={`${rarityColors[rarity]} animate-float`} />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-full animate-pulse-slow" />
      </div>
      
      <div className="mt-4 text-center">
        <h3 className={`font-medium ${rarityColors[rarity]}`}>{type}</h3>
        <p className="text-sm text-gray-400 mt-1">
          {timeRemaining > 0 
            ? `${minutes}:${seconds.toString().padStart(2, '0')}`
            : 'Listo para eclosionar'}
        </p>
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">Progreso</span>
          <span className={`text-xs ${rarityColors[rarity]}`}>{progress}%</span>
        </div>
        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}