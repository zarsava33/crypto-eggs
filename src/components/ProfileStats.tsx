import { Trophy } from 'lucide-react';
import type { GameState } from '../types';

interface ProfileStatsProps {
  gameState: GameState;
}

export function ProfileStats({ gameState }: ProfileStatsProps) {
  return (
    <div className="glass-card rounded-xl p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <Trophy className="text-yellow-400 animate-pulse" />
        <h3 className="text-xl font-bold">Statistics</h3>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Total Eggs:</span>
          <span className="font-semibold text-yellow-400">{gameState.totalEggsCollected}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Balance:</span>
          <span className="font-semibold text-green-400">${gameState.money.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Active Eggs:</span>
          <span className="font-semibold text-purple-400">{gameState.eggs.length}</span>
        </div>
      </div>
    </div>
  );
} 