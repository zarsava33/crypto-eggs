import { useState } from 'react';
import { Users } from 'lucide-react';
import { Leaderboard } from '../components/Leaderboard';
import { ReferralSystem } from '../components/ReferralSystem';
import { GAME_CONFIG } from '../config/constants';
import type { Player } from '../types';

const MOCK_PLAYERS: Player[] = [
  {
    id: '1',
    username: 'CryptoMaster',
    totalEggsCollected: 150,
    level: 10,
    experience: 1500,
    lastActive: Date.now()
  },
  {
    id: '2',
    username: 'EggCollector',
    totalEggsCollected: 120,
    level: 8,
    experience: 1200,
    lastActive: Date.now()
  },
  {
    id: '3',
    username: 'BlockchainFarmer',
    totalEggsCollected: 100,
    level: 7,
    experience: 1000,
    lastActive: Date.now()
  }
];

export function FriendsSection() {
  const [players] = useState<Player[]>(MOCK_PLAYERS);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Users className="text-purple-400" />
        <h2 className="text-2xl font-bold">Friends & Leaderboard</h2>
      </div>

      <div className="space-y-8">
        <ReferralSystem
          onCopySuccess={() => alert('Referral link copied!')}
          referralBonus={GAME_CONFIG.REFERRAL_BONUS}
        />
        <Leaderboard players={players} />
      </div>
    </div>
  );
}