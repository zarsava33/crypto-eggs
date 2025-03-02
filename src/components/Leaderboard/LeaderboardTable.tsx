import { useState, useEffect } from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { DatabaseService } from '@/services/DatabaseService';

type LeaderboardCategory = 'daily' | 'weekly' | 'all-time';

interface LeaderboardEntry {
  id: string;
  score: number;
  user: {
    username: string;
  };
  createdAt: Date;
}

const CATEGORIES: LeaderboardCategory[] = ['daily', 'weekly', 'all-time'];

const getRankIcon = (position: number) => {
  switch (position) {
    case 0:
      return <Trophy className="w-6 h-6 text-yellow-400 animate-pulse" />;
    case 1:
      return <Medal className="w-6 h-6 text-gray-400" />;
    case 2:
      return <Award className="w-6 h-6 text-amber-600" />;
    default:
      return null;
  }
};

export function LeaderboardTable() {
  const [category, setCategory] = useState<LeaderboardCategory>('daily');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const data = await DatabaseService.getLeaderboard(category);
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchLeaderboard, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [category]);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="glass-card rounded-2xl p-6 space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold gradient-text">Tabla de Líderes</h2>
          <div className="flex gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  category === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5">
                  <th className="px-6 py-4 text-left">Posición</th>
                  <th className="px-6 py-4 text-left">Jugador</th>
                  <th className="px-6 py-4 text-right">Puntuación</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className="border-t border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 flex items-center gap-2">
                      {getRankIcon(index)}
                      <span className={index < 3 ? 'font-bold' : ''}>
                        #{index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4">{entry.user.username}</td>
                    <td className="px-6 py-4 text-right font-mono">
                      {entry.score.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 