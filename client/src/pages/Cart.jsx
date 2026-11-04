import React from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { useCart } from '../hooks/useCart.js';
import { CartItem } from '../components/cart/CartItem.jsx';
import { OrderSummary } from '../components/cart/OrderSummary.jsx';
import { ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export const Cart = () => {
  const { setActivePage } = useStore();
  const { cart, totalItemCount } = useCart();

  const handleProceedToCheckout = () => {
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="cart-page-view">
      <div className="container cart-page-container">
        {/* Header */}
        <div className="cart-page-header">
          <div>
            <h1 className="cart-page-title">Shopping Bag</h1>
            <span className="cart-subtitle">Review your selected garments ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})</span>
          </div>
          <button 
            type="button" 
            className="continue-shopping-btn"
            onClick={() => setActivePage('shop')}
          >
            <ArrowLeft size={16} /> Continue Shopping
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty-full-page">
            <div className="empty-icon-wrap">
              <ShoppingBag size={56} strokeWidth={1.5} />
            </div>
            <h2>Your Shopping Bag is Empty</h2>
            <p>Explore our seasonal drops, Italian tailored coats, and organic essentials.</p>
            <button 
              type="button" 
              className="explore-collection-btn"
              onClick={() => setActivePage('shop')}
            >
              Explore Collections <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div className="cart-page-grid">
            {/* Left Column: Cart items table */}
            <div className="cart-items-table-col">
              <div className="cart-items-wrapper">
                {cart.map((item, idx) => (
                  <CartItem 
                    key={`${item.productId}-${item.size}-${item.color}-${idx}`} 
                    item={item} 
                    index={idx} 
                  />
                ))}
              </div>

              {/* Guarantees Box */}
              <div className="cart-page-assurance-strip">
                <div className="assurance-item">
                  <ShieldCheck size={20} />
                  <div>
                    <strong>Secure Checkout</strong>
                    <p>Encrypted using 256-bit SSL protocols.</p>
                  </div>
                </div>
                <div className="assurance-item">
                  <Sparkles size={20} />
                  <div>
                    <strong>Complimentary Returns</strong>
                    <p>30-day effortless returns with prepaid shipping.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary with coupon & express checkout */}
            <div className="cart-summary-col">
              <OrderSummary onProceedToCheckout={handleProceedToCheckout} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
