import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext.jsx';
import { ProductGrid } from '../components/product/ProductGrid.jsx';
import { CATEGORIES, SIZES, FITS, FABRICS, SORT_OPTIONS } from '../utils/constants.js';
import { Filter, X, SlidersHorizontal, ArrowUpDown, RotateCcw } from 'lucide-react';

export const ProductList = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    formatPrice 
  } = useStore();

  // Filters state
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedFit, setSelectedFit] = useState('All');
  const [selectedFabric, setSelectedFabric] = useState('All');
  const [selectedDiscount, setSelectedDiscount] = useState('All'); // 'All', '10', '20', '30'
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedSort, setSelectedSort] = useState('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Category Banner imagery and descriptions
  const CATEGORY_META = {
    All: {
      title: 'Full Ready-To-Wear Collection',
      desc: 'Explore our complete archives of refined contemporary essentials, crafted from high-grade natural fibers.',
      banner: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80'
    },
    Women: {
      title: 'Women’s Contemporary Wardrobe',
      desc: 'Fluid tailoring, pure silk dresses, and sculptural silhouettes designed for effortless day-to-night transitions.',
      banner: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80'
    },
    Men: {
      title: 'Men’s Tailored Essentials',
      desc: 'Architectural outerwear, Japanese selvedge denim, and relaxed organic cotton shirting.',
      banner: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1600&q=80'
    },
    Outerwear: {
      title: 'Architectural Outerwear & Coats',
      desc: 'Double-faced cashmere coats, structured trench coats, and shearling aviators designed for all seasons.',
      banner: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1600&q=80'
    },
    Dresses: {
      title: 'Silk Slips & Fluid Silhouettes',
      desc: 'Minimalist evening wear, linen summer gowns, and modern drape detailing.',
      banner: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1600&q=80'
    },
    Denim: {
      title: 'Selvedge & Raw Japanese Denim',
      desc: 'Crafted on vintage shuttle looms. Raw indigo washes and comfortable relaxed taper cuts.',
      banner: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1600&q=80'
    },
    Tops: {
      title: 'Shirts, Knitwear & Tops',
      desc: 'Breathable organic cotton poplin, Italian merino knits, and foundational tees.',
      banner: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1600&q=80'
    },
    'New Arrivals': {
      title: 'New Arrivals & Runway Debuts',
      desc: 'Explore the freshest additions to our seasonal wardrobe — modern cuts, premium textures, and limited editions.',
      banner: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=80'
    },
    Sale: {
      title: 'Seasonal Sale & Archive Clearance',
      desc: 'Elevated capsule staples and archive pieces at exclusive discounted pricing. Enjoy up to 24% off select luxury garments.',
      banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80'
    },
    'Sale / Clearance': {
      title: 'Seasonal Sale & Archive Clearance',
      desc: 'Elevated capsule staples and archive pieces at exclusive discounted pricing. Enjoy up to 24% off select luxury garments.',
      banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80'
    }
  };

  const currentMeta = CATEGORY_META[selectedCategory] || CATEGORY_META.All;

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory && selectedCategory !== 'All') {
      const catLower = selectedCategory.toLowerCase();
      if (catLower === 'new arrivals') {
        list = list.filter(p => p.isNewArrival === true);
      } else if (catLower === 'sale' || catLower === 'sale / clearance' || catLower === 'clearance' || catLower === 'sale & clearance') {
        list = list.filter(p => (p.discountPercent > 0 || (p.originalPrice && p.originalPrice > p.price)));
      } else {
        list = list.filter(p => 
          p.category?.toLowerCase() === catLower ||
          p.gender?.toLowerCase() === catLower
        );
      }
    }

    // Size filter
    if (selectedSize !== 'All') {
      list = list.filter(p => p.sizes?.some(s => (s.size || s) === selectedSize));
    }

    // Fit filter
    if (selectedFit !== 'All') {
      list = list.filter(p => p.fit === selectedFit);
    }

    // Fabric filter
    if (selectedFabric !== 'All') {
      list = list.filter(p => p.material?.toLowerCase().includes(selectedFabric.toLowerCase()));
    }

    // Discount filter
    if (selectedDiscount !== 'All') {
      const minDisc = Number(selectedDiscount);
      list = list.filter(p => (p.discountPercent || 0) >= minDisc);
    }

    // Price filter
    list = list.filter(p => p.price <= maxPrice);

    // Sorting
    if (selectedSort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (selectedSort === 'bestseller') {
      list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    } else {
      // Newest
      list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    }

    return list;
  }, [products, selectedCategory, selectedSize, selectedFit, selectedFabric, selectedDiscount, maxPrice, selectedSort]);

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSize('All');
    setSelectedFit('All');
    setSelectedFabric('All');
    setSelectedDiscount('All');
    setMaxPrice(500);
    setSelectedSort('newest');
  };

  const hasActiveFilters = 
    selectedCategory !== 'All' || 
    selectedSize !== 'All' || 
    selectedFit !== 'All' || 
    selectedFabric !== 'All' || 
    selectedDiscount !== 'All' || 
    maxPrice < 500;

  return (
    <div className="product-listing-page">
      {/* 1. Category Header Banner */}
      <div 
        className="plp-category-header"
        style={{ backgroundImage: `url(${currentMeta.banner})` }}
      >
        <div className="plp-header-overlay" />
        <div className="container plp-header-content">
          <span className="plp-breadcrumbs">Home / Collection / {selectedCategory}</span>
          <h1 className="plp-category-title">{currentMeta.title}</h1>
          <p className="plp-category-desc">{currentMeta.desc}</p>
        </div>
      </div>

      <div className="container plp-main-layout">
        {/* Controls Toolbar: Mobile filter trigger, Result count, Sorting */}
        <div className="plp-toolbar">
          <div className="toolbar-left">
            <button 
              type="button" 
              className="mobile-filter-trigger"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <SlidersHorizontal size={18} />
              <span>Filters {hasActiveFilters && '(Active)'}</span>
            </button>
            <span className="results-count-text">
              Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'garment' : 'garments'}
            </span>
          </div>

          <div className="toolbar-right">
            <div className="sort-selector-group">
              <ArrowUpDown size={15} className="sort-icon" />
              <label htmlFor="plp-sort" className="sort-label">Sort by:</label>
              <select 
                id="plp-sort"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="sort-dropdown"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="active-filter-chips-row">
            <span className="active-chips-label">Active filters:</span>
            {selectedCategory !== 'All' && (
              <span className="filter-chip">
                Category: {selectedCategory}
                <button type="button" onClick={() => setSelectedCategory('All')}><X size={13} /></button>
              </span>
            )}
            {selectedSize !== 'All' && (
              <span className="filter-chip">
                Size: {selectedSize}
                <button type="button" onClick={() => setSelectedSize('All')}><X size={13} /></button>
              </span>
            )}
            {selectedFit !== 'All' && (
              <span className="filter-chip">
                Fit: {selectedFit}
                <button type="button" onClick={() => setSelectedFit('All')}><X size={13} /></button>
              </span>
            )}
            {selectedDiscount !== 'All' && (
              <span className="filter-chip">
                Discount: {selectedDiscount}%+ Off
                <button type="button" onClick={() => setSelectedDiscount('All')}><X size={13} /></button>
              </span>
            )}
            {maxPrice < 500 && (
              <span className="filter-chip">
                Under {formatPrice(maxPrice)}
                <button type="button" onClick={() => setMaxPrice(500)}><X size={13} /></button>
              </span>
            )}
            <button type="button" className="clear-all-filters-btn" onClick={clearAllFilters}>
              <RotateCcw size={13} /> Reset All
            </button>
          </div>
        )}

        {/* PLP Grid & Sidebar Layout */}
        <div className="plp-body-grid">
          {/* Filter Sidebar */}
          <aside className={`plp-sidebar ${mobileFiltersOpen ? 'mobile-open' : ''}`}>
            <div className="sidebar-header-mobile">
              <h3>Filter Garments</h3>
              <button type="button" onClick={() => setMobileFiltersOpen(false)}><X size={20} /></button>
            </div>

            {/* Category Filter */}
            <div className="filter-group-widget">
              <h4 className="widget-title">Category</h4>
              <div className="category-filter-list">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.value || (cat.value === 'Sale' && (selectedCategory === 'Sale' || selectedCategory === 'Sale / Clearance'));
                  
                  const getCategoryCount = (val) => {
                    if (val === 'All') return products.length;
                    const v = val.toLowerCase();
                    if (v === 'new arrivals') {
                      return products.filter(p => p.isNewArrival === true).length;
                    }
                    if (v === 'sale' || v === 'sale / clearance' || v === 'clearance' || v === 'sale & clearance') {
                      return products.filter(p => (p.discountPercent > 0 || (p.originalPrice && p.originalPrice > p.price))).length;
                    }
                    return products.filter(p => 
                      p.category?.toLowerCase() === v || p.gender?.toLowerCase() === v
                    ).length;
                  };

                  return (
                    <button
                      key={cat.value}
                      type="button"
                      className={`cat-filter-btn ${isActive ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(cat.value)}
                    >
                      <span>{cat.label}</span>
                      <span className="cat-count">
                        {getCategoryCount(cat.value)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Filter */}
            <div className="filter-group-widget">
              <h4 className="widget-title">Size</h4>
              <div className="size-filter-grid">
                <button 
                  type="button" 
                  className={`size-filter-chip ${selectedSize === 'All' ? 'active' : ''}`}
                  onClick={() => setSelectedSize('All')}
                >
                  All
                </button>
                {SIZES.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    className={`size-filter-chip ${selectedSize === sz ? 'active' : ''}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="filter-group-widget">
              <div className="widget-header-row">
                <h4 className="widget-title">Price Range</h4>
                <span className="price-display-pill">Up to {formatPrice(maxPrice)}</span>
              </div>
              <input 
                type="range" 
                min={30} 
                max={500} 
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="price-range-slider"
              />
              <div className="slider-range-limits">
                <span>{formatPrice(30)}</span>
                <span>{formatPrice(500)}</span>
              </div>
            </div>

            {/* Silhouette / Fit */}
            <div className="filter-group-widget">
              <h4 className="widget-title">Silhouette & Fit</h4>
              <div className="fit-options-list">
                {FITS.map((fit) => (
                  <label key={fit} className="radio-filter-item">
                    <input 
                      type="radio" 
                      name="fit_filter"
                      checked={selectedFit === fit}
                      onChange={() => setSelectedFit(fit)}
                    />
                    <span>{fit}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Discount / Promotions */}
            <div className="filter-group-widget">
              <h4 className="widget-title">Discount & Deals</h4>
              <div className="discount-options-list">
                {[
                  { label: 'All Garments', val: 'All' },
                  { label: '10% Off or more', val: '10' },
                  { label: '20% Off or more', val: '20' },
                  { label: '30% Off or more', val: '30' }
                ].map((d) => (
                  <label key={d.val} className="radio-filter-item">
                    <input 
                      type="radio" 
                      name="discount_filter"
                      checked={selectedDiscount === d.val}
                      onChange={() => setSelectedDiscount(d.val)}
                    />
                    <span>{d.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Cards Grid */}
          <main className="plp-products-content">
            <ProductGrid 
              products={filteredProducts} 
              emptyMessage="No clothing items match your chosen filters. Try adjusting price range or size."
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
