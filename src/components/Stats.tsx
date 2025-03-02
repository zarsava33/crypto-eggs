import { useGame } from '../contexts/GameContext';
import { Trophy, Egg, Coins } from 'lucide-react';

export function Stats() {
  const { state } = useGame();

  const stats = [
    {
      icon: Trophy,
      label: 'Nivel',
      value: state.level,
      color: 'text-yellow-400'
    },
    {
      icon: Egg,
      label: 'Huevos Incubados',
      value: state.eggsHatched,
      color: 'text-purple-400'
    },
    {
      icon: Coins,
      label: 'Monedas',
      value: Math.floor(state.coins),
      color: 'text-blue-400'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map(({ icon: Icon, label, value, color }) => (
        <div key={label} className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-3">
            <Icon className={`${color}`} size={20} />
            <div>
              <p className="text-sm text-gray-400">{label}</p>
              <p className={`text-xl font-bold ${color}`}>{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 