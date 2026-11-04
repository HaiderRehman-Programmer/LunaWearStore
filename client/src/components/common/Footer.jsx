import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext.jsx';
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  ApplePayIcon, 
  GooglePayIcon, 
  PayPalIcon, 
  KlarnaIcon, 
  VisaCardIcon, 
  MastercardIcon 
} from './Icons.jsx';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Package, 
  Sparkles,
  Lock
} from 'lucide-react';

export const Footer = () => {
  const { setActivePage, navigateToCategory, setCustomerCareModal, addToast } = useStore();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(() => {
    // Persist subscription state across page refreshes
    try { return !!localStorage.getItem('luna_newsletter_subscribed'); } catch { return false; }
  });
  const [newsletterError, setNewsletterError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setNewsletterError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newsletterEmail || !emailRegex.test(newsletterEmail)) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }

    // Persist the subscriber email & flag in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('luna_newsletter_emails') || '[]');
      if (!existing.includes(newsletterEmail.toLowerCase())) {
        existing.push(newsletterEmail.toLowerCase());
        localStorage.setItem('luna_newsletter_emails', JSON.stringify(existing));
      }
      localStorage.setItem('luna_newsletter_subscribed', '1');
    } catch { /* silent */ }

    setSubscribed(true);
    setNewsletterEmail('');
    addToast('🎉 Welcome to Luna Wear! Use code WELCOME10 for 10% off your first order.');
  };

  return (
    <footer className="site-footer-element">
      {/* Newsletter Signup Banner */}
      <div className="footer-newsletter-banner">
        <div className="container newsletter-inner">
          <div className="newsletter-text">
            <span className="newsletter-eyebrow">JOIN THE INNER CIRCLE</span>
            <h3 className="newsletter-heading">Receive 10% Off Your First Order</h3>
            <p className="newsletter-sub">
              Be the first to access limited seasonal capsule drops, editorial stories, and private private archives.
            </p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            {subscribed ? (
              <div className="newsletter-success">
                <span>✨ You're in! Use coupon code <strong>WELCOME10</strong> at checkout.</span>
              </div>
            ) : (
              <div className="newsletter-input-group">
                <input 
                  type="email" 
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => { setNewsletterEmail(e.target.value); setNewsletterError(''); }}
                  className={`newsletter-input${newsletterError ? ' newsletter-input--error' : ''}`}
                />
                <button type="submit" className="newsletter-submit-btn">
                  Subscribe <ArrowRight size={16} />
                </button>
                {newsletterError && (
                  <p className="newsletter-error">{newsletterError}</p>
                )}
              </div>
            )}
          </form>
        </div>
      </div>

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
              Contemporary luxury clothing for the modern wardrobe. Crafted with sustainable fabrics, tailored silhouettes, and intentional longevity.
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
              {['Women', 'Men', 'Outerwear', 'Dresses', 'Denim', 'New Arrivals', 'Sale / Clearance', 'Activewear'].map(cat => (
                <li key={cat}>
                  <button className="footer-link" onClick={() => navigateToCategory(cat === 'Sale / Clearance' ? 'Sale' : cat)}>
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
                { label: 'Size Chart & Fit Guide', action: () => setCustomerCareModal('sizes') },
                { label: 'Shipping & Delivery Policy', action: () => setCustomerCareModal('shipping') },
                { label: 'Returns & Exchange Portal', action: () => setCustomerCareModal('returns') },
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

          {/* About & Legal Column */}
          <div className="footer-links-col">
            <h4 className="footer-col-heading">About & Legal</h4>
            <ul className="footer-links-list">
              {[
                { label: 'Our Brand Story', action: () => setCustomerCareModal('about') },
                { label: 'Sustainable Production', action: () => setCustomerCareModal('sustainability') },
                { label: 'Terms of Service', action: () => setCustomerCareModal('terms') },
                { label: 'Privacy Policy', action: () => setCustomerCareModal('privacy') },
                { label: 'Cookie Preferences', action: () => setCustomerCareModal('cookies') }
              ].map(item => (
                <li key={item.label}>
                  <button className="footer-link" onClick={item.action}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Trust Badges & Payment Icons */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div className="footer-security-badges">
            <a
              href="https://www.digicert.com/what-is-ssl-tls-https"
              target="_blank"
              rel="noopener noreferrer"
              className="sec-badge sec-badge--link"
              title="Learn about SSL encryption"
            >
              <Lock size={14} className="sec-icon" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </a>
            <a
              href="https://www.ups.com/us/en/global.page"
              target="_blank"
              rel="noopener noreferrer"
              className="sec-badge sec-badge--link"
              title="Global Express Shipping"
            >
              <Truck size={14} className="sec-icon" />
              <span>Express Insured Global Shipping</span>
            </a>
            <a
              href="https://www.shopify.com/returns"
              target="_blank"
              rel="noopener noreferrer"
              className="sec-badge sec-badge--link"
              title="30-Day Returns Policy"
            >
              <ShieldCheck size={14} className="sec-icon" />
              <span>30-Day Effortless Returns</span>
            </a>
          </div>

          <div className="footer-payment-icons">
            <a href="https://www.visa.com" target="_blank" rel="noopener noreferrer" className="pay-chip pay-chip--link" title="Pay with Visa">
              <VisaCardIcon />
            </a>
            <a href="https://www.mastercard.com" target="_blank" rel="noopener noreferrer" className="pay-chip pay-chip--link" title="Pay with Mastercard">
              <MastercardIcon />
            </a>
            <a href="https://www.apple.com/apple-pay/" target="_blank" rel="noopener noreferrer" className="pay-chip pay-chip--link" title="Pay with Apple Pay">
              <ApplePayIcon />
            </a>
            <a href="https://pay.google.com" target="_blank" rel="noopener noreferrer" className="pay-chip pay-chip--link" title="Pay with Google Pay">
              <GooglePayIcon />
            </a>
            <a href="https://www.paypal.com" target="_blank" rel="noopener noreferrer" className="pay-chip pay-chip--link" title="Pay with PayPal">
              <PayPalIcon />
            </a>
            <a href="https://www.klarna.com" target="_blank" rel="noopener noreferrer" className="pay-chip pay-chip--link" title="Pay with Klarna">
              <KlarnaIcon />
            </a>
          </div>

          <p className="footer-copyright">
            © {new Date().getFullYear()} LUNA WEAR LLC. All rights reserved. Crafted for effortless everyday elegance.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
