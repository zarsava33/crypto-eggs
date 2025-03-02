import React, { useEffect, useState } from 'react';
import { useGame } from '../contexts/GameContext';
import type { Profile, DonationTier, ReferralTier, ReferralStats, Referral } from '../types';
import { motion } from 'framer-motion';

export function ProfileSection() {
  const { state, actions } = useGame();
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Profile>(state.profile);
  const [referralCode, setReferralCode] = useState('');
  const [donationTiers, setDonationTiers] = useState<DonationTier[]>([]);
  const [currentTier, setCurrentTier] = useState<DonationTier | null>(null);
  const [referralTiers, setReferralTiers] = useState<ReferralTier[]>([]);
  const [referralStats, setReferralStats] = useState<ReferralStats | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);

  useEffect(() => {
    setDonationTiers(actions.getDonationTiers());
    setCurrentTier(actions.getCurrentTier());
    setReferralTiers(actions.getReferralTiers());
    setReferralStats(actions.getReferralStats());
    setReferrals(actions.getReferrals());
  }, [actions]);

  const handleSaveProfile = () => {
    actions.updateProfile(editedProfile);
    setEditMode(false);
  };

  const handleApplyReferralCode = () => {
    if (referralCode) {
      actions.applyReferralCode(referralCode);
      setReferralCode('');
    }
  };

  if (!state || !state.profile) {
    return <div className="text-center p-8">Cargando perfil...</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold mb-4 gradient-text">Mi Perfil</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400">Nombre de usuario</label>
            <input
              type="text"
              value={state.profile.username}
              onChange={(e) => setEditedProfile({ ...state.profile, username: e.target.value })}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400">Billetera</label>
            <input
              type="text"
              value={state.profile.wallet}
              onChange={(e) => setEditedProfile({ ...state.profile, wallet: e.target.value })}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-xl font-bold mb-4 gradient-text">Niveles de Donación</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {donationTiers.map((tier) => (
            <div
              key={tier.id}
              className={`p-4 rounded-lg bg-gray-800/50 ${
                currentTier?.id === tier.id ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              <div className="text-2xl mb-2">{tier.icon}</div>
              <h4 className="font-bold">{tier.name}</h4>
              <p className="text-sm text-gray-400">{tier.description}</p>
              <ul className="mt-2 space-y-1">
                {tier.benefits.map((benefit, index) => (
                  <li key={index} className="text-sm text-gray-300">• {benefit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-bold mb-4 gradient-text">Programa de Referidos</h3>
        {referralStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-gray-800/50">
              <p className="text-sm text-gray-400">Total de Referidos</p>
              <p className="text-2xl font-bold">{referralStats.totalReferrals}</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/50">
              <p className="text-sm text-gray-400">Referidos Activos</p>
              <p className="text-2xl font-bold">{referralStats.activeReferrals}</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/50">
              <p className="text-sm text-gray-400">Ganancias Totales</p>
              <p className="text-2xl font-bold">{referralStats.totalEarnings} coins</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/50">
              <p className="text-sm text-gray-400">Nivel Actual</p>
              <p className="text-2xl font-bold">{referralStats.currentTier}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {referralTiers.map((tier) => (
            <div key={tier.id} className="p-4 rounded-lg bg-gray-800/50">
              <div className="text-2xl mb-2">{tier.icon}</div>
              <h4 className="font-bold">{tier.name}</h4>
              <p className="text-sm text-gray-400">{tier.description}</p>
              <div className="mt-2">
                <p className="text-sm text-gray-300">Recompensas:</p>
                <ul className="space-y-1">
                  <li className="text-sm">• {tier.rewards.coins} coins</li>
                  <li className="text-sm">• {tier.rewards.eggs} huevos</li>
                  <li className="text-sm">• {tier.rewards.boosters} potenciadores</li>
                </ul>
              </div>
            </div>
          ))}
        </div>

        {referrals.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left text-sm font-medium text-gray-400">Usuario</th>
                  <th className="text-left text-sm font-medium text-gray-400">Fecha</th>
                  <th className="text-left text-sm font-medium text-gray-400">Estado</th>
                  <th className="text-left text-sm font-medium text-gray-400">Ganancias</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((referral) => (
                  <tr key={referral.id}>
                    <td className="py-2">{referral.username}</td>
                    <td className="py-2">{new Date(referral.joinedAt).toLocaleDateString()}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        referral.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {referral.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="py-2">{referral.earnings} coins</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-400">Aún no tienes referidos</p>
        )}
      </motion.div>
    </div>
  );
}