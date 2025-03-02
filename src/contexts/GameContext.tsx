import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { ShopItem, CryptoWallet, CryptoCurrencySymbol, Egg, Booster, EggStatus } from '../types';

interface MiningRig {
  id: number;
  name: string;
  power: number;
  cost: number;
  coinsPerSecond: number;
  owned: number;
}

interface DailyReward {
  day: number;
  coins: number;
  claimed: boolean;
  specialReward?: string;
}

interface ReferralReward {
  coins: number;
  eggs: number;
  miningBonus: number;
}

interface ReferralTier {
  level: number;
  name: string;
  reward: ReferralReward;
  color: string;
}

interface Referral {
  userId: string;
  username: string;
  joinedAt: string;
  isActive: boolean;
  tier: number;
}

interface UserProfile {
  username: string;
  avatar: string;
  email: string;
  discord?: string;
  twitter?: string;
  bio?: string;
  country?: string;
  favoriteEgg?: string;
  donationTier: 'NONE' | 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND';
  totalDonated: number;
  referralCode: string;
  referredBy?: string;
  totalReferrals: number;
  referralEarnings: number;
}

interface CryptoDonation {
  network: 'BTC' | 'USDT';
  address: string;
  logo: string;
}

interface DonationTier {
  name: 'NONE' | 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND';
  minAmount: number;
  color: string;
  benefits: string[];
  icon: string;
}

const DONATION_TIERS: DonationTier[] = [
  {
    name: 'NONE',
    minAmount: 0,
    color: 'text-gray-400',
    benefits: [],
    icon: '👤'
  },
  {
    name: 'BRONZE',
    minAmount: 10,
    color: 'text-amber-600',
    benefits: [
      'Insignia especial en el perfil',
      'Color de nombre personalizado',
      '+5% de monedas al minar'
    ],
    icon: '🥉'
  },
  {
    name: 'SILVER',
    minAmount: 50,
    color: 'text-gray-300',
    benefits: [
      'Todos los beneficios anteriores',
      'Avatar con marco plateado',
      '+10% de monedas al minar',
      'Acceso a huevos especiales'
    ],
    icon: '🥈'
  },
  {
    name: 'GOLD',
    minAmount: 100,
    color: 'text-yellow-400',
    benefits: [
      'Todos los beneficios anteriores',
      'Avatar con marco dorado',
      '+20% de monedas al minar',
      'Minero exclusivo',
      'Efectos visuales especiales'
    ],
    icon: '🥇'
  },
  {
    name: 'DIAMOND',
    minAmount: 500,
    color: 'text-blue-400',
    benefits: [
      'Todos los beneficios anteriores',
      'Avatar con marco de diamante',
      '+50% de monedas al minar',
      'Huevos legendarios exclusivos',
      'Nombre en el Salón de la Fama',
      'Acceso anticipado a nuevas funciones'
    ],
    icon: '💎'
  }
];

const DONATION_ADDRESSES: CryptoDonation[] = [
  { 
    network: 'BTC',
    address: 'bc1qq4v73jd2kg7jcu7zu93haskxfe36x7ksu40glq',
    logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg'
  },
  {
    network: 'USDT',
    address: 'TETdBsgM5BdWCM9W5RUiUnXGH3jUyhVy5M',
    logo: 'https://cryptologos.cc/logos/tether-usdt-logo.svg'
  }
];

interface GameState {
  coins: number;
  currentEgg: {
    type: string;
    progress: number;
    timeRemaining: number;
  } | null;
  eggsHatched: number;
  level: number;
  experience: number;
  miningRigs: MiningRig[];
  totalMiningRate: number;
  lastDailyReward: string | null;
  currentStreak: number;
  dailyRewards: DailyReward[];
  profile: UserProfile;
  referrals: Referral[];
  referralStats: {
    directReferrals: number;
    indirectReferrals: number;
    networkReferrals: number;
    totalEarnings: number;
    miningBonus: number;
  };
}

interface GameContextType {
  state: GameState;
  addCoins: (amount: number) => void;
  startIncubation: (eggType: string) => void;
  collectEgg: () => void;
  buyMiningRig: (rigId: number) => void;
  upgradeMiningRig: (rigId: number) => void;
  claimDailyReward: () => void;
  canClaimDailyReward: boolean;
  updateProfile: (data: Partial<UserProfile>) => void;
  getDonationAddresses: () => CryptoDonation[];
  getDonationTiers: () => DonationTier[];
  getCurrentTier: () => DonationTier;
  recordDonation: (amount: number) => void;
  getReferralTiers: () => ReferralTier[];
  getReferralStats: () => GameState['referralStats'];
  getReferrals: () => Referral[];
  applyReferralCode: (code: string) => void;
  generateReferralCode: () => string;
}

const initialMiningRigs: MiningRig[] = [
  {
    id: 1,
    name: 'Minero Básico',
    power: 1,
    cost: 500,
    coinsPerSecond: 0.1,
    owned: 0
  },
  {
    id: 2,
    name: 'Minero Avanzado',
    power: 3,
    cost: 2000,
    coinsPerSecond: 0.5,
    owned: 0
  },
  {
    id: 3,
    name: 'Super Minero',
    power: 10,
    cost: 10000,
    coinsPerSecond: 2,
    owned: 0
  }
];

const initialDailyRewards: DailyReward[] = [
  { day: 1, coins: 100, claimed: false },
  { day: 2, coins: 200, claimed: false },
  { day: 3, coins: 300, claimed: false, specialReward: 'Huevo Raro' },
  { day: 4, coins: 400, claimed: false },
  { day: 5, coins: 500, claimed: false },
  { day: 6, coins: 600, claimed: false, specialReward: 'Minero Avanzado' },
  { day: 7, coins: 1000, claimed: false, specialReward: 'Huevo Legendario' }
];

const REFERRAL_TIERS: ReferralTier[] = [
  {
    level: 1,
    name: "Directo",
    reward: {
      coins: 1000,
      eggs: 1,
      miningBonus: 0.05
    },
    color: "text-green-400"
  },
  {
    level: 2,
    name: "Indirecto",
    reward: {
      coins: 500,
      eggs: 0,
      miningBonus: 0.02
    },
    color: "text-blue-400"
  },
  {
    level: 3,
    name: "Red",
    reward: {
      coins: 250,
      eggs: 0,
      miningBonus: 0.01
    },
    color: "text-purple-400"
  }
];

const initialState: GameState = {
  coins: 1000,
  currentEgg: null,
  eggsHatched: 0,
  level: 1,
  experience: 0,
  miningRigs: initialMiningRigs,
  totalMiningRate: 0,
  lastDailyReward: null,
  currentStreak: 1,
  dailyRewards: initialDailyRewards,
  profile: {
    username: 'Jugador',
    avatar: '/avatars/default.png',
    email: '',
    donationTier: 'NONE',
    totalDonated: 0,
    referralCode: '',
    totalReferrals: 0,
    referralEarnings: 0
  },
  referrals: [],
  referralStats: {
    directReferrals: 0,
    indirectReferrals: 0,
    networkReferrals: 0,
    totalEarnings: 0,
    miningBonus: 0
  }
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(initialState);
  const [canClaimDailyReward, setCanClaimDailyReward] = useState(true);

  // Verificar recompensas diarias
  useEffect(() => {
    const checkDailyReward = () => {
      const lastReward = state.lastDailyReward ? new Date(state.lastDailyReward) : null;
      const now = new Date();
      
      if (!lastReward) {
        setCanClaimDailyReward(true);
        return;
      }

      // Verificar si es un nuevo día (después de las 00:00)
      const isNewDay = lastReward.getDate() !== now.getDate() ||
                      lastReward.getMonth() !== now.getMonth() ||
                      lastReward.getFullYear() !== now.getFullYear();

      setCanClaimDailyReward(isNewDay);
    };

    checkDailyReward();
    const interval = setInterval(checkDailyReward, 60000); // Verificar cada minuto
    return () => clearInterval(interval);
  }, [state.lastDailyReward]);

  // Efecto para la minería pasiva
  useEffect(() => {
    const miningInterval = setInterval(() => {
      if (state.totalMiningRate > 0) {
        setState(prev => ({
          ...prev,
          coins: prev.coins + prev.totalMiningRate
        }));
      }
    }, 1000);

    return () => clearInterval(miningInterval);
  }, [state.totalMiningRate]);

  // Efecto para progreso del huevo
  useEffect(() => {
    if (!state.currentEgg) return;

    const interval = setInterval(() => {
      setState(prev => {
        if (!prev.currentEgg) return prev;

        const newTimeRemaining = prev.currentEgg.timeRemaining - 1;
        const newProgress = Math.min(100, ((300 - newTimeRemaining) / 300) * 100);

        if (newTimeRemaining <= 0) {
          return {
            ...prev,
            currentEgg: {
              ...prev.currentEgg,
              progress: 100,
              timeRemaining: 0
            }
          };
        }

        return {
          ...prev,
          currentEgg: {
            ...prev.currentEgg,
            progress: Math.round(newProgress),
            timeRemaining: newTimeRemaining
          }
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.currentEgg]);

  const addCoins = (amount: number) => {
    setState(prev => ({
      ...prev,
      coins: prev.coins + amount
    }));
  };

  const startIncubation = (eggType: string) => {
    // Verificar el costo del huevo
    const cost = eggType === 'Huevo Común' ? 100 : 500;
    
    // Verificar si tiene suficientes monedas
    if (state.coins < cost) {
      return;
    }

    setState(prev => ({
      ...prev,
      coins: prev.coins - cost, // Descontar el costo
      currentEgg: {
        type: eggType,
        progress: 0,
        timeRemaining: 300 // 5 minutos en segundos
      }
    }));
  };

  const collectEgg = () => {
    if (!state.currentEgg || state.currentEgg.progress < 100) return;

    setState(prev => {
      const reward = prev.currentEgg?.type === 'Huevo Raro' ? 200 : 100;
      return {
        ...prev,
        currentEgg: null,
        eggsHatched: prev.eggsHatched + 1,
        coins: prev.coins + reward // Recompensa basada en el tipo de huevo
      };
    });
  };

  const buyMiningRig = (rigId: number) => {
    setState(prev => {
      const rig = prev.miningRigs.find(r => r.id === rigId);
      if (!rig || prev.coins < rig.cost) return prev;

      const updatedRigs = prev.miningRigs.map(r =>
        r.id === rigId ? { ...r, owned: r.owned + 1 } : r
      );

      return {
        ...prev,
        coins: prev.coins - rig.cost,
        miningRigs: updatedRigs,
        totalMiningRate: updatedRigs.reduce((total, r) => total + (r.coinsPerSecond * r.owned), 0)
      };
    });
  };

  const upgradeMiningRig = (rigId: number) => {
    setState(prev => {
      const rig = prev.miningRigs.find(r => r.id === rigId);
      if (!rig || prev.coins < rig.cost * 2) return prev;

      const updatedRigs = prev.miningRigs.map(r =>
        r.id === rigId ? { ...r, power: r.power * 1.5, coinsPerSecond: r.coinsPerSecond * 1.5 } : r
      );

      return {
        ...prev,
        coins: prev.coins - rig.cost * 2,
        miningRigs: updatedRigs,
        totalMiningRate: updatedRigs.reduce((total, r) => total + (r.coinsPerSecond * r.owned), 0)
      };
    });
  };

  const claimDailyReward = () => {
    if (!canClaimDailyReward) return;

    setState(prev => {
      const reward = prev.dailyRewards[prev.currentStreak - 1];
      if (!reward || reward.claimed) return prev;

      const updatedRewards = [...prev.dailyRewards];
      updatedRewards[prev.currentStreak - 1] = { ...reward, claimed: true };

      // Aplicar recompensas
      let newCoins = prev.coins + reward.coins;
      let updatedMiningRigs = [...prev.miningRigs];

      // Manejar recompensas especiales
      if (reward.specialReward) {
        if (reward.specialReward === 'Minero Avanzado') {
          updatedMiningRigs = updatedMiningRigs.map(rig => 
            rig.name === 'Minero Avanzado' ? { ...rig, owned: rig.owned + 1 } : rig
          );
        }
        // Aquí puedes agregar más lógica para otros tipos de recompensas especiales
      }

      // Calcular nueva tasa de minería
      const newTotalMiningRate = updatedMiningRigs.reduce(
        (total, rig) => total + (rig.coinsPerSecond * rig.owned),
        0
      );

      return {
        ...prev,
        coins: newCoins,
        miningRigs: updatedMiningRigs,
        totalMiningRate: newTotalMiningRate,
        lastDailyReward: new Date().toISOString(),
        currentStreak: prev.currentStreak < 7 ? prev.currentStreak + 1 : 1,
        dailyRewards: updatedRewards
      };
    });

    setCanClaimDailyReward(false);
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setState(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...data,
        // Actualizar avatar si el username cambia
        avatar: data.username 
          ? `https://api.dicebear.com/7.x/pixel-art/svg?seed=${data.username}`
          : prev.profile.avatar
      }
    }));
  };

  const getDonationAddresses = () => DONATION_ADDRESSES;

  const getDonationTiers = () => DONATION_TIERS;

  const getCurrentTier = () => {
    const { totalDonated } = state.profile;
    return DONATION_TIERS.reduce((highest, tier) => {
      return totalDonated >= tier.minAmount ? tier : highest;
    }, DONATION_TIERS[0]);
  };

  const recordDonation = (amount: number) => {
    setState(prev => {
      const newTotal = prev.profile.totalDonated + amount;
      const newTier = DONATION_TIERS.reduce((highest, tier) => {
        return newTotal >= tier.minAmount ? tier : highest;
      }, DONATION_TIERS[0]);

      return {
        ...prev,
        profile: {
          ...prev.profile,
          totalDonated: newTotal,
          donationTier: newTier.name
        }
      };
    });
  };

  const generateRandomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const getReferralTiers = () => REFERRAL_TIERS;

  const getReferralStats = () => state.referralStats;

  const getReferrals = () => state.referrals;

  const applyReferralCode = (code: string) => {
    if (state.profile.referredBy) {
      console.error('Ya fuiste referido por otro usuario');
      return;
    }

    if (code === state.profile.referralCode) {
      console.error('No puedes usar tu propio código de referido');
      return;
    }

    // Simular la verificación del código (en una implementación real, esto sería una llamada a la API)
    setState(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        referredBy: code
      }
    }));

    // Simular la actualización de recompensas (en una implementación real, esto actualizaría en cascada)
    addCoins(REFERRAL_TIERS[0].reward.coins);
  };

  const generateReferralCode = () => {
    const newCode = generateRandomCode();
    setState(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        referralCode: newCode
      }
    }));
    return newCode;
  };

  const contextValue = {
    state,
    addCoins,
    startIncubation,
    collectEgg,
    buyMiningRig,
    upgradeMiningRig,
    claimDailyReward,
    canClaimDailyReward,
    updateProfile,
    getDonationAddresses,
    getDonationTiers,
    getCurrentTier,
    recordDonation,
    getReferralTiers,
    getReferralStats,
    getReferrals,
    applyReferralCode,
    generateReferralCode
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame debe ser usado dentro de un GameProvider');
  }
  return context;
};

export default GameProvider; 