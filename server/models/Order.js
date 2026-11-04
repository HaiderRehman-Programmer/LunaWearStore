import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  customer: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String }
  },
  shippingAddress: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true, default: 'United States' }
  },
  deliveryMethod: {
    id: { type: String, default: 'standard' },
    name: { type: String, default: 'Standard Tracked Shipping' },
    price: { type: Number, default: 0 },
    estimatedDays: { type: String, default: '3-5 Business Days' }
  },
  paymentMethod: { 
    type: String, 
    required: true,
    enum: ['credit_card', 'cash_on_delivery', 'klarna', 'apple_pay', 'paypal'],
    default: 'credit_card'
  },
  orderItems: [orderItemSchema],
  subtotal: { type: Number, required: true },
  discountAmount: { type: Number, default: 0 },
  couponCode: { type: String, default: '' },
  shippingPrice: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processing'
  },
  trackingNumber: { type: String },
  isPaid: { type: Boolean, default: true },
  paidAt: { type: Date, default: Date.now },
  deliveredAt: { type: Date }
}, {
  timestamps: true
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
