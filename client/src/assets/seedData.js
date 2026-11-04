// High-quality client fallback catalog
export const initialProducts = [
  {
    id: "prod-1",
    _id: "prod-1",
    title: "Atelier Double-Breasted Wool Trench Coat",
    brand: "Luna Atelier",
    sku: "LW-COAT-001",
    description: "Crafted from fine double-faced Italian wool, this structured trench coat features horn buttons, a cinched belted waist, and sharp lapels designed for timeless sophistication.",
    price: 320,
    originalPrice: 420,
    discountPercent: 24,
    category: "Outerwear",
    gender: "Women",
    fit: "Tailored",
    material: "90% Virgin Wool, 10% Cashmere",
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Camel", hex: "#c19a6b", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80" },
      { name: "Obsidian Black", hex: "#1c1b1f", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80" },
      { name: "Bone Ecru", hex: "#e3dac9", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: [
      { size: "XS", stock: 4 },
      { size: "S", stock: 8 },
      { size: "M", stock: 12 },
      { size: "L", stock: 3 },
      { size: "XL", stock: 0 }
    ],
    rating: 4.9,
    numReviews: 28,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    fabricAndCare: [
      "90% Virgin Wool, 10% Cashmere lining",
      "Specialist dry clean only",
      "Cool iron with pressing cloth",
      "Do not tumble dry"
    ],
    modelFit: "Model is 5'10\" (178cm) with a 32\" bust, wearing a size S.",
    shippingPolicy: "Free worldwide express shipping on this collection piece."
  },
  {
    id: "prod-2",
    _id: "prod-2",
    title: "Minimalist Mulberry Silk Slip Dress",
    brand: "Luna Studio",
    sku: "LW-DRESS-002",
    description: "An effortlessly fluid silhouette cut on the bias in heavyweight 22-momme pure mulberry silk. Features a delicate cowl neckline and adjustable cross-back straps.",
    price: 185,
    originalPrice: 220,
    discountPercent: 16,
    category: "Dresses",
    gender: "Women",
    fit: "Relaxed",
    material: "100% Grade 6A Mulberry Silk",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Champagne Pearl", hex: "#f1e9d2", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80" },
      { name: "Midnight Navy", hex: "#1b263b", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: [
      { size: "XS", stock: 2 },
      { size: "S", stock: 6 },
      { size: "M", stock: 9 },
      { size: "L", stock: 2 }
    ],
    rating: 4.8,
    numReviews: 19,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    fabricAndCare: [
      "100% Natural Mulberry Silk",
      "Hand wash cold with silk detergent",
      "Lay flat to dry out of direct sunlight"
    ],
    modelFit: "Model is 5'9\" (175cm) wearing a size S.",
    shippingPolicy: "Complimentary express delivery."
  },
  {
    id: "prod-3",
    _id: "prod-3",
    title: "13oz Japanese Selvedge Raw Denim Jeans",
    brand: "Luna Denim Lab",
    sku: "LW-DENIM-003",
    description: "Woven on vintage Kurabo shuttle looms in Okayama, Japan. Features red selvedge ID line, copper hardware rivets, and a relaxed straight taper silhouette that fades uniquely to your lifestyle.",
    price: 195,
    originalPrice: 240,
    discountPercent: 19,
    category: "Denim",
    gender: "Men",
    fit: "Relaxed",
    material: "100% Kurabo Cotton Selvedge Denim",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Raw Indigo", hex: "#1b2a4a", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80" },
      { name: "Washed Slate", hex: "#4a5568", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: [
      { size: "28", stock: 3 },
      { size: "30", stock: 12 },
      { size: "32", stock: 15 },
      { size: "34", stock: 8 },
      { size: "36", stock: 2 }
    ],
    rating: 4.9,
    numReviews: 42,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: false,
    isFeatured: true,
    fabricAndCare: [
      "100% Japanese Selvedge Cotton",
      "Wear raw for first 6 months before wash",
      "Cold gentle wash inside out"
    ],
    modelFit: "Model is 6'1\" (185cm) with a 31\" waist, wearing size 32.",
    shippingPolicy: "Complimentary worldwide shipping."
  },
  {
    id: "prod-4",
    _id: "prod-4",
    title: "Oversized Cashmere & Wool Crewneck Knit",
    brand: "Luna Knitwear",
    sku: "LW-KNIT-004",
    description: "Spun from 7-gauge Scottish cashmere and extrafine merino wool. Designed with dropped shoulders, ribbed chunky trims, and an effortlessly relaxed silhouette.",
    price: 240,
    originalPrice: 280,
    discountPercent: 14,
    category: "Tops",
    gender: "Unisex",
    fit: "Oversized",
    material: "70% Merino Wool, 30% Cashmere",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Oatmeal Melange", hex: "#d8cca3", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80" },
      { name: "Charcoal Heather", hex: "#333333", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 10 },
      { size: "L", stock: 5 },
      { size: "XL", stock: 2 }
    ],
    rating: 4.7,
    numReviews: 16,
    isNewArrival: true,
    isBestSeller: false,
    isTrending: true,
    isFeatured: true,
    fabricAndCare: [
      "70% Extra Fine Merino, 30% Cashmere",
      "Hand wash cold with wool wash",
      "Dry flat on towel"
    ],
    modelFit: "Model is 5'11\" (180cm) wearing size M.",
    shippingPolicy: "Complimentary express delivery."
  },
  {
    id: "prod-5",
    _id: "prod-5",
    title: "Sculptural Italian Double-Breasted Blazer",
    brand: "Luna Atelier",
    sku: "LW-BLAZER-005",
    description: "Modern architectural tailoring with accentuated peak lapels and structured padded shoulders. Cut from breathable tropical-weight wool suitable for four-season wear.",
    price: 290,
    originalPrice: 350,
    discountPercent: 17,
    category: "Outerwear",
    gender: "Women",
    fit: "Tailored",
    material: "100% Super 120s Wool",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Cream Ivory", hex: "#f8f5ee", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80" },
      { name: "Caviar Black", hex: "#0f0f10", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: [
      { size: "XS", stock: 5 },
      { size: "S", stock: 9 },
      { size: "M", stock: 7 },
      { size: "L", stock: 2 }
    ],
    rating: 4.9,
    numReviews: 22,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    fabricAndCare: ["100% Super 120s Wool", "Dry clean only"],
    modelFit: "Model is 5'10\" wearing size S.",
    shippingPolicy: "Free express shipping."
  },
  {
    id: "prod-6",
    _id: "prod-6",
    title: "Relaxed Organic Linen Button-Down Shirt",
    brand: "Luna Studio",
    sku: "LW-SHIRT-006",
    description: "Pre-washed French flax linen delivering a soft, lived-in handfeel from the first wear. Mother-of-pearl buttons, curved hem, and relaxed camp collar.",
    price: 110,
    originalPrice: 135,
    discountPercent: 18,
    category: "Tops",
    gender: "Men",
    fit: "Relaxed",
    material: "100% French Flax Linen",
    images: [
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Natural Flax", hex: "#d5cbb2", image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80" },
      { name: "Sky Azure", hex: "#a4c2d1", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: [
      { size: "S", stock: 8 },
      { size: "M", stock: 14 },
      { size: "L", stock: 11 },
      { size: "XL", stock: 4 }
    ],
    rating: 4.8,
    numReviews: 31,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: false,
    isFeatured: false,
    fabricAndCare: ["100% Pure French Flax Linen", "Machine wash cold gentle", "Air dry"],
    modelFit: "Model is 6'2\" (188cm) wearing size L.",
    shippingPolicy: "Free shipping over $75."
  }
];
