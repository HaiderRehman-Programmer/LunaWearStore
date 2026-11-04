import React from 'react';
import { useStore } from '../../context/StoreContext.jsx';
import { useCart } from '../../hooks/useCart.js';
import { Trash2, Plus, Minus } from 'lucide-react';

export const CartItem = ({ item, index }) => {
  const { formatPrice } = useStore();
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item-row">
      {/* Thumbnail */}
      <div className="cart-item-thumb-wrapper">
        <img src={item.image} alt={item.title} className="cart-item-thumb" />
      </div>

      {/* Item info */}
      <div className="cart-item-info">
        <div className="cart-item-header">
          <span className="cart-item-brand">{item.brand || 'Luna Wear'}</span>
          <button 
            type="button" 
            className="cart-item-remove-btn"
            onClick={() => removeFromCart(index)}
            aria-label="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <h4 className="cart-item-title">{item.title}</h4>

        {/* Selected variants */}
        <div className="cart-item-variants">
          <span className="variant-tag">Size: <strong>{item.size}</strong></span>
          <span className="variant-tag">Color: <strong>{item.color}</strong></span>
        </div>

        {/* Price and Quantity Adjusters */}
        <div className="cart-item-bottom-row">
          <div className="quantity-adjuster-mini">
            <button 
              type="button" 
              onClick={() => updateQuantity(index, -1)}
              aria-label="Decrease quantity"
            >
              <Minus size={13} />
            </button>
            <span className="qty-number">{item.quantity}</span>
            <button 
              type="button" 
              onClick={() => updateQuantity(index, 1)}
              aria-label="Increase quantity"
            >
              <Plus size={13} />
            </button>
          </div>

          <div className="cart-item-price-col">
            <span className="cart-item-price">{formatPrice(item.price * item.quantity)}</span>
            {item.quantity > 1 && (
              <span className="cart-item-unit-price">({formatPrice(item.price)} each)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
