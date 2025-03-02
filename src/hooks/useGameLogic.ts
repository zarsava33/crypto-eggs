import { useState, useEffect } from 'react';
import { GAME_CONFIG, TIME_BOOSTERS } from '../config/constants';
import type { GameState, ShopItem, Egg, Booster, EggStatus } from '../types';

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>({
    money: 100,
    eggs: [],
    activeBoosters: [],
    totalEggsCollected: 0,
    depositHistory: [],
    connectedWallets: [],
    stats: {
      totalEggs: 0,
      legendaryEggs: 0,
      totalPower: 0,
      averageLevel: 0
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(current => {
        const updatedEggs = current.eggs.map(egg => {
          if (egg.status === 'incubating' && Date.now() >= egg.incubationEndTime) {
            return { ...egg, status: 'ready' as EggStatus };
          }
          return egg;
        });

        const updatedBoosters = current.activeBoosters.filter(booster => 
          Date.now() < booster.endTime
        );

        return {
          ...current,
          eggs: updatedEggs,
          activeBoosters: updatedBoosters
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('eggGame', JSON.stringify(gameState));
  }, [gameState]);

  const buyItem = (item: ShopItem) => {
    if (gameState.money >= item.price) {
      setGameState(current => {
        if (item.type === 'egg') {
          const newEgg: Egg = {
            id: crypto.randomUUID(),
            type: 'egg',
            rarity: item.rarity || 'common',
            level: 1,
            power: Math.floor(Math.random() * 10) + 1,
            image: item.image,
            status: 'incubating',
            purchaseDate: new Date(),
            incubationDays: item.incubationDays || 1,
            incubationStartTime: Date.now(),
            incubationEndTime: Date.now() + (item.incubationDays || 1) * 24 * 60 * 60 * 1000,
            value: item.value || 0
          };

          return {
            ...current,
            money: current.money - item.price,
            eggs: [...current.eggs, newEgg]
          };
        } else {
          const newBooster: Booster = {
            id: crypto.randomUUID(),
            type: 'speed',
            multiplier: item.multiplier || 2,
            duration: item.duration || 3600,
            startTime: Date.now(),
            endTime: Date.now() + (item.duration || 3600) * 1000
          };

          return {
            ...current,
            money: current.money - item.price,
            activeBoosters: [...current.activeBoosters, newBooster]
          };
        }
      });
    }
  };

  const collectEgg = (eggId: string) => {
    setGameState(current => {
      const egg = current.eggs.find(e => e.id === eggId);
      if (!egg || egg.status !== 'ready') return current;

      return {
        ...current,
        money: current.money + egg.value,
        eggs: current.eggs.filter(e => e.id !== eggId),
        totalEggsCollected: current.totalEggsCollected + 1,
        stats: {
          ...current.stats,
          totalEggs: current.stats.totalEggs + 1,
          legendaryEggs: current.stats.legendaryEggs + (egg.rarity === 'legendary' ? 1 : 0),
          totalPower: current.stats.totalPower + egg.power,
          averageLevel: (current.stats.averageLevel * current.stats.totalEggs + egg.level) / (current.stats.totalEggs + 1)
        }
      };
    });
  };

  return {
    gameState,
    buyItem,
    collectEgg
  };
}