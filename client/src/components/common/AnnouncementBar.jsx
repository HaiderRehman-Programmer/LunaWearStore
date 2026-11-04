import React, { useState, useEffect } from 'react';
import { ChevronDown, Globe, Sparkles } from 'lucide-react';
import { CURRENCIES } from '../../context/StoreContext.jsx';

export const AnnouncementBar = ({ currency, setCurrency }) => {
  const announcements = [
    '✨ Complimentary Global Express Delivery on orders over $75',
    '🌙 Mid-Season Drop: Use code LUNA20 for 20% off all outerwear',
    '💎 New Members receive 10% off with code WELCOME10'
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  return (
    <div className="announcement-bar">
      <div className="container announcement-inner">
        <div className="announcement-content animate-fade">
          <span>{announcements[index]}</span>
        </div>
        <div className="announcement-actions">
          <div className="currency-selector">
            <Globe size={13} className="globe-icon" />
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="currency-select"
              aria-label="Select Currency and Region"
            >
              {CURRENCIES && Object.entries(CURRENCIES).map(([code, config]) => (
                <option key={code} value={code}>
                  {config.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
