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
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex flex-col items-center space-y-4">
        <div className="text-4xl">{type === 'egg' ? '🥚' : '🐣'}</div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">{type}</h3>
          <p className="text-sm text-gray-400">Estado: {status}</p>
        </div>
        {status === 'incubating' && (
          <div className="w-full">
            <div className="h-2 bg-gray-700 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {Math.floor(timeRemaining / 1000)} segundos restantes
            </p>
          </div>
        )}
        {status === 'ready' && (
          <button
            onClick={onCollect}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-medium hover:opacity-90 transition-opacity"
          >
            Recolectar
          </button>
        )}
      </div>
    </div>
  );
}

export default EggCard;