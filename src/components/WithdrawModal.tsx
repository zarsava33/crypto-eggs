import React, { useState } from 'react';
import { X, Info } from 'lucide-react';
import { GAME_CONFIG } from '../config/constants';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWithdraw: (amount: number) => void;
  maxAmount: number;
}

export function WithdrawModal({ isOpen, onClose, onWithdraw, maxAmount }: WithdrawModalProps) {
  const [amount, setAmount] = useState<string>('');
  const actualMaxAmount = maxAmount - GAME_CONFIG.WITHDRAWAL_FEE;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount > 0 && withdrawAmount <= actualMaxAmount) {
      onWithdraw(withdrawAmount);
      setAmount('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--tg-theme-bg-color)] rounded-lg p-6 w-full max-w-md relative">
        {/* ... existing button and title ... */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium opacity-80 mb-1">
              Amount (max: ${actualMaxAmount.toFixed(2)})
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0.01"
              max={actualMaxAmount}
              step="0.01"
              className="w-full px-3 py-2 bg-transparent border border-current/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--tg-theme-button-color)]"
              required
            />
            <div className="mt-2 flex items-start gap-2 text-sm opacity-70">
              <Info size={16} className="mt-0.5 flex-shrink-0" />
              <p>A ${GAME_CONFIG.WITHDRAWAL_FEE} processing fee will be automatically deducted from your withdrawal.</p>
            </div>
          </div>
          {/* ... rest of the form ... */}
        </form>
      </div>
    </div>
  );
}