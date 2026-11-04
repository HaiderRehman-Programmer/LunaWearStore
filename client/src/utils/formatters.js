// Exchange rates relative to USD
export const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)', country: 'United States' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)', country: 'European Union' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)', country: 'United Kingdom' },
  CAD: { symbol: 'CA$', rate: 1.36, label: 'CAD (CA$)', country: 'Canada' },
  AUD: { symbol: 'AU$', rate: 1.52, label: 'AUD (AU$)', country: 'Australia' },
  JPY: { symbol: '¥', rate: 155.0, label: 'JPY (¥)', country: 'Japan' }
};

/**
 * Formats a USD base price to the target currency
 */
export const formatCurrency = (amountInUSD, currencyCode = 'USD') => {
  const config = CURRENCY_RATES[currencyCode] || CURRENCY_RATES.USD;
  const converted = (amountInUSD || 0) * config.rate;

  if (currencyCode === 'JPY') {
    return `${config.symbol}${Math.round(converted).toLocaleString()}`;
  }

  return `${config.symbol}${converted.toFixed(2)}`;
};

/**
 * Calculates discount percentage
 */
export const calculateSavings = (originalPrice, currentPrice) => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

/**
 * Formats dates nicely (e.g. Oct 10, 2026)
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Calculate cart subtotal, discount, shipping, tax, and grand total
 */
export const calculateOrderTotals = (items = [], coupon = null, deliveryFee = 0) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  let discountAmount = 0;
  if (coupon && coupon.discountPercent) {
    discountAmount = (subtotal * coupon.discountPercent) / 100;
  }

  // Free shipping threshold: $75
  const shipping = subtotal >= 75 ? 0 : Number(deliveryFee);
  
  // Estimated 8% sales tax on discounted subtotal
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = Number((taxableAmount * 0.08).toFixed(2));

  const total = Number((taxableAmount + shipping + tax).toFixed(2));

  return {
    subtotal: Number(subtotal.toFixed(2)),
    discountAmount: Number(discountAmount.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    tax,
    total,
    freeShippingThreshold: 75,
    amountToFreeShipping: Math.max(0, 75 - subtotal)
  };
};
