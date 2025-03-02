import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

interface BoosterTimerProps {
  duration: number;
  multiplier: number;
  type: 'mining' | 'hatching' | 'experience';
}

const typeColors = {
  mining: 'text-yellow-400',
  hatching: 'text-purple-400',
  experience: 'text-blue-400'
};

export function BoosterTimer({ duration, multiplier, type }: BoosterTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="glass-card p-4 rounded-xl">
      <div className="flex items-center gap-3">
        <Zap className={typeColors[type]} size={20} />
        <div>
          <p className="text-sm text-gray-400">
            Potenciador de {type === 'mining' ? 'Minería' : type === 'hatching' ? 'Incubación' : 'Experiencia'}
          </p>
          <div className="flex items-center gap-2">
            <p className={`text-xl font-bold ${typeColors[type]}`}>
              {minutes}:{seconds.toString().padStart(2, '0')}
            </p>
            <p className="text-sm text-gray-400">
              ({multiplier}x)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}