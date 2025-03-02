import { Plus, Egg, Cpu, Gift, Calendar } from 'lucide-react';
import { EggCard } from '../components/EggCard';
import { EggIcon } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { Farm } from '../components/Farm';
import { Stats } from '../components/Stats';
import { BoosterTimer } from '../components/BoosterTimer';

export function MainSection() {
  const { state, startIncubation, buyMiningRig, upgradeMiningRig, claimDailyReward, canClaimDailyReward, collectEgg } = useGame();

  return (
    <div className="space-y-8">
      {/* Recompensas Diarias */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold gradient-text">Recompensas Diarias</h2>
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-purple-400" />
            <span className="text-sm text-purple-400">
              Día {state.currentStreak}/7
            </span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {state.dailyRewards.map((reward, index) => (
            <div
              key={reward.day}
              className={`glass-card rounded-xl p-3 text-center ${
                reward.claimed ? 'opacity-50' : ''
              } ${index === state.currentStreak - 1 && canClaimDailyReward ? 'ring-2 ring-purple-400 animate-pulse' : ''}`}
            >
              <div className="flex flex-col items-center gap-1">
                <Gift
                  size={24}
                  className={`${
                    reward.specialReward ? 'text-yellow-400' : 'text-purple-400'
                  } ${reward.claimed ? 'opacity-50' : ''}`}
                />
                <span className="text-xs text-gray-400">Día {reward.day}</span>
                <span className={`text-sm font-medium ${reward.claimed ? 'line-through opacity-50' : ''}`}>
                  {reward.coins} 🪙
                </span>
                {reward.specialReward && (
                  <span className={`text-xs text-yellow-400 ${reward.claimed ? 'line-through opacity-50' : ''}`}>
                    +{reward.specialReward}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          className="game-button w-full"
          onClick={claimDailyReward}
          disabled={!canClaimDailyReward}
        >
          {canClaimDailyReward ? '¡Reclamar Recompensa!' : 'Vuelve Mañana'}
        </button>
      </div>

      {/* Sección de huevo actual */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-bold gradient-text">Tu Huevo Actual</h2>
        {state.currentEgg ? (
          <>
            <div className="flex items-center justify-center p-8">
              <div className="relative">
                <Egg 
                  size={120} 
                  className={`${
                    state.currentEgg.progress >= 100 
                      ? 'text-yellow-400 animate-bounce' 
                      : 'text-purple-400 animate-float'
                  }`} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-full animate-pulse-slow" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Progreso</span>
                <span className={`${
                  state.currentEgg.progress >= 100 
                    ? 'text-yellow-400' 
                    : 'text-purple-400'
                }`}>
                  {state.currentEgg.progress}%
                </span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    state.currentEgg.progress >= 100
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-500 animate-pulse'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}
                  style={{ width: `${Math.min(100, state.currentEgg.progress)}%` }}
                />
              </div>
              {state.currentEgg.timeRemaining > 0 && (
                <p className="text-sm text-center text-gray-400">
                  Tiempo restante: {Math.floor(state.currentEgg.timeRemaining / 60)}:{(state.currentEgg.timeRemaining % 60).toString().padStart(2, '0')}
                </p>
              )}
            </div>
            <button 
              className={`game-button w-full ${
                state.currentEgg.progress >= 100 
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-500 animate-pulse' 
                  : ''
              }`}
              onClick={collectEgg}
              disabled={state.currentEgg.progress < 100}
            >
              {state.currentEgg.progress >= 100 ? '¡Recolectar Huevo!' : 'Incubando...'}
            </button>
          </>
        ) : (
          <div className="text-center text-gray-400 py-8">
            No tienes ningún huevo incubándose
          </div>
        )}
      </div>

      {/* Estadísticas */}
      <Stats />

      {/* Minería */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold gradient-text">Centro de Minería</h2>
          <div className="flex items-center gap-2">
            <Cpu size={20} className="text-purple-400" />
            <span className="text-sm text-purple-400">
              +{state.totalMiningRate.toFixed(1)}/s
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {state.miningRigs.map((rig) => (
            <div key={rig.id} className="glass-card rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-white">{rig.name}</h3>
                  <p className="text-sm text-gray-400">
                    Poder: {rig.power.toFixed(1)} | +{rig.coinsPerSecond.toFixed(1)}/s
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-purple-400">Owned: {rig.owned}</p>
                  <p className="text-sm text-gray-400">
                    Total: +{(rig.coinsPerSecond * rig.owned).toFixed(1)}/s
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2 mt-3">
                <button
                  className="game-button flex-1"
                  onClick={() => buyMiningRig(rig.id)}
                  disabled={state.coins < rig.cost}
                >
                  Comprar ({rig.cost})
                </button>
                {rig.owned > 0 && (
                  <button
                    className="game-button flex-1"
                    onClick={() => upgradeMiningRig(rig.id)}
                    disabled={state.coins < rig.cost * 2}
                  >
                    Mejorar ({rig.cost * 2})
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tienda */}
      <div className="glass-card rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-bold gradient-text">Tienda</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            className={`glass-card rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer ${
              state.coins < 100 ? 'opacity-50' : ''
            }`}
            onClick={() => startIncubation('Huevo Común')}
            disabled={state.currentEgg !== null || state.coins < 100}
          >
            <Egg size={32} className="text-purple-400 mb-2" />
            <h3 className="font-medium">Huevo Común</h3>
            <p className="text-sm text-gray-400">100 monedas</p>
          </button>
          <button
            className={`glass-card rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer ${
              state.coins < 500 ? 'opacity-50' : ''
            }`}
            onClick={() => startIncubation('Huevo Raro')}
            disabled={state.currentEgg !== null || state.coins < 500}
          >
            <Egg size={32} className="text-pink-400 mb-2" />
            <h3 className="font-medium">Huevo Raro</h3>
            <p className="text-sm text-gray-400">500 monedas</p>
          </button>
        </div>
      </div>
    </div>
  );
}