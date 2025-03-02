import { useState, useEffect, useCallback } from 'react';
import { GAME_CONFIG, TIME_BOOSTERS } from '../config/constants';
import type { GameState, ShopItem, Egg, Booster, EggStatus, Profile, DonationTier, ReferralTier, ReferralStats, Referral } from '../types';
import { DONATION_ADDRESSES } from '../constants';

const initialGameState: GameState = {
  eggs: [],
  inventory: [],
  balance: 0,
  money: 100,
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

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const savedState = localStorage.getItem('eggGame');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        // Asegurarse de que todas las propiedades necesarias existan
        return {
          ...initialGameState,
          ...parsedState,
          profile: {
            ...initialGameState.profile,
            ...parsedState.profile
          }
        };
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    }
    return initialGameState;
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
    try {
      localStorage.setItem('eggGame', JSON.stringify(gameState));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  }, [gameState]);

  const buyItem = useCallback((item: ShopItem) => {
    if (gameState.money >= item.price) {
      setGameState(current => {
        if (item.type === 'egg') {
          const incubationDays = item.incubationDays || 1;
          const now = Date.now();
          const newEgg = {
            id: Math.random().toString(36).substring(7),
            type: item.type,
            rarity: item.rarity || 'common',
            level: 1,
            power: 10,
            image: item.image,
            status: 'idle' as const,
            purchaseDate: new Date(),
            incubationDays,
            incubationStartTime: 0,
            incubationEndTime: 0,
            incubationTimeRequired: incubationDays * 24 * 60 * 60 * 1000,
            value: item.value || 0
          };

          return {
            ...current,
            money: current.money - item.price,
            eggs: [...current.eggs, newEgg]
          };
        } else {
          const now = Date.now();
          const newBooster = {
            id: Math.random().toString(36).substring(7),
            type: item.type,
            duration: item.duration || 3600000,
            multiplier: item.multiplier || 2,
            active: true,
            startTime: now,
            timeRemaining: item.duration || 3600000
          };

          return {
            ...current,
            money: current.money - item.price,
            activeBoosters: [...current.activeBoosters, newBooster]
          };
        }
      });
    }
  }, [gameState.money]);

  const collectEgg = useCallback((eggId: string) => {
    setGameState(current => {
      const egg = current.eggs.find(e => e.id === eggId);
      if (!egg || egg.status !== 'ready') return current;

      const updatedEggs = current.eggs.filter(e => e.id !== eggId);

      return {
        ...current,
        money: current.money + egg.value,
        coins: current.coins + egg.value,
        eggs: updatedEggs,
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
  }, []);

  const startIncubation = useCallback((eggId: string) => {
    setGameState(current => {
      const egg = current.eggs.find(e => e.id === eggId);
      if (!egg || egg.status !== 'idle') return current;

      const now = Date.now();
      const updatedEggs = current.eggs.map(e => {
        if (e.id === eggId) {
          return {
            ...e,
            status: 'incubating' as const,
            incubationStartTime: now,
            incubationEndTime: now + e.incubationTimeRequired
          };
        }
        return e;
      });

      return {
        ...current,
        eggs: updatedEggs
      };
    });
  }, []);

  const buyMiningRig = useCallback(() => {
    const rigPrice = 1000;
    if (gameState.money >= rigPrice) {
      setGameState(current => ({
        ...current,
        money: current.money - rigPrice,
        miningRig: {
          level: current.miningRig.level + 1,
          hashRate: current.miningRig.hashRate + 100
        },
        stats: {
          ...current.stats,
          totalPower: current.stats.totalPower + 100
        }
      }));
    }
  }, [gameState.money]);

  const upgradeMiningRig = useCallback(() => {
    const upgradePrice = 500;
    if (gameState.money >= upgradePrice) {
      setGameState(current => ({
        ...current,
        money: current.money - upgradePrice,
        miningRig: {
          level: current.miningRig.level + 1,
          hashRate: current.miningRig.hashRate + 50
        },
        stats: {
          ...current.stats,
          totalPower: current.stats.totalPower + 50
        }
      }));
    }
  }, [gameState.money]);

  const claimDailyReward = useCallback(() => {
    const now = Date.now();
    setGameState(current => {
      const lastReward = current.lastDailyReward;
      const reward = 10 * (current.currentStreak + 1);

      return {
        ...current,
        money: current.money + reward,
        currentStreak: lastReward && now - lastReward < 48 * 60 * 60 * 1000 ? current.currentStreak + 1 : 1,
        lastDailyReward: now,
        dailyRewards: [...current.dailyRewards, { amount: reward, timestamp: now }]
      };
    });
  }, []);

  const canClaimDailyReward = !gameState.lastDailyReward || 
    (Date.now() - gameState.lastDailyReward > 24 * 60 * 60 * 1000);

  const updateProfile = useCallback((profile: Partial<Profile>) => {
    setGameState(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...profile
      }
    }));
  }, []);

  const getDonationAddresses = useCallback(() => {
    return DONATION_ADDRESSES.map(({ symbol, address }) => ({ symbol, address }));
  }, []);

  const getDonationTiers = useCallback((): DonationTier[] => {
    return [
      {
        id: 'bronze',
        name: 'Bronce',
        minAmount: 10,
        benefits: ['2x XP', '1 Huevo Gratis'],
        icon: '🥉',
        color: 'text-amber-600',
        network: 'BTC',
        logo: '/assets/btc-logo.png'
      },
      {
        id: 'silver',
        name: 'Plata',
        minAmount: 50,
        benefits: ['3x XP', '3 Huevos Gratis', 'Insignia Especial'],
        icon: '🥈',
        color: 'text-gray-400',
        network: 'BTC',
        logo: '/assets/btc-logo.png'
      },
      {
        id: 'gold',
        name: 'Oro',
        minAmount: 100,
        benefits: ['5x XP', '5 Huevos Gratis', 'Insignia Exclusiva', 'Acceso VIP'],
        icon: '🥇',
        color: 'text-yellow-400',
        network: 'BTC',
        logo: '/assets/btc-logo.png'
      }
    ];
  }, []);

  const getCurrentTier = useCallback((): DonationTier => {
    return getDonationTiers()[0];
  }, []);

  const getReferralTiers = useCallback((): ReferralTier[] => {
    return [
      {
        id: 'tier1',
        name: 'Nivel 1',
        level: 1,
        minReferrals: 5,
        reward: {
          coins: 10,
          eggs: 1,
          miningBonus: 0.1
        },
        color: 'text-green-400'
      },
      {
        id: 'tier2',
        name: 'Nivel 2',
        level: 2,
        minReferrals: 15,
        reward: {
          coins: 30,
          eggs: 2,
          miningBonus: 0.2
        },
        color: 'text-blue-400'
      },
      {
        id: 'tier3',
        name: 'Nivel 3',
        level: 3,
        minReferrals: 30,
        reward: {
          coins: 60,
          eggs: 3,
          miningBonus: 0.3
        },
        color: 'text-purple-400'
      }
    ];
  }, []);

  const getReferralStats = useCallback((): ReferralStats => {
    return {
      totalReferrals: 0,
      activeReferrals: 0,
      totalEarnings: 0,
      currentTier: getReferralTiers()[0],
      indirectReferrals: 0,
      networkReferrals: 0,
      miningBonus: 0
    };
  }, []);

  const getReferrals = useCallback((): Referral[] => {
    return [];
  }, []);

  const applyReferralCode = useCallback(async (code: string): Promise<boolean> => {
    return Promise.resolve(true);
  }, []);

  const resetGameState = useCallback(() => {
    try {
      localStorage.removeItem('eggGame');
      setGameState(initialGameState);
    } catch (error) {
      console.error('Error resetting game state:', error);
    }
  }, []);

  return {
    gameState,
    buyItem,
    collectEgg,
    startIncubation,
    buyMiningRig,
    upgradeMiningRig,
    claimDailyReward,
    canClaimDailyReward,
    updateProfile,
    getDonationAddresses,
    getDonationTiers,
    getCurrentTier,
    getReferralTiers,
    getReferralStats,
    getReferrals,
    applyReferralCode,
    resetGameState
  };
}