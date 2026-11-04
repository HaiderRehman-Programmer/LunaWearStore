import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle, Package, Truck, MapPin, Download, ArrowRight, Copy } from 'lucide-react';

export const OrderConfirmationPage = () => {
  const { lastPlacedOrder, setActivePage, formatPrice } = useStore();
  const [copied, setCopied] = useState(false);

  if (!lastPlacedOrder) {
    return (
      <div className="order-confirm-empty">
        <p>No recent order found.</p>
        <button className="btn-primary" onClick={() => setActivePage('home')}>Return to Home</button>
      </div>
    );
  }

  const order = lastPlacedOrder;
  const copyOrderNumber = () => {
    navigator.clipboard?.writeText(order.orderNumber || order._id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="order-confirm-page">
      <div className="container-narrow">
        {/* Success Header */}
        <div className="order-success-header">
          <div className="order-success-icon-ring">
            <CheckCircle size={52} color="#059669" />
          </div>
          <h1 className="order-success-title">Order Confirmed! 🎉</h1>
          <p className="order-success-subtitle">
            Thank you, <strong>{order.customer?.fullName || 'Valued Customer'}</strong>!<br />
            Your order has been received and is now being prepared with care.
          </p>
          <div className="order-number-badge">
            <span className="order-num-label">Order Number</span>
            <div className="order-num-display">
              <strong>{order.orderNumber || order._id}</strong>
              <button className="copy-order-btn" onClick={copyOrderNumber} title="Copy order number">
                {copied ? <CheckCircle size={15} color="#059669" /> : <Copy size={15} />}
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Status */}
        <div className="order-timeline-card">
          <h3>Order Timeline</h3>
          <div className="order-timeline">
            <div className="timeline-step completed">
              <div className="timeline-dot"><CheckCircle size={18} /></div>
              <div className="timeline-info">
                <span className="timeline-label">Order Placed</span>
                <span className="timeline-time">{new Date(order.createdAt || Date.now()).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
              </div>
            </div>
            <div className="timeline-connector" />
            <div className={`timeline-step ${order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered' ? 'active' : ''}`}>
              <div className="timeline-dot"><Package size={18} /></div>
              <div className="timeline-info">
                <span className="timeline-label">Processing & Packing</span>
                <span className="timeline-time">Estimated 1-2 business days</span>
              </div>
            </div>
            <div className="timeline-connector" />
            <div className={`timeline-step ${order.status === 'Shipped' || order.status === 'Delivered' ? 'active' : ''}`}>
              <div className="timeline-dot"><Truck size={18} /></div>
              <div className="timeline-info">
                <span className="timeline-label">Dispatched for Delivery</span>
                {order.trackingNumber && (
                  <span className="timeline-tracking">Tracking: <strong>{order.trackingNumber}</strong></span>
                )}
              </div>
            </div>
            <div className="timeline-connector" />
            <div className={`timeline-step ${order.status === 'Delivered' ? 'completed' : ''}`}>
              <div className="timeline-dot"><MapPin size={18} /></div>
              <div className="timeline-info">
                <span className="timeline-label">Delivered</span>
                <span className="timeline-time">{order.deliveryMethod?.estimatedDays || '3-5 Business Days'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items Summary */}
        <div className="order-confirm-details-card">
          <h3>What You Ordered</h3>
          <div className="order-confirm-items">
            {order.orderItems?.map((item, i) => (
              <div key={i} className="order-confirm-item">
                <img src={item.image} alt={item.title} className="order-confirm-item-img" />
                <div className="order-confirm-item-info">
                  <p className="order-confirm-item-title">{item.title}</p>
                  <p className="order-confirm-item-meta">Size: {item.size} · {item.color} · Qty: {item.quantity}</p>
                </div>
                <span className="order-confirm-item-price">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="order-confirm-totals">
            {order.discountAmount > 0 && (
              <div className="confirm-total-row">
                <span>Discount</span>
                <span className="discount-amount">−{formatPrice(order.discountAmount)}</span>
              </div>
            )}
            <div className="confirm-total-row">
              <span>Shipping</span>
              <span>{order.shippingPrice === 0 ? <span className="free-label">FREE</span> : formatPrice(order.shippingPrice)}</span>
            </div>
            <div className="confirm-total-row">
              <span>Tax</span>
              <span>{formatPrice(order.tax)}</span>
            </div>
            <div className="confirm-grand-total">
              <span>Total Paid</span>
              <span>{formatPrice(order.totalPrice)}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="order-confirm-address-card">
          <div className="confirm-address-col">
            <h4>Delivering To</h4>
            <p>{order.customer?.fullName}</p>
            <p>{order.shippingAddress?.address}</p>
            <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}</p>
            <p>{order.shippingAddress?.country}</p>
          </div>
          <div className="confirm-address-col">
            <h4>Contact & Payment</h4>
            <p>{order.customer?.email}</p>
            {order.customer?.phone && <p>{order.customer.phone}</p>}
            <p className="payment-method-tag">Payment: {order.paymentMethod?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="order-confirm-actions">
          <button 
            className="btn-primary"
            onClick={() => setActivePage('account')}
          >
            <Package size={17} /> Track My Order
          </button>
          <button 
            className="btn-secondary"
            onClick={() => setActivePage('shop')}
          >
            Continue Shopping <ArrowRight size={17} />
          </button>
        </div>

        {/* Confirmation Email Note */}
        <p className="order-email-notice">
          A detailed order confirmation has been sent to <strong>{order.customer?.email}</strong>.
          Check your inbox for tracking updates.
        </p>
      </div>
    </div>
  );
};
