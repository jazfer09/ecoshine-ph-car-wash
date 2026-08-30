export type UserRole = 'customer' | 'admin';

export type VehicleCategory = 'motorcycle' | 'sedan' | 'suv' | 'van' | 'pickup';

export interface Vehicle {
  id: string;
  plateNumber: string;
  make: string;
  model: string;
  year?: string;
  color: string;
  category: VehicleCategory;
}

export type ServiceCategory = 'wash' | 'detailing' | 'protection' | 'specialty' | 'interior' | 'complete';

export interface ServicePackage {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ServiceCategory;
  basePrices: Record<VehicleCategory, number>; // in Philippine Peso ₱
  durationMinutes: number;
  waterSavedLiters: number;
  co2OffsetKg: number;
  popular?: boolean;
  ecoHighlights: string[];
  features: string[];
  image: string;
}

export interface AddonService {
  id: string;
  name: string;
  description: string;
  price: number; // in ₱
  durationMinutes: number;
  waterSavedLiters?: number;
  iconName: string;
}

export type WashStage = 
  | 'queued'
  | 'pre_rinse'
  | 'bio_foam'
  | 'steam_wash'
  | 'drying'
  | 'inspection'
  | 'completed'
  | 'cancelled';

export type PaymentMethod = 'gcash' | 'maya' | 'qrph' | 'card' | 'grabpay' | 'cash';
export type PaymentStatus = 'paid' | 'pending' | 'refunded';

export interface Booking {
  id: string;
  bookingCode: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  plateNumber: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleColor: string;
  vehicleCategory: VehicleCategory;
  branchId: string;
  branchName: string;
  bayNumber: number;
  serviceId: string;
  serviceName: string;
  addonIds: string[];
  addonNames: string[];
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "10:00 AM"
  totalAmount: number; // in ₱
  discountApplied: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  paymentReference?: string;
  washStatus: WashStage;
  stageProgress: number; // 0 to 100
  technicianName: string;
  estimatedCompletion: string;
  notes?: string;
  rating?: number;
  feedback?: string;
  createdAt: string;
  waterSaved: number;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  contactNumber: string;
  openHours: string;
  totalBays: number;
  activeBays: number;
  coordinates: { lat: number; lng: number };
  amenities: string[];
}

export type LoyaltyTier = 'Eco Bronze' | 'Eco Silver' | 'Eco Gold' | 'Eco Diamond';

export interface LoyaltyReward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  discountType: 'percent' | 'fixed' | 'free_addon';
  discountValue: number;
  expiresInDays: number;
  icon: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicles: Vehicle[];
  loyaltyPoints: number;
  tier: LoyaltyTier;
  completedWashes: number;
  stampsCount: number; // 0-10 stamps card
  totalWaterSavedLiters: number;
  totalCO2SavedKg: number;
  totalSpentPeso: number;
  unlockedVouchers: string[]; // reward ids
  preferredBranchId: string;
}

export interface LoungeItem {
  id: string;
  name: string;
  category: 'beverage' | 'snack' | 'perk';
  price: number; // 0 for complimentary, or small ₱
  description: string;
  icon: string;
  isComplimentaryForLoyalty?: boolean;
}

export interface LoungeOrder {
  id: string;
  bookingCode: string;
  customerName: string;
  seatNumber: string;
  items: { item: LoungeItem; quantity: number }[];
  total: number;
  status: 'preparing' | 'served';
  orderedAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'booking' | 'wash_stage' | 'loyalty' | 'promo' | 'reminder';
  read: boolean;
  bookingCode?: string;
}

export interface MonthlyReportData {
  month: string;
  totalWashes: number;
  revenuePeso: number;
  waterSavedLiters: number;
  co2OffsetKg: number;
  avgRating: number;
  topService: string;
}
