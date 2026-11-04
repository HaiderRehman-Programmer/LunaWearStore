import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { Modal } from '../../components/common/Modal.jsx';
import productService from '../../services/productService.js';
import orderService from '../../services/orderService.js';
import { 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  Truck, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  BarChart3, 
  Search,
  Tag,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const AdminDashboard = () => {
  const { products, formatPrice, addToast } = useStore();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'orders' | 'analytics' | 'crm'
  const [ordersList, setOrdersList] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Search/Filter in admin
  const [inventorySearch, setInventorySearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // Add/Edit Product Modal
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    title: '',
    brand: 'Luna Wear',
    category: 'Outerwear',
    price: '',
    originalPrice: '',
    discountPercent: 0,
    fit: 'Relaxed',
    material: '100% Organic Italian Cotton',
    description: '',
    images: ['https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=700&q=80'],
    colors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Camel Tan', hex: '#c5a880' }
    ],
    sizes: [
      { size: 'S', stock: 12 },
      { size: 'M', stock: 15 },
      { size: 'L', stock: 8 },
      { size: 'XL', stock: 4 }
    ]
  });

  // Tracking number update modal
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedOrderForStatus, setSelectedOrderForStatus] = useState(null);
  const [newStatus, setNewStatus] = useState('Processing');
  const [newTracking, setNewTracking] = useState('');

  // Fetch orders
  useEffect(() => {
    setLoadingOrders(true);
    orderService.getOrders()
      .then(res => {
        if (Array.isArray(res)) setOrdersList(res);
      })
      .catch(() => {})
      .finally(() => setLoadingOrders(false));
  }, []);

  // Filtered lists
  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(inventorySearch.toLowerCase()) ||
    p.category.toLowerCase().includes(inventorySearch.toLowerCase()) ||
    p.sku?.toLowerCase().includes(inventorySearch.toLowerCase())
  );

  const filteredOrders = ordersList.filter(o => 
    o.orderNumber?.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customer?.fullName?.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customer?.email?.toLowerCase().includes(orderSearch.toLowerCase())
  );

  // CRM Mock Customers from orders + registry
  const crmCustomers = [
    {
      id: 'crm-1',
      name: 'Haider Rehman',
      email: 'haider@lunawear.com',
      ordersCount: 3,
      totalSpend: 1140,
      tier: 'VIP Gold',
      lastActive: 'Today'
    },
    {
      id: 'crm-2',
      name: 'Julian Vance',
      email: 'julian@example.com',
      ordersCount: 2,
      totalSpend: 680,
      tier: 'Silver',
      lastActive: '3 days ago'
    },
    {
      id: 'crm-3',
      name: 'Clara Delacroix',
      email: 'clara@example.com',
      ordersCount: 1,
      totalSpend: 340,
      tier: 'Bronze',
      lastActive: '1 week ago'
    }
  ];

  // Analytics Metrics
  const totalRevenue = ordersList.reduce((sum, o) => sum + (o.totalPrice || 0), 3840);
  const totalOrdersCount = ordersList.length || 14;
  const avgOrderValue = totalOrdersCount > 0 ? (totalRevenue / totalOrdersCount) : 0;
  const conversionRate = 3.84; // 3.84% conversion rate

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      title: '',
      brand: 'Luna Wear',
      category: 'Outerwear',
      price: '',
      originalPrice: '',
      discountPercent: 0,
      fit: 'Relaxed',
      material: '100% Organic Italian Cotton',
      description: '',
      images: ['https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=700&q=80'],
      colors: [
        { name: 'Onyx Black', hex: '#111111' },
        { name: 'Camel Tan', hex: '#c5a880' }
      ],
      sizes: [
        { size: 'S', stock: 10 },
        { size: 'M', stock: 15 },
        { size: 'L', stock: 8 }
      ]
    });
    setProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProductId(prod.id || prod._id);
    setProductForm({
      title: prod.title,
      brand: prod.brand || 'Luna Wear',
      category: prod.category || 'Outerwear',
      price: prod.price,
      originalPrice: prod.originalPrice || '',
      discountPercent: prod.discountPercent || 0,
      fit: prod.fit || 'Relaxed',
      material: prod.material || '',
      description: prod.description || '',
      images: prod.images || [],
      colors: prod.colors || [],
      sizes: prod.sizes || []
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!productForm.title || !productForm.price) {
      alert('Title and Price are required');
      return;
    }

    const payload = {
      ...productForm,
      price: Number(productForm.price),
      originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : null,
      discountPercent: Number(productForm.discountPercent || 0)
    };

    if (editingProductId) {
      await productService.updateProduct(editingProductId, payload);
      addToast(`Updated product "${payload.title}"`);
    } else {
      await productService.createProduct(payload);
      addToast(`Added new product "${payload.title}" to catalog`);
    }
    setProductModalOpen(false);
  };

  const handleDeleteProduct = async (id, title) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      await productService.deleteProduct(id);
      addToast(`Product "${title}" removed from catalog`);
    }
  };

  const handleOpenUpdateStatus = (ord) => {
    setSelectedOrderForStatus(ord);
    setNewStatus(ord.status || 'Processing');
    setNewTracking(ord.trackingNumber || `TRK-LUNA-${Math.floor(10000000 + Math.random() * 90000000)}`);
    setStatusModalOpen(true);
  };

  const handleSaveStatus = async (e) => {
    e.preventDefault();
    if (!selectedOrderForStatus) return;

    await orderService.updateOrderStatus(selectedOrderForStatus.orderNumber || selectedOrderForStatus._id, newStatus, newTracking);
    
    // Update local state
    setOrdersList(prev => prev.map(o => {
      if ((o.orderNumber && o.orderNumber === selectedOrderForStatus.orderNumber) || o._id === selectedOrderForStatus._id) {
        return { ...o, status: newStatus, trackingNumber: newTracking };
      }
      return o;
    }));

    setStatusModalOpen(false);
    addToast(`Order #${selectedOrderForStatus.orderNumber} updated to ${newStatus}`);
  };

  return (
    <div className="admin-portal-view">
      <div className="container admin-container">
        {/* Admin Navigation and Title */}
        <div className="admin-header-row">
          <div>
            <span className="admin-tag-pill">OMS & INVENTORY PORTAL</span>
            <h1 className="admin-page-title">Store Management Console</h1>
          </div>
          <div className="admin-quick-actions">
            <button 
              type="button" 
              className="admin-add-prod-btn"
              onClick={handleOpenAddProduct}
            >
              <Plus size={16} /> Add Garment Variant
            </button>
          </div>
        </div>

        {/* Admin Tabs */}
        <div className="admin-nav-tabs">
          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <Layers size={17} /> Inventory & Catalog ({products.length})
          </button>
          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <ShoppingBag size={17} /> Order Management (OMS)
          </button>
          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 size={17} /> Analytics & Reports
          </button>
          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'crm' ? 'active' : ''}`}
            onClick={() => setActiveTab('crm')}
          >
            <Users size={17} /> CRM & Customers
          </button>
        </div>

        {/* Tab 1: Inventory Management */}
        {activeTab === 'inventory' && (
          <div className="admin-tab-content animate-fade">
            <div className="admin-toolbar-row">
              <div className="search-field-wrapper">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Filter garments by name, SKU, or category..."
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  className="admin-search-input"
                />
              </div>
              <span className="count-label">Showing {filteredProducts.length} items</span>
            </div>

            <div className="admin-table-responsive">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Garment</th>
                    <th>Category</th>
                    <th>SKU</th>
                    <th>Price</th>
                    <th>Sizes & Stock</th>
                    <th>Discount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => {
                    const totalStock = (p.sizes || []).reduce((sum, s) => sum + (s.stock ?? 10), 0);
                    return (
                      <tr key={p.id || p._id || p.sku}>
                        <td>
                          <div className="table-product-cell">
                            <img src={p.images?.[0]} alt={p.title} className="table-thumb" />
                            <div>
                              <strong>{p.title}</strong>
                              <span className="table-brand">{p.brand}</span>
                            </div>
                          </div>
                        </td>
                        <td><span className="category-tag-pill">{p.category}</span></td>
                        <td><code className="sku-code">{p.sku || 'LUNA-1002'}</code></td>
                        <td><strong>${p.price}</strong></td>
                        <td>
                          <div className="stock-chips-row">
                            <span className={`stock-level-chip ${totalStock < 10 ? 'low' : ''}`}>
                              {totalStock} in stock
                            </span>
                          </div>
                        </td>
                        <td>{p.discountPercent > 0 ? <span className="discount-tag">-{p.discountPercent}%</span> : '—'}</td>
                        <td>
                          <div className="table-actions-row">
                            <button 
                              type="button" 
                              className="action-icon-btn edit"
                              onClick={() => handleOpenEditProduct(p)}
                              title="Edit Garment"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button 
                              type="button" 
                              className="action-icon-btn delete"
                              onClick={() => handleDeleteProduct(p.id || p._id, p.title)}
                              title="Delete Garment"
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

        {/* Tab 2: Order Management System (OMS) */}
        {activeTab === 'orders' && (
          <div className="admin-tab-content animate-fade">
            <div className="admin-toolbar-row">
              <div className="search-field-wrapper">
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Search orders by # order number or customer name..."
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  className="admin-search-input"
                />
              </div>
            </div>

            <div className="admin-table-responsive">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Fulfillment Status</th>
                    <th>Tracking</th>
                    <th>Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((ord) => (
                    <tr key={ord.orderNumber || ord._id}>
                      <td><strong>#{ord.orderNumber}</strong></td>
                      <td>
                        <div>
                          <strong>{ord.customer?.fullName}</strong>
                          <span className="table-sub">{ord.customer?.email}</span>
                        </div>
                      </td>
                      <td>{ord.orderItems?.length || 1} items</td>
                      <td><strong>${ord.totalPrice?.toFixed(2)}</strong></td>
                      <td><span className="pm-tag">{ord.paymentMethod}</span></td>
                      <td>
                        <span className={`order-status-badge status-${(ord.status || 'Processing').toLowerCase()}`}>
                          {ord.status || 'Processing'}
                        </span>
                      </td>
                      <td>
                        <span className="tracking-snippet">{ord.trackingNumber || 'Unassigned'}</span>
                      </td>
                      <td>
                        <button 
                          type="button" 
                          className="update-status-pill-btn"
                          onClick={() => handleOpenUpdateStatus(ord)}
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Analytics & Reports */}
        {activeTab === 'analytics' && (
          <div className="admin-tab-content animate-fade">
            {/* KPI Cards */}
            <div className="admin-kpi-grid">
              <div className="kpi-metric-card">
                <span className="kpi-label">Total Gross Revenue</span>
                <h3 className="kpi-value">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h3>
                <span className="kpi-sub positive"><ArrowUpRight size={14} /> +18.4% vs last month</span>
              </div>
              <div className="kpi-metric-card">
                <span className="kpi-label">Total Orders Processed</span>
                <h3 className="kpi-value">{totalOrdersCount}</h3>
                <span className="kpi-sub positive"><ArrowUpRight size={14} /> +12.1% fulfillment rate</span>
              </div>
              <div className="kpi-metric-card">
                <span className="kpi-label">Average Order Value (AOV)</span>
                <h3 className="kpi-value">${avgOrderValue.toFixed(2)}</h3>
                <span className="kpi-sub positive"><ArrowUpRight size={14} /> +$24 with free shipping meter</span>
              </div>
              <div className="kpi-metric-card">
                <span className="kpi-label">Store Conversion Rate</span>
                <h3 className="kpi-value">{conversionRate}%</h3>
                <span className="kpi-sub positive"><ArrowUpRight size={14} /> Top 5% fashion benchmark</span>
              </div>
            </div>

            {/* Top Selling Products */}
            <div className="analytics-details-grid">
              <div className="analytics-box">
                <h4>Top Selling Garments</h4>
                <div className="top-selling-list">
                  {products.slice(0, 5).map((p, idx) => (
                    <div key={p.id || p._id || idx} className="top-selling-item">
                      <span className="rank-num">#{idx + 1}</span>
                      <img src={p.images?.[0]} alt={p.title} className="top-item-thumb" />
                      <div className="top-item-info">
                        <strong>{p.title}</strong>
                        <span>{p.category} • ${p.price}</span>
                      </div>
                      <span className="top-units-sold">{48 - idx * 7} units sold</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="analytics-box">
                <h4>Traffic & Acquisition Channels</h4>
                <div className="traffic-channels-list">
                  <div className="channel-bar-item">
                    <div className="channel-labels">
                      <span>Organic Search & SEO</span>
                      <strong>42%</strong>
                    </div>
                    <div className="channel-track"><div className="channel-fill" style={{ width: '42%' }} /></div>
                  </div>
                  <div className="channel-bar-item">
                    <div className="channel-labels">
                      <span>Instagram UGC & Social</span>
                      <strong>34%</strong>
                    </div>
                    <div className="channel-track"><div className="channel-fill" style={{ width: '34%' }} /></div>
                  </div>
                  <div className="channel-bar-item">
                    <div className="channel-labels">
                      <span>Direct & Editorial Archives</span>
                      <strong>16%</strong>
                    </div>
                    <div className="channel-track"><div className="channel-fill" style={{ width: '16%' }} /></div>
                  </div>
                  <div className="channel-bar-item">
                    <div className="channel-labels">
                      <span>Email Newsletter Campaigns</span>
                      <strong>8%</strong>
                    </div>
                    <div className="channel-track"><div className="channel-fill" style={{ width: '8%' }} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: CRM Customer Database */}
        {activeTab === 'crm' && (
          <div className="admin-tab-content animate-fade">
            <div className="crm-header-row">
              <h3>Customer Database & VIP Tiers</h3>
              <span className="text-muted">Direct communication and order lifetime value records</span>
            </div>

            <div className="admin-table-responsive">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Email Address</th>
                    <th>Tier</th>
                    <th>Orders Completed</th>
                    <th>Lifetime Spend</th>
                    <th>Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {crmCustomers.map((c) => (
                    <tr key={c.id}>
                      <td><strong>{c.name}</strong></td>
                      <td>{c.email}</td>
                      <td><span className="crm-tier-badge">{c.tier}</span></td>
                      <td>{c.ordersCount} orders</td>
                      <td><strong>${c.totalSpend.toFixed(2)}</strong></td>
                      <td>{c.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      <Modal
        isOpen={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        title={editingProductId ? 'Edit Garment Details' : 'Add New Garment to Catalog'}
        maxWidth="680px"
      >
        <form onSubmit={handleSaveProduct} className="admin-product-modal-form">
          <div className="form-group-block">
            <label className="field-label">Garment Title</label>
            <input 
              type="text" 
              placeholder="e.g. Italian Wool Double-Breasted Trench"
              value={productForm.title}
              onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
              required
              className="form-input"
            />
          </div>

          <div className="form-row-dual">
            <div className="form-group-block">
              <label className="field-label">Category</label>
              <select 
                value={productForm.category}
                onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                className="form-select"
              >
                <option value="Outerwear">Outerwear</option>
                <option value="Dresses">Dresses</option>
                <option value="Tops">Tops</option>
                <option value="Denim">Denim</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Activewear">Activewear</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div className="form-group-block">
              <label className="field-label">Silhouette / Fit</label>
              <select 
                value={productForm.fit}
                onChange={(e) => setProductForm({ ...productForm, fit: e.target.value })}
                className="form-select"
              >
                <option value="Relaxed">Relaxed</option>
                <option value="Slim">Slim</option>
                <option value="Oversized">Oversized</option>
                <option value="Tailored">Tailored</option>
              </select>
            </div>
          </div>

          <div className="form-row-dual">
            <div className="form-group-block">
              <label className="field-label">Retail Price ($)</label>
              <input 
                type="number" 
                placeholder="240"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                required
                className="form-input"
              />
            </div>
            <div className="form-group-block">
              <label className="field-label">Original Price (For Sale Strikethrough)</label>
              <input 
                type="number" 
                placeholder="300"
                value={productForm.originalPrice}
                onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group-block">
            <label className="field-label">Primary Image URL</label>
            <input 
              type="url" 
              placeholder="https://images.unsplash.com/..."
              value={productForm.images[0] || ''}
              onChange={(e) => setProductForm({ ...productForm, images: [e.target.value] })}
              required
              className="form-input"
            />
          </div>

          <div className="form-group-block">
            <label className="field-label">Material & Fabric</label>
            <input 
              type="text" 
              placeholder="100% Organic Cotton"
              value={productForm.material}
              onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group-block">
            <label className="field-label">Description</label>
            <textarea 
              rows={3}
              placeholder="Artisanal craftsmanship notes, cut details, handfeel..."
              value={productForm.description}
              onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
              className="form-textarea"
            />
          </div>

          <button type="submit" className="save-admin-btn">
            {editingProductId ? 'Save Product Changes' : 'Publish Product to Catalog'}
          </button>
        </form>
      </Modal>

      {/* Update Order Status Modal */}
      <Modal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        title={`Update Order Status #${selectedOrderForStatus?.orderNumber}`}
        maxWidth="480px"
      >
        <form onSubmit={handleSaveStatus} className="status-update-form">
          <div className="form-group-block">
            <label className="field-label">Fulfillment Status</label>
            <select 
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="form-select"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="form-group-block">
            <label className="field-label">Tracking Number</label>
            <input 
              type="text" 
              placeholder="TRK-LUNA-XXXXXXXX"
              value={newTracking}
              onChange={(e) => setNewTracking(e.target.value)}
              className="form-input"
            />
          </div>

          <button type="submit" className="primary-btn mt-4">
            Save Status & Notify Buyer
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
