import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleCategory, ServiceCategory } from '../types';
import {
  Sparkles,
  Droplets,
  Clock,
  Check,
  ShieldCheck,
  Calendar,
  Flame,
  Search,
  Filter,
  Car,
  ChevronRight,
  Info
} from 'lucide-react';

export const ServiceMenuPriceList: React.FC = () => {
  const { services, addons, setActiveView } = useApp();
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleCategory>('suv');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const vehicleOptions: { id: VehicleCategory; label: string; icon: string; example: string }[] = [
    { id: 'sedan', label: 'Sedan / Hatchback', icon: '🚗', example: 'Vios, Civic, City, Mirage' },
    { id: 'suv', label: 'Mid / Compact SUV', icon: '🚙', example: 'Fortuner, Montero, CR-V, Coolray' },
    { id: 'van', label: 'Van / Large MPV', icon: '🚐', example: 'HiAce, Innova, Staria, Alphard' },
    { id: 'pickup', label: 'Pickup Truck', icon: '🛻', example: 'Hilux, Ranger, D-Max, Navara' },
    { id: 'motorcycle', label: 'Motorcycle / Scooter', icon: '🏍️', example: 'NMAX, PCX, Aerox, Big Bikes' },
  ];

  const filteredServices = services.filter((srv) => {
    const matchesCategory = selectedCategory === 'all' || srv.category === selectedCategory;
    const matchesSearch =
      srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookService = (serviceId: string) => {
    setActiveView('booking');
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold">
            <span>🇵🇭 Transparent Philippine Peso (₱) Pricelist</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            Eco-Friendly Service Menu & Detailing
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Powered by pH-neutral plant actives, closed-loop water filtration, and 140°C thermal vapor disinfection. Safe for all clear coats, safe for the Philippine environment.
          </p>
        </div>

        {/* Vehicle Category Selector Bar */}
        <div className="bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800">
          <div className="text-center sm:text-left mb-3">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              1. Select Your Vehicle Size to View Exact ₱ Prices:
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
            {vehicleOptions.map((veh) => {
              const isSelected = selectedVehicle === veh.id;
              return (
                <button
                  key={veh.id}
                  id={`btn-veh-select-${veh.id}`}
                  onClick={() => setSelectedVehicle(veh.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 dark:border-blue-500 ring-2 ring-blue-600/20 shadow-xs'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{veh.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {veh.label}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate max-w-[120px]">
                        {veh.example}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Packages' },
              { id: 'wash', label: 'Exterior Wash' },
              { id: 'interior', label: 'Interior Steam' },
              { id: 'complete', label: 'Signature Combos' },
              { id: 'protection', label: 'Ceramic Coatings' },
              { id: 'specialty', label: 'Underchassis' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search package or feature..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const currentPrice = service.basePrices[selectedVehicle];
            return (
              <div
                key={service.id}
                id={`card-service-${service.id}`}
                className={`relative flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border transition-all hover:shadow-xl ${
                  service.popular
                    ? 'border-blue-500/80 dark:border-blue-500 shadow-md ring-1 ring-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                {/* Popular Tag */}
                {service.popular && (
                  <div className="absolute top-3 right-3 z-10 px-2.5 py-1 bg-red-600 text-white text-[10px] font-black rounded-full shadow-md flex items-center space-x-1 uppercase tracking-wider">
                    <Flame className="w-3 h-3 fill-current" />
                    <span>PH Driver Favorite</span>
                  </div>
                )}

                {/* Cover Image */}
                <div className="relative h-44 w-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center space-x-2 text-[11px] text-emerald-300 font-bold mb-1">
                      <Droplets className="w-3.5 h-3.5" />
                      <span>Saves ~{service.waterSavedLiters}L Water</span>
                      <span className="text-white/60">•</span>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{service.durationMinutes} mins</span>
                    </div>
                    <h3 className="text-lg font-bold font-display leading-snug drop-shadow-xs">
                      {service.name}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Eco Highlights */}
                    <div className="space-y-1.5 mb-4 p-2.5 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-100 dark:border-emerald-900/60">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center space-x-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>Eco-Technology Inclusions:</span>
                      </div>
                      {service.ecoHighlights.map((eco, idx) => (
                        <div key={idx} className="flex items-center space-x-1.5 text-xs text-emerald-900 dark:text-emerald-200">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{eco}</span>
                        </div>
                      ))}
                    </div>

                    {/* Features Checklist */}
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Full Service Scope:
                      </p>
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold">
                        Rate for {selectedVehicle.toUpperCase()}:
                      </span>
                      <div className="text-2xl font-black text-blue-700 dark:text-blue-400 font-display">
                        ₱{currentPrice.toLocaleString()}
                      </div>
                    </div>

                    <button
                      id={`btn-book-${service.id}`}
                      onClick={() => handleBookService(service.id)}
                      className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center space-x-1 cursor-pointer"
                    >
                      <span>Book Slot</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add-on Services Section */}
        <div className="mt-12 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-2">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                Eco Specialty Add-on Enhancements
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Can be added to any wash package during booking
              </p>
            </div>
            <button
              onClick={() => setActiveView('booking')}
              className="py-2 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors"
            >
              Add to Next Booking →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {addons.map((addon) => (
              <div
                key={addon.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {addon.name}
                    </h4>
                    <span className="text-sm font-black text-red-600 dark:text-red-400 font-display">
                      +₱{addon.price}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {addon.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>+{addon.durationMinutes} mins</span>
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    100% Eco-Safe
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Philippine Environmental Commitment Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-blue-800">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold px-2.5 py-1 bg-white/10 rounded-full text-emerald-300">
              🌿 Our Philippine Water Conservation Promise
            </span>
            <h3 className="text-2xl font-bold font-display">
              Save 250+ Liters of fresh water every single wash.
            </h3>
            <p className="text-xs text-blue-200 max-w-xl">
              Traditional roadside car washes drain untreated chemical soaps directly into Philippine drainage systems. EcoShine uses closed-loop micro-filtration and biological oil separators to prevent waterway pollution.
            </p>
          </div>
          <button
            onClick={() => setActiveView('booking')}
            className="py-3 px-6 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            Book Your Eco Wash in ₱
          </button>
        </div>
      </div>
    </div>
  );
};
