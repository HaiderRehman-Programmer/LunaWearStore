import React from 'react';

export const Instagram = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const Facebook = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export const Twitter = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
  </svg>
);

export const Youtube = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15" fill={color}/>
  </svg>
);

export const ApplePayIcon = ({ className = '' }) => (
  <svg viewBox="0 0 60 25" width="48" height="20" fill="currentColor" className={className}>
    <path d="M13.2 12.3c-.02-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.8-3.6.8-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 6.9 1.1 9.2.8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3.1-.7 1.4 0 1.8.7 3.1.7 1.2 0 2-.1 2.8-2.2.9-1.3 1.3-2.6 1.3-2.7-.1-.1-2.4-.9-2.4-3.6zM11.6 5.4c.6-.8 1.1-1.9 1-3-.9.1-2 .6-2.6 1.4-.6.7-1.1 1.8-1 2.9 1.1.1 2.1-.5 2.6-1.3z" />
    <text x="20" y="16.5" fontFamily="system-ui, -apple-system" fontSize="13" fontWeight="600" fill="currentColor">Pay</text>
  </svg>
);

export const GooglePayIcon = ({ className = '' }) => (
  <svg viewBox="0 0 65 26" width="52" height="21" className={className}>
    <text x="0" y="18" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="700" fill="#4285F4">G</text>
    <text x="14" y="18" fontFamily="system-ui, sans-serif" fontSize="13" fontWeight="500" fill="currentColor">Pay</text>
  </svg>
);

export const PayPalIcon = ({ className = '' }) => (
  <svg viewBox="0 0 70 24" width="56" height="20" className={className}>
    <text x="0" y="17" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="800" fontStyle="italic" fill="#003087">Pay</text>
    <text x="28" y="17" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="800" fontStyle="italic" fill="#0079C1">Pal</text>
  </svg>
);

export const KlarnaIcon = ({ className = '' }) => (
  <svg viewBox="0 0 65 24" width="52" height="20" className={className}>
    <rect width="65" height="24" rx="4" fill="#FFB3C7" />
    <text x="8" y="16.5" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="800" fill="#0A0A0A">Klarna.</text>
  </svg>
);

export const VisaCardIcon = () => (
  <span style={{ fontWeight: 800, fontStyle: 'italic', letterSpacing: '1px', fontSize: '13px', color: '#1a1f71' }}>VISA</span>
);

export const MastercardIcon = () => (
  <svg width="26" height="16" viewBox="0 0 36 24">
    <circle cx="13" cy="12" r="11" fill="#EB001B" />
    <circle cx="23" cy="12" r="11" fill="#F79E1B" fillOpacity="0.8" />
  </svg>
);
