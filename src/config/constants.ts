export const GAME_CONFIG = {
  INITIAL_MONEY: 5,
  WITHDRAWAL_FEE: 5,
  REFERRAL_BONUS: 5,
};

export const SHOP_ITEMS = [
  {
    id: 'basic-egg',
    type: 'basic',
    name: 'Basic Egg',
    cost: 1,
    incubationDays: 5,
    value: 3,
    description: 'A common egg that produces modest returns.'
  },
  {
    id: 'rare-egg',
    type: 'rare',
    name: 'Rare Egg',
    cost: 5,
    incubationDays: 3,
    value: 12,
    description: 'Hatches faster and produces better returns.'
  },
  {
    id: 'legendary-egg',
    type: 'legendary',
    name: 'Legendary Egg',
    cost: 15,
    incubationDays: 2,
    value: 40,
    description: 'Premium egg with exceptional returns.'
  }
];

export const TIME_BOOSTERS = [
  {
    id: '24h-booster',
    name: '24 Hours Boost',
    duration: 24,
    cost: 24,
    description: 'Speeds up incubation by 24 hours'
  },
  {
    id: '48h-booster',
    name: '48 Hours Boost',
    duration: 48,
    cost: 48,
    description: 'Speeds up incubation by 48 hours'
  },
  {
    id: '72h-booster',
    name: '72 Hours Boost',
    duration: 72,
    cost: 72,
    description: 'Speeds up incubation by 72 hours'
  }
];