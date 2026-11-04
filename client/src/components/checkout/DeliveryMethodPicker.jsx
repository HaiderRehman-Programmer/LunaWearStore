import React from 'react';
import { useStore } from '../../context/StoreContext.jsx';
import { DELIVERY_METHODS } from '../../utils/constants.js';
import { Truck, Zap, Banknote } from 'lucide-react';

export const DeliveryMethodPicker = ({ selectedId, onSelect, subtotal = 0 }) => {
  const { formatPrice } = useStore();

  return (
    <div className="delivery-methods-section">
      <h3 className="checkout-step-title">Select Delivery Speed</h3>

      <div className="delivery-methods-grid">
        {DELIVERY_METHODS.map((method) => {
          const isSelected = selectedId === method.id;
          const isStandardFree = method.id === 'standard' && subtotal >= 75;

          return (
            <div 
              key={method.id}
              className={`delivery-option-tile ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelect(method.id)}
            >
              <div className="option-tile-top">
                <div className="option-radio-label">
                  <input 
                    type="radio" 
                    name="delivery_method" 
                    checked={isSelected}
                    onChange={() => onSelect(method.id)}
                    id={`dm_${method.id}`}
                  />
                  <label htmlFor={`dm_${method.id}`} className="dm-name">{method.name}</label>
                </div>
                <span className="dm-price">
                  {isStandardFree ? (
                    <span className="dm-free-tag">FREE</span>
                  ) : method.price === 0 ? (
                    formatPrice(5)
                  ) : (
                    formatPrice(method.price)
                  )}
                </span>
              </div>

              <div className="option-tile-bottom">
                <span className="dm-eta">⚡ {method.estimatedDays}</span>
                <span className="dm-desc">{method.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryMethodPicker;
