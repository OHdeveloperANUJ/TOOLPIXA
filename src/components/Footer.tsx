'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleShareSite = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'ToolPixa — 115+ Free Calculators', url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.origin);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Ignore share cancellation
    }
  };

  return (
    <footer className="w-full py-xl mt-xxl border-t border-glass-border bg-surface-container-lowest">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-gutter px-margin max-w-7xl mx-auto">
        {/* Branding Column */}
        <div className="col-span-2 mb-lg">
          <Link href="/" className="font-headline-md text-2xl font-bold text-text-primary mb-sm inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-2xl">calculate</span>
            <span>ToolPixa</span>
          </Link>
          <p className="font-body-md text-sm text-text-secondary mb-md max-w-sm leading-relaxed">
            115+ free online calculators, converters, PDF utilities, and image compressors. 100% client-side execution for instant speed and complete data privacy.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleShareSite}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container border border-glass-border hover:border-primary text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Share ToolPixa"
            >
              <span className="material-symbols-outlined text-sm">{copied ? 'check' : 'share'}</span>
              <span>{copied ? 'Link Copied' : 'Share Site'}</span>
            </button>
            <a
              href="mailto:support@toolpixa.space"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container border border-glass-border hover:border-primary text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-sm">mail</span>
              <span>Contact</span>
            </a>
          </div>
        </div>

        {/* Finance */}
        <div>
          <p className="font-label-md text-xs text-text-primary font-bold mb-md uppercase tracking-wider">Finance &amp; Tax</p>
          <ul className="space-y-2 text-sm">
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/tools/home-loan-emi-calculator">Home Loan EMI</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/tools/sip-calculator">SIP Calculator</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/tools/income-tax-calculator">Income Tax 2025-26</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/tools/ppf-calculator">PPF Calculator</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/tools/gold-loan-emi-calculator">Gold Loan EMI</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/tools/gst-calculator">GST Calculator</Link></li>
          </ul>
        </div>

        {/* Student & Health */}
        <div>
          <p className="font-label-md text-xs text-text-primary font-bold mb-md uppercase tracking-wider">Health &amp; Study</p>
          <ul className="space-y-2 text-sm">
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/tools/bmi-calculator">BMI Calculator</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/tools/bmr-calculator">BMR &amp; TDEE</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/tools/gpa-calculator">CGPA Calculator</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/tools/attendance-calculator">Attendance Calc</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/tools/scientific-calculator">Scientific Calc</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/tools/pregnancy-due-date-calculator">Due Date Calc</Link></li>
          </ul>
        </div>

        {/* PDF, Image & Dev */}
        <div>
          <p className="font-label-md text-xs text-text-primary font-bold mb-md uppercase tracking-wider">PDF, Image &amp; Dev</p>
          <ul className="space-y-2 text-sm">
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/tools/compress-pdf">Compress PDF</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/tools/merge-pdf">Merge PDF</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/tools/image-size-reducer">Image Compressor</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/tools/resize-image-for-passport">Passport Photo</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/tools/json-formatter">JSON Formatter</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/tools/password-generator">Password Gen</Link></li>
          </ul>
        </div>

        {/* Resources & Legal */}
        <div>
          <p className="font-label-md text-xs text-text-primary font-bold mb-md uppercase tracking-wider">Resources</p>
          <ul className="space-y-2 text-sm">
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/categories">All Categories</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/blog">Editorial Blog</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/sitemap">Full HTML Sitemap</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/about">About Us</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/contact">Contact Us</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/privacy">Privacy &amp; Terms</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-xl pt-lg border-t border-glass-border px-margin max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-text-secondary font-label-md text-xs gap-4">
        <p>© 2026 ToolPixa. All calculations run locally in your browser.</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link>
        </div>
      </div>
    </footer>
  );
}
