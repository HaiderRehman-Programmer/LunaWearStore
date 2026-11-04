import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/Product.js';
import Order from './models/Order.js';
import Review from './models/Review.js';
import { initialProducts, initialOrders, initialReviews } from './data/seedData.js';

dotenv.config();

const seed = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/luna_wear';
  console.log(`Connecting to MongoDB at ${uri}...`);
  try {
    await mongoose.connect(uri);
    console.log('Connected! Purging existing documents...');
    await Product.deleteMany();
    await Order.deleteMany();
    await Review.deleteMany();

    console.log('Inserting seed items...');
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

    console.log('🎉 Database successfully seeded with Luna Wear catalog!');
    process.exit(0);
  } catch (error) {
    console.error('Seeder failed:', error);
    process.exit(1);
  }
};

seed();
