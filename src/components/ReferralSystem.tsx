import React, { useState } from 'react';
import { Share2, Copy } from 'lucide-react';
import { generateReferralCode } from '../services/referralService';

interface ReferralSystemProps {
  onCopySuccess: () => void;
  referralBonus: number;
}

export function ReferralSystem({ onCopySuccess, referralBonus }: ReferralSystemProps) {
  const [referralCode] = useState(() => generateReferralCode());

  const copyReferralLink = async () => {
    const referralLink = `${window.location.origin}?ref=${referralCode}`;
    await navigator.clipboard.writeText(referralLink);
    onCopySuccess();
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-lg mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="text-purple-500" />
        <h2 className="text-2xl font-bold">Refer Friends</h2>
      </div>
      
      <div className="space-y-4">
        <p className="text-sm opacity-80">
          Share your referral code with friends and both get ${referralBonus} bonus when they start playing!
        </p>
        
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={referralCode}
            readOnly
            className="flex-1 px-3 py-2 bg-white/5 rounded-lg border border-white/10"
          />
          <button
            onClick={copyReferralLink}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] rounded-lg hover:opacity-90 transition-opacity"
          >
            <Copy size={16} />
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}