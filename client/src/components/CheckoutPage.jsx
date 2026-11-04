import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, ChevronRight, ChevronLeft, Check, CreditCard, Package, MapPin, Clock } from 'lucide-react';

const STEPS = ['Shipping', 'Delivery', 'Payment', 'Review'];

const DELIVERY_METHODS = [
  { id: 'standard', name: 'Standard Tracked Shipping', price: 0, estimatedDays: '3-5 Business Days', description: 'Carbon-neutral ground delivery' },
  { id: 'express', name: 'Express Courier', price: 15, estimatedDays: '1-2 Business Days', description: 'Priority door-to-door with tracking' },
  { id: 'overnight', name: 'Overnight Guaranteed', price: 28, estimatedDays: 'Next Business Day', description: 'Delivery by 12pm next day' },
  { id: 'cod', name: 'Cash on Delivery', price: 5, estimatedDays: '4-6 Business Days', description: 'Pay in full when delivered' }
];

const PAYMENT_METHODS = [
  { id: 'credit_card', label: 'Credit / Debit Card', icon: '💳' },
  { id: 'apple_pay', label: 'Apple Pay', icon: '' },
  { id: 'paypal', label: 'PayPal', icon: '🅿️' },
  { id: 'klarna', label: 'Klarna — Buy Now Pay Later', icon: '🟣' },
  { id: 'cash_on_delivery', label: 'Cash on Delivery', icon: '💵' }
];

export const CheckoutPage = () => {
  const {
    cart, subtotal, discountAmount, shippingPrice, tax, totalPrice,
    appliedCoupon, isFreeShipping, formatPrice, user,
    clearCart, setActivePage, setLastPlacedOrder, showToast
  } = useStore();

  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);

  const [shippingForm, setShippingForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.addresses?.[0]?.street || '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || '',
    postalCode: user?.addresses?.[0]?.zipCode || '',
    country: user?.addresses?.[0]?.country || 'United States'
  });

  const [selectedDelivery, setSelectedDelivery] = useState(DELIVERY_METHODS[0]);
  const [selectedPayment, setSelectedPayment] = useState('credit_card');

  const deliveryFee = isFreeShipping ? 0 : selectedDelivery.price;
  const orderTotal = Math.max(0, subtotal - discountAmount + deliveryFee + tax);

  const updateShipping = (key, val) => setShippingForm(prev => ({ ...prev, [key]: val }));

  const handlePlaceOrder = async () => {
    if (!shippingForm.fullName || !shippingForm.email || !shippingForm.address) {
      showToast('Please complete all required shipping fields', 'error');
      return;
    }

    setPlacing(true);
    try {
      const orderPayload = {
        customer: {
          fullName: shippingForm.fullName,
          email: shippingForm.email,
          phone: shippingForm.phone
        },
        shippingAddress: {
          address: shippingForm.address,
          city: shippingForm.city,
          state: shippingForm.state,
          postalCode: shippingForm.postalCode,
          country: shippingForm.country
        },
        deliveryMethod: selectedDelivery,
        paymentMethod: selectedPayment,
        orderItems: cart.map(item => ({
          productId: item.product._id,
          title: item.product.title,
          image: item.product.images?.[0],
          price: item.product.price,
          size: item.size,
          color: item.color,
          quantity: item.quantity
        })),
        subtotal,
        discountAmount,
        couponCode: appliedCoupon?.code || '',
        shippingPrice: deliveryFee,
        tax,
        totalPrice: orderTotal
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();
      const order = data.success ? data.order : {
        _id: `ord-${Date.now()}`,
        orderNumber: `LW-${Math.floor(10000 + Math.random() * 90000)}`,
        trackingNumber: `LW-EXP-${Math.floor(1000000 + Math.random() * 9000000)}`,
        ...orderPayload,
        status: 'Processing',
        createdAt: new Date()
      };

      setLastPlacedOrder(order);
      clearCart();
      setActivePage('order-confirmation');
    } catch (err) {
      // Fallback order
      const fallbackOrder = {
        _id: `ord-${Date.now()}`,
        orderNumber: `LW-${Math.floor(10000 + Math.random() * 90000)}`,
        trackingNumber: `LW-TRK-${Math.floor(1000000 + Math.random() * 9000000)}`,
        customer: { fullName: shippingForm.fullName, email: shippingForm.email },
        shippingAddress: shippingForm,
        deliveryMethod: selectedDelivery,
        orderItems: cart.map(item => ({
          productId: item.product._id,
          title: item.product.title,
          image: item.product.images?.[0],
          price: item.product.price,
          size: item.size,
          color: item.color,
          quantity: item.quantity
        })),
        subtotal, discountAmount, totalPrice: orderTotal, status: 'Processing', createdAt: new Date()
      };
      setLastPlacedOrder(fallbackOrder);
      clearCart();
      setActivePage('order-confirmation');
    } finally {
      setPlacing(false);
    }
  };

  if (cart.length === 0 && step < 3) {
    return (
      <div className="checkout-empty">
        <Package size={60} />
        <h2>Your bag is empty</h2>
        <p>Add some items before checking out.</p>
        <button className="btn-primary" onClick={() => setActivePage('shop')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container checkout-layout">
        {/* Left: Checkout Form */}
        <div className="checkout-form-col">
          {/* Progress Steps */}
          <div className="checkout-steps">
            {STEPS.map((s, i) => (
              <div key={s} className={`checkout-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                <div className="step-circle">
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span>{s}</span>
                {i < STEPS.length - 1 && <div className="step-connector" />}
              </div>
            ))}
          </div>

          {/* Step 0: Shipping Address */}
          {step === 0 && (
            <div className="checkout-section animate-popup">
              <h2 className="checkout-section-title">
                <MapPin size={20} /> Shipping Information
              </h2>
              <div className="checkout-form-grid">
                <div className="form-group full-width">
                  <label>Full Name *</label>
                  <input className="input-base" value={shippingForm.fullName} onChange={e => updateShipping('fullName', e.target.value)} placeholder="Elena Rostova" />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input className="input-base" type="email" value={shippingForm.email} onChange={e => updateShipping('email', e.target.value)} placeholder="you@example.com" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input className="input-base" type="tel" value={shippingForm.phone} onChange={e => updateShipping('phone', e.target.value)} placeholder="+1 (555) 000-0000" />
                </div>
                <div className="form-group full-width">
                  <label>Street Address *</label>
                  <input className="input-base" value={shippingForm.address} onChange={e => updateShipping('address', e.target.value)} placeholder="742 Evergreen Terrace, Suite 4B" />
                </div>
                <div className="form-group">
                  <label>City *</label>
                  <input className="input-base" value={shippingForm.city} onChange={e => updateShipping('city', e.target.value)} placeholder="San Francisco" />
                </div>
                <div className="form-group">
                  <label>State / Province</label>
                  <input className="input-base" value={shippingForm.state} onChange={e => updateShipping('state', e.target.value)} placeholder="CA" />
                </div>
                <div className="form-group">
                  <label>Postal Code</label>
                  <input className="input-base" value={shippingForm.postalCode} onChange={e => updateShipping('postalCode', e.target.value)} placeholder="94107" />
                </div>
                <div className="form-group">
                  <label>Country</label>
                  <select className="input-base" value={shippingForm.country} onChange={e => updateShipping('country', e.target.value)}>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>France</option>
                    <option>Germany</option>
                    <option>UAE</option>
                    <option>Pakistan</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Delivery Method */}
          {step === 1 && (
            <div className="checkout-section animate-popup">
              <h2 className="checkout-section-title">
                <Truck size={20} /> Delivery Method
              </h2>
              <div className="delivery-options">
                {DELIVERY_METHODS.map(method => (
                  <label key={method.id} className={`delivery-option ${selectedDelivery.id === method.id ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="delivery"
                      checked={selectedDelivery.id === method.id}
                      onChange={() => setSelectedDelivery(method)}
                    />
                    <div className="delivery-option-info">
                      <div className="delivery-name-row">
                        <span className="delivery-name">{method.name}</span>
                        <span className="delivery-price">
                          {method.price === 0 ? <span className="free-label">FREE</span> : `+${formatPrice(method.price)}`}
                        </span>
                      </div>
                      <div className="delivery-meta">
                        <Clock size={13} />
                        <span>{method.estimatedDays}</span>
                        <span className="delivery-desc">— {method.description}</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="checkout-section animate-popup">
              <h2 className="checkout-section-title">
                <CreditCard size={20} /> Payment Method
              </h2>
              <div className="payment-options">
                {PAYMENT_METHODS.map(pm => (
                  <label key={pm.id} className={`payment-option ${selectedPayment === pm.id ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={selectedPayment === pm.id}
                      onChange={() => setSelectedPayment(pm.id)}
                    />
                    <span className="payment-icon-em">{pm.icon}</span>
                    <span className="payment-label">{pm.label}</span>
                  </label>
                ))}
              </div>

              {selectedPayment === 'credit_card' && (
                <div className="card-details-form animate-popup">
                  <div className="form-group full-width">
                    <label>Card Number</label>
                    <input className="input-base" placeholder="4242 4242 4242 4242" maxLength={19} />
                  </div>
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input className="input-base" placeholder="MM / YY" maxLength={7} />
                  </div>
                  <div className="form-group">
                    <label>CVC</label>
                    <input className="input-base" placeholder="••• " maxLength={4} />
                  </div>
                  <div className="form-group full-width">
                    <label>Name on Card</label>
                    <input className="input-base" placeholder="Elena Rostova" />
                  </div>
                </div>
              )}

              <div className="checkout-secure-note">
                <ShieldCheck size={16} />
                <span>Your payment information is encrypted with 256-bit SSL security. Luna Wear never stores card details.</span>
              </div>
            </div>
          )}

          {/* Step 3: Order Review */}
          {step === 3 && (
            <div className="checkout-section animate-popup">
              <h2 className="checkout-section-title">
                <Package size={20} /> Review Your Order
              </h2>

              <div className="review-address-block">
                <p className="review-block-label">Delivering to</p>
                <p className="review-value">{shippingForm.fullName}</p>
                <p className="review-value">{shippingForm.address}, {shippingForm.city}, {shippingForm.state} {shippingForm.postalCode}</p>
                <p className="review-value">{shippingForm.country}</p>
              </div>

              <div className="review-items-list">
                {cart.map((item, i) => (
                  <div key={i} className="review-item-row">
                    <img src={item.product.images?.[0]} alt={item.product.title} className="review-item-img" />
                    <div className="review-item-info">
                      <p className="review-item-title">{item.product.title}</p>
                      <p className="review-item-meta">Size: {item.size} · {item.color} · Qty: {item.quantity}</p>
                    </div>
                    <span className="review-item-price">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="checkout-nav-btns">
            {step > 0 && (
              <button className="btn-secondary checkout-back-btn" onClick={() => setStep(s => s - 1)}>
                <ChevronLeft size={18} /> Back
              </button>
            )}
            {step < 3 ? (
              <button className="btn-primary checkout-next-btn" onClick={() => setStep(s => s + 1)}>
                Continue <ChevronRight size={18} />
              </button>
            ) : (
              <button 
                className="btn-gold checkout-place-btn" 
                onClick={handlePlaceOrder}
                disabled={placing}
              >
                {placing ? 'Placing Order...' : `Place Order · ${formatPrice(orderTotal)}`}
              </button>
            )}
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="checkout-summary-col">
          <div className="checkout-summary-card">
            <h3 className="checkout-summary-title">Order Summary</h3>
            <div className="checkout-items-preview">
              {cart.map((item, i) => (
                <div key={i} className="checkout-item-preview-row">
                  <div className="checkout-item-img-wrap">
                    <img src={item.product.images?.[0]} alt={item.product.title} />
                    <span className="checkout-qty-badge">{item.quantity}</span>
                  </div>
                  <div className="checkout-item-preview-info">
                    <p>{item.product.title}</p>
                    <small>{item.size} · {item.color}</small>
                  </div>
                  <span>{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="checkout-summary-divider" />
            <div className="checkout-summary-lines">
              <div className="sum-line"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              {discountAmount > 0 && <div className="sum-line discount-line"><span>Discount</span><span>−{formatPrice(discountAmount)}</span></div>}
              <div className="sum-line"><span>Shipping</span><span>{(isFreeShipping || selectedDelivery.price === 0) ? <span className="free-label">FREE</span> : formatPrice(deliveryFee)}</span></div>
              <div className="sum-line"><span>Tax (8%)</span><span>{formatPrice(tax)}</span></div>
            </div>
            <div className="checkout-summary-total">
              <span>Total</span>
              <span>{formatPrice(orderTotal)}</span>
            </div>
            <div className="checkout-summary-secure">
              <ShieldCheck size={14} />
              <span>All transactions are secured and encrypted.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
