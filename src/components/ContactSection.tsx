import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building,
  Sparkles,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { branches, addNotification } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('general');
  const [selectedBranch, setSelectedBranch] = useState(branches[0].name);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    setSubmitted(true);
    addNotification(
      '📩 Inquiry Received',
      `Salamat ${name}! Our customer care team will call/SMS ${phone} within 15 minutes.`,
      'system'
    );
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold">
            <span>Customer Support & Inquiries 🇵🇭</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display">
            Get in Touch with EcoShine PH
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Have questions about our closed-loop water filtration, corporate fleet rates, or branch bay reservations? Send us a message or call our hotlines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Information & Branches */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                  Headquarters & Central Dispatch
                </span>
                <h3 className="text-xl font-bold font-display mt-1">
                  EcoShine Philippines Corp.
                </h3>
                <p className="text-xs text-blue-100 mt-1">
                  Pioneering sustainable automotive detailing across Metro Manila and Cebu.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <p className="font-bold">Hotlines: (02) 8888-SHINE (74463)</p>
                    <p className="text-blue-200">Mobile / Viber: 0917-888-ECO9 (3269)</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-bold">support@ecoshine.ph</p>
                    <p className="text-blue-200">fleet-accounts@ecoshine.ph</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-red-400 shrink-0" />
                  <div>
                    <p className="font-bold">Open Daily: 7:00 AM – 9:00 PM</p>
                    <p className="text-blue-200">Including PH Regular Holidays</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Branch Directory */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-800 dark:text-slate-200 tracking-wider">
                Official Branch Locations:
              </h4>
              <div className="space-y-2">
                {branches.map((b) => (
                  <div
                    key={b.id}
                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 dark:text-white">{b.name}</span>
                      <span className="text-[10px] text-emerald-600 font-semibold">{b.activeBays} Bays Online</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{b.address}, {b.city}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                    Maraming Salamat, {name}!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                    Your inquiry has been logged. Our branch manager will contact you at <strong>{phone}</strong> shortly.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="py-2.5 px-6 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                    Send Customer Inquiry / Feedback
                  </h3>
                  <p className="text-xs text-slate-500">
                    Fill out the details below and we will get back to you promptly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maria Santos"
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Philippine Mobile Number *
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0917-XXX-XXXX"
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. maria.santos@gmail.com"
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Type of Inquiry
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    >
                      <option value="general">General Wash Booking Inquiry</option>
                      <option value="corporate">Corporate Fleet Account</option>
                      <option value="franchise">Eco-Bay Franchise Partnership</option>
                      <option value="feedback">Service Feedback / Suggestion</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Branch
                  </label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name} ({b.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Message / Special Request *
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can our detailing team help you today? Ask about ceramic coating packages, undercarriage steam, or lounge amenities..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry to EcoShine Team</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
