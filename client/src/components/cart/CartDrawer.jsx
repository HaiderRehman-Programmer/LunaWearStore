import React from 'react';
import { useStore } from '../../context/StoreContext.jsx';
import { useCart } from '../../hooks/useCart.js';
import { CartItem } from './CartItem.jsx';
import { OrderSummary } from './OrderSummary.jsx';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';

export const CartDrawer = () => {
  const { setActivePage } = useStore();
  const { cart, cartOpen, setCartOpen, totalItemCount } = useCart();

  if (!cartOpen) return null;

  const handleGoToCheckout = () => {
    setCartOpen(false);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToCartPage = () => {
    setCartOpen(false);
    setActivePage('cart');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="cart-drawer-backdrop" onClick={() => setCartOpen(false)}>
      <div 
        className="cart-drawer-panel animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <ShoppingBag size={22} />
            <h3 className="drawer-title">Shopping Bag</h3>
            <span className="drawer-item-count">({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})</span>
          </div>
          <button 
            type="button" 
            className="drawer-close-btn"
            onClick={() => setCartOpen(false)}
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        {cart.length === 0 ? (
          <div className="drawer-empty-state">
            <div className="empty-cart-icon">
              <ShoppingBag size={48} strokeWidth={1.5} />
            </div>
            <h4>Your Bag is Empty</h4>
            <p>Discover our curated collection of contemporary luxury garments.</p>
            <button 
              type="button" 
              className="drawer-explore-btn"
              onClick={() => {
                setCartOpen(false);
                setActivePage('shop');
              }}
            >
              Start Shopping <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="drawer-body">
            {/* Scrollable list of cart items */}
            <div className="drawer-items-list">
              {cart.map((item, idx) => (
                <CartItem key={`${item.productId}-${item.size}-${item.color}-${idx}`} item={item} index={idx} />
              ))}
            </div>

            {/* Cart Summary and Actions */}
            <div className="drawer-summary-footer">
              <OrderSummary onProceedToCheckout={handleGoToCheckout} />
              <button 
                type="button" 
                className="view-full-cart-link"
                onClick={handleGoToCartPage}
              >
                View Full Cart Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
