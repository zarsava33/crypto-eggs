import { useState, useEffect, useCallback } from 'react';
import type { GameState, ShopItem, Profile, DonationTier, ReferralTier, ReferralStats, Referral, EggStatus } from '../types';

const initialState: GameState = {
  coins: 1000,
  eggs: [],
  boosters: [],
  profile: {
    username: '',
    avatar: '',
    level: 1,
    experience: 0,
    wallet: '',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  },
  inventory: {
    eggs: [],
    boosters: []
  },
  stats: {
    eggsHatched: 0,
    coinsEarned: 0,
    boostersUsed: 0
  }
};

export function useGameLogic() {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const savedState = localStorage.getItem('eggGame');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        return {
          ...initialState,
          ...parsedState,
          profile: {
            ...initialState.profile,
            ...parsedState.profile
          }
        };
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    }
    return initialState;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setGameState(current => {
        const updatedEggs = current.eggs.map(egg => {
          if (egg.status === 'incubating' && egg.incubationEndTime && new Date(egg.incubationEndTime).getTime() <= Date.now()) {
            return { ...egg, status: 'ready' as EggStatus };
          }
          return egg;
        });

        return {
          ...current,
          eggs: updatedEggs
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
          status: 'incubating' as EggStatus,
          incubationStartTime: now.toISOString(),
          incubationEndTime: endTime.toISOString()
        } : egg
      )
    }));
  }, []);

  const updateProfile = useCallback((profile: Partial<Profile>) => {
    setGameState(prev => ({
      ...prev,
      profile: { ...prev.profile, ...profile }
    }));
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
      setGameState(initialState);
    } catch (error) {
      console.error('Error resetting game state:', error);
    }
  }, []);

  return {
    gameState,
    buyItem,
    collectEgg,
    startIncubation,
    updateProfile,
    getDonationTiers,
    getCurrentTier,
    getReferralTiers,
    getReferralStats,
    getReferrals,
    applyReferralCode,
    resetGameState
  };
}