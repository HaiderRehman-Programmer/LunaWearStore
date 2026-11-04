import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, ChevronDown, ChevronUp, ZoomIn, ArrowLeft, ArrowRight, Check, ShoppingBag, Heart, Truck, RotateCcw, Shield } from 'lucide-react';
import { ProductCard } from './ProductCard';

export const ProductDetailPage = () => {
  const { 
    products, 
    selectedProductId, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    formatPrice,
    setActivePage,
    openProduct,
    setQuickViewProduct,
    setSizeGuideOpen
  } = useStore();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [openAccordion, setOpenAccordion] = useState('details');
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ author: '', rating: 5, title: '', comment: '', fitFeedback: 'True to Size' });
  const [zoomedImage, setZoomedImage] = useState(null);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  useEffect(() => {
    if (!selectedProductId || !products.length) return;
    const found = products.find(p => p._id === selectedProductId || p.sku === selectedProductId);
    if (found) {
      setProduct(found);
      setSelectedSize(found.sizes?.[0]?.size || '');
      setSelectedColor(found.colors?.[0] || null);
      setActiveImageIdx(0);
    }
  }, [selectedProductId, products]);

  useEffect(() => {
    if (!selectedProductId) return;
    fetch(`/api/reviews/${selectedProductId}`)
      .then(r => r.json())
      .then(d => { if (d.success) setReviews(d.reviews); })
      .catch(() => {
        setReviews([
          { _id: 'r1', author: 'Elena Rostova', rating: 5, title: 'Exceptional quality!', comment: 'The craftsmanship and fabric quality far exceeded my expectations. Truly a premium piece.', fitFeedback: 'True to Size', verifiedBuyer: true, helpfulVotes: 14 },
          { _id: 'r2', author: 'Sophie Laurent', rating: 5, title: 'My new wardrobe staple', comment: 'Absolutely love the weight and drape. The color matches perfectly. Worth every penny.', fitFeedback: 'True to Size', verifiedBuyer: true, helpfulVotes: 9 }
        ]);
      });
  }, [selectedProductId]);

  if (!product) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="loading-spinner" />
      </div>
    );
  }

  const inWishlist = isInWishlist(product._id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const avgRating = reviews.length > 0 ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : product.rating;
  const relatedProducts = products.filter(p => p._id !== product._id && (p.category === product.category || p.gender === product.gender)).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size to continue');
      return;
    }
    addToCart(product, selectedSize, selectedColor?.name, quantity);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2500);
  };

  const handleSubmitReview = async () => {
    if (!reviewForm.author || !reviewForm.comment) {
      alert('Please enter your name and review comment');
      return;
    }
    setReviewSubmitting(true);
    try {
      const res = await fetch(`/api/reviews/${product._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewForm)
      });
      const data = await res.json();
      if (data.success) {
        setReviews(prev => [data.review, ...prev]);
        setReviewFormOpen(false);
        setReviewForm({ author: '', rating: 5, title: '', comment: '', fitFeedback: 'True to Size' });
      }
    } catch {
      const fakeReview = {
        _id: `r-${Date.now()}`,
        ...reviewForm,
        verifiedBuyer: true,
        helpfulVotes: 0,
        createdAt: new Date().toISOString()
      };
      setReviews(prev => [fakeReview, ...prev]);
      setReviewFormOpen(false);
      setReviewForm({ author: '', rating: 5, title: '', comment: '', fitFeedback: 'True to Size' });
    } finally {
      setReviewSubmitting(false);
    }
  };

  const selectedSizeObj = product.sizes?.find(s => s.size === selectedSize);
  const isLowStock = selectedSizeObj && selectedSizeObj.stock > 0 && selectedSizeObj.stock <= 3;
  const isOOS = selectedSizeObj && selectedSizeObj.stock === 0;

  return (
    <div className="pdp-page">
      {/* Breadcrumb */}
      <div className="container">
        <nav className="pdp-breadcrumb">
          <button onClick={() => setActivePage('home')}>Home</button>
          <span>/</span>
          <button onClick={() => setActivePage('shop')}>{product.category}</button>
          <span>/</span>
          <span>{product.title}</span>
        </nav>
      </div>

      {/* Main PDP Grid */}
      <div className="container pdp-grid">
        {/* Left: Image Gallery */}
        <div className="pdp-gallery">
          {/* Thumbnail Column */}
          <div className="pdp-thumbnails">
            {product.images?.map((img, i) => (
              <button
                key={i}
                className={`pdp-thumb ${i === activeImageIdx ? 'active' : ''}`}
                onClick={() => setActiveImageIdx(i)}
              >
                <img src={img} alt={`View ${i + 1}`} loading="lazy" />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="pdp-main-image-wrap">
            <img
              src={product.images?.[activeImageIdx]}
              alt={product.title}
              className="pdp-main-image"
              onClick={() => setZoomedImage(product.images[activeImageIdx])}
            />
            <button className="pdp-zoom-btn" onClick={() => setZoomedImage(product.images[activeImageIdx])}>
              <ZoomIn size={18} />
            </button>
            {/* Prev/Next arrows */}
            {product.images?.length > 1 && (
              <>
                <button 
                  className="pdp-img-arrow pdp-img-arrow-left"
                  onClick={() => setActiveImageIdx(i => (i - 1 + product.images.length) % product.images.length)}
                >
                  <ArrowLeft size={18} />
                </button>
                <button 
                  className="pdp-img-arrow pdp-img-arrow-right"
                  onClick={() => setActiveImageIdx(i => (i + 1) % product.images.length)}
                >
                  <ArrowRight size={18} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="pdp-info">
          {/* Brand + badges */}
          <div className="pdp-header-row">
            <span className="pdp-brand">{product.brand}</span>
            <div className="pdp-header-badges">
              {product.isNewArrival && <span className="badge badge-dark">New Arrival</span>}
              {product.isBestSeller && <span className="badge badge-gold">Best Seller</span>}
            </div>
          </div>

          <h1 className="pdp-title">{product.title}</h1>
          <p className="pdp-sku">SKU: {product.sku}</p>

          {/* Rating */}
          <div className="pdp-rating-row">
            <div className="pdp-stars">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={15} fill={s <= Math.round(avgRating) ? '#c5a880' : 'none'} stroke="#c5a880" />
              ))}
            </div>
            <span className="pdp-rating-val">{avgRating}</span>
            <span className="pdp-review-count">({reviews.length || product.numReviews} reviews)</span>
            <button className="pdp-review-link" onClick={() => document.getElementById('reviews-section').scrollIntoView({ behavior: 'smooth' })}>
              Write a Review
            </button>
          </div>

          {/* Price */}
          <div className="pdp-price-block">
            <span className="pdp-price-current">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <>
                <span className="pdp-price-original">{formatPrice(product.originalPrice)}</span>
                <span className="badge badge-sale">Save {product.discountPercent}%</span>
              </>
            )}
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="pdp-selector-group">
              <div className="pdp-selector-label">
                <span>Color</span>
                <strong>{selectedColor?.name}</strong>
              </div>
              <div className="pdp-color-options">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    className={`pdp-color-swatch ${selectedColor?.name === color.name ? 'selected' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => {
                      setSelectedColor(color);
                      if (color.image) {
                        const imgIdx = product.images.indexOf(color.image);
                        if (imgIdx > -1) setActiveImageIdx(imgIdx);
                      }
                    }}
                    title={color.name}
                  >
                    {selectedColor?.name === color.name && <Check size={12} color="#fff" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div className="pdp-selector-group">
            <div className="pdp-selector-label">
              <span>Size</span>
              <button className="size-guide-link" onClick={() => setSizeGuideOpen(true)}>Size Guide</button>
            </div>
            <div className="pdp-size-options">
              {product.sizes?.map((s, i) => (
                <button
                  key={i}
                  className={`pdp-size-btn ${selectedSize === s.size ? 'selected' : ''} ${s.stock === 0 ? 'oos' : ''}`}
                  onClick={() => s.stock > 0 && setSelectedSize(s.size)}
                  disabled={s.stock === 0}
                >
                  {s.size}
                  {s.stock === 0 && <span className="oos-cross">✕</span>}
                </button>
              ))}
            </div>
            {isLowStock && <p className="stock-warning">⚡ Only {selectedSizeObj.stock} left in this size!</p>}
            {isOOS && <p className="oos-warning">Out of stock in this size. Select another.</p>}
          </div>

          {/* Quantity + CTA */}
          <div className="pdp-qty-cta-row">
            <div className="pdp-qty-control">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            <button 
              className={`btn-primary pdp-add-btn ${addedFeedback ? 'added-success' : ''}`}
              onClick={handleAddToCart}
              disabled={isOOS}
            >
              {addedFeedback 
                ? <><Check size={18} /> Added to Bag!</>
                : <><ShoppingBag size={18} /> {isOOS ? 'Out of Stock' : 'Add to Bag'}</>
              }
            </button>

            <button 
              className={`pdp-wishlist-btn ${inWishlist ? 'wishlisted' : ''}`}
              onClick={() => toggleWishlist(product._id)}
              aria-label="Save to Wishlist"
            >
              <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Express Checkout */}
          <div className="pdp-express-checkout">
            <span className="pdp-express-label">Express Checkout</span>
            <div className="pdp-express-btns">
              <button className="express-btn paypal-btn">PayPal</button>
              <button className="express-btn applepay-btn">Apple Pay</button>
              <button className="express-btn klarna-btn">Klarna</button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="pdp-trust-row">
            <div className="pdp-trust-item">
              <Truck size={16} />
              <span>Free Delivery over $75</span>
            </div>
            <div className="pdp-trust-item">
              <RotateCcw size={16} />
              <span>30-Day Returns</span>
            </div>
            <div className="pdp-trust-item">
              <Shield size={16} />
              <span>Secure Checkout</span>
            </div>
          </div>

          {/* Accordions */}
          <div className="pdp-accordions">
            {[
              {
                id: 'details',
                label: 'Product Details',
                content: (
                  <div>
                    <p className="pdp-description">{product.description}</p>
                    <ul className="pdp-detail-list">
                      <li><strong>Material:</strong> {product.material}</li>
                      <li><strong>Fit:</strong> {product.fit}</li>
                      {product.modelFit && <li><strong>Model Info:</strong> {product.modelFit}</li>}
                    </ul>
                  </div>
                )
              },
              {
                id: 'care',
                label: 'Fabric & Care Instructions',
                content: (
                  <ul className="pdp-care-list">
                    {product.fabricAndCare?.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                )
              },
              {
                id: 'shipping',
                label: 'Shipping & Returns',
                content: (
                  <p className="pdp-shipping-text">{product.shippingPolicy}</p>
                )
              }
            ].map(acc => (
              <div key={acc.id} className={`pdp-accordion ${openAccordion === acc.id ? 'open' : ''}`}>
                <button 
                  className="pdp-accordion-header"
                  onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                >
                  <span>{acc.label}</span>
                  {openAccordion === acc.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openAccordion === acc.id && (
                  <div className="pdp-accordion-body animate-popup">
                    {acc.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section id="reviews-section" className="pdp-reviews-section">
        <div className="container">
          <div className="reviews-header">
            <div>
              <h2 className="reviews-title">Customer Reviews</h2>
              <div className="reviews-summary-row">
                <div className="reviews-big-rating">
                  <span className="big-rating-num">{avgRating}</span>
                  <div className="big-rating-stars">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={20} fill={s <= Math.round(avgRating) ? '#c5a880' : 'none'} stroke="#c5a880" />
                    ))}
                  </div>
                  <span className="big-rating-count">Based on {reviews.length} reviews</span>
                </div>
              </div>
            </div>
            <button className="btn-secondary" onClick={() => setReviewFormOpen(!reviewFormOpen)}>
              Write a Review
            </button>
          </div>

          {/* Write Review Form */}
          {reviewFormOpen && (
            <div className="review-form-card animate-popup">
              <h3>Share Your Experience</h3>
              <div className="review-form-grid">
                <input
                  className="input-base"
                  placeholder="Your name"
                  value={reviewForm.author}
                  onChange={e => setReviewForm(prev => ({ ...prev, author: e.target.value }))}
                />
                <input
                  className="input-base"
                  placeholder="Review title (e.g. 'Exceptional quality')"
                  value={reviewForm.title}
                  onChange={e => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="review-rating-picker">
                <span>Your Rating:</span>
                {[1,2,3,4,5].map(s => (
                  <button key={s} onClick={() => setReviewForm(prev => ({ ...prev, rating: s }))}>
                    <Star size={22} fill={s <= reviewForm.rating ? '#c5a880' : 'none'} stroke="#c5a880" />
                  </button>
                ))}
              </div>
              <div className="review-fit-selector">
                <span>Fit:</span>
                {['Runs Small', 'True to Size', 'Runs Large'].map(fit => (
                  <button 
                    key={fit}
                    className={`fit-option-btn ${reviewForm.fitFeedback === fit ? 'selected' : ''}`}
                    onClick={() => setReviewForm(prev => ({ ...prev, fitFeedback: fit }))}
                  >
                    {fit}
                  </button>
                ))}
              </div>
              <textarea
                className="input-base review-textarea"
                placeholder="Share your thoughts on the quality, fit, and styling..."
                value={reviewForm.comment}
                onChange={e => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                rows={4}
              />
              <div className="review-form-actions">
                <button className="btn-primary" onClick={handleSubmitReview} disabled={reviewSubmitting}>
                  {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
                <button className="btn-secondary" onClick={() => setReviewFormOpen(false)}>Cancel</button>
              </div>
            </div>
          )}

          {/* Reviews Grid */}
          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review._id} className="review-card">
                <div className="review-card-header">
                  <div className="reviewer-avatar">
                    {(review.author || 'A').charAt(0).toUpperCase()}
                  </div>
                  <div className="reviewer-meta">
                    <span className="reviewer-name">{review.author}</span>
                    {review.verifiedBuyer && (
                      <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>✓ Verified Purchase</span>
                    )}
                  </div>
                  <div className="review-stars-right">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={13} fill={s <= review.rating ? '#c5a880' : 'none'} stroke="#c5a880" />
                    ))}
                  </div>
                </div>
                <h4 className="review-title-text">{review.title}</h4>
                <p className="review-comment">{review.comment}</p>
                <div className="review-meta-footer">
                  <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>{review.fitFeedback}</span>
                  {review.helpfulVotes > 0 && (
                    <span className="review-helpful">{review.helpfulVotes} found helpful</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete the Look / Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pdp-related-section">
          <div className="container">
            <h2 className="section-heading">Complete The Look</h2>
            <div className="product-grid product-grid-4">
              {relatedProducts.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Zoom */}
      {zoomedImage && (
        <div className="modal-overlay" onClick={() => setZoomedImage(null)}>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setZoomedImage(null)}>
              <X size={24} />
            </button>
            <img src={zoomedImage} alt="Zoomed view" className="lightbox-img" />
          </div>
        </div>
      )}
    </div>
  );
};
