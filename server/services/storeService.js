import Product from '../models/Product.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';
import { initialProducts, initialOrders, initialReviews, validCoupons } from '../data/seedData.js';
import { getMongoStatus } from '../config/db.js';

// In-memory runtime cache for fallback or instantaneous response
let memoryProducts = initialProducts.map(p => ({
  ...p,
  id: p.id || p._id,
  _id: p._id || p.id
}));
let memoryOrders = [...initialOrders];
let memoryReviews = [...initialReviews];
let memoryCoupons = [...validCoupons];

export const initDbSeed = async () => {
  if (getMongoStatus()) {
    try {
      const count = await Product.countDocuments();
      if (count === 0) {
        console.log('🌱 Seeding initial products into MongoDB...');
        await Product.insertMany(initialProducts.map(p => {
          const { _id, ...rest } = p;
          return rest;
        }));
        await Order.insertMany(initialOrders.map(o => {
          const { _id, ...rest } = o;
          return rest;
        }));
        await Review.insertMany(initialReviews.map(r => {
          const { _id, ...rest } = r;
          return rest;
        }));
        console.log('✅ MongoDB Seed completed successfully.');
      }
    } catch (err) {
      console.warn('Seed error (fallback in-memory active):', err.message);
    }
  }
};

// PRODUCT SERVICES
export const getProducts = async (filters = {}) => {
  const { category, gender, sort, search, minPrice, maxPrice, fit, inStock } = filters;

  if (getMongoStatus()) {
    try {
      let query = {};
      if (category && category !== 'All') {
        const catLower = category.toLowerCase();
        if (catLower === 'new arrivals') {
          query.isNewArrival = true;
        } else if (catLower === 'sale' || catLower === 'clearance' || catLower === 'sale / clearance' || catLower === 'sale & clearance') {
          query.$or = [
            { discountPercent: { $gt: 0 } },
            { originalPrice: { $exists: true, $ne: null } }
          ];
        } else if (category === 'Women' || category === 'Men') {
          query.gender = { $in: [category, 'Unisex'] };
        } else {
          query.category = { $regex: new RegExp(`^${category}$`, 'i') };
        }
      }
      if (gender && gender !== 'All') {
        query.gender = { $in: [gender, 'Unisex'] };
      }
      if (fit && fit !== 'All') {
        query.fit = fit;
      }
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { brand: { $regex: search, $options: 'i' } }
        ];
      }

      let sortOption = { createdAt: -1 };
      if (sort === 'price-low') sortOption = { price: 1 };
      else if (sort === 'price-high') sortOption = { price: -1 };
      else if (sort === 'rating') sortOption = { rating: -1 };
      else if (sort === 'bestseller') sortOption = { isBestSeller: -1, rating: -1 };

      const products = await Product.find(query).sort(sortOption);
      return products;
    } catch (e) {
      console.warn('MongoDB query failed, falling back to memory store:', e.message);
    }
  }

  // Memory fallback
  let result = [...memoryProducts];

  if (category && category !== 'All') {
    const catLower = category.toLowerCase();
    if (catLower === 'new arrivals') {
      result = result.filter(p => p.isNewArrival === true);
    } else if (catLower === 'sale' || catLower === 'clearance' || catLower === 'sale / clearance' || catLower === 'sale & clearance') {
      result = result.filter(p => (p.discountPercent > 0 || (p.originalPrice && p.originalPrice > p.price)));
    } else if (category === 'Women' || category === 'Men') {
      result = result.filter(p => p.gender === category || p.gender === 'Unisex');
    } else {
      result = result.filter(p => p.category?.toLowerCase() === catLower);
    }
  }
  if (gender && gender !== 'All') {
    result = result.filter(p => p.gender === gender || p.gender === 'Unisex');
  }
  if (fit && fit !== 'All') {
    result = result.filter(p => p.fit === fit);
  }
  if (minPrice) {
    result = result.filter(p => p.price >= Number(minPrice));
  }
  if (maxPrice) {
    result = result.filter(p => p.price <= Number(maxPrice));
  }
  if (search) {
    const s = search.toLowerCase();
    result = result.filter(p => 
      p.title.toLowerCase().includes(s) || 
      p.description.toLowerCase().includes(s) ||
      p.brand.toLowerCase().includes(s) ||
      p.category.toLowerCase().includes(s)
    );
  }

  if (sort === 'price-low') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-high') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'bestseller') {
    result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
  } else {
    // Newest / Default
    result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
  }

  return result;
};

export const getProductById = async (id) => {
  if (getMongoStatus()) {
    try {
      const p = await Product.findById(id);
      if (p) return p;
    } catch (e) {}
  }
  return memoryProducts.find(p => p._id === id || p.sku === id);
};

export const createProduct = async (productData) => {
  if (getMongoStatus()) {
    try {
      const newProd = await Product.create(productData);
      memoryProducts.unshift(newProd.toObject());
      return newProd;
    } catch (e) {}
  }

  const newProd = {
    _id: `prod-${Date.now()}`,
    sku: `LW-SKU-${Math.floor(100 + Math.random() * 900)}`,
    rating: 5.0,
    numReviews: 0,
    createdAt: new Date(),
    ...productData
  };
  memoryProducts.unshift(newProd);
  return newProd;
};

export const updateProduct = async (id, updateData) => {
  if (getMongoStatus()) {
    try {
      const updated = await Product.findByIdAndUpdate(id, updateData, { new: true });
      if (updated) return updated;
    } catch (e) {}
  }

  const idx = memoryProducts.findIndex(p => p._id === id);
  if (idx !== -1) {
    memoryProducts[idx] = { ...memoryProducts[idx], ...updateData, updatedAt: new Date() };
    return memoryProducts[idx];
  }
  return null;
};

export const deleteProduct = async (id) => {
  if (getMongoStatus()) {
    try {
      await Product.findByIdAndDelete(id);
    } catch (e) {}
  }
  const idx = memoryProducts.findIndex(p => p._id === id);
  if (idx !== -1) {
    memoryProducts.splice(idx, 1);
    return true;
  }
  return false;
};

// ORDER SERVICES
export const getOrders = async () => {
  if (getMongoStatus()) {
    try {
      return await Order.find().sort({ createdAt: -1 });
    } catch (e) {}
  }
  return [...memoryOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getOrderByIdOrNumber = async (identifier) => {
  if (getMongoStatus()) {
    try {
      const ord = await Order.findOne({
        $or: [{ _id: identifier }, { orderNumber: identifier }]
      });
      if (ord) return ord;
    } catch (e) {}
  }
  return memoryOrders.find(o => o._id === identifier || o.orderNumber === identifier);
};

export const createOrder = async (orderData) => {
  const orderNumber = `LW-${Math.floor(10000 + Math.random() * 90000)}`;
  const trackingNumber = `LW-${(orderData.deliveryMethod?.name || 'EXP').slice(0, 3).toUpperCase()}-${Math.floor(1000000 + Math.random() * 9000000)}`;

  const finalOrder = {
    _id: `ord-${Date.now()}`,
    orderNumber,
    trackingNumber,
    status: 'Processing',
    isPaid: true,
    paidAt: new Date(),
    createdAt: new Date(),
    ...orderData
  };

  if (getMongoStatus()) {
    try {
      const created = await Order.create(finalOrder);
      memoryOrders.unshift(created.toObject());
      return created;
    } catch (e) {}
  }

  memoryOrders.unshift(finalOrder);
  return finalOrder;
};

export const updateOrderStatus = async (id, status, trackingNumber) => {
  if (getMongoStatus()) {
    try {
      const updates = {};
      if (status) updates.status = status;
      if (trackingNumber) updates.trackingNumber = trackingNumber;
      if (status === 'Delivered') updates.deliveredAt = new Date();

      const updated = await Order.findOneAndUpdate(
        { $or: [{ _id: id }, { orderNumber: id }] },
        updates,
        { new: true }
      );
      if (updated) return updated;
    } catch (e) {}
  }

  const idx = memoryOrders.findIndex(o => o._id === id || o.orderNumber === id);
  if (idx !== -1) {
    if (status) memoryOrders[idx].status = status;
    if (trackingNumber) memoryOrders[idx].trackingNumber = trackingNumber;
    if (status === 'Delivered') memoryOrders[idx].deliveredAt = new Date();
    return memoryOrders[idx];
  }
  return null;
};

// REVIEW SERVICES
export const getReviewsByProduct = async (productId) => {
  if (getMongoStatus()) {
    try {
      return await Review.find({ productId }).sort({ createdAt: -1 });
    } catch (e) {}
  }
  return memoryReviews.filter(r => r.productId === productId);
};

export const addReview = async (reviewData) => {
  const newRev = {
    _id: `rev-${Date.now()}`,
    createdAt: new Date(),
    helpfulVotes: 0,
    verifiedBuyer: true,
    ...reviewData
  };

  if (getMongoStatus()) {
    try {
      await Review.create(newRev);
    } catch (e) {}
  }

  memoryReviews.unshift(newRev);

  // Update product rating
  const prodReviews = memoryReviews.filter(r => r.productId === reviewData.productId);
  const avgRating = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
  await updateProduct(reviewData.productId, {
    rating: parseFloat(avgRating.toFixed(1)),
    numReviews: prodReviews.length
  });

  return newRev;
};

// COUPON SERVICES
export const validateCoupon = (code) => {
  if (!code) return null;
  const cleanCode = code.trim().toUpperCase();
  const found = memoryCoupons.find(c => c.code === cleanCode);
  return found || null;
};

// ADMIN ANALYTICS
export const getAdminAnalytics = async () => {
  const orders = await getOrders();
  const products = await getProducts();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;
  
  // Categorical sales count
  const categoryCounts = {};
  orders.forEach(o => {
    (o.orderItems || []).forEach(item => {
      const prod = products.find(p => p._id === item.productId || p.title === item.title);
      const cat = prod?.category || 'Apparel';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + item.quantity;
    });
  });

  const lowStockProducts = products.filter(p => 
    (p.sizes || []).some(s => s.stock <= 3)
  );

  return {
    totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    totalOrders,
    avgOrderValue: parseFloat(avgOrderValue),
    conversionRate: 3.42, // industry benchmark for luxury streetwear
    categoryDistribution: categoryCounts,
    recentOrders: orders.slice(0, 5),
    lowStockCount: lowStockProducts.length,
    totalProducts: products.length
  };
};
