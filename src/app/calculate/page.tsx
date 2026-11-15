import React from 'react';
import Link from 'next/link';
import { programmaticPages } from '@/data/programmaticSeo';

export const metadata = {
  title: '105+ Exact Financial Calculations, Salary Breakdowns & Exam Photo Guides (2026)',
  description:
    'Browse 105+ pre-calculated Indian Home Loan EMI tables (₹10L to ₹2Cr), CTC to In-Hand Salary slips (₹4L to ₹50L), Monthly FD Interest, SIP Corpus tables, CGPA to Percentage charts, and SSC/UPSC/NEET Photo KB size guides.',
  alternates: {
    canonical: 'https://www.toolpixa.space/calculate',
  },
};

const SECTIONS = [
  {
    id: 'home-loan',
    title: 'Home Loan EMI Tables by Amount (₹10 Lakh to ₹2 Crore)',
    subtitle: 'Monthly EMI across 5 to 30 years at 8.50% p.a. + SBI, HDFC, ICICI & BoB bank rate comparisons.',
    icon: 'home_work',
  },
  {
    id: 'salary',
    title: 'CTC to Monthly In-Hand Salary Breakdowns (FY 2025–26)',
    subtitle: 'Exact monthly take-home pay from ₹4 LPA to ₹50 LPA after EPF, Professional Tax, and New vs Old Tax Regime.',
    icon: 'account_balance_wallet',
  },
  {
    id: 'fd',
    title: 'Fixed Deposit (FD) Monthly Interest & Maturity Tables',
    subtitle: 'Monthly interest payout for ₹1 Lakh to ₹1 Crore FDs across SBI, HDFC, ICICI, Post Office & Senior Citizen rates.',
    icon: 'savings',
  },
  {
    id: 'sip',
    title: 'Monthly SIP Compounding & Step-Up Wealth Tables',
    subtitle: '5, 10, 15, 20, 25 & 30-year maturity values for ₹1,000/month to ₹50,000/month SIPs at 12% & 15% CAGR.',
    icon: 'trending_up',
  },
  {
    id: 'cgpa',
    title: 'Exact CGPA to Percentage Conversion Lookup (6.0 to 9.8 CGPA)',
    subtitle: 'Official CBSE (×9.5), VTU, Anna University, SPPU, Mumbai University & AICTE conversion tables.',
    icon: 'school',
  },
  {
    id: 'loan',
    title: 'Personal Loan & Car Loan EMI Schedules by Amount',
    subtitle: '1-to-7-year monthly EMI and interest schedules for ₹1 Lakh to ₹20 Lakh Personal and Car Loans.',
    icon: 'directions_car',
  },
  {
    id: 'exam',
    title: 'Indian Exam Photo, Signature & PDF Size Specifications (20KB–200KB)',
    subtitle: 'Official upload dimensions, KB limits, and instant browser compressors for SSC, UPSC, NEET, JEE, IBPS, SBI, GATE & PAN.',
    icon: 'photo_camera',
  },
] as const;

export default function CalculateDirectoryPage() {
  const allPages = Object.values(programmaticPages);

  return (
    <main className="pt-28 pb-xxl px-margin max-w-7xl mx-auto min-h-screen">
      <nav aria-label="Breadcrumb" className="font-label-md text-label-md text-text-secondary mb-lg flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="text-glass-border">/</span>
        <span className="text-text-primary">Calculations &amp; Reference Tables</span>
      </nav>

      <header className="mb-xxl animate-fade-in-up">
        <span className="font-mono text-xs uppercase tracking-widest text-primary block mb-2">
          {allPages.length} Pre-Calculated Indian Benchmarks · FY 2025–26 &amp; 2026–27
        </span>
        <h1 className="font-headline-lg text-4xl md:text-5xl font-bold text-text-primary mb-sm leading-tight">
          Exact Financial Tables, Salary Slips &amp; Exam Spec Guides
        </h1>
        <p className="font-body-lg text-body-lg text-text-secondary max-w-3xl">
          Instant lookup tables paired with live client-side calculators for India&apos;s most searched loan amounts, salary packages, FD deposits, SIP investments, university CGPA scores, and government exam document limits.
        </p>
      </header>

      <div className="space-y-12">
        {SECTIONS.map((sec) => {
          const items = allPages.filter((p) => p.category === sec.id);
          return (
            <section
              key={sec.id}
              id={sec.id}
              className="glass-card p-lg md:p-xl rounded-2xl border border-glass-border"
            >
              <div className="flex items-start justify-between gap-4 border-b border-glass-border pb-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-primary">{sec.icon}</span>
                  </div>
                  <div>
                    <h2 className="font-headline-md text-xl md:text-2xl font-bold text-text-primary">
                      {sec.title}
                    </h2>
                    <p className="text-sm text-text-secondary mt-1">{sec.subtitle}</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-text-secondary shrink-0">
                  {items.length} guides
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {items.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/calculate/${item.slug}`}
                    className="p-3.5 rounded-xl bg-surface-container border border-glass-border hover:border-primary transition-colors flex flex-col justify-between group"
                  >
                    <span className="font-headline-md text-sm font-semibold text-text-primary group-hover:text-primary transition-colors mb-1">
                      {item.title}
                    </span>
                    <span className="font-mono text-xs text-primary">
                      {item.summaryHighlight[0]?.label}: {item.summaryHighlight[0]?.value}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
