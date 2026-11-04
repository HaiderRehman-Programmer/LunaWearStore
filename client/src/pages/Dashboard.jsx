import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useCart } from '../hooks/useCart.js';
import { Modal } from '../components/common/Modal.jsx';
import orderService from '../services/orderService.js';
import { 
  User, 
  MapPin, 
  Package, 
  Heart, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Plus, 
  Trash2, 
  Edit3, 
  Download, 
  Printer, 
  ShoppingBag,
  ShieldCheck,
  KeyRound
} from 'lucide-react';

export const Dashboard = () => {
  const { wishlist, removeFromWishlist, openProduct, formatPrice, addToast } = useStore();
  const { user, updateProfile, addAddress, removeAddress, logoutUser, setAuthModalOpen } = useAuth();
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'profile' | 'addresses' | 'wishlist'
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Address modal
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [newAddressForm, setNewAddressForm] = useState({
    label: 'Home',
    fullName: user?.name || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    isDefault: false
  });

  // Profile edit form
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    password: ''
  });

  // Load orders
  useEffect(() => {
    if (user?.email) {
      setLoadingOrders(true);
      orderService.getUserOrders(user.email)
        .then(res => {
          if (Array.isArray(res)) setOrders(res);
        })
        .catch(() => {})
        .finally(() => setLoadingOrders(false));
    }
  }, [user?.email]);

  if (!user) {
    return (
      <div className="container py-20 text-center">
        <h2>Please Sign In to Access Your Dashboard</h2>
        <p className="text-muted mt-2">Track orders, manage addresses, and access saved wishlist.</p>
        <button className="primary-btn mt-6" onClick={() => setAuthModalOpen(true)}>
          Sign In / Create Account
        </button>
      </div>
    );
  }

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    await updateProfile({
      name: profileForm.name,
      phone: profileForm.phone
    });
    addToast('Profile information updated successfully');
  };

  const handleAddAddressSubmit = async (e) => {
    e.preventDefault();
    if (!newAddressForm.street || !newAddressForm.city || !newAddressForm.zipCode) {
      alert('Please fill out all address fields');
      return;
    }
    await addAddress(newAddressForm);
    setAddressModalOpen(false);
    setNewAddressForm({
      label: 'Home',
      fullName: user?.name || '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      isDefault: false
    });
    addToast('New delivery address added');
  };

  return (
    <div className="dashboard-page-view">
      <div className="container dashboard-container">
        {/* Dashboard Top Header */}
        <div className="dashboard-header-card">
          <div className="dashboard-user-profile-row">
            <div className="dashboard-avatar-big">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="dashboard-welcome-info">
              <h2>Welcome, {user.name}</h2>
              <p className="welcome-email">{user.email} • Member since 2026</p>
            </div>
          </div>
          <button className="dashboard-logout-btn" onClick={logoutUser}>
            Sign Out
          </button>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="dashboard-tabs-bar">
          <button 
            type="button" 
            className={`dashboard-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <Package size={17} /> Order History ({orders.length})
          </button>
          <button 
            type="button" 
            className={`dashboard-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={17} /> Profile Settings
          </button>
          <button 
            type="button" 
            className={`dashboard-tab-btn ${activeTab === 'addresses' ? 'active' : ''}`}
            onClick={() => setActiveTab('addresses')}
          >
            <MapPin size={17} /> Address Book ({user.addresses?.length || 0})
          </button>
          <button 
            type="button" 
            className={`dashboard-tab-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            <Heart size={17} /> Saved Wishlist ({wishlist.length})
          </button>
        </div>

        {/* Tab 1: Orders and Tracking */}
        {activeTab === 'orders' && (
          <div className="dashboard-tab-panel animate-fade">
            <div className="panel-title-row">
              <h3>Recent Purchases & Live Tracking</h3>
            </div>

            {orders.length === 0 ? (
              <div className="dashboard-empty-panel">
                <Package size={48} strokeWidth={1.5} />
                <h4>No Orders Placed Yet</h4>
                <p>When you place an order, live shipping status and tax receipts will appear here.</p>
              </div>
            ) : (
              <div className="dashboard-orders-list">
                {orders.map((ord) => (
                  <div key={ord.orderNumber || ord._id} className="dashboard-order-card">
                    <div className="order-card-header">
                      <div>
                        <span className="order-card-id">#{ord.orderNumber}</span>
                        <span className="order-card-date">
                          {new Date(ord.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="order-status-chip-row">
                        <span className={`order-status-badge status-${(ord.status || 'Processing').toLowerCase()}`}>
                          {ord.status || 'Processing'}
                        </span>
                        <button 
                          type="button" 
                          className="invoice-view-btn"
                          onClick={() => setSelectedInvoice(ord)}
                        >
                          <Printer size={14} /> View Invoice
                        </button>
                      </div>
                    </div>

                    {/* Tracking number banner if available */}
                    {ord.trackingNumber && (
                      <div className="order-tracking-strip">
                        <Truck size={15} />
                        <span>Tracking Number: <strong>{ord.trackingNumber}</strong></span>
                        <span className="est-shipping-eta">({ord.deliveryMethod?.name || 'Standard Shipping'})</span>
                      </div>
                    )}

                    {/* Items row */}
                    <div className="order-card-items-grid">
                      {ord.orderItems?.map((it, idx) => (
                        <div key={idx} className="order-mini-item">
                          <img src={it.image} alt={it.title} className="order-item-img" />
                          <div className="order-item-desc">
                            <h5>{it.title}</h5>
                            <p>{it.size} • {it.color} • Qty {it.quantity}</p>
                            <span>${(it.price * it.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="order-card-footer">
                      <span className="order-total-label">Total Amount Paid:</span>
                      <strong className="order-total-val">${ord.totalPrice?.toFixed(2)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Profile Settings */}
        {activeTab === 'profile' && (
          <div className="dashboard-tab-panel animate-fade">
            <div className="panel-title-row">
              <h3>Personal Information & Security</h3>
            </div>

            <form className="profile-settings-form" onSubmit={handleSaveProfile}>
              <div className="form-group-block">
                <label className="field-label">Full Name</label>
                <input 
                  type="text" 
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group-block">
                <label className="field-label">Email Address (Read-only)</label>
                <input 
                  type="email" 
                  value={profileForm.email}
                  disabled
                  className="form-input disabled"
                />
              </div>

              <div className="form-group-block">
                <label className="field-label">Phone Number</label>
                <input 
                  type="tel" 
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="form-input"
                />
              </div>

              <div className="form-group-block">
                <label className="field-label">Change Password</label>
                <input 
                  type="password" 
                  placeholder="Leave blank to keep existing password"
                  value={profileForm.password}
                  onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                  className="form-input"
                />
              </div>

              <button type="submit" className="save-profile-btn">
                Save Profile Changes
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Address Book */}
        {activeTab === 'addresses' && (
          <div className="dashboard-tab-panel animate-fade">
            <div className="panel-title-row">
              <h3>Saved Delivery Addresses</h3>
              <button 
                type="button" 
                className="add-address-trigger-btn"
                onClick={() => setAddressModalOpen(true)}
              >
                <Plus size={16} /> Add New Address
              </button>
            </div>

            <div className="addresses-book-grid">
              {(user.addresses || []).map((addr) => (
                <div key={addr.id} className="address-book-card">
                  <div className="addr-top-line">
                    <span className="addr-type-tag">{addr.label || 'Home'}</span>
                    {addr.isDefault && <span className="default-pill">Default</span>}
                  </div>
                  <h4 className="addr-person-name">{addr.fullName}</h4>
                  <p className="addr-street-line">{addr.street}</p>
                  <p className="addr-geo-line">{addr.city}, {addr.state} {addr.zipCode}</p>
                  <p className="addr-country-line">{addr.country}</p>

                  <div className="addr-card-actions">
                    <button 
                      type="button" 
                      className="addr-remove-btn"
                      onClick={() => removeAddress(addr.id)}
                    >
                      <Trash2 size={15} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Wishlist */}
        {activeTab === 'wishlist' && (
          <div className="dashboard-tab-panel animate-fade">
            <div className="panel-title-row">
              <h3>Saved Favorites ({wishlist.length})</h3>
            </div>

            {wishlist.length === 0 ? (
              <div className="dashboard-empty-panel">
                <Heart size={48} strokeWidth={1.5} />
                <h4>Your Wishlist is Empty</h4>
                <p>Click the heart icon on any product to save it here for later.</p>
              </div>
            ) : (
              <div className="wishlist-cards-grid">
                {wishlist.map((item) => (
                  <div key={item.id} className="wishlist-item-card">
                    <img src={item.images?.[0] || item.image} alt={item.title} className="wishlist-img" />
                    <div className="wishlist-item-body">
                      <h4>{item.title}</h4>
                      <p className="wishlist-price">{formatPrice(item.price)}</p>
                      <div className="wishlist-actions-row">
                        <button 
                          type="button" 
                          className="move-to-bag-btn"
                          onClick={() => {
                            addToCart(item, item.sizes?.[0]?.size || 'M', item.colors?.[0]?.name || 'Classic');
                            removeFromWishlist(item.id);
                            addToast(`Moved ${item.title} to bag!`);
                          }}
                        >
                          <ShoppingBag size={14} /> Add to Bag
                        </button>
                        <button 
                          type="button" 
                          className="remove-wishlist-chip"
                          onClick={() => removeFromWishlist(item.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Invoice Printable Modal */}
      {selectedInvoice && (
        <Modal 
          isOpen={Boolean(selectedInvoice)} 
          onClose={() => setSelectedInvoice(null)}
          title={`Official Invoice #${selectedInvoice.orderNumber}`}
          maxWidth="640px"
        >
          <div className="printable-invoice-container">
            <div className="invoice-header">
              <div>
                <h2>LUNA WEAR STORE</h2>
                <p>742 Evergreen Terrace, San Francisco, CA</p>
                <p>Tax ID: US-98234-LUNA</p>
              </div>
              <div className="invoice-meta-right">
                <h3>INVOICE</h3>
                <p>Order: #{selectedInvoice.orderNumber}</p>
                <p>Date: {new Date(selectedInvoice.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <hr />

            <div className="invoice-billed-to">
              <strong>Billed & Shipped To:</strong>
              <p>{selectedInvoice.customer?.fullName}</p>
              <p>{selectedInvoice.shippingAddress?.address}</p>
              <p>{selectedInvoice.shippingAddress?.city}, {selectedInvoice.shippingAddress?.state} {selectedInvoice.shippingAddress?.postalCode}</p>
            </div>

            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Garment Description</th>
                  <th>Variant</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedInvoice.orderItems?.map((it, idx) => (
                  <tr key={idx}>
                    <td>{it.title}</td>
                    <td>{it.size} / {it.color}</td>
                    <td>{it.quantity}</td>
                    <td>${(it.price * it.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="invoice-totals-footer">
              <p>Subtotal: ${selectedInvoice.subtotal?.toFixed(2)}</p>
              <p>Shipping: ${selectedInvoice.shippingPrice?.toFixed(2)}</p>
              <p>Tax: ${selectedInvoice.tax?.toFixed(2)}</p>
              <p className="invoice-grand-total">Total Paid: ${selectedInvoice.totalPrice?.toFixed(2)}</p>
            </div>

            <div className="invoice-actions-print">
              <button className="primary-btn" onClick={() => window.print()}>
                <Printer size={16} /> Print Official Receipt
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Address Modal */}
      <Modal
        isOpen={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        title="Add New Delivery Address"
        maxWidth="520px"
      >
        <form onSubmit={handleAddAddressSubmit} className="add-address-form">
          <div className="form-group-block">
            <label className="field-label">Address Label</label>
            <input 
              type="text" 
              placeholder="e.g. Home, Studio, Office"
              value={newAddressForm.label}
              onChange={(e) => setNewAddressForm({ ...newAddressForm, label: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group-block">
            <label className="field-label">Recipient Full Name</label>
            <input 
              type="text" 
              placeholder="Full name"
              value={newAddressForm.fullName}
              onChange={(e) => setNewAddressForm({ ...newAddressForm, fullName: e.target.value })}
              required
              className="form-input"
            />
          </div>

          <div className="form-group-block">
            <label className="field-label">Street Address</label>
            <input 
              type="text" 
              placeholder="Street and number"
              value={newAddressForm.street}
              onChange={(e) => setNewAddressForm({ ...newAddressForm, street: e.target.value })}
              required
              className="form-input"
            />
          </div>

          <div className="form-row-dual">
            <div className="form-group-block">
              <label className="field-label">City</label>
              <input 
                type="text" 
                placeholder="City"
                value={newAddressForm.city}
                onChange={(e) => setNewAddressForm({ ...newAddressForm, city: e.target.value })}
                required
                className="form-input"
              />
            </div>
            <div className="form-group-block">
              <label className="field-label">State</label>
              <input 
                type="text" 
                placeholder="State"
                value={newAddressForm.state}
                onChange={(e) => setNewAddressForm({ ...newAddressForm, state: e.target.value })}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group-block">
            <label className="field-label">ZIP / Postal Code</label>
            <input 
              type="text" 
              placeholder="Postal code"
              value={newAddressForm.zipCode}
              onChange={(e) => setNewAddressForm({ ...newAddressForm, zipCode: e.target.value })}
              required
              className="form-input"
            />
          </div>

          <button type="submit" className="save-address-btn">
            Save Address to Book
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;
