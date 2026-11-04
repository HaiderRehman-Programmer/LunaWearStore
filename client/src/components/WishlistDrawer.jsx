import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistDrawer = () => {
  const { wishlistOpen, setWishlistOpen, wishlist, products, openProduct, addToCart, toggleWishlist, formatPrice, setActivePage } = useStore();

  if (!wishlistOpen) return null;

  const wishlistProducts = products.filter(p => wishlist.includes(p._id));

  return (
    <>
      <div className="drawer-overlay" onClick={() => setWishlistOpen(false)} />
      <div className="cart-drawer animate-popup" style={{ animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <div className="cart-drawer-header">
          <div className="cart-header-title">
            <h2>Wishlist</h2>
            <span className="cart-count-chip">{wishlistProducts.length} saved</span>
          </div>
          <button className="drawer-close-btn" onClick={() => setWishlistOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="cart-empty-state">
            <div className="cart-empty-icon">❤️</div>
            <h3>Your wishlist is empty</h3>
            <p>Save pieces you love by tapping the heart icon on any product.</p>
            <button className="btn-primary" onClick={() => { setActivePage('shop'); setWishlistOpen(false); }}>
              Browse Collections <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="cart-items-list">
            {wishlistProducts.map(product => (
              <div key={product._id} className="cart-item">
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="cart-item-img"
                  onClick={() => { openProduct(product._id); setWishlistOpen(false); }}
                  style={{ cursor: 'pointer' }}
                />
                <div className="cart-item-details">
                  <p className="cart-item-brand">{product.brand}</p>
                  <h4 
                    className="cart-item-title" 
                    onClick={() => { openProduct(product._id); setWishlistOpen(false); }}
                    style={{ cursor: 'pointer' }}
                  >
                    {product.title}
                  </h4>
                  <span className="cart-item-price">{formatPrice(product.price)}</span>
                  <button
                    className="btn-primary btn-sm"
                    style={{ marginTop: '8px', width: '100%' }}
                    onClick={() => addToCart(product, product.sizes?.[0]?.size, product.colors?.[0]?.name)}
                  >
                    <ShoppingBag size={14} />
                    Add to Bag
                  </button>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => toggleWishlist(product._id)}
                  title="Remove from wishlist"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
