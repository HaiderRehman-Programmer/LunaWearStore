import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getMongoStatus } from './config/db.js';
import { corsOptions } from './config/corsConfig.js';
import { initDbSeed } from './services/storeService.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/reviews', reviewRoutes);

// Health check & status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    appName: 'Luna Wear Store API',
    moduleType: 'ES Module',
    mongoConnected: getMongoStatus(),
    timestamp: new Date().toISOString()
  });
});

// Root welcome & API documentation index
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Luna Wear Store API 🌙',
    moduleType: 'ES Module (ECMAScript 2024)',
    endpoints: {
      auth: ['POST /api/auth/login', 'POST /api/auth/register', 'GET /api/auth/profile', 'PUT /api/auth/profile'],
      products: ['GET /api/products', 'GET /api/products/:id', 'POST /api/products', 'PUT /api/products/:id', 'DELETE /api/products/:id'],
      categories: ['GET /api/categories', 'POST /api/categories', 'PUT /api/categories/:id', 'DELETE /api/categories/:id'],
      cart: ['GET /api/cart', 'POST /api/cart/sync', 'POST /api/cart/coupon', 'DELETE /api/cart/clear'],
      orders: ['GET /api/orders', 'POST /api/orders', 'GET /api/orders/:id', 'PUT /api/orders/:id/status', 'GET /api/orders/user/:email'],
      payments: ['GET /api/payments/methods', 'POST /api/payments/process'],
      admin: ['GET /api/admin/analytics']
    }
  });
});

// Centralized error handling
app.use(errorHandler);

// Start server
const startServer = async () => {
  await connectDB();
  await initDbSeed();

  app.listen(PORT, () => {
    console.log(`✨ Luna Wear Store API (ES Module) running on http://localhost:${PORT}`);
  });
};

startServer();

export default app;
