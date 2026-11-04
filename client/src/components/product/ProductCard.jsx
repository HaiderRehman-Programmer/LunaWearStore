import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext.jsx';
import { useCart } from '../../hooks/useCart.js';
import { Heart, Eye, ShoppingBag, Star } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { openProduct, setQuickViewProduct, toggleWishlist, isWishlisted, formatPrice } = useStore();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [isHovered, setIsHovered] = useState(false);

  const wishlisted = isWishlisted(product.id || product._id);

  // Active image based on color or hover state
  const colorObj = product.colors?.find(c => c.name === selectedColor);
  const primaryImg = colorObj?.image || product.images?.[0] || '';
  const hoverImg = product.images?.[1] || product.images?.[0] || primaryImg;

  const currentDisplayImg = isHovered && product.images?.length > 1 ? hoverImg : primaryImg;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    const defaultSize = product.sizes?.[0]?.size || 'M';
    addToCart(product, defaultSize, selectedColor || product.colors?.[0]?.name, 1);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div 
      className="product-card group"
      onClick={() => openProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-media-wrapper">
        <img 
          src={currentDisplayImg} 
          alt={product.title} 
          className="product-image transition-transform" 
          loading="lazy"
        />

        {/* Badges */}
        <div className="product-badges">
          {product.discountPercent > 0 && (
            <span className="badge-pill badge-sale">-{product.discountPercent}%</span>
          )}
          {product.isNewArrival && (
            <span className="badge-pill badge-new">NEW</span>
          )}
          {product.isBestSeller && !product.discountPercent && (
            <span className="badge-pill badge-hot">BEST SELLER</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={18} fill={wishlisted ? '#e63946' : 'none'} color={wishlisted ? '#e63946' : '#222'} />
        </button>

        {/* Action Overlay: Quick Add & Quick View */}
        <div className="product-action-overlay">
          <button 
            className="action-pill-btn quick-view-btn"
            onClick={handleQuickView}
            title="Quick View"
          >
            <Eye size={16} /> <span>Quick View</span>
          </button>
          <button 
            className="action-pill-btn quick-add-btn"
            onClick={handleQuickAdd}
            title="Add to Bag"
          >
            <ShoppingBag size={16} /> <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="product-info">
        <div className="product-meta-row">
          <span className="product-brand">{product.brand || 'Luna Wear'}</span>
          <div className="product-rating">
            <Star size={13} fill="#d4af37" color="#d4af37" />
            <span>{product.rating?.toFixed(1) || '4.8'}</span>
            <span className="rating-count">({product.numReviews || 12})</span>
          </div>
        </div>

        <h3 className="product-title" title={product.title}>{product.title}</h3>

        {/* Pricing */}
        <div className="product-pricing">
          <span className="current-price">{formatPrice(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="original-price">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="color-swatches" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((color) => (
              <button
                key={color.name}
                className={`color-swatch-dot ${selectedColor === color.name ? 'active' : ''}`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                onClick={() => setSelectedColor(color.name)}
                aria-label={`Select color ${color.name}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
