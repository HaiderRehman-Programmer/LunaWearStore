import React from 'react';

export const SizePicker = ({ sizes = [], selectedSize, onSelectSize, onOpenSizeGuide }) => {
  return (
    <div className="size-picker-container">
      <div className="size-picker-header">
        <span className="size-picker-title">
          Select Size: <strong className="selected-size-label">{selectedSize || 'Choose size'}</strong>
        </span>
        {onOpenSizeGuide && (
          <button 
            type="button" 
            className="size-guide-link-btn"
            onClick={onOpenSizeGuide}
          >
            📏 Size Guide
          </button>
        )}
      </div>

      <div className="size-buttons-grid">
        {sizes.map((s) => {
          const sizeName = typeof s === 'string' ? s : s.size;
          const stock = typeof s === 'string' ? 10 : (s.stock ?? 10);
          const isOutOfStock = stock <= 0;
          const isLowStock = stock > 0 && stock <= 3;
          const isSelected = selectedSize === sizeName;

          return (
            <button
              key={sizeName}
              type="button"
              disabled={isOutOfStock}
              onClick={() => onSelectSize(sizeName)}
              className={`size-btn ${isSelected ? 'active' : ''} ${isOutOfStock ? 'out-of-stock' : ''}`}
            >
              <span className="size-text">{sizeName}</span>
              {isOutOfStock && <span className="size-stock-badge out">Sold Out</span>}
              {!isOutOfStock && isLowStock && <span className="size-stock-badge low">Only {stock} Left</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizePicker;
