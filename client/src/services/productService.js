import api from './api.js';

export const productService = {
  async getProducts(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '' && val !== 'All') {
        query.append(key, val);
      }
    });
    const qs = query.toString() ? `?${query.toString()}` : '';
    const res = await api.get(`/products${qs}`);
    return res?.data || res || [];
  },

  async getProductById(id) {
    const res = await api.get(`/products/${id}`);
    return res?.data || res;
  },

  async getProductReviews(id) {
    const res = await api.get(`/products/${id}/reviews`);
    return res?.data || res || [];
  },

  async addProductReview(id, reviewData) {
    const res = await api.post(`/products/${id}/reviews`, reviewData);
    return res?.data || res;
  },

  async createProduct(productData) {
    const res = await api.post('/products', productData);
    return res?.data || res;
  },

  async updateProduct(id, productData) {
    const res = await api.put(`/products/${id}`, productData);
    return res?.data || res;
  },

  async deleteProduct(id) {
    const res = await api.delete(`/products/${id}`);
    return res?.data || res;
  },

  async getCategories() {
    const res = await api.get('/categories');
    return res?.data || res || [];
  }
};

export default productService;
