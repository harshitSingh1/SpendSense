export type CountryCode = 'IN' | 'US' | 'GLOBAL';

export const pricingConfig = {
  IN: { 
    currency: 'INR', 
    symbol: '₹', 
    monthly: 199, 
    quarterly: 499,
    yearly: 1799, 
    strikethroughMonthly: 399, 
    strikethroughQuarterly: 1197,
    strikethroughYearly: 4788 
  },
  US: { 
    currency: 'USD', 
    symbol: '$', 
    monthly: 16.99, 
    quarterly: 39.99,
    yearly: 129, 
    strikethroughMonthly: 29.99, 
    strikethroughQuarterly: 89.97,
    strikethroughYearly: 359.88 
  },
  GLOBAL: { 
    currency: 'USD', 
    symbol: '$', 
    monthly: 12.99, 
    quarterly: 29.99,
    yearly: 99, 
    strikethroughMonthly: 24.99, 
    strikethroughQuarterly: 74.97,
    strikethroughYearly: 299.88 
  }
};

export function getUserTerritory(): CountryCode {
  if (typeof Intl !== 'undefined') {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta') return 'IN';
    if (tz.startsWith('America/') && (tz.includes('New_York') || tz.includes('Chicago') || tz.includes('Los_Angeles') || tz.includes('Denver') || tz.includes('Phoenix') || tz.includes('Anchorage') || tz.includes('Honolulu'))) return 'US';
  }

  if (typeof document !== 'undefined') {
    const match = document.cookie.split('; ').find(row => row.startsWith('user-country='));
    const country = match ? match.split('=')[1] : null;
    
    if (country === 'IN') return 'IN';
    if (country === 'US') return 'US';
  }
  
  return 'GLOBAL';
}

export function getPricing() {
  const territory = getUserTerritory();
  return pricingConfig[territory];
}
