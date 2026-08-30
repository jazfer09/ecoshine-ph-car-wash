import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LoyaltyReward } from '../types';
import {
  Award,
  Sparkles,
  Droplets,
  CheckCircle2,
  Ticket,
  Coffee,
  Cpu,
  ChevronRight,
  ShieldCheck,
  Gift,
  Share2,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoyaltyRewardsDashboard: React.FC = () => {
  const { customer, rewards, redeemReward, setActiveView } = useApp();
  const [redeemSuccess, setRedeemSuccess] = useState<string | null>(null);
  const [redeemError, setRedeemError] = useState<string | null>(null);

  const tiers = [
    { name: 'Eco Bronze', threshold: '0 - 2 Washes', multiplier: '1x Points', perk: 'Standard closed-loop wash' },
    { name: 'Eco Silver', threshold: '3 - 7 Washes', multiplier: '1.2x Points', perk: 'Free Wi-Fi + 5% off add-ons' },
    { name: 'Eco Gold', threshold: '8 - 14 Washes', multiplier: '1.5x Points', perk: 'Free lounge drinks + Priority bay reservation' },
    { name: 'Eco Diamond', threshold: '15+ Washes', multiplier: '2.0x Points', perk: 'Complimentary ceramic booster + VIP bay express' },
  ];

  const handleRedeem = (reward: LoyaltyReward) => {
    if (customer.loyaltyPoints < reward.pointsCost) {
      setRedeemError(`Kulang ang EcoPoints mo. You need ${reward.pointsCost - customer.loyaltyPoints} more points for this perk.`);
      setTimeout(() => setRedeemError(null), 4000);
      return;
    }

    const success = redeemReward(reward.id);
    if (success) {
      confetti({ particleCount: 70, spread: 60 });
      setRedeemSuccess(`🎉 ${reward.title} unlocked! Code: ${reward.id.toUpperCase()}`);
      setTimeout(() => setRedeemSuccess(null), 5000);
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>EcoRewards Club Philippines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
            Loyalty Dashboard & Eco Impact
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Earn 1 EcoPoint per ₱10 spent. Unlock free washes, complimentary lounge beverages, and certified water conservation badges.
          </p>
        </div>

        {/* Member Profile Card & Balance */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Balance Card */}
          <div className="md:col-span-7 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-200">
                  Eco Member Pass
                </span>
                <h3 className="text-2xl font-extrabold font-display mt-0.5">{customer.name}</h3>
                <p className="text-xs text-blue-200">Member ID: #{customer.id.toUpperCase()}</p>
              </div>
              <span className="px-3 py-1 bg-amber-400 text-slate-950 text-xs font-black rounded-full shadow-md uppercase tracking-wider">
                {customer.tier}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/15">
              <div>
                <span className="text-[11px] text-blue-200 uppercase font-semibold">EcoPoints Balance</span>
                <p className="text-3xl font-black text-yellow-300 font-display mt-0.5">
                  {customer.loyaltyPoints}
                </p>
              </div>

              <div>
                <span className="text-[11px] text-blue-200 uppercase font-semibold">Total Washes</span>
                <p className="text-3xl font-black text-white font-display mt-0.5">
                  {customer.completedWashes}
                </p>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <span className="text-[11px] text-blue-200 uppercase font-semibold">Water Saved</span>
                <p className="text-2xl font-black text-emerald-400 font-display mt-0.5">
                  {customer.totalWaterSavedLiters} L
                </p>
              </div>
            </div>
          </div>

          {/* Right Digital Stamp Card */}
          <div className="md:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Digital Eco-Stamp Card
                </h4>
                <span className="text-xs font-black text-blue-600 dark:text-blue-400 font-mono">
                  {customer.stampsCount} / 10 Stamps
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Wash 10 = <strong>100% FREE Eco Wash</strong>. Wash 5 = <strong>50% OFF</strong>!
              </p>
            </div>

            {/* Stamp Grid */}
            <div className="grid grid-cols-5 gap-2 my-2">
              {Array.from({ length: 10 }).map((_, idx) => {
                const isStamped = idx < customer.stampsCount;
                const isFifth = idx === 4;
                const isTenth = idx === 9;
                return (
                  <div
                    key={idx}
                    className={`h-12 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                      isStamped
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : isTenth
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-700'
                        : isFifth
                        ? 'bg-red-50 dark:bg-red-950/40 border-red-300 text-red-600'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
                    }`}
                  >
                    {isStamped ? (
                      <span className="text-sm">🌱</span>
                    ) : isTenth ? (
                      <span className="text-[9px] font-black uppercase leading-tight">FREE!</span>
                    ) : isFifth ? (
                      <span className="text-[9px] font-bold">50%</span>
                    ) : (
                      <span className="text-xs font-mono">{idx + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setActiveView('booking')}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              Book Wash to Get Next Stamp 🚗
            </button>
          </div>
        </div>

        {/* Notifications or Alerts on Redeem */}
        {redeemSuccess && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs text-emerald-800 dark:text-emerald-200 font-bold">
            {redeemSuccess}
          </div>
        )}
        {redeemError && (
          <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-2xl text-xs text-red-800 dark:text-red-200 font-bold">
            {redeemError}
          </div>
        )}

        {/* Redeemable Perks Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                Redeem Rewards with Your Points
              </h3>
              <p className="text-xs text-slate-500">
                Points are deducted from your balance immediately and give you instant voucher codes.
              </p>
            </div>
            <span className="text-xs font-bold text-blue-600">
              Balance: {customer.loyaltyPoints} pts
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rewards.map((reward) => {
              const canAfford = customer.loyaltyPoints >= reward.pointsCost;
              return (
                <div
                  key={reward.id}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 text-[10px] font-black bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded-md">
                        {reward.pointsCost} EcoPoints
                      </span>
                      <Gift className="w-4 h-4 text-amber-500" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {reward.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {reward.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={!canAfford}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                      canAfford
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Redeem Voucher' : `Need ${reward.pointsCost - customer.loyaltyPoints} more pts`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tier Privileges Comparison */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            EcoShine Membership Tiers & Privileges
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tiers.map((t) => {
              const isCurrent = customer.tier === t.name;
              return (
                <div
                  key={t.name}
                  className={`p-4 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/60 ring-2 ring-blue-600/30'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {t.name}
                    </h4>
                    {isCurrent && (
                      <span className="px-2 py-0.5 text-[9px] font-black bg-blue-600 text-white rounded-full uppercase">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 font-semibold mb-2">{t.threshold}</p>
                  <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-1">{t.multiplier}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{t.perk}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
