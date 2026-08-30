import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Vehicle, VehicleCategory } from '../types';
import {
  User,
  Car,
  Plus,
  Trash2,
  Clock,
  CheckCircle2,
  Droplets,
  Receipt,
  Printer,
  Calendar,
  Sparkles,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

export const CustomerProfileHistory: React.FC = () => {
  const { customer, bookings, addVehicle, removeVehicle, updateProfile, setActiveBookingId, setActiveView } = useApp();

  // Add Vehicle Modal
  const [isAddingVeh, setIsAddingVeh] = useState(false);
  const [newPlate, setNewPlate] = useState('');
  const [newMake, setNewMake] = useState('Honda');
  const [newModel, setNewModel] = useState('City');
  const [newColor, setNewColor] = useState('Taffeta White');
  const [newCategory, setNewCategory] = useState<VehicleCategory>('sedan');

  // Customer Edit
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [name, setName] = useState(customer.name);
  const [phone, setPhone] = useState(customer.phone);
  const [email, setEmail] = useState(customer.email);

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlate.trim()) return;

    addVehicle({
      plateNumber: newPlate.trim().toUpperCase(),
      make: newMake,
      model: newModel,
      color: newColor,
      category: newCategory,
    });

    setNewPlate('');
    setIsAddingVeh(false);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone, email });
    setIsEditingProfile(false);
  };

  const customerBookings = bookings.filter(
    (b) => b.customerPhone === customer.phone || b.customerEmail === customer.email
  );

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header Profile Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-800 text-white font-bold text-2xl flex items-center justify-center shadow-lg">
              {customer.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                  {customer.name}
                </h2>
                <span className="px-2.5 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 text-xs font-black rounded-full">
                  {customer.tier}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{customer.phone}</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{customer.email}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="py-2 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors"
            >
              {isEditingProfile ? 'Cancel' : 'Edit Profile'}
            </button>
            <button
              onClick={() => setActiveView('booking')}
              className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
            >
              Book New Wash (₱)
            </button>
          </div>
        </div>

        {/* Profile Edit Form */}
        {isEditingProfile && (
          <form onSubmit={handleSaveProfile} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-blue-200 dark:border-blue-800 space-y-4 animate-in fade-in duration-200">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Update Contact Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Mobile Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>
            </div>
            <button
              type="submit"
              className="py-2 px-5 bg-blue-600 text-white text-xs font-bold rounded-xl"
            >
              Save Profile Changes
            </button>
          </form>
        )}

        {/* Garage Management Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                My Registered Vehicles
              </h3>
              <p className="text-xs text-slate-500">
                Manage your garage vehicles for 1-click booking and live camera recognition.
              </p>
            </div>
            <button
              onClick={() => setIsAddingVeh(true)}
              className="py-2 px-3.5 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-xl border border-blue-200 dark:border-blue-800 transition-colors flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add Vehicle</span>
            </button>
          </div>

          {/* Add Vehicle Modal / Form */}
          {isAddingVeh && (
            <form onSubmit={handleSaveVehicle} className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 animate-in fade-in duration-200">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase">
                Register New Philippine Vehicle
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold mb-1">Plate Number *</label>
                  <input
                    type="text"
                    value={newPlate}
                    onChange={(e) => setNewPlate(e.target.value)}
                    placeholder="e.g. NBT 4920"
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-lg uppercase font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold mb-1">Make</label>
                  <input
                    type="text"
                    value={newMake}
                    onChange={(e) => setNewMake(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold mb-1">Model</label>
                  <input
                    type="text"
                    value={newModel}
                    onChange={(e) => setNewModel(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold mb-1">Color</label>
                  <input
                    type="text"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-2 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-lg"
                  >
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV</option>
                    <option value="van">Van</option>
                    <option value="pickup">Pickup</option>
                    <option value="motorcycle">Motorcycle</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingVeh(false)}
                  className="py-1.5 px-3 bg-slate-200 dark:bg-slate-700 text-xs rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-1.5 px-4 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-xs"
                >
                  Save to Garage
                </button>
              </div>
            </form>
          )}

          {/* Vehicle List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {customer.vehicles.map((v) => (
              <div
                key={v.id}
                className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between"
              >
                <div className="space-y-1">
                  <span className="px-2 py-0.5 bg-yellow-400 text-slate-950 font-mono font-bold text-xs rounded">
                    {v.plateNumber}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {v.make} {v.model}
                  </h4>
                  <p className="text-xs text-slate-500 capitalize">
                    {v.color} • {v.category}
                  </p>
                </div>

                <button
                  onClick={() => removeVehicle(v.id)}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  title="Remove vehicle"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Wash History & Official Receipts */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                Service History & Receipts
              </h3>
              <p className="text-xs text-slate-500">
                Official Philippine Peso records and water savings data for each visit.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {customerBookings.length} Total Records
            </span>
          </div>

          <div className="space-y-3">
            {customerBookings.length === 0 ? (
              <p className="text-center py-8 text-xs text-slate-400">No previous wash records found.</p>
            ) : (
              customerBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                        {b.bookingCode}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {b.date} ({b.timeSlot})
                      </span>
                      <span className="px-2 py-0.2 text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold rounded capitalize">
                        {b.washStatus.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {b.serviceName} • <span className="font-mono font-normal text-slate-500">{b.plateNumber}</span>
                    </h4>

                    <p className="text-xs text-slate-500">
                      📍 {b.branchName} • Ref: {b.paymentReference || 'CASH-PAY'}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 self-end md:self-center">
                    <div className="text-right">
                      <p className="text-sm font-black text-blue-600 dark:text-blue-400 font-display">
                        ₱{b.totalAmount.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-emerald-600 font-medium">
                        💧 {b.waterSaved}L Saved
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setActiveBookingId(b.id);
                        setActiveView('live-tracker');
                      }}
                      className="py-1.5 px-3 bg-white dark:bg-slate-800 hover:bg-slate-100 border text-xs font-bold rounded-xl transition-colors"
                    >
                      Track / View
                    </button>

                    <button
                      onClick={() => window.print()}
                      className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                      title="Print Official E-Receipt"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
