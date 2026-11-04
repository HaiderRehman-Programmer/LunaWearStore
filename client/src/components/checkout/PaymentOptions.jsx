import React, { useState } from 'react';
import { ApplePayIcon, GooglePayIcon, PayPalIcon, KlarnaIcon, VisaCardIcon, MastercardIcon } from '../common/Icons.jsx';
import { CreditCard, Banknote, ShieldCheck, Lock } from 'lucide-react';

export const PaymentOptions = ({ selectedMethod, onSelectMethod, cardDetails, onCardChange }) => {
  return (
    <div className="payment-options-container">
      <h3 className="checkout-step-title">Select Payment Method</h3>

      <div className="payment-methods-accordion">
        {/* Option 1: Credit / Debit Card */}
        <div className={`payment-method-tile ${selectedMethod === 'credit_card' ? 'selected' : ''}`}>
          <div className="method-tile-header" onClick={() => onSelectMethod('credit_card')}>
            <div className="method-radio-group">
              <input 
                type="radio" 
                name="payment_method" 
                checked={selectedMethod === 'credit_card'} 
                onChange={() => onSelectMethod('credit_card')}
                id="pm_card"
              />
              <label htmlFor="pm_card" className="method-title-label">Credit or Debit Card</label>
            </div>
            <div className="method-icons-row">
              <VisaCardIcon />
              <MastercardIcon />
            </div>
          </div>

          {selectedMethod === 'credit_card' && (
            <div className="card-input-fields animate-fade">
              <div className="form-group-block">
                <label className="field-sublabel">Card Number</label>
                <div className="card-input-with-icon">
                  <CreditCard size={18} className="field-icon-left" />
                  <input 
                    type="text" 
                    placeholder="4000 1234 5678 9010"
                    maxLength={19}
                    value={cardDetails.number}
                    onChange={(e) => onCardChange({ ...cardDetails, number: e.target.value })}
                    className="form-input with-left-icon"
                  />
                </div>
              </div>

              <div className="card-dual-grid">
                <div className="form-group-block">
                  <label className="field-sublabel">Expiration Date</label>
                  <input 
                    type="text" 
                    placeholder="MM / YY"
                    maxLength={5}
                    value={cardDetails.expiry}
                    onChange={(e) => onCardChange({ ...cardDetails, expiry: e.target.value })}
                    className="form-input"
                  />
                </div>
                <div className="form-group-block">
                  <label className="field-sublabel">CVV / Security Code</label>
                  <div className="card-input-with-icon">
                    <Lock size={15} className="field-icon-left" />
                    <input 
                      type="password" 
                      placeholder="123"
                      maxLength={4}
                      value={cardDetails.cvv}
                      onChange={(e) => onCardChange({ ...cardDetails, cvv: e.target.value })}
                      className="form-input with-left-icon"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group-block">
                <label className="field-sublabel">Name on Card</label>
                <input 
                  type="text" 
                  placeholder="Cardholder Name"
                  value={cardDetails.name}
                  onChange={(e) => onCardChange({ ...cardDetails, name: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>
          )}
        </div>

        {/* Option 2: Apple Pay */}
        <div className={`payment-method-tile ${selectedMethod === 'apple_pay' ? 'selected' : ''}`}>
          <div className="method-tile-header" onClick={() => onSelectMethod('apple_pay')}>
            <div className="method-radio-group">
              <input 
                type="radio" 
                name="payment_method" 
                checked={selectedMethod === 'apple_pay'} 
                onChange={() => onSelectMethod('apple_pay')}
                id="pm_apple"
              />
              <label htmlFor="pm_apple" className="method-title-label">Apple Pay</label>
            </div>
            <ApplePayIcon />
          </div>
          {selectedMethod === 'apple_pay' && (
            <div className="method-hint-box animate-fade">
              <p>You will be prompted to authenticate with Face ID or Touch ID on your device.</p>
            </div>
          )}
        </div>

        {/* Option 3: Klarna / BNPL */}
        <div className={`payment-method-tile ${selectedMethod === 'klarna' ? 'selected' : ''}`}>
          <div className="method-tile-header" onClick={() => onSelectMethod('klarna')}>
            <div className="method-radio-group">
              <input 
                type="radio" 
                name="payment_method" 
                checked={selectedMethod === 'klarna'} 
                onChange={() => onSelectMethod('klarna')}
                id="pm_klarna"
              />
              <label htmlFor="pm_klarna" className="method-title-label">Klarna • Pay in 4 Interest-Free Installments</label>
            </div>
            <KlarnaIcon />
          </div>
          {selectedMethod === 'klarna' && (
            <div className="method-hint-box animate-fade">
              <p>Split your purchase into 4 equal bi-weekly payments. No hidden fees or interest when paid on time.</p>
            </div>
          )}
        </div>

        {/* Option 4: Cash on Delivery (COD) */}
        <div className={`payment-method-tile ${selectedMethod === 'cash_on_delivery' ? 'selected' : ''}`}>
          <div className="method-tile-header" onClick={() => onSelectMethod('cash_on_delivery')}>
            <div className="method-radio-group">
              <input 
                type="radio" 
                name="payment_method" 
                checked={selectedMethod === 'cash_on_delivery'} 
                onChange={() => onSelectMethod('cash_on_delivery')}
                id="pm_cod"
              />
              <label htmlFor="pm_cod" className="method-title-label">Cash on Delivery (COD)</label>
            </div>
            <Banknote size={20} className="cod-icon" />
          </div>
          {selectedMethod === 'cash_on_delivery' && (
            <div className="method-hint-box animate-fade">
              <p>Pay in cash upon arrival of your package. A nominal delivery surcharge may apply.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
