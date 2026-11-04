import api from './api.js';

export const authService = {
  async login(email, password) {
    const res = await api.post('/auth/login', { email, password });
    return res?.data || res;
  },

  async register(name, email, password) {
    const res = await api.post('/auth/register', { name, email, password });
    return res?.data || res;
  },

  async getProfile() {
    const res = await api.get('/auth/profile');
    return res?.data || res;
  },

  async updateProfile(profileData) {
    const res = await api.put('/auth/profile', profileData);
    return res?.data || res;
  }
};

export default authService;
