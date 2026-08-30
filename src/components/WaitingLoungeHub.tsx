import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LoungeItem } from '../types';
import {
  Coffee,
  Wifi,
  Tv,
  Gamepad2,
  Sparkles,
  Droplets,
  Clock,
  Car,
  CupSoda,
  Utensils,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  Activity,
  Compass,
  Sun,
  CloudRain,
  Award,
  ArrowRight
} from 'lucide-react';
import { ECO_TRIVIA } from '../data/initialData';
import confetti from 'canvas-confetti';

export const WaitingLoungeHub: React.FC = () => {
  const {
    loungeItems,
    orderLoungeItems,
    loungeOrders,
    activeBooking,
    setActiveView,
    addLoyaltyPoints,
    customer,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'cafe' | 'game' | 'wifi' | 'traffic' | 'trivia'>('cafe');
  const [selectedSeat, setSelectedSeat] = useState<string>('Seat #4 (Window Co-work)');
  const [cart, setCart] = useState<{ item: LoungeItem; quantity: number }[]>([]);
  const [copiedWifi, setCopiedWifi] = useState<boolean>(false);
  const [orderSuccessMsg, setOrderSuccessMsg] = useState<string | null>(null);

  // Mini-Game State (Bubble Pop Wash Rush)
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won'>('idle');
  const [score, setScore] = useState<number>(0);
  const [bubbles, setBubbles] = useState<{ id: number; top: number; left: number; type: 'dirt' | 'soap' | 'sparkle' }[]>([]);
  const [gameTimeLeft, setGameTimeLeft] = useState<number>(20);

  // Trivia index
  const [triviaIdx, setTriviaIdx] = useState<number>(0);

  const wifiCode = 'ECOSHINE-5G-GUEST-2026';

  const handleAddToCart = (item: LoungeItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === item.id);
      if (existing) {
        return prev.map((i) => (i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.item.id !== itemId));
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    orderLoungeItems(selectedSeat, cart);
    setCart([]);
    setOrderSuccessMsg(`☕ Order submitted! Our barista is delivering your refreshments to ${selectedSeat}.`);
    setTimeout(() => setOrderSuccessMsg(null), 5000);
  };

  const handleCopyWifi = () => {
    navigator.clipboard.writeText(wifiCode);
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2500);
  };

  // Start mini-game
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setGameTimeLeft(15);

    // generate random grime bubbles
    const initialBubbles = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      top: Math.floor(15 + Math.random() * 70),
      left: Math.floor(10 + Math.random() * 80),
      type: (['dirt', 'soap', 'sparkle'][Math.floor(Math.random() * 3)]) as 'dirt' | 'soap' | 'sparkle',
    }));
    setBubbles(initialBubbles);

    const timer = setInterval(() => {
      setGameTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('won');
          addLoyaltyPoints(50, 'Completed Lounge Eco Bubble Clean Game');
          confetti({ particleCount: 50, spread: 60 });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const popBubble = (id: number) => {
    setScore((prev) => prev + 10);
    setBubbles((prev) => {
      const remaining = prev.filter((b) => b.id !== id);
      if (remaining.length < 5) {
        return [
          ...remaining,
          {
            id: Date.now() + Math.random(),
            top: Math.floor(15 + Math.random() * 70),
            left: Math.floor(10 + Math.random() * 80),
            type: (['dirt', 'soap', 'sparkle'][Math.floor(Math.random() * 3)]) as any,
          },
        ];
      }
      return remaining;
    });
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Header & Live Mini Status Banner */}
        <div className="bg-gradient-to-r from-blue-800 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-emerald-300">
              <Coffee className="w-3.5 h-3.5" />
              <span>Complimentary Customer Lounge & Co-Working Space</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
              Spend Your Waiting Time in Comfort
            </h2>
            <p className="text-xs sm:text-sm text-blue-200 max-w-xl">
              Enjoy high-speed Wi-Fi, freshly brewed Benguet Arabica coffee, play our car wash mini-game to earn EcoPoints, or monitor real-time traffic before you head home.
            </p>
          </div>

          {/* Mini Bay Card */}
          {activeBooking && (
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-xs space-y-2 w-full md:w-72 shrink-0">
              <div className="flex items-center justify-between">
                <span className="font-mono text-yellow-300 font-bold">{activeBooking.plateNumber}</span>
                <span className="px-2 py-0.5 bg-emerald-500/30 text-emerald-300 font-bold rounded">
                  Bay #{activeBooking.bayNumber}
                </span>
              </div>
              <p className="text-slate-200 truncate">{activeBooking.serviceName}</p>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/10">
                <span className="text-blue-200">Progress: {activeBooking.stageProgress}%</span>
                <button
                  onClick={() => setActiveView('live-tracker')}
                  className="text-white font-bold underline hover:text-yellow-300"
                >
                  View Live Cam →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Lounge Activity Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          {[
            { id: 'cafe', label: 'Lounge Café & Bar', icon: <Coffee className="w-4 h-4" /> },
            { id: 'game', label: 'Bubble Clean Game (+50 Pts)', icon: <Gamepad2 className="w-4 h-4" /> },
            { id: 'wifi', label: 'High-Speed Wi-Fi', icon: <Wifi className="w-4 h-4" /> },
            { id: 'traffic', label: 'PH Traffic & Weather', icon: <Compass className="w-4 h-4" /> },
            { id: 'trivia', label: 'Eco Trivia & Knowledge', icon: <Sparkles className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`tab-lounge-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: Lounge Café & Refreshments */}
        {activeTab === 'cafe' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-200">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                    EcoShine Lounge Refreshment Bar
                  </h3>
                  <p className="text-xs text-slate-500">
                    Complimentary drinks for members, or artisan snacks delivered directly to your seat.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">My Seat:</span>
                  <select
                    value={selectedSeat}
                    onChange={(e) => setSelectedSeat(e.target.value)}
                    className="px-2.5 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="Seat #1 (Main Lounge)">Seat #1 (Main Lounge)</option>
                    <option value="Seat #2 (Main Lounge)">Seat #2 (Main Lounge)</option>
                    <option value="Seat #4 (Window Co-work)">Seat #4 (Window Co-work)</option>
                    <option value="Seat #6 (VIP Pod)">Seat #6 (VIP Pod)</option>
                    <option value="Outdoor Eco-Veranda">Outdoor Eco-Veranda</option>
                  </select>
                </div>
              </div>

              {orderSuccessMsg && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs text-emerald-800 dark:text-emerald-200 flex items-center space-x-2 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{orderSuccessMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {loungeItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3 shadow-xs hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {item.name}
                        </h4>
                        {item.price === 0 ? (
                          <span className="px-2 py-0.5 text-[10px] font-black bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-md uppercase">
                            FREE
                          </span>
                        ) : (
                          <span className="text-xs font-black text-blue-600 dark:text-blue-400">
                            ₱{item.price}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full py-2 px-3 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-xl border border-blue-200 dark:border-blue-800 transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <Coffee className="w-3.5 h-3.5" />
                      <span>{item.price === 0 ? 'Order Free to Seat' : `Add to Order (₱${item.price})`}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Cart / Active Orders */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>Current Lounge Tray</span>
                  <span className="text-xs font-normal text-slate-400">{selectedSeat}</span>
                </h4>

                {cart.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs space-y-1">
                    <Coffee className="w-8 h-8 mx-auto opacity-30" />
                    <p>No drinks or snacks added yet.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {cart.map((cartItem) => (
                      <div
                        key={cartItem.item.id}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs"
                      >
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-slate-200">
                            {cartItem.item.name}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {cartItem.quantity}x • {cartItem.item.price === 0 ? 'FREE' : `₱${cartItem.item.price * cartItem.quantity}`}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(cartItem.item.id)}
                          className="text-red-500 text-xs font-bold hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    ))}

                    <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between font-bold text-sm text-slate-900 dark:text-white">
                      <span>Total:</span>
                      <span className="text-blue-600">
                        ₱{cart.reduce((sum, i) => sum + i.item.price * i.quantity, 0)}
                      </span>
                    </div>

                    <button
                      onClick={handlePlaceOrder}
                      className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
                    >
                      Send Order to Barista
                    </button>
                  </div>
                )}
              </div>

              {/* Order History */}
              {loungeOrders.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Active Seat Orders:</span>
                  {loungeOrders.map((ord) => (
                    <div key={ord.id} className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-2xs">
                      <div className="flex justify-between font-medium">
                        <span>{ord.seatNumber}</span>
                        <span className="text-emerald-600 font-bold capitalize">{ord.status}</span>
                      </div>
                      <p className="text-[10px] text-slate-400">
                        {ord.items.map((i) => `${i.quantity}x ${i.item.name}`).join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Mini-Game (Bubble Clean Wash Rush) */}
        {activeTab === 'game' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 text-center space-y-6 animate-in fade-in duration-200">
            <div className="max-w-md mx-auto space-y-2">
              <div className="inline-flex items-center space-x-1 px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Earn +50 EcoPoints while waiting!</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                Eco Bubble Pop Car Wash Rush
              </h3>
              <p className="text-xs text-slate-500">
                Pop as many mud, foam, and water bubbles as possible in 15 seconds to give the virtual car a 100% mirror shine!
              </p>
            </div>

            {gameState === 'idle' && (
              <div className="py-8">
                <button
                  id="btn-start-lounge-game"
                  onClick={startGame}
                  className="py-3 px-8 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-2xl shadow-lg transition-transform hover:scale-105"
                >
                  Start Game & Win Points 🎮
                </button>
              </div>
            )}

            {gameState === 'playing' && (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-6 text-sm font-bold">
                  <span className="text-blue-600">Score: {score} pts</span>
                  <span className="text-red-500">Time Left: {gameTimeLeft}s</span>
                </div>

                {/* Game Canvas Box */}
                <div className="relative mx-auto w-full max-w-lg h-72 bg-gradient-to-b from-blue-900 to-slate-950 rounded-2xl overflow-hidden border-2 border-blue-600/40 select-none cursor-crosshair">
                  {/* Car in background */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-40">
                    <Car className="w-40 h-40 text-white" />
                  </div>

                  {/* Bubbles */}
                  {bubbles.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => popBubble(b.id)}
                      style={{ top: `${b.top}%`, left: `${b.left}%` }}
                      className={`absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center shadow-lg transform hover:scale-125 transition-transform active:scale-90 ${
                        b.type === 'dirt'
                          ? 'bg-amber-700/80 text-white border-2 border-amber-500'
                          : b.type === 'soap'
                          ? 'bg-blue-400/80 text-white border-2 border-white animate-bounce'
                          : 'bg-emerald-400/90 text-white border-2 border-emerald-200'
                      }`}
                    >
                      <span className="text-lg">
                        {b.type === 'dirt' ? '🟤' : b.type === 'soap' ? '🫧' : '✨'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {gameState === 'won' && (
              <div className="py-6 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center">
                  <Award className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    Galing! Final Score: {score} Points!
                  </h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                    🎉 +50 EcoPoints credited to your Juan Dela Cruz profile!
                  </p>
                </div>
                <button
                  onClick={startGame}
                  className="py-2.5 px-6 bg-slate-800 dark:bg-slate-700 text-white text-xs font-bold rounded-xl"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Wi-Fi Access Code */}
        {activeTab === 'wifi' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 text-center space-y-6 max-w-lg mx-auto animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 mx-auto flex items-center justify-center">
              <Wifi className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                High-Speed 5G Guest Lounge Wi-Fi
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enjoy unthrottled 200Mbps fiber internet for seamless video meetings, Netflix, or work.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-[11px] uppercase font-bold text-slate-400">SSID Network:</span>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">EcoShine_Guest_Lounge_5G</p>
              
              <div className="pt-2">
                <span className="text-[11px] uppercase font-bold text-slate-400">Wi-Fi Password:</span>
                <div className="flex items-center justify-center space-x-2 mt-1">
                  <span className="text-base font-mono font-black text-blue-600 dark:text-blue-400">
                    {wifiCode}
                  </span>
                  <button
                    id="btn-copy-wifi"
                    onClick={handleCopyWifi}
                    className="p-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-200 hover:bg-slate-100"
                    title="Copy Wi-Fi code"
                  >
                    {copiedWifi ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-500">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <p className="font-bold text-emerald-600">⚡ 215 Mbps</p>
                <p className="text-[10px]">Download Speed</p>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <p className="font-bold text-blue-600">🔒 WPA3 Secure</p>
                <p className="text-[10px]">Encrypted Guest VLAN</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: PH Traffic & Weather */}
        {activeTab === 'traffic' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                Metro Manila & Cebu Road Advisory
              </h3>
              <p className="text-xs text-slate-500">
                Check road flow and rain radar so you can plan your exit after your car is washed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">EDSA / Commonwealth Corridor</span>
                  <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold rounded">
                    Light to Moderate (35 km/h)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">C5 / BGC Elevated Flyover</span>
                  <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] font-bold rounded">
                    Moderate Traffic (22 km/h)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Skyway Stage 3 (Makati to QC)</span>
                  <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold rounded">
                    Clear (80 km/h)
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sun className="w-5 h-5 text-amber-500" />
                    <div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Metro Manila Weather</p>
                      <p className="text-[10px] text-slate-400">31°C • Mostly Clear & Sunny</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600">0% Rain Chance</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  ☀️ Perfect weather for ceramic sealant application! Your car will stay spotless all weekend.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Eco Trivia */}
        {activeTab === 'trivia' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6 max-w-2xl mx-auto animate-in fade-in duration-200">
            <div className="text-center space-y-2">
              <span className="text-2xl">🌱</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                Philippine Eco-Car Care Trivia
              </h3>
              <p className="text-xs text-slate-500">
                Learn how conscious drivers in the Philippines are protecting rivers and potable water.
              </p>
            </div>

            <div className="p-5 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-3">
              <p className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
                {ECO_TRIVIA[triviaIdx].q}
              </p>
              <p className="text-xs text-emerald-900 dark:text-emerald-300 leading-relaxed">
                {ECO_TRIVIA[triviaIdx].a}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Trivia {triviaIdx + 1} of {ECO_TRIVIA.length}
              </span>
              <button
                onClick={() => setTriviaIdx((prev) => (prev + 1) % ECO_TRIVIA.length)}
                className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Next Trivia Fact →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
