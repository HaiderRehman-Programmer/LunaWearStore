import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useStore, CURRENCIES } from '../../context/StoreContext.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { useCart } from '../../hooks/useCart.js';
import { AnnouncementBar } from './AnnouncementBar.jsx';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  X,
  ChevronDown,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Menu,
  LogOut,
  Package,
  Settings,
  Compass,
  Ruler,
  Truck,
  RotateCcw,
  HelpCircle,
  Globe,
  Home as HomeIcon,
  Layers,
  CreditCard
} from 'lucide-react';

export const Navbar = () => {
  const {
    activePage,
    setActivePage,
    selectedCategory,
    setSelectedCategory,
    setCartOpen,
    wishlist,
    setWishlistOpen,
    currency,
    setCurrency,
    products,
    openProduct,
    formatPrice,
    setCustomerCareModal
  } = useStore();

  const { user, setAuthModalOpen, logoutUser } = useAuth();
  const { totalItemCount } = useCart();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userDropdown, setUserDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef(null);

  // Freeze background scrolling when menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close open overlays
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setSearchOpen(false);
        setUserDropdown(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Search auto-suggestions
  const searchResults = searchTerm.trim().length > 1
    ? products.filter(p =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5)
    : [];

  const categories = [
    { label: "Women", value: "Women" },
    { label: "Men", value: "Men" },
    { label: "Outerwear", value: "Outerwear" },
    { label: "Dresses", value: "Dresses" },
    { label: "Tops", value: "Tops" },
    { label: "Denim", value: "Denim" },
    { label: "New Arrivals", value: "New Arrivals" },
    { label: "Sale / Clearance", value: "Sale" }
  ];

  const handleNavClick = (cat) => {
    setSelectedCategory(cat);
    setActivePage('shop');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPage = (pageName) => {
    setActivePage(pageName);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isNavActive = (catVal) => {
    if (activePage !== 'shop') return false;
    if (selectedCategory === catVal) return true;
    if (catVal === 'Sale' && (selectedCategory === 'Sale' || selectedCategory === 'Sale / Clearance')) return true;
    return false;
  };

  return (
    <header className="site-header">
      {/* 1. Global Announcement Bar */}
      <AnnouncementBar currency={currency} setCurrency={setCurrency} />

      {/* Main Navigation Bar */}
      <div className="main-navbar">
        <div className="container nav-inner">
          {/* Left Group: Hamburger Menu + Brand Logo */}
          <div className="nav-left-group">
            {/* Hamburger button (Active on both PC & Mobile) */}
            <button
              className="nav-hamburger-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              title="Open Navigation Menu"
            >
              <Menu size={22} className="nav-hamburger-icon" />
              <span className="nav-hamburger-label">Menu</span>
            </button>

            {/* Brand Logo */}
            <div className="brand-logo" onClick={() => { setActivePage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="logo-icon">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 2a10 10 0 0 1 10 10A10 10 0 0 1 12 22 10 10 0 0 0 12 2z" fill="currentColor" />
              </svg>
              <span className="logo-text">LUNA WEAR</span>
            </div>
          </div>

          {/* Desktop Category Navigation Links */}
          <nav className="category-nav">
            <ul className="category-list">
              {categories.map((cat) => (
                <li key={cat.label} className="category-item">
                  <button
                    className={`category-link ${isNavActive(cat.value) ? 'active' : ''}`}
                    onClick={() => handleNavClick(cat.value)}
                  >
                    {cat.label}
                    {cat.label === 'Sale / Clearance' && <span className="nav-badge-pill">20% OFF</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Utility Actions */}
          <div className="nav-actions">
            {/* Search Trigger */}
            <button
              className="action-btn search-trigger"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search bar"
            >
              <Search size={20} />
            </button>

            {/* Account / Login */}
            <div className="user-account-wrapper">
              {user ? (
                <button
                  className="action-btn account-trigger logged-in"
                  onClick={() => setUserDropdown(!userDropdown)}
                  aria-label="Account menu"
                >
                  <div className="avatar-chip">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="user-first-name">{user.name?.split(' ')[0]}</span>
                  <ChevronDown size={14} />
                </button>
              ) : (
                <button
                  className="action-btn account-trigger"
                  onClick={() => setAuthModalOpen(true)}
                  aria-label="Sign in"
                >
                  <User size={20} />
                  <span className="action-label">Sign In</span>
                </button>
              )}

              {/* User dropdown popup */}
              {user && userDropdown && (
                <div className="user-dropdown-menu animate-fade">
                  <div className="user-info-banner">
                    <p className="user-display-name">{user.name}</p>
                    <p className="user-email">{user.email}</p>
                    {user.isAdmin && <span className="admin-chip">Store Admin</span>}
                  </div>
                  <hr className="dropdown-divider" />
                  <button
                    className="dropdown-item"
                    onClick={() => { setActivePage('account'); setUserDropdown(false); }}
                  >
                    <User size={16} /> My Profile & Addresses
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => { setActivePage('account'); setUserDropdown(false); }}
                  >
                    <Package size={16} /> Orders & Invoices
                  </button>
                  {user.isAdmin && (
                    <button
                      className="dropdown-item"
                      onClick={() => { setActivePage('admin'); setUserDropdown(false); }}
                    >
                      <Settings size={16} /> Admin Portal (OMS)
                    </button>
                  )}
                  <hr className="dropdown-divider" />
                  <button
                    className="dropdown-item text-danger"
                    onClick={() => { logoutUser(); setUserDropdown(false); }}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <button
              className="action-btn wishlist-trigger"
              onClick={() => setWishlistOpen(true)}
              aria-label="Open wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="badge-count wishlist-badge">{wishlist.length}</span>
              )}
            </button>

            {/* Shopping Cart Bag */}
            <button
              className="action-btn cart-trigger"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart drawer"
            >
              <ShoppingBag size={20} />
              {totalItemCount > 0 && (
                <span className="badge-count cart-badge">{totalItemCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Search Bar Dropdown Overlay with Auto-suggestions */}
      {searchOpen && (
        <div className="search-overlay animate-slide-down">
          <div className="container search-inner">
            <div className="search-input-box">
              <Search size={22} className="search-icon-inside" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search coats, linen shirts, selvedge denim, dresses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSelectedCategory('All');
                    setActivePage('shop');
                    setSearchOpen(false);
                  }
                }}
                className="search-input"
              />
              <button
                className="close-search-btn"
                onClick={() => { setSearchOpen(false); setSearchTerm(''); }}
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>

            {/* Auto suggestions dropdown list */}
            {searchResults.length > 0 && (
              <div className="search-suggestions animate-fade">
                <span className="suggestions-title">Matching Garments</span>
                <div className="suggestions-grid">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      className="suggestion-item"
                      onClick={() => {
                        openProduct(item);
                        setSearchOpen(false);
                        setSearchTerm('');
                      }}
                    >
                      <img src={item.images[0]} alt={item.title} className="suggestion-thumb" />
                      <div className="suggestion-details">
                        <span className="suggestion-name">{item.title}</span>
                        <span className="suggestion-meta">{item.category} • {formatPrice(item.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. Luxury Navigation Side Drawer (Active for both PC and Mobile) */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <>
          <div
            className="nav-drawer-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <aside
            className="nav-drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Store Navigation Menu"
          >
            {/* Drawer Header */}
            <div className="nav-drawer-header">
              <div
                className="drawer-logo"
                onClick={() => {
                  setActivePage('home');
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="logo-icon">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 2a10 10 0 0 1 10 10A10 10 0 0 1 12 22 10 10 0 0 0 12 2z" fill="currentColor" />
                </svg>
                <span className="logo-text">LUNA WEAR</span>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="nav-drawer-body">
              {/* 1. All Store Web Pages */}
              <div className="drawer-section">
                <span className="drawer-section-title">All Web Pages</span>
                <nav className="drawer-pages-list">
                  <button
                    type="button"
                    className={`drawer-page-btn ${activePage === 'home' ? 'active' : ''}`}
                    onClick={() => navigateToPage('home')}
                  >
                    <div className="drawer-btn-left">
                      <HomeIcon size={17} className="drawer-page-icon" />
                      <span>Home Page</span>
                    </div>
                    <span className="drawer-page-tag">Editorial</span>
                  </button>

                  <button
                    type="button"
                    className={`drawer-page-btn ${activePage === 'shop' ? 'active' : ''}`}
                    onClick={() => navigateToPage('shop')}
                  >
                    <div className="drawer-btn-left">
                      <Layers size={17} className="drawer-page-icon" />
                      <span>Shop / Catalog</span>
                    </div>
                    <span className="drawer-page-tag">{products.length} Garments</span>
                  </button>

                  <button
                    type="button"
                    className={`drawer-page-btn ${activePage === 'product' ? 'active' : ''}`}
                    onClick={() => navigateToPage('product')}
                  >
                    <div className="drawer-btn-left">
                      <Sparkles size={17} className="drawer-page-icon" />
                      <span>Product Detail</span>
                    </div>
                    <span className="drawer-page-tag">Garment View</span>
                  </button>

                  <button
                    type="button"
                    className={`drawer-page-btn ${activePage === 'cart' ? 'active' : ''}`}
                    onClick={() => navigateToPage('cart')}
                  >
                    <div className="drawer-btn-left">
                      <ShoppingBag size={17} className="drawer-page-icon" />
                      <span>Shopping Bag Page</span>
                    </div>
                    <span className="drawer-page-tag">{totalItemCount} Items</span>
                  </button>

                  <button
                    type="button"
                    className={`drawer-page-btn ${activePage === 'checkout' ? 'active' : ''}`}
                    onClick={() => navigateToPage('checkout')}
                  >
                    <div className="drawer-btn-left">
                      <CreditCard size={17} className="drawer-page-icon" />
                      <span>Checkout Page</span>
                    </div>
                    <span className="drawer-page-tag">Instant</span>
                  </button>

                  <button
                    type="button"
                    className={`drawer-page-btn ${activePage === 'account' ? 'active' : ''}`}
                    onClick={() => navigateToPage('account')}
                  >
                    <div className="drawer-btn-left">
                      <User size={17} className="drawer-page-icon" />
                      <span>My Account & Orders</span>
                    </div>
                    <span className="drawer-page-tag">{user ? user.name.split(' ')[0] : 'Sign In'}</span>
                  </button>

                  <button
                    type="button"
                    className={`drawer-page-btn ${activePage === 'admin' ? 'active' : ''}`}
                    onClick={() => navigateToPage('admin')}
                  >
                    <div className="drawer-btn-left">
                      <Settings size={17} className="drawer-page-icon" />
                      <span>Admin OMS Portal</span>
                    </div>
                    <span className="drawer-page-tag">Dashboard</span>
                  </button>
                </nav>
              </div>

              {/* 2. Ready-To-Wear Categories */}
              <div className="drawer-section">
                <span className="drawer-section-title">Collections & Archives</span>
                <nav className="drawer-category-list">
                  <button
                    type="button"
                    className={`drawer-category-btn ${selectedCategory === 'All' && activePage === 'shop' ? 'active' : ''}`}
                    onClick={() => handleNavClick('All')}
                  >
                    <span>All Ready-To-Wear</span>
                    <span className="drawer-category-count">{products.length}</span>
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat.label}
                      type="button"
                      className={`drawer-category-btn ${isNavActive(cat.value) ? 'active' : ''}`}
                      onClick={() => handleNavClick(cat.value)}
                    >
                      <span className="drawer-cat-label-wrap">
                        {cat.label}
                        {cat.label === 'New Arrivals' && (
                          <span className="drawer-badge-pill new">NEW</span>
                        )}
                        {cat.label === 'Sale / Clearance' && (
                          <span className="drawer-badge-pill sale">20% OFF</span>
                        )}
                      </span>
                      <ChevronRight size={16} className="drawer-chevron" />
                    </button>
                  ))}
                </nav>
              </div>

              {/* 3. Quick Actions */}
              <div className="drawer-section">
                <span className="drawer-section-title">Quick Actions</span>
                <div className="drawer-quick-grid">
                  <button
                    type="button"
                    className="drawer-quick-card"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setWishlistOpen(true);
                    }}
                  >
                    <Heart size={16} />
                    <span>Saved ({wishlist.length})</span>
                  </button>
                  <button
                    type="button"
                    className="drawer-quick-card"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setCartOpen(true);
                    }}
                  >
                    <ShoppingBag size={16} />
                    <span>Cart Drawer ({totalItemCount})</span>
                  </button>
                  <button
                    type="button"
                    className="drawer-quick-card"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setSearchOpen(true);
                    }}
                  >
                    <Search size={16} />
                    <span>Search Catalog</span>
                  </button>
                </div>
              </div>

              {/* Customer Care & Services */}
              <div className="drawer-section">
                <span className="drawer-section-title">Customer Care</span>
                <div className="drawer-services-list">
                  <button
                    type="button"
                    className="drawer-service-link"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setCustomerCareModal('sizes');
                    }}
                  >
                    <Ruler size={16} /> Size Chart & Tailoring Guide
                  </button>
                  <button
                    type="button"
                    className="drawer-service-link"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setCustomerCareModal('shipping');
                    }}
                  >
                    <Truck size={16} /> Complimentary Worldwide Delivery
                  </button>
                  <button
                    type="button"
                    className="drawer-service-link"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setCustomerCareModal('returns');
                    }}
                  >
                    <RotateCcw size={16} /> 30-Day Effortless Returns
                  </button>
                  <button
                    type="button"
                    className="drawer-service-link"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setCustomerCareModal('faq');
                    }}
                  >
                    <HelpCircle size={16} /> Client Concierge & FAQ
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Footer: User Profile / Sign In & Currency */}
            <div className="nav-drawer-footer">
              {user ? (
                <div className="drawer-user-box">
                  <div className="drawer-user-card">
                    <div className="drawer-user-info">
                      <div className="avatar-chip">
                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="drawer-user-details">
                        <div className="drawer-user-name">{user.name}</div>
                        <div className="drawer-user-email">{user.email}</div>
                      </div>
                    </div>
                    {user.isAdmin && <span className="admin-chip">Admin</span>}
                  </div>
                  <div className="drawer-user-actions">
                    <button
                      type="button"
                      className="drawer-account-link"
                      onClick={() => {
                        setActivePage('account');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <User size={15} /> My Profile & Orders
                    </button>
                    {user.isAdmin && (
                      <button
                        type="button"
                        className="drawer-account-link"
                        onClick={() => {
                          setActivePage('admin');
                          setMobileMenuOpen(false);
                        }}
                      >
                        <Settings size={15} /> Admin Portal
                      </button>
                    )}
                    <button
                      type="button"
                      className="drawer-account-link text-danger"
                      onClick={() => {
                        logoutUser();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="drawer-auth-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalOpen(true);
                  }}
                >
                  <User size={18} />
                  <span>Sign In / Create Account</span>
                </button>
              )}

              <div className="drawer-currency-row">
                <span className="drawer-currency-label">
                  <Globe size={14} /> Currency
                </span>
                <select
                  className="currency-select drawer-currency-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  aria-label="Select currency"
                >
                  {Object.keys(CURRENCIES).map((c) => (
                    <option key={c} value={c}>{c} ({CURRENCIES[c].symbol})</option>
                  ))}
                </select>
              </div>
            </div>
          </aside>
        </>,
        document.body
      )}
    </header>
  );
};

export default Navbar;
