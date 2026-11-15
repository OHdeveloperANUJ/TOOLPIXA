'use client';

import React, { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const autoDetectCurrency = useStore(state => state.autoDetectCurrency);

  useEffect(() => {
    // Run auto-detection once on mount
    autoDetectCurrency();
  }, [autoDetectCurrency]);

  return <>{children}</>;
}
