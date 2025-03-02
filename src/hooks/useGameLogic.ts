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

  const buyItem = useCallback(async (item: ShopItem) => {
    setGameState(prev => ({
      ...prev,
      coins: prev.coins - item.price,
      inventory: {
        ...prev.inventory,
        [item.type === 'egg' ? 'eggs' : 'boosters']: [
          ...prev.inventory[item.type === 'egg' ? 'eggs' : 'boosters'],
          item.id
        ]
      }
    }));
  }, []);

  const collectEgg = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        eggsHatched: prev.stats.eggsHatched + 1
      }
    }));
  }, []);

  const startIncubation = useCallback(() => {
    const now = new Date();
    const endTime = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

    setGameState(prev => ({
      ...prev,
      eggs: prev.eggs.map(egg => 
        egg.status === 'idle' ? {
          ...egg,
          status: 'incubating',
          incubationStartTime: now.toISOString(),
          incubationEndTime: endTime.toISOString()
        } : egg
      )
    }));
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
      profile: { ...prev.profile, ...profile }
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
        description: 'Nivel básico de donación',
        requiredAmount: 10,
        benefits: ['Huevo especial', '+10% velocidad de incubación'],
        icon: '🥉'
      },
      {
        id: 'silver',
        name: 'Plata',
        description: 'Nivel intermedio de donación',
        requiredAmount: 50,
        benefits: ['Huevo raro', '+25% velocidad de incubación', 'Insignia especial'],
        icon: '🥈'
      },
      {
        id: 'gold',
        name: 'Oro',
        description: 'Nivel premium de donación',
        requiredAmount: 100,
        benefits: ['Huevo legendario', '+50% velocidad de incubación', 'Insignia exclusiva', 'Soporte prioritario'],
        icon: '🥇'
      }
    ];
  }, []);

  const getCurrentTier = useCallback((): DonationTier => {
    return getDonationTiers()[0];
  }, []);

  const getReferralTiers = useCallback((): ReferralTier[] => {
    return [
      {
        id: 'starter',
        name: 'Iniciado',
        description: 'Nivel inicial de referidos',
        requiredReferrals: 5,
        rewards: {
          coins: 100,
          eggs: 1,
          boosters: 1
        },
        icon: '🌱'
      },
      {
        id: 'advanced',
        name: 'Avanzado',
        description: 'Nivel intermedio de referidos',
        requiredReferrals: 20,
        rewards: {
          coins: 500,
          eggs: 3,
          boosters: 2
        },
        icon: '🌿'
      },
      {
        id: 'master',
        name: 'Maestro',
        description: 'Nivel experto de referidos',
        requiredReferrals: 50,
        rewards: {
          coins: 1000,
          eggs: 5,
          boosters: 3
        },
        icon: '🌳'
      }
    ];
  }, []);

  const getReferralStats = useCallback((): ReferralStats => {
    return {
      totalReferrals: 0,
      activeReferrals: 0,
      totalEarnings: 0,
      currentTier: 'starter',
      nextTier: 'advanced',
      progressToNextTier: 0
    };
  }, []);

  const getReferrals = useCallback((): Referral[] => {
    return [];
  }, []);

  const applyReferralCode = useCallback((code: string) => {
    console.log('Código de referido aplicado:', code);
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