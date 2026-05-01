import { getUserTerritory } from '../../src/config/pricing';

export type RegionCode = 'IN' | 'US' | 'GLOBAL';

export function formatMoney(amount: number, regionCode: RegionCode = 'IN'): string {
  if (regionCode === 'US' || regionCode === 'GLOBAL') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  // Default to INR
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function useCurrency(): RegionCode {
  return getUserTerritory() as RegionCode;
}