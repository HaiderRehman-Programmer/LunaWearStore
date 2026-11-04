import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../assets/seedData.js';
import productService from '../services/productService.js';
import { CURRENCY_RATES, formatCurrency } from '../utils/formatters.js';

const StoreContext = createContext();

export const CURRENCIES = CURRENCY_RATES;

export const StoreProvider = ({ children }) => {
  const normalizeItem = (item) => {
    if (!item) return item;
    const id = item.id || item._id;
    return { ...item, id, _id: id };
  };
  const normalizeList = (list) => (list || []).map(normalizeItem);

  // Navigation & Page routing
  const [activePage, setActivePage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(() => normalizeItem(initialProducts[0]));
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Products
  const [products, setProducts] = useState(() => normalizeList(initialProducts));
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Currency
  const [currency, setCurrency] = useState('USD');

  // Modals & Drawers
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sizeGuideModalOpen, setSizeGuideModalOpen] = useState(false);
  const [customerCareModal, setCustomerCareModal] = useState(null);

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('luna_wishlist');
      const parsed = saved ? JSON.parse(saved) : [initialProducts[0], initialProducts[1]];
      return normalizeList(parsed);
    } catch {
      return normalizeList([initialProducts[0], initialProducts[1]]);
    }
  });

  // Last confirmed order
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState(null);

  const addToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('luna_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Fetch live products from backend if running
  useEffect(() => {
    setLoadingProducts(true);
    productService.getProducts()
      .then(res => {
        const fetched = Array.isArray(res) ? res : res?.data;
        if (Array.isArray(fetched) && fetched.length > 0) {
          const normalized = normalizeList(fetched);
          setProducts(normalized);
          if (!selectedProduct) setSelectedProduct(normalized[0]);
        }
      })
      .catch(() => {
        // Fallback is already initialized to initialProducts
      })
      .finally(() => setLoadingProducts(false));
  }, []);

  const openProduct = (prod) => {
    setSelectedProduct(normalizeItem(prod));
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (cat) => {
    setSelectedCategory(cat);
    setActivePage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => (item.id || item._id) === (product.id || product._id));
      if (exists) {
        addToast(`Removed "${product.title}" from your wishlist`);
        return prev.filter(item => (item.id || item._id) !== (product.id || product._id));
      } else {
        addToast(`Saved "${product.title}" to your wishlist`);
        return [...prev, product];
      }
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(item => (item.id || item._id) !== id));
  };

  const isWishlisted = (id) => {
    return wishlist.some(item => (item.id || item._id) === id);
  };

  const formatPrice = (priceUSD) => {
    return formatCurrency(priceUSD, currency);
  };

  return (
    <StoreContext.Provider value={{
      activePage,
      setActivePage,
      selectedProduct,
      setSelectedProduct,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      products,
      loadingProducts,
      currency,
      setCurrency,
      cartOpen,
      setCartOpen,
      wishlistOpen,
      setWishlistOpen,
      authModalOpen,
      setAuthModalOpen,
      quickViewProduct,
      setQuickViewProduct,
      sizeGuideModalOpen,
      setSizeGuideModalOpen,
      customerCareModal,
      setCustomerCareModal,
      wishlist,
      toggleWishlist,
      removeFromWishlist,
      isWishlisted,
      confirmedOrder,
      setConfirmedOrder,
      toastMessage,
      addToast,
      openProduct,
      navigateToCategory,
      formatPrice
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export default StoreProvider;
