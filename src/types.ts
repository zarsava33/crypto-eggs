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
  rarity?: string;
  image: string;
  incubationDays?: number;
  value?: number;
  duration?: number;
  multiplier?: number;
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
  eggs: Egg[];
  inventory: ShopItem[];
  balance: number;
  money: number;
  coins: number;
  miningRig: MiningRig;
  profile: Profile;
  lastDailyReward: number | null;
  currentStreak: number;
  dailyRewards: DailyReward[];
  activeBoosters: Booster[];
  totalEggsCollected: number;
  eggsHatched: number;
  level: number;
  experience: number;
  currentEgg: {
    type: string;
    progress: number;
    timeRemaining: number;
  } | null;
  stats: {
    totalEggs: number;
    legendaryEggs: number;
    totalPower: number;
    averageLevel: number;
  };
  referralStats: {
    directReferrals: number;
    indirectReferrals: number;
    networkReferrals: number;
    totalEarnings: number;
    miningBonus: number;
  };
  referrals: Referral[];
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
  email?: string;
  bio?: string;
  country?: string;
  favoriteEgg?: string;
  discord?: string;
  twitter?: string;
  totalDonated: number;
  referralCode?: string;
  referredBy?: string;
}

export interface DonationTier {
  id: string;
  name: string;
  minAmount: number;
  benefits: string[];
  icon: string;
  color: string;
  network: string;
  logo: string;
}

export interface ReferralTier {
  id: string;
  name: string;
  level: number;
  minReferrals: number;
  reward: {
    coins: number;
    eggs: number;
    miningBonus: number;
  };
  color: string;
}

export interface ReferralStats {
  totalReferrals: number;
  activeReferrals: number;
  totalEarnings: number;
  currentTier: ReferralTier;
  indirectReferrals: number;
  networkReferrals: number;
  miningBonus: number;
}

export interface Referral {
  id: string;
  userId: string;
  username: string;
  joinDate: string;
  joinedAt: number;
  status: 'active' | 'inactive';
  isActive: boolean;
  earnings: number;
  tier: number;
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