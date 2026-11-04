import React from 'react';
import { useStore } from '../../context/StoreContext.jsx';
import { useCart } from '../../hooks/useCart.js';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer = () => {
  const { wishlist, wishlistOpen, setWishlistOpen, removeFromWishlist, openProduct, formatPrice, addToast } = useStore();
  const { addToCart } = useCart();

  if (!wishlistOpen) return null;

  return (
    <div className="cart-drawer-backdrop" onClick={() => setWishlistOpen(false)}>
      <div 
        className="cart-drawer-panel animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <div className="drawer-title-group">
            <Heart size={22} className="heart-icon-active" />
            <h3 className="drawer-title">Saved Wishlist</h3>
            <span className="drawer-item-count">({wishlist.length})</span>
          </div>
          <button 
            type="button" 
            className="drawer-close-btn"
            onClick={() => setWishlistOpen(false)}
            aria-label="Close wishlist drawer"
          >
            <X size={20} />
          </button>
        </div>

        {wishlist.length === 0 ? (
          <div className="drawer-empty-state">
            <div className="empty-cart-icon">
              <Heart size={48} strokeWidth={1.5} />
            </div>
            <h4>Your Wishlist is Empty</h4>
            <p>Save items you love by tapping the heart icon on any garment card.</p>
          </div>
        ) : (
          <div className="drawer-body">
            <div className="drawer-items-list">
              {wishlist.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <div className="cart-item-thumb-wrapper" onClick={() => { openProduct(item); setWishlistOpen(false); }}>
                    <img src={item.images?.[0] || item.image} alt={item.title} className="cart-item-thumb" />
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-header">
                      <span className="cart-item-brand">{item.brand || 'Luna Wear'}</span>
                      <button 
                        type="button" 
                        className="cart-item-remove-btn"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <h4 className="cart-item-title" onClick={() => { openProduct(item); setWishlistOpen(false); }}>
                      {item.title}
                    </h4>
                    <span className="cart-item-price">{formatPrice(item.price)}</span>
                    <button 
                      type="button" 
                      className="wishlist-add-to-cart-btn"
                      onClick={() => {
                        addToCart(item, item.sizes?.[0]?.size || 'M', item.colors?.[0]?.name || 'Classic');
                        removeFromWishlist(item.id);
                        addToast(`Moved "${item.title}" to your bag`);
                      }}
                    >
                      <ShoppingBag size={14} /> Move to Bag
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistDrawer;
