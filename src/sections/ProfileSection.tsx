import { useState } from 'react';
import { User, Edit2, Save, X, Gift, Copy, ExternalLink, Globe, Heart, Users, Share2 } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import type { Profile } from '../types';

export function ProfileSection() {
  const { state, actions } = useGame();
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Profile>(state.profile);
  const [referralCode, setReferralCode] = useState('');

  const handleSaveProfile = () => {
    actions.updateProfile(editedProfile);
    setEditMode(false);
  };

  const handleApplyReferralCode = async () => {
    if (referralCode) {
      const success = await actions.applyReferralCode(referralCode);
      if (success) {
        setReferralCode('');
      }
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('¡Copiado al portapapeles!');
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const donationTiers = actions.getDonationTiers();
  const currentTier = actions.getCurrentTier();
  const referralTiers = actions.getReferralTiers();
  const referralStats = actions.getReferralStats();
  const referrals = actions.getReferrals();
  const donationAddresses = actions.getDonationAddresses();

  if (!state || !state.profile) {
    return <div className="text-center p-8">Cargando perfil...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Perfil Principal */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold gradient-text">Tu Perfil</h2>
            <span className={`text-2xl ${currentTier.color}`}>{currentTier.icon}</span>
          </div>
          {!editMode ? (
            <button
              className="game-button-small"
              onClick={() => setEditMode(true)}
            >
              <Edit2 size={16} className="mr-1" />
              Editar
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                className="game-button-small text-green-400"
                onClick={handleSaveProfile}
              >
                <Save size={16} className="mr-1" />
                Guardar
              </button>
              <button
                className="game-button-small text-red-400"
                onClick={() => setEditMode(false)}
              >
                <X size={16} className="mr-1" />
                Cancelar
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-6">
          <div className="relative">
            <div className={`w-32 h-32 rounded-full overflow-hidden ${
              currentTier.name !== 'NONE' ? 'ring-4' : ''
            } ${
              currentTier.name === 'BRONZE' ? 'ring-amber-600' :
              currentTier.name === 'SILVER' ? 'ring-gray-300' :
              currentTier.name === 'GOLD' ? 'ring-yellow-400' :
              currentTier.name === 'DIAMOND' ? 'ring-blue-400' : ''
            }`}>
              <img
                src={state.profile.avatar}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 p-1 rounded-full bg-gray-800">
              <span className="text-xl">{currentTier.icon}</span>
            </div>
          </div>

          <div className="flex-1 space-y-4">
            {editMode ? (
              <>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Nombre de Usuario</label>
                  <input
                    type="text"
                    className="game-input w-full"
                    value={editedProfile.username}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, username: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Email</label>
                  <input
                    type="email"
                    className="game-input w-full"
                    value={editedProfile.email}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Bio</label>
                  <textarea
                    className="game-input w-full h-20 resize-none"
                    value={editedProfile.bio || ''}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, bio: e.target.value })
                    }
                    placeholder="Cuéntanos sobre ti..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">País</label>
                    <input
                      type="text"
                      className="game-input w-full"
                      value={editedProfile.country || ''}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, country: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Huevo Favorito</label>
                    <input
                      type="text"
                      className="game-input w-full"
                      value={editedProfile.favoriteEgg || ''}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, favoriteEgg: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Discord (opcional)</label>
                    <input
                      type="text"
                      className="game-input w-full"
                      value={editedProfile.discord || ''}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, discord: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400">Twitter (opcional)</label>
                    <input
                      type="text"
                      className="game-input w-full"
                      value={editedProfile.twitter || ''}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, twitter: e.target.value })
                      }
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h3 className={`text-xl font-bold ${currentTier.color}`}>
                    {state.profile.username}
                  </h3>
                  <p className="text-gray-400">{state.profile.email}</p>
                </div>
                {state.profile.bio && (
                  <p className="text-gray-300">{state.profile.bio}</p>
                )}
                <div className="flex flex-wrap gap-4">
                  {state.profile.country && (
                    <div className="flex items-center gap-1 text-gray-400">
                      <Globe size={16} />
                      <span>{state.profile.country}</span>
                    </div>
                  )}
                  {state.profile.favoriteEgg && (
                    <div className="flex items-center gap-1 text-gray-400">
                      <Heart size={16} />
                      <span>{state.profile.favoriteEgg}</span>
                    </div>
                  )}
                </div>
                {(state.profile.discord || state.profile.twitter) && (
                  <div className="flex flex-wrap gap-4">
                    {state.profile.discord && (
                      <p className="text-gray-400">Discord: {state.profile.discord}</p>
                    )}
                    {state.profile.twitter && (
                      <p className="text-gray-400">Twitter: {state.profile.twitter}</p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Nivel de Donador */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-2xl font-bold gradient-text mb-4">Nivel de Donador</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-lg font-bold ${currentTier.color}`}>
                {currentTier.icon} Nivel {currentTier.name}
              </p>
              <p className="text-gray-400">
                Total donado: ${state.profile.totalDonated.toFixed(2)}
              </p>
            </div>
            {currentTier.name !== 'DIAMOND' && (
              <div className="text-right">
                <p className="text-sm text-gray-400">
                  Siguiente nivel en:
                </p>
                <p className="text-purple-400">
                  ${(donationTiers[donationTiers.length - 1].minAmount - state.profile.totalDonated).toFixed(2)}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-gray-400 text-sm">Beneficios actuales:</p>
            <ul className="space-y-1">
              {currentTier.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span>
                  <span className="text-gray-300">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {donationTiers.map((tier) => (
              <div
                key={tier.name}
                className={`glass-card rounded-xl p-3 text-center ${
                  tier.name === currentTier.name ? 'ring-2 ring-purple-400' : ''
                }`}
              >
                <div className="text-2xl mb-1">{tier.icon}</div>
                <p className={`text-sm font-bold ${tier.color}`}>{tier.name}</p>
                <p className="text-xs text-gray-400">${tier.minAmount}+</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-2xl font-bold gradient-text mb-4">Estadísticas</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-card rounded-xl p-4">
            <h3 className="text-gray-400 text-sm">Nivel</h3>
            <p className="text-2xl font-bold gradient-text">{state.level}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <h3 className="text-gray-400 text-sm">Experiencia</h3>
            <p className="text-2xl font-bold gradient-text">{state.experience}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <h3 className="text-gray-400 text-sm">Huevos Incubados</h3>
            <p className="text-2xl font-bold gradient-text">{state.eggsHatched}</p>
          </div>
          <div className="glass-card rounded-xl p-4">
            <h3 className="text-gray-400 text-sm">Monedas</h3>
            <p className="text-2xl font-bold gradient-text">{Math.floor(state.coins)}</p>
          </div>
        </div>
      </div>

      {/* Donaciones */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Gift className="text-purple-400" size={24} />
          <h2 className="text-2xl font-bold gradient-text">Apoya el Proyecto</h2>
        </div>
        
        <p className="text-gray-400 mb-4">
          ¡Ayúdanos a seguir mejorando el juego! Puedes hacer una donación usando cualquiera de estas criptomonedas:
        </p>

        <div className="space-y-4">
          {donationAddresses.map(({ symbol, address }) => (
            <div key={symbol} className="flex items-center space-x-2">
              <span className="text-sm text-gray-400">{symbol}:</span>
              <code className="flex-1 bg-gray-700 rounded px-2 py-1 text-sm">
                {address}
              </code>
              <button
                onClick={() => copyToClipboard(address)}
                className="px-3 py-1 bg-gray-700 rounded text-sm hover:bg-gray-600 transition-colors"
              >
                Copiar
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <a
            href="https://github.com/tuproyecto/crypto-eggs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ExternalLink size={16} className="mr-1" />
            Ver proyecto en GitHub
          </a>
        </div>
      </div>

      {/* Sistema de Referidos */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="text-purple-400" size={24} />
          <h2 className="text-2xl font-bold gradient-text">Sistema de Referidos</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Estadísticas de Referidos */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">Tus Estadísticas</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-4">
                <h4 className="text-sm text-gray-400">Referidos Directos</h4>
                <p className="text-2xl font-bold text-green-400">
                  {referralStats.totalReferrals}
                </p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <h4 className="text-sm text-gray-400">Referidos Indirectos</h4>
                <p className="text-2xl font-bold text-blue-400">
                  {referralStats.indirectReferrals}
                </p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <h4 className="text-sm text-gray-400">Red Total</h4>
                <p className="text-2xl font-bold text-purple-400">
                  {referralStats.networkReferrals}
                </p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <h4 className="text-sm text-gray-400">Ganancias Totales</h4>
                <p className="text-2xl font-bold gradient-text">
                  ${referralStats.totalEarnings.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Bonus de Minería */}
            <div className="glass-card rounded-xl p-4">
              <h4 className="text-sm text-gray-400">Bonus de Minería por Referidos</h4>
              <p className="text-2xl font-bold text-yellow-400">
                +{(referralStats.miningBonus * 100).toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Código de Referido y Sistema */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">Tu Código de Referido</h3>
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center justify-between">
                <p className="text-xl font-mono text-purple-400">
                  {state.profile.referralCode}
                </p>
                <button
                  className="game-button-small"
                  onClick={() => copyToClipboard(state.profile.referralCode)}
                >
                  <Copy size={16} className="mr-1" />
                  Copiar
                </button>
              </div>
              <button
                className="game-button w-full mt-4"
                onClick={() => {
                  const url = `${window.location.origin}?ref=${state.profile.referralCode}`;
                  copyToClipboard(url);
                }}
              >
                <Share2 size={16} className="mr-2" />
                Compartir Link
              </button>
            </div>

            {!state.profile.referredBy && (
              <div className="glass-card rounded-xl p-4">
                <h4 className="text-sm text-gray-400 mb-2">¿Tienes un código?</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="game-input flex-1"
                    placeholder="Ingresa el código"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                  />
                  <button
                    className="game-button"
                    onClick={handleApplyReferralCode}
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Niveles de Recompensa */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">Recompensas por Nivel</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {referralTiers.map((tier) => (
              <div key={tier.level} className="glass-card rounded-xl p-4">
                <h4 className={`text-lg font-bold ${tier.color} mb-2`}>
                  Nivel {tier.level}: {tier.name}
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">🪙</span>
                    <span className="text-gray-300">{tier.reward.coins} monedas</span>
                  </li>
                  {tier.reward.eggs > 0 && (
                    <li className="flex items-center gap-2">
                      <span className="text-purple-400">🥚</span>
                      <span className="text-gray-300">{tier.reward.eggs} huevo(s)</span>
                    </li>
                  )}
                  <li className="flex items-center gap-2">
                    <span className="text-blue-400">⚡</span>
                    <span className="text-gray-300">
                      +{(tier.reward.miningBonus * 100).toFixed(1)}% minería
                    </span>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de Referidos */}
        {referrals.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-300 mb-4">Tus Referidos</h3>
            <div className="space-y-2">
              {referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="glass-card rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${referral.username}`}
                        alt={referral.username}
                        className="w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-300">{referral.username}</p>
                      <p className="text-sm text-gray-400">
                        Nivel {referral.tier} • Unido el {new Date(referral.joinedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded ${
                    referral.isActive ? 'bg-green-900/50 text-green-400' : 'bg-gray-800/50 text-gray-400'
                  }`}>
                    {referral.isActive ? 'Activo' : 'Inactivo'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}