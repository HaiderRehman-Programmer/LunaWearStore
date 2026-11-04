import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext.jsx';
import { useCart } from '../../hooks/useCart.js';
import { Modal } from '../common/Modal.jsx';
import { SizePicker } from './SizePicker.jsx';
import { Star, ShoppingBag, ArrowRight } from 'lucide-react';

export const QuickViewModal = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    openProduct, 
    setSizeGuideModalOpen, 
    formatPrice 
  } = useStore();
  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const activeColor = selectedColor || product.colors?.[0]?.name || 'Classic';
  const activeSize = selectedSize || product.sizes?.[0]?.size || 'M';

  const colorObj = product.colors?.find(c => c.name === activeColor);
  const mainImage = colorObj?.image || product.images?.[0] || '';

  const handleAddToCart = () => {
    addToCart(product, activeSize, activeColor, quantity);
    setQuickViewProduct(null);
  };

  const handleViewFullPage = () => {
    openProduct(product);
    setQuickViewProduct(null);
  };

  return (
    <Modal
      isOpen={Boolean(quickViewProduct)}
      onClose={() => setQuickViewProduct(null)}
      title="Quick View"
      maxWidth="840px"
    >
      <div className="quickview-modal-layout">
        {/* Left: Product Image */}
        <div className="quickview-image-pane">
          <img src={mainImage} alt={product.title} className="quickview-img" />
          {product.discountPercent > 0 && (
            <span className="badge-pill badge-sale quickview-badge">-{product.discountPercent}%</span>
          )}
        </div>

        {/* Right: Product Info & Actions */}
        <div className="quickview-details-pane">
          <span className="product-brand-tag">{product.brand || 'Luna Wear'}</span>
          <h2 className="quickview-title">{product.title}</h2>

          <div className="quickview-rating-row">
            <div className="star-rating">
              <Star size={14} fill="#d4af37" color="#d4af37" />
              <span>{product.rating?.toFixed(1) || '4.8'}</span>
            </div>
            <span className="quickview-sku">SKU: {product.sku || 'LUNA-1002'}</span>
          </div>

          <div className="quickview-price-row">
            <span className="quickview-price">{formatPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="quickview-original-price">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <p className="quickview-desc">{product.description}</p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="quickview-selector-group">
              <span className="selector-label">Color: <strong>{activeColor}</strong></span>
              <div className="color-swatches">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    className={`color-swatch-dot ${activeColor === c.name ? 'active' : ''}`}
                    style={{ backgroundColor: c.hex }}
                    onClick={() => setSelectedColor(c.name)}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="quickview-selector-group">
              <SizePicker
                sizes={product.sizes}
                selectedSize={activeSize}
                onSelectSize={setSelectedSize}
                onOpenSizeGuide={() => setSizeGuideModalOpen(true)}
              />
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="quickview-actions-row">
            <div className="quantity-adjuster">
              <button 
                type="button" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span>{quantity}</span>
              <button 
                type="button" 
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button 
              type="button" 
              className="quickview-add-btn"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} /> Add to Bag
            </button>
          </div>

          <button 
            type="button" 
            className="quickview-full-details-btn"
            onClick={handleViewFullPage}
          >
            View Full Product Details <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default QuickViewModal;
