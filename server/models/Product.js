import mongoose from 'mongoose';

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true },
  image: { type: String }
}, { _id: false });

const sizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  stock: { type: Number, required: true, default: 10 }
}, { _id: false });

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  brand: { type: String, default: 'Luna Wear' },
  sku: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discountPercent: { type: Number, default: 0 },
  category: { 
    type: String, 
    required: true,
    enum: ['Women', 'Men', 'Tops', 'Dresses', 'Outerwear', 'Denim', 'Activewear', 'Accessories']
  },
  gender: { type: String, enum: ['Women', 'Men', 'Unisex'], default: 'Unisex' },
  fit: { type: String, default: 'Relaxed' },
  material: { type: String, default: '100% Organic Cotton' },
  images: [{ type: String, required: true }],
  colors: [colorSchema],
  sizes: [sizeSchema],
  rating: { type: Number, default: 4.8 },
  numReviews: { type: Number, default: 12 },
  isNewArrival: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  fabricAndCare: [{ type: String }],
  modelFit: { type: String, default: 'Model is 5\'10" / 178cm wearing size M' },
  shippingPolicy: { type: String, default: 'Complimentary express delivery on orders over $75. 30-day effortless returns.' }
}, {
  timestamps: true
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
