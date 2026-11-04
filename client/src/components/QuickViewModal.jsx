import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, ShoppingBag, Heart } from 'lucide-react';
import { ProductDetailPage } from './ProductDetailPage';

export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct } = useStore();

  if (!quickViewProduct) return null;

  return (
    <div className="modal-overlay" onClick={() => setQuickViewProduct(null)}>
      <div 
        className="quick-view-modal animate-popup" 
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close-btn quick-view-close" onClick={() => setQuickViewProduct(null)}>
          <X size={22} />
        </button>
        <div className="quick-view-inner">
          <ProductDetailPage quickViewMode={true} quickViewProductData={quickViewProduct} />
        </div>
      </div>
    </div>
  );
};
