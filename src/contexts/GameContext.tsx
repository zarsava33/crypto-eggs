import { createContext, useContext, ReactNode } from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import type { GameState, ShopItem } from '../types';

interface GameContextType {
  state: GameState;
  actions: {
    buyEgg: (item: ShopItem) => void;
    buyBooster: (item: ShopItem) => void;
    collectEgg: (eggId: string) => void;
  };
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const { gameState, buyItem, collectEgg } = useGameLogic();

  const value: GameContextType = {
    state: gameState,
    actions: {
      buyEgg: (item) => buyItem(item),
      buyBooster: (item) => buyItem(item),
      collectEgg
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