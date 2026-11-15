'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore, CURRENCIES } from '@/store/useStore';
import SearchBar from '@/components/SearchBar';
import ThemeToggle from '@/components/ThemeToggle';
import { History } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currency, setCurrency } = useStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K' || e.code === 'KeyK')) {
        e.preventDefault();
        window.dispatchEvent(new Event('focus-global-search'));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const cycleCurrency = () => {
    const currentIndex = CURRENCIES.findIndex((c) => c.code === currency.code);
    const nextCurrency = CURRENCIES[(currentIndex + 1) % CURRENCIES.length];
    setCurrency(nextCurrency);
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-glass-surface backdrop-blur-md border-b border-glass-border">
        <div className="flex items-center justify-between gap-8 h-16 px-margin max-w-7xl mx-auto">
          {/* Zone 1: Brand Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-headline-md text-xl font-bold text-text-primary whitespace-nowrap shrink-0"
          >
            <Image
              src="/logo.png"
              alt="ToolPixa"
              width={32}
              height={32}
              referrerPolicy="no-referrer"
              className="rounded-lg"
            />
            <span className="tracking-tight">ToolPixa</span>
          </Link>

          {/* Zone 2: Concise Single-Line Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 text-sm font-medium text-text-secondary">
            <Link
              href="/categories"
              className="hover:text-text-primary hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              All Tools
            </Link>
            <Link
              href="/category/finance"
              className="hover:text-text-primary hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Finance
            </Link>
            <Link
              href="/category/health"
              className="hover:text-text-primary hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Health
            </Link>
            <Link
              href="/category/student"
              className="hover:text-text-primary hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Student
            </Link>
            <Link
              href="/blog"
              className="hover:text-text-primary hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Guides
            </Link>
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={cycleCurrency}
              className="px-2.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high border border-glass-border text-xs font-mono font-semibold text-text-primary transition-colors whitespace-nowrap shrink-0"
              title={`Currency: ${currency.name} (${currency.symbol}) — Click to switch`}
              aria-label={`Switch currency (currently ${currency.code})`}
            >
              {currency.symbol} {currency.code}
            </button>

            <ThemeToggle />

            <Link
              href="/profile"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-primary text-on-primary rounded-lg font-medium text-xs hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
              title="Saved Calculation History"
            >
              <History size={14} />
              <span>History</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden material-symbols-outlined p-2 rounded-lg hover:bg-surface-container transition-colors text-text-primary"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMenuOpen ? 'close' : 'menu'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex flex-col p-gutter overflow-y-auto">
          <div className="flex justify-between items-center mb-lg pt-2">
            <span className="font-headline-md text-xl font-bold text-text-primary tracking-tight">
              ToolPixa
            </span>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container border border-glass-border text-text-primary"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="mb-lg">
            <SearchBar placeholder="Search 115+ tools..." onSelect={() => setIsMenuOpen(false)} />
          </div>

          <nav className="flex-grow space-y-2">
            {[
              { href: '/categories', title: 'All Categories', sub: '115+ Calculators & Utilities', icon: 'grid_view' },
              { href: '/category/finance', title: 'Finance & Tax', sub: 'EMI, SIP, PPF, Income Tax', icon: 'payments' },
              { href: '/category/health', title: 'Health & Fitness', sub: 'BMI, BMR, TDEE, Macros', icon: 'health_and_safety' },
              { href: '/category/student', title: 'Student & Academic', sub: 'CGPA, GPA, Attendance', icon: 'school' },
              { href: '/category/pdf', title: 'PDF & Image Tools', sub: 'Compress, Merge, Convert', icon: 'picture_as_pdf' },
              { href: '/blog', title: 'Guides & Insights', sub: '24 In-Depth Articles', icon: 'article' },
              { href: '/profile', title: 'Saved History', sub: 'Your local calculations', icon: 'history' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between p-3 bg-surface-container border border-glass-border rounded-xl hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  <div>
                    <span className="font-headline-md text-base font-semibold text-text-primary block">{item.title}</span>
                    <span className="text-text-secondary text-xs">{item.sub}</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-text-secondary text-sm">chevron_right</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
