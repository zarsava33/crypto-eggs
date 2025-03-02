import React from 'react';
import { useGame } from '../contexts/GameContext';
import { Shop } from '../components/Shop';
import type { ShopItem } from '../types';

export function ShopSection() {
  const { state, actions } = useGame();

  return (
    <Shop
      money={state.money}
      onBuyEgg={actions.buyEgg}
      onBuyBooster={actions.buyBooster}
    />
  );
}