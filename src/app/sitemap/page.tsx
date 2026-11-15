import React from 'react';
import Link from 'next/link';
import { toolsRegistry } from '@/data/toolsRegistry';
import { blogPosts } from '@/data/blogData';
import tags from '../../../tags.json';

export const metadata = {
  title: 'HTML Sitemap — Complete Directory of 115+ Calculators & Guides',
  description: 'Browse the complete directory of 115+ free online calculators, converters, PDF & image tools, categories, and expert financial guides on ToolPixa.',
};

const CATEGORY_ORDER = [
  { id: 'finance', label: 'Finance & Tax Calculators' },
  { id: 'health', label: 'Health & Fitness Calculators' },
  { id: 'student', label: 'Student & Academic Tools' },
  { id: 'converter', label: 'Unit & Math Converters' },
  { id: 'developer', label: 'Developer & Encoding Utilities' },
  { id: 'pdf', label: 'PDF Tools & Compressors' },
  { id: 'image', label: 'Image Resizers & Compressors' },
  { id: 'video', label: 'Video & YouTube Utilities' },
];

export default function HTMLSitemap() {
  const allTools = Object.values(toolsRegistry);
  const toolsByTag = tags as Record<string, string[]>;

  return (
    <main className="pt-28 pb-xxl px-margin max-w-7xl mx-auto min-h-screen">
      <nav className="font-label-md text-label-md text-text-secondary mb-lg flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="text-glass-border">/</span>
        <span className="text-text-primary">Sitemap</span>
      </nav>

      <header className="mb-xl animate-fade-in-up">
        <h1 className="font-headline-lg text-4xl md:text-5xl font-bold text-text-primary mb-sm leading-tight">
          Complete ToolPixa Directory ({allTools.length} Tools)
        </h1>
        <p className="font-body-lg text-body-lg text-text-secondary max-w-3xl">
          Every calculator, converter, document utility, and editorial guide indexed in one place for fast navigation and search discovery.
        </p>
      </header>

      {/* Top Row: Core Pages, Categories, Tags, Comparisons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xxl animate-fade-in-up">
        <section className="glass-card p-lg rounded-2xl border border-glass-border">
          <h2 className="font-headline-md text-xl font-bold text-text-primary mb-md border-b border-glass-border pb-2">
            Core Pages
          </h2>
          <ul className="space-y-2 font-body-md text-text-secondary">
            <li><Link href="/" className="hover:text-primary transition-colors">Home — All Calculators</Link></li>
            <li><Link href="/categories" className="hover:text-primary transition-colors">All Tool Categories</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Insights &amp; Guides Blog ({blogPosts.length} Articles)</Link></li>
            <li><Link href="/profile" className="hover:text-primary transition-colors">Saved Calculation History</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">About ToolPixa</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact &amp; Support</Link></li>
            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms &amp; Conditions</Link></li>
            <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Financial &amp; Medical Disclaimer</Link></li>
          </ul>
        </section>

        <section className="glass-card p-lg rounded-2xl border border-glass-border">
          <h2 className="font-headline-md text-xl font-bold text-text-primary mb-md border-b border-glass-border pb-2">
            Tool Categories
          </h2>
          <ul className="space-y-2 font-body-md text-text-secondary">
            {CATEGORY_ORDER.map((cat) => {
              const count = allTools.filter((t) => t.category.toLowerCase() === cat.id).length;
              return (
                <li key={cat.id} className="flex items-center justify-between">
                  <Link href={`/category/${cat.id}`} className="hover:text-primary transition-colors font-medium">
                    {cat.label}
                  </Link>
                  <span className="text-xs font-mono text-text-secondary">{count} tools</span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="glass-card p-lg rounded-2xl border border-glass-border">
          <h2 className="font-headline-md text-xl font-bold text-text-primary mb-md border-b border-glass-border pb-2">
            Topic Tags &amp; Comparisons
          </h2>
          <div className="mb-md">
            <p className="text-xs font-label-md uppercase tracking-wider text-text-secondary mb-2">Curated Topic Hubs</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(toolsByTag).map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${tag}`}
                  className="text-sm text-primary hover:underline capitalize"
                >
                  #{tag.replace(/-/g, ' ')}
                </Link>
              ))}
            </div>
          </div>
          <div className="pt-3 border-t border-glass-border">
            <p className="text-xs font-label-md uppercase tracking-wider text-text-secondary mb-2">Comparisons &amp; Reference Tables</p>
            <ul className="space-y-1.5 text-sm text-text-secondary">
              <li><Link href="/compare/home-loan-emi-vs-personal-loan-emi" className="hover:text-primary transition-colors">Home Loan EMI vs Personal Loan EMI</Link></li>
              <li><Link href="/compare/sip-vs-lumpsum" className="hover:text-primary transition-colors">SIP vs Lumpsum Investment</Link></li>
              <li><Link href="/compare/ppf-vs-fd" className="hover:text-primary transition-colors">PPF vs Fixed Deposit (FD)</Link></li>
              <li><Link href="/compare/old-tax-regime-vs-new-tax-regime" className="hover:text-primary transition-colors">Old vs New Income Tax Regime (FY 2025–26)</Link></li>
              <li><Link href="/compare/sbi-vs-hdfc-home-loan-emi" className="hover:text-primary transition-colors">SBI vs HDFC Home Loan EMI &amp; Rates</Link></li>
              <li><Link href="/compare/50-lakh-home-loan-emi-10-15-20-years" className="hover:text-primary transition-colors">₹50 Lakh Home Loan EMI (10, 15, 20, 25 Years)</Link></li>
              <li><Link href="/compare/30-lakh-home-loan-emi-calculator" className="hover:text-primary transition-colors">₹30 Lakh Home Loan EMI Table</Link></li>
              <li><Link href="/compare/direct-vs-regular-mutual-fund" className="hover:text-primary transition-colors">Direct vs Regular Mutual Fund Returns</Link></li>
              <li><Link href="/compare/12-lakh-15-lakh-20-lakh-in-hand-salary" className="hover:text-primary transition-colors">₹12L, ₹15L &amp; ₹20L CTC to In-Hand Salary</Link></li>
              <li><Link href="/compare/vtu-anna-sppu-cbse-cgpa-to-percentage" className="hover:text-primary transition-colors">CBSE, VTU, Anna &amp; SPPU CGPA to Percentage</Link></li>
              <li><Link href="/compare/ssc-upsc-neet-photo-signature-size-20kb-50kb" className="hover:text-primary transition-colors">SSC, UPSC, NEET &amp; IBPS Photo Size (20KB–50KB)</Link></li>
              <li><Link href="/compare/gold-loan-vs-personal-loan-emi" className="hover:text-primary transition-colors">Gold Loan vs Personal Loan EMI</Link></li>
            </ul>
          </div>
        </section>
      </div>

      {/* All 115 Tools Grouped by Category */}
      <section className="mb-xxl">
        <h2 className="font-headline-lg text-3xl font-bold text-text-primary mb-lg">
          All {allTools.length} Calculators &amp; Utilities by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {CATEGORY_ORDER.map((cat) => {
            const catTools = allTools.filter((t) => t.category.toLowerCase() === cat.id);
            return (
              <div key={cat.id} className="glass-card p-lg rounded-2xl border border-glass-border">
                <div className="flex items-center justify-between border-b border-glass-border pb-3 mb-4">
                  <Link href={`/category/${cat.id}`} className="font-headline-md text-xl font-bold text-primary hover:underline">
                    {cat.label}
                  </Link>
                  <span className="text-xs font-mono text-text-secondary">{catTools.length} tools</span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-text-secondary">
                  {catTools.map((tool) => (
                    <li key={tool.id}>
                      <Link href={`/tools/${tool.id}`} className="hover:text-primary transition-colors block truncate">
                        {tool.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* All Blog Posts */}
      <section className="glass-card p-lg rounded-2xl border border-glass-border">
        <div className="flex items-center justify-between border-b border-glass-border pb-3 mb-4">
          <Link href="/blog" className="font-headline-md text-2xl font-bold text-text-primary hover:text-primary transition-colors">
            Editorial Guides &amp; Financial Deep Dives
          </Link>
          <span className="text-xs font-mono text-text-secondary">{blogPosts.length} articles</span>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm text-text-secondary">
          {blogPosts.map((post) => (
            <li key={post.slug} className="flex items-start justify-between gap-2">
              <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors font-medium">
                {post.title}
              </Link>
              <span className="text-xs font-mono text-text-secondary shrink-0">{post.category}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
