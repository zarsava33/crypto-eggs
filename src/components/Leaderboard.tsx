import React from 'react';
import { Trophy } from 'lucide-react';
import { Player } from '../types';

interface LeaderboardProps {
  players: Player[];
}

export function Leaderboard({ players }: LeaderboardProps) {
  const sortedPlayers = [...players].sort((a, b) => {
    const aTotal = a.totalEggsCollected || 0;
    const bTotal = b.totalEggsCollected || 0;
    return bTotal - aTotal;
  });

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="text-yellow-400" />
        <h3 className="text-xl font-bold">Top Players</h3>
      </div>

      <div className="space-y-4">
        {sortedPlayers.slice(0, 10).map((player, index) => (
          <div
            key={player.address || index}
            className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 font-bold">
                {index + 1}
              </div>
              <div>
                <div className="font-semibold">{player.username || 'Anonymous'}</div>
                <div className="text-sm text-gray-400">
                  {player.address ? `${player.address.slice(0, 6)}...${player.address.slice(-4)}` : 'No address'}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">{player.totalEggsCollected || 0}</div>
              <div className="text-sm text-gray-400">eggs</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}