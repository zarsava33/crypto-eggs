import { Trophy, Medal } from 'lucide-react';

export function LeaderboardSection() {
  const leaderboardData = [
    { rank: 1, username: 'CryptoMaster', score: 15000, isCurrentUser: false },
    { rank: 2, username: 'EggLegend', score: 12500, isCurrentUser: false },
    { rank: 3, username: 'DragonTamer', score: 10000, isCurrentUser: false },
    { rank: 4, username: 'Player123', score: 8500, isCurrentUser: true },
    { rank: 5, username: 'CoolHunter', score: 7500, isCurrentUser: false },
  ];

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-2xl font-bold gradient-text mb-6">Tabla de Líderes</h2>
        
        {/* Filtros */}
        <div className="flex gap-2 mb-6">
          <button className="game-button">Diario</button>
          <button className="game-button bg-opacity-50">Semanal</button>
          <button className="game-button bg-opacity-50">Global</button>
        </div>

        {/* Lista de líderes */}
        <div className="space-y-3">
          {leaderboardData.map((player) => (
            <div
              key={player.rank}
              className={`glass-card rounded-xl p-4 flex items-center gap-4 ${
                player.isCurrentUser ? 'border-purple-500/50' : ''
              }`}
            >
              {/* Rango */}
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                {player.rank <= 3 ? (
                  <Medal
                    size={24}
                    className={
                      player.rank === 1
                        ? 'text-yellow-400'
                        : player.rank === 2
                        ? 'text-gray-400'
                        : 'text-orange-400'
                    }
                  />
                ) : (
                  <span className="text-lg font-bold text-gray-400">
                    #{player.rank}
                  </span>
                )}
              </div>

              {/* Información del jugador */}
              <div className="flex-1">
                <h3 className={`font-medium ${
                  player.isCurrentUser ? 'text-purple-400' : 'text-white'
                }`}>
                  {player.username}
                </h3>
                <p className="text-sm text-gray-400">
                  {player.score.toLocaleString()} puntos
                </p>
              </div>

              {/* Trofeo para el jugador actual */}
              {player.isCurrentUser && (
                <Trophy size={20} className="text-purple-400 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Estadísticas personales */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-xl font-bold gradient-text mb-4">Tus Estadísticas</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card rounded-xl p-4">
            <p className="text-sm text-gray-400">Mejor Posición</p>
            <p className="text-2xl font-bold gradient-text">#4</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <p className="text-sm text-gray-400">Mejor Puntuación</p>
            <p className="text-2xl font-bold gradient-text">8,500</p>
          </div>
        </div>
      </div>
    </div>
  );
} 