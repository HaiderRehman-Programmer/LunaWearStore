import express from 'express';
import {
  getCart,
  updateCart,
  applyCoupon,
  clearCart
} from '../controllers/cartController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', optionalAuth, getCart);
router.post('/sync', optionalAuth, updateCart);
router.post('/coupon', applyCoupon);
router.delete('/clear', optionalAuth, clearCart);

export default router;
