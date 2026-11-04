import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext.jsx';
import { useCart } from '../../hooks/useCart.js';
import { ApplePayIcon, GooglePayIcon, PayPalIcon } from '../common/Icons.jsx';
import { Tag, ArrowRight, Check, X, ShieldCheck, Truck } from 'lucide-react';

export const OrderSummary = ({ onProceedToCheckout, isCheckoutPage = false }) => {
  const { formatPrice, setActivePage } = useStore();
  const { totals, coupon, applyCouponCode, removeCoupon } = useCart();
  
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState(null);
  const [applying, setApplying] = useState(false);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput) return;
    setApplying(true);
    setCouponFeedback(null);

    const result = await applyCouponCode(couponInput);
    setCouponFeedback(result);
    setApplying(false);
    if (result.success) {
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    if (onProceedToCheckout) {
      onProceedToCheckout();
    } else {
      setActivePage('checkout');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="order-summary-card">
      <h3 className="order-summary-title">Order Summary</h3>

      {/* Free Shipping Progress Meter */}
      <div className="free-shipping-meter-box">
        <div className="meter-label-row">
          <Truck size={16} className="meter-icon" />
          {totals.amountToFreeShipping > 0 ? (
            <span>Add <strong>{formatPrice(totals.amountToFreeShipping)}</strong> more for <strong>Free Express Shipping</strong></span>
          ) : (
            <span className="unlocked-text">🎉 You've unlocked <strong>Complimentary Express Shipping</strong>!</span>
          )}
        </div>
        <div className="shipping-progress-track">
          <div 
            className="shipping-progress-bar"
            style={{ width: `${Math.min(100, ((totals.subtotal) / totals.freeShippingThreshold) * 100)}%` }}
          />
        </div>
      </div>

      {/* Coupon redemption box */}
      <div className="coupon-box-section">
        {coupon ? (
          <div className="applied-coupon-pill">
            <div className="coupon-pill-left">
              <Tag size={15} />
              <span className="coupon-code-text">{coupon.code}</span>
              <span className="coupon-discount-text">(-{coupon.discountPercent}%)</span>
            </div>
            <button 
              type="button" 
              className="remove-coupon-btn"
              onClick={removeCoupon}
              aria-label="Remove coupon"
            >
              <X size={15} />
            </button>
          </div>
        ) : (
          <div className="coupon-input-group">
            <input 
              type="text" 
              placeholder="Promo code (e.g. LUNA20)"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleApplyCoupon(e);
                }
              }}
              className="coupon-field"
            />
            <button 
              type="button" 
              className="apply-coupon-btn"
              onClick={handleApplyCoupon}
              disabled={applying || !couponInput.trim()}
            >
              Apply
            </button>
          </div>
        )}

        {couponFeedback && (
          <p className={`coupon-feedback-msg ${couponFeedback.success ? 'success' : 'error'}`}>
            {couponFeedback.message}
          </p>
        )}
      </div>

      {/* Line Item Totals Breakdown */}
      <div className="summary-breakdown-list">
        <div className="summary-row">
          <span className="row-label">Items Subtotal</span>
          <span className="row-value">{formatPrice(totals.subtotal)}</span>
        </div>

        {totals.discountAmount > 0 && (
          <div className="summary-row row-discount">
            <span className="row-label">Promo Savings ({coupon?.code})</span>
            <span className="row-value">-{formatPrice(totals.discountAmount)}</span>
          </div>
        )}

        <div className="summary-row">
          <span className="row-label">Estimated Shipping</span>
          <span className="row-value">
            {totals.shipping === 0 ? <span className="free-tag">FREE</span> : formatPrice(totals.shipping)}
          </span>
        </div>

        <div className="summary-row">
          <span className="row-label">Estimated Tax (8%)</span>
          <span className="row-value">{formatPrice(totals.tax)}</span>
        </div>

        <hr className="summary-divider" />

        <div className="summary-row summary-grand-total">
          <span className="total-label">Grand Total</span>
          <span className="total-amount">{formatPrice(totals.total)}</span>
        </div>
      </div>

      {/* Checkout CTA */}
      {!isCheckoutPage && (
        <>
          <button 
            type="button" 
            className="proceed-checkout-btn"
            onClick={handleCheckout}
            disabled={totals.subtotal <= 0}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={18} />
          </button>

          {/* Express Checkout Options */}
          <div className="express-checkout-divider">
            <span>OR EXPRESS CHECKOUT</span>
          </div>

          <div className="express-checkout-buttons-grid">
            <button 
              type="button" 
              className="express-btn btn-apple-pay"
              onClick={handleCheckout}
            >
              <ApplePayIcon />
            </button>
            <button 
              type="button" 
              className="express-btn btn-google-pay"
              onClick={handleCheckout}
            >
              <GooglePayIcon />
            </button>
            <button 
              type="button" 
              className="express-btn btn-paypal"
              onClick={handleCheckout}
            >
              <PayPalIcon />
            </button>
          </div>
        </>
      )}

      {/* Trust reassurance */}
      <div className="summary-trust-badge">
        <ShieldCheck size={16} />
        <span>30-Day Money-Back Guarantee & Secure 256-Bit SSL Checkout</span>
      </div>
    </div>
  );
};

export default OrderSummary;
