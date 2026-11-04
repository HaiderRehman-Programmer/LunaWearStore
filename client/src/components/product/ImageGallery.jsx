import React, { useState } from 'react';
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

export const ImageGallery = ({ images = [], title = 'Garment' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const activeImage = images[activeIndex] || images[0] || '';

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="product-image-gallery">
      {/* Thumbnail Navigation Strip */}
      <div className="gallery-thumbnails">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            className={`gallery-thumb-btn ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(idx)}
            aria-label={`View angle ${idx + 1}`}
          >
            <img src={img} alt={`${title} angle ${idx + 1}`} />
          </button>
        ))}
      </div>

      {/* Main Feature Image Container with Magnifier Zoom */}
      <div 
        className="gallery-main-view"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <img 
          src={activeImage} 
          alt={title} 
          className="gallery-main-img" 
          style={isZoomed ? {
            transform: 'scale(1.75)',
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transition: 'none'
          } : {}}
        />

        {/* Zoom Hint Indicator */}
        {!isZoomed && (
          <div className="gallery-zoom-hint">
            <ZoomIn size={16} /> <span>Hover to zoom</span>
          </div>
        )}

        {/* Carousel arrows */}
        {images.length > 1 && (
          <>
            <button className="gallery-nav-arrow arrow-left" onClick={handlePrev} aria-label="Previous image">
              <ChevronLeft size={20} />
            </button>
            <button className="gallery-nav-arrow arrow-right" onClick={handleNext} aria-label="Next image">
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
