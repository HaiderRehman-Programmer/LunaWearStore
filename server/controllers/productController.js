import Product from '../models/Product.js';
import Review from '../models/Review.js';
import { initialProducts, initialReviews } from '../data/seedData.js';
import { getMongoStatus } from '../config/db.js';
import { successResponse, errorResponse } from '../utils/formatResponse.js';

let memoryProducts = initialProducts.map(p => ({
  ...p,
  id: p.id || p._id,
  _id: p._id || p.id
}));
let memoryReviews = [...initialReviews];

export const getProducts = async (req, res) => {
  try {
    const { category, gender, sort, search, minPrice, maxPrice, fit, discount, inStock } = req.query;

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
        if (discount && discount !== 'All') {
          const minDisc = parseInt(discount, 10);
          if (!isNaN(minDisc)) query.discountPercent = { $gte: minDisc };
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
        return successResponse(res, products);
      } catch (err) {
        console.warn('Mongo product query failed, using memory store:', err.message);
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
    if (discount && discount !== 'All') {
      const minDisc = parseInt(discount, 10);
      if (!isNaN(minDisc)) result = result.filter(p => (p.discountPercent || 0) >= minDisc);
    }
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s) ||
        p.brand.toLowerCase().includes(s)
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
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return successResponse(res, result);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (getMongoStatus()) {
      try {
        const product = await Product.findById(id);
        if (product) return successResponse(res, product);
      } catch (e) {
        // Fall through to memory
      }
    }

    const product = memoryProducts.find(p => p._id === id || p.id === id);
    if (!product) {
      return errorResponse(res, 'Product not found', 404);
    }

    return successResponse(res, product);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    if (!productData.title || !productData.price || !productData.category) {
      return errorResponse(res, 'Title, price, and category are required', 400);
    }

    const sku = productData.sku || `LUNA-${Date.now().toString().slice(-6)}`;
    const newProduct = {
      ...productData,
      sku,
      _id: `prod-${Date.now()}`,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    if (getMongoStatus()) {
      try {
        const created = await Product.create({ ...productData, sku });
        memoryProducts.unshift(created);
        return successResponse(res, created, 'Product created successfully', 201);
      } catch (err) {
        console.warn('Mongo createProduct failed, saving to memory:', err.message);
      }
    }

    memoryProducts.unshift(newProduct);
    return successResponse(res, newProduct, 'Product created successfully', 201);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (getMongoStatus()) {
      try {
        const updated = await Product.findByIdAndUpdate(id, updates, { new: true });
        if (updated) {
          const idx = memoryProducts.findIndex(p => p._id === id || p.id === id);
          if (idx !== -1) memoryProducts[idx] = updated;
          return successResponse(res, updated, 'Product updated successfully');
        }
      } catch (e) {
        // Fall through
      }
    }

    const idx = memoryProducts.findIndex(p => p._id === id || p.id === id);
    if (idx === -1) {
      return errorResponse(res, 'Product not found', 404);
    }

    memoryProducts[idx] = { ...memoryProducts[idx], ...updates, updatedAt: new Date().toISOString() };
    return successResponse(res, memoryProducts[idx], 'Product updated successfully');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (getMongoStatus()) {
      try {
        await Product.findByIdAndDelete(id);
      } catch (e) {
        // Fall through
      }
    }

    const initialLen = memoryProducts.length;
    memoryProducts = memoryProducts.filter(p => p._id !== id && p.id !== id);

    if (memoryProducts.length === initialLen) {
      return errorResponse(res, 'Product not found', 404);
    }

    return successResponse(res, { id }, 'Product deleted successfully');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const { id } = req.params;
    if (getMongoStatus()) {
      try {
        const reviews = await Review.find({ productId: id }).sort({ createdAt: -1 });
        return successResponse(res, reviews);
      } catch (e) {
        // Fall through
      }
    }
    const reviews = memoryReviews.filter(r => r.productId === id);
    return successResponse(res, reviews);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const addProductReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, rating, title, comment, fitFeedback } = req.body;

    if (!author || !rating || !title || !comment) {
      return errorResponse(res, 'All review fields are required', 400);
    }

    const newReview = {
      _id: `rev-${Date.now()}`,
      id: `rev-${Date.now()}`,
      productId: id,
      author,
      rating: Number(rating),
      title,
      comment,
      fitFeedback: fitFeedback || 'True to Size',
      verifiedBuyer: true,
      helpfulVotes: 0,
      createdAt: new Date().toISOString()
    };

    if (getMongoStatus()) {
      try {
        const created = await Review.create(newReview);
        memoryReviews.unshift(created);
        return successResponse(res, created, 'Review added successfully', 201);
      } catch (e) {
        // Fall through
      }
    }

    memoryReviews.unshift(newReview);
    return successResponse(res, newReview, 'Review added successfully', 201);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};
