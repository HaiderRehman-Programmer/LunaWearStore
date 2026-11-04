import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const slides = [
  {
    id: 1,
    tag: "SPRING / SUMMER 2025 ATELIER",
    title: "Timeless Precision.\nFluid Tailoring.",
    description: "Explore the new architectural collection crafted in double-faced Italian virgin wool, fluid mulberry silk, and structured outerwear.",
    ctaText: "Shop The Collection",
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1800&q=85",
    accent: "Luxury Wool & Silk"
  },
  {
    id: 2,
    tag: "MODERN STREETWEAR ESSENTIALS",
    title: "Heavyweight Knit\n& Selvedge Denim.",
    description: "Built for contemporary everyday life. 450GSM loopback French terry, custom boxy silhouettes, and durable 13.5oz Japanese denim.",
    ctaText: "Explore Essentials",
    category: "Tops",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=85",
    accent: "Pre-shrunk 100% Organic Cotton"
  },
  {
    id: 3,
    tag: "HAUTE EVENING SENSIBILITY",
    title: "The Silk Drape\nEdition.",
    description: "Pure 22-momme Mulberry silk slip dresses cut on the bias to move like liquid elegance. Designed for unforgettable evenings.",
    ctaText: "Shop Evening Dresses",
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1800&q=85",
    accent: "100% Pure Mulberry Silk"
  }
];

export const HeroBanner = () => {
  const { navigateToCategory } = useStore();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[current];

  return (
    <section className="hero-banner-section">
      <div 
        className="hero-slide-bg" 
        style={{ backgroundImage: `url(${slide.image})` }}
      >
        <div className="hero-overlay" />
      </div>

      <div className="container hero-content-container">
        <div className="hero-text-card animate-popup" key={slide.id}>
          <div className="hero-tag-badge">
            <Sparkles size={13} className="hero-tag-icon" />
            <span>{slide.tag}</span>
          </div>

          <h1 className="hero-title">
            {slide.title.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </h1>

          <p className="hero-description">{slide.description}</p>

          <div className="hero-cta-group">
            <button 
              className="btn-gold hero-cta-btn"
              onClick={() => navigateToCategory(slide.category)}
            >
              <span>{slide.ctaText}</span>
              <ArrowRight size={17} />
            </button>
            <button 
              className="btn-secondary hero-secondary-btn"
              onClick={() => navigateToCategory('All')}
            >
              View Lookbook
            </button>
          </div>

          <div className="hero-accent-meta">
            <span className="accent-dot" />
            <span>{slide.accent}</span>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Arrows */}
      <button className="hero-arrow-btn hero-arrow-left" onClick={prevSlide} aria-label="Previous Slide">
        <ChevronLeft size={24} />
      </button>
      <button className="hero-arrow-btn hero-arrow-right" onClick={nextSlide} aria-label="Next Slide">
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="hero-indicators">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            className={`hero-dot ${idx === current ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
