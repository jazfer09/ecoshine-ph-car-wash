import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Droplets,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Heart,
  Car,
  Sparkles,
  Award
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, branches } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors">
      {/* Philippine Flag Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-white to-red-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-red-600 flex items-center justify-center text-white shadow-md">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white font-display">
                  EcoShine<span className="text-red-500">.PH</span>
                </span>
                <p className="text-[10px] text-slate-400 font-medium -mt-1">
                  100% Eco-Friendly Auto Detailing & Lounge
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The Philippines' premier closed-loop, water-saving car wash. Saving over 180 liters of potable water per wash while giving your vehicle a showroom mirror shine using plant-based coconut surfactants and 140°C thermal dry steam.
            </p>

            <div className="flex items-center space-x-2 text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-900 p-2.5 rounded-xl w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>DENR EMB & LLDA Compliant • Zero Toxic Runoff</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-display">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => setActiveView('home')}
                  className="hover:text-white transition-colors"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('services')}
                  className="hover:text-white transition-colors"
                >
                  ₱ Price List & Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('booking')}
                  className="hover:text-white transition-colors"
                >
                  Book Online Reservation
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('live-tracker')}
                  className="hover:text-white transition-colors text-red-400 font-semibold"
                >
                  Live Bay Cam Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('lounge')}
                  className="hover:text-white transition-colors text-yellow-400 font-semibold"
                >
                  Customer Waiting Lounge Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('loyalty')}
                  className="hover:text-white transition-colors"
                >
                  Loyalty Stamp Rewards
                </button>
              </li>
            </ul>
          </div>

          {/* Branches */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-display">
              Locations & Hubs
            </h4>
            <ul className="space-y-2 text-slate-400">
              {branches.slice(0, 4).map((b) => (
                <li key={b.id}>
                  <p className="font-semibold text-slate-300">{b.name}</p>
                  <p className="text-[11px] text-slate-500">{b.address}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment & Support */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs font-display">
              Payments Accepted
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {['GCash', 'Maya', 'QR Ph', 'Visa', 'Mastercard', 'BDO Online', 'Cash'].map((pay) => (
                <span
                  key={pay}
                  className="px-2 py-1 bg-slate-800 border border-slate-700 rounded-md text-[10px] text-slate-300 font-bold"
                >
                  {pay}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-slate-400">Support Line:</p>
              <p className="font-mono font-bold text-white">(02) 8888-SHINE</p>
              <p className="text-[10px] text-slate-500">support@ecoshine.ph</p>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} EcoShine PH Inc. All rights reserved. Proudly Philippine Made 🇵🇭.</p>
          <div className="flex items-center space-x-4 text-[11px]">
            <span>Water Conservation Certified</span>
            <span>•</span>
            <span>Eco-Friendly Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
