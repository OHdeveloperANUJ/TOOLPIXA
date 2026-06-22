'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-xl mt-xxl border-t border-glass-border bg-surface-container-lowest">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-gutter px-margin max-w-7xl mx-auto">
        {/* Branding Column */}
        <div className="col-span-2 md:col-span-1 mb-lg">
          <div className="font-headline-md text-headline-md font-bold text-primary mb-md flex items-center">
             <span className="material-symbols-outlined text-primary text-3xl mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>build</span>
             ToolPixa
          </div>
          <p className="font-body-md text-body-md text-text-secondary mb-lg">© 2026 ToolPixa. Premium Precision Tools for everyday engineering.</p>
          <div className="flex gap-md">
            <a href="https://twitter.com/toolpixa" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-2 rounded-full bg-surface-container hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-text-secondary hover:text-primary transition-colors cursor-pointer">public</span>
            </a>
            <button onClick={() => navigator.share?.({ title: 'ToolPixa', url: window.location.href })} className="flex items-center justify-center p-2 rounded-full bg-surface-container hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-text-secondary hover:text-primary transition-colors cursor-pointer">share</span>
            </button>
            <a href="mailto:support@toolpixa.space" className="flex items-center justify-center p-2 rounded-full bg-surface-container hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-text-secondary hover:text-primary transition-colors cursor-pointer">mail</span>
            </a>
          </div>
        </div>
        {/* Category Columns */}
        <div>
          <h5 className="font-label-md text-label-md text-text-primary font-bold mb-md uppercase tracking-wider">Finance</h5>
          <ul className="space-y-sm font-body-md text-body-md">
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/tools/home-loan-emi">Loan EMI</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="#">Income Tax</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="#">SIP Planner</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="#">Compound Interest</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-label-md text-label-md text-text-primary font-bold mb-md uppercase tracking-wider">Student</h5>
          <ul className="space-y-sm font-body-md text-body-md">
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="#">CGPA Calc</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="#">Percentage</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="#">Scientific Calc</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="#">Essay Helper</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-label-md text-label-md text-text-primary font-bold mb-md uppercase tracking-wider">Health</h5>
          <ul className="space-y-sm font-body-md text-body-md">
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="#">BMI Index</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="#">Calories</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="#">Water Intake</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="#">Pregnancy Due</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="font-label-md text-label-md text-text-primary font-bold mb-md uppercase tracking-wider">Legal</h5>
          <ul className="space-y-sm font-body-md text-body-md">
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/privacy">Privacy Policy</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/terms">Terms & Conditions</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/disclaimer">Disclaimer</Link></li>
            <li><Link className="text-text-secondary hover:text-primary transition-colors" href="/about">About Us</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-xl pt-lg border-t border-glass-border px-margin max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-text-secondary font-label-md text-sm">
        <p>Designed for professionals. Built with precision.</p>
        <div className="flex gap-md mt-sm md:mt-0">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
