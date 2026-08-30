import React, { useState } from 'react';
import { useApp, AppView } from '../context/AppContext';
import {
  Sparkles,
  Droplets,
  Calendar,
  Layers,
  Activity,
  Coffee,
  Award,
  User,
  ShieldCheck,
  Moon,
  Sun,
  Smartphone,
  Bell,
  Menu,
  X,
  MapPin,
  Car,
  ChevronDown
} from 'lucide-react';
import { NotificationDrawer } from './NotificationDrawer';

export const Navbar: React.FC = () => {
  const {
    isDark,
    toggleDarkMode,
    role,
    setRole,
    activeView,
    setActiveView,
    mobileViewMode,
    setMobileViewMode,
    setIsAuthModalOpen,
    notifications,
    customer,
    activeBooking,
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  const navItems: { id: AppView; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Car className="w-4 h-4" /> },
    { id: 'services', label: 'Services & Pricelist (₱)', icon: <Layers className="w-4 h-4" /> },
    { id: 'booking', label: 'Book Eco-Wash', icon: <Calendar className="w-4 h-4" />, badge: '₱ Promo' },
    { id: 'live-tracker', label: 'Live Bay Tracker', icon: <Activity className="w-4 h-4" />, badge: activeBooking?.washStatus !== 'completed' ? 'LIVE' : undefined },
    { id: 'lounge', label: 'Waiting Lounge Hub', icon: <Coffee className="w-4 h-4" />, badge: 'Free Wi-Fi' },
    { id: 'loyalty', label: 'Loyalty Rewards', icon: <Award className="w-4 h-4" />, badge: `${customer.loyaltyPoints} pts` },
    { id: 'contact', label: 'Branches & Contact', icon: <MapPin className="w-4 h-4" /> },
  ];

  const handleNavClick = (view: AppView) => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
        {/* Top Flag / Eco Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-red-600 text-white text-[11px] font-medium py-1 px-4 text-center flex items-center justify-between">
          <div className="hidden sm:flex items-center space-x-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>100% Eco-Friendly Philippine Closed-Loop Wash | Saves 95% Water per vehicle</span>
          </div>
          <div className="mx-auto sm:mx-0 flex items-center space-x-3">
            <span className="font-semibold">🇵🇭 Proudly Filipino Owned & Solar-Powered</span>
            <span className="opacity-60">|</span>
            <span className="text-yellow-300 font-bold">Diliman • BGC • Makati • Alabang • Cebu</span>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <span>Call Hotline: 0917-888-ECO1 (3261)</span>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <div 
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-red-600 p-0.5 shadow-md group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-red-500 transition-colors" />
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-blue-800 to-red-600 bg-clip-text text-transparent font-display">
                    EcoShine
                  </span>
                  <span className="text-xs px-1.5 py-0.5 bg-red-600 text-white font-bold rounded-md uppercase tracking-wider">
                    PH
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
                  Eco Auto Detailing & Lounge
                </p>
              </div>
            </div>

            {/* Desktop Nav Items */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-3 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                      isActive
                        ? 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 shadow-2xs font-bold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                        item.badge === 'LIVE'
                          ? 'bg-red-600 text-white animate-pulse'
                          : 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Icons & Controls */}
            <div className="flex items-center space-x-2">
              {/* Mobile Phone Mockup Toggle */}
              <button
                id="btn-toggle-mobile-mode"
                onClick={() => setMobileViewMode(!mobileViewMode)}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center space-x-1 border transition-all ${
                  mobileViewMode
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                }`}
                title="Toggle Mobile App Device Frame view"
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px]">
                  {mobileViewMode ? 'Exit Mobile App' : 'Mobile App View'}
                </span>
              </button>

              {/* Dark Mode Toggle */}
              <button
                id="btn-toggle-dark-mode"
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Toggle Light / Dark Mode"
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>

              {/* Notification Bell */}
              <button
                id="btn-open-notifications"
                onClick={() => setIsNotifDrawerOpen(true)}
                className="relative p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                )}
              </button>

              {/* Role Switcher / Admin Button */}
              {role === 'admin' ? (
                <div className="flex items-center space-x-1">
                  <button
                    id="btn-admin-portal-active"
                    onClick={() => setActiveView('admin')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 border shadow-sm transition-all ${
                      activeView === 'admin'
                        ? 'bg-red-600 text-white border-red-700 ring-2 ring-red-500/30'
                        : 'bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-red-500" />
                    <span>Admin Portal</span>
                  </button>
                  <button
                    id="btn-switch-to-customer"
                    onClick={() => setRole('customer')}
                    className="p-1.5 text-[11px] text-slate-400 hover:text-slate-600 underline"
                    title="Switch back to Customer View"
                  >
                    Exit Admin
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    id="btn-user-profile"
                    onClick={() => setActiveView('profile')}
                    className={`hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      activeView === 'profile'
                        ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-300 text-blue-700 dark:text-blue-300'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span className="truncate max-w-[100px]">{customer.name.split(' ')[0]}</span>
                    <span className="px-1.5 py-0.2 text-[10px] bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 font-bold rounded">
                      {customer.tier.replace('Eco ', '')}
                    </span>
                  </button>

                  <button
                    id="btn-open-auth-modal"
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center space-x-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Account / Login</span>
                    <span className="md:hidden">Login</span>
                  </button>
                </div>
              )}

              {/* Mobile Hamburger Menu Toggle */}
              <button
                id="btn-toggle-mobile-menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Nav Menu */}
        {isMobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-1 shadow-xl animate-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeView === item.id
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    item.badge === 'LIVE'
                      ? 'bg-red-600 text-white animate-pulse'
                      : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}

            <div className="pt-3 mt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => { setActiveView('profile'); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>My Garage & Profile ({customer.name})</span>
                </div>
                <span className="font-bold text-amber-600">{customer.loyaltyPoints} EcoPoints</span>
              </button>

              <button
                onClick={() => { setActiveView('admin'); setRole('admin'); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
              >
                <ShieldCheck className="w-4 h-4 text-red-600" />
                <span>Admin & Operations Panel</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Slide-out Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotifDrawerOpen}
        onClose={() => setIsNotifDrawerOpen(false)}
      />
    </>
  );
};
