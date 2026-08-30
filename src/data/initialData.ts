import {
  ServicePackage,
  AddonService,
  Branch,
  Booking,
  CustomerProfile,
  LoyaltyReward,
  LoungeItem,
  MonthlyReportData,
  AppNotification,
} from '../types';

export const INITIAL_BRANCHES: Branch[] = [
  {
    id: 'br-qc',
    name: 'EcoShine Diliman - QC Flagship',
    address: '108 Commonwealth Avenue, Diliman',
    city: 'Quezon City, Metro Manila',
    contactNumber: '+63 (02) 8920-3344 / 0917-888-3267',
    openHours: '7:00 AM - 9:00 PM Daily',
    totalBays: 6,
    activeBays: 5,
    coordinates: { lat: 14.654, lng: 121.065 },
    amenities: ['Airconditioned Eco-Lounge', 'Free High-Speed 5G Wi-Fi', 'Barista Coffee Bar', 'Smart TV & Co-working Desks', 'Solar Wash Bays'],
  },
  {
    id: 'br-bgc',
    name: 'EcoShine BGC Autohub',
    address: '9th Avenue cor. 32nd St., Bonifacio Global City',
    city: 'Taguig, Metro Manila',
    contactNumber: '+63 (02) 8887-2201 / 0918-999-3267',
    openHours: '6:30 AM - 10:00 PM Daily',
    totalBays: 8,
    activeBays: 7,
    coordinates: { lat: 14.551, lng: 121.050 },
    amenities: ['VIP Glass Viewing Lounge', 'Complimentary Specialty Coffee', 'Ultra-fast Fiber Wi-Fi', 'EV Charging Station', '98% Water Reclamation'],
  },
  {
    id: 'br-makati',
    name: 'EcoShine Pasong Tamo Eco-Bays',
    address: '2230 Chino Roces Ave, Bangkal',
    city: 'Makati City, Metro Manila',
    contactNumber: '+63 (02) 8812-7744 / 0999-555-3267',
    openHours: '7:00 AM - 8:30 PM Daily',
    totalBays: 5,
    activeBays: 4,
    coordinates: { lat: 14.542, lng: 121.014 },
    amenities: ['Work & Chill Pods', 'Complimentary Calamansi Green Tea', 'High-Speed Wi-Fi', 'Mobile Device Charging Hub'],
  },
  {
    id: 'br-alabang',
    name: 'EcoShine Alabang Westgate',
    address: 'Westgate Center, Filinvest Corporate City',
    city: 'Muntinlupa City, Metro Manila',
    contactNumber: '+63 (02) 8771-4499 / 0917-333-3267',
    openHours: '7:30 AM - 9:00 PM Daily',
    totalBays: 6,
    activeBays: 6,
    coordinates: { lat: 14.421, lng: 121.031 },
    amenities: ['Garden Eco-Veranda', 'Complimentary Beverages', 'Kids & Waiting Area', 'Touchless Automatic Pre-Rinse'],
  },
  {
    id: 'br-cebu',
    name: 'EcoShine Cebu IT Park',
    address: 'Salinas Drive Extension, Lahug',
    city: 'Cebu City, Central Visayas',
    contactNumber: '+63 (032) 412-8822 / 0922-777-3267',
    openHours: '7:00 AM - 8:00 PM Daily',
    totalBays: 5,
    activeBays: 4,
    coordinates: { lat: 10.331, lng: 123.906 },
    amenities: ['Visayan Coffee Corner', 'Airconditioned Work Lounge', 'Rainwater Harvesting System', 'High-Speed Wi-Fi'],
  }
];

export const INITIAL_SERVICES: ServicePackage[] = [
  {
    id: 'srv-eco-foam',
    name: 'Eco Bio-Foam Express Wash',
    tagline: 'Fast, pristine clean using 100% biodegradable coconut-derived shampoo',
    description: 'Our signature gentle wash utilizing closed-loop filtered water and high-lubricity pH-neutral plant active foam. Gentle on clear coats and zero toxic runoff.',
    category: 'wash',
    basePrices: {
      motorcycle: 150,
      sedan: 280,
      suv: 350,
      van: 420,
      pickup: 390
    },
    durationMinutes: 25,
    waterSavedLiters: 160,
    co2OffsetKg: 1.2,
    popular: true,
    ecoHighlights: ['Coconut-oil bio surfactant', 'Microfiber touchless pre-rinse', 'Tire conditioning with organic silicone-free dressing'],
    features: [
      'De-ionized filtered water rinse',
      'High-foam plant active body bath',
      'Wheel arches & rim bio-degreasing',
      'Streak-free plush microfiber hand dry',
      'Window crystal glass wipe',
      'Organic tire dress & shine'
    ],
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-steam-interior',
    name: 'Thermal Steam Disinfection & Interior Deep Clean',
    tagline: '99.9% bacteria & odor eradication using dry vaporized steam with zero harsh chemicals',
    description: 'High-temperature 140°C pressurized dry steam penetrates deep into fabric, leather pores, AC vents, and floor carpets, eliminating allergen microbes, virus, and stubborn smoke odors.',
    category: 'interior',
    basePrices: {
      motorcycle: 200,
      sedan: 650,
      suv: 850,
      van: 1100,
      pickup: 950
    },
    durationMinutes: 45,
    waterSavedLiters: 220,
    co2OffsetKg: 2.1,
    ecoHighlights: ['Thermal heat instead of harsh bleach', 'Bio-enzyme bacterial digestant', 'Zero chemical fume residue for kids & pets'],
    features: [
      'Complete cabin HEPA vacuuming',
      '140°C dry steam sanitization of all seats & mats',
      'AC ventilation duct steam purge & ozone freshening',
      'Dashboard & door trim UV matte conditioning',
      'Leather feeding with natural beeswax balm',
      'Anti-bacterial steering wheel sterilization'
    ],
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1adc6f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-signature-combo',
    name: 'EcoShine Complete Signature Care',
    tagline: 'The ultimate exterior bio-wash + interior steam detailing + graphene sealant',
    description: 'Our most popular comprehensive package combining pure exterior foam treatment, full interior thermal steam purification, and a hydrophobic SiO2 silica gloss boost.',
    category: 'complete',
    basePrices: {
      motorcycle: 350,
      sedan: 880,
      suv: 1150,
      van: 1450,
      pickup: 1250
    },
    durationMinutes: 60,
    waterSavedLiters: 290,
    co2OffsetKg: 3.5,
    popular: true,
    ecoHighlights: ['Saves 290+ Liters of fresh water', 'Zero VOC polymer seal', 'Free complimentary lounge iced drink'],
    features: [
      'Everything in Eco Bio-Foam Express Wash',
      'Full interior vacuum & thermal steam wipe-down',
      'Hydrophobic SiO2 ceramic spray coat (3-month water beading)',
      'Door jambs, trunk perimeter, and gas cap clean',
      'Engine top cover eco-wipe',
      'Premium long-lasting interior pine/citrus botanical scent'
    ],
    image: 'https://images.unsplash.com/photo-1552930294-6b595f4c2974?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-ceramic-diamond',
    name: 'Ceramic Nano-Shield Paint Protection',
    tagline: 'Multi-stage paint de-ironing, clay bar decontamination, and 12-month ceramic gloss',
    description: 'Restores paint depth and creates an ultra-slick ceramic barrier against Philippine road grime, acid rain, bird droppings, and UV oxidation with solar curing.',
    category: 'protection',
    basePrices: {
      motorcycle: 800,
      sedan: 1850,
      suv: 2400,
      van: 2950,
      pickup: 2600
    },
    durationMinutes: 90,
    waterSavedLiters: 340,
    co2OffsetKg: 4.2,
    ecoHighlights: ['Biodegradable citrus iron fall-out remover', 'Water-based nano-coat formulation'],
    features: [
      'Full Signature Wash & Underchassis flush',
      'Iron fall-out chemical de-ironing + fine clay bar step',
      'Single-stage gloss enhancement machine polish',
      '9H Ceramic Nano sealant application on paint & lights',
      'Hydrophobic glass rain repellent coating (Windshield + side windows)',
      '12-Month warranty certificate & inspection card'
    ],
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-underchassis-anti-rust',
    name: 'Eco Underchassis Wash & Mud Decontamination',
    tagline: 'High pressure eco-water jet underbody flush with salt & mud neutralizer',
    description: 'Crucial for Philippine flood waters, seaside salt breeze, and rainy season road grime. Cleans suspension links, wheel wells, and subframe without harmful petroleum solvents.',
    category: 'specialty',
    basePrices: {
      motorcycle: 180,
      sedan: 450,
      suv: 550,
      van: 650,
      pickup: 600
    },
    durationMinutes: 30,
    waterSavedLiters: 190,
    co2OffsetKg: 1.8,
    ecoHighlights: ['99% recirculated pressurized wash', 'Non-toxic rust inhibitor'],
    features: [
      'Ramp-lift underbody high pressure multi-angle jet wash',
      'Wheel well deep scrub and mud release',
      'Suspension bushings & differential inspection rinse',
      'Application of water-based corrosion barrier spray'
    ],
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_ADDONS: AddonService[] = [
  {
    id: 'add-fogging',
    name: 'Bactakleen Cabin Bio-Fogging',
    description: 'Plant-based herbal mist eliminates 99.99% of airborne viruses, mold & fungi',
    price: 350,
    durationMinutes: 15,
    waterSavedLiters: 20,
    iconName: 'ShieldAlert'
  },
  {
    id: 'add-engine-steam',
    name: 'Eco Engine Bay Dry Steam Detail',
    description: 'Gentle dry steam dissolves oil & dust without drenching sensitive electronics',
    price: 450,
    durationMinutes: 20,
    waterSavedLiters: 50,
    iconName: 'Cpu'
  },
  {
    id: 'add-glass-bead',
    name: 'Aquapel Windshield Rain Repellent',
    description: 'Superior water beading for safer wet weather driving along EDSA & expressways',
    price: 300,
    durationMinutes: 10,
    waterSavedLiters: 0,
    iconName: 'Droplets'
  },
  {
    id: 'add-headlight-restore',
    name: 'Headlight Lens UV Restoration',
    description: 'Removes yellowish oxidation and applies anti-yellow UV sealant on both headlights',
    price: 500,
    durationMinutes: 25,
    waterSavedLiters: 10,
    iconName: 'Sun'
  },
  {
    id: 'add-leather-feed',
    name: 'Organic Beeswax Leather Conditioning',
    description: 'Nourishes dry leather seats to prevent cracking under tropical Philippine heat',
    price: 380,
    durationMinutes: 15,
    waterSavedLiters: 0,
    iconName: 'Sparkles'
  }
];

export const INITIAL_LOYALTY_REWARDS: LoyaltyReward[] = [
  {
    id: 'rew-100-off',
    title: '₱100 Discount Voucher',
    description: 'Valid for any wash or detailing service at any EcoShine branch',
    pointsCost: 200,
    discountType: 'fixed',
    discountValue: 100,
    expiresInDays: 30,
    icon: 'Ticket'
  },
  {
    id: 'rew-free-steam-engine',
    title: 'Free Engine Bay Steam Detail',
    description: 'Complimentary eco engine steam cleaning with your next wash',
    pointsCost: 450,
    discountType: 'free_addon',
    discountValue: 450,
    expiresInDays: 45,
    icon: 'Cpu'
  },
  {
    id: 'rew-50-percent',
    title: '50% OFF Signature Complete Care',
    description: 'Half-price on our premier all-inclusive package',
    pointsCost: 750,
    discountType: 'percent',
    discountValue: 50,
    expiresInDays: 60,
    icon: 'Sparkles'
  },
  {
    id: 'rew-free-drink-snack',
    title: 'Free Artisan Beverage & Pastry',
    description: 'Redeem at the Eco-Lounge café while your car gets washed',
    pointsCost: 120,
    discountType: 'fixed',
    discountValue: 150,
    expiresInDays: 14,
    icon: 'Coffee'
  }
];

export const INITIAL_LOUNGE_ITEMS: LoungeItem[] = [
  {
    id: 'lng-coffee-americano',
    name: 'Benguet Arabica Iced Americano',
    category: 'beverage',
    price: 0,
    description: 'Single-origin highland brew served chilled with eco bamboo straw.',
    icon: 'Coffee',
    isComplimentaryForLoyalty: true
  },
  {
    id: 'lng-tea-calamansi',
    name: 'Fresh Honey Calamansi Green Tea',
    category: 'beverage',
    price: 0,
    description: 'Locally harvested calamansi with wild Palawan honey.',
    icon: 'CupSoda',
    isComplimentaryForLoyalty: true
  },
  {
    id: 'lng-coffee-latte',
    name: 'Caramel Macchiato Oat Milk',
    category: 'beverage',
    price: 85,
    description: 'Rich espresso with dairy-free oat milk and coconut sugar caramel.',
    icon: 'Coffee',
    isComplimentaryForLoyalty: false
  },
  {
    id: 'lng-pastry-croissant',
    name: 'Butter Croissant / Ube Cheese Bun',
    category: 'snack',
    price: 65,
    description: 'Freshly warmed pastry to accompany your waiting time.',
    icon: 'Utensils',
    isComplimentaryForLoyalty: false
  },
  {
    id: 'lng-wifi-ticket',
    name: 'High-Speed 5G Lounge Wi-Fi Token',
    category: 'perk',
    price: 0,
    description: 'Unlimited 200Mbps Wi-Fi access code for streaming or remote work.',
    icon: 'Wifi',
    isComplimentaryForLoyalty: true
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    bookingCode: 'ECO-7821',
    customerName: 'Juan Dela Cruz',
    customerPhone: '0917-882-9912',
    customerEmail: 'juan.delacruz@gmail.com',
    plateNumber: 'NDL 8821',
    vehicleMake: 'Toyota',
    vehicleModel: 'Fortuner GR-S',
    vehicleColor: 'Pearl White',
    vehicleCategory: 'suv',
    branchId: 'br-qc',
    branchName: 'EcoShine Diliman - QC Flagship',
    bayNumber: 2,
    serviceId: 'srv-signature-combo',
    serviceName: 'EcoShine Complete Signature Care',
    addonIds: ['add-fogging'],
    addonNames: ['Bactakleen Cabin Bio-Fogging'],
    date: new Date().toISOString().split('T')[0],
    timeSlot: '10:30 AM',
    totalAmount: 1500,
    discountApplied: 0,
    paymentMethod: 'gcash',
    paymentStatus: 'paid',
    paymentReference: 'GC-99482710492',
    washStatus: 'bio_foam',
    stageProgress: 45,
    technicianName: 'Kuya Jun & Bay Team Alpha',
    estimatedCompletion: '11:30 AM',
    notes: 'Please pay extra attention to front grille mud',
    createdAt: '2026-08-29T09:15:00Z',
    waterSaved: 310
  },
  {
    id: 'bk-102',
    bookingCode: 'ECO-9482',
    customerName: 'Maria Santos',
    customerPhone: '0918-772-4411',
    customerEmail: 'maria.santos@yahoo.com',
    plateNumber: 'NBT 4920',
    vehicleMake: 'Honda',
    vehicleModel: 'Civic RS Turbo',
    vehicleColor: 'Rallye Red',
    vehicleCategory: 'sedan',
    branchId: 'br-bgc',
    branchName: 'EcoShine BGC Autohub',
    bayNumber: 4,
    serviceId: 'srv-ceramic-diamond',
    serviceName: 'Ceramic Nano-Shield Paint Protection',
    addonIds: ['add-glass-bead', 'add-engine-steam'],
    addonNames: ['Aquapel Windshield Rain Repellent', 'Eco Engine Bay Dry Steam Detail'],
    date: new Date().toISOString().split('T')[0],
    timeSlot: '11:00 AM',
    totalAmount: 2600,
    discountApplied: 100,
    paymentMethod: 'maya',
    paymentStatus: 'paid',
    paymentReference: 'MAY-28104821',
    washStatus: 'drying',
    stageProgress: 75,
    technicianName: 'Master Detailer Aris',
    estimatedCompletion: '12:30 PM',
    notes: 'Fragile ceramic coat, customer requested microfiber inspection',
    createdAt: '2026-08-29T10:00:00Z',
    waterSaved: 390
  },
  {
    id: 'bk-103',
    bookingCode: 'ECO-3391',
    customerName: 'Rodrigo Mendoza',
    customerPhone: '0922-441-9988',
    customerEmail: 'rodrigo.m@gmail.com',
    plateNumber: 'CAE 9931',
    vehicleMake: 'Ford',
    vehicleModel: 'Ranger Raptor',
    vehicleColor: 'Conquer Grey',
    vehicleCategory: 'pickup',
    branchId: 'br-alabang',
    branchName: 'EcoShine Alabang Westgate',
    bayNumber: 1,
    serviceId: 'srv-underchassis-anti-rust',
    serviceName: 'Eco Underchassis Wash & Mud Decontamination',
    addonIds: [],
    addonNames: [],
    date: new Date().toISOString().split('T')[0],
    timeSlot: '01:30 PM',
    totalAmount: 600,
    discountApplied: 0,
    paymentMethod: 'qrph',
    paymentStatus: 'paid',
    paymentReference: 'QRPH-002941829',
    washStatus: 'queued',
    stageProgress: 10,
    technicianName: 'Team Dante',
    estimatedCompletion: '02:00 PM',
    createdAt: '2026-08-29T08:00:00Z',
    waterSaved: 190
  },
  {
    id: 'bk-104',
    bookingCode: 'ECO-1120',
    customerName: 'Sofia Reyes',
    customerPhone: '0917-555-1299',
    customerEmail: 'sofia.reyes@work.ph',
    plateNumber: 'ABC 1234',
    vehicleMake: 'Mitsubishi',
    vehicleModel: 'Xpander Cross',
    vehicleColor: 'Graphite Grey',
    vehicleCategory: 'suv',
    branchId: 'br-qc',
    branchName: 'EcoShine Diliman - QC Flagship',
    bayNumber: 3,
    serviceId: 'srv-eco-foam',
    serviceName: 'Eco Bio-Foam Express Wash',
    addonIds: [],
    addonNames: [],
    date: '2026-08-28',
    timeSlot: '03:00 PM',
    totalAmount: 350,
    discountApplied: 0,
    paymentMethod: 'cash',
    paymentStatus: 'paid',
    washStatus: 'completed',
    stageProgress: 100,
    technicianName: 'Kuya Ronald',
    estimatedCompletion: 'Completed',
    rating: 5,
    feedback: 'Super bilis at napakakintab ng sasakyan! Sarap pa ng kape sa lounge habang naghihintay.',
    createdAt: '2026-08-28T14:30:00Z',
    waterSaved: 160
  }
];

export const INITIAL_CUSTOMER: CustomerProfile = {
  id: 'cust-current-1',
  name: 'Juan Dela Cruz',
  email: 'juan.delacruz@gmail.com',
  phone: '0917-882-9912',
  vehicles: [
    {
      id: 'veh-1',
      plateNumber: 'NDL 8821',
      make: 'Toyota',
      model: 'Fortuner GR-S',
      year: '2024',
      color: 'Pearl White',
      category: 'suv'
    },
    {
      id: 'veh-2',
      plateNumber: 'XYZ 9920',
      make: 'Mazda',
      model: '3 Fastback',
      year: '2023',
      color: 'Soul Red Crystal',
      category: 'sedan'
    }
  ],
  loyaltyPoints: 580,
  tier: 'Eco Gold',
  completedWashes: 8,
  stampsCount: 8, // 8 out of 10 stamps
  totalWaterSavedLiters: 2180,
  totalCO2SavedKg: 24.5,
  totalSpentPeso: 9450,
  unlockedVouchers: ['rew-100-off'],
  preferredBranchId: 'br-qc'
};

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: '🚗 Wash Update: Bio-Foam Bath Active',
    message: 'Your Toyota Fortuner (NDL 8821) is currently undergoing Coconut Bio-Foam bath at Bay 2. Estimated time left: 25 mins.',
    timestamp: '5 mins ago',
    type: 'wash_stage',
    read: false,
    bookingCode: 'ECO-7821'
  },
  {
    id: 'notif-2',
    title: '🌿 150 EcoPoints Earned!',
    message: 'You unlocked Eco Gold Tier perks! Claim your free lounge specialty drink on your next visit.',
    timestamp: '1 hour ago',
    type: 'loyalty',
    read: false
  },
  {
    id: 'notif-3',
    title: '☕ Complimentary Lounge Beverage Ready',
    message: 'Your Benguet Arabica Iced Americano order is ready at Seat #4 in the Diliman Eco-Lounge.',
    timestamp: '2 hours ago',
    type: 'promo',
    read: true,
    bookingCode: 'ECO-7821'
  }
];

export const INITIAL_MONTHLY_REPORT: MonthlyReportData[] = [
  { month: 'March 2026', totalWashes: 420, revenuePeso: 385000, waterSavedLiters: 92400, co2OffsetKg: 950, avgRating: 4.8, topService: 'Eco Bio-Foam Express' },
  { month: 'April 2026', totalWashes: 490, revenuePeso: 448000, waterSavedLiters: 107800, co2OffsetKg: 1120, avgRating: 4.9, topService: 'EcoShine Signature Care' },
  { month: 'May 2026', totalWashes: 560, revenuePeso: 520000, waterSavedLiters: 123200, co2OffsetKg: 1290, avgRating: 4.85, topService: 'EcoShine Signature Care' },
  { month: 'June 2026', totalWashes: 610, revenuePeso: 595000, waterSavedLiters: 134200, co2OffsetKg: 1410, avgRating: 4.92, topService: 'Underchassis Mud Flush' },
  { month: 'July 2026', totalWashes: 680, revenuePeso: 672000, waterSavedLiters: 149600, co2OffsetKg: 1580, avgRating: 4.88, topService: 'Underchassis Anti-Rust' },
  { month: 'August 2026 (MTD)', totalWashes: 740, revenuePeso: 735000, waterSavedLiters: 162800, co2OffsetKg: 1720, avgRating: 4.95, topService: 'EcoShine Signature Care' }
];

export const ECO_TRIVIA = [
  {
    q: 'Did you know? A standard home garden hose car wash wastes over 300 to 450 Liters of clean potable water per wash.',
    a: 'EcoShine closed-loop reclamation and high-density micro-steam uses only 15 to 30 Liters — saving up to 95% of fresh water!'
  },
  {
    q: 'Why does Philippine road grime damage clear coat faster during rainy season?',
    a: 'Acidic rain mixed with EDSA exhaust soot creates corrosive sulfur film. Our pH-neutral bio-foam neutralizes acid without stripping waxes.'
  },
  {
    q: 'How does Thermal Dry Steam eliminate 99.9% of bacteria inside your car air vents?',
    a: 'At 140°C pressurized vapor, it flash-kills dust mites, mildew spores, and bacterial colonies without soaking carpets or causing damp smell.'
  },
  {
    q: 'What makes EcoShine coconut surfactants superior to petrochemical detergents?',
    a: 'Derived from Philippine coconut oil, they break down naturally in 7 days and do not harm Manila Bay or local river ecosystems.'
  }
];
