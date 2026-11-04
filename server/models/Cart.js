import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  size: { type: String, required: true },
  color: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1, default: 1 }
}, { _id: false });

const cartSchema = new mongoose.Schema({
  userId: { type: String, sparse: true },
  sessionId: { type: String, sparse: true },
  items: [cartItemSchema],
  appliedCoupon: {
    code: { type: String },
    discountPercent: { type: Number, default: 0 },
    discountAmount: { type: Number, default: 0 }
  },
  lastActive: { type: Date, default: Date.now }
}, {
  timestamps: true
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
export default Cart;
