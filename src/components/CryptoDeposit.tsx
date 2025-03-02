import { useState } from 'react';
import { Copy, ExternalLink } from 'lucide-react';
import { SUPPORTED_CRYPTOCURRENCIES, getDepositAddress, validateDepositAmount } from '../services/cryptoService';
import type { CryptoCurrency, CryptoWallet, CryptoCurrencySymbol } from '../types';
import { useGame } from '../contexts/GameContext';

type WalletType = 'binance' | 'bybit' | 'telegram';

interface CryptoDepositProps {
  onDeposit: (amount: number, currency: CryptoCurrencySymbol, wallet: CryptoWallet) => Promise<void>;
  depositHistory?: Array<{
    id: string;
    amount: number;
    currency: CryptoCurrencySymbol;
    timestamp: number;
    wallet?: {
      type: WalletType;
    };
  }>;
}

export function CryptoDeposit({ onDeposit, depositHistory = [] }: CryptoDepositProps) {
  const { state: gameState } = useGame();
  const [selectedCurrency, setSelectedCurrency] = useState<CryptoCurrency>(SUPPORTED_CRYPTOCURRENCIES[0]);
  const [selectedWallet, setSelectedWallet] = useState<WalletType>('binance');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const depositAddress = getDepositAddress(selectedCurrency.symbol, selectedCurrency.network);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(depositAddress);
  };

  const handleExternalLink = () => {
    window.open(`https://www.binance.com/en/my/wallet/account/main/deposit/crypto/${selectedCurrency.symbol}`, '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (isNaN(numAmount)) {
      alert('Please enter a valid amount');
      return;
    }

    if (!validateDepositAmount(numAmount, selectedCurrency.symbol)) {
      alert(`Minimum deposit is ${selectedCurrency.minDeposit} ${selectedCurrency.symbol}`);
      return;
    }

    setIsProcessing(true);
    try {
      const wallet: CryptoWallet = {
        type: selectedWallet,
        address: depositAddress,
        network: selectedCurrency.network,
        currency: selectedCurrency.symbol
      };
      await onDeposit(numAmount, selectedCurrency.symbol, wallet);
      setAmount('');
    } catch (error) {
      console.error('Error processing deposit:', error);
      alert('Failed to process deposit. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Deposit Crypto
        </h3>
      </div>

      {/* Selector de criptomoneda */}
      <div className="grid grid-cols-3 gap-2">
        {SUPPORTED_CRYPTOCURRENCIES.map((crypto) => (
          <button
            key={crypto.symbol}
            onClick={() => setSelectedCurrency(crypto)}
            className={`p-4 rounded-xl transition-all duration-300 ${
              selectedCurrency.symbol === crypto.symbol
                ? 'bg-purple-500/20 shadow-lg'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="text-2xl mb-2">{crypto.icon}</div>
            <div className="font-semibold">{crypto.symbol}</div>
            <div className="text-xs text-gray-400">{crypto.network}</div>
          </button>
        ))}
      </div>

      {/* Selector de billetera */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setSelectedWallet('binance')}
          className={`p-3 rounded-lg transition-all duration-300 ${
            selectedWallet === 'binance'
              ? 'bg-purple-500/20 shadow-lg'
              : 'bg-white/5 hover:bg-white/10'
          }`}
        >
          Binance
        </button>
        <button
          onClick={() => setSelectedWallet('bybit')}
          className={`p-3 rounded-lg transition-all duration-300 ${
            selectedWallet === 'bybit'
              ? 'bg-purple-500/20 shadow-lg'
              : 'bg-white/5 hover:bg-white/10'
          }`}
        >
          Bybit
        </button>
        <button
          onClick={() => setSelectedWallet('telegram')}
          className={`p-3 rounded-lg transition-all duration-300 ${
            selectedWallet === 'telegram'
              ? 'bg-purple-500/20 shadow-lg'
              : 'bg-white/5 hover:bg-white/10'
          }`}
        >
          Telegram
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Amount ({selectedCurrency.symbol})
          </label>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-white/5 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder={`Min: ${selectedCurrency.minDeposit}`}
              step="any"
              required
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {selectedCurrency.symbol}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Deposit Address ({selectedCurrency.network})
          </label>
          <div className="relative">
            <input
              type="text"
              value={depositAddress}
              readOnly
              className="w-full bg-white/5 rounded-lg px-4 py-2 pr-20"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
              <button
                type="button"
                onClick={handleCopyAddress}
                className="p-1 hover:text-purple-400 transition-colors"
              >
                <Copy size={20} />
              </button>
              <button
                type="button"
                onClick={handleExternalLink}
                className="p-1 hover:text-purple-400 transition-colors"
              >
                <ExternalLink size={20} />
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg py-2 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isProcessing ? 'Processing...' : 'Deposit'}
        </button>
      </form>

      {/* Historial de depósitos */}
      {depositHistory.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold mb-2">Recent Deposits</h4>
          <div className="space-y-2">
            {depositHistory.slice(0, 3).map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
              >
                <div className="text-sm">
                  {tx.amount} {tx.currency}
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(tx.timestamp).toLocaleString()}
                  {tx.wallet && <span className="ml-1">via {tx.wallet.type}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 