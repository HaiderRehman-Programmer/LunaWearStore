import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService.js';

const AuthContext = createContext();

const DEMO_USER = {
  id: 'usr-1',
  name: 'Haider Rehman',
  email: 'haider@lunawear.com',
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
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('luna_user');
    return saved ? JSON.parse(saved) : DEMO_USER;
  });
  const [token, setToken] = useState(() => localStorage.getItem('luna_auth_token') || 'luna-jwt-token-usr-1');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('luna_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('luna_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('luna_auth_token', token);
    } else {
      localStorage.removeItem('luna_auth_token');
    }
  }, [token]);

  const loginUser = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.login(email, password);
      const loggedUser = res?.user || res?.data?.user;
      const authToken = res?.token || res?.data?.token;

      if (loggedUser) {
        setUser(loggedUser);
        if (authToken) setToken(authToken);
        setAuthModalOpen(false);
        return { success: true, user: loggedUser };
      }
      throw new Error(res?.message || 'Invalid credentials');
    } catch (err) {
      // Local fallback for smooth demo experience
      if (email.toLowerCase() === DEMO_USER.email.toLowerCase() && password === 'password123') {
        setUser(DEMO_USER);
        setToken('luna-jwt-token-usr-1');
        setAuthModalOpen(false);
        return { success: true, user: DEMO_USER };
      }
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.register(name, email, password);
      const registeredUser = res?.user || res?.data?.user;
      const authToken = res?.token || res?.data?.token;

      if (registeredUser) {
        setUser(registeredUser);
        if (authToken) setToken(authToken);
        setAuthModalOpen(false);
        return { success: true, user: registeredUser };
      }
      throw new Error(res?.message || 'Registration failed');
    } catch (err) {
      // Local fallback
      const newUser = {
        id: `usr-${Date.now()}`,
        name,
        email,
        isAdmin: false,
        addresses: [],
        wishlist: []
      };
      setUser(newUser);
      setToken(`luna-jwt-token-${newUser.id}`);
      setAuthModalOpen(false);
      return { success: true, user: newUser };
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('luna_user');
    localStorage.removeItem('luna_auth_token');
  };

  const updateProfile = async (updates) => {
    try {
      const res = await authService.updateProfile({ id: user?.id, ...updates });
      const updatedUser = res?.user || res?.data?.user || { ...user, ...updates };
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (err) {
      const fallbackUser = { ...user, ...updates };
      setUser(fallbackUser);
      return { success: true, user: fallbackUser };
    }
  };

  const addAddress = async (newAddress) => {
    const addresses = [...(user?.addresses || [])];
    if (newAddress.isDefault) {
      addresses.forEach(a => { a.isDefault = false; });
    }
    const addressWithId = { ...newAddress, id: `addr-${Date.now()}` };
    addresses.push(addressWithId);
    return updateProfile({ addresses });
  };

  const removeAddress = async (addressId) => {
    const addresses = (user?.addresses || []).filter(a => a.id !== addressId);
    return updateProfile({ addresses });
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      error,
      authModalOpen,
      setAuthModalOpen,
      loginUser,
      registerUser,
      logoutUser,
      updateProfile,
      addAddress,
      removeAddress
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
