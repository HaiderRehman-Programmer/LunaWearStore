import express from 'express';
import { getAdminAnalytics } from '../services/storeService.js';

const router = express.Router();

router.get('/analytics', async (req, res) => {
  try {
    const stats = await getAdminAnalytics();
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
