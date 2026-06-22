import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  locale: string;
}

interface AppState {
  currency: Currency;
  hasManuallyChangedCurrency: boolean;
  setCurrency: (c: Currency) => void;
  autoDetectCurrency: () => void;
}

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US' },
  { code: 'EUR', symbol: '€', name: 'Euro', locale: 'de-DE' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' },
  { code: 'GBP', symbol: '£', name: 'British Pound', locale: 'en-GB' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', locale: 'en-AU' },
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currency: CURRENCIES[0],
      hasManuallyChangedCurrency: false,
      setCurrency: (c) => set({ currency: c, hasManuallyChangedCurrency: true }),
      autoDetectCurrency: () => {
        const state = get();
        if (state.hasManuallyChangedCurrency) return; // Do not override user's manual choice

        try {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
          let detectedCurrency = CURRENCIES[0]; // Default USD

          if (tz.includes('Calcutta') || tz.includes('Kolkata') || tz.includes('Asia/Colombo')) {
            detectedCurrency = CURRENCIES.find(c => c.code === 'INR') || CURRENCIES[0];
          } else if (tz.includes('Europe/London')) {
            detectedCurrency = CURRENCIES.find(c => c.code === 'GBP') || CURRENCIES[0];
          } else if (tz.includes('Europe/')) {
            detectedCurrency = CURRENCIES.find(c => c.code === 'EUR') || CURRENCIES[0];
          } else if (tz.includes('Australia/')) {
            detectedCurrency = CURRENCIES.find(c => c.code === 'AUD') || CURRENCIES[0];
          }

          if (state.currency.code !== detectedCurrency.code) {
            set({ currency: detectedCurrency });
          }
        } catch (e) {
          // Ignore if timezone detection fails
        }
      }
    }),
    {
      name: 'toolpixa-storage',
    }
  )
);
