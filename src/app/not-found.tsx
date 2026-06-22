import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="pt-32 pb-xxl px-margin max-w-3xl mx-auto min-h-screen flex items-center justify-center text-center">
      <div className="animate-fade-in-up">
        <div className="w-24 h-24 rounded-3xl bg-surface-container flex items-center justify-center border border-glass-border mx-auto mb-lg shadow-xl shadow-primary/5">
          <span className="material-symbols-outlined text-[48px] text-primary">broken_image</span>
        </div>
        
        <h1 className="font-headline-lg text-[64px] font-bold text-text-primary mb-sm leading-tight">
          404
        </h1>
        <h2 className="font-headline-md text-[24px] text-text-primary mb-md">
          Tool Not Found
        </h2>
        
        <p className="font-body-lg text-body-lg text-text-secondary max-w-md mx-auto mb-xl">
          The calculator or page you are looking for has been moved or does not exist.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-md">
          <Link href="/" className="w-full sm:w-auto px-xl py-3 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-blue-600 transition-colors">
            Return Home
          </Link>
          <Link href="/category/finance" className="w-full sm:w-auto px-xl py-3 rounded-xl glass-card text-text-primary border border-glass-border font-label-md text-label-md hover:text-primary hover:border-primary transition-colors">
            Browse Categories
          </Link>
        </div>
      </div>
    </main>
  );
}
