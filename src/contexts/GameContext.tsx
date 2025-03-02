import { createContext, useContext, ReactNode } from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import type { GameState, ShopItem } from '../types';

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
  };
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const { gameState, buyItem, collectEgg, startIncubation, buyMiningRig, upgradeMiningRig, claimDailyReward, canClaimDailyReward } = useGameLogic();

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
      canClaimDailyReward
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