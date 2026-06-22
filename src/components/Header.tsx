'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore, CURRENCIES } from '@/store/useStore';
import SearchBar from '@/components/SearchBar';
import ThemeToggle from '@/components/ThemeToggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const { currency, setCurrency } = useStore();
  const currencyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K' || e.code === 'KeyK')) {
        e.preventDefault();
        window.dispatchEvent(new Event('focus-global-search'));
      }
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
        setIsCurrencyOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-glass-surface backdrop-blur-md border-b border-glass-border shadow-xl">
        <div className="flex justify-between items-center h-16 px-margin max-w-full mx-auto relative">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 font-headline-md text-headline-md font-bold text-text-primary">
            <Image src="/logo.png" alt="ToolPixa Logo" width={40} height={40} className="mr-2" />
            <span className="tracking-tight">ToolPixa</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-xl relative w-full">
            <SearchBar />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none z-[101]">
              <span className="px-2 py-0.5 rounded-lg border border-glass-border text-[10px] font-label-md text-text-secondary bg-surface-container-high uppercase tracking-widest">Cmd+K</span>
            </div>
          </div>

          {/* Navigation & Actions */}
          <nav className="flex items-center gap-sm md:gap-lg">
            <div className="hidden md:flex items-center gap-lg font-label-md text-label-md mr-4">
              <div className="relative group py-4">
              <Link href="/categories" className="text-text-secondary group-hover:text-text-primary transition-colors flex items-center gap-1">
                Tools <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:rotate-180">keyboard_arrow_down</span>
              </Link>
              
              <div className="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 w-64 bg-surface-container-high/90 backdrop-blur-2xl border border-glass-border rounded-xl shadow-2xl p-2 z-[101]">
                <Link href="/category/finance" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary-container/10 hover:text-primary transition-colors text-text-secondary font-body-md group/item">
                  <span className="material-symbols-outlined text-[20px] group-hover/item:text-primary">payments</span>
                  Finance
                </Link>
                <Link href="/category/health" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-tertiary-container/10 hover:text-tertiary transition-colors text-text-secondary font-body-md group/item">
                  <span className="material-symbols-outlined text-[20px] group-hover/item:text-tertiary">health_and_safety</span>
                  Health
                </Link>
                <Link href="/category/developer" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary-fixed/10 hover:text-secondary-fixed transition-colors text-text-secondary font-body-md group/item">
                  <span className="material-symbols-outlined text-[20px] group-hover/item:text-secondary-fixed">code</span>
                  Developer
                </Link>
                <Link href="/category/converter" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors text-text-secondary font-body-md group/item">
                  <span className="material-symbols-outlined text-[20px] group-hover/item:text-primary">sync_alt</span>
                  Converters
                </Link>
                <div className="h-px bg-glass-border my-2"></div>
                <Link href="/categories" className="block px-4 py-3 rounded-lg hover:bg-glass-surface transition-colors text-text-primary font-bold font-body-md">
                  View All Categories &rarr;
                </Link>
              </div>
            </div>

            <Link className="text-text-secondary hover:text-text-primary transition-colors py-4 font-bold" href="/blog">Blog</Link>
            </div>

            <div className="flex items-center gap-xs md:gap-sm relative">
              
              {/* Desktop Search Button */}
              <button 
                onClick={() => window.dispatchEvent(new Event('focus-global-search'))}
                className="hidden md:flex material-symbols-outlined p-2 rounded-full hover:bg-glass-surface transition-colors text-text-secondary" 
                title="Search Tools"
              >
                search
              </button>

              {/* Currency Selector */}
              <div className="relative" ref={currencyRef}>
                <button 
                  onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                  className="flex items-center gap-1 p-2 rounded-full hover:bg-glass-surface transition-colors text-text-secondary font-label-md text-sm" 
                  title="Select Currency"
                >
                  <span className="material-symbols-outlined text-[20px]">payments</span>
                  <span className="hidden sm:inline font-bold">{currency.code}</span>
                </button>
                
                {isCurrencyOpen && (
                  <div className="absolute top-full mt-2 right-0 bg-surface-container border border-glass-border rounded-xl shadow-2xl overflow-hidden min-w-[150px] animate-fade-in-up">
                    {CURRENCIES.map((c) => (
                      <button 
                        key={c.code}
                        onClick={() => {
                          setCurrency(c);
                          setIsCurrencyOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-glass-surface font-body-md text-text-primary transition-colors flex items-center justify-between"
                      >
                        <span>{c.name} ({c.code})</span>
                        <span className="text-text-secondary">{c.symbol}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <ThemeToggle />
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden material-symbols-outlined p-2 rounded-full hover:bg-glass-surface transition-colors text-text-secondary" 
                title="Menu"
              >
                {isMenuOpen ? 'close' : 'menu'}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Subcategory Bar */}
      <div className="fixed top-16 w-full z-40 bg-surface-container/80 backdrop-blur-md border-b border-glass-border shadow-sm hidden md:block">
        <div className="flex justify-center items-center h-10 px-margin max-w-7xl mx-auto gap-8 overflow-x-auto no-scrollbar">
          <Link href="/category/finance?tag=loans" className="text-text-secondary hover:text-primary text-sm font-label-md uppercase tracking-widest whitespace-nowrap transition-colors">Loans</Link>
          <Link href="/category/finance?tag=tax" className="text-text-secondary hover:text-primary text-sm font-label-md uppercase tracking-widest whitespace-nowrap transition-colors">Tax</Link>
          <Link href="/category/finance?tag=investments" className="text-text-secondary hover:text-primary text-sm font-label-md uppercase tracking-widest whitespace-nowrap transition-colors">Investments</Link>
          <Link href="/category/finance?tag=savings" className="text-text-secondary hover:text-primary text-sm font-label-md uppercase tracking-widest whitespace-nowrap transition-colors">Savings</Link>
          <Link href="/category/finance?tag=retirement" className="text-text-secondary hover:text-primary text-sm font-label-md uppercase tracking-widest whitespace-nowrap transition-colors">Retirement</Link>
        </div>
      </div>


      {/* Mobile Menu Dropdown (Stitch Generated) */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex flex-col p-gutter transition-all duration-500 overflow-y-auto">
          {/* Header */}
          <header className="flex justify-between items-center mb-lg pt-4">
            <div className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary tracking-tight">
              ToolPixa
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-full bg-glass-surface border border-glass-border text-on-surface hover:scale-105 active:scale-95 transition-all">
              <span className="material-symbols-outlined">close</span>
            </button>
          </header>
          
          {/* Search Bar */}
          <div className="mb-xl">
            <SearchBar placeholder="Search tools..." onSelect={() => setIsMenuOpen(false)} />
          </div>

          {/* Navigation List */}
          <nav className="flex-grow space-y-4">
            {/* Calculators */}
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between p-sm bg-glass-surface border border-glass-border rounded-xl hover:bg-primary-container/10 hover:border-primary/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-secondary-container/20 text-primary border border-primary/20">
                  <span className="material-symbols-outlined">calculate</span>
                </div>
                <div>
                  <span className="font-headline-md text-xl block">Calculators</span>
                  <span className="text-on-surface-variant text-sm font-body-md">Scientific &amp; Unit converters</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
            </Link>
            
            {/* Finance */}
            <Link href="/category/finance" onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between p-sm bg-glass-surface border border-glass-border rounded-xl hover:bg-primary-container/10 hover:border-primary/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-secondary-container/20 text-primary border border-primary/20">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <div>
                  <span className="font-headline-md text-xl block">Finance</span>
                  <span className="text-on-surface-variant text-sm font-body-md">Loans, ROI &amp; Tax tools</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
            </Link>

            {/* Student */}
            <Link href="/category/student" onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between p-sm bg-glass-surface border border-glass-border rounded-xl hover:bg-primary-container/10 hover:border-primary/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-secondary-container/20 text-primary border border-primary/20">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <div>
                  <span className="font-headline-md text-xl block">Student</span>
                  <span className="text-on-surface-variant text-sm font-body-md">GPA, Citations &amp; Research</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
            </Link>

            {/* Blog */}
            <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="group flex items-center justify-between p-sm bg-glass-surface border border-glass-border rounded-xl hover:bg-primary-container/10 hover:border-primary/30 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary-container/20 text-primary border border-primary/20">
                  <span className="material-symbols-outlined">article</span>
                </div>
                <div>
                  <span className="font-headline-md text-xl block text-primary">Blog</span>
                  <span className="text-on-surface-variant text-sm font-body-md">Insights, Guides & News</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
