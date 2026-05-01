import { CountryCode } from './pricing';

export const benchmarks: Record<CountryCode, { icuAdmission: number; carTotaled: number; }> = {
  IN: { icuAdmission: 500000, carTotaled: 150000 },
  US: { icuAdmission: 15000, carTotaled: 5000 },
  GLOBAL: { icuAdmission: 15000, carTotaled: 5000 } 
};
