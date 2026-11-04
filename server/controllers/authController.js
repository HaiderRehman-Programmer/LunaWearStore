import User from '../models/User.js';
import { generateJWT } from '../utils/generateJWT.js';
import { successResponse, errorResponse } from '../utils/formatResponse.js';
import { getMongoStatus } from '../config/db.js';

// In-memory demo users fallback
const demoUsers = [
  {
    id: 'usr-1',
    _id: 'usr-1',
    name: 'Haider Rehman',
    email: 'haider@lunawear.com',
    password: 'password123',
    isAdmin: true,
    phone: '+1 (555) 234-5678',
    addresses: [
      {
        id: 'addr-1',
        isDefault: true,
        label: 'Primary Residence',
        fullName: 'Haider Rehman',
        street: '742 Evergreen Terrace, Suite 4B',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94107',
        country: 'United States'
      }
    ],
    wishlist: ['prod-1', 'prod-3']
  }
];

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorResponse(res, 'Email and password are required', 400);
    }

    if (getMongoStatus()) {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user && user.password === password) {
        const token = generateJWT({ id: user._id, email: user.email, isAdmin: user.isAdmin });
        return successResponse(res, {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            addresses: user.addresses,
            wishlist: user.wishlist
          },
          token
        }, 'Login successful');
      }
    }

    // Fallback to memory
    const user = demoUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) {
      return errorResponse(res, 'Invalid email or password. Demo account: haider@lunawear.com / password123', 401);
    }

    const { password: _, ...userData } = user;
    const token = `luna-jwt-token-${user.id}`;
    return successResponse(res, { user: userData, token }, 'Login successful');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return errorResponse(res, 'Please provide name, email, and password', 400);
    }

    if (getMongoStatus()) {
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        return errorResponse(res, 'An account with this email already exists', 400);
      }
      const newUser = await User.create({
        name,
        email: email.toLowerCase(),
        password,
        isAdmin: false,
        addresses: [],
        wishlist: []
      });
      const token = generateJWT({ id: newUser._id, email: newUser.email, isAdmin: false });
      return successResponse(res, {
        user: { id: newUser._id, name: newUser.name, email: newUser.email, isAdmin: false, addresses: [], wishlist: [] },
        token
      }, 'Registration successful', 201);
    }

    // Memory fallback
    const existing = demoUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return errorResponse(res, 'An account with this email already exists', 400);
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      _id: `usr-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      password,
      isAdmin: false,
      phone: '',
      addresses: [],
      wishlist: []
    };
    demoUsers.push(newUser);

    const { password: _, ...userData } = newUser;
    return successResponse(res, {
      user: userData,
      token: `luna-jwt-token-${newUser.id}`
    }, 'Account created successfully', 201);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (getMongoStatus()) {
      const user = await User.findById(userId).select('-password');
      if (user) return successResponse(res, user);
    }

    const user = demoUsers.find(u => u.id === userId || u._id === userId);
    if (!user) return errorResponse(res, 'User not found', 404);

    const { password: _, ...userData } = user;
    return successResponse(res, userData);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { id, name, phone, addresses, wishlist } = req.body;
    const userId = id || req.user?.id;

    if (getMongoStatus()) {
      const user = await User.findById(userId);
      if (user) {
        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (addresses) user.addresses = addresses;
        if (wishlist) user.wishlist = wishlist;
        await user.save();
        return successResponse(res, user, 'Profile updated successfully');
      }
    }

    const user = demoUsers.find(u => u.id === userId || u._id === userId);
    if (!user) return errorResponse(res, 'User not found', 404);

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (addresses) user.addresses = addresses;
    if (wishlist) user.wishlist = wishlist;

    const { password: _, ...userData } = user;
    return successResponse(res, userData, 'Profile updated successfully');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};
