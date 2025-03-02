import React from 'react';
import { useGame } from '../contexts/GameContext';
import { motion } from 'framer-motion';

export function Farm() {
  const { state, actions } = useGame();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 gradient-text">Mi Granja</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.eggs.map((egg) => (
          <motion.div
            key={egg.id}
            className="glass-card p-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">{egg.type}</h3>
              <span className="text-sm text-gray-400">{egg.status}</span>
            </div>
            
            {egg.status === 'ready' && (
              <button
                onClick={actions.collectEgg}
                className="w-full btn-primary mt-2"
              >
                Recolectar
              </button>
            )}
            
            {egg.status === 'idle' && (
              <button
                onClick={actions.startIncubation}
                className="w-full btn-secondary mt-2"
              >
                Incubar
              </button>
            )}
            
            {egg.status === 'incubating' && egg.incubationEndTime && (
              <div className="mt-2">
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: (new Date(egg.incubationEndTime).getTime() - Date.now()) / 1000,
                      ease: "linear"
                    }}
                  />
                </div>
                <p className="text-sm text-center mt-1 text-gray-400">
                  {new Date(egg.incubationEndTime).toLocaleTimeString()}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
} 