import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Booking,
  CustomerProfile,
  ServicePackage,
  AddonService,
  Branch,
  LoyaltyReward,
  LoungeItem,
  LoungeOrder,
  AppNotification,
  UserRole,
  WashStage,
  PaymentMethod,
  VehicleCategory,
  Vehicle,
} from '../types';
import {
  INITIAL_BOOKINGS,
  INITIAL_CUSTOMER,
  INITIAL_SERVICES,
  INITIAL_ADDONS,
  INITIAL_BRANCHES,
  INITIAL_LOYALTY_REWARDS,
  INITIAL_LOUNGE_ITEMS,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData';

export type AppView =
  | 'home'
  | 'booking'
  | 'services'
  | 'live-tracker'
  | 'lounge'
  | 'loyalty'
  | 'profile'
  | 'admin'
  | 'contact';

interface AppContextType {
  // Theme & Role
  isDark: boolean;
  toggleDarkMode: () => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  mobileViewMode: boolean;
  setMobileViewMode: (val: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  
  // Data
  customer: CustomerProfile;
  services: ServicePackage[];
  addons: AddonService[];
  branches: Branch[];
  rewards: LoyaltyReward[];
  loungeItems: LoungeItem[];
  bookings: Booking[];
  activeBookingId: string | null;
  setActiveBookingId: (id: string | null) => void;
  activeBooking: Booking | null;
  notifications: AppNotification[];
  loungeOrders: LoungeOrder[];

  // Actions
  createBooking: (bookingData: Omit<Booking, 'id' | 'bookingCode' | 'createdAt' | 'stageProgress' | 'washStatus' | 'bayNumber' | 'technicianName' | 'estimatedCompletion'>) => Booking;
  updateBookingStage: (bookingId: string, stage: WashStage, progress: number, technician?: string) => void;
  cancelBooking: (bookingId: string) => void;
  rateBooking: (bookingId: string, rating: number, feedback: string) => void;
  
  // Profile & Garage
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  removeVehicle: (id: string) => void;
  updateProfile: (data: Partial<CustomerProfile>) => void;
  redeemReward: (rewardId: string) => boolean;
  addLoyaltyPoints: (pts: number, reason: string) => void;

  // Services Admin Edit
  updateServicePrice: (serviceId: string, category: VehicleCategory, newPrice: number) => void;
  toggleServicePopular: (serviceId: string) => void;

  // Lounge & Notifications
  orderLoungeItems: (seatNumber: string, items: { item: LoungeItem; quantity: number }[]) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (title: string, message: string, type?: AppNotification['type'], bookingCode?: string) => void;

  // Quick simulation helper
  simulateNextWashStage: (bookingId?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  THEME: 'ecoshine_theme',
  ROLE: 'ecoshine_role',
  BOOKINGS: 'ecoshine_bookings_v1',
  CUSTOMER: 'ecoshine_customer_v1',
  SERVICES: 'ecoshine_services_v1',
  NOTIFICATIONS: 'ecoshine_notifications_v1',
  ORDERS: 'ecoshine_orders_v1',
  ACTIVE_BOOKING_ID: 'ecoshine_active_booking_id',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved !== null) return saved === 'dark';
    return false; // Default clean light mode
  });

  // User Role
  const [role, setRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved as UserRole) || 'customer';
  });

  // View state
  const [activeView, setActiveView] = useState<AppView>('home');
  const [mobileViewMode, setMobileViewMode] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Entities
  const [customer, setCustomer] = useState<CustomerProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMER);
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMER;
  });

  const [services, setServices] = useState<ServicePackage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [addons] = useState<AddonService[]>(INITIAL_ADDONS);
  const [branches] = useState<Branch[]>(INITIAL_BRANCHES);
  const [rewards] = useState<LoyaltyReward[]>(INITIAL_LOYALTY_REWARDS);
  const [loungeItems] = useState<LoungeItem[]>(INITIAL_LOUNGE_ITEMS);

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [activeBookingId, setActiveBookingId] = useState<string | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_BOOKING_ID);
    return saved || 'bk-101'; // Default tracking Juan Dela Cruz's wash
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [loungeOrders, setLoungeOrders] = useState<LoungeOrder[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : [];
  });

  // Effect for dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem(STORAGE_KEYS.THEME, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(STORAGE_KEYS.THEME, 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(prev => !prev);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOMER, JSON.stringify(customer));
  }, [customer]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    if (activeBookingId) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_BOOKING_ID, activeBookingId);
    }
  }, [activeBookingId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(loungeOrders));
  }, [loungeOrders]);

  // Current active booking object
  const activeBooking = bookings.find(b => b.id === activeBookingId) || bookings[0] || null;

  // Add Notification helper
  const addNotification = (
    title: string,
    message: string,
    type: AppNotification['type'] = 'wash_stage',
    bookingCode?: string
  ) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      type,
      read: false,
      bookingCode,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Create Booking
  const createBooking = (bookingData: Omit<Booking, 'id' | 'bookingCode' | 'createdAt' | 'stageProgress' | 'washStatus' | 'bayNumber' | 'technicianName' | 'estimatedCompletion'>) => {
    const randomCode = `ECO-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomBay = Math.floor(1 + Math.random() * 5);
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      bookingCode: randomCode,
      bayNumber: randomBay,
      washStatus: 'queued',
      stageProgress: 5,
      technicianName: 'Eco Team ' + ['Alpha', 'Bravo', 'Eco-Specialist Jun', 'Master Aris'][Math.floor(Math.random() * 4)],
      estimatedCompletion: 'In ~45 minutes',
      createdAt: new Date().toISOString(),
      waterSaved: bookingData.waterSaved || 200,
    };

    setBookings(prev => [newBooking, ...prev]);
    setActiveBookingId(newBooking.id);

    // Give loyalty points (1 point per ₱10 spent)
    const pointsEarned = Math.round(newBooking.totalAmount / 10);
    setCustomer(prev => {
      const nextStamps = (prev.stampsCount + 1) % 11;
      const totalWashes = prev.completedWashes + 1;
      let newTier = prev.tier;
      if (totalWashes >= 15) newTier = 'Eco Diamond';
      else if (totalWashes >= 8) newTier = 'Eco Gold';
      else if (totalWashes >= 3) newTier = 'Eco Silver';

      return {
        ...prev,
        loyaltyPoints: prev.loyaltyPoints + pointsEarned,
        stampsCount: nextStamps === 0 ? 1 : nextStamps,
        completedWashes: totalWashes,
        totalSpentPeso: prev.totalSpentPeso + newBooking.totalAmount,
        totalWaterSavedLiters: prev.totalWaterSavedLiters + (newBooking.waterSaved || 200),
        totalCO2SavedKg: +(prev.totalCO2SavedKg + (newBooking.waterSaved ? newBooking.waterSaved * 0.012 : 2.5)).toFixed(1),
        tier: newTier
      };
    });

    // Send notifications
    addNotification(
      '🎉 Booking Confirmed: ' + randomCode,
      `Appointment set for ${newBooking.date} at ${newBooking.timeSlot} (${newBooking.branchName}). Bay #${randomBay} assigned.`,
      'booking',
      randomCode
    );

    addNotification(
      `✨ +${pointsEarned} EcoPoints Earned!`,
      `Thank you for choosing eco-friendly car care. You saved ~${newBooking.waterSaved}L of potable water!`,
      'loyalty'
    );

    return newBooking;
  };

  // Update Booking Stage
  const updateBookingStage = (bookingId: string, stage: WashStage, progress: number, technician?: string) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id === bookingId) {
          const updated = {
            ...b,
            washStatus: stage,
            stageProgress: progress,
            technicianName: technician || b.technicianName,
          };

          // Notify customer on stage change
          const stageDescriptions: Record<WashStage, string> = {
            queued: 'Your vehicle is queued in Bay ' + b.bayNumber,
            pre_rinse: 'High-pressure closed-loop pre-rinse in progress',
            bio_foam: 'Biodegradable coconut active foam soak is being applied',
            steam_wash: 'Thermal dry vapor steam interior & exterior decontamination',
            drying: 'Streak-free ultra-plush microfiber hand drying',
            inspection: '10-Point EcoShine master quality inspection underway',
            completed: '✅ Wash Completed! Your vehicle is pristine and ready at Bay ' + b.bayNumber,
            cancelled: 'Booking has been cancelled.',
          };

          if (b.id === activeBookingId || b.customerPhone === customer.phone) {
            addNotification(
              `🚗 Status Update: ${b.vehicleMake} ${b.vehicleModel} (${b.plateNumber})`,
              stageDescriptions[stage] || `Stage updated to ${stage}`,
              'wash_stage',
              b.bookingCode
            );
          }

          return updated;
        }
        return b;
      })
    );
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, washStatus: 'cancelled' as WashStage } : b))
    );
    addNotification('Booking Cancelled', 'Your booking has been cancelled.', 'booking');
  };

  const rateBooking = (bookingId: string, rating: number, feedback: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, rating, feedback } : b))
    );
    addNotification('⭐ Feedback Received', 'Maraming salamat for your feedback! +50 EcoPoints awarded.', 'loyalty');
    addLoyaltyPoints(50, 'Wash Rating Feedback');
  };

  // Profile & Garage
  const addVehicle = (veh: Omit<Vehicle, 'id'>) => {
    const newVeh: Vehicle = {
      ...veh,
      id: `veh-${Date.now()}`,
    };
    setCustomer(prev => ({
      ...prev,
      vehicles: [...prev.vehicles, newVeh],
    }));
    addNotification('🚘 New Vehicle Added', `${veh.make} ${veh.model} (${veh.plateNumber}) registered to your garage.`, 'promo');
  };

  const removeVehicle = (id: string) => {
    setCustomer(prev => ({
      ...prev,
      vehicles: prev.vehicles.filter(v => v.id !== id),
    }));
  };

  const updateProfile = (data: Partial<CustomerProfile>) => {
    setCustomer(prev => ({ ...prev, ...data }));
  };

  const redeemReward = (rewardId: string): boolean => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) return false;
    if (customer.loyaltyPoints < reward.pointsCost) return false;

    setCustomer(prev => ({
      ...prev,
      loyaltyPoints: prev.loyaltyPoints - reward.pointsCost,
      unlockedVouchers: [...prev.unlockedVouchers, reward.id],
    }));

    addNotification(
      '🎁 Reward Unlocked: ' + reward.title,
      `You have successfully redeemed ${reward.title}. Use code ${reward.id.toUpperCase()} at checkout!`,
      'loyalty'
    );
    return true;
  };

  const addLoyaltyPoints = (pts: number, reason: string) => {
    setCustomer(prev => ({
      ...prev,
      loyaltyPoints: prev.loyaltyPoints + pts,
    }));
    addNotification(`🌱 +${pts} EcoPoints Added!`, reason, 'loyalty');
  };

  // Service Pricing Update
  const updateServicePrice = (serviceId: string, category: VehicleCategory, newPrice: number) => {
    setServices(prev =>
      prev.map(srv => {
        if (srv.id === serviceId) {
          return {
            ...srv,
            basePrices: {
              ...srv.basePrices,
              [category]: newPrice,
            },
          };
        }
        return srv;
      })
    );
  };

  const toggleServicePopular = (serviceId: string) => {
    setServices(prev =>
      prev.map(srv => (srv.id === serviceId ? { ...srv, popular: !srv.popular } : srv))
    );
  };

  // Lounge Orders
  const orderLoungeItems = (seatNumber: string, items: { item: LoungeItem; quantity: number }[]) => {
    const total = items.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
    const newOrder: LoungeOrder = {
      id: `ord-${Date.now()}`,
      bookingCode: activeBooking?.bookingCode || 'WALK-IN',
      customerName: customer.name,
      seatNumber,
      items,
      total,
      status: 'preparing',
      orderedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setLoungeOrders(prev => [newOrder, ...prev]);
    addNotification(
      '☕ Lounge Order Placed',
      `Your refreshment order is being prepared and will be delivered to Lounge Seat #${seatNumber}.`,
      'promo'
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Simulation Helper to step through wash stages
  const simulateNextWashStage = (bookingId?: string) => {
    const targetId = bookingId || activeBookingId || bookings[0]?.id;
    if (!targetId) return;

    const b = bookings.find(item => item.id === targetId);
    if (!b) return;

    const stageSequence: { stage: WashStage; progress: number }[] = [
      { stage: 'queued', progress: 10 },
      { stage: 'pre_rinse', progress: 25 },
      { stage: 'bio_foam', progress: 45 },
      { stage: 'steam_wash', progress: 65 },
      { stage: 'drying', progress: 80 },
      { stage: 'inspection', progress: 95 },
      { stage: 'completed', progress: 100 },
    ];

    const currentIndex = stageSequence.findIndex(s => s.stage === b.washStatus);
    const nextIndex = (currentIndex + 1) % stageSequence.length;
    const next = stageSequence[nextIndex];

    updateBookingStage(b.id, next.stage, next.progress);
  };

  return (
    <AppContext.Provider
      value={{
        isDark,
        toggleDarkMode,
        role,
        setRole,
        activeView,
        setActiveView,
        mobileViewMode,
        setMobileViewMode,
        isAuthModalOpen,
        setIsAuthModalOpen,
        customer,
        services,
        addons,
        branches,
        rewards,
        loungeItems,
        bookings,
        activeBookingId,
        setActiveBookingId,
        activeBooking,
        notifications,
        loungeOrders,
        createBooking,
        updateBookingStage,
        cancelBooking,
        rateBooking,
        addVehicle,
        removeVehicle,
        updateProfile,
        redeemReward,
        addLoyaltyPoints,
        updateServicePrice,
        toggleServicePopular,
        orderLoungeItems,
        markNotificationRead,
        markAllNotificationsRead,
        addNotification,
        simulateNextWashStage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
