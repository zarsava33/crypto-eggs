import React from 'react';
import { Wallet } from 'lucide-react';

interface WalletConnectProps {
  address?: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function WalletConnect({ address, onConnect, onDisconnect }: WalletConnectProps) {
  return (
    <div className="flex items-center gap-2">
      {address ? (
        <button
          onClick={onDisconnect}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Wallet size={20} />
          Disconnect ({address.slice(0, 6)}...{address.slice(-4)})
        </button>
      ) : (
        <button
          onClick={onConnect}
          className="px-4 py-2 bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <Wallet size={20} />
          Connect Telegram Wallet
        </button>
      )}
    </div>
  );
}