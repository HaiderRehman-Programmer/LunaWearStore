import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext.jsx';
import { Modal } from './Modal.jsx';
import { Mail, Phone, MapPin, MessageSquare, Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export const CustomerCareModals = () => {
  const { customerCareModal, setCustomerCareModal, addToast } = useStore();
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  if (!customerCareModal) return null;

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    addToast('Your inquiry has been received. Our concierge will respond within 4 hours.');
    setTimeout(() => {
      setCustomerCareModal(null);
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <>
      {/* FAQ Modal */}
      {customerCareModal === 'faq' && (
        <Modal 
          isOpen={true} 
          onClose={() => setCustomerCareModal(null)} 
          title="Frequently Asked Questions (FAQ)"
          maxWidth="640px"
        >
          <div className="faq-modal-content">
            <div className="faq-item">
              <h4>What is your delivery timeframe?</h4>
              <p>Orders are dispatched within 24 hours. Standard delivery takes 3–5 business days, and White Glove Express takes 1–2 business days.</p>
            </div>
            <div className="faq-item">
              <h4>How do your garments fit?</h4>
              <p>Our sizing is true to size tailored for modern silhouettes. You can consult our interactive Size Guide on any product page for exact chest and waist metrics.</p>
            </div>
            <div className="faq-item">
              <h4>What is your return policy?</h4>
              <p>We provide a 30-day effortless return window. Items must be unworn, unwashed, with all original designer tags intact.</p>
            </div>
            <div className="faq-item">
              <h4>Where are your fabrics sourced?</h4>
              <p>We source double-faced virgin wools from Biella, Italy, 13oz selvedge denim from Okayama, Japan, and certified 6A mulberry silk from sustainable sericultures.</p>
            </div>
          </div>
        </Modal>
      )}

      {/* Shipping & Delivery Policy Modal */}
      {customerCareModal === 'shipping' && (
        <Modal 
          isOpen={true} 
          onClose={() => setCustomerCareModal(null)} 
          title="Shipping & Delivery Policy"
          maxWidth="600px"
        >
          <div className="care-policy-content">
            <div className="policy-badge-row">
              <Truck size={24} className="policy-icon" />
              <div>
                <h4>Complimentary Express Shipping</h4>
                <p>All orders over $75 receive free tracked express shipping worldwide.</p>
              </div>
            </div>
            <hr />
            <h4>Courier Partners & Tracking</h4>
            <p>Every shipment is insured and tracked via DHL Express or FedEx Air. You will receive real-time SMS and email milestone notifications.</p>
            <h4>Customs & Import Duties</h4>
            <p>All duties and import taxes are pre-calculated and paid by Luna Wear for deliveries to the US, EU, UK, and Canada.</p>
          </div>
        </Modal>
      )}

      {/* Returns & Exchange Portal Modal */}
      {customerCareModal === 'returns' && (
        <Modal 
          isOpen={true} 
          onClose={() => setCustomerCareModal(null)} 
          title="Returns & Exchange Portal"
          maxWidth="600px"
        >
          <div className="care-policy-content">
            <div className="policy-badge-row">
              <RotateCcw size={24} className="policy-icon" />
              <div>
                <h4>30-Day Effortless Returns</h4>
                <p>Generate a prepaid return shipping label in seconds.</p>
              </div>
            </div>
            <hr />
            <p>1. Enter your Order Number and Postal Code in your Account portal.</p>
            <p>2. Select the garment and indicate whether you prefer a replacement size or full refund.</p>
            <p>3. Affix the prepaid digital shipping label to your original packaging and hand it to any courier depot.</p>
          </div>
        </Modal>
      )}

      {/* Contact Us Modal */}
      {customerCareModal === 'contact' && (
        <Modal 
          isOpen={true} 
          onClose={() => setCustomerCareModal(null)} 
          title="Contact Concierge & Support"
          maxWidth="560px"
        >
          <div className="contact-modal-body">
            <div className="contact-channels-strip">
              <div className="channel-box">
                <Mail size={18} />
                <span>concierge@lunawear.com</span>
              </div>
              <div className="channel-box">
                <Phone size={18} />
                <span>+1 (800) 586-2932</span>
              </div>
            </div>

            {contactSubmitted ? (
              <div className="contact-success-state">
                <Check size={32} />
                <h4>Inquiry Received</h4>
                <p>We will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="contact-form-inner">
                <div className="form-group-block">
                  <label className="field-label">Name</label>
                  <input 
                    type="text" 
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group-block">
                  <label className="field-label">Email</label>
                  <input 
                    type="email" 
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group-block">
                  <label className="field-label">Message</label>
                  <textarea 
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    required
                    className="form-textarea"
                  />
                </div>
                <button type="submit" className="primary-btn mt-3">
                  Send Message to Concierge
                </button>
              </form>
            )}
          </div>
        </Modal>
      )}

      {/* About Us / Our Brand Story Modal */}
      {customerCareModal === 'about' && (
        <Modal 
          isOpen={true} 
          onClose={() => setCustomerCareModal(null)} 
          title="Our Brand Story • Luna Wear"
          maxWidth="640px"
        >
          <div className="about-modal-content">
            <p className="lead-paragraph">
              Founded on the belief that everyday clothing should possess architectural grace and uncompromising material integrity.
            </p>
            <p>
              Every Luna Wear garment begins with natural fibers: Italian virgin wools, pure Japanese shuttle-loom denim, and fluid grade-6A mulberry silk. We avoid fast fashion trends in favor of disciplined silhouettes that endure through decades of wear.
            </p>
            <p>
              Our manufacturing partners adhere strictly to zero-waste water recycling, fair living wages, and carbon-offset logistics.
            </p>
          </div>
        </Modal>
      )}

      {/* Sustainability Modal */}
      {customerCareModal === 'sustainability' && (
        <Modal 
          isOpen={true} 
          onClose={() => setCustomerCareModal(null)} 
          title="Sustainable Production & Ethical Craft"
          maxWidth="640px"
        >
          <div className="about-modal-content">
            <p className="lead-paragraph">
              Committed to circular elegance, conscious craftsmanship, and traceable raw materials from farm to atelier.
            </p>
            <div className="policy-badge-row" style={{ marginTop: '16px', marginBottom: '16px' }}>
              <ShieldCheck size={24} className="policy-icon" />
              <div>
                <h4>Zero-Waste Italian Mills & Fair-Trade Artisans</h4>
                <p>100% of our virgin wool and organic cotton yarns are processed in closed-loop, hydro-powered Italian and Portuguese weaving facilities.</p>
              </div>
            </div>
            <p>
              <strong>Carbon-Neutral Logistics:</strong> All global parcels are dispatched using climate-neutral shipping lanes with verified carbon offset credits.
            </p>
            <p>
              <strong>Monitored Sericulture:</strong> Our 6A-grade mulberry silk is harvested using cruelty-free organic methods without harsh chemical bleaches or synthetic petroleum fixatives.
            </p>
          </div>
        </Modal>
      )}

      {/* Size Chart Modal */}
      {customerCareModal === 'sizes' && (
        <Modal 
          isOpen={true} 
          onClose={() => setCustomerCareModal(null)} 
          title="Size Chart & Fit Guide"
          maxWidth="640px"
        >
          <div className="care-policy-content">
            <p className="lead-paragraph">
              Every Luna Wear garment is precision-cut to contemporary luxury standards. Review our standard measurements below:
            </p>
            <div style={{ overflowX: 'auto', margin: '18px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-light)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '8px 12px' }}>Size</th>
                    <th style={{ padding: '8px 12px' }}>Chest / Bust</th>
                    <th style={{ padding: '8px 12px' }}>Waist</th>
                    <th style={{ padding: '8px 12px' }}>Hips</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: '700' }}>XS (0-2)</td>
                    <td style={{ padding: '10px 12px' }}>32" - 33" (81-84 cm)</td>
                    <td style={{ padding: '10px 12px' }}>24" - 25" (61-64 cm)</td>
                    <td style={{ padding: '10px 12px' }}>34" - 35" (86-89 cm)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: '700' }}>S (4-6)</td>
                    <td style={{ padding: '10px 12px' }}>34" - 35" (86-89 cm)</td>
                    <td style={{ padding: '10px 12px' }}>26" - 27" (66-69 cm)</td>
                    <td style={{ padding: '10px 12px' }}>36" - 37" (91-94 cm)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: '700' }}>M (8-10)</td>
                    <td style={{ padding: '10px 12px' }}>36" - 38" (91-97 cm)</td>
                    <td style={{ padding: '10px 12px' }}>28" - 30" (71-76 cm)</td>
                    <td style={{ padding: '10px 12px' }}>38" - 40" (97-102 cm)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '10px 12px', fontWeight: '700' }}>L (12-14)</td>
                    <td style={{ padding: '10px 12px' }}>39" - 41" (99-104 cm)</td>
                    <td style={{ padding: '10px 12px' }}>31" - 33" (79-84 cm)</td>
                    <td style={{ padding: '10px 12px' }}>41" - 43" (104-109 cm)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 12px', fontWeight: '700' }}>XL (16)</td>
                    <td style={{ padding: '10px 12px' }}>42" - 44" (107-112 cm)</td>
                    <td style={{ padding: '10px 12px' }}>34" - 36" (86-91 cm)</td>
                    <td style={{ padding: '10px 12px' }}>44" - 46" (112-117 cm)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Need bespoke tailor consultation? Contact our concierge at <strong>concierge@lunawear.com</strong>.
            </p>
          </div>
        </Modal>
      )}

      {/* Terms of Service Modal */}
      {customerCareModal === 'terms' && (
        <Modal 
          isOpen={true} 
          onClose={() => setCustomerCareModal(null)} 
          title="Terms of Service • Luna Wear"
          maxWidth="600px"
        >
          <div className="legal-modal-content">
            <h4>1. Agreement of Purchase</h4>
            <p>By placing an order on Luna Wear, you acknowledge and agree that items are sold for personal luxury use and not for unauthorized commercial resale.</p>
            <h4>2. Authenticity & Warranty</h4>
            <p>Every piece is certified authentic, inspected individually, and covered by our 1-year atelier craftsmanship guarantee against manufacturing imperfections.</p>
            <h4>3. Digital Security & Payments</h4>
            <p>All card payments and digital wallets are verified through encrypted Stripe and PayPal protocols with 3D Secure verification.</p>
          </div>
        </Modal>
      )}

      {/* Privacy Policy Modal */}
      {customerCareModal === 'privacy' && (
        <Modal 
          isOpen={true} 
          onClose={() => setCustomerCareModal(null)} 
          title="Privacy Policy & Security"
          maxWidth="600px"
        >
          <div className="legal-modal-content">
            <h4>Client Confidentiality</h4>
            <p>We respect your personal sanctuary. Luna Wear never sells, trades, or licenses your personal identifiers, browsing history, or payment records to third-party ad brokers.</p>
            <h4>Data Encryption & Storage</h4>
            <p>Client information is secured under enterprise 256-bit AES encryption compliant with GDPR (EU 2016/679) and CCPA regulations.</p>
            <h4>Your Rights</h4>
            <p>You may request full export or deletion of your customer record at any time by messaging concierge@lunawear.com.</p>
          </div>
        </Modal>
      )}

      {/* Cookie Preferences Modal */}
      {customerCareModal === 'cookies' && (
        <Modal 
          isOpen={true} 
          onClose={() => setCustomerCareModal(null)} 
          title="Cookie & Tracking Preferences"
          maxWidth="560px"
        >
          <div className="legal-modal-content">
            <p className="lead-paragraph" style={{ marginBottom: '16px' }}>
              We use tailored cookies to maintain your luxury bag state, remember regional currencies, and optimize editorial aesthetics.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', margin: '20px 0' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'not-allowed' }}>
                <div>
                  <strong>Essential Cookies</strong>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Required for shopping bag, secure checkout & sessions.</p>
                </div>
                <input type="checkbox" checked disabled style={{ width: '18px', height: '18px' }} />
              </label>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <div>
                  <strong>Performance & Experience Cookies</strong>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Remembers currency preference and high-resolution media caching.</p>
                </div>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--accent-gold)' }} />
              </label>
              <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <div>
                  <strong>Editorial & Personalization Cookies</strong>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Curates personalized garment drops and style recommendations.</p>
                </div>
                <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--accent-gold)' }} />
              </label>
            </div>
            <button 
              type="button" 
              className="btn-gold" 
              style={{ width: '100%', marginTop: '10px' }}
              onClick={() => {
                addToast('✅ Cookie preferences saved successfully.');
                setCustomerCareModal(null);
              }}
            >
              Save Cookie Preferences
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CustomerCareModals;
