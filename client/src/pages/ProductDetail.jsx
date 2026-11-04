import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { useCart } from '../hooks/useCart.js';
import { ImageGallery } from '../components/product/ImageGallery.jsx';
import { SizePicker } from '../components/product/SizePicker.jsx';
import { ProductCard } from '../components/product/ProductCard.jsx';
import { Modal } from '../components/common/Modal.jsx';
import productService from '../services/productService.js';
import { 
  Star, 
  ShoppingBag, 
  Zap, 
  Heart, 
  Share2, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Sparkles,
  MessageSquarePlus,
  ThumbsUp
} from 'lucide-react';

export const ProductDetail = () => {
  const { 
    selectedProduct, 
    products, 
    setSizeGuideModalOpen, 
    toggleWishlist, 
    isWishlisted, 
    formatPrice, 
    setActivePage,
    addToast 
  } = useStore();

  const { addToCart } = useCart();

  if (!selectedProduct) {
    return (
      <div className="container py-12 text-center">
        <h2>Garment Not Found</h2>
        <button className="primary-btn mt-4" onClick={() => setActivePage('shop')}>
          Return to Shop
        </button>
      </div>
    );
  }

  const product = selectedProduct;
  const prodId = product.id || product._id;
  const wishlisted = isWishlisted(prodId);

  // States
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || 'Classic');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]?.size || 'M');
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState('fabric'); // 'fabric' | 'model' | 'shipping'

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    title: '',
    comment: '',
    fitFeedback: 'True to Size'
  });

  // Fetch reviews for product
  useEffect(() => {
    if (prodId) {
      productService.getProductReviews(prodId)
        .then(res => {
          if (Array.isArray(res)) setReviews(res);
        })
        .catch(() => {});
    }
  }, [prodId]);

  // Gallery images with color-specific swap if available
  const colorObj = product.colors?.find(c => c.name === selectedColor);
  const galleryImages = [
    ...(colorObj?.image ? [colorObj.image] : []),
    ...(product.images || [])
  ].filter((v, i, a) => a.indexOf(v) === i); // unique

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    addToast(`Added "${product.title}" (${selectedSize}, ${selectedColor}) to your bag`);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.author || !newReview.title || !newReview.comment) {
      alert('Please fill out all review fields');
      return;
    }

    try {
      const created = await productService.addProductReview(product.id, newReview);
      setReviews(prev => [created?.data || created || { ...newReview, createdAt: new Date().toISOString() }, ...prev]);
      setReviewModalOpen(false);
      setNewReview({ author: '', rating: 5, title: '', comment: '', fitFeedback: 'True to Size' });
      addToast('Thank you! Your verified review has been published.');
    } catch (err) {
      // Local fallback
      setReviews(prev => [{ ...newReview, _id: `rev-${Date.now()}`, createdAt: new Date().toISOString() }, ...prev]);
      setReviewModalOpen(false);
      addToast('Thank you! Your review has been added.');
    }
  };

  // Recommended products: "Complete the Look"
  const recommendedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 4);

  return (
    <div className="product-detail-view">
      <div className="container pdp-main-container">
        {/* Breadcrumbs */}
        <nav className="pdp-breadcrumbs">
          <span onClick={() => setActivePage('home')}>Home</span> / 
          <span onClick={() => setActivePage('shop')}>Collection</span> / 
          <span>{product.category}</span> / 
          <strong>{product.title}</strong>
        </nav>

        {/* 2-Column PDP Grid */}
        <div className="pdp-layout-grid">
          {/* Left Column: Image / Video Gallery */}
          <div className="pdp-gallery-column">
            <ImageGallery images={galleryImages} title={product.title} />
          </div>

          {/* Right Column: Product Information & Selectors */}
          <div className="pdp-info-column">
            {/* Header info */}
            <div className="pdp-header">
              <span className="pdp-brand-name">{product.brand || 'Luna Wear'}</span>
              <h1 className="pdp-product-title">{product.title}</h1>
              <span className="pdp-sku-badge">Item SKU: {product.sku || 'LUNA-2026-X'}</span>

              <div className="pdp-rating-strip">
                <div className="pdp-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < Math.floor(product.rating || 5) ? '#d4af37' : 'none'} 
                      color="#d4af37" 
                    />
                  ))}
                  <span className="rating-score">{product.rating?.toFixed(1) || '4.9'}</span>
                </div>
                <span className="rating-divider">•</span>
                <a href="#customer-reviews-section" className="review-count-anchor">
                  {reviews.length || product.numReviews || 12} Verified Reviews
                </a>
              </div>
            </div>

            {/* Price block */}
            <div className="pdp-pricing-box">
              <span className="pdp-current-price">{formatPrice(product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="pdp-original-price">{formatPrice(product.originalPrice)}</span>
                  <span className="pdp-savings-badge">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="pdp-description-text">{product.description}</p>

            {/* Color Swatches Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="pdp-selector-block">
                <div className="selector-title-row">
                  <span className="selector-label">Color: <strong>{selectedColor}</strong></span>
                </div>
                <div className="pdp-color-swatches-row">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      className={`pdp-color-chip ${selectedColor === c.name ? 'active' : ''}`}
                      onClick={() => setSelectedColor(c.name)}
                      title={c.name}
                    >
                      <span className="chip-dot" style={{ backgroundColor: c.hex }} />
                      <span className="chip-name">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector with stock alerts */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="pdp-selector-block">
                <SizePicker
                  sizes={product.sizes}
                  selectedSize={selectedSize}
                  onSelectSize={setSelectedSize}
                  onOpenSizeGuide={() => setSizeGuideModalOpen(true)}
                />
              </div>
            )}

            {/* Quantity Selector and Wishlist */}
            <div className="pdp-qty-wishlist-row">
              <div className="pdp-quantity-widget">
                <button 
                  type="button" 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-val">{quantity}</span>
                <button 
                  type="button" 
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button 
                type="button" 
                className={`pdp-wishlist-btn ${wishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Toggle wishlist"
              >
                <Heart size={20} fill={wishlisted ? '#e63946' : 'none'} color={wishlisted ? '#e63946' : 'currentColor'} />
                <span>{wishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
              </button>
            </div>

            {/* Call To Action Buttons: Add to Cart & Buy Now */}
            <div className="pdp-cta-actions">
              <button 
                type="button" 
                className="pdp-add-to-cart-btn"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={20} />
                <span>Add to Bag</span>
              </button>

              <button 
                type="button" 
                className="pdp-buy-now-btn"
                onClick={handleBuyNow}
              >
                <Zap size={20} />
                <span>Buy Now • Express Checkout</span>
              </button>
            </div>

            {/* Reassurance perks */}
            <div className="pdp-perks-strip">
              <div className="pdp-perk"><Truck size={17} /> <span>Free shipping on orders $75+</span></div>
              <div className="pdp-perk"><RotateCcw size={17} /> <span>30-Day Hassle-Free Returns</span></div>
              <div className="pdp-perk"><ShieldCheck size={17} /> <span>Authenticity & Quality Guaranteed</span></div>
            </div>

            {/* Product Details Accordion */}
            <div className="pdp-accordion-group">
              {/* Accordion 1: Fabric & Care */}
              <div className="accordion-item">
                <button 
                  type="button" 
                  className="accordion-header"
                  onClick={() => setActiveAccordion(activeAccordion === 'fabric' ? null : 'fabric')}
                >
                  <span>Fabric Composition & Care Instructions</span>
                  {activeAccordion === 'fabric' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {activeAccordion === 'fabric' && (
                  <div className="accordion-content animate-fade">
                    <p><strong>Primary Material:</strong> {product.material || '100% Organic Italian Cotton'}</p>
                    <ul className="care-instruction-list">
                      {product.fabricAndCare?.length > 0 ? (
                        product.fabricAndCare.map((item, idx) => <li key={idx}>• {item}</li>)
                      ) : (
                        <>
                          <li>• Machine wash cold on gentle cycle with like colors</li>
                          <li>• Use eco-friendly mild detergent; do not bleach</li>
                          <li>• Lay flat to dry in shade to preserve garment shape</li>
                          <li>• Warm steam iron on reverse side if needed</li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Model & Fit Details */}
              <div className="accordion-item">
                <button 
                  type="button" 
                  className="accordion-header"
                  onClick={() => setActiveAccordion(activeAccordion === 'model' ? null : 'model')}
                >
                  <span>Model Sizing & Fit Specifications</span>
                  {activeAccordion === 'model' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {activeAccordion === 'model' && (
                  <div className="accordion-content animate-fade">
                    <p><strong>Silhouette:</strong> {product.fit || 'Relaxed Contemporary Cut'}</p>
                    <p><strong>Model Reference:</strong> {product.modelFit || 'Model is 5\'10" (178cm) with a 32" bust, wearing size S.'}</p>
                    <p><strong>Fit Recommendation:</strong> True to size. For an intentionally oversized aesthetic, consider sizing up by one tier.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping & Return Policies */}
              <div className="accordion-item">
                <button 
                  type="button" 
                  className="accordion-header"
                  onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? null : 'shipping')}
                >
                  <span>Complimentary Shipping & 30-Day Returns</span>
                  {activeAccordion === 'shipping' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="accordion-content animate-fade">
                    <p>{product.shippingPolicy || 'Complimentary express delivery on all orders over $75.'}</p>
                    <p>We believe in our craftsmanship. If you are not completely satisfied, return unworn items with tags intact within 30 days for a full refund via your original payment method.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Customer Reviews & Ratings Section */}
        <section id="customer-reviews-section" className="pdp-reviews-section">
          <div className="reviews-section-header">
            <div>
              <span className="section-eyebrow">CUSTOMER VOICES</span>
              <h2 className="section-heading">Verified Customer Reviews</h2>
            </div>
            <button 
              type="button" 
              className="write-review-btn"
              onClick={() => setReviewModalOpen(true)}
            >
              <MessageSquarePlus size={18} /> Write a Review
            </button>
          </div>

          {/* Rating summary cards */}
          <div className="reviews-summary-overview">
            <div className="overall-score-card">
              <span className="big-rating-number">{product.rating?.toFixed(1) || '4.9'}</span>
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#d4af37" color="#d4af37" />
                ))}
              </div>
              <span className="total-reviews-count">Based on {reviews.length || 12} verified reviews</span>
            </div>

            <div className="fit-feedback-meter-card">
              <h4>Fit Accuracy Feedback</h4>
              <div className="fit-bar-item">
                <span>Runs Small (8%)</span>
                <div className="meter-track"><div className="meter-fill" style={{ width: '8%' }} /></div>
              </div>
              <div className="fit-bar-item">
                <span>True to Size (86%)</span>
                <div className="meter-track"><div className="meter-fill" style={{ width: '86%' }} /></div>
              </div>
              <div className="fit-bar-item">
                <span>Runs Large (6%)</span>
                <div className="meter-track"><div className="meter-fill" style={{ width: '6%' }} /></div>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="reviews-cards-list">
            {reviews.map((rev) => (
              <div key={rev._id || rev.id} className="review-card-item">
                <div className="review-card-top">
                  <div className="reviewer-info">
                    <span className="reviewer-name">{rev.author}</span>
                    {rev.verifiedBuyer && (
                      <span className="verified-buyer-pill">
                        <CheckCircle2 size={13} /> Verified Buyer
                      </span>
                    )}
                  </div>
                  <span className="review-date">
                    {new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <div className="review-rating-row">
                  <div className="review-stars">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} fill="#d4af37" color="#d4af37" />
                    ))}
                  </div>
                  <span className="review-fit-tag">Fit: {rev.fitFeedback || 'True to Size'}</span>
                </div>

                <h4 className="review-item-title">{rev.title}</h4>
                <p className="review-item-comment">{rev.comment}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Recommended Products / "Complete the Look" */}
        {recommendedProducts.length > 0 && (
          <section className="complete-the-look-section">
            <div className="section-header-row">
              <div>
                <span className="section-eyebrow">CURATED STYLING</span>
                <h2 className="section-heading">Complete The Look</h2>
              </div>
            </div>

            <div className="product-grid">
              {recommendedProducts.map((p, idx) => (
                <ProductCard key={p.id || p._id || idx} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Review Submission Modal */}
      <Modal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        title="Share Your Garment Experience"
        maxWidth="540px"
      >
        <form className="review-submit-form" onSubmit={handleReviewSubmit}>
          <div className="form-group-block">
            <label className="field-label">Your Name</label>
            <input 
              type="text" 
              placeholder="e.g. Julian M."
              value={newReview.author}
              onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
              required
              className="form-input"
            />
          </div>

          <div className="form-group-block">
            <label className="field-label">Rating</label>
            <div className="interactive-star-picker">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="star-pick-btn"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                >
                  <Star 
                    size={24} 
                    fill={star <= newReview.rating ? '#d4af37' : 'none'} 
                    color="#d4af37" 
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="form-group-block">
            <label className="field-label">Review Headline</label>
            <input 
              type="text" 
              placeholder="e.g. Exceptional Italian drape and timeless cut"
              value={newReview.title}
              onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
              required
              className="form-input"
            />
          </div>

          <div className="form-group-block">
            <label className="field-label">Fit Feedback</label>
            <select
              value={newReview.fitFeedback}
              onChange={(e) => setNewReview({ ...newReview, fitFeedback: e.target.value })}
              className="form-select"
            >
              <option value="Runs Small">Runs Small</option>
              <option value="True to Size">True to Size</option>
              <option value="Runs Large">Runs Large</option>
            </select>
          </div>

          <div className="form-group-block">
            <label className="field-label">Written Review</label>
            <textarea 
              rows={4}
              placeholder="Tell others about the fabric handfeel, sizing, and styling..."
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              required
              className="form-textarea"
            />
          </div>

          <button type="submit" className="submit-review-action-btn">
            Submit Verified Review
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ProductDetail;
