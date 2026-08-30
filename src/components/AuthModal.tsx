import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, User, Lock, Mail, Phone, CheckCircle2, ArrowRight, Sparkles, X } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, role, setRole, customer, updateProfile, addNotification } = useApp();
  const [activeTab, setActiveTab] = useState<'customer' | 'admin'>(role);
  const [email, setEmail] = useState(customer.email);
  const [password, setPassword] = useState('••••••••');
  const [adminPin, setAdminPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleCustomerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole('customer');
    addNotification('👋 Maligayang Pagbabalik!', `Logged in as ${customer.name} (Customer Account)`, 'promo');
    setIsAuthModalOpen(false);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin === '1234' || adminPin === 'admin' || adminPin === '') {
      setRole('admin');
      addNotification('🛡️ Admin Access Granted', 'Welcome to EcoShine Bay & Service Management Portal', 'system');
      setIsAuthModalOpen(false);
    } else {
      setErrorMsg('Incorrect Admin PIN. Try "1234" or click Quick Demo Admin Login.');
    }
  };

  const handleQuickCustomer = () => {
    setRole('customer');
    addNotification('👋 Quick Demo Login', 'Logged in as Customer Juan Dela Cruz (Eco Gold Member)', 'promo');
    setIsAuthModalOpen(false);
  };

  const handleQuickAdmin = () => {
    setRole('admin');
    addNotification('🛡️ Quick Demo Admin', 'Logged in as EcoShine Operations Manager', 'system');
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="auth-modal-card"
        className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        {/* Header with PH Colors */}
        <div className="relative p-6 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white">
          <button
            id="close-auth-modal"
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-red-600 bg-clip-text text-transparent">🇵🇭</span>
            </div>
            <div>
              <h2 className="text-xl font-bold font-display">EcoShine PH Portal</h2>
              <p className="text-xs text-blue-100">Eco-Friendly Car Care & Detailing</p>
            </div>
          </div>

          {/* Role selector tab */}
          <div className="flex rounded-lg bg-blue-950/40 p-1 mt-4">
            <button
              id="tab-customer-login"
              type="button"
              onClick={() => { setActiveTab('customer'); setErrorMsg(''); }}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'customer'
                  ? 'bg-white text-blue-900 shadow-xs'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Customer Portal</span>
            </button>
            <button
              id="tab-admin-login"
              type="button"
              onClick={() => { setActiveTab('admin'); setErrorMsg(''); }}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-xs font-semibold transition-all ${
                activeTab === 'admin'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-blue-100 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin / Bay Manager</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-600 dark:text-red-300">
              {errorMsg}
            </div>
          )}

          {activeTab === 'customer' ? (
            <form onSubmit={handleCustomerLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email Address or Mobile (09XX-XXX-XXXX)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="juan.delacruz@gmail.com"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Password or OTP
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-blue-600 dark:text-blue-400 hover:underline">
                  Forgot PIN / SMS OTP?
                </a>
              </div>

              <button
                id="btn-customer-submit"
                type="submit"
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-md transition-colors flex items-center justify-center space-x-2"
              >
                <span>Sign In as Customer</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-slate-900 px-2 text-slate-400">Or Quick Test</span></div>
              </div>

              <button
                id="btn-quick-customer"
                type="button"
                onClick={handleQuickCustomer}
                className="w-full py-2 px-3 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-lg border border-blue-200 dark:border-blue-800 transition-colors flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>1-Click Demo Login (Juan Dela Cruz - Eco Gold)</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg text-xs text-amber-800 dark:text-amber-200">
                <p className="font-semibold mb-0.5">Admin & Operations Management</p>
                <p>Full control over live bays, service queue, Philippine Peso price editor, and monthly statistics.</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Manager Security PIN / Passcode
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    placeholder="Enter PIN (Default: 1234)"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-red-500 text-slate-900 dark:text-white"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Hint: PIN is <strong>1234</strong> for testing.</p>
              </div>

              <button
                id="btn-admin-submit"
                type="submit"
                className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow-md transition-colors flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Enter Admin Management Portal</span>
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-slate-900 px-2 text-slate-400">Or Quick Test</span></div>
              </div>

              <button
                id="btn-quick-admin"
                type="button"
                onClick={handleQuickAdmin}
                className="w-full py-2 px-3 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 text-xs font-medium rounded-lg border border-red-200 dark:border-red-800 transition-colors flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                <span>1-Click Admin Mode (Operations Manager)</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
