import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube, ArrowRight, CreditCard, ShieldCheck, Truck, Package } from 'lucide-react';

export const Footer = () => {
  const { setActivePage, navigateToCategory, setCustomerCareModal } = useStore();

  return (
    <footer className="site-footer-element">
      {/* Main Footer Grid */}
      <div className="footer-main">
        <div className="container footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="footer-logo">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#c5a880" strokeWidth="1.5" />
                <path d="M12 2a10 10 0 0 1 10 10A10 10 0 0 1 12 22 10 10 0 0 0 12 2z" fill="#c5a880" />
              </svg>
              <span className="footer-brand-name">LUNA WEAR</span>
            </div>
            <p className="footer-brand-tagline">
              Contemporary luxury clothing for the modern wardrobe. Crafted with intention, designed to last.
            </p>
            <div className="footer-social-links">
              {[
                { icon: <Instagram size={18} />, href: 'https://www.instagram.com', label: 'Instagram' },
                { icon: <Facebook size={18} />, href: 'https://www.facebook.com', label: 'Facebook' },
                { icon: <Twitter size={18} />, href: 'https://x.com', label: 'X (Twitter)' },
                { icon: <Youtube size={18} />, href: 'https://www.youtube.com', label: 'YouTube' }
              ].map(s => (
                <a 
                  key={s.label} 
                  href={s.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link" 
                  aria-label={s.label}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Collections Column */}
          <div className="footer-links-col">
            <h4 className="footer-col-heading">Collections</h4>
            <ul className="footer-links-list">
              {['Women', 'Men', 'Outerwear', 'Dresses', 'Denim', 'Activewear', 'Accessories', 'New Arrivals'].map(cat => (
                <li key={cat}>
                  <button className="footer-link" onClick={() => navigateToCategory(cat === 'New Arrivals' ? 'All' : cat)}>
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care Column */}
          <div className="footer-links-col">
            <h4 className="footer-col-heading">Customer Care</h4>
            <ul className="footer-links-list">
              {[
                { label: 'FAQ', action: () => setCustomerCareModal('faq') },
                { label: 'Size Chart', action: () => setCustomerCareModal('sizes') },
                { label: 'Shipping & Delivery', action: () => setCustomerCareModal('shipping') },
                { label: 'Returns & Exchange', action: () => setCustomerCareModal('returns') },
                { label: 'Track Your Order', action: () => { setActivePage('account'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
                { label: 'Contact Us', action: () => setCustomerCareModal('contact') }
              ].map(link => (
                <li key={link.label}>
                  <button className="footer-link" onClick={link.action}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="footer-links-col">
            <h4 className="footer-col-heading">Luna Wear Studio</h4>
            <ul className="footer-links-list">
              {[
                { label: 'About Us & Brand Story', action: () => setCustomerCareModal('about') },
                { label: 'Sustainability', action: () => setCustomerCareModal('sustainability') },
                { label: 'Terms of Service', action: () => setCustomerCareModal('terms') },
                { label: 'Privacy Policy', action: () => setCustomerCareModal('privacy') },
                { label: 'Cookie Preferences', action: () => setCustomerCareModal('cookies') }
              ].map(link => (
                <li key={link.label}>
                  <button className="footer-link" onClick={link.action}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="footer-contact-info">
              <h4 className="footer-col-heading" style={{ marginTop: '24px' }}>Get in Touch</h4>
              <a href="mailto:hello@lunawear.com" className="footer-contact-link">
                <Mail size={14} /> hello@lunawear.com
              </a>
              <a href="tel:+15552345678" className="footer-contact-link">
                <Phone size={14} /> +1 (555) 234-5678
              </a>
              <div className="footer-contact-link">
                <MapPin size={14} /> 742 Evergreen Terrace, San Francisco, CA
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container footer-bottom-inner">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Luna Wear Studio. All rights reserved.
          </p>

          <div className="footer-trust-badges">
            <div className="footer-trust-item">
              <ShieldCheck size={14} />
              <span>SSL Secured</span>
            </div>
            <div className="footer-trust-item">
              <Truck size={14} />
              <span>Worldwide Shipping</span>
            </div>
            <div className="footer-trust-item">
              <Package size={14} />
              <span>Carbon Neutral</span>
            </div>
          </div>

          <div className="footer-payment-icons">
            <span className="payment-icon-tag">Visa</span>
            <span className="payment-icon-tag">Mastercard</span>
            <span className="payment-icon-tag">Amex</span>
            <span className="payment-icon-tag">PayPal</span>
            <span className="payment-icon-tag">Apple Pay</span>
            <span className="payment-icon-tag">Klarna</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
