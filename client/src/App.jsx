import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

// Common Components
import { Navbar } from './components/common/Navbar.jsx';
import { Footer } from './components/common/Footer.jsx';
import { AuthModal } from './components/common/AuthModal.jsx';
import { ToastNotification } from './components/common/ToastNotification.jsx';
import { WishlistDrawer } from './components/common/WishlistDrawer.jsx';
import { CustomerCareModals } from './components/common/CustomerCareModals.jsx';

// Product Components & Modals
import { SizeGuideModal } from './components/product/SizeGuideModal.jsx';
import { QuickViewModal } from './components/product/QuickViewModal.jsx';

// Cart Components
import { CartDrawer } from './components/cart/CartDrawer.jsx';

// Page Views
import { Home } from './pages/Home.jsx';
import { ProductList } from './pages/ProductList.jsx';
import { ProductDetail } from './pages/ProductDetail.jsx';
import { Cart } from './pages/Cart.jsx';
import { Checkout } from './pages/Checkout.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { OrderConfirmation } from './pages/OrderConfirmation.jsx';
import { AdminDashboard } from './pages/admin/AdminDashboard.jsx';

import './index.css';
import './App.css';

const AppContent = () => {
  const { activePage } = useStore();

  const isCheckoutView = activePage === 'checkout' || activePage === 'order-confirmation';

  return (
    <div className="app-wrapper">
      {/* 1. Global Header & Navigation */}
      <Navbar />

      {/* Main Page View */}
      <main className="app-main">
        {activePage === 'home' && <Home />}
        {activePage === 'shop' && <ProductList />}
        {activePage === 'product' && <ProductDetail />}
        {activePage === 'cart' && <Cart />}
        {activePage === 'checkout' && <Checkout />}
        {activePage === 'order-confirmation' && <OrderConfirmation />}
        {activePage === 'account' && <Dashboard />}
        {activePage === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      {!isCheckoutView && <Footer />}

      {/* Global Slide-outs and Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <AuthModal />
      <SizeGuideModal />
      <QuickViewModal />
      <CustomerCareModals />

      {/* Floating Notification Toast */}
      <ToastNotification />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <StoreProvider>
          <AppContent />
        </StoreProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
