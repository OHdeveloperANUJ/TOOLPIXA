import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import TiltCard from '@/components/TiltCard';
import ToolCard from '@/components/ToolCard';
import HeroSearch from '@/components/HeroSearch';
import { toolsRegistry } from '@/data/toolsRegistry';
import { blogPosts } from '@/data/blogData';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.toolpixa.space',
  },
};

const FEATURED_TOOL_SLUGS = [
  'home-loan-emi-calculator',
  'sip-calculator',
  'income-tax-calculator',
  'bmi-calculator',
  'gpa-calculator',
  'ppf-calculator',
  'compress-pdf',
  'image-size-reducer',
];

export default function Home() {
  const tools = Object.values(toolsRegistry);
  const featuredTools = FEATURED_TOOL_SLUGS.map((slug) => toolsRegistry[slug]).filter(Boolean);

  const categoryCounts = {
    finance: tools.filter((t) => t.category.toLowerCase() === 'finance').length,
    student: tools.filter((t) => t.category.toLowerCase() === 'student').length,
    health: tools.filter((t) => t.category.toLowerCase() === 'health').length,
    converter: tools.filter((t) => t.category.toLowerCase() === 'converter').length,
    developer: tools.filter((t) => t.category.toLowerCase() === 'developer').length,
    image: tools.filter((t) => t.category.toLowerCase() === 'image').length,
    video: tools.filter((t) => t.category.toLowerCase() === 'video').length,
    pdf: tools.filter((t) => t.category.toLowerCase() === 'pdf').length,
  };

  const totalTools = tools.length;

  return (
    <main className="pt-28 pb-xxl min-h-screen">
      {/* Hero Section */}
      <section className="px-margin max-w-7xl mx-auto text-center mb-xxl animate-fade-in-up">
        <p className="font-label-md text-xs text-primary uppercase tracking-widest mb-sm">
          100% Free · Client-Side Privacy · Zero Sign-Ups
        </p>
        <h1 className="font-headline-lg text-4xl md:text-6xl font-bold text-text-primary mb-sm leading-tight text-balance max-w-4xl mx-auto">
          {totalTools}+ Precision Calculators &amp; Digital Utilities
        </h1>
        <p className="font-body-lg text-body-lg text-text-secondary mb-xl max-w-2xl mx-auto">
          Instant financial modeling, tax comparison, academic grading, health metrics, and client-side PDF &amp; image tools engineered for accuracy.
        </p>

        {/* Central Hero Search */}
        <HeroSearch />

        {/* Quick-Launch High-Demand Links */}
        <div className="mt-lg flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-text-secondary">
          <span className="font-semibold text-text-primary">Popular right now:</span>
          <Link href="/tools/home-loan-emi-calculator" className="hover:text-primary underline underline-offset-4 transition-colors">Home Loan EMI</Link>
          <span aria-hidden="true">·</span>
          <Link href="/tools/sip-calculator" className="hover:text-primary underline underline-offset-4 transition-colors">SIP Planner</Link>
          <span aria-hidden="true">·</span>
          <Link href="/tools/income-tax-calculator" className="hover:text-primary underline underline-offset-4 transition-colors">Income Tax 2025-26</Link>
          <span aria-hidden="true">·</span>
          <Link href="/tools/bmi-calculator" className="hover:text-primary underline underline-offset-4 transition-colors">BMI Calculator</Link>
          <span aria-hidden="true">·</span>
          <Link href="/tools/compress-pdf" className="hover:text-primary underline underline-offset-4 transition-colors">Compress PDF</Link>
          <span aria-hidden="true">·</span>
          <Link href="/tools/gpa-calculator" className="hover:text-primary underline underline-offset-4 transition-colors">CGPA to Percentage</Link>
        </div>
      </section>

      {/* Most Popular High-Demand Tools */}
      <section className="px-margin max-w-7xl mx-auto mb-xxl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-lg gap-sm">
          <div>
            <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-text-primary mb-1">
              Most Popular Calculators &amp; Tools
            </h2>
            <p className="font-body-md text-text-secondary">
              High-demand financial, academic, and document utilities used daily.
            </p>
          </div>
          <Link className="font-label-md text-sm text-primary flex items-center gap-1 hover:underline" href="/sitemap">
            Browse All {totalTools} Tools <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {featuredTools.map((tool, index) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              className={`animate-fade-in-up ${index > 0 ? `animate-stagger-${(index % 4) + 1}` : ''}`}
            />
          ))}
        </div>
      </section>

      {/* Category Grid */}
      <section className="px-margin max-w-7xl mx-auto mb-xxl">
        <div className="flex items-center justify-between mb-lg">
          <div>
            <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-text-primary mb-1">Explore by Category</h2>
            <p className="font-body-md text-text-secondary">Organized into 8 specialized tool suites.</p>
          </div>
          <Link className="font-label-md text-sm text-primary flex items-center gap-1 hover:underline" href="/categories">
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
          <TiltCard href="/category/finance" className="p-lg rounded-2xl flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-md border border-primary/20">
              <span className="material-symbols-outlined text-primary text-3xl">payments</span>
            </div>
            <h3 className="font-headline-md text-lg font-bold text-text-primary mb-1">Finance &amp; Tax</h3>
            <p className="font-mono text-xs text-text-secondary tabular-nums">{categoryCounts.finance} Tools</p>
          </TiltCard>

          <TiltCard href="/category/health" className="p-lg rounded-2xl flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-md border border-secondary/20">
              <span className="material-symbols-outlined text-secondary text-3xl">health_and_safety</span>
            </div>
            <h3 className="font-headline-md text-lg font-bold text-text-primary mb-1">Health &amp; Fitness</h3>
            <p className="font-mono text-xs text-text-secondary tabular-nums">{categoryCounts.health} Tools</p>
          </TiltCard>

          <TiltCard href="/category/student" className="p-lg rounded-2xl flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-tertiary/10 flex items-center justify-center mb-md border border-tertiary/20">
              <span className="material-symbols-outlined text-tertiary text-3xl">school</span>
            </div>
            <h3 className="font-headline-md text-lg font-bold text-text-primary mb-1">Student &amp; Grades</h3>
            <p className="font-mono text-xs text-text-secondary tabular-nums">{categoryCounts.student} Tools</p>
          </TiltCard>

          <TiltCard href="/category/pdf" className="p-lg rounded-2xl flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-md border border-green-500/20">
              <span className="material-symbols-outlined text-green-500 text-3xl">picture_as_pdf</span>
            </div>
            <h3 className="font-headline-md text-lg font-bold text-text-primary mb-1">PDF Utilities</h3>
            <p className="font-mono text-xs text-text-secondary tabular-nums">{categoryCounts.pdf} Tools</p>
          </TiltCard>

          <TiltCard href="/category/image" className="p-lg rounded-2xl flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-md border border-blue-500/20">
              <span className="material-symbols-outlined text-blue-500 text-3xl">image</span>
            </div>
            <h3 className="font-headline-md text-lg font-bold text-text-primary mb-1">Image Tools</h3>
            <p className="font-mono text-xs text-text-secondary tabular-nums">{categoryCounts.image} Tools</p>
          </TiltCard>

          <TiltCard href="/category/converter" className="p-lg rounded-2xl flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-md border border-primary/20">
              <span className="material-symbols-outlined text-primary text-3xl">sync_alt</span>
            </div>
            <h3 className="font-headline-md text-lg font-bold text-text-primary mb-1">Unit Converters</h3>
            <p className="font-mono text-xs text-text-secondary tabular-nums">{categoryCounts.converter} Tools</p>
          </TiltCard>

          <TiltCard href="/category/developer" className="p-lg rounded-2xl flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-md border border-purple-500/20">
              <span className="material-symbols-outlined text-purple-400 text-3xl">code</span>
            </div>
            <h3 className="font-headline-md text-lg font-bold text-text-primary mb-1">Developer Tools</h3>
            <p className="font-mono text-xs text-text-secondary tabular-nums">{categoryCounts.developer} Tools</p>
          </TiltCard>

          <TiltCard href="/category/video" className="p-lg rounded-2xl flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mb-md border border-red-500/20">
              <span className="material-symbols-outlined text-red-500 text-3xl">movie</span>
            </div>
            <h3 className="font-headline-md text-lg font-bold text-text-primary mb-1">Video Tools</h3>
            <p className="font-mono text-xs text-text-secondary tabular-nums">{categoryCounts.video} Tools</p>
          </TiltCard>
        </div>
      </section>

      {/* Side-by-Side Financial Comparisons */}
      <section className="px-margin max-w-7xl mx-auto mb-xxl">
        <div className="glass-card rounded-2xl p-lg md:p-xl border border-glass-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-lg">
            <div>
              <h2 className="font-headline-md text-2xl font-bold text-text-primary mb-1">
                Financial Decision Comparisons
              </h2>
              <p className="text-sm text-text-secondary">
                Compare loan structures, tax regimes, and investment vehicles side by side.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: '/compare/old-tax-regime-vs-new-tax-regime', title: 'Old vs New Tax Regime', sub: 'FY 2025-26 ₹12.75L zero-tax rebate vs 80C' },
              { href: '/compare/50-lakh-home-loan-emi-10-15-20-years', title: '₹50 Lakh Home Loan EMI', sub: '10, 15, 20 & 25-year EMI & prepayment table' },
              { href: '/compare/12-lakh-15-lakh-20-lakh-in-hand-salary', title: '₹12L, ₹15L & ₹20L In-Hand Pay', sub: 'Monthly take-home salary after PF & tax' },
              { href: '/compare/sbi-vs-hdfc-home-loan-emi', title: 'SBI vs HDFC Home Loan', sub: '8.35% EBLR vs 8.40% RLLR & MaxGain' },
              { href: '/compare/sip-vs-lumpsum', title: 'SIP vs Lumpsum Investing', sub: '10Y, 15Y & 20Y compounding showdown' },
              { href: '/compare/ppf-vs-fd', title: 'PPF vs Fixed Deposit (FD)', sub: '7.1% tax-free EEE vs 30%-slab bank FD' },
              { href: '/compare/vtu-anna-sppu-cbse-cgpa-to-percentage', title: 'CGPA to Percentage Table', sub: 'CBSE, VTU, Anna, SPPU & AICTE formulas' },
              { href: '/compare/ssc-upsc-neet-photo-signature-size-20kb-50kb', title: 'SSC, UPSC & NEET Photo Size', sub: '20KB, 50KB & 200KB official exam specs' },
            ].map((comp) => (
              <Link
                key={comp.href}
                href={comp.href}
                className="p-4 rounded-xl bg-surface-container border border-glass-border hover:border-primary transition-colors flex flex-col justify-between group"
              >
                <div>
                  <h3 className="font-headline-md text-base font-bold text-text-primary group-hover:text-primary transition-colors mb-1">
                    {comp.title}
                  </h3>
                  <p className="text-xs text-text-secondary">{comp.sub}</p>
                </div>
                <span className="mt-4 text-xs font-label-md text-primary inline-flex items-center gap-1">
                  View Table <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 105+ Pre-Calculated Exact Indian EMI, Salary, FD, SIP & Exam Guides */}
      <section className="px-margin max-w-7xl mx-auto mb-xxl">
        <div className="glass-card rounded-2xl p-lg md:p-xl border border-glass-border">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-lg">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-primary block mb-1">
                105+ Instant Lookup Tables · FY 2025–26 Verified
              </span>
              <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-text-primary mb-1">
                Exact Loan EMIs, In-Hand Salary Slips &amp; Exam Specs
              </h2>
              <p className="text-sm text-text-secondary">
                Pre-computed tables for India&apos;s most searched loan amounts, CTC packages, FD monthly payouts, and exam document sizes.
              </p>
            </div>
            <Link
              href="/calculate"
              className="font-label-md text-sm text-primary flex items-center gap-1 hover:underline shrink-0"
            >
              View All 105 Tables <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { href: '/calculate/30-lakh-home-loan-emi', label: '₹30 Lakh Home Loan EMI', tag: '₹26,035/mo (20Y)' },
              { href: '/calculate/50-lakh-home-loan-emi', label: '₹50 Lakh Home Loan EMI', tag: '₹43,391/mo (20Y)' },
              { href: '/calculate/75-lakh-home-loan-emi', label: '₹75 Lakh Home Loan EMI', tag: '₹65,087/mo (20Y)' },
              { href: '/calculate/1-crore-home-loan-emi', label: '₹1 Crore Home Loan EMI', tag: '₹86,782/mo (20Y)' },
              { href: '/calculate/8-lakh-in-hand-salary', label: '₹8 Lakh CTC In-Hand Salary', tag: '₹0 Tax · New Regime' },
              { href: '/calculate/12-lakh-in-hand-salary', label: '₹12 Lakh CTC In-Hand Salary', tag: '₹0 Tax · Sec 87A' },
              { href: '/calculate/15-lakh-in-hand-salary', label: '₹15 Lakh CTC In-Hand Salary', tag: 'FY 2025-26 Slip' },
              { href: '/calculate/20-lakh-in-hand-salary', label: '₹20 Lakh CTC In-Hand Salary', tag: 'New vs Old Regime' },
              { href: '/calculate/5-lakh-fd-interest-per-month', label: '₹5 Lakh FD Monthly Interest', tag: '7.10% – 7.60% p.a.' },
              { href: '/calculate/10-lakh-fd-interest-per-month', label: '₹10 Lakh FD Monthly Interest', tag: 'SBI, HDFC & PO' },
              { href: '/calculate/5000-per-month-sip-calculator', label: '₹5,000/Month SIP for 10–25Y', tag: '12% & 15% CAGR' },
              { href: '/calculate/10000-per-month-sip-calculator', label: '₹10,000/Month SIP Calculator', tag: 'Step-Up vs Normal' },
              { href: '/calculate/8-0-cgpa-in-percentage', label: '8.0 CGPA in Percentage', tag: '76% CBSE · 72.5% VTU' },
              { href: '/calculate/8-5-cgpa-in-percentage', label: '8.5 CGPA in Percentage', tag: '80.75% CBSE Formula' },
              { href: '/calculate/ssc-cgl-chsl-photo-signature-size-kb', label: 'SSC CGL Photo & Sign Size', tag: '20–50KB & 10–20KB' },
              { href: '/calculate/upsc-ias-photo-signature-pdf-size', label: 'UPSC IAS Photo & PDF Size', tag: '20–300KB Official' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="p-3.5 rounded-xl bg-surface-container border border-glass-border hover:border-primary transition-colors flex flex-col justify-between group"
              >
                <span className="font-headline-md text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                  {item.label}
                </span>
                <span className="font-mono text-xs text-primary mt-1">{item.tag}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Insights (Blog) */}
      <section className="px-margin max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-lg gap-sm">
          <div>
            <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-text-primary mb-1">Latest Financial &amp; Technical Guides</h2>
            <p className="font-body-md text-text-secondary">In-depth research on Indian tax laws, loan prepayment math, and investment strategy.</p>
          </div>
          <Link className="font-label-md text-sm text-primary flex items-center gap-1 hover:underline" href="/blog">
            View All {blogPosts.length} Guides <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {blogPosts.slice(0, 3).map((post) => (
            <TiltCard
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-2xl flex flex-col overflow-hidden group border border-glass-border"
            >
              <div className="relative h-48 w-full overflow-hidden bg-surface-container">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  referrerPolicy="no-referrer"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary mb-2 font-mono">
                    <span className="text-primary font-semibold">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime || '6 min read'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-headline-md text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2">{post.description}</p>
                </div>
                <span className="mt-4 text-xs font-label-md text-primary inline-flex items-center gap-1">
                  Read Full Guide <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </span>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>
    </main>
  );
}
