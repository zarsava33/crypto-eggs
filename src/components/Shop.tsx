import { useGame } from '../contexts/GameContext';
import { useError } from '../contexts/ErrorContext';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

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
    value: 100,
    chance: 0.7
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
    value: 250,
    chance: 0.25
  },
  {
    id: 'egg3',
    name: 'Huevo Legendario',
    description: '¡Un huevo legendario con recompensas épicas!',
    price: 500,
    type: 'egg' as const,
    rarity: 'legendary',
    image: '🥚',
    incubationDays: 3,
    value: 1000,
    chance: 0.05
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
  },
  {
    id: 'booster2',
    name: 'Super Acelerador',
    description: 'Triplica la velocidad de incubación',
    price: 150,
    type: 'booster' as const,
    duration: 3600,
    multiplier: 3,
    image: '⚡⚡'
  }
] as const;

const containerVariants: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1 
  }
};

export function Shop() {
  const { state, actions } = useGame();
  const { reportError } = useError();

  const handlePurchase = async (item: typeof shopItems[number]) => {
    try {
      if (state.money < item.price) {
        throw new Error('No tienes suficientes monedas para esta compra');
      }

      if (item.type === 'egg') {
        await actions.buyEgg(item);
      } else {
        await actions.buyBooster(item);
      }
    } catch (error) {
      reportError(error as Error, 'Compra en tienda');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Tienda</h1>
          <p className="text-gray-400">Compra huevos y mejoras para tu granja</p>
        </div>
        <motion.div 
          className="text-right"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <p className="text-sm text-gray-400">Tu balance</p>
          <p className="text-2xl font-bold text-white">{state.money} 🪙</p>
        </motion.div>
      </div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {shopItems.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="glass-card p-6 flex flex-col justify-between"
          >
            <div>
              <div className="text-5xl mb-4 flex justify-center">
                {item.image}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{item.description}</p>
              {'chance' in item && (
                <p className="text-xs text-gray-500 mb-2">
                  Probabilidad: {(item.chance * 100).toFixed(1)}%
                </p>
              )}
              <p className="text-lg font-bold text-yellow-400">{item.price} 🪙</p>
            </div>
            
            <button
              onClick={() => handlePurchase(item)}
              disabled={state.money < item.price}
              className={`w-full mt-4 game-button ${
                state.money >= item.price
                  ? 'hover:scale-105'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              {state.money >= item.price ? 'Comprar' : 'Insuficiente'}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}