import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { ProductCard } from '../components/product/ProductCard.jsx';
import { Instagram } from '../components/common/Icons.jsx';
import { 
  ArrowRight, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Headphones, 
  Star, 
  Sparkles, 
  Tag, 
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const HERO_SLIDES = [
  {
    eyebrow: 'AUTUMN / WINTER 2026 CAPSULE',
    title: 'The Art of Effortless Form',
    subtitle: 'Tailored Italian wool, fluid Japanese silks, and architectural silhouettes engineered for modern living.',
    ctaText: 'Shop New Season Drop',
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=85'
  },
  {
    eyebrow: 'EXCLUSIVE ONLINE DROP',
    title: 'Architectural Outerwear',
    subtitle: 'Sculptural trench coats and oversized double-faced cashmere overcoats crafted to endure decades.',
    ctaText: 'Explore Outerwear',
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1800&q=85'
  },
  {
    eyebrow: 'LIMITED MID-SEASON SALE',
    title: 'Modern Minimalist Silhouettes',
    subtitle: 'Curate your elevated capsule wardrobe with 20% off all dresses and denim with code LUNA20.',
    ctaText: 'Shop Sale Collection',
    category: 'Sale',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=85'
  }
];

const FEATURED_CATEGORIES = [
  {
    label: 'Outerwear',
    description: 'Structured coats & tailored jackets',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=700&q=80',
    category: 'Outerwear'
  },
  {
    label: 'Dresses',
    description: 'Silk slips & fluid evening silhouettes',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80',
    category: 'Dresses'
  },
  {
    label: 'Denim',
    description: '13oz Japanese selvedge & raw denim',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=700&q=80',
    category: 'Denim'
  },
  {
    label: 'Tops & Knits',
    description: 'Organic poplin & merino knitwear',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=700&q=80',
    category: 'Tops'
  }
];

const INSTAGRAM_UGC_POSTS = [
  {
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500&q=80',
    handle: '@clara.noir',
    product: 'Minimalist Cashmere Overcoat'
  },
  {
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80',
    handle: '@sofia_atelier',
    product: 'Silk Bias-Cut Slip Dress'
  },
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80',
    handle: '@elena_arch',
    product: 'Tailored Wool Trench'
  },
  {
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=80',
    handle: '@marcus.style',
    product: 'Relaxed Organic Linen Shirt'
  },
  {
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=500&q=80',
    handle: '@hannah_wardrobe',
    product: 'Selvedge Straight Leg Denim'
  },
  {
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=500&q=80',
    handle: '@the_curated_gent',
    product: 'Oversized Double-Breasted Blazer'
  }
];

export const Home = () => {
  const { products, navigateToCategory, formatPrice } = useStore();
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);
  const trending = products.filter(p => p.isTrending || p.isBestSeller).slice(0, 8);

  return (
    <div className="homepage-view">
      {/* 1. Hero Banner Slider */}
      <section className="hero-banner-section">
        {HERO_SLIDES.map((slide, idx) => (
          <div 
            key={idx}
            className={`hero-slide ${idx === activeSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-gradient-overlay" />
            <div className="container hero-content-container">
              <div className="hero-text-block animate-fade">
                <span className="hero-eyebrow">{slide.eyebrow}</span>
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-subtitle">{slide.subtitle}</p>
                <div className="hero-actions">
                  <button 
                    type="button" 
                    className="hero-primary-cta"
                    onClick={() => navigateToCategory(slide.category)}
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight size={18} />
                  </button>
                  <button 
                    type="button" 
                    className="hero-secondary-cta"
                    onClick={() => navigateToCategory('All')}
                  >
                    View All Collections
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide Controls */}
        <div className="hero-slide-indicators">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`indicator-dot ${i === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Value Proposition Bar */}
      <section className="value-prop-bar">
        <div className="container value-prop-inner">
          <div className="value-prop-card">
            <div className="value-icon-circle"><Truck size={20} /></div>
            <div>
              <h4 className="value-card-title">Complimentary Global Shipping</h4>
              <p className="value-card-desc">Free express delivery on orders over $75</p>
            </div>
          </div>
          <div className="value-prop-card">
            <div className="value-icon-circle"><RotateCcw size={20} /></div>
            <div>
              <h4 className="value-card-title">30-Day Effortless Returns</h4>
              <p className="value-card-desc">Prepaid return shipping label included</p>
            </div>
          </div>
          <div className="value-prop-card">
            <div className="value-icon-circle"><ShieldCheck size={20} /></div>
            <div>
              <h4 className="value-card-title">Secure & Encrypted Checkout</h4>
              <p className="value-card-desc">256-bit bank grade encryption & fraud protection</p>
            </div>
          </div>
          <div className="value-prop-card">
            <div className="value-icon-circle"><Headphones size={20} /></div>
            <div>
              <h4 className="value-card-title">Dedicated Concierge</h4>
              <p className="value-card-desc">24/7 personal stylist and order support</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Categories Grid */}
      <section className="featured-categories-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">CURATED SELECTION</span>
              <h2 className="section-heading">Featured Categories</h2>
            </div>
            <button 
              type="button" 
              className="section-link-btn"
              onClick={() => navigateToCategory('All')}
            >
              Browse All <ChevronRight size={16} />
            </button>
          </div>

          <div className="featured-categories-grid">
            {FEATURED_CATEGORIES.map((cat) => (
              <div 
                key={cat.label}
                className="category-card-tile group"
                onClick={() => navigateToCategory(cat.category)}
              >
                <img src={cat.image} alt={cat.label} className="cat-tile-img" />
                <div className="cat-tile-overlay">
                  <span className="cat-tile-title">{cat.label}</span>
                  <span className="cat-tile-desc">{cat.description}</span>
                  <span className="cat-tile-action">Shop Now →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Trending / Best Sellers Carousel */}
      <section className="trending-carousel-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">COMMUNITY FAVORITES</span>
              <h2 className="section-heading">Trending & Best Sellers</h2>
            </div>
            <div className="carousel-filter-pills">
              <button 
                type="button" 
                className="pill-active"
                onClick={() => navigateToCategory('All')}
              >
                View Full Catalog
              </button>
            </div>
          </div>

          <div className="products-horizontal-scroll">
            {trending.map((item, idx) => (
              <div key={item.id || item._id || idx} className="scroll-card-wrapper">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Promotional Campaign Banners */}
      <section className="promotional-banners-section">
        <div className="container">
          <div className="promo-dual-grid">
            {/* Promo 1: Mid-season drop */}
            <div className="promo-banner-card banner-dark">
              <div className="promo-card-content">
                <span className="promo-tag">LIMITED PROMOTION</span>
                <h3 className="promo-title">Take 20% Off All Outerwear</h3>
                <p className="promo-desc">Use promo code <strong>LUNA20</strong> at checkout to unlock savings on structured trench coats and wool overcoats.</p>
                <button 
                  type="button" 
                  className="promo-btn-light"
                  onClick={() => navigateToCategory('Outerwear')}
                >
                  Shop Outerwear <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Promo 2: Bundle offer */}
            <div className="promo-banner-card banner-gold">
              <div className="promo-card-content">
                <span className="promo-tag">CURATED BUNDLE</span>
                <h3 className="promo-title">Capsule Wardrobe Bundle</h3>
                <p className="promo-desc">Buy any 2 tops and receive 50% off select selvedge denim. Elevate your everyday rotational wardrobe.</p>
                <button 
                  type="button" 
                  className="promo-btn-dark"
                  onClick={() => navigateToCategory('Denim')}
                >
                  Explore Denim Drop <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. New Arrivals Grid */}
      <section className="new-arrivals-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-eyebrow">FRESH DROPS</span>
              <h2 className="section-heading">New Arrivals This Week</h2>
            </div>
            <button 
              type="button" 
              className="section-link-btn"
              onClick={() => navigateToCategory('New Arrivals')}
            >
              Shop All New Arrivals <ChevronRight size={16} />
            </button>
          </div>

          <div className="product-grid">
            {newArrivals.map((product, idx) => (
              <ProductCard key={product.id || product._id || idx} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Social Proof & Instagram UGC Feed */}
      <section className="instagram-ugc-section">
        <div className="container">
          <div className="ugc-header text-center">
            <div className="ugc-icon-badge">
              <Instagram size={24} />
            </div>
            <span className="section-eyebrow">AS SEEN ON YOU</span>
            <h2 className="section-heading">Wear The Light • #LunaStyle</h2>
            <p className="section-subheading">
              Tag @lunawear on Instagram to be featured in our global editorial customer gallery.
            </p>
          </div>

          <div className="ugc-grid-wrapper">
            {INSTAGRAM_UGC_POSTS.map((ugc, i) => (
              <div key={i} className="ugc-tile group">
                <img src={ugc.image} alt={ugc.product} className="ugc-image" />
                <div className="ugc-overlay">
                  <Instagram size={22} color="#ffffff" />
                  <span className="ugc-handle">{ugc.handle}</span>
                  <span className="ugc-item-tag">{ugc.product}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
