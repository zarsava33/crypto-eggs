import { Activity } from 'lucide-react';
import type { Egg } from '../types';

interface ActivityStatsProps {
  eggs: Egg[];
}

export function ActivityStats({ eggs }: ActivityStatsProps) {
  const incubatingEggs = eggs.filter(egg => egg.status === 'incubating').length;
  const readyEggs = eggs.filter(egg => egg.status === 'ready').length;
  const hatchedEggs = eggs.filter(egg => egg.status === 'hatched').length;

  return (
    <div className="glass-card rounded-xl p-6 bg-gradient-to-br from-emerald-900/30 to-blue-900/30 border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <Activity className="text-emerald-400" />
        <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
          Activity
        </h3>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Incubating</span>
          <span className="font-bold text-blue-400">{incubatingEggs}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Ready to Hatch</span>
          <span className="font-bold text-emerald-400">{readyEggs}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Hatched</span>
          <span className="font-bold text-white">{hatchedEggs}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Success Rate</span>
          <span className="font-bold text-emerald-400">
            {eggs.length > 0
              ? `${Math.round((hatchedEggs / eggs.length) * 100)}%`
              : '0%'}
          </span>
        </div>
      </div>
    </div>
  );
} 