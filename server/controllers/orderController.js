import Order from '../models/Order.js';
import { initialOrders } from '../data/seedData.js';
import { getMongoStatus } from '../config/db.js';
import { successResponse, errorResponse } from '../utils/formatResponse.js';
import { sendOrderConfirmationEmail } from '../utils/sendEmail.js';

let memoryOrders = [...initialOrders];

export const createOrder = async (req, res) => {
  try {
    const {
      customer,
      shippingAddress,
      deliveryMethod,
      paymentMethod,
      orderItems,
      subtotal,
      discountAmount,
      couponCode,
      shippingPrice,
      tax,
      totalPrice
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return errorResponse(res, 'Order must contain at least one item', 400);
    }

    if (!customer?.email || !shippingAddress?.address) {
      return errorResponse(res, 'Customer details and shipping address are required', 400);
    }

    const orderNumber = `LUNA-${Date.now().toString().slice(-6)}`;
    const trackingNumber = `TRK-LUNA-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newOrderData = {
      orderNumber,
      customer,
      shippingAddress,
      deliveryMethod: deliveryMethod || { id: 'standard', name: 'Standard Tracked Shipping', price: 0 },
      paymentMethod: paymentMethod || 'credit_card',
      orderItems,
      subtotal: Number(subtotal),
      discountAmount: Number(discountAmount || 0),
      couponCode: couponCode || '',
      shippingPrice: Number(shippingPrice || 0),
      tax: Number(tax || 0),
      totalPrice: Number(totalPrice),
      status: 'Processing',
      trackingNumber,
      isPaid: paymentMethod !== 'cash_on_delivery',
      paidAt: paymentMethod !== 'cash_on_delivery' ? new Date() : null,
      createdAt: new Date().toISOString()
    };

    if (getMongoStatus()) {
      try {
        const created = await Order.create(newOrderData);
        memoryOrders.unshift(created);
        sendOrderConfirmationEmail(created).catch(() => {});
        return successResponse(res, created, 'Order placed successfully', 201);
      } catch (err) {
        console.warn('Mongo createOrder failed, fallback to memory:', err.message);
      }
    }

    const memoryOrder = { ...newOrderData, _id: `ord-${Date.now()}`, id: `ord-${Date.now()}` };
    memoryOrders.unshift(memoryOrder);
    sendOrderConfirmationEmail(memoryOrder).catch(() => {});

    return successResponse(res, memoryOrder, 'Order placed successfully', 201);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const getOrders = async (req, res) => {
  try {
    if (getMongoStatus()) {
      try {
        const orders = await Order.find().sort({ createdAt: -1 });
        return successResponse(res, orders);
      } catch (e) {
        // Fall through
      }
    }
    return successResponse(res, memoryOrders);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (getMongoStatus()) {
      try {
        const order = await Order.findOne({
          $or: [{ _id: id }, { orderNumber: id }]
        });
        if (order) return successResponse(res, order);
      } catch (e) {
        // Fall through
      }
    }

    const order = memoryOrders.find(o => o._id === id || o.id === id || o.orderNumber === id);
    if (!order) {
      return errorResponse(res, 'Order not found', 404);
    }

    return successResponse(res, order);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, trackingNumber } = req.body;

    if (getMongoStatus()) {
      try {
        const updates = {};
        if (status) updates.status = status;
        if (trackingNumber) updates.trackingNumber = trackingNumber;
        if (status === 'Delivered') updates.deliveredAt = new Date();

        const updated = await Order.findOneAndUpdate(
          { $or: [{ _id: id }, { orderNumber: id }] },
          updates,
          { new: true }
        );
        if (updated) {
          const idx = memoryOrders.findIndex(o => o._id === id || o.orderNumber === id);
          if (idx !== -1) memoryOrders[idx] = updated;
          return successResponse(res, updated, 'Order status updated successfully');
        }
      } catch (e) {
        // Fall through
      }
    }

    const idx = memoryOrders.findIndex(o => o._id === id || o.id === id || o.orderNumber === id);
    if (idx === -1) {
      return errorResponse(res, 'Order not found', 404);
    }

    if (status) memoryOrders[idx].status = status;
    if (trackingNumber) memoryOrders[idx].trackingNumber = trackingNumber;
    memoryOrders[idx].updatedAt = new Date().toISOString();

    return successResponse(res, memoryOrders[idx], 'Order status updated successfully');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const email = req.params.email || req.user?.email;
    if (!email) {
      return errorResponse(res, 'User email required', 400);
    }

    if (getMongoStatus()) {
      try {
        const orders = await Order.find({ 'customer.email': email.toLowerCase() }).sort({ createdAt: -1 });
        return successResponse(res, orders);
      } catch (e) {
        // Fall through
      }
    }

    const orders = memoryOrders.filter(
      o => o.customer?.email?.toLowerCase() === email.toLowerCase()
    );
    return successResponse(res, orders);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};
