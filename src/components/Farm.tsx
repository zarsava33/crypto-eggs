import { useGame } from '../contexts/GameContext';
import { EggCard } from './EggCard';

export function Farm() {
  const { state, actions } = useGame();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold gradient-text mb-6">Tu Granja</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

      {state.eggs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            No tienes huevos en tu granja.
          </p>
          <p className="text-gray-500 mt-2">
            Visita la tienda para comprar algunos huevos.
          </p>
        </div>
      )}
    </div>
  );
} 