import express from 'express';
import { getPaymentMethods, processPayment } from '../controllers/paymentController.js';

const router = express.Router();

router.get('/methods', getPaymentMethods);
router.post('/process', processPayment);

export default router;
