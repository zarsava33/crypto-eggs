export type CryptoCurrencySymbol = 'BTC' | 'USDT';

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';
export type EggStatus = 'idle' | 'incubating' | 'ready' | 'hatched';
export type Section = 'farm' | 'shop' | 'inventory' | 'friends' | 'profile';

export interface CryptoCurrency {
  symbol: CryptoCurrencySymbol;
  name: string;
  network: string;
  minDeposit: number;
  icon: string;
}

export interface CryptoInfo {
  currency: CryptoCurrencySymbol;
  network: string;
  address: string;
}

export interface Egg {
  id: string;
  type: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  level: number;
  power: number;
  image: string;
  status: 'incubating' | 'ready' | 'hatched';
  purchaseDate: Date;
  incubationDays: number;
  incubationStartTime: number;
  incubationEndTime: number;
  value: number;
}

export interface Booster {
  id: string;
  type: 'mining' | 'hatching' | 'experience';
  multiplier: number;
  duration: number;
  active: boolean;
  timeRemaining?: number;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'egg' | 'booster';
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
  incubationDays?: number;
  value?: number;
  multiplier?: number;
  duration?: number;
}

export interface CryptoWallet {
  address: string;
  network: CryptoCurrencySymbol;
  balance: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal';
  amount: number;
  currency: CryptoCurrencySymbol;
  status: 'pending' | 'completed' | 'failed';
  timestamp: number;
  wallet: CryptoWallet;
}

export interface Player {
  id: string;
  address?: string;
  username?: string;
  totalEggsCollected: number;
  level: number;
  experience: number;
  lastActive: number;
}

export interface GameState {
  money: number;
  eggs: Egg[];
  activeBoosters: Booster[];
  totalEggsCollected: number;
  depositHistory: Transaction[];
  connectedWallets: CryptoWallet[];
  stats: {
    totalEggs: number;
    legendaryEggs: number;
    totalPower: number;
    averageLevel: number;
  };
}

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

export interface ActiveBooster extends Booster {
  isActive: boolean;
  remainingTime: number;
}

export interface SupportRequest {
  id: string;
  type: 'bug' | 'support';
  title: string;
  description: string;
  status: 'open' | 'closed';
  timestamp: Date;
}

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    query_id: string;
    user: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code: string;
    };
    auth_date: string;
    hash: string;
  };
  ready: () => void;
  expand: () => void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}