'use client';
import React, { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';

export default function CurrencySymbol({ fallback = '₹' }: { fallback?: string }) {
  const [mounted, setMounted] = useState(false);
  const currency = useStore((state) => state.currency);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{fallback}</>;

  return <>{currency.symbol}</>;
}
