import React from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Printer, 
  Download,
  ShieldCheck 
} from 'lucide-react';

export const OrderConfirmation = () => {
  const { confirmedOrder, setActivePage, formatPrice } = useStore();

  const order = confirmedOrder || {
    orderNumber: 'LUNA-982341',
    trackingNumber: 'TRK-LUNA-89234190',
    status: 'Processing',
    createdAt: new Date().toISOString(),
    customer: { fullName: 'Haider Rehman', email: 'haider@lunawear.com' },
    shippingAddress: {
      fullName: 'Haider Rehman',
      address: '742 Evergreen Terrace, Suite 4B',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      country: 'United States'
    },
    deliveryMethod: { name: 'Standard Tracked Shipping', estimatedDays: '3–5 Business Days' },
    orderItems: [
      {
        title: 'Minimalist Cashmere Overcoat',
        price: 340,
        quantity: 1,
        size: 'L',
        color: 'Camel Tan',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80'
      }
    ],
    subtotal: 340,
    shippingPrice: 0,
    tax: 27.2,
    discountAmount: 0,
    totalPrice: 367.2
  };

  const trackingStages = [
    { label: 'Order Confirmed', completed: true, date: 'Today' },
    { label: 'Tailoring & QC', completed: true, date: 'Today' },
    { label: 'Dispatched to Courier', completed: false, date: 'Expected Tomorrow' },
    { label: 'Out for Delivery', completed: false, date: 'Within 3 days' },
    { label: 'Delivered', completed: false, date: 'Estimated 3-5 days' }
  ];

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="order-confirmation-view">
      <div className="container confirmation-container">
        {/* Success Header */}
        <div className="confirmation-header-banner">
          <div className="success-badge-circle">
            <CheckCircle2 size={40} className="check-icon" />
          </div>
          <span className="conf-eyebrow">ORDER CONFIRMED</span>
          <h1 className="conf-heading">Thank You For Your Order!</h1>
          <p className="conf-subtext">
            We’ve emailed your confirmation receipt and delivery tracking updates to <strong>{order.customer?.email}</strong>.
          </p>
        </div>

        {/* Order Details Top Bar */}
        <div className="order-meta-card">
          <div className="meta-info-col">
            <span className="meta-label">Order Number</span>
            <strong className="meta-value">#{order.orderNumber}</strong>
          </div>
          <div className="meta-info-col">
            <span className="meta-label">Tracking Number</span>
            <strong className="meta-value tracking-code">{order.trackingNumber}</strong>
          </div>
          <div className="meta-info-col">
            <span className="meta-label">Est. Delivery</span>
            <strong className="meta-value">{order.deliveryMethod?.estimatedDays || '3–5 Business Days'}</strong>
          </div>
          <div className="meta-actions-col">
            <button type="button" className="receipt-action-btn" onClick={handlePrintReceipt}>
              <Printer size={15} /> Print Receipt
            </button>
          </div>
        </div>

        {/* Interactive Delivery Tracking Timeline */}
        <div className="tracking-timeline-card">
          <div className="timeline-title-row">
            <Truck size={20} />
            <h3>Live Shipment Progress</h3>
          </div>
          <div className="timeline-steps-track">
            {trackingStages.map((stage, idx) => (
              <div key={idx} className={`timeline-stage-item ${stage.completed ? 'completed' : ''}`}>
                <div className="stage-node-circle">
                  {stage.completed ? <CheckCircle2 size={16} /> : <span>{idx + 1}</span>}
                </div>
                <span className="stage-name">{stage.label}</span>
                <span className="stage-date">{stage.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order Receipt and Items Grid */}
        <div className="receipt-breakdown-grid">
          {/* Purchased Items */}
          <div className="receipt-items-card">
            <h3>Items in this Shipment ({order.orderItems?.length || 1})</h3>
            <div className="receipt-items-table">
              {order.orderItems?.map((item, idx) => (
                <div key={idx} className="receipt-item-row">
                  <img src={item.image} alt={item.title} className="receipt-item-thumb" />
                  <div className="receipt-item-info">
                    <h4>{item.title}</h4>
                    <p className="item-specs">{item.size} • {item.color} • Qty {item.quantity}</p>
                  </div>
                  <span className="receipt-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Subtotal table */}
            <div className="receipt-totals-box">
              <div className="tot-row">
                <span>Subtotal</span>
                <span>${order.subtotal?.toFixed(2)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="tot-row discount-row">
                  <span>Discount</span>
                  <span>-${order.discountAmount?.toFixed(2)}</span>
                </div>
              )}
              <div className="tot-row">
                <span>Shipping</span>
                <span>{order.shippingPrice === 0 ? 'FREE' : `$${order.shippingPrice?.toFixed(2)}`}</span>
              </div>
              <div className="tot-row">
                <span>Estimated Tax</span>
                <span>${order.tax?.toFixed(2)}</span>
              </div>
              <hr />
              <div className="tot-row grand-tot-row">
                <strong>Total Paid</strong>
                <strong>${order.totalPrice?.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          {/* Shipping & Payment details */}
          <div className="receipt-delivery-card">
            <h3>Shipping Destination</h3>
            <div className="destination-info-box">
              <MapPin size={18} className="loc-icon" />
              <div>
                <strong>{order.shippingAddress?.fullName}</strong>
                <p>{order.shippingAddress?.address}</p>
                <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}</p>
                <p>{order.shippingAddress?.country}</p>
              </div>
            </div>

            <hr className="receipt-subdivider" />

            <h3>Delivery Method</h3>
            <p className="delivery-method-name">{order.deliveryMethod?.name || 'Standard Tracked Shipping'}</p>

            <hr className="receipt-subdivider" />

            <div className="support-cta-box">
              <h4>Questions about your order?</h4>
              <p>Our dedicated styling concierge is available 24/7 to assist with changes or sizing adjustments.</p>
              <button 
                type="button" 
                className="return-to-store-btn"
                onClick={() => setActivePage('shop')}
              >
                Continue Shopping <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
