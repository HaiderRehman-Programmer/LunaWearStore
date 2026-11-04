import api from './api.js';

export const cartService = {
  async getCart() {
    const res = await api.get('/cart');
    return res?.data || res;
  },

  async syncCart(items, appliedCoupon) {
    const res = await api.post('/cart/sync', { items, appliedCoupon });
    return res?.data || res;
  },

  async applyCoupon(code) {
    const res = await api.post('/cart/coupon', { code });
    return res?.data || res;
  },

  async clearCart() {
    const res = await api.delete('/cart/clear');
    return res?.data || res;
  }
};

export default cartService;
