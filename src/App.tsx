import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServiceMenuPriceList } from './components/ServiceMenuPriceList';
import { BookingSystem } from './components/BookingSystem';
import { LiveStatusTracker } from './components/LiveStatusTracker';
import { WaitingLoungeHub } from './components/WaitingLoungeHub';
import { LoyaltyRewardsDashboard } from './components/LoyaltyRewardsDashboard';
import { CustomerProfileHistory } from './components/CustomerProfileHistory';
import { AdminDashboard } from './components/AdminDashboard';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import {
  Car,
  Clock,
  Coffee,
  Sparkles,
  Droplets,
  Activity,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeView, setActiveView, activeBooking, currentRole } = useApp();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navbar */}
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenNotifications={() => setIsNotificationOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <div>
            <HeroSection />
            <ServiceMenuPriceList />
            
            {/* Quick Feature Grid for Home */}
            <section className="py-12 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 text-xs font-black rounded-full uppercase">
                    Why Choose EcoShine PH
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
                    Next-Generation Auto Detailing in the Philippines
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div
                    onClick={() => setActiveView('live-tracker')}
                    className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 cursor-pointer transition-all hover:shadow-lg space-y-3 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      <Activity className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Live Bay Telemetry & Camera
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Watch your vehicle get pre-rinsed, foamed, and hand-buffed in real-time with live percentage and stage alerts.
                    </p>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center space-x-1">
                      <span>Open Live Tracker</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>

                  <div
                    onClick={() => setActiveView('lounge')}
                    className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 cursor-pointer transition-all hover:shadow-lg space-y-3 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      <Coffee className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Customer Waiting Lounge Hub
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Relax with 200Mbps Wi-Fi, order free barista drinks to your seat, play car clean games for +50 EcoPoints, or check traffic.
                    </p>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                      <span>Explore Lounge Amenities</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>

                  <div
                    onClick={() => setActiveView('loyalty')}
                    className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-amber-500 cursor-pointer transition-all hover:shadow-lg space-y-3 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      <Award className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Loyalty Stamp Rewards
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Collect digital stamps on every wash: 50% discount on your 5th wash and 100% FREE Signature Wash on your 10th visit!
                    </p>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center space-x-1">
                      <span>Check Stamp Pass</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeView === 'services' && <ServiceMenuPriceList />}
        {activeView === 'booking' && <BookingSystem />}
        {activeView === 'live-tracker' && <LiveStatusTracker />}
        {activeView === 'lounge' && <WaitingLoungeHub />}
        {activeView === 'loyalty' && <LoyaltyRewardsDashboard />}
        {activeView === 'profile' && <CustomerProfileHistory />}
        {activeView === 'admin' && <AdminDashboard />}
        {activeView === 'contact' && <ContactSection />}
      </main>

      {/* Floating Bottom Quick Action Dock for Easy Navigation */}
      {activeBooking && activeView !== 'live-tracker' && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-40 animate-in slide-in-from-bottom-5 duration-300">
          <button
            onClick={() => setActiveView('live-tracker')}
            className="p-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 text-white rounded-2xl shadow-2xl flex items-center space-x-3 hover:scale-105 transition-transform cursor-pointer border border-white/20"
          >
            <div className="relative">
              <Car className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-400 rounded-full animate-ping" />
            </div>
            <div className="text-left text-xs pr-1 hidden sm:block">
              <p className="font-bold leading-tight">{activeBooking.plateNumber} in Bay #{activeBooking.bayNumber}</p>
              <p className="text-[10px] text-blue-100">{activeBooking.washStatus.replace('_', ' ')} ({activeBooking.stageProgress}%)</p>
            </div>
            <ChevronRight className="w-4 h-4 opacity-80" />
          </button>
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
