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

  const incubationTimeRequired = incubationDays * 24 * 60 * 60 * 1000;

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
    incubationEndTime: now + incubationTimeRequired,
    incubationTimeRequired,
    value: Math.floor(Math.random() * 100) + 1
  };

  return egg;
}

export function createNewBooster(type: 'mining' | 'hatching' | 'experience', duration: number, multiplier: number): Booster {
  return {
    id: crypto.randomUUID(),
    type,
    multiplier,
    duration,
    active: true,
    startTime: Date.now()
  };
}

export function calculateEggProgress(egg: Egg): number {
  if (egg.status !== 'incubating') return 0;
  const now = Date.now();
  const elapsed = now - egg.incubationStartTime;
  return Math.min(100, (elapsed / egg.incubationTimeRequired) * 100);
}

export function updateEggStatus(egg: Egg): Egg {
  if (egg.status !== 'incubating') return egg;

  const progress = calculateEggProgress(egg);
  if (progress >= 100) {
    return { ...egg, status: 'ready' };
  }
  return egg;
}

export function updateGameState(state: GameState): GameState {
  const updatedEggs = state.eggs.map(updateEggStatus);
  const stats = calculateStats(updatedEggs);

  return {
    ...state,
    eggs: updatedEggs,
    stats
  };
}

function calculateStats(eggs: Egg[]) {
  const totalEggs = eggs.length;
  const legendaryEggs = eggs.filter(egg => egg.rarity === 'legendary').length;
  const totalPower = eggs.reduce((sum, egg) => sum + egg.power, 0);
  const averageLevel = totalEggs
    ? Math.round(eggs.reduce((sum, egg) => sum + egg.level, 0) / totalEggs)
    : 0;

  return {
    totalEggs,
    legendaryEggs,
    totalPower,
    averageLevel
  };
}

export function initializeGameState(): GameState {
  return {
    eggs: [],
    inventory: [],
    balance: 0,
    money: 0,
    coins: 0,
    miningRig: {
      level: 0,
      hashRate: 0,
    },
    profile: {
      username: '',
      avatar: '',
      level: 1,
      experience: 0,
      totalDonated: 0,
    },
    lastDailyReward: null,
    currentStreak: 0,
    dailyRewards: [],
    activeBoosters: [],
    totalEggsCollected: 0,
    eggsHatched: 0,
    level: 1,
    experience: 0,
    currentEgg: null,
    stats: {
      totalEggs: 0,
      legendaryEggs: 0,
      totalPower: 0,
      averageLevel: 0,
    },
    referralStats: {
      directReferrals: 0,
      indirectReferrals: 0,
      networkReferrals: 0,
      totalEarnings: 0,
      miningBonus: 0,
    },
    referrals: [],
  };
} 