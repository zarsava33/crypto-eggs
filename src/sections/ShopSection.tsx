import React from 'react';
import { useGame } from '../contexts/GameContext';
import { Shop } from '../components/Shop';
import type { ShopItem } from '../types';

interface ShopSectionProps {
  money: number;
  onBuyEgg: (item: ShopItem) => void;
  onBuyBooster: (boosterId: string) => void;
}

export function ShopSection() {
  const { state, buyEgg, buyBooster } = useGame();

  return (
    <Shop
      money={state.money}
      onBuyEgg={buyEgg}
      onBuyBooster={buyBooster}
    />
  );
}