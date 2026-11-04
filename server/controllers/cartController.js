import Cart from '../models/Cart.js';
import { validCoupons } from '../data/seedData.js';
import { getMongoStatus } from '../config/db.js';
import { successResponse, errorResponse } from '../utils/formatResponse.js';

const memoryCarts = new Map();

export const getCart = async (req, res) => {
  try {
    const key = req.user?.id || req.query.sessionId || 'guest-session';

    if (getMongoStatus() && req.user?.id) {
      try {
        let cart = await Cart.findOne({ userId: req.user.id });
        if (cart) return successResponse(res, cart);
      } catch (e) {
        // Fall through
      }
    }

    const cart = memoryCarts.get(key) || {
      items: [],
      appliedCoupon: null,
      subtotal: 0
    };

    return successResponse(res, cart);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const updateCart = async (req, res) => {
  try {
    const key = req.user?.id || req.body.sessionId || 'guest-session';
    const { items, appliedCoupon } = req.body;

    const cartData = {
      userId: req.user?.id,
      sessionId: req.body.sessionId,
      items: items || [],
      appliedCoupon: appliedCoupon || null,
      lastActive: new Date()
    };

    if (getMongoStatus() && req.user?.id) {
      try {
        const updated = await Cart.findOneAndUpdate(
          { userId: req.user.id },
          cartData,
          { upsert: true, new: true }
        );
        memoryCarts.set(key, updated);
        return successResponse(res, updated, 'Cart updated');
      } catch (e) {
        // Fall through
      }
    }

    memoryCarts.set(key, cartData);
    return successResponse(res, cartData, 'Cart synchronized');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const applyCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return errorResponse(res, 'Coupon code is required', 400);

    const match = validCoupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!match) {
      return errorResponse(res, 'Invalid coupon code. Try LUNA20 or WELCOME10', 400);
    }

    return successResponse(res, match, `Coupon "${match.code}" applied: ${match.discountPercent}% off!`);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const clearCart = async (req, res) => {
  try {
    const key = req.user?.id || req.query.sessionId || 'guest-session';
    memoryCarts.delete(key);
    return successResponse(res, { items: [] }, 'Cart cleared');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};
