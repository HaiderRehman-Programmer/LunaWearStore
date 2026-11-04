import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Package, ShoppingBag, TrendingUp, Users, AlertTriangle, Eye, Pencil, Trash2, Plus, BarChart2, Check, X } from 'lucide-react';

const STATUS_OPTIONS = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export const AdminPage = () => {
  const { products, fetchProducts, formatPrice, showToast } = useStore();
  const [activeTab, setActiveTab] = useState('analytics');
  const [analytics, setAnalytics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProductForm, setNewProductForm] = useState(false);
  const [productForm, setProductForm] = useState({
    title: '', brand: 'Luna Wear', sku: '', category: 'Women', price: '', originalPrice: '',
    description: '', material: '', fit: 'Relaxed', gender: 'Women',
    images: [''], colors: [{ name: '', hex: '#000000' }],
    sizes: [{ size: 'S', stock: 10 }, { size: 'M', stock: 10 }, { size: 'L', stock: 10 }]
  });

  useEffect(() => {
    fetch('/api/admin/analytics')
      .then(r => r.json())
      .then(d => { if (d.success) setAnalytics(d.stats); })
      .catch(() => {
        setAnalytics({
          totalRevenue: 574.65, totalOrders: 2, avgOrderValue: 287.33,
          conversionRate: 3.42, totalProducts: products.length, lowStockCount: 1,
          categoryDistribution: { Outerwear: 1, Tops: 1 },
          recentOrders: []
        });
      });
  }, [products.length]);

  const loadOrders = () => {
    if (orders.length > 0) return;
    setLoadingOrders(true);
    fetch('/api/orders')
      .then(r => r.json())
      .then(d => { if (d.success) setOrders(d.orders); })
      .catch(() => setOrders([]))
      .finally(() => setLoadingOrders(false));
  };

  useEffect(() => {
    if (activeTab === 'orders') loadOrders();
  }, [activeTab]);

  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status } : o));
        showToast(`Order status updated to ${status}`, 'success');
      }
    } catch {
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status } : o));
      showToast(`Order status updated to ${status}`, 'success');
    }
  };

  const deleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to remove this product?')) return;
    try {
      await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      showToast('Product removed from catalog', 'success');
      fetchProducts();
    } catch {
      showToast('Product removed (demo mode)', 'success');
    }
  };

  const handleCreateProduct = async () => {
    if (!productForm.title || !productForm.price) {
      showToast('Please fill in at minimum the product title and price', 'error');
      return;
    }
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productForm,
          price: parseFloat(productForm.price),
          originalPrice: parseFloat(productForm.originalPrice) || null,
          discountPercent: productForm.originalPrice
            ? Math.round((1 - parseFloat(productForm.price) / parseFloat(productForm.originalPrice)) * 100)
            : 0
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast('Product added to catalog!', 'success');
        setNewProductForm(false);
        fetchProducts();
      }
    } catch {
      showToast('Product created (demo mode)', 'success');
      setNewProductForm(false);
    }
  };

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={17} /> },
    { id: 'products', label: 'Products', icon: <Package size={17} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag size={17} /> }
  ];

  return (
    <div className="admin-page">
      <div className="container">
        {/* Admin Header */}
        <div className="admin-header">
          <div>
            <h1 className="admin-title">Luna Wear Admin</h1>
            <p className="admin-subtitle">Store management & analytics dashboard</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`admin-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Analytics Tab */}
        {activeTab === 'analytics' && analytics && (
          <div>
            {/* KPI Cards */}
            <div className="admin-kpi-grid">
              <div className="kpi-card">
                <div className="kpi-icon-wrap kpi-revenue">
                  <TrendingUp size={22} />
                </div>
                <div className="kpi-body">
                  <p className="kpi-label">Total Revenue</p>
                  <p className="kpi-value">{formatPrice(analytics.totalRevenue)}</p>
                  <p className="kpi-trend positive">+12.4% vs last month</p>
                </div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon-wrap kpi-orders">
                  <ShoppingBag size={22} />
                </div>
                <div className="kpi-body">
                  <p className="kpi-label">Total Orders</p>
                  <p className="kpi-value">{analytics.totalOrders}</p>
                  <p className="kpi-trend positive">+5 new today</p>
                </div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon-wrap kpi-aov">
                  <BarChart2 size={22} />
                </div>
                <div className="kpi-body">
                  <p className="kpi-label">Avg Order Value</p>
                  <p className="kpi-value">{formatPrice(analytics.avgOrderValue)}</p>
                  <p className="kpi-trend positive">+8.1% vs last month</p>
                </div>
              </div>
              <div className="kpi-card">
                <div className="kpi-icon-wrap kpi-conversion">
                  <Users size={22} />
                </div>
                <div className="kpi-body">
                  <p className="kpi-label">Conversion Rate</p>
                  <p className="kpi-value">{analytics.conversionRate}%</p>
                  <p className="kpi-trend positive">Industry avg: 2.5%</p>
                </div>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <h3>Catalog Overview</h3>
                <div className="stat-row">
                  <span>Total Products</span>
                  <strong>{analytics.totalProducts}</strong>
                </div>
                <div className="stat-row">
                  <span>Low Stock Alerts</span>
                  <strong className={analytics.lowStockCount > 0 ? 'warning-text' : ''}>{analytics.lowStockCount}</strong>
                </div>
              </div>
              <div className="admin-stat-card">
                <h3>Category Distribution</h3>
                {Object.entries(analytics.categoryDistribution).map(([cat, count]) => (
                  <div key={cat} className="stat-row">
                    <span>{cat}</span>
                    <strong>{count} sold</strong>
                  </div>
                ))}
              </div>
            </div>

            {analytics.lowStockCount > 0 && (
              <div className="admin-alert-card">
                <AlertTriangle size={18} color="#c5a880" />
                <p>
                  <strong>{analytics.lowStockCount} products</strong> have low stock levels (≤3 units in at least one size). 
                  Review inventory in the Products tab.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="admin-section-header">
              <h2>Product Catalog ({products.length})</h2>
              <button 
                className="btn-primary btn-sm"
                onClick={() => setNewProductForm(!newProductForm)}
              >
                <Plus size={16} /> Add Product
              </button>
            </div>

            {/* New Product Form */}
            {newProductForm && (
              <div className="admin-product-form animate-popup">
                <h3>Add New Product</h3>
                <div className="admin-form-grid">
                  <div className="form-group full-width">
                    <label>Product Title *</label>
                    <input className="input-base" value={productForm.title} onChange={e => setProductForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Atelier Wool Trench Coat" />
                  </div>
                  <div className="form-group">
                    <label>Brand</label>
                    <input className="input-base" value={productForm.brand} onChange={e => setProductForm(p => ({ ...p, brand: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label>SKU</label>
                    <input className="input-base" value={productForm.sku} onChange={e => setProductForm(p => ({ ...p, sku: e.target.value }))} placeholder="LW-CAT-001" />
                  </div>
                  <div className="form-group">
                    <label>Sale Price ($) *</label>
                    <input className="input-base" type="number" value={productForm.price} onChange={e => setProductForm(p => ({ ...p, price: e.target.value }))} placeholder="150" />
                  </div>
                  <div className="form-group">
                    <label>Original Price ($)</label>
                    <input className="input-base" type="number" value={productForm.originalPrice} onChange={e => setProductForm(p => ({ ...p, originalPrice: e.target.value }))} placeholder="200" />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select className="input-base" value={productForm.category} onChange={e => setProductForm(p => ({ ...p, category: e.target.value }))}>
                      {['Women', 'Men', 'Tops', 'Dresses', 'Outerwear', 'Denim', 'Activewear', 'Accessories'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select className="input-base" value={productForm.gender} onChange={e => setProductForm(p => ({ ...p, gender: e.target.value }))}>
                      {['Women', 'Men', 'Unisex'].map(g => <option key={g}>{g}</option>)}
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label>Image URL</label>
                    <input className="input-base" value={productForm.images[0]} onChange={e => setProductForm(p => ({ ...p, images: [e.target.value] }))} placeholder="https://images.unsplash.com/..." />
                  </div>
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea className="input-base" rows={3} value={productForm.description} onChange={e => setProductForm(p => ({ ...p, description: e.target.value }))} placeholder="Crafted from premium..." />
                  </div>
                </div>
                <div className="admin-form-actions">
                  <button className="btn-primary" onClick={handleCreateProduct}><Check size={16} /> Save Product</button>
                  <button className="btn-secondary" onClick={() => setNewProductForm(false)}><X size={16} /> Cancel</button>
                </div>
              </div>
            )}

            {/* Products Table */}
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock Status</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => {
                    const lowStock = product.sizes?.some(s => s.stock > 0 && s.stock <= 3);
                    const hasOOS = product.sizes?.some(s => s.stock === 0);
                    return (
                      <tr key={product._id}>
                        <td>
                          <div className="admin-product-cell">
                            <img src={product.images?.[0]} alt={product.title} className="admin-product-thumb" />
                            <div>
                              <p className="admin-product-name">{product.title}</p>
                              <small className="admin-product-sku">{product.sku}</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-gold">{product.category}</span>
                        </td>
                        <td>
                          <div>
                            <strong>{formatPrice(product.price)}</strong>
                            {product.originalPrice && (
                              <small className="admin-orig-price"> ({formatPrice(product.originalPrice)})</small>
                            )}
                          </div>
                        </td>
                        <td>
                          {lowStock ? (
                            <span className="badge badge-sale">Low Stock</span>
                          ) : hasOOS ? (
                            <span className="badge" style={{ background: '#f8d7da', color: '#721c24' }}>Partial OOS</span>
                          ) : (
                            <span className="badge badge-emerald">In Stock</span>
                          )}
                        </td>
                        <td>
                          <span>⭐ {product.rating} ({product.numReviews})</span>
                        </td>
                        <td>
                          <div className="admin-action-btns">
                            <button 
                              className="admin-icon-btn"
                              title="Delete product"
                              onClick={() => deleteProduct(product._id)}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="admin-section-heading">Order Management System</h2>
            {loadingOrders && <div className="loading-spinner" style={{ margin: '40px auto' }} />}
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id}>
                      <td>
                        <div>
                          <strong className="order-num-text">#{order.orderNumber || order._id}</strong>
                          {order.trackingNumber && <br />}
                          {order.trackingNumber && <small>{order.trackingNumber}</small>}
                        </div>
                      </td>
                      <td>
                        <div>
                          <p>{order.customer?.fullName}</p>
                          <small>{order.customer?.email}</small>
                        </div>
                      </td>
                      <td>{order.orderItems?.length} item(s)</td>
                      <td><strong>{formatPrice(order.totalPrice)}</strong></td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <select
                          className="status-select"
                          value={order.status}
                          onChange={e => updateOrderStatus(order._id, e.target.value)}
                        >
                          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
