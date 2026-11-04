import express from 'express';
import { validateCoupon } from '../services/storeService.js';

const router = express.Router();

router.post('/validate', (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: 'Promo code is required' });
  }

  const coupon = validateCoupon(code);
  if (!coupon) {
    return res.status(404).json({ 
      success: false, 
      message: 'Invalid promo code. Try "LUNA20" for 20% off or "WELCOME10" for 10% off.' 
    });
  }

  res.json({ success: true, coupon });
});

export default router;
