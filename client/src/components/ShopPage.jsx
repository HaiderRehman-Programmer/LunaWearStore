import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react';

const CATEGORIES = ['All', 'Women', 'Men', 'Tops', 'Dresses', 'Outerwear', 'Denim', 'Activewear', 'Accessories'];
const GENDERS = ['All', 'Women', 'Men', 'Unisex'];
const FITS = ['All', 'Tailored', 'Relaxed', 'Oversized', 'Regular', 'Slim'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'bestseller', label: 'Best Selling' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' }
];

export const ShopPage = () => {
  const { products, loadingProducts, selectedCategory, setSelectedCategory, formatPrice, navigateToCategory } = useStore();

  const [filters, setFilters] = useState({
    category: selectedCategory || 'All',
    gender: 'All',
    fit: 'All',
    minPrice: '',
    maxPrice: '',
    sort: 'newest',
    search: ''
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterSections, setFilterSections] = useState({ category: true, price: true, gender: false, fit: false });

  useEffect(() => {
    setFilters(prev => ({ ...prev, category: selectedCategory || 'All' }));
  }, [selectedCategory]);

  // Local client-side filtering
  const filteredProducts = products.filter(p => {
    if (filters.category !== 'All' && p.category !== filters.category && p.gender !== filters.category) return false;
    if (filters.gender !== 'All' && p.gender !== filters.gender && p.gender !== 'Unisex') return false;
    if (filters.fit !== 'All' && p.fit !== filters.fit) return false;
    if (filters.minPrice && p.price < parseFloat(filters.minPrice)) return false;
    if (filters.maxPrice && p.price > parseFloat(filters.maxPrice)) return false;
    if (filters.search) {
      const s = filters.search.toLowerCase();
      if (!p.title.toLowerCase().includes(s) && !p.category.toLowerCase().includes(s) && !p.brand.toLowerCase().includes(s)) return false;
    }
    return true;
  }).sort((a, b) => {
    if (filters.sort === 'price-low') return a.price - b.price;
    if (filters.sort === 'price-high') return b.price - a.price;
    if (filters.sort === 'rating') return b.rating - a.rating;
    if (filters.sort === 'bestseller') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
  });

  const updateFilter = (key, val) => setFilters(prev => ({ ...prev, [key]: val }));
  const resetFilters = () => setFilters({ category: 'All', gender: 'All', fit: 'All', minPrice: '', maxPrice: '', sort: 'newest', search: '' });

  const activeFiltersCount = [
    filters.category !== 'All',
    filters.gender !== 'All',
    filters.fit !== 'All',
    filters.minPrice,
    filters.maxPrice
  ].filter(Boolean).length;

  const toggleSection = (section) => {
    setFilterSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="shop-page">
      {/* Category Header Banner */}
      <div className="shop-hero-banner">
        <div className="container">
          <h1 className="shop-hero-title">
            {filters.category === 'All' ? 'All Collections' : filters.category}
          </h1>
          <p className="shop-hero-desc">
            {filteredProducts.length} carefully curated pieces
          </p>
        </div>
      </div>

      <div className="container shop-layout">
        {/* SIDEBAR FILTERS */}
        <aside className={`shop-sidebar ${filtersOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-header">
            <h3>Refine</h3>
            {activeFiltersCount > 0 && (
              <button className="sidebar-clear-btn" onClick={resetFilters}>
                Clear All ({activeFiltersCount})
              </button>
            )}
            <button className="sidebar-mobile-close" onClick={() => setFiltersOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Category Filter */}
          <div className="filter-section">
            <button className="filter-section-header" onClick={() => toggleSection('category')}>
              <span>Category</span>
              {filterSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {filterSections.category && (
              <div className="filter-options-list">
                {CATEGORIES.map(cat => (
                  <label key={cat} className="filter-radio-item">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={filters.category === cat}
                      onChange={() => updateFilter('category', cat)}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range Filter */}
          <div className="filter-section">
            <button className="filter-section-header" onClick={() => toggleSection('price')}>
              <span>Price Range</span>
              {filterSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {filterSections.price && (
              <div className="price-range-inputs">
                <input
                  type="number"
                  className="input-base price-input"
                  placeholder="Min $"
                  value={filters.minPrice}
                  onChange={e => updateFilter('minPrice', e.target.value)}
                  min="0"
                />
                <span className="price-dash">—</span>
                <input
                  type="number"
                  className="input-base price-input"
                  placeholder="Max $"
                  value={filters.maxPrice}
                  onChange={e => updateFilter('maxPrice', e.target.value)}
                  min="0"
                />
              </div>
            )}
          </div>

          {/* Gender Filter */}
          <div className="filter-section">
            <button className="filter-section-header" onClick={() => toggleSection('gender')}>
              <span>Gender</span>
              {filterSections.gender ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {filterSections.gender && (
              <div className="filter-options-list">
                {GENDERS.map(g => (
                  <label key={g} className="filter-radio-item">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={filters.gender === g}
                      onChange={() => updateFilter('gender', g)}
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Fit Filter */}
          <div className="filter-section">
            <button className="filter-section-header" onClick={() => toggleSection('fit')}>
              <span>Fit</span>
              {filterSections.fit ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {filterSections.fit && (
              <div className="filter-options-list">
                {FITS.map(f => (
                  <label key={f} className="filter-radio-item">
                    <input
                      type="radio"
                      name="fit"
                      value={f}
                      checked={filters.fit === f}
                      onChange={() => updateFilter('fit', f)}
                    />
                    <span>{f}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Mobile filter overlay */}
        {filtersOpen && (
          <div className="sidebar-overlay" onClick={() => setFiltersOpen(false)} />
        )}

        {/* MAIN PRODUCT GRID COLUMN */}
        <main className="shop-main">
          {/* Toolbar */}
          <div className="shop-toolbar">
            <div className="toolbar-left">
              <button 
                className="filter-toggle-btn"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <SlidersHorizontal size={18} />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="filter-active-badge">{activeFiltersCount}</span>
                )}
              </button>

              {/* Active filter chips */}
              <div className="active-filter-chips">
                {filters.category !== 'All' && (
                  <button className="filter-chip" onClick={() => updateFilter('category', 'All')}>
                    {filters.category} <X size={12} />
                  </button>
                )}
                {filters.gender !== 'All' && (
                  <button className="filter-chip" onClick={() => updateFilter('gender', 'All')}>
                    {filters.gender} <X size={12} />
                  </button>
                )}
              </div>
            </div>

            <div className="toolbar-right">
              <span className="product-count-label">{filteredProducts.length} items</span>
              <select 
                className="sort-select"
                value={filters.sort}
                onChange={e => updateFilter('sort', e.target.value)}
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {loadingProducts ? (
            <div className="shop-loading">
              <div className="loading-spinner" />
              <p>Loading collection...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="shop-empty">
              <p className="shop-empty-title">No pieces match your current filters.</p>
              <button className="btn-primary" onClick={resetFilters}>View All Products</button>
            </div>
          ) : (
            <div className="product-grid product-grid-3">
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
