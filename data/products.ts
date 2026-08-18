export type Product = {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: string;
  description: string;

  price: number;
  originalPrice?: number;
  discount?: number;

  rating: number;
  reviewCount: number;

  stock: number;
  inStock: boolean;

  image: string;
  images: string[];

  colors?: { name: string; hex: string }[];
  storage?: string[];

  specifications?: { label: string; value: string }[];
  ratingBreakdown?: { stars: number; percentage: number }[];
  reviews?: {
    id: string;
    author: string;
    rating: number;
    date: string;
    comment: string;
  }[];

  badge?: "NEW" | "BEST SELLER" | "SALE" | "TRENDING";

  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;

  tags: string[];
};

export const products: Product[] = [
  {
    id: "SLX-001",
    name: "Nova Pro Max",
    slug: "nova-pro-max",
    brand: "Sellexa",
    category: "Electronics",
    description:
      "Premium smartphone with a powerful processor, stunning display and advanced camera system.",

    price: 79999,
    originalPrice: 94999,
    discount: 16,

    rating: 4.8,
    reviewCount: 312,

    stock: 42,
    inStock: true,

    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    ],

    colors: [
      { name: "Jet Black", hex: "#1c1c1e" },
      { name: "Deep Navy", hex: "#2c3454" },
      { name: "Rose Gold", hex: "#d8b6ac" },
    ],
    storage: ["128GB", "256GB", "512GB"],

    specifications: [
      { label: "Display", value: '6.7" Super Retina, 120Hz' },
      { label: "Processor", value: "Octa-core, 3.2GHz" },
      { label: "Rear Camera", value: "50MP + 12MP + 12MP" },
      { label: "Front Camera", value: "12MP" },
      { label: "Battery", value: "5000mAh, 45W fast charging" },
      { label: "Operating System", value: "Android 15" },
      { label: "Build", value: "Titanium frame, Gorilla Glass Victus" },
      { label: "Water Resistance", value: "IP68" },
    ],

    ratingBreakdown: [
      { stars: 5, percentage: 74 },
      { stars: 4, percentage: 18 },
      { stars: 3, percentage: 5 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 1 },
    ],

    reviews: [
      {
        id: "r1",
        author: "Aditya R.",
        rating: 5,
        date: "2026-07-02",
        comment:
          "Camera quality is outstanding and the battery easily lasts a full day.",
      },
      {
        id: "r2",
        author: "Meera K.",
        rating: 5,
        date: "2026-06-18",
        comment:
          "Super smooth performance, no lag even with heavy multitasking.",
      },
      {
        id: "r3",
        author: "Farhan S.",
        rating: 4,
        date: "2026-06-05",
        comment:
          "Great phone overall, wish the charger was included in the box.",
      },
    ],

    badge: "BEST SELLER",

    featured: true,
    bestSeller: true,
    newArrival: false,

    tags: ["smartphone", "mobile", "electronics", "5g"],
  },

  {
    id: "SLX-002",
    name: "AirPulse Pro",
    slug: "airpulse-pro",
    brand: "Sellexa",
    category: "Electronics",
    description:
      "Premium wireless headphones with active noise cancellation and immersive sound.",

    price: 12999,
    originalPrice: 14999,
    discount: 13,

    rating: 4.7,
    reviewCount: 186,

    stock: 28,
    inStock: true,

    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
    ],

    colors: [
      { name: "Black", hex: "#1c1c1e" },
      { name: "White", hex: "#f5f5f3" },
    ],

    specifications: [
      { label: "Driver Size", value: "40mm dynamic drivers" },
      { label: "Noise Cancellation", value: "Active (ANC), up to 35dB" },
      { label: "Battery Life", value: "30 hours (ANC on)" },
      { label: "Charging", value: "USB-C, 10 min = 3 hrs playback" },
      { label: "Connectivity", value: "Bluetooth 5.3" },
      { label: "Weight", value: "250g" },
    ],

    ratingBreakdown: [
      { stars: 5, percentage: 68 },
      { stars: 4, percentage: 22 },
      { stars: 3, percentage: 6 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 2 },
    ],

    reviews: [
      {
        id: "r1",
        author: "Priya N.",
        rating: 5,
        date: "2026-07-20",
        comment:
          "ANC is excellent for daily commutes, blocks out almost all traffic noise.",
      },
      {
        id: "r2",
        author: "Rohan T.",
        rating: 4,
        date: "2026-07-05",
        comment:
          "Sound quality is crisp, though the ear cushions could be a bit softer.",
      },
      {
        id: "r3",
        author: "Sana W.",
        rating: 5,
        date: "2026-06-22",
        comment:
          "Battery easily lasts the whole work week on a single charge.",
      },
    ],

    badge: "TRENDING",

    featured: true,
    bestSeller: true,
    newArrival: true,

    tags: ["headphones", "wireless", "audio", "electronics"],
  },

  {
    id: "SLX-003",
    name: "Glow Serum Pro",
    slug: "glow-serum-pro",
    brand: "Sellexa Beauty",
    category: "Beauty",
    description:
      "Lightweight daily serum designed to hydrate and brighten your skin.",

    price: 1899,
    originalPrice: 2499,
    discount: 24,

    rating: 4.9,
    reviewCount: 264,

    stock: 65,
    inStock: true,

    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80",
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
    ],

    specifications: [
      { label: "Volume", value: "30ml" },
      { label: "Skin Type", value: "All skin types" },
      {
        label: "Key Ingredients",
        value: "Vitamin C, Hyaluronic Acid, Niacinamide",
      },
      { label: "Usage", value: "Apply 3-4 drops morning and night" },
      { label: "Cruelty Free", value: "Yes" },
      { label: "Shelf Life", value: "24 months from manufacture" },
    ],

    ratingBreakdown: [
      { stars: 5, percentage: 80 },
      { stars: 4, percentage: 14 },
      { stars: 3, percentage: 4 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 },
    ],

    reviews: [
      {
        id: "r1",
        author: "Kavya S.",
        rating: 5,
        date: "2026-07-15",
        comment:
          "Noticed brighter skin within two weeks, absorbs quickly without feeling sticky.",
      },
      {
        id: "r2",
        author: "Neha P.",
        rating: 5,
        date: "2026-06-30",
        comment: "Lightweight and non-greasy, perfect for humid weather.",
      },
      {
        id: "r3",
        author: "Ritu M.",
        rating: 4,
        date: "2026-06-10",
        comment:
          "Works well but the pump dispenser could be more precise.",
      },
    ],

    badge: "BEST SELLER",

    featured: true,
    bestSeller: true,
    newArrival: false,

    tags: ["beauty", "skincare", "serum", "face care"],
  },

  {
    id: "SLX-004",
    name: "Essential Skin Set",
    slug: "essential-skin-set",
    brand: "Sellexa Beauty",
    category: "Beauty",
    description:
      "Complete skincare essentials for a simple and effective daily routine.",

    price: 2499,
    originalPrice: 2999,
    discount: 17,

    rating: 4.8,
    reviewCount: 214,

    stock: 37,
    inStock: true,

    image:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80&crop=entropy",
    ],

    specifications: [
      { label: "Set Includes", value: "Cleanser, Toner, Moisturizer" },
      { label: "Skin Type", value: "All skin types" },
      { label: "Volume", value: "3 x 100ml" },
      { label: "Key Ingredients", value: "Aloe Vera, Green Tea Extract" },
      { label: "Cruelty Free", value: "Yes" },
    ],

    ratingBreakdown: [
      { stars: 5, percentage: 74 },
      { stars: 4, percentage: 18 },
      { stars: 3, percentage: 5 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 1 },
    ],

    reviews: [
      {
        id: "r1",
        author: "Ananya D.",
        rating: 5,
        date: "2026-07-08",
        comment:
          "Great starter set, my skin feels balanced and hydrated all day.",
      },
      {
        id: "r2",
        author: "Ishaan V.",
        rating: 4,
        date: "2026-06-25",
        comment:
          "Good value for a 3-step routine, the moisturizer is my favorite.",
      },
    ],

    badge: "NEW",

    featured: false,
    bestSeller: false,
    newArrival: true,

    tags: ["beauty", "skincare", "skin", "self care"],
  },

  {
    id: "SLX-005",
    name: "Night Repair Duo",
    slug: "night-repair-duo",
    brand: "Sellexa Beauty",
    category: "Beauty",
    description:
      "Night-time skincare duo formulated to support hydrated and refreshed skin.",

    price: 2699,
    originalPrice: 3299,
    discount: 18,

    rating: 4.8,
    reviewCount: 201,

    stock: 19,
    inStock: true,

    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80&crop=entropy",
    ],

    specifications: [
      { label: "Set Includes", value: "Night Cream, Repair Serum" },
      { label: "Skin Type", value: "All skin types" },
      { label: "Volume", value: "2 x 50ml" },
      { label: "Key Ingredients", value: "Retinol, Peptides, Ceramides" },
      { label: "Usage", value: "Apply nightly after cleansing" },
    ],

    ratingBreakdown: [
      { stars: 5, percentage: 74 },
      { stars: 4, percentage: 18 },
      { stars: 3, percentage: 5 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 1 },
    ],

    reviews: [
      {
        id: "r1",
        author: "Divya K.",
        rating: 5,
        date: "2026-07-12",
        comment:
          "Wake up with noticeably softer skin, the serum layers well under the cream.",
      },
      {
        id: "r2",
        author: "Arjun M.",
        rating: 4,
        date: "2026-06-19",
        comment:
          "Works great, just wish the jar was a bit bigger for the price.",
      },
    ],

    badge: "SALE",

    featured: false,
    bestSeller: false,
    newArrival: true,

    tags: ["beauty", "skincare", "night care"],
  },

  {
    id: "SLX-006",
    name: "Sellexa Pink Handbag",
    slug: "sellexa-pink-handbag",
    brand: "Sellexa Fashion",
    category: "Fashion",
    description:
      "Elegant everyday handbag with a spacious interior and premium finish.",

    price: 1499,
    originalPrice: 1999,
    discount: 25,

    rating: 4.7,
    reviewCount: 178,

    stock: 45,
    inStock: true,

    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80&crop=entropy",
    ],

    specifications: [
      { label: "Material", value: "Vegan leather" },
      { label: "Dimensions", value: "32 x 24 x 12 cm" },
      { label: "Closure", value: "Zip top" },
      { label: "Compartments", value: "1 main + 2 interior pockets" },
      { label: "Strap", value: "Adjustable, detachable" },
    ],

    ratingBreakdown: [
      { stars: 5, percentage: 68 },
      { stars: 4, percentage: 22 },
      { stars: 3, percentage: 6 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 2 },
    ],

    reviews: [
      {
        id: "r1",
        author: "Simran K.",
        rating: 5,
        date: "2026-07-18",
        comment:
          "Spacious yet lightweight, fits my laptop and daily essentials easily.",
      },
      {
        id: "r2",
        author: "Pooja R.",
        rating: 5,
        date: "2026-07-01",
        comment:
          "The finish looks premium, gets compliments every time I carry it.",
      },
      {
        id: "r3",
        author: "Tanvi S.",
        rating: 4,
        date: "2026-06-14",
        comment: "Beautiful bag, though the strap could be a touch longer.",
      },
    ],

    badge: "BEST SELLER",

    featured: true,
    bestSeller: true,
    newArrival: false,

    tags: ["fashion", "handbag", "bags", "women"],
  },

  {
    id: "SLX-007",
    name: "Sellexa Tote Bag",
    slug: "sellexa-tote-bag",
    brand: "Sellexa Fashion",
    category: "Fashion",
    description:
      "Minimal everyday tote bag designed for work, shopping and travel.",

    price: 699,
    originalPrice: 899,
    discount: 22,

    rating: 4.6,
    reviewCount: 143,

    stock: 200,
    inStock: true,

    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80&crop=entropy",
    ],

    specifications: [
      { label: "Material", value: "Canvas with leather trim" },
      { label: "Dimensions", value: "38 x 30 x 14 cm" },
      { label: "Closure", value: "Magnetic snap" },
      { label: "Capacity", value: 'Fits a 14" laptop' },
    ],

    ratingBreakdown: [
      { stars: 5, percentage: 62 },
      { stars: 4, percentage: 25 },
      { stars: 3, percentage: 8 },
      { stars: 2, percentage: 3 },
      { stars: 1, percentage: 2 },
    ],

    reviews: [
      {
        id: "r1",
        author: "Meghna J.",
        rating: 5,
        date: "2026-07-10",
        comment:
          "Perfect everyday tote, sturdy enough for groceries and work files.",
      },
      {
        id: "r2",
        author: "Karan B.",
        rating: 4,
        date: "2026-06-28",
        comment: "Good quality canvas, exactly as pictured.",
      },
    ],

    featured: false,
    bestSeller: false,
    newArrival: true,

    tags: ["fashion", "bag", "tote", "shopping"],
  },

  {
    id: "SLX-008",
    name: "Leather Sneakers",
    slug: "leather-sneakers",
    brand: "Sellexa Footwear",
    category: "Footwear",
    description:
      "Comfortable premium sneakers built for everyday movement and casual styling.",

    price: 6499,
    originalPrice: 7999,
    discount: 19,

    rating: 4.8,
    reviewCount: 198,

    stock: 32,
    inStock: true,

    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&crop=entropy",
    ],

    colors: [
      { name: "Black", hex: "#1c1c1e" },
      { name: "White", hex: "#f5f5f3" },
      { name: "Tan", hex: "#c9a27a" },
    ],

    specifications: [
      { label: "Material", value: "Genuine leather upper" },
      { label: "Sole", value: "Rubber, cushioned insole" },
      { label: "Closure", value: "Lace-up" },
      { label: "Available Sizes", value: "UK 6 - UK 11" },
      { label: "Care", value: "Wipe clean with a damp cloth" },
    ],

    ratingBreakdown: [
      { stars: 5, percentage: 74 },
      { stars: 4, percentage: 18 },
      { stars: 3, percentage: 5 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 1 },
    ],

    reviews: [
      {
        id: "r1",
        author: "Vikram S.",
        rating: 5,
        date: "2026-07-22",
        comment:
          "Super comfortable straight out of the box, no break-in period needed.",
      },
      {
        id: "r2",
        author: "Aisha K.",
        rating: 5,
        date: "2026-07-03",
        comment:
          "Leather quality is excellent for the price, true to size.",
      },
      {
        id: "r3",
        author: "Nikhil P.",
        rating: 4,
        date: "2026-06-17",
        comment:
          "Great sneakers, sole could offer a bit more grip on wet surfaces.",
      },
    ],

    badge: "TRENDING",

    featured: true,
    bestSeller: true,
    newArrival: false,

    tags: ["shoes", "sneakers", "footwear", "men"],
  },

  {
    id: "SLX-009",
    name: "Sellexa Smart Watch",
    slug: "sellexa-smart-watch",
    brand: "Sellexa",
    category: "Electronics",
    description:
      "Smart wearable with fitness tracking, notifications and a vibrant display.",

    price: 4999,
    originalPrice: 6499,
    discount: 23,

    rating: 4.6,
    reviewCount: 159,

    stock: 54,
    inStock: true,

    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&crop=entropy",
    ],

    colors: [
      { name: "Black", hex: "#1c1c1e" },
      { name: "Silver", hex: "#c7c9cc" },
    ],

    specifications: [
      { label: "Display", value: '1.4" AMOLED touchscreen' },
      { label: "Battery Life", value: "Up to 7 days" },
      { label: "Water Resistance", value: "5 ATM" },
      { label: "Sensors", value: "Heart rate, SpO2, accelerometer" },
      { label: "Connectivity", value: "Bluetooth 5.0" },
      { label: "Compatibility", value: "Android & iOS" },
    ],

    ratingBreakdown: [
      { stars: 5, percentage: 62 },
      { stars: 4, percentage: 25 },
      { stars: 3, percentage: 8 },
      { stars: 2, percentage: 3 },
      { stars: 1, percentage: 2 },
    ],

    reviews: [
      {
        id: "r1",
        author: "Rahul D.",
        rating: 5,
        date: "2026-07-14",
        comment:
          "Battery genuinely lasts close to a week, tracking is accurate.",
      },
      {
        id: "r2",
        author: "Shreya N.",
        rating: 4,
        date: "2026-06-29",
        comment:
          "Great features for the price, app could use more workout modes.",
      },
    ],

    badge: "NEW",

    featured: false,
    bestSeller: false,
    newArrival: true,

    tags: ["smartwatch", "watch", "wearable", "electronics"],
  },

  {
    id: "SLX-010",
    name: "Sellexa Water Bottle",
    slug: "sellexa-water-bottle",
    brand: "Sellexa Home",
    category: "Home & Living",
    description:
      "Reusable insulated water bottle designed to keep drinks cool throughout the day.",

    price: 399,
    originalPrice: 599,
    discount: 33,

    rating: 4.5,
    reviewCount: 97,

    stock: 0,
    inStock: false,

    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80&crop=entropy",
    ],

    specifications: [
      { label: "Capacity", value: "750ml" },
      { label: "Material", value: "18/8 stainless steel" },
      { label: "Insulation", value: "Keeps drinks cold 24h / hot 12h" },
      { label: "Lid Type", value: "Leak-proof screw cap" },
    ],

    ratingBreakdown: [
      { stars: 5, percentage: 58 },
      { stars: 4, percentage: 27 },
      { stars: 3, percentage: 9 },
      { stars: 2, percentage: 4 },
      { stars: 1, percentage: 2 },
    ],

    reviews: [
      {
        id: "r1",
        author: "Aman T.",
        rating: 5,
        date: "2026-07-06",
        comment: "Keeps water cold the entire day even in summer heat.",
      },
      {
        id: "r2",
        author: "Priyanka L.",
        rating: 4,
        date: "2026-06-20",
        comment:
          "Good insulation, a little heavy when full but worth it.",
      },
    ],

    badge: "SALE",

    featured: false,
    bestSeller: false,
    newArrival: false,

    tags: ["bottle", "home", "lifestyle", "water bottle"],
  },

  {
    id: "SLX-011",
    name: "Sellexa Gift Box",
    slug: "sellexa-gift-box",
    brand: "Sellexa",
    category: "Gifts & Lifestyle",
    description:
      "A premium curated gift box suitable for birthdays, celebrations and special occasions.",

    price: 1499,
    originalPrice: 1899,
    discount: 21,

    rating: 4.8,
    reviewCount: 121,

    stock: 45,
    inStock: true,

    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80",
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80&crop=entropy",
    ],

    specifications: [
      {
        label: "Box Includes",
        value: "Candle, chocolates, greeting card, keepsake",
      },
      { label: "Dimensions", value: "25 x 20 x 10 cm" },
      { label: "Packaging", value: "Premium gift-wrapped with ribbon" },
      { label: "Occasion", value: "Birthdays, anniversaries, celebrations" },
    ],

    ratingBreakdown: [
      { stars: 5, percentage: 74 },
      { stars: 4, percentage: 18 },
      { stars: 3, percentage: 5 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 1 },
    ],

    reviews: [
      {
        id: "r1",
        author: "Nisha A.",
        rating: 5,
        date: "2026-07-16",
        comment: "Beautifully packaged, my sister loved every item inside.",
      },
      {
        id: "r2",
        author: "Rohit K.",
        rating: 5,
        date: "2026-07-02",
        comment: "Perfect gift for a birthday, presentation was top notch.",
      },
      {
        id: "r3",
        author: "Sneha V.",
        rating: 4,
        date: "2026-06-11",
        comment:
          "Lovely box overall, would like a few more chocolate options.",
      },
    ],

    badge: "NEW",

    featured: true,
    bestSeller: false,
    newArrival: true,

    tags: ["gift", "lifestyle", "present", "gifting"],
  },

  {
    id: "SLX-012",
    name: "Nova Wireless Speaker",
    slug: "nova-wireless-speaker",
    brand: "Sellexa",
    category: "Electronics",
    description:
      "Compact wireless speaker delivering rich sound with all-day battery life.",

    price: 2999,
    originalPrice: 3999,
    discount: 25,

    rating: 4.7,
    reviewCount: 134,

    stock: 26,
    inStock: true,

    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80&crop=entropy",
    ],

    colors: [
      { name: "Black", hex: "#1c1c1e" },
      { name: "Slate Blue", hex: "#3d4a63" },
    ],

    specifications: [
      { label: "Output Power", value: "20W RMS" },
      { label: "Battery Life", value: "Up to 18 hours" },
      { label: "Connectivity", value: "Bluetooth 5.2, AUX-in" },
      { label: "Water Resistance", value: "IPX7" },
      { label: "Charging", value: "USB-C" },
    ],

    ratingBreakdown: [
      { stars: 5, percentage: 68 },
      { stars: 4, percentage: 22 },
      { stars: 3, percentage: 6 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 2 },
    ],

    reviews: [
      {
        id: "r1",
        author: "Yash R.",
        rating: 5,
        date: "2026-07-19",
        comment: "Sound is punchy for its size, great for outdoor gatherings.",
      },
      {
        id: "r2",
        author: "Fatima Z.",
        rating: 4,
        date: "2026-07-04",
        comment:
          "Good battery life, bass could be a touch stronger at max volume.",
      },
    ],

    badge: "BEST SELLER",

    featured: true,
    bestSeller: true,
    newArrival: false,

    tags: ["speaker", "audio", "wireless", "electronics"],
  },
];

export const categories = [
  "All",
  "Electronics",
  "Beauty",
  "Fashion",
  "Footwear",
  "Home & Living",
  "Gifts & Lifestyle",
];

export const brands = [
  "All",
  "Sellexa",
  "Sellexa Beauty",
  "Sellexa Fashion",
  "Sellexa Footwear",
  "Sellexa Home",
];

export const getFeaturedProducts = () =>
  products.filter((product) => product.featured);

export const getBestSellingProducts = () =>
  products.filter((product) => product.bestSeller);

export const getNewArrivals = () =>
  products.filter((product) => product.newArrival);

export const getProductBySlug = (slug: string) =>
  products.find((product) => product.slug === slug);

export const getProductsByCategory = (category: string) => {
  if (category === "All") return products;

  return products.filter(
    (product) => product.category === category
  );
};