import type { CryptoCurrency, CryptoCurrencySymbol, Transaction } from '../types';

export const SUPPORTED_CRYPTOCURRENCIES: CryptoCurrency[] = [
  {
    symbol: 'USDT',
    name: 'Tether USD',
    network: 'TRC20',
    minDeposit: 10,
    icon: '💰'
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    network: 'BTC',
    minDeposit: 0.001,
    icon: '₿'
  }
];

const DEMO_ADDRESSES = {
  USDT: 'TRx1K5PKxQ8yD9RLvA51CfHqY3KEy4MnE2',
  BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
};

export function getDepositAddress(currency: CryptoCurrencySymbol, network: string): string {
  // En un entorno real, esto se obtendría de un servicio de backend
  return crypto.randomUUID();
}

export function validateDepositAmount(amount: number, currency: CryptoCurrencySymbol): boolean {
  const crypto = SUPPORTED_CRYPTOCURRENCIES.find(c => c.symbol === currency);
  if (!crypto) return false;
  return amount >= crypto.minDeposit;
}

export function processDeposit(amount: number, currency: CryptoCurrencySymbol): Transaction {
  const timestamp = Date.now();
  return {
    id: crypto.randomUUID(),
    type: 'deposit',
    amount,
    currency,
    status: 'completed',
    timestamp,
    wallet: {
      address: currency === 'BTC' ? 'bc1qq4v73jd2kg7jcu7zu93haskxfe36x7ksu40glq' : 'TETdBsgM5BdWCM9W5RUiUnXGH3jUyhVy5M',
      network: currency,
      balance: amount
    }
  };
}

export async function checkTransactionStatus(txId: string): Promise<'pending' | 'completed' | 'failed'> {
  // Simular verificación del estado de la transacción
  await new Promise(resolve => setTimeout(resolve, 1000));
  return Math.random() > 0.5 ? 'completed' : 'pending';
} 