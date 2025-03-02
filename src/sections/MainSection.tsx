import React from 'react';
import { useGame } from '../contexts/GameContext';

export function MainSection() {
  const { state } = useGame();

  return (
    <div className="py-6 space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6">
        <h1 className="text-3xl font-bold gradient-text">
          Crypto Eggs Game
        </h1>
        <p className="text-gray-400 mt-2">
          ¡Bienvenido al juego de crianza de huevos crypto!
        </p>
      </div>

      {/* Balance */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Tu Balance</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card rounded-xl p-4">
            <p className="text-sm text-gray-400">Monedas</p>
            <p className="text-2xl font-bold gradient-text">
              {state.coins.toFixed(2)}
            </p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-sm text-gray-400">Nivel</p>
            <p className="text-2xl font-bold gradient-text">
              {state.level}
            </p>
          </div>
        </div>
      </div>

      {/* Huevos */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Tus Huevos</h2>
        {state.eggs.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {state.eggs.map(egg => (
              <div key={egg.id} className="glass-card rounded-xl p-4">
                <p className="text-sm text-gray-400">{egg.type}</p>
                <p className="text-lg font-bold text-white">Nivel {egg.level}</p>
                <p className="text-sm text-gray-400">Poder: {egg.power}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-8">
            No tienes huevos todavía. ¡Visita la tienda para conseguir uno!
          </p>
        )}
      </div>
    </div>
  );
}