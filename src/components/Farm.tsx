import { useGame } from '../contexts/GameContext';
import { EggCard } from './EggCard';

export function Farm() {
  const { state, actions } = useGame();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {state.currentEgg && (
        <div className="col-span-full">
          <EggCard
            id={state.currentEgg.type}
            type={state.currentEgg.type}
            status="incubating"
            progress={state.currentEgg.progress}
            timeRemaining={state.currentEgg.timeRemaining}
            onCollect={() => actions.collectEgg(state.currentEgg.type)}
          />
        </div>
      )}
      {state.eggs.map((egg) => (
        <EggCard
          key={egg.id}
          id={egg.id}
          type={egg.type}
          status={egg.status}
          progress={egg.status === 'incubating' ? 50 : 0}
          timeRemaining={egg.status === 'incubating' ? 1000 : 0}
          onCollect={() => actions.collectEgg(egg.id)}
        />
      ))}
    </div>
  );
} 