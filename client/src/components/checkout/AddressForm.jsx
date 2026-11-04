import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import { MapPin, Plus, Check } from 'lucide-react';

export const AddressForm = ({ address, onChange, email, onEmailChange, isGuest = false }) => {
  const { user } = useAuth();
  const [selectedSavedId, setSelectedSavedId] = useState(null);

  const handleSavedSelect = (addr) => {
    setSelectedSavedId(addr.id);
    onChange({
      fullName: addr.fullName || user?.name || '',
      address: addr.street || addr.address || '',
      city: addr.city || '',
      state: addr.state || '',
      postalCode: addr.zipCode || addr.postalCode || '',
      country: addr.country || 'United States',
      phone: addr.phone || user?.phone || ''
    });
  };

  return (
    <div className="address-form-section">
      {/* Contact Email */}
      <div className="form-group-block">
        <label className="form-field-label">Contact Email</label>
        <input 
          type="email" 
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          className="form-input"
        />
        <span className="field-hint">Order confirmation & tracking updates will be delivered here.</span>
      </div>

      {/* Saved Addresses for logged-in users */}
      {user && user.addresses && user.addresses.length > 0 && !isGuest && (
        <div className="saved-addresses-selector">
          <label className="form-field-label">Select Saved Delivery Address</label>
          <div className="saved-addresses-grid">
            {user.addresses.map((savedAddr) => {
              const isSelected = selectedSavedId === savedAddr.id;
              return (
                <div 
                  key={savedAddr.id}
                  className={`saved-address-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSavedSelect(savedAddr)}
                >
                  <div className="card-radio-row">
                    <span className="addr-label">{savedAddr.label || 'Home'}</span>
                    {isSelected && <Check size={16} className="selected-check-icon" />}
                  </div>
                  <p className="addr-recipient">{savedAddr.fullName}</p>
                  <p className="addr-line">{savedAddr.street}</p>
                  <p className="addr-city-state">{savedAddr.city}, {savedAddr.state} {savedAddr.zipCode}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Address Fields */}
      <div className="address-fields-grid">
        <div className="form-group-block col-span-2">
          <label className="form-field-label">Full Name</label>
          <input 
            type="text" 
            placeholder="First and last name"
            value={address.fullName}
            onChange={(e) => onChange({ ...address, fullName: e.target.value })}
            required
            className="form-input"
          />
        </div>

        <div className="form-group-block col-span-2">
          <label className="form-field-label">Street Address</label>
          <input 
            type="text" 
            placeholder="House number and street name"
            value={address.address}
            onChange={(e) => onChange({ ...address, address: e.target.value })}
            required
            className="form-input"
          />
        </div>

        <div className="form-group-block col-span-2">
          <label className="form-field-label">Apartment, Suite, Unit (Optional)</label>
          <input 
            type="text" 
            placeholder="Apartment, suite, unit, building, floor, etc."
            value={address.apartment || ''}
            onChange={(e) => onChange({ ...address, apartment: e.target.value })}
            className="form-input"
          />
        </div>

        <div className="form-group-block">
          <label className="form-field-label">City</label>
          <input 
            type="text" 
            placeholder="City"
            value={address.city}
            onChange={(e) => onChange({ ...address, city: e.target.value })}
            required
            className="form-input"
          />
        </div>

        <div className="form-group-block">
          <label className="form-field-label">State / Province</label>
          <input 
            type="text" 
            placeholder="State / Region"
            value={address.state}
            onChange={(e) => onChange({ ...address, state: e.target.value })}
            required
            className="form-input"
          />
        </div>

        <div className="form-group-block">
          <label className="form-field-label">Postal / ZIP Code</label>
          <input 
            type="text" 
            placeholder="ZIP or Postal Code"
            value={address.postalCode}
            onChange={(e) => onChange({ ...address, postalCode: e.target.value })}
            required
            className="form-input"
          />
        </div>

        <div className="form-group-block">
          <label className="form-field-label">Country</label>
          <select 
            value={address.country || 'United States'}
            onChange={(e) => onChange({ ...address, country: e.target.value })}
            className="form-select"
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
            <option value="Australia">Australia</option>
            <option value="Japan">Japan</option>
          </select>
        </div>

        <div className="form-group-block col-span-2">
          <label className="form-field-label">Phone Number (For Delivery Driver Updates)</label>
          <input 
            type="tel" 
            placeholder="+1 (555) 000-0000"
            value={address.phone || ''}
            onChange={(e) => onChange({ ...address, phone: e.target.value })}
            className="form-input"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
