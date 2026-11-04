export const CATEGORIES = [
  { label: 'All', value: 'All' },
  { label: 'Women', value: 'Women' },
  { label: 'Men', value: 'Men' },
  { label: 'Outerwear', value: 'Outerwear' },
  { label: 'Dresses', value: 'Dresses' },
  { label: 'Tops', value: 'Tops' },
  { label: 'Denim', value: 'Denim' },
  { label: 'New Arrivals', value: 'New Arrivals' },
  { label: 'Sale / Clearance', value: 'Sale' },
  { label: 'Activewear', value: 'Activewear' },
  { label: 'Accessories', value: 'Accessories' }
];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const FITS = ['All', 'Relaxed', 'Slim', 'Oversized', 'Tailored'];

export const FABRICS = ['All', '100% Organic Cotton', 'Linen Blend', 'Merino Wool', 'Silk Blend', 'Selvedge Denim'];

export const SORT_OPTIONS = [
  { label: 'Newest Arrivals', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
  { label: 'Best Selling', value: 'bestseller' },
  { label: 'Highest Rated', value: 'rating' }
];

export const DELIVERY_METHODS = [
  {
    id: 'standard',
    name: 'Standard Tracked Shipping',
    price: 0,
    estimatedDays: '3–5 Business Days',
    desc: 'Free for orders over $75 ($5 otherwise)'
  },
  {
    id: 'express',
    name: 'Complimentary White Glove / Express',
    price: 15,
    estimatedDays: '1–2 Business Days',
    desc: 'Next-day priority air courier with signature required'
  },
  {
    id: 'cod',
    name: 'Cash on Delivery (COD)',
    price: 8,
    estimatedDays: '3–5 Business Days',
    desc: 'Pay cash upon courier arrival at your doorstep'
  }
];

export const SIZE_CHART_DATA = {
  tops: [
    { size: 'XS', chest: '34-36"', waist: '28-30"', hips: '34-36"', length: '27"' },
    { size: 'S', chest: '36-38"', waist: '30-32"', hips: '36-38"', length: '28"' },
    { size: 'M', chest: '38-40"', waist: '32-34"', hips: '38-40"', length: '29"' },
    { size: 'L', chest: '40-42"', waist: '34-36"', hips: '40-42"', length: '30"' },
    { size: 'XL', chest: '42-45"', waist: '36-39"', hips: '42-45"', length: '31"' },
    { size: 'XXL', chest: '45-48"', waist: '39-42"', hips: '45-48"', length: '32"' }
  ],
  bottoms: [
    { size: 'XS', waist: '28"', hips: '34"', inseam: '30"' },
    { size: 'S', waist: '30"', hips: '36"', inseam: '31"' },
    { size: 'M', waist: '32"', hips: '38"', inseam: '32"' },
    { size: 'L', waist: '34"', hips: '40"', inseam: '32"' },
    { size: 'XL', waist: '36"', hips: '42"', inseam: '33"' },
    { size: 'XXL', waist: '38"', hips: '44"', inseam: '33"' }
  ]
};
