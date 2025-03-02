import { Egg } from 'lucide-react';
import { EggStatus } from '../types';

interface EggCardProps {
  id: string;
  type: string;
  status: EggStatus;
  progress: number;
  timeRemaining: number;
  onCollect: () => void;
}

const rarityColors = {
  common: 'text-gray-400',
  rare: 'text-blue-400',
  epic: 'text-purple-400',
  legendary: 'text-yellow-400'
};

export function EggCard({ id, type, status, progress, timeRemaining, onCollect }: EggCardProps) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-[1.02]">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="text-5xl transform hover:scale-110 transition-transform duration-300 hover:rotate-12">
            {type === 'egg' ? '🥚' : '🐣'}
          </div>
          {status === 'incubating' && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4">
              <div className="animate-spin text-purple-400">⚡</div>
            </div>
          )}
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-lg font-semibold text-white">{type}</h3>
          <p className="text-sm text-gray-400 capitalize">{status}</p>
        </div>

        {status === 'incubating' && (
          <div className="w-full space-y-2">
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-center text-gray-400">
              {Math.floor(timeRemaining / 1000)} segundos restantes
            </p>
          </div>
        )}

        {status === 'ready' && (
          <button
            onClick={onCollect}
            className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium 
                     hover:opacity-90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 
                     focus:ring-purple-500 focus:ring-opacity-50"
          >
            Recolectar
          </button>
        )}
      </div>
    </div>
  );
}

export default EggCard;