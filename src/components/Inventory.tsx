import { useGame } from '../contexts/GameContext';

export function Inventory() {
  const { state } = useGame();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold gradient-text mb-6">Tu Inventario</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {state.inventory.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="text-4xl">{item.image}</div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {state.inventory.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">
            Tu inventario está vacío.
          </p>
          <p className="text-gray-500 mt-2">
            Visita la tienda para comprar items.
          </p>
        </div>
      )}
    </div>
  );
} 