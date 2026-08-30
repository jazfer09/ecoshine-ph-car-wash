import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WashStage, VehicleCategory } from '../types';
import {
  ShieldCheck,
  Activity,
  Layers,
  BarChart3,
  Users,
  Search,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Droplets,
  DollarSign,
  Download,
  Printer,
  Edit2,
  Save,
  RotateCw,
  Plus,
  Car,
  Clock,
  Sparkles,
  Award
} from 'lucide-react';
import { INITIAL_MONTHLY_REPORT } from '../data/initialData';

export const AdminDashboard: React.FC = () => {
  const {
    bookings,
    updateBookingStage,
    cancelBooking,
    services,
    updateServicePrice,
    toggleServicePopular,
    customer,
    addLoyaltyPoints,
    addNotification,
    setActiveBookingId,
    setActiveView
  } = useApp();

  const [activeTab, setActiveTab] = useState<'bays' | 'bookings' | 'pricing' | 'reports' | 'customers'>('bays');
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Pricing edit state
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editCategory, setEditCategory] = useState<VehicleCategory>('sedan');
  const [editPrice, setEditPrice] = useState<number>(300);

  // Filtered bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.bookingCode.toLowerCase().includes(searchFilter.toLowerCase()) ||
      b.customerName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      b.plateNumber.toLowerCase().includes(searchFilter.toLowerCase()) ||
      b.serviceName.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && b.washStatus !== 'completed' && b.washStatus !== 'cancelled') ||
      b.washStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleSavePrice = (serviceId: string) => {
    updateServicePrice(serviceId, editCategory, editPrice);
    setEditingServiceId(null);
    addNotification('💰 Price Updated', `New price for ${serviceId} set to ₱${editPrice}`, 'system');
  };

  const handleExportCSV = () => {
    const headers = 'Month,Total Washes,Revenue (PHP),Water Saved (L),CO2 Offset (kg),Rating\n';
    const rows = INITIAL_MONTHLY_REPORT.map(
      (r) => `"${r.month}",${r.totalWashes},${r.revenuePeso},${r.waterSavedLiters},${r.co2OffsetKg},${r.avgRating}`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EcoShine_Monthly_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-100 dark:bg-slate-950 transition-colors min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Operations Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 bg-red-600 text-white text-[11px] font-bold rounded-md uppercase tracking-wider">
                Admin Management Portal
              </span>
              <span className="text-xs text-slate-400">Diliman QC & Metro Manila Central Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
              EcoShine Operations Command Center
            </h2>
            <p className="text-xs text-slate-300">
              Live bay staging, Philippine Peso pricelist editor, queue dispatcher, and financial reporting.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportCSV}
              className="py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-colors flex items-center space-x-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV Report</span>
            </button>
            <button
              onClick={() => setActiveView('live-tracker')}
              className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
            >
              View Customer Live Cam
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          {[
            { id: 'bays', label: 'Live Bay Staging (6 Bays)', icon: <Activity className="w-4 h-4" /> },
            { id: 'bookings', label: 'Bookings & Queue Manager', icon: <Car className="w-4 h-4" /> },
            { id: 'pricing', label: '₱ Pricing & Service Editor', icon: <Layers className="w-4 h-4" /> },
            { id: 'reports', label: 'Monthly Service Analytics', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'customers', label: 'Customer Loyalty Database', icon: <Users className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`admin-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: LIVE BAY STAGING */}
        {activeTab === 'bays' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  Live Wash Bay Grid Control
                </h3>
                <p className="text-xs text-slate-500">
                  Advance wash stages in real-time. Automated SMS/push updates will notify customers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((bayNum) => {
                const bookingInBay = bookings.find((b) => b.bayNumber === bayNum && b.washStatus !== 'completed' && b.washStatus !== 'cancelled');

                return (
                  <div
                    key={bayNum}
                    className={`bg-white dark:bg-slate-900 rounded-3xl p-5 border shadow-sm flex flex-col justify-between space-y-4 ${
                      bookingInBay
                        ? 'border-blue-500/80 dark:border-blue-500 ring-1 ring-blue-500/20'
                        : 'border-slate-200 dark:border-slate-800 opacity-80'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase text-slate-800 dark:text-slate-200">
                          Bay #{bayNum} • QC Flagship
                        </span>
                        {bookingInBay ? (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 rounded-full animate-pulse">
                            OCCUPIED ({bookingInBay.stageProgress}%)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full">
                            BAY VACANT
                          </span>
                        )}
                      </div>

                      {bookingInBay ? (
                        <div className="space-y-2">
                          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-mono font-black text-sm text-yellow-500 dark:text-yellow-400 bg-slate-900 px-2 py-0.5 rounded">
                                {bookingInBay.plateNumber}
                              </span>
                              <span className="text-[11px] font-mono text-slate-500">{bookingInBay.bookingCode}</span>
                            </div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white">
                              {bookingInBay.vehicleMake} {bookingInBay.vehicleModel}
                            </p>
                            <p className="text-[11px] text-blue-600 dark:text-blue-400 truncate">
                              {bookingInBay.serviceName}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              Driver: {bookingInBay.customerName} ({bookingInBay.customerPhone})
                            </p>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-blue-600 h-full rounded-full transition-all"
                              style={{ width: `${bookingInBay.stageProgress}%` }}
                            />
                          </div>

                          <div className="text-xs space-y-1 pt-1">
                            <div className="flex justify-between text-slate-500">
                              <span>Current Stage:</span>
                              <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">
                                {bookingInBay.washStatus.replace('_', ' ')}
                              </span>
                            </div>
                            <div className="flex justify-between text-slate-500">
                              <span>Technician:</span>
                              <span className="font-medium text-slate-700 dark:text-slate-300">
                                {bookingInBay.technicianName}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="py-12 text-center text-slate-400 text-xs">
                          <Car className="w-8 h-8 mx-auto mb-1 opacity-25" />
                          <p>Ready for next vehicle queue</p>
                        </div>
                      )}
                    </div>

                    {bookingInBay && (
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                        <button
                          onClick={() => {
                            const sequence: WashStage[] = ['queued', 'pre_rinse', 'bio_foam', 'steam_wash', 'drying', 'inspection', 'completed'];
                            const idx = sequence.indexOf(bookingInBay.washStatus);
                            const next = sequence[idx + 1] || 'completed';
                            const prog = Math.min(100, Math.round(((idx + 2) / sequence.length) * 100));
                            updateBookingStage(bookingInBay.id, next, prog);
                          }}
                          className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center space-x-1"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                          <span>Advance Stage</span>
                        </button>
                        <button
                          onClick={() => updateBookingStage(bookingInBay.id, 'completed', 100)}
                          className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                          title="Mark completely done"
                        >
                          ✓ Done
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: BOOKING QUEUE MANAGER */}
        {activeTab === 'bookings' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  All Customer Bookings
                </h3>
                <p className="text-xs text-slate-500">
                  Manage statuses, customer contacts, bay assignments, and payment verifications.
                </p>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search plate, name, code..."
                  className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active Washes</option>
                  <option value="completed">Completed</option>
                  <option value="queued">Queued</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3">Ref Code</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Vehicle / Plate</th>
                    <th className="p-3">Service</th>
                    <th className="p-3">Bay #</th>
                    <th className="p-3">Total (₱)</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{b.bookingCode}</td>
                      <td className="p-3">
                        <p className="font-semibold text-slate-900 dark:text-white">{b.customerName}</p>
                        <p className="text-[10px] text-slate-400">{b.customerPhone}</p>
                      </td>
                      <td className="p-3">
                        <span className="font-mono font-bold text-yellow-600 dark:text-yellow-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                          {b.plateNumber}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-0.5">{b.vehicleMake} {b.vehicleModel}</p>
                      </td>
                      <td className="p-3 truncate max-w-[150px]">{b.serviceName}</td>
                      <td className="p-3 font-bold">Bay {b.bayNumber}</td>
                      <td className="p-3 font-bold text-slate-900 dark:text-white">₱{b.totalAmount.toLocaleString()}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          b.washStatus === 'completed'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : b.washStatus === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        }`}>
                          {b.washStatus.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3 space-x-1">
                        <button
                          onClick={() => {
                            setActiveBookingId(b.id);
                            setActiveView('live-tracker');
                          }}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded text-[11px] font-semibold"
                        >
                          View Cam
                        </button>
                        {b.washStatus !== 'completed' && (
                          <button
                            onClick={() => cancelBooking(b.id)}
                            className="px-2 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded text-[11px] font-semibold"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PHILIPPINE PESO PRICELIST & SERVICE EDITOR */}
        {activeTab === 'pricing' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                Service Catalog & Philippine Peso (₱) Price List Editor
              </h3>
              <p className="text-xs text-slate-500">
                Adjust base pricing per vehicle size. Changes immediately reflect on customer service menu and booking wizard.
              </p>
            </div>

            <div className="space-y-4">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-base font-bold text-slate-900 dark:text-white">{srv.name}</h4>
                        {srv.popular && (
                          <span className="px-2 py-0.5 text-[9px] font-black bg-red-600 text-white rounded-full uppercase">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{srv.description}</p>
                    </div>

                    <button
                      onClick={() => toggleServicePopular(srv.id)}
                      className="py-1.5 px-3 bg-white dark:bg-slate-700 border text-xs font-bold rounded-xl"
                    >
                      {srv.popular ? 'Unmark Featured' : 'Mark as Featured'}
                    </button>
                  </div>

                  {/* Pricing Matrix */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                    {(['sedan', 'suv', 'van', 'pickup', 'motorcycle'] as VehicleCategory[]).map((cat) => {
                      const isEditing = editingServiceId === srv.id && editCategory === cat;
                      const price = srv.basePrices[cat];
                      return (
                        <div
                          key={cat}
                          className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1"
                        >
                          <span className="text-[10px] font-bold uppercase text-slate-400">{cat} Rate:</span>
                          {isEditing ? (
                            <div className="flex items-center space-x-1">
                              <span className="font-bold">₱</span>
                              <input
                                type="number"
                                value={editPrice}
                                onChange={(e) => setEditPrice(Number(e.target.value))}
                                className="w-20 px-1 py-0.5 bg-slate-100 dark:bg-slate-800 border rounded text-xs font-bold"
                              />
                              <button
                                onClick={() => handleSavePrice(srv.id)}
                                className="p-1 bg-emerald-600 text-white rounded"
                              >
                                <Save className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <span className="text-base font-black text-blue-600 dark:text-blue-400 font-display">
                                ₱{price.toLocaleString()}
                              </span>
                              <button
                                onClick={() => {
                                  setEditingServiceId(srv.id);
                                  setEditCategory(cat);
                                  setEditPrice(price);
                                }}
                                className="text-slate-400 hover:text-blue-600"
                                title="Edit rate"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MONTHLY STATISTICS & REPORTING TOOL */}
        {activeTab === 'reports' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  Monthly Service Statistics & Environmental Report
                </h3>
                <p className="text-xs text-slate-500">
                  Comprehensive performance audit across Philippine branches.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="py-2 px-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors flex items-center space-x-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print PDF Report</span>
                </button>
                <button
                  onClick={handleExportCSV}
                  className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CSV</span>
                </button>
              </div>
            </div>

            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-300">August 2026 MTD Revenue</span>
                <p className="text-2xl sm:text-3xl font-black text-blue-900 dark:text-blue-100 font-display mt-1">
                  ₱735,000
                </p>
                <p className="text-[10px] text-emerald-600 font-semibold mt-1">↑ +14.2% vs last month</p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Water Recycled</span>
                <p className="text-2xl sm:text-3xl font-black text-emerald-900 dark:text-emerald-100 font-display mt-1">
                  162,800 L
                </p>
                <p className="text-[10px] text-emerald-600 font-semibold mt-1">95% reclamation efficiency</p>
              </div>

              <div className="p-5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900">
                <span className="text-xs font-bold text-red-700 dark:text-red-300">Total Washes Completed</span>
                <p className="text-2xl sm:text-3xl font-black text-red-900 dark:text-red-100 font-display mt-1">
                  740 Vehicles
                </p>
                <p className="text-[10px] text-slate-500 mt-1">Avg 24 cars/day per branch</p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300">Customer Satisfaction</span>
                <p className="text-2xl sm:text-3xl font-black text-amber-900 dark:text-amber-100 font-display mt-1">
                  4.95 ★
                </p>
                <p className="text-[10px] text-amber-700 font-semibold mt-1">Based on 620+ reviews</p>
              </div>
            </div>

            {/* Monthly Trend Table */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Historical Month-by-Month Trend:
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Period</th>
                      <th className="p-3">Washes</th>
                      <th className="p-3">Revenue (PHP)</th>
                      <th className="p-3">Water Recycled (L)</th>
                      <th className="p-3">CO2 Offset (kg)</th>
                      <th className="p-3">Rating</th>
                      <th className="p-3">Top Package</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {INITIAL_MONTHLY_REPORT.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="p-3 font-bold text-slate-900 dark:text-white">{row.month}</td>
                        <td className="p-3">{row.totalWashes}</td>
                        <td className="p-3 font-bold text-blue-600 dark:text-blue-400">₱{row.revenuePeso.toLocaleString()}</td>
                        <td className="p-3 text-emerald-600 font-medium">{row.waterSavedLiters.toLocaleString()} L</td>
                        <td className="p-3">{row.co2OffsetKg.toLocaleString()} kg</td>
                        <td className="p-3 font-bold text-amber-500">{row.avgRating} ★</td>
                        <td className="p-3 text-slate-500">{row.topService}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOMER LOYALTY DATABASE */}
        {activeTab === 'customers' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  Customer Loyalty & Profile Database
                </h3>
                <p className="text-xs text-slate-500">
                  Manage member points, grant promotion vouchers, and review customer garage registrations.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{customer.name}</h4>
                  <span className="px-2 py-0.5 text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 font-bold rounded">
                    {customer.tier}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{customer.phone} • {customer.email}</p>
                <p className="text-[11px] text-slate-400">
                  Vehicles: {customer.vehicles.map((v) => `${v.make} ${v.model} (${v.plateNumber})`).join(', ')}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <span className="text-xs text-slate-400">EcoPoints:</span>
                  <p className="text-xl font-black text-amber-500">{customer.loyaltyPoints}</p>
                </div>
                <button
                  onClick={() => addLoyaltyPoints(100, 'Admin Discretionary Customer Goodwill')}
                  className="py-2 px-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  +100 Bonus Pts
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
