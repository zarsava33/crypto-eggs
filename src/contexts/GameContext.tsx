import React, { createContext, useContext, useEffect } from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import type { GameState, ShopItem, Profile, DonationTier, ReferralTier, ReferralStats, Referral } from '../types';
import { useAuth } from './AuthContext';

interface GameContextType {
  state: GameState;
  actions: {
    buyEgg: (item: ShopItem) => Promise<void>;
    buyBooster: (item: ShopItem) => Promise<void>;
    collectEgg: () => void;
    startIncubation: () => void;
    updateProfile: (profile: Partial<Profile>) => void;
    getDonationTiers: () => DonationTier[];
    getCurrentTier: () => DonationTier;
    getReferralTiers: () => ReferralTier[];
    getReferralStats: () => ReferralStats;
    getReferrals: () => Referral[];
    applyReferralCode: (code: string) => void;
    resetGameState: () => void;
  };
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const { user, saveProgress, loadProgress } = useAuth();
  const {
    gameState: state,
    buyItem,
    collectEgg: collectEggBase,
    startIncubation: startIncubationBase,
    updateProfile,
    getDonationTiers,
    getCurrentTier,
    getReferralTiers,
    getReferralStats,
    getReferrals,
    applyReferralCode: applyReferralCodeBase,
    resetGameState
  } = useGameLogic();

  // Cargar el progreso cuando el usuario inicia sesión
  useEffect(() => {
    if (user) {
      const loadUserProgress = async () => {
        try {
          const progress = await loadProgress();
          if (progress) {
            Object.assign(state, progress);
          }
        } catch (error) {
          console.error('Error al cargar el progreso:', error);
        }
      };
      loadUserProgress();
    }
  }, [user]);

  // Guardar el progreso cuando cambia el estado
  useEffect(() => {
    if (user) {
      const saveUserProgress = async () => {
        try {
          await saveProgress(state);
        } catch (error) {
          console.error('Error al guardar el progreso:', error);
        }
      };
      saveUserProgress();
    }
  }, [state, user]);

  const actions = {
    buyEgg: async (item: ShopItem) => {
      await buyItem(item);
      if (user) {
        await saveProgress(state);
      }
    },
    buyBooster: async (item: ShopItem) => {
      await buyItem(item);
      if (user) {
        await saveProgress(state);
      }
    },
    collectEgg: () => {
      collectEggBase();
      if (user) {
        saveProgress(state).catch(console.error);
      }
    },
    startIncubation: () => {
      startIncubationBase();
      if (user) {
        saveProgress(state).catch(console.error);
      }
    },
    updateProfile,
    getDonationTiers,
    getCurrentTier,
    getReferralTiers,
    getReferralStats,
    getReferrals,
    applyReferralCode: (code: string) => {
      applyReferralCodeBase(code);
      if (user) {
        saveProgress(state).catch(console.error);
      }
    },
    resetGameState
  };

  return (
    <GameContext.Provider value={{ state, actions }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame debe usarse dentro de un GameProvider');
  }
  return context;
}

export default GameProvider; 