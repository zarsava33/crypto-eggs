import { createContext, useContext, ReactNode } from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import type { GameState, ShopItem, Profile, DonationTier, ReferralTier, ReferralStats, Referral } from '../types';

interface GameContextType {
  state: GameState;
  actions: {
    buyEgg: (item: ShopItem) => void;
    buyBooster: (item: ShopItem) => void;
    collectEgg: (eggId: string) => void;
    startIncubation: (eggId: string) => void;
    buyMiningRig: () => void;
    upgradeMiningRig: () => void;
    claimDailyReward: () => void;
    canClaimDailyReward: boolean;
    updateProfile: (profile: Partial<Profile>) => void;
    getDonationAddresses: () => { symbol: string; address: string }[];
    getDonationTiers: () => DonationTier[];
    getCurrentTier: () => DonationTier;
    getReferralTiers: () => ReferralTier[];
    getReferralStats: () => ReferralStats;
    getReferrals: () => Referral[];
    applyReferralCode: (code: string) => Promise<boolean>;
  };
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const {
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
    applyReferralCode
  } = useGameLogic();

  const value: GameContextType = {
    state: gameState,
    actions: {
      buyEgg: (item) => buyItem(item),
      buyBooster: (item) => buyItem(item),
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
      applyReferralCode
    }
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

export default GameProvider; 