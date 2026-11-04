import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Star, Zap, Eye } from 'lucide-react';

export const ProductCard = ({ product, showQuickView = true }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    openProduct, 
    setQuickViewProduct,
    formatPrice 
  } = useStore();

  if (!product) return null;

  const inWishlist = isInWishlist(product._id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, product.sizes?.[0]?.size, product.colors?.[0]?.name);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product._id);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div 
      className="product-card" 
      onClick={() => openProduct(product._id)}
      role="button"
      tabIndex={0}
    >
      {/* Image Container */}
      <div className="product-card-image-wrap">
        {/* Primary + Hover Image */}
        <img 
          src={product.images?.[0]} 
          alt={product.title}
          className="product-card-img product-card-img-front"
          loading="lazy"
        />
        {product.images?.[1] && (
          <img 
            src={product.images[1]} 
            alt={product.title}
            className="product-card-img product-card-img-back"
            loading="lazy"
          />
        )}

        {/* Floating Badges */}
        <div className="product-card-badges">
          {product.isNewArrival && (
            <span className="badge badge-dark">New</span>
          )}
          {hasDiscount && (
            <span className="badge badge-sale">-{product.discountPercent}%</span>
          )}
          {product.isBestSeller && (
            <span className="badge badge-gold">Best Seller</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className={`wishlist-icon-btn ${inWishlist ? 'wishlisted' : ''}`}
          onClick={handleWishlist}
          aria-label="Toggle Wishlist"
        >
          <Heart size={17} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>

        {/* Quick View overlay button */}
        {showQuickView && (
          <div className="quick-view-overlay">
            <button className="quick-view-btn" onClick={handleQuickView}>
              <Eye size={15} />
              Quick View
            </button>
          </div>
        )}

        {/* Color Swatches */}
        {product.colors && product.colors.length > 1 && (
          <div className="product-color-swatches">
            {product.colors.slice(0, 4).map((c, i) => (
              <div 
                key={i} 
                className="color-swatch-dot" 
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="color-swatch-more">+{product.colors.length - 4}</span>
            )}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-card-info">
        <div className="product-card-meta">
          <span className="product-card-brand">{product.brand}</span>
          <div className="product-card-rating">
            <Star size={12} fill="currentColor" color="#c5a880" />
            <span>{product.rating}</span>
            <span className="review-count">({product.numReviews})</span>
          </div>
        </div>

        <h3 className="product-card-title">{product.title}</h3>

        <div className="product-card-sizes">
          {product.sizes?.slice(0, 5).map((s, i) => (
            <span key={i} className={`size-chip ${s.stock === 0 ? 'size-chip-oos' : ''}`}>
              {s.size}
            </span>
          ))}
        </div>

        <div className="product-card-price-row">
          <div className="product-card-prices">
            <span className="price-current">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="price-original">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <button 
            className="add-to-bag-btn" 
            onClick={handleAddToCart}
            aria-label="Add to Bag"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
