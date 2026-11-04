import React from 'react';
import { ProductCard } from './ProductCard.jsx';
import { ShoppingBag } from 'lucide-react';

export const ProductGrid = ({ products = [], emptyMessage = "No clothing matches your current filter criteria." }) => {
  if (!products || products.length === 0) {
    return (
      <div className="product-grid-empty">
        <div className="empty-icon-circle">
          <ShoppingBag size={32} />
        </div>
        <h4 className="empty-title">No Garments Found</h4>
        <p className="empty-desc">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id || product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
