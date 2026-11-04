import api from './api.js';

export const orderService = {
  async createOrder(orderPayload) {
    const res = await api.post('/orders', orderPayload);
    return res?.data || res;
  },

  async getOrders() {
    const res = await api.get('/orders');
    return res?.data || res || [];
  },

  async getOrderById(id) {
    const res = await api.get(`/orders/${id}`);
    return res?.data || res;
  },

  async getUserOrders(email) {
    const res = await api.get(`/orders/user/${encodeURIComponent(email)}`);
    return res?.data || res || [];
  },

  async updateOrderStatus(id, status, trackingNumber) {
    const res = await api.put(`/orders/${id}/status`, { status, trackingNumber });
    return res?.data || res;
  }
};

export default orderService;
