import { useState, useEffect } from 'react';
import { GAME_CONFIG, TIME_BOOSTERS } from '../config/constants';
import type { GameState, ShopItem, Egg, Booster, EggStatus } from '../types';

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>({
    money: 100,
    coins: 100,
    eggs: [],
    activeBoosters: [],
    totalEggsCollected: 0,
    eggsHatched: 0,
    level: 1,
    experience: 0,
    currentEgg: null,
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
          Date.now() < (booster.startTime + booster.duration * 1000)
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
          const incubationDays = item.incubationDays || 1;
          const incubationTimeRequired = incubationDays * 24 * 60 * 60 * 1000;
          const now = Date.now();

          const newEgg: Egg = {
            id: crypto.randomUUID(),
            type: 'egg',
            rarity: item.rarity || 'common',
            level: 1,
            power: Math.floor(Math.random() * 10) + 1,
            image: item.image,
            status: 'incubating',
            purchaseDate: new Date(),
            incubationDays,
            incubationStartTime: now,
            incubationEndTime: now + incubationTimeRequired,
            incubationTimeRequired,
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
            type: 'hatching',
            multiplier: item.multiplier || 2,
            duration: item.duration || 3600,
            active: true,
            startTime: Date.now()
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
        coins: current.coins + egg.value,
        eggs: current.eggs.filter(e => e.id !== eggId),
        totalEggsCollected: current.totalEggsCollected + 1,
        eggsHatched: current.eggsHatched + 1,
        experience: current.experience + egg.value,
        level: Math.floor(current.experience / 1000) + 1,
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