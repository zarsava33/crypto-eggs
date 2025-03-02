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
  rarity: string;
  level: number;
  power: number;
  image: string;
  status: EggStatus;
  purchaseDate: Date;
  incubationDays: number;
  incubationStartTime: number;
  incubationEndTime: number;
  incubationTimeRequired: number;
  value: number;
}

export interface Booster {
  id: string;
  type: string;
  duration: number;
  multiplier: number;
  active: boolean;
  startTime: number;
  timeRemaining?: number;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'egg' | 'booster';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  image: string;
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

export interface DailyReward {
  amount: number;
  timestamp: number;
}

export interface GameState {
  coins: number;
  eggs: {
    id: string;
    type: string;
    status: EggStatus;
    incubationStartTime?: string;
    incubationEndTime?: string;
  }[];
  boosters: {
    id: string;
    type: string;
    quantity: number;
  }[];
  profile: Profile;
  inventory: {
    eggs: string[];
    boosters: string[];
  };
  stats: {
    eggsHatched: number;
    coinsEarned: number;
    boostersUsed: number;
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

export interface Profile {
  username: string;
  avatar: string;
  level: number;
  experience: number;
  wallet: string;
  createdAt: string;
  lastLogin: string;
}

export interface DonationTier {
  id: string;
  name: string;
  description: string;
  requiredAmount: number;
  benefits: string[];
  icon: string;
}

export interface ReferralTier {
  id: string;
  name: string;
  description: string;
  requiredReferrals: number;
  rewards: {
    coins: number;
    eggs: number;
    boosters: number;
  };
  icon: string;
}

export interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  currentTier: string;
  nextTier: string | null;
  progressToNextTier: number;
}

export interface Referral {
  id: string;
  username: string;
  joinedAt: string;
  status: 'active' | 'inactive';
  earnings: number;
}

export interface MiningRig {
  level: number;
  hashRate: number;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}