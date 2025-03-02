import { useGame } from '../contexts/GameContext';
import { EggCard } from './EggCard';

export function Farm() {
  const { state, collectEgg } = useGame();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold gradient-text">Tu Granja</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {state.currentEgg && (
          <EggCard
            type={state.currentEgg.type}
            rarity="common"
            progress={state.currentEgg.progress}
            timeRemaining={state.currentEgg.timeRemaining}
            onClick={collectEgg}
          />
        )}
      </div>
    </div>
  );
} 