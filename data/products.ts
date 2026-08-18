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