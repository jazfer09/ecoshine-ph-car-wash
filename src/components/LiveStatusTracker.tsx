import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WashStage } from '../types';
import {
  Activity,
  Car,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCw,
  Sparkles,
  Droplets,
  ShieldCheck,
  Coffee,
  MessageSquare,
  ChevronRight,
  Zap,
  Layers,
  Search,
  ThumbsUp,
  Star
} from 'lucide-react';

export const LiveStatusTracker: React.FC = () => {
  const {
    bookings,
    activeBooking,
    setActiveBookingId,
    simulateNextWashStage,
    updateBookingStage,
    setActiveView,
    rateBooking
  } = useApp();

  const [searchCode, setSearchCode] = useState('');
  const [ratingVal, setRatingVal] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);

  const currentBooking = activeBooking || bookings[0];

  const stages: { id: WashStage; label: string; desc: string; icon: string; minProgress: number }[] = [
    { id: 'queued', label: 'Queued in Bay', desc: 'Vehicle checked in and assigned to wash bay', icon: '📋', minProgress: 10 },
    { id: 'pre_rinse', label: 'Eco Pre-Rinse', desc: 'Closed-loop 95% recycled pressurized mud flush', icon: '💧', minProgress: 25 },
    { id: 'bio_foam', label: 'Coconut Bio-Foam Bath', desc: '100% biodegradable plant-active soap soak', icon: '🫧', minProgress: 45 },
    { id: 'steam_wash', label: '140°C Thermal Steam', desc: 'Disinfection of cabin, vents, rims & clear coat', icon: '♨️', minProgress: 65 },
    { id: 'drying', label: 'Microfiber Hand Dry', desc: 'Plush streak-free drying & organic tire dress', icon: '✨', minProgress: 80 },
    { id: 'inspection', label: 'Quality Inspection', desc: '10-point finish inspection by Master Detailer', icon: '🔍', minProgress: 95 },
    { id: 'completed', label: 'Ready for Pick-Up', desc: 'Pristine & eco-certified car ready at exit bay', icon: '🎉', minProgress: 100 },
  ];

  const getCurrentStageIndex = () => {
    if (!currentBooking) return 0;
    const idx = stages.findIndex((s) => s.id === currentBooking.washStatus);
    return idx >= 0 ? idx : 0;
  };

  const currentStageIdx = getCurrentStageIndex();

  const handleSearchBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;
    const found = bookings.find(
      (b) =>
        b.bookingCode.toUpperCase() === searchCode.trim().toUpperCase() ||
        b.plateNumber.toUpperCase().replace(/\s/g, '') === searchCode.trim().toUpperCase().replace(/\s/g, '')
    );
    if (found) {
      setActiveBookingId(found.id);
      setSearchCode('');
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentBooking) {
      rateBooking(currentBooking.id, ratingVal, feedbackText);
      setFeedbackSubmitted(true);
    }
  };

  if (!currentBooking) {
    return (
      <div className="py-16 text-center text-slate-500">
        <Car className="w-12 h-12 mx-auto mb-2 opacity-40" />
        <p>No active car wash bookings found.</p>
        <button
          onClick={() => setActiveView('booking')}
          className="mt-4 py-2 px-4 bg-blue-600 text-white text-xs font-bold rounded-xl"
        >
          Book Your Wash
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Top Header & Search Switcher */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                Live Car Wash Telemetry & Camera
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display mt-1">
              Active Wash Bay Tracker
            </h2>
          </div>

          {/* Quick Lookup Bar */}
          <form onSubmit={handleSearchBooking} className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Enter Code (e.g. ECO-7821)..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white uppercase font-mono"
              />
            </div>
            <button
              type="submit"
              className="py-2 px-3 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
            >
              Lookup
            </button>
          </form>
        </div>

        {/* Vehicle Info Card */}
        <div className="p-6 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 bg-white/20 text-white text-[11px] font-mono font-bold rounded-md">
                Ref: {currentBooking.bookingCode}
              </span>
              <span className="text-xs text-blue-200">
                📍 {currentBooking.branchName} • <strong>Bay #{currentBooking.bayNumber}</strong>
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="px-3 py-1 bg-yellow-400 text-slate-950 font-mono font-black text-lg sm:text-xl rounded-lg shadow-sm">
                {currentBooking.plateNumber}
              </span>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-display leading-tight">
                  {currentBooking.vehicleMake} {currentBooking.vehicleModel} ({currentBooking.vehicleColor})
                </h3>
                <p className="text-xs text-blue-100">{currentBooking.serviceName}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-end md:self-center">
            {/* Quick Simulate Button for Testing Live Updates */}
            <button
              id="btn-simulate-next-stage"
              onClick={() => simulateNextWashStage(currentBooking.id)}
              className="py-2 px-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 backdrop-blur-md transition-colors flex items-center space-x-1.5 cursor-pointer shadow-xs"
              title="Click to simulate advancing the wash to the next stage in real time"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Simulate Next Stage</span>
            </button>

            <button
              id="btn-switch-to-lounge"
              onClick={() => setActiveView('lounge')}
              className="py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center space-x-1.5"
            >
              <Coffee className="w-4 h-4" />
              <span>Relax in Lounge</span>
            </button>
          </div>
        </div>

        {/* Main Tracker & Live Camera Visualizer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Visualizer / Live Cam Simulation */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-lg border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                  <span className="text-xs font-black uppercase text-slate-800 dark:text-slate-200">
                    Live Feed • Bay #{currentBooking.bayNumber}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">FPS: 30 • 1080p Solar Cam</span>
              </div>

              {/* Camera Simulation Viewport */}
              <div className="relative my-3 h-64 bg-slate-950 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-4 border border-slate-800 shadow-inner">
                {/* Visualizer Effects based on current stage */}
                {currentBooking.washStatus === 'bio_foam' && (
                  <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-xs flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-white/60 animate-bubble" />
                    <div className="w-6 h-6 rounded-full bg-blue-200/50 animate-bubble" style={{ animationDelay: '1s' }} />
                    <div className="w-10 h-10 rounded-full bg-cyan-100/40 animate-bubble" style={{ animationDelay: '2s' }} />
                  </div>
                )}

                {currentBooking.washStatus === 'steam_wash' && (
                  <div className="absolute inset-0 bg-amber-500/5 backdrop-blur-xs flex items-center justify-center pointer-events-none">
                    <div className="w-full h-full bg-gradient-to-t from-white/20 via-transparent to-white/10 animate-pulse" />
                  </div>
                )}

                {/* Car Graphic */}
                <div className="relative z-10 text-center">
                  <div className="relative inline-block p-6 rounded-3xl bg-slate-900/90 border border-slate-700 shadow-2xl">
                    <Car className="w-20 h-20 text-blue-400 animate-pulse" />
                    <div className="absolute -top-2 -right-2 p-1.5 bg-blue-600 rounded-full text-white text-xs shadow-md">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="font-mono text-xs font-bold text-yellow-400 mt-2 bg-black/60 px-3 py-1 rounded-full border border-yellow-500/30 inline-block">
                    {currentBooking.plateNumber}
                  </p>
                </div>

                {/* Live Overlays */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/70 rounded-md text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                  <Zap className="w-3 h-3" />
                  <span>{stages[currentStageIdx]?.label}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs bg-black/75 backdrop-blur-md px-3 py-2 rounded-xl text-white border border-white/10">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[11px] text-slate-300">Est. Ready:</span>
                  </div>
                  <span className="font-bold text-emerald-400 font-mono text-xs">
                    {currentBooking.washStatus === 'completed' ? 'Ready for Release' : currentBooking.estimatedCompletion}
                  </span>
                </div>
              </div>

              {/* Technician & Bay Details */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs space-y-2 border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Lead Detailer:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    👨‍🔧 {currentBooking.technicianName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Water Recycled:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    💧 {currentBooking.waterSaved} Liters Saved
                  </span>
                </div>
                {currentBooking.notes && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-[11px]">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Customer Note: </span>
                    "{currentBooking.notes}"
                  </div>
                )}
              </div>
            </div>

            {/* Quality Checklist */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>10-Point Eco Inspection Checklist:</span>
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { name: 'Closed-Loop Mud Flush', done: currentStageIdx >= 1 },
                  { name: 'pH-Neutral Foam Soak', done: currentStageIdx >= 2 },
                  { name: '140°C Steam Sterilization', done: currentStageIdx >= 3 },
                  { name: 'Microfiber Streak-Free', done: currentStageIdx >= 4 },
                  { name: 'Organic Tire Dressing', done: currentStageIdx >= 5 },
                  { name: 'Master Final Inspection', done: currentStageIdx >= 6 },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-xl border flex items-center space-x-1.5 text-[11px] ${
                      item.done
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-semibold'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-400'
                    }`}
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${item.done ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span className="truncate">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Stage Step Tracker */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                    Wash Progress Timeline
                  </h3>
                  <p className="text-xs text-slate-500">
                    Live updates synchronized directly with Bay #{currentBooking.bayNumber} sensors.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-blue-600 dark:text-blue-400 font-display">
                    {currentBooking.stageProgress}%
                  </span>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Completed</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="my-6">
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-700">
                  <div
                    className="bg-gradient-to-r from-blue-600 via-indigo-600 to-red-500 h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${currentBooking.stageProgress}%` }}
                  />
                </div>
              </div>

              {/* Stages List */}
              <div className="space-y-4">
                {stages.map((stage, idx) => {
                  const isDone = currentStageIdx > idx;
                  const isCurrent = currentStageIdx === idx;
                  const isUpcoming = currentStageIdx < idx;

                  return (
                    <div
                      key={stage.id}
                      className={`relative flex items-start space-x-4 p-3.5 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-blue-50/80 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 shadow-md ring-2 ring-blue-600/20'
                          : isDone
                          ? 'bg-slate-50/60 dark:bg-slate-800/40 border-emerald-200 dark:border-emerald-900/60'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-60'
                      }`}
                    >
                      {/* Left Badge / Icon */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 font-bold ${
                          isCurrent
                            ? 'bg-blue-600 text-white shadow-md animate-pulse'
                            : isDone
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : stage.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4
                            className={`text-sm font-bold truncate ${
                              isCurrent
                                ? 'text-blue-900 dark:text-blue-200'
                                : isDone
                                ? 'text-slate-800 dark:text-slate-200'
                                : 'text-slate-500'
                            }`}
                          >
                            {stage.label}
                          </h4>
                          {isCurrent && (
                            <span className="px-2 py-0.5 text-[10px] font-black bg-blue-600 text-white rounded-full uppercase tracking-wider animate-pulse">
                              In Progress
                            </span>
                          )}
                          {isDone && (
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Done</span>
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {stage.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rating / Feedback Box if completed */}
            {currentBooking.washStatus === 'completed' && !feedbackSubmitted && (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 rounded-3xl border border-emerald-200 dark:border-emerald-800 shadow-md space-y-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h4 className="text-base font-bold text-emerald-950 dark:text-emerald-200 font-display">
                    How was your EcoShine Car Wash experience?
                  </h4>
                </div>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  Rate Kuya Jun & the bay crew. Earn +50 EcoPoints toward your next free wash!
                </p>

                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRatingVal(star)}
                      className="p-1 text-2xl hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= ratingVal
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-2">
                    {ratingVal} of 5 Stars
                  </span>
                </div>

                <form onSubmit={handleFeedbackSubmit} className="space-y-2">
                  <input
                    type="text"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Tell us what you liked (e.g. super shiny finish, loved the waiting lounge coffee)..."
                    className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 rounded-xl text-slate-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center space-x-1"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Submit Review (+50 EcoPoints)</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
