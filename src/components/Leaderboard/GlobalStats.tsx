import { useState, useEffect } from 'react';
import { Users, Egg } from 'lucide-react';
import { DatabaseService } from '@/services/DatabaseService';

interface GlobalStats {
  totalUsers: number;
  totalEggs: number;
  totalEggsHatched: number;
}

export function GlobalStats() {
  const [stats, setStats] = useState<GlobalStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await DatabaseService.getGlobalStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching global stats:', error);
      }
    };

    fetchStats();
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto px-6">
      <div className="glass-card rounded-xl p-4 flex items-center gap-4">
        <div className="p-3 rounded-lg bg-purple-500/20">
          <Users className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <p className="text-sm text-gray-400">Jugadores Totales</p>
          <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-4 flex items-center gap-4">
        <div className="p-3 rounded-lg bg-blue-500/20">
          <Egg className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <p className="text-sm text-gray-400">Huevos Totales</p>
          <p className="text-2xl font-bold">{stats.totalEggs.toLocaleString()}</p>
        </div>
      </div>

      <div className="glass-card rounded-xl p-4 flex items-center gap-4">
        <div className="p-3 rounded-lg bg-green-500/20">
          <Egg className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <p className="text-sm text-gray-400">Huevos Eclosionados</p>
          <p className="text-2xl font-bold">{stats.totalEggsHatched.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
} 