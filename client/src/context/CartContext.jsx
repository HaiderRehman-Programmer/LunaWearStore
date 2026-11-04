import React, { createContext, useContext, useState, useEffect } from 'react';
import cartService from '../services/cartService.js';
import { calculateOrderTotals } from '../utils/formatters.js';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('luna_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [coupon, setCoupon] = useState(() => {
    const saved = localStorage.getItem('luna_coupon');
    return saved ? JSON.parse(saved) : null;
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [deliveryMethodId, setDeliveryMethodId] = useState('standard');

  useEffect(() => {
    localStorage.setItem('luna_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem('luna_coupon', JSON.stringify(coupon));
    } else {
      localStorage.removeItem('luna_coupon');
    }
  }, [coupon]);

  const deliveryFee = deliveryMethodId === 'express' ? 15 : deliveryMethodId === 'cod' ? 8 : 5;
  const totals = calculateOrderTotals(cart, coupon, deliveryFee);

  const addToCart = (product, size, color, quantity = 1) => {
    const prodId = product.id || product._id;
    const targetSize = size || (product.sizes?.[0]?.size || 'M');
    const targetColor = color || (product.colors?.[0]?.name || 'Classic');
    const itemImage = product.colors?.find(c => c.name === targetColor)?.image || product.images?.[0] || '';

    setCart(prev => {
      const existingIdx = prev.findIndex(
        item => (item.productId === prodId || item.id === prodId) && item.size === targetSize && item.color === targetColor
      );

      if (existingIdx > -1) {
        const nextCart = [...prev];
        nextCart[existingIdx] = {
          ...nextCart[existingIdx],
          quantity: nextCart[existingIdx].quantity + quantity
        };
        return nextCart;
      }

      return [
        ...prev,
        {
          id: `${prodId}-${targetSize}-${targetColor}`,
          productId: prodId,
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          image: itemImage,
          size: targetSize,
          color: targetColor,
          brand: product.brand || 'Luna Wear',
          quantity
        }
      ];
    });

    setCartOpen(true);
  };

  const updateQuantity = (index, delta) => {
    setCart(prev => {
      const next = [...prev];
      const newQty = next[index].quantity + delta;
      if (newQty <= 0) {
        return next.filter((_, i) => i !== index);
      }
      next[index] = { ...next[index], quantity: newQty };
      return next;
    });
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
    localStorage.removeItem('luna_cart');
    localStorage.removeItem('luna_coupon');
  };

  const applyCouponCode = async (code) => {
    const trimmed = (code || '').trim().toUpperCase();
    if (!trimmed) return { success: false, message: 'Please enter a coupon code' };

    // Known coupons
    if (trimmed === 'LUNA20' || trimmed === 'SALE20') {
      const c = { code: trimmed, discountPercent: 20 };
      setCoupon(c);
      return { success: true, message: '20% discount applied!', coupon: c };
    }
    if (trimmed === 'WELCOME10') {
      const c = { code: trimmed, discountPercent: 10 };
      setCoupon(c);
      return { success: true, message: '10% welcome discount applied!', coupon: c };
    }
    if (trimmed === 'FREESHIP') {
      const c = { code: trimmed, discountPercent: 0, freeShipping: true };
      setCoupon(c);
      return { success: true, message: 'Free express shipping unlocked!', coupon: c };
    }

    try {
      const res = await cartService.applyCoupon(trimmed);
      if (res?.data) {
        setCoupon(res.data);
        return { success: true, message: res.message, coupon: res.data };
      }
    } catch (e) {
      // Return error
    }

    return { success: false, message: 'Invalid promo code. Try LUNA20 or WELCOME10' };
  };

  const removeCoupon = () => {
    setCoupon(null);
  };

  const totalItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      cartOpen,
      setCartOpen,
      coupon,
      totals,
      totalItemCount,
      deliveryMethodId,
      setDeliveryMethodId,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      applyCouponCode,
      removeCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartProvider;
