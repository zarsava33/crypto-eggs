export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Egg {
  id: string;
  rarity: Rarity;
  level: number;
  power: number;
  image: string;
  status: 'incubating' | 'ready' | 'hatched';
  incubationStartTime?: number;
  incubationTimeRequired: number;
}

export interface Booster {
  id: string;
  type: 'incubation' | 'power' | 'luck';
  multiplier: number;
  duration: number;
  startTime: number;
}

export interface GameState {
  balance: number;
  eggs: Egg[];
  activeBoosters: Booster[];
  stats: {
    totalEggs: number;
    legendaryEggs: number;
    totalPower: number;
    averageLevel: number;
  };
}

export interface CryptoCurrency {
  symbol: string;
  name: string;
  network: string;
  minDeposit: number;
  icon: string;
}

export interface CryptoWallet {
  type: 'telegram' | 'binance' | 'bybit';
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  wallet: CryptoWallet;
  status: 'pending' | 'completed' | 'failed';
  timestamp: number;
} 