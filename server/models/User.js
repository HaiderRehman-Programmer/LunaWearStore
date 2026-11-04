import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  addresses: [{
    isDefault: { type: Boolean, default: false },
    label: { type: String, default: 'Home' },
    fullName: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    country: { type: String, default: 'United States' }
  }],
  wishlist: [{ type: String }]
}, {
  timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
