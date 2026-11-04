import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Plus, Minus, Tag, Truck, ArrowRight, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';

export const CartDrawer = () => {
  const {
    cartOpen, setCartOpen, cart, removeFromCart, updateCartQty,
    subtotal, discountAmount, shippingPrice, freeShippingThreshold, isFreeShipping, tax, totalPrice,
    appliedCoupon, couponError, applyCoupon, removeCoupon,
    formatPrice, setActivePage
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = () => {
    applyCoupon(couponInput);
  };

  const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal).toFixed(2);

  if (!cartOpen) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={() => setCartOpen(false)} />
      <div className="cart-drawer animate-popup" style={{ animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <h2>Your Bag</h2>
            <span className="cart-count-chip">{cart.reduce((t, i) => t + i.quantity, 0)} items</span>
          </div>
          <button className="drawer-close-btn" onClick={() => setCartOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty-state">
            <div className="cart-empty-icon">🛍️</div>
            <h3>Your bag is beautifully empty</h3>
            <p>Explore our luxury curated collections to start filling it.</p>
            <button className="btn-primary" onClick={() => { setActivePage('shop'); setCartOpen(false); }}>
              Browse Collections <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <>
            {/* Free Shipping Progress Bar */}
            <div className="free-shipping-bar">
              {isFreeShipping ? (
                <div className="free-ship-unlocked">
                  <Truck size={15} />
                  <span>🎉 Congratulations! You have unlocked <strong>complimentary shipping!</strong></span>
                </div>
              ) : (
                <div className="free-ship-progress-row">
                  <Truck size={15} />
                  <span>Add <strong>{formatPrice(amountToFreeShipping)}</strong> more for free shipping</span>
                </div>
              )}
              <div className="ship-progress-track">
                <div className="ship-progress-fill" style={{ width: `${freeShippingProgress}%` }} />
              </div>
            </div>

            {/* Cart Items */}
            <div className="cart-items-list">
              {cart.map((item, idx) => (
                <div key={idx} className="cart-item">
                  <img src={item.product.images?.[0]} alt={item.product.title} className="cart-item-img" />
                  <div className="cart-item-details">
                    <p className="cart-item-brand">{item.product.brand}</p>
                    <h4 className="cart-item-title">{item.product.title}</h4>
                    <div className="cart-item-meta">
                      <span className="cart-item-variant">Size: {item.size}</span>
                      {item.color && <span className="cart-item-variant">· {item.color}</span>}
                    </div>
                    <div className="cart-item-bottom">
                      <div className="cart-qty-adjuster">
                        <button onClick={() => updateCartQty(idx, item.quantity - 1)}>
                          <Minus size={13} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateCartQty(idx, item.quantity + 1)}>
                          <Plus size={13} />
                        </button>
                      </div>
                      <span className="cart-item-price">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  </div>
                  <button className="cart-item-remove" onClick={() => removeFromCart(idx)}>
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Coupon Field */}
            <div className="cart-coupon-section">
              {appliedCoupon ? (
                <div className="applied-coupon-chip">
                  <Tag size={14} />
                  <span>{appliedCoupon.code} — {appliedCoupon.discountPercent ? `${appliedCoupon.discountPercent}% Off` : 'Free Shipping'}</span>
                  <button className="remove-coupon-btn" onClick={removeCoupon}>
                    <X size={13} />
                  </button>
                </div>
              ) : (
                <div className="coupon-input-row">
                  <input
                    className="input-base coupon-input"
                    placeholder="Enter promo code (try LUNA20)"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()}
                  />
                  <button className="coupon-apply-btn" onClick={handleApplyCoupon}>
                    Apply
                  </button>
                </div>
              )}
              {couponError && <p className="coupon-error">{couponError}</p>}
            </div>

            {/* Order Summary */}
            <div className="cart-summary">
              <div className="cart-summary-rows">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="summary-row discount-row">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span>− {formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{isFreeShipping ? <span className="free-label">FREE</span> : formatPrice(shippingPrice)}</span>
                </div>
                <div className="summary-row">
                  <span>Estimated Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
              </div>
              <div className="summary-total-row">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="cart-cta-block">
              <button 
                className="btn-primary cart-checkout-btn"
                onClick={() => { setCartOpen(false); setActivePage('checkout'); }}
              >
                <ShieldCheck size={17} />
                Proceed to Checkout
                <ChevronRight size={17} />
              </button>
              <div className="express-checkout-row">
                <span className="express-or">or pay with</span>
                <div className="cart-express-btns">
                  <button className="express-btn paypal-btn">PayPal</button>
                  <button className="express-btn applepay-btn">Apple Pay</button>
                </div>
              </div>
            </div>

            {/* Payment Icons */}
            <div className="cart-payment-badges">
              <ShieldCheck size={14} className="security-icon" />
              <span>Secure checkout · SSL encrypted</span>
              <div className="payment-icon-row">
                <CreditCard size={20} />
                <span className="payment-icon-label">All major cards accepted</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
