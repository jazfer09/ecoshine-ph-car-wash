import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Droplets,
  Search,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Activity,
  Coffee,
  Sun,
  Award,
  Zap,
  Gauge,
  Car
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveView, bookings, setActiveBookingId, addNotification } = useApp();
  const [searchPlate, setSearchPlate] = useState('');
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);

  const handleTrackSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchPlate.trim()) return;

    const query = searchPlate.trim().toUpperCase();
    const found = bookings.find(
      (b) =>
        b.plateNumber.toUpperCase().replace(/\s/g, '').includes(query.replace(/\s/g, '')) ||
        b.bookingCode.toUpperCase().includes(query)
    );

    if (found) {
      setActiveBookingId(found.id);
      setActiveView('live-tracker');
      setSearchFeedback(null);
    } else {
      setSearchFeedback(`No active wash found for "${searchPlate}". Try sample plate "NDL 8821" or booking code "ECO-7821".`);
    }
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-12 lg:pt-10 lg:pb-16 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/80 dark:to-slate-950">
      {/* Subtle decorative background blobs with PH colors */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-red-500/10 dark:bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-emerald-500/10 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Eco Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 text-xs font-semibold shadow-2xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Philippines’ Premier 100% Eco-Friendly Auto Detailing</span>
              <span className="text-red-600 dark:text-red-400 font-bold">🇵🇭</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] font-display">
              Pristine Clean Cars.{' '}
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-red-600 bg-clip-text text-transparent">
                95% Less Water.
              </span>{' '}
              Zero Toxic Runoff.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience closed-loop bio-steam detailing powered by 100% biodegradable Philippine coconut surfactants and solar wash bays. Track your car’s live wash status in real-time or relax in our premium waiting lounge with free Wi-Fi and artisan coffee.
            </p>

            {/* Live Quick Plate Tracker Bar */}
            <div className="p-3 bg-white dark:bg-slate-800/90 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 max-w-xl mx-auto lg:mx-0">
              <form onSubmit={handleTrackSearch} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <input
                    type="text"
                    id="hero-plate-search-input"
                    value={searchPlate}
                    onChange={(e) => {
                      setSearchPlate(e.target.value);
                      if (searchFeedback) setSearchFeedback(null);
                    }}
                    placeholder="Enter Plate # (e.g. NDL 8821) or Code..."
                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white uppercase font-medium placeholder:capitalize"
                  />
                </div>
                <button
                  id="btn-hero-track-wash"
                  type="submit"
                  className="py-2.5 px-5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5 shrink-0 cursor-pointer"
                >
                  <Activity className="w-4 h-4" />
                  <span>Track Live Bay</span>
                </button>
              </form>

              {searchFeedback && (
                <p className="text-[11px] text-amber-700 dark:text-amber-300 mt-2 px-1 text-left">
                  {searchFeedback}
                </p>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                id="btn-hero-book-now"
                onClick={() => setActiveView('booking')}
                className="py-3.5 px-6 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-indigo-950 text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center space-x-2 cursor-pointer group"
              >
                <Calendar className="w-4 h-4 text-blue-300" />
                <span>Book Eco-Wash (Starts at ₱150)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="btn-hero-view-pricelist"
                onClick={() => setActiveView('services')}
                className="py-3.5 px-5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>View Full ₱ Pricelist</span>
              </button>

              <button
                id="btn-hero-waiting-lounge"
                onClick={() => setActiveView('lounge')}
                className="py-3.5 px-4 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-xl border border-emerald-200 dark:border-emerald-800 transition-all flex items-center space-x-1.5"
              >
                <Coffee className="w-4 h-4 text-emerald-600" />
                <span>Customer Lounge & Wi-Fi</span>
              </button>
            </div>

            {/* Quick feature tags */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-left">
              <div className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Closed-Loop Filtration</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                <span>100% Coconut Shampoo</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
                <span>GCash / Maya / QR Ph</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Live Bay Card / Eco Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
                <div className="flex items-center space-x-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                    Live Wash Bay #2 • Diliman QC
                  </span>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 rounded-md">
                  Active Clean
                </span>
              </div>

              {/* Animated Bay Graphic */}
              <div className="my-4 relative h-48 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-4 border border-blue-900/40">
                {/* Floating bubbles */}
                <div className="absolute top-4 left-6 w-5 h-5 rounded-full bg-blue-300/30 backdrop-blur-xs animate-bubble" />
                <div className="absolute bottom-6 right-8 w-6 h-6 rounded-full bg-white/40 backdrop-blur-xs animate-bubble" style={{ animationDelay: '1.5s' }} />
                <div className="absolute top-10 right-12 w-4 h-4 rounded-full bg-cyan-300/40 backdrop-blur-xs animate-bubble" style={{ animationDelay: '3s' }} />

                {/* Car Silhouette with shine */}
                <div className="relative z-10 text-center">
                  <div className="inline-block p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-2">
                    <Car className="w-14 h-14 text-white" />
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <span className="font-mono font-black text-sm text-yellow-300 bg-black/50 px-2 py-0.5 rounded border border-yellow-400/40">
                      NDL 8821
                    </span>
                    <span className="text-xs text-blue-200 font-medium">Toyota Fortuner</span>
                  </div>
                </div>

                {/* Status Bar inside camera */}
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-blue-200 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                  <div className="flex items-center space-x-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Bio-Foam Stage (45%)</span>
                  </div>
                  <span className="font-mono font-bold text-emerald-400">~25 mins left</span>
                </div>
              </div>

              {/* Bay Details & Live Controls */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Assigned Detailer:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Kuya Jun & Bay Alpha</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Water Conservation:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">310 Liters Saved</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-red-500 h-full rounded-full w-[45%]" />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    id="btn-hero-view-active-tracker"
                    onClick={() => {
                      setActiveBookingId('bk-101');
                      setActiveView('live-tracker');
                    }}
                    className="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl text-center shadow-xs transition-colors flex items-center justify-center space-x-1"
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>Full Live Tracker</span>
                  </button>

                  <button
                    id="btn-hero-order-coffee"
                    onClick={() => setActiveView('lounge')}
                    className="flex-1 py-2.5 px-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-bold rounded-xl text-center transition-colors flex items-center justify-center space-x-1"
                  >
                    <Coffee className="w-3.5 h-3.5 text-amber-500" />
                    <span>Lounge Café</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Eco Statistics Metrics Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xs">
            <p className="text-2xl sm:text-3xl font-black text-blue-700 dark:text-blue-400 font-display">1.6M+ L</p>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">Potable Water Recycled</p>
            <p className="text-[10px] text-slate-400">95% closed-loop system</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xs">
            <p className="text-2xl sm:text-3xl font-black text-red-600 dark:text-red-400 font-display">₱150</p>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">Starting Eco-Wash</p>
            <p className="text-[10px] text-slate-400">Transparent PH Peso rates</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xs">
            <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-display">100%</p>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">Biodegradable Soap</p>
            <p className="text-[10px] text-slate-400">Zero harsh acid or caustic soda</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xs">
            <p className="text-2xl sm:text-3xl font-black text-amber-500 dark:text-amber-400 font-display">4.92 ★</p>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">Customer Satisfaction</p>
            <p className="text-[10px] text-slate-400">Over 15,000+ happy PH drivers</p>
          </div>
        </div>
      </div>
    </section>
  );
};
