import { useGame } from '../contexts/GameContext';

const shopItems = [
  {
    id: 'egg1',
    name: 'Huevo Común',
    description: 'Un huevo común con potencial promedio',
    price: 50,
    type: 'egg' as const,
    rarity: 'common',
    image: '🥚',
    incubationDays: 1,
    value: 100
  },
  {
    id: 'egg2',
    name: 'Huevo Raro',
    description: 'Un huevo raro con gran potencial',
    price: 100,
    type: 'egg' as const,
    rarity: 'rare',
    image: '🥚',
    incubationDays: 2,
    value: 250
  },
  {
    id: 'booster1',
    name: 'Acelerador x2',
    description: 'Duplica la velocidad de incubación',
    price: 75,
    type: 'booster' as const,
    duration: 3600,
    multiplier: 2,
    image: '⚡'
  }
];

export function Shop() {
  const { state, actions } = useGame();

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold gradient-text">Tienda</h1>
        <div className="text-right">
          <p className="text-sm text-gray-400">Tu balance</p>
          <p className="text-xl font-bold text-white">{state.money} 🪙</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {shopItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="text-4xl">{item.image}</div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
                <p className="text-lg font-bold text-yellow-400 mt-2">{item.price} 🪙</p>
              </div>
              <button
                onClick={() => item.type === 'egg' ? actions.buyEgg(item) : actions.buyBooster(item)}
                disabled={state.money < item.price}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  state.money >= item.price
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                {state.money >= item.price ? 'Comprar' : 'Insuficiente'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}