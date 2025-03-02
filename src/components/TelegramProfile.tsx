import { MessageCircle } from 'lucide-react';

export function TelegramProfile() {
  return (
    <div className="glass-card rounded-xl p-6 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-white/10">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="text-blue-400" />
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
          Telegram Profile
        </h3>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center overflow-hidden border-2 border-white/10">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Profile"
              className="w-14 h-14"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
        </div>

        <div className="flex-1">
          <h4 className="text-lg font-semibold text-white">@BoltUser</h4>
          <p className="text-sm text-gray-400">Connected since Jan 2024</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-400 border border-blue-500/20">
              Premium
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900/30 text-indigo-400 border border-indigo-500/20">
              Level 5
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center p-3 rounded-lg bg-black/20 border border-white/5">
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            245
          </p>
          <p className="text-xs text-gray-400 mt-1">Games</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-black/20 border border-white/5">
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            18
          </p>
          <p className="text-xs text-gray-400 mt-1">Wins</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-black/20 border border-white/5">
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            73%
          </p>
          <p className="text-xs text-gray-400 mt-1">Win Rate</p>
        </div>
      </div>
    </div>
  );
} 