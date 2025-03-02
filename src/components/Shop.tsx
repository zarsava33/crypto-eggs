import { useState } from 'react';
import { ShoppingBag, Egg, Zap } from 'lucide-react';
import type { ShopItem } from '../types';

interface ShopProps {
  money: number;
  onBuyEgg: (item: ShopItem) => void;
  onBuyBooster: (item: ShopItem) => void;
}

const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'common-egg',
    type: 'egg',
    name: 'Common Egg',
    description: 'A basic egg with modest potential.',
    price: 10,
    image: '🥚',
    rarity: 'common',
    incubationDays: 1,
    value: 5
  },
  {
    id: 'rare-egg',
    type: 'egg',
    name: 'Rare Egg',
    description: 'An egg with promising potential.',
    price: 50,
    image: '🥚',
    rarity: 'rare',
    incubationDays: 2,
    value: 25
  },
  {
    id: 'epic-egg',
    type: 'egg',
    name: 'Epic Egg',
    description: 'An extraordinary egg with great potential.',
    price: 250,
    image: '🥚',
    rarity: 'epic',
    incubationDays: 3,
    value: 125
  },
  {
    id: 'speed-booster',
    type: 'booster',
    name: 'Speed Booster',
    description: 'Increases incubation speed by 2x for 1 hour.',
    price: 100,
    image: '⚡',
    multiplier: 2,
    duration: 3600
  },
  {
    id: 'power-booster',
    type: 'booster',
    name: 'Power Booster',
    description: 'Increases egg value by 2x for 30 minutes.',
    price: 150,
    image: '💪',
    multiplier: 2,
    duration: 1800
  },
  {
    id: 'luck-booster',
    type: 'booster',
    name: 'Luck Booster',
    description: 'Increases chance of rare eggs by 2x for 15 minutes.',
    price: 200,
    image: '🍀',
    multiplier: 2,
    duration: 900
  }
];

export function Shop({ money, onBuyEgg, onBuyBooster }: ShopProps) {
  const [selectedType, setSelectedType] = useState<'egg' | 'booster'>('egg');

  const filteredItems = SHOP_ITEMS.filter(item => item.type === selectedType);

  const handleBuy = (item: ShopItem) => {
    if (money < item.price) {
      alert('Not enough money!');
      return;
    }

    if (item.type === 'egg') {
      onBuyEgg(item);
    } else {
      onBuyBooster(item);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Shop</h2>
        <div className="flex items-center gap-2">
          <span className="text-yellow-400">💰</span>
          <span className="font-medium">{money.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSelectedType('egg')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
            selectedType === 'egg'
              ? 'bg-purple-500 text-white'
              : 'bg-white/5 hover:bg-white/10'
          }`}
        >
          <Egg size={20} />
          <span>Eggs</span>
        </button>
        <button
          onClick={() => setSelectedType('booster')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
            selectedType === 'booster'
              ? 'bg-purple-500 text-white'
              : 'bg-white/5 hover:bg-white/10'
          }`}
        >
          <Zap size={20} />
          <span>Boosters</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
          >
            <div className="text-3xl mb-2">{item.image}</div>
            <h3 className="font-semibold mb-1">{item.name}</h3>
            <p className="text-sm text-gray-400 mb-4">{item.description}</p>
            {item.type === 'egg' && item.rarity && (
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-400">Rarity:</span>
                <span
                  className={`text-xs font-medium ${
                    item.rarity === 'common'
                      ? 'text-gray-400'
                      : item.rarity === 'rare'
                      ? 'text-blue-400'
                      : item.rarity === 'epic'
                      ? 'text-purple-400'
                      : 'text-yellow-400'
                  }`}
                >
                  {item.rarity.toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">💰</span>
                <span>{item.price}</span>
              </div>
              <button
                onClick={() => handleBuy(item)}
                disabled={money < item.price}
                className="px-3 py-1 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}