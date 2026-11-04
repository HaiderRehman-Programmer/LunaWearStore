export const initialProducts = [
  {
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
      { size: "XL", stock: 1 }
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
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Emerald Glaze", hex: "#0b5345", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80" },
      { name: "Champagne Pearl", hex: "#f5e6d3", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80" },
      { name: "Midnight Navy", hex: "#151e29", image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: [
      { size: "XS", stock: 6 },
      { size: "S", stock: 9 },
      { size: "M", stock: 7 },
      { size: "L", stock: 2 }
    ],
    rating: 4.8,
    numReviews: 42,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    fabricAndCare: [
      "100% Premium Mulberry Silk",
      "Hand wash cold with silk detergent",
      "Lay flat to dry away from direct sunlight",
      "Steam on low temperature"
    ],
    modelFit: "Model is 5'9\" (175cm) wearing a size XS.",
    shippingPolicy: "Complimentary gift boxing and delivery over $75."
  },
  {
    _id: "prod-3",
    title: "Structured Oversized Denim Chore Jacket",
    brand: "Luna Denim",
    sku: "LW-DENIM-003",
    description: "Constructed from 13.5oz vintage Japanese selvedge denim. Boxy workwear silhouette with contrast topstitching, dual chest utility pockets, and custom antique bronze hardware.",
    price: 145,
    originalPrice: 195,
    discountPercent: 25,
    category: "Denim",
    gender: "Unisex",
    fit: "Oversized",
    material: "100% Selvedge Cotton",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Vintage Indigo", hex: "#2b4162", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80" },
      { name: "Washed Sand", hex: "#d8cbb8", image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: [
      { size: "S", stock: 10 },
      { size: "M", stock: 15 },
      { size: "L", stock: 8 },
      { size: "XL", stock: 4 }
    ],
    rating: 4.7,
    numReviews: 19,
    isNewArrival: true,
    isBestSeller: false,
    isTrending: true,
    isFeatured: true,
    fabricAndCare: [
      "100% Cotton Raw Selvedge",
      "Machine wash cold inside out with like colors",
      "Hang dry only to preserve shape and patina"
    ],
    modelFit: "Male model is 6'1\" (185cm) wearing a size L.",
    shippingPolicy: "Standard shipping in 3-5 days or Express next day."
  },
  {
    _id: "prod-4",
    title: "Heavyweight 450GSM French Terry Hoodie",
    brand: "Luna Basics",
    sku: "LW-TOP-004",
    description: "The ultimate luxury everyday staple. Custom knit loopback French terry with double-lined hood, dropped shoulders, hidden seam kangaroo pocket, and rib-knit cuffs.",
    price: 95,
    originalPrice: 120,
    discountPercent: 20,
    category: "Tops",
    gender: "Unisex",
    fit: "Relaxed",
    material: "100% Organic Loopback Cotton",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Heather Slate", hex: "#708090", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80" },
      { name: "Oatmeal Melange", hex: "#d7cec7", image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80" },
      { name: "Washed Black", hex: "#222222", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: [
      { size: "XS", stock: 12 },
      { size: "S", stock: 20 },
      { size: "M", stock: 18 },
      { size: "L", stock: 14 },
      { size: "XL", stock: 8 },
      { size: "XXL", stock: 3 }
    ],
    rating: 4.9,
    numReviews: 64,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    fabricAndCare: [
      "100% Pre-shrunk Organic Cotton",
      "Machine wash 30°C delicate cycle",
      "Tumble dry low or line dry"
    ],
    modelFit: "Model is 6'0\" (183cm) wearing size M.",
    shippingPolicy: "Complimentary returns within 30 days."
  },
  {
    _id: "prod-5",
    title: "Tailored Pleated Wide-Leg Trousers",
    brand: "Luna Atelier",
    sku: "LW-PANT-005",
    description: "Architectural drape meets modern tailoring. Front double pleats, high-rise contoured waistband, discreet slash pockets, and wide flowing hem with extended break.",
    price: 160,
    originalPrice: 200,
    discountPercent: 20,
    category: "Women",
    gender: "Women",
    fit: "Tailored",
    material: "70% Polyester, 26% Rayon, 4% Elastane",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Warm Taupe", hex: "#b38b6d", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80" },
      { name: "Pinstripe Charcoal", hex: "#36454f", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: [
      { size: "XS", stock: 3 },
      { size: "S", stock: 7 },
      { size: "M", stock: 10 },
      { size: "L", stock: 5 }
    ],
    rating: 4.8,
    numReviews: 31,
    isNewArrival: true,
    isBestSeller: true,
    isTrending: false,
    isFeatured: true,
    fabricAndCare: [
      "Wrinkle-resistant luxury stretch blend",
      "Dry clean or cold gentle wash",
      "Hang immediately"
    ],
    modelFit: "Model is 5'8\" (173cm) wearing a size S.",
    shippingPolicy: "Express shipping available worldwide."
  },
  {
    _id: "prod-6",
    title: "Italian Merino Ribbed Mock-Neck Sweater",
    brand: "Luna Knitwear",
    sku: "LW-KNIT-006",
    description: "Ultra-fine extra spun Merino wool from Biella, Italy. Soft against skin with zero itch, ribbed body and snug mock neckline that holds its architecture.",
    price: 135,
    originalPrice: 170,
    discountPercent: 20,
    category: "Men",
    gender: "Men",
    fit: "Regular",
    material: "100% Extra-fine Merino Wool",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Sage Mist", hex: "#9caf88", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1000&q=80" },
      { name: "Espresso", hex: "#3d2b1f", image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: [
      { size: "S", stock: 6 },
      { size: "M", stock: 11 },
      { size: "L", stock: 8 },
      { size: "XL", stock: 4 }
    ],
    rating: 4.9,
    numReviews: 24,
    isNewArrival: true,
    isBestSeller: false,
    isTrending: true,
    isFeatured: false,
    fabricAndCare: [
      "100% Extra-fine Italian Merino Wool",
      "Hand wash cold with wool wash",
      "Dry flat, reshape while wet"
    ],
    modelFit: "Model is 6'2\" (188cm) wearing size L.",
    shippingPolicy: "Complimentary luxury box packaging included."
  },
  {
    _id: "prod-7",
    title: "Sculpt Seamless Ribbed Active Jumpsuit",
    brand: "Luna Motion",
    sku: "LW-ACT-007",
    description: "Engineered 4-way compression micro-rib fabric that supports and sculpts without restriction. Built-in shelf bra, square neckline, and breathable moisture-wicking weave.",
    price: 110,
    originalPrice: 130,
    discountPercent: 15,
    category: "Activewear",
    gender: "Women",
    fit: "Slim",
    material: "78% Recycled Polyamide, 22% Elastane",
    images: [
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Espresso", hex: "#3b2f2f", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80" },
      { name: "Clay Pink", hex: "#c39b9b", image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: [
      { size: "XS", stock: 5 },
      { size: "S", stock: 12 },
      { size: "M", stock: 9 },
      { size: "L", stock: 3 }
    ],
    rating: 4.7,
    numReviews: 18,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: false,
    isFeatured: false,
    fabricAndCare: [
      "Anti-bacterial quick dry yarn",
      "Machine wash cold gentle",
      "Never bleach or iron"
    ],
    modelFit: "Model is 5'7\" (170cm) wearing size S.",
    shippingPolicy: "Easy 30-day returns."
  },
  {
    _id: "prod-8",
    title: "Handmade Nappa Leather Minimalist Weekender Bag",
    brand: "Luna Leathercraft",
    sku: "LW-ACC-008",
    description: "Buttery soft full-grain Italian calfskin leather with brushed gold hardware, reinforced base studs, removable padded shoulder strap, and padded laptop sleeve.",
    price: 290,
    originalPrice: 380,
    discountPercent: 23,
    category: "Accessories",
    gender: "Unisex",
    fit: "Regular",
    material: "100% Full Grain Italian Calfskin",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80"
    ],
    colors: [
      { name: "Cognac Tan", hex: "#9a4925", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80" },
      { name: "Midnight Black", hex: "#111111", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80" }
    ],
    sizes: [
      { size: "One Size", stock: 8 }
    ],
    rating: 5.0,
    numReviews: 15,
    isNewArrival: false,
    isBestSeller: true,
    isTrending: true,
    isFeatured: true,
    fabricAndCare: [
      "Genuine vegetable-tanned Italian leather",
      "Treated with natural beeswax finish",
      "Store in provided dust bag"
    ],
    modelFit: "Dimensions: 50cm x 30cm x 22cm. Weight: 1.4kg.",
    shippingPolicy: "Complimentary worldwide express shipping & insurance."
  }
];

export const initialReviews = [
  {
    _id: "rev-1",
    productId: "prod-1",
    author: "Elena Rostova",
    rating: 5,
    title: "Unbelievable quality and drape!",
    comment: "This coat is truly rivaling high-end Milan fashion houses. The weight of the virgin wool feels like pure luxury, and the tailoring sits impeccably across the shoulders.",
    fitFeedback: "True to Size",
    verifiedBuyer: true,
    helpfulVotes: 14,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    _id: "rev-2",
    productId: "prod-1",
    author: "Sophie Laurent",
    rating: 5,
    title: "My staple winter investment",
    comment: "The camel tone is rich and warm. The lapels stay crisp even in windy conditions. Received endless compliments on the tube in London.",
    fitFeedback: "True to Size",
    verifiedBuyer: true,
    helpfulVotes: 9,
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
  },
  {
    _id: "rev-3",
    productId: "prod-2",
    author: "Camille Dubois",
    rating: 5,
    title: "The silk feels like liquid water",
    comment: "Substantial 22-momme weight means it is not see-through at all! Bias cut hugs gently without clinging. Wore it to a wedding reception and felt divine.",
    fitFeedback: "True to Size",
    verifiedBuyer: true,
    helpfulVotes: 17,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
  },
  {
    _id: "rev-4",
    productId: "prod-4",
    author: "Marcus Chen",
    rating: 5,
    title: "Heavy, substantial, perfect boxy fit",
    comment: "Finding a 450GSM hoodie at this price point is impossible elsewhere. The hood stands up on its own, zero floppy fabric. Absolute 10/10.",
    fitFeedback: "True to Size",
    verifiedBuyer: true,
    helpfulVotes: 23,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
  }
];

export const initialOrders = [
  {
    _id: "ord-1",
    orderNumber: "LW-89241",
    customer: {
      fullName: "Haider Rehman",
      email: "haider@lunawear.com",
      phone: "+1 (555) 234-5678"
    },
    shippingAddress: {
      address: "742 Evergreen Terrace, Suite 4B",
      city: "San Francisco",
      state: "CA",
      postalCode: "94107",
      country: "United States"
    },
    deliveryMethod: {
      id: "express",
      name: "Express Carbon-Neutral Courier",
      price: 15,
      estimatedDays: "1-2 Business Days"
    },
    paymentMethod: "credit_card",
    orderItems: [
      {
        productId: "prod-1",
        title: "Atelier Double-Breasted Wool Trench Coat",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80",
        price: 320,
        size: "M",
        color: "Camel",
        quantity: 1
      },
      {
        productId: "prod-4",
        title: "Heavyweight 450GSM French Terry Hoodie",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80",
        price: 95,
        size: "L",
        color: "Washed Black",
        quantity: 1
      }
    ],
    subtotal: 415,
    discountAmount: 83,
    couponCode: "LUNA20",
    shippingPrice: 15,
    tax: 27.39,
    totalPrice: 374.39,
    status: "Processing",
    trackingNumber: "LW-FEDEX-9988221",
    isPaid: true,
    paidAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    _id: "ord-2",
    orderNumber: "LW-89104",
    customer: {
      fullName: "Claire Montgomery",
      email: "claire.m@example.com",
      phone: "+1 (555) 789-0123"
    },
    shippingAddress: {
      address: "128 Mercer St, Penthouse",
      city: "New York",
      state: "NY",
      postalCode: "10012",
      country: "United States"
    },
    deliveryMethod: {
      id: "standard",
      name: "Standard Tracked Delivery",
      price: 0,
      estimatedDays: "3-5 Business Days"
    },
    paymentMethod: "apple_pay",
    orderItems: [
      {
        productId: "prod-2",
        title: "Minimalist Mulberry Silk Slip Dress",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
        price: 185,
        size: "S",
        color: "Emerald Glaze",
        quantity: 1
      }
    ],
    subtotal: 185,
    discountAmount: 0,
    couponCode: "",
    shippingPrice: 0,
    tax: 15.26,
    totalPrice: 200.26,
    status: "Shipped",
    trackingNumber: "LW-DHL-4433221",
    isPaid: true,
    paidAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  }
];

export const validCoupons = [
  { code: "LUNA20", discountPercent: 20, description: "20% Off All Collections" },
  { code: "WELCOME10", discountPercent: 10, description: "10% First Order Welcome Gift" },
  { code: "FREESHIP", freeShipping: true, description: "Complimentary Worldwide Shipping" }
];
