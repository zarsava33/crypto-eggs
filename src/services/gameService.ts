import { v4 as uuidv4 } from 'uuid';
import type { GameState, Egg, Rarity, Booster, EggStatus } from '../types';

const RARITY_WEIGHTS = {
  common: 0.6,
  rare: 0.25,
  epic: 0.1,
  legendary: 0.05
};

const INCUBATION_TIMES = {
  common: 5 * 60 * 1000, // 5 minutes
  rare: 15 * 60 * 1000, // 15 minutes
  epic: 30 * 60 * 1000, // 30 minutes
  legendary: 60 * 60 * 1000, // 1 hour
};

const POWER_RANGES = {
  common: { min: 100, max: 300 },
  rare: { min: 300, max: 600 },
  epic: { min: 600, max: 900 },
  legendary: { min: 900, max: 1500 },
};

export function generateRandomRarity(): Rarity {
  const random = Math.random();
  let cumulativeWeight = 0;

  for (const [rarity, weight] of Object.entries(RARITY_WEIGHTS)) {
    cumulativeWeight += weight;
    if (random <= cumulativeWeight) {
      return rarity as Rarity;
    }
  }

  return 'common';
}

export function createNewEgg(rarity: Rarity): Egg {
  const now = Date.now();
  const incubationDays = {
    common: 1,
    rare: 2,
    epic: 3,
    legendary: 4
  }[rarity];

  const egg: Egg = {
    id: crypto.randomUUID(),
    type: 'egg',
    rarity,
    level: 1,
    power: Math.floor(Math.random() * 10) + 1,
    image: '🥚',
    status: 'incubating',
    purchaseDate: new Date(),
    incubationDays,
    incubationStartTime: now,
    incubationEndTime: now + incubationDays * 24 * 60 * 60 * 1000,
    value: Math.floor(Math.random() * 100) + 1
  };

  return egg;
}

export function createBooster(type: Booster['type'], duration: number, multiplier: number): Booster {
  const now = Date.now();

  const booster: Booster = {
    id: crypto.randomUUID(),
    type,
    multiplier,
    duration,
    startTime: now,
    endTime: now + duration * 1000
  };

  return booster;
}

export function calculateEggProgress(egg: Egg): number {
  if (!egg.incubationStartTime || egg.status === 'hatched') return 100;
  
  const elapsed = Date.now() - egg.incubationStartTime;
  return Math.min(100, (elapsed / egg.incubationTimeRequired) * 100);
}

export function updateGameState(eggs: Egg[]): GameState {
  const now = Date.now();

  // Actualizar estado de los huevos
  const updatedEggs = eggs.map(egg => {
    if (egg.status === 'incubating' && now >= egg.incubationEndTime) {
      return { ...egg, status: 'ready' as EggStatus };
    }
    return egg;
  });

  // Calcular estadísticas
  const stats = {
    totalEggs: updatedEggs.length,
    legendaryEggs: updatedEggs.filter(egg => egg.rarity === 'legendary').length,
    totalPower: updatedEggs.reduce((sum, egg) => sum + egg.power, 0),
    averageLevel: updatedEggs.reduce((sum, egg) => sum + egg.level, 0) / updatedEggs.length || 0
  };

  return {
    money: 0,
    eggs: updatedEggs,
    activeBoosters: [],
    totalEggsCollected: 0,
    depositHistory: [],
    connectedWallets: [],
    stats
  };
}

function calculateStats(eggs: Egg[]): GameState['stats'] {
  const totalEggs = eggs.length;
  const legendaryEggs = eggs.filter(egg => egg.rarity === 'legendary').length;
  const totalPower = eggs.reduce((sum, egg) => sum + egg.power, 0);
  const averageLevel = totalEggs > 0 
    ? Math.round(eggs.reduce((sum, egg) => sum + egg.level, 0) / totalEggs)
    : 0;

  return {
    totalEggs,
    legendaryEggs,
    totalPower,
    averageLevel,
  };
} 