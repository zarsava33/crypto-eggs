import type { CryptoCurrencySymbol } from './types';

interface DonationAddress {
  symbol: CryptoCurrencySymbol;
  address: string;
  network: string;
  logo: string;
}

export const DONATION_ADDRESSES: DonationAddress[] = [
  {
    symbol: 'BTC',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    network: 'BTC',
    logo: '/assets/btc-logo.png'
  },
  {
    symbol: 'USDT',
    address: 'TNPeeaaFB7K9cmo4uQpcU32zGK8G1NYqeL',
    network: 'USDT',
    logo: '/assets/usdt-logo.png'
  }
]; 