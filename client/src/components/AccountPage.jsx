import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { User, Package, MapPin, Heart, Settings, LogOut, ChevronRight, Truck, Check, Clock } from 'lucide-react';

const STATUS_COLORS = {
  'Processing': { bg: '#fff3cd', color: '#856404' },
  'Shipped': { bg: '#d1ecf1', color: '#0c5460' },
  'Delivered': { bg: '#d4edda', color: '#155724' },
  'Cancelled': { bg: '#f8d7da', color: '#721c24' },
  'Pending': { bg: '#e2e3e5', color: '#383d41' }
};

export const AccountPage = () => {
  const { user, wishlist, products, openProduct, logoutUser, setActivePage, setAuthModalOpen, formatPrice, setWishlistOpen } = useStore();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: user?.name || '', phone: user?.phone || '' });

  React.useEffect(() => {
    if (activeTab === 'orders' && !orders) {
      setLoadingOrders(true);
      fetch('/api/orders')
        .then(r => r.json())
        .then(d => {
          if (d.success) setOrders(d.orders);
          else setOrders([]);
        })
        .catch(() => setOrders([
          {
            _id: 'ord-1', orderNumber: 'LW-89241', status: 'Processing', totalPrice: 374.39,
            createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
            orderItems: [{ title: 'Atelier Wool Trench Coat', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80', quantity: 1, price: 320 }]
          },
          {
            _id: 'ord-2', orderNumber: 'LW-89104', status: 'Shipped', totalPrice: 200.26,
            createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
            orderItems: [{ title: 'Mulberry Silk Slip Dress', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300&q=80', quantity: 1, price: 185 }]
          }
        ]))
        .finally(() => setLoadingOrders(false));
    }
  }, [activeTab]);

  if (!user) {
    return (
      <div className="account-page-login-prompt">
        <User size={64} />
        <h2>Sign in to your account</h2>
        <p>Access your orders, wishlist, and profile settings.</p>
        <button className="btn-primary" onClick={() => setAuthModalOpen(true)}>
          Sign In / Create Account
        </button>
      </div>
    );
  }

  const tabs = [
    { id: 'orders', label: 'My Orders', icon: <Package size={18} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={18} /> },
    { id: 'addresses', label: 'Address Book', icon: <MapPin size={18} /> },
    { id: 'profile', label: 'Profile Settings', icon: <Settings size={18} /> }
  ];

  const wishlistProducts = products.filter(p => wishlist.includes(p._id));

  return (
    <div className="account-page">
      <div className="container account-layout">
        {/* Sidebar */}
        <aside className="account-sidebar">
          <div className="account-profile-card">
            <div className="account-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="account-profile-info">
              <p className="account-profile-name">{user.name}</p>
              <p className="account-profile-email">{user.email}</p>
              {user.isAdmin && <span className="badge badge-gold" style={{ marginTop: '6px' }}>Store Admin</span>}
            </div>
          </div>

          <nav className="account-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`account-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <ChevronRight size={16} className="nav-arrow" />
              </button>
            ))}
            {user.isAdmin && (
              <button
                className="account-nav-item admin-nav-item"
                onClick={() => setActivePage('admin')}
              >
                <Settings size={18} />
                <span>Admin Panel</span>
                <ChevronRight size={16} />
              </button>
            )}
          </nav>

          <button className="account-logout-btn" onClick={logoutUser}>
            <LogOut size={16} />
            Sign Out
          </button>
        </aside>

        {/* Main Content */}
        <main className="account-main">
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="account-section-title">Order History</h2>
              {loadingOrders && <div className="loading-spinner" style={{ margin: '40px auto' }} />}
              {!loadingOrders && orders?.length === 0 && (
                <div className="account-empty-state">
                  <Package size={48} />
                  <p>You have no orders yet.</p>
                  <button className="btn-primary" onClick={() => setActivePage('shop')}>Start Shopping</button>
                </div>
              )}
              <div className="orders-list">
                {orders?.map(order => {
                  const statusStyle = STATUS_COLORS[order.status] || STATUS_COLORS['Pending'];
                  return (
                    <div key={order._id} className="order-card">
                      <div className="order-card-header">
                        <div>
                          <p className="order-card-number">Order #{order.orderNumber || order._id}</p>
                          <p className="order-card-date">
                            {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                        <div className="order-card-right">
                          <span 
                            className="order-status-badge"
                            style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}
                          >
                            {order.status === 'Delivered' && <Check size={12} />}
                            {order.status === 'Shipped' && <Truck size={12} />}
                            {order.status === 'Processing' && <Clock size={12} />}
                            {order.status}
                          </span>
                          <span className="order-card-total">{formatPrice(order.totalPrice)}</span>
                        </div>
                      </div>
                      <div className="order-card-items">
                        {order.orderItems?.slice(0, 2).map((item, i) => (
                          <div key={i} className="order-card-item">
                            <img src={item.image} alt={item.title} />
                            <div>
                              <p>{item.title}</p>
                              <small>Qty: {item.quantity} · {formatPrice(item.price)}</small>
                            </div>
                          </div>
                        ))}
                        {order.orderItems?.length > 2 && (
                          <p className="order-more-items">+ {order.orderItems.length - 2} more items</p>
                        )}
                      </div>
                      {order.trackingNumber && (
                        <p className="order-card-tracking">
                          <Truck size={13} /> Tracking: <strong>{order.trackingNumber}</strong>
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div>
              <h2 className="account-section-title">Saved Wishlist ({wishlistProducts.length})</h2>
              {wishlistProducts.length === 0 ? (
                <div className="account-empty-state">
                  <Heart size={48} />
                  <p>Your wishlist is empty. Save items you love!</p>
                  <button className="btn-primary" onClick={() => setActivePage('shop')}>Browse Collections</button>
                </div>
              ) : (
                <div className="product-grid product-grid-3">
                  {wishlistProducts.map(p => (
                    <div key={p._id} className="wishlist-product-card" onClick={() => openProduct(p._id)}>
                      <img src={p.images?.[0]} alt={p.title} />
                      <div className="wishlist-product-info">
                        <p className="wishlist-product-title">{p.title}</p>
                        <p className="wishlist-product-price">{formatPrice(p.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div>
              <h2 className="account-section-title">Saved Addresses</h2>
              <div className="addresses-grid">
                {user.addresses?.length > 0 ? user.addresses.map((addr, i) => (
                  <div key={addr.id || i} className={`address-card ${addr.isDefault ? 'default-address' : ''}`}>
                    {addr.isDefault && <span className="badge badge-gold address-default-badge">Default</span>}
                    <p className="address-label">{addr.label}</p>
                    <p>{addr.fullName || user.name}</p>
                    <p>{addr.street}</p>
                    <p>{addr.city}, {addr.state} {addr.zipCode}</p>
                    <p>{addr.country}</p>
                  </div>
                )) : (
                  <div className="account-empty-state">
                    <MapPin size={40} />
                    <p>No addresses saved yet. Add one during checkout.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Profile Settings Tab */}
          {activeTab === 'profile' && (
            <div>
              <h2 className="account-section-title">Profile Settings</h2>
              <div className="profile-form-card">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    className="input-base"
                    value={profileForm.name}
                    onChange={e => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!editProfile}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input className="input-base" value={user.email} disabled />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    className="input-base"
                    value={profileForm.phone}
                    onChange={e => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                    disabled={!editProfile}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input className="input-base" type="password" value="••••••••••" disabled />
                </div>
                <div className="profile-form-actions">
                  {editProfile ? (
                    <>
                      <button className="btn-primary" onClick={() => setEditProfile(false)}>Save Changes</button>
                      <button className="btn-secondary" onClick={() => setEditProfile(false)}>Cancel</button>
                    </>
                  ) : (
                    <button className="btn-secondary" onClick={() => setEditProfile(true)}>Edit Profile</button>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
