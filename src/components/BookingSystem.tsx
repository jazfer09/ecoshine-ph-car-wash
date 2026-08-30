import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VehicleCategory, PaymentMethod } from '../types';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Car,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Droplets,
  CreditCard,
  Ticket,
  AlertCircle
} from 'lucide-react';
import { PaymentModal } from './PaymentModal';

export const BookingSystem: React.FC = () => {
  const {
    branches,
    services,
    addons,
    customer,
    createBooking,
    setActiveView,
    setActiveBookingId
  } = useApp();

  // Wizard state (1: Branch, 2: Vehicle, 3: Service & Addons, 4: Schedule, 5: Review & Pay)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form selections
  const [selectedBranchId, setSelectedBranchId] = useState<string>(customer.preferredBranchId || branches[0].id);
  const [useSavedVehicle, setUseSavedVehicle] = useState<boolean>(customer.vehicles.length > 0);
  const [selectedSavedVehicleId, setSelectedSavedVehicleId] = useState<string>(customer.vehicles[0]?.id || '');
  
  // Custom vehicle fields
  const [vehicleCategory, setVehicleCategory] = useState<VehicleCategory>(customer.vehicles[0]?.category || 'suv');
  const [plateNumber, setPlateNumber] = useState<string>(customer.vehicles[0]?.plateNumber || 'NDL 8821');
  const [vehicleMake, setVehicleMake] = useState<string>(customer.vehicles[0]?.make || 'Toyota');
  const [vehicleModel, setVehicleModel] = useState<string>(customer.vehicles[0]?.model || 'Fortuner');
  const [vehicleColor, setVehicleColor] = useState<string>(customer.vehicles[0]?.color || 'Pearl White');

  // Contact info
  const [customerName, setCustomerName] = useState<string>(customer.name);
  const [customerPhone, setCustomerPhone] = useState<string>(customer.phone);
  const [customerEmail, setCustomerEmail] = useState<string>(customer.email);
  const [specialNotes, setSpecialNotes] = useState<string>('');

  // Service selection
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0].id);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['add-fogging']);

  // Date & Time
  const todayStr = new Date().toISOString().split('T')[0];
  const [bookingDate, setBookingDate] = useState<string>(todayStr);
  const [bookingTime, setBookingTime] = useState<string>('11:00 AM');

  // Promo code
  const [voucherCode, setVoucherCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [voucherAppliedMsg, setVoucherAppliedMsg] = useState<string | null>(null);

  // Payment Modal
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [tempBookingCode, setTempBookingCode] = useState<string>('');

  const timeSlots = [
    '07:30 AM', '08:30 AM', '09:30 AM', '10:30 AM',
    '11:30 AM', '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
  ];

  // Calculations
  const selectedBranch = branches.find((b) => b.id === selectedBranchId) || branches[0];
  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];
  const basePrice = selectedService.basePrices[vehicleCategory] || 350;
  
  const addonsTotal = selectedAddonIds.reduce((sum, id) => {
    const addon = addons.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const subtotal = basePrice + addonsTotal;
  const finalTotal = Math.max(0, subtotal - discountAmount);
  const waterSavedTotal = selectedService.waterSavedLiters + (selectedAddonIds.length * 15);

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApplyVoucher = () => {
    const code = voucherCode.trim().toUpperCase();
    if (code === 'REW-100-OFF' || code === 'ECO100' || code === 'WELCOMEPH') {
      setDiscountAmount(100);
      setVoucherAppliedMsg('✅ ₱100 Discount applied successfully!');
    } else if (code === 'HALFOFF' || code === 'ECO50') {
      const half = Math.round(subtotal * 0.5);
      setDiscountAmount(half);
      setVoucherAppliedMsg(`✅ 50% Promo applied (-₱${half})!`);
    } else {
      setVoucherAppliedMsg('❌ Invalid voucher code. Try "ECO100" or "WELCOMEPH".');
    }
  };

  const handleSavedVehicleChange = (vehId: string) => {
    setSelectedSavedVehicleId(vehId);
    const found = customer.vehicles.find((v) => v.id === vehId);
    if (found) {
      setVehicleCategory(found.category);
      setPlateNumber(found.plateNumber);
      setVehicleMake(found.make);
      setVehicleModel(found.model);
      setVehicleColor(found.color);
    }
  };

  const handleProceedToPayment = () => {
    const code = `ECO-${Math.floor(1000 + Math.random() * 9000)}`;
    setTempBookingCode(code);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (method: PaymentMethod, reference: string) => {
    setIsPaymentModalOpen(false);

    const addonNames = selectedAddonIds
      .map((id) => addons.find((a) => a.id === id)?.name)
      .filter(Boolean) as string[];

    const created = createBooking({
      customerName,
      customerPhone,
      customerEmail,
      plateNumber: plateNumber.toUpperCase(),
      vehicleMake,
      vehicleModel,
      vehicleColor,
      vehicleCategory,
      branchId: selectedBranch.id,
      branchName: selectedBranch.name,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      addonIds: selectedAddonIds,
      addonNames,
      date: bookingDate,
      timeSlot: bookingTime,
      totalAmount: finalTotal,
      discountApplied: discountAmount,
      paymentMethod: method,
      paymentStatus: 'paid',
      paymentReference: reference,
      notes: specialNotes,
      waterSaved: waterSavedTotal,
    });

    setActiveBookingId(created.id);
    setActiveView('live-tracker');
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-bold">
            <span>Seamless Online Booking System 🇵🇭</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            Book Your Eco-Friendly Car Wash
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Instant slot confirmation, automated SMS/email reminders, and real-time live bay tracking.
          </p>
        </div>

        {/* Progress Step Indicators */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            {[
              { step: 1, title: 'Branch' },
              { step: 2, title: 'Vehicle' },
              { step: 3, title: 'Service' },
              { step: 4, title: 'Schedule' },
              { step: 5, title: 'Review & Pay' },
            ].map((item, index) => {
              const isPast = currentStep > item.step;
              const isCurrent = currentStep === item.step;
              return (
                <div key={item.step} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center mx-auto text-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isPast
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-blue-600 text-white ring-4 ring-blue-600/20'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isPast ? <CheckCircle2 className="w-4 h-4" /> : item.step}
                    </div>
                    <span
                      className={`text-[11px] font-semibold mt-1 hidden sm:block ${
                        isCurrent
                          ? 'text-blue-600 dark:text-blue-400'
                          : isPast
                          ? 'text-emerald-600'
                          : 'text-slate-400'
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>
                  {index < 4 && (
                    <div
                      className={`flex-1 h-0.5 mx-1 hidden sm:block ${
                        isPast ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800">
          {/* STEP 1: Branch Selection */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  1. Select Preferred EcoShine Branch
                </h3>
                <p className="text-xs text-slate-500">
                  All branches feature climate-controlled customer lounges, free Wi-Fi, and solar wash bays.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {branches.map((branch) => {
                  const isSelected = selectedBranchId === branch.id;
                  return (
                    <div
                      key={branch.id}
                      onClick={() => setSelectedBranchId(branch.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/60 ring-2 ring-blue-600/20 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {branch.name}
                          </h4>
                          <p className="text-xs text-slate-500 flex items-center space-x-1">
                            <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            <span>{branch.address}, {branch.city}</span>
                          </p>
                        </div>
                        {isSelected && <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />}
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                        <span>🕒 {branch.openHours}</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {branch.activeBays} / {branch.totalBays} Bays Available
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: Vehicle & Customer Info */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  2. Vehicle & Contact Details
                </h3>
                <p className="text-xs text-slate-500">
                  We use your plate number for live tracking and camera bay identification.
                </p>
              </div>

              {/* Saved Garage Quick Pick */}
              {customer.vehicles.length > 0 && (
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    🚘 Quick Pick From My Garage:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {customer.vehicles.map((v) => (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => handleSavedVehicleChange(v.id)}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                          selectedSavedVehicleId === v.id
                            ? 'bg-blue-100/70 dark:bg-blue-900/60 border-blue-600 text-blue-900 dark:text-blue-100 font-bold'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div>
                          <p className="text-xs font-bold">{v.make} {v.model} ({v.color})</p>
                          <p className="text-[10px] font-mono text-slate-500">{v.plateNumber} • {v.category.toUpperCase()}</p>
                        </div>
                        {selectedSavedVehicleId === v.id && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Vehicle Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Vehicle Size Category *
                  </label>
                  <select
                    value={vehicleCategory}
                    onChange={(e) => setVehicleCategory(e.target.value as VehicleCategory)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  >
                    <option value="sedan">Sedan / Hatchback (e.g. Vios, City, Civic)</option>
                    <option value="suv">Mid / Compact SUV (e.g. Fortuner, Montero, CRV)</option>
                    <option value="van">Van / Large MPV (e.g. HiAce, Innova, Staria)</option>
                    <option value="pickup">Pickup Truck (e.g. Hilux, Ranger, D-Max)</option>
                    <option value="motorcycle">Motorcycle / Scooter (e.g. NMAX, PCX)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Philippine License Plate Number *
                  </label>
                  <input
                    type="text"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                    placeholder="e.g. NDL 8821 or MV File #"
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono uppercase text-slate-900 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Make & Model
                  </label>
                  <input
                    type="text"
                    value={`${vehicleMake} ${vehicleModel}`}
                    onChange={(e) => {
                      const parts = e.target.value.split(' ');
                      setVehicleMake(parts[0] || '');
                      setVehicleModel(parts.slice(1).join(' ') || '');
                    }}
                    placeholder="e.g. Toyota Fortuner"
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Vehicle Color
                  </label>
                  <input
                    type="text"
                    value={vehicleColor}
                    onChange={(e) => setVehicleColor(e.target.value)}
                    placeholder="e.g. Pearl White, Soul Red"
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Customer Contact Information */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Driver / Owner Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Mobile Number (For SMS & Viber Live Alerts) *
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="0917-XXX-XXXX"
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Service Package & Add-ons */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  3. Select Eco Wash Package & Add-ons
                </h3>
                <p className="text-xs text-slate-500">
                  Prices are tailored to your {vehicleCategory.toUpperCase()} in Philippine Peso (₱).
                </p>
              </div>

              {/* Main Service Packages */}
              <div className="space-y-3">
                {services.map((service) => {
                  const isSelected = selectedServiceId === service.id;
                  const price = service.basePrices[vehicleCategory];
                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/70 ring-2 ring-blue-600/30 shadow-md'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {service.name}
                          </h4>
                          {service.popular && (
                            <span className="px-2 py-0.2 text-[9px] bg-red-600 text-white font-black rounded-full uppercase">
                              Favorite
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {service.tagline}
                        </p>
                        <div className="flex items-center space-x-3 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                          <span className="flex items-center space-x-1">
                            <Droplets className="w-3 h-3" />
                            <span>Saves {service.waterSavedLiters}L Water</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span className="text-slate-500">{service.durationMinutes} mins</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 self-end sm:self-center">
                        <span className="text-xl font-black text-blue-700 dark:text-blue-400 font-display">
                          ₱{price.toLocaleString()}
                        </span>
                        <div
                          className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                            isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add-ons Selector */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Optional Eco Detailing Add-ons:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {addons.map((addon) => {
                    const isChecked = selectedAddonIds.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                          isChecked
                            ? 'bg-red-50/70 dark:bg-red-950/40 border-red-300 dark:border-red-800 ring-1 ring-red-500/20'
                            : 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-slate-900 dark:text-white">
                            {addon.name}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate max-w-[200px]">
                            {addon.description}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-black text-red-600 dark:text-red-400">
                            +₱{addon.price}
                          </span>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="rounded text-red-600 focus:ring-red-500"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Schedule Date & Time */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  4. Choose Appointment Date & Bay Time
                </h3>
                <p className="text-xs text-slate-500">
                  Select your preferred arrival slot at {selectedBranch.name}.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Service Date:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map((dayOffset) => {
                    const d = new Date();
                    d.setDate(d.getDate() + dayOffset);
                    const isoDate = d.toISOString().split('T')[0];
                    const label = dayOffset === 0 ? 'Today' : dayOffset === 1 ? 'Tomorrow' : d.toLocaleDateString('en-PH', { weekday: 'short' });
                    const isSelected = bookingDate === isoDate;
                    return (
                      <button
                        key={isoDate}
                        type="button"
                        onClick={() => setBookingDate(isoDate)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <p className="text-xs font-bold">{label}</p>
                        <p className="text-[11px] opacity-80">{d.toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Available Time Slot (Bay Reservation):
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((time) => {
                    const isSelected = bookingTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setBookingTime(time)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Special Notes for Detailers (Optional)
                </label>
                <input
                  type="text"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Focus on muddy undercarriage, fragile ceramic coating, pet hair on back seat..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {/* STEP 5: Review, Voucher, & Secure Payment */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  5. Review Booking & Payment Gateway
                </h3>
                <p className="text-xs text-slate-500">
                  Review your eco-wash summary and proceed to Philippine payment.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex justify-between items-start pb-3 border-b border-slate-200 dark:border-slate-700">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400">Branch & Bay</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{selectedBranch.name}</h4>
                    <p className="text-xs text-slate-500">{bookingDate} • {bookingTime}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Vehicle</span>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{vehicleMake} {vehicleModel}</p>
                    <p className="text-xs font-mono font-black text-red-600">{plateNumber}</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span>{selectedService.name} ({vehicleCategory.toUpperCase()}):</span>
                    <span className="font-semibold text-slate-900 dark:text-white">₱{basePrice.toLocaleString()}</span>
                  </div>
                  {selectedAddonIds.map((id) => {
                    const a = addons.find((item) => item.id === id);
                    if (!a) return null;
                    return (
                      <div key={id} className="flex justify-between text-slate-500">
                        <span>+ {a.name}:</span>
                        <span>₱{a.price}</span>
                      </div>
                    );
                  })}
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Voucher Discount:</span>
                      <span>-₱{discountAmount}</span>
                    </div>
                  )}
                </div>

                {/* Total & Eco Savings */}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Final Amount:</span>
                    <p className="text-2xl font-black text-blue-700 dark:text-blue-400 font-display">
                      ₱{finalTotal.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg">
                      <Droplets className="w-3.5 h-3.5" />
                      <span>~{waterSavedTotal}L Water Saved!</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Redeem Promo / Loyalty Voucher Code:
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Ticket className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      placeholder="e.g. ECO100 or REW-100-OFF"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white uppercase font-mono"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyVoucher}
                    className="py-2 px-4 bg-slate-800 dark:bg-slate-700 text-white text-xs font-bold rounded-xl hover:bg-slate-900 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {voucherAppliedMsg && (
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                    {voucherAppliedMsg}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Navigation Step Buttons */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors flex items-center space-x-1"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                id="btn-open-checkout-modal"
                onClick={handleProceedToPayment}
                className="py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white text-sm font-black rounded-xl shadow-lg transition-all flex items-center space-x-2 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay ₱{finalTotal.toLocaleString()} & Confirm Slot</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Philippine Payment Gateway Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={finalTotal}
        bookingCode={tempBookingCode}
        customerName={customerName}
        plateNumber={plateNumber}
        serviceName={selectedService.name}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};
