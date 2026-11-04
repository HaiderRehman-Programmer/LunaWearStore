import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { HeroBanner } from './HeroBanner';
import { ProductCard } from './ProductCard';
import { 
  ArrowRight, Truck, RotateCcw, ShieldCheck, Headphones, 
  Star, Instagram, Sparkles, Tag, ChevronRight
} from 'lucide-react';

const FEATURED_CATEGORIES = [
  {
    label: 'Outerwear',
    description: 'Structured coats & jackets',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    category: 'Outerwear'
  },
  {
    label: 'Dresses',
    description: 'Silk & fluid silhouettes',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
    category: 'Dresses'
  },
  {
    label: 'Denim',
    description: 'Selvedge & raw denim',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80',
    category: 'Denim'
  },
  {
    label: 'Knitwear',
    description: 'Merino & cashmere knits',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80',
    category: 'Men'
  }
];

const INSTAGRAM_GRID = [
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=400&q=80'
];

export const HomePage = () => {
  const { products, navigateToCategory, formatPrice } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);
  const trending = products.filter(p => p.isTrending).slice(0, 8);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitted(true);
  };

  return (
    <div className="homepage">
      {/* Hero Banner / Carousel */}
      <HeroBanner />

      {/* Value Proposition Bar */}
      <div className="value-prop-bar">
        <div className="container value-prop-inner">
          {[
            { icon: <Truck size={20} />, title: 'Free Delivery', desc: 'On orders over $75' },
            { icon: <RotateCcw size={20} />, title: '30-Day Returns', desc: 'Hassle-free guarantee' },
            { icon: <ShieldCheck size={20} />, title: 'Secure Checkout', desc: '256-bit SSL encryption' },
            { icon: <Headphones size={20} />, title: '24/7 Support', desc: 'Dedicated client team' }
          ].map((prop, i) => (
            <div key={i} className="value-prop-item">
              <div className="value-prop-icon">{prop.icon}</div>
              <div>
                <p className="value-prop-title">{prop.title}</p>
                <p className="value-prop-desc">{prop.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Categories Grid */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-heading">Shop by Category</h2>
              <p className="section-subheading">Curated collections for every style moment</p>
            </div>
          </div>
          <div className="categories-grid">
            {FEATURED_CATEGORIES.map((cat, i) => (
              <div
                key={i}
                className="category-card"
                onClick={() => navigateToCategory(cat.category)}
                role="button"
                tabIndex={0}
              >
                <div className="category-card-image-wrap">
                  <img src={cat.image} alt={cat.label} className="category-card-img" loading="lazy" />
                  <div className="category-card-overlay" />
                </div>
                <div className="category-card-info">
                  <h3 className="category-card-title">{cat.label}</h3>
                  <p className="category-card-desc">{cat.description}</p>
                  <span className="category-shop-link">
                    Shop Now <ChevronRight size={15} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Carousel */}
      {bestSellers.length > 0 && (
        <section className="section bestsellers-section">
          <div className="container">
            <div className="section-header">
              <div>
                <div className="section-tag">
                  <Star size={14} fill="#c5a880" color="#c5a880" /> Best Sellers
                </div>
                <h2 className="section-heading">Most Loved Pieces</h2>
              </div>
              <button className="section-view-all" onClick={() => navigateToCategory('All')}>
                View All <ArrowRight size={16} />
              </button>
            </div>
            <div className="product-grid product-grid-4">
              {bestSellers.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Promotional Banner */}
      <section className="promo-banner-section">
        <div className="promo-banner">
          <div className="promo-banner-content">
            <span className="promo-banner-tag">
              <Tag size={14} /> Mid-Season Event
            </span>
            <h2 className="promo-banner-title">Up to 25% off selected outerwear</h2>
            <p className="promo-banner-desc">
              Discover our structured wool trench coats, oversized denim chore jackets, and heritage selvedge pieces — marked down for a limited time.
            </p>
            <div className="promo-banner-code">
              Use code <strong>LUNA20</strong> at checkout for an extra 20% off
            </div>
            <button 
              className="btn-gold promo-cta-btn"
              onClick={() => navigateToCategory('Outerwear')}
            >
              Shop the Event <ArrowRight size={16} />
            </button>
          </div>
          <div className="promo-banner-image">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=85" 
              alt="Promotional Campaign" 
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="section arrivals-section">
          <div className="container">
            <div className="section-header">
              <div>
                <div className="section-tag">
                  <Sparkles size={14} /> Just Landed
                </div>
                <h2 className="section-heading">New Arrivals</h2>
              </div>
              <button className="section-view-all" onClick={() => navigateToCategory('All')}>
                View All New <ArrowRight size={16} />
              </button>
            </div>
            <div className="product-grid product-grid-4">
              {newArrivals.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Instagram / UGC Grid */}
      <section className="instagram-section">
        <div className="container">
          <div className="section-header centered">
            <Instagram size={24} className="instagram-icon" />
            <h2 className="section-heading">Worn by the Community</h2>
            <p className="section-subheading">Tag <strong>@lunawearofficial</strong> to be featured</p>
          </div>
          <div className="instagram-grid">
            {INSTAGRAM_GRID.map((img, i) => (
              <div key={i} className="instagram-cell">
                <img src={img} alt={`Community look ${i + 1}`} loading="lazy" />
                <div className="instagram-cell-overlay">
                  <Instagram size={22} color="#fff" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-inner">
          <div className="newsletter-content">
            <div className="newsletter-icon-ring">✉️</div>
            <h2 className="newsletter-title">Join the Luna Inner Circle</h2>
            <p className="newsletter-desc">
              Subscribe for early access to new collections, exclusive editorial content, 
              and <strong>10% off your first order</strong>.
            </p>
            {!newsletterSubmitted ? (
              <form className="newsletter-form" onSubmit={handleNewsletter}>
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn-gold newsletter-btn">
                  Subscribe <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              <div className="newsletter-success">
                <span>🎉</span>
                <p>Thank you! Your 10% welcome code is on its way.</p>
              </div>
            )}
            <p className="newsletter-disclaimer">No spam, ever. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
