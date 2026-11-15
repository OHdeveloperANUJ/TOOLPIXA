import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import FaqAccordion from '@/components/FaqAccordion';
import ShareButton from '@/components/ShareButton';
import { programmaticPages, programmaticSlugs } from '@/data/programmaticSeo';
import { toolsRegistry } from '@/data/toolsRegistry';

const embeddedTools: Record<string, React.ComponentType> = {
  'home-loan-emi-calculator': dynamic(() => import('@/components/tools/HomeLoanEmi')),
  'salary-calculator': dynamic(() => import('@/components/tools/SalaryCalculator')),
  'fd-calculator': dynamic(() => import('@/components/tools/FdCalculator')),
  'sip-calculator': dynamic(() => import('@/components/tools/SipCalculator')),
  'gpa-calculator': dynamic(() => import('@/components/tools/GpaCalculator')),
  'personal-loan-emi-calculator': dynamic(() => import('@/components/tools/PersonalLoanEmi')),
  'car-loan-calculator': dynamic(() => import('@/components/tools/CarLoanCalculator')),
  'compress-image-to-20kb': dynamic(() => import('@/components/tools/CompressImageTo20Kb')),
  'compress-image-to-50kb': dynamic(() => import('@/components/tools/CompressImageTo50Kb')),
  'compress-image-to-100kb': dynamic(() => import('@/components/tools/CompressImageTo100Kb')),
  'compress-pdf-to-200kb': dynamic(() => import('@/components/tools/CompressPdfTo200Kb')),
};

const CATEGORY_META: Record<
  string,
  { label: string; partnerName: string; partnerUrl: string; partnerDesc: string; amazonQuery: string }
> = {
  'home-loan': {
    label: 'Home Loan EMI Calculations',
    partnerName: 'Groww Financial Suite',
    partnerUrl: 'https://app.groww.in/v3cO/edi2uad9',
    partnerDesc: 'Compare home loan prepayment strategies and build a parallel SIP to recover 100% of your home loan interest.',
    amazonQuery: 'home+loan+personal+finance+books+india',
  },
  salary: {
    label: 'CTC to In-Hand Salary Breakdowns (FY 2025-26)',
    partnerName: 'ClearTax ITR Filing',
    partnerUrl: 'https://cleartax.in/',
    partnerDesc: 'Optimize your New vs Old Tax Regime declaration, HRA exemptions, and Section 80C/80CCD(1B) deductions in 3 minutes.',
    amazonQuery: 'income+tax+saving+investment+books+india',
  },
  fd: {
    label: 'Fixed Deposit (FD) Monthly Interest Tables',
    partnerName: 'Groww Fixed Income & Mutual Funds',
    partnerUrl: 'https://app.groww.in/v3cO/edi2uad9',
    partnerDesc: 'Compare bank FD rates against Debt Funds, Arbitrage Funds, and Direct Mutual Funds with zero commission.',
    amazonQuery: 'retirement+planning+personal+finance+book',
  },
  sip: {
    label: 'Monthly SIP Wealth & Compounding Tables',
    partnerName: 'Groww Direct Mutual Funds',
    partnerUrl: 'https://app.groww.in/v3cO/edi2uad9',
    partnerDesc: 'Invest in 0% commission Direct Mutual Fund SIPs and earn up to 1.2% higher annual CAGR than Regular plans.',
    amazonQuery: 'mutual+fund+sip+investing+books+india',
  },
  cgpa: {
    label: 'University CGPA to Percentage Conversions',
    partnerName: 'Coursera Career Certificates',
    partnerUrl: 'https://www.coursera.org/',
    partnerDesc: 'Boost your placement resume alongside your CGPA with industry-recognized Google, IBM, and Meta certifications.',
    amazonQuery: 'gate+cat+placement+aptitude+preparation+books',
  },
  loan: {
    label: 'Personal Loan & Car Loan EMI Schedules',
    partnerName: 'Groww Credit & Wealth',
    partnerUrl: 'https://app.groww.in/v3cO/edi2uad9',
    partnerDesc: 'Track EMIs, check credit health, and plan systematic debt-free payoffs with zero hidden charges.',
    amazonQuery: 'personal+finance+debt+free+books',
  },
  exam: {
    label: 'Indian Competitive Exam Photo, Signature & PDF Size Guides',
    partnerName: 'Coursera Test Prep & Upskilling',
    partnerUrl: 'https://www.coursera.org/',
    partnerDesc: 'Prepare for analytical, data science, and public-sector career tracks with top university courses.',
    amazonQuery: 'ssc+upsc+neet+jee+ibps+previous+year+books',
  },
};

export async function generateStaticParams() {
  return programmaticSlugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pageData = programmaticPages[slug];
  if (!pageData) return {};

  const baseUrl = 'https://www.toolpixa.space';
  return {
    title: pageData.seoTitle,
    description: pageData.seoDescription,
    alternates: {
      canonical: `${baseUrl}/calculate/${slug}`,
    },
    openGraph: {
      title: pageData.seoTitle,
      description: pageData.seoDescription,
      url: `${baseUrl}/calculate/${slug}`,
      siteName: 'ToolPixa',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.seoTitle,
      description: pageData.seoDescription,
    },
  };
}

export default async function ProgrammaticCalculationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pageData = programmaticPages[slug];

  if (!pageData) {
    notFound();
  }

  const baseUrl = 'https://www.toolpixa.space';
  const ToolComponent = embeddedTools[pageData.toolSlug];
  const parentTool = toolsRegistry[pageData.toolSlug];
  const catMeta = CATEGORY_META[pageData.category] || CATEGORY_META['home-loan'];

  const siblingPages = Object.values(programmaticPages).filter(
    (p) => p.category === pageData.category && p.slug !== slug
  );

  const crossCategorySamples = Object.values(programmaticPages)
    .filter((p) => p.category !== pageData.category)
    .filter((_, idx) => idx % 11 === 0)
    .slice(0, 8);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Exact Calculations & Tables',
            item: `${baseUrl}/calculate`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: pageData.title,
            item: `${baseUrl}/calculate/${slug}`,
          },
        ],
      },
      {
        '@type': 'WebPage',
        name: pageData.seoTitle,
        description: pageData.seoDescription,
        url: `${baseUrl}/calculate/${slug}`,
        isPartOf: {
          '@type': 'WebSite',
          name: 'ToolPixa',
          url: baseUrl,
        },
      },
      ...(pageData.faqs.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: pageData.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main className="pt-24 pb-xxl px-margin max-w-7xl mx-auto min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="font-label-md text-label-md text-text-secondary mb-lg flex flex-wrap items-center gap-2"
      >
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="text-glass-border">/</span>
        <Link href="/calculate" className="hover:text-primary transition-colors">
          Calculations &amp; Tables
        </Link>
        <span className="text-glass-border">/</span>
        <span className="text-text-primary truncate max-w-[320px]">{pageData.title}</span>
      </nav>

      {/* Hero Header */}
      <header className="mb-xl">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-md">
          <div>
            <span className="inline-block font-mono text-xs uppercase tracking-widest text-primary mb-2">
              {catMeta.label} · Verified 2026 Schedule
            </span>
            <h1 className="font-headline-lg text-3xl md:text-5xl font-bold text-text-primary leading-tight max-w-4xl">
              {pageData.h1}
            </h1>
          </div>
          <div className="shrink-0">
            <ShareButton title={pageData.seoTitle} />
          </div>
        </div>
        <p className="font-body-lg text-body-lg text-text-secondary max-w-3xl leading-relaxed">
          {pageData.subtitle}
        </p>
      </header>

      {/* 4 KPI Summary Highlight Cards */}
      <section aria-label="Key Calculation Summary" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-xxl">
        {pageData.summaryHighlight.map((item, idx) => (
          <div
            key={idx}
            className="glass-card p-5 rounded-2xl border border-glass-border flex flex-col justify-between"
          >
            <span className="text-xs font-label-md uppercase tracking-wider text-text-secondary mb-1">
              {item.label}
            </span>
            <span className="font-mono text-2xl md:text-3xl font-bold text-primary my-1 tabular-nums">
              {item.value}
            </span>
            <span className="text-xs text-text-secondary">{item.sub}</span>
          </div>
        ))}
      </section>

      {/* Primary Featured-Snippet Reference Table */}
      <section className="glass-card p-lg md:p-xl rounded-2xl border border-glass-border mb-xxl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-md">
          <div>
            <h2 className="font-headline-md text-2xl font-bold text-text-primary">
              {pageData.primaryTable.heading}
            </h2>
            <p className="text-sm text-text-secondary mt-1">{pageData.primaryTable.caption}</p>
          </div>
          {parentTool && (
            <Link
              href={`/tools/${parentTool.id}`}
              className="text-xs font-label-md text-primary hover:underline inline-flex items-center gap-1 shrink-0"
            >
              Open Full {parentTool.title} <span className="material-symbols-outlined text-xs">open_in_new</span>
            </Link>
          )}
        </div>

        <div className="overflow-x-auto rounded-xl border border-glass-border">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container border-b border-glass-border text-text-primary font-semibold">
                {pageData.primaryTable.headers.map((header, i) => (
                  <th key={i} className="py-3.5 px-4 whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border font-mono text-xs md:text-sm">
              {pageData.primaryTable.rows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className="hover:bg-surface-container/60 transition-colors"
                >
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={`py-3 px-4 whitespace-nowrap ${
                        cIdx === 0
                          ? 'font-sans font-semibold text-text-primary'
                          : cIdx === 1
                          ? 'text-primary font-bold'
                          : 'text-text-secondary'
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Interactive Live Calculator Embedded Right on Page */}
      {ToolComponent && (
        <section className="mb-xxl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-lg gap-2">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-primary block mb-1">
                100% Interactive · Client-Side Privacy
              </span>
              <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-text-primary">
                Customize Your Numbers Live
              </h2>
              <p className="text-sm text-text-secondary">
                Adjust interest rates, tenure, deductions, or file compression settings in real time below.
              </p>
            </div>
          </div>
          <ToolComponent />
        </section>
      )}

      {/* Secondary Comparison / Bank / Regime Table */}
      <section className="glass-card p-lg md:p-xl rounded-2xl border border-glass-border mb-xxl">
        <h2 className="font-headline-md text-2xl font-bold text-text-primary mb-1">
          {pageData.secondaryTable.heading}
        </h2>
        <p className="text-sm text-text-secondary mb-md">{pageData.secondaryTable.caption}</p>

        <div className="overflow-x-auto rounded-xl border border-glass-border">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-surface-container border-b border-glass-border text-text-primary font-semibold">
                {pageData.secondaryTable.headers.map((header, i) => (
                  <th key={i} className="py-3.5 px-4 whitespace-nowrap">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border font-mono text-xs md:text-sm">
              {pageData.secondaryTable.rows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className="hover:bg-surface-container/60 transition-colors"
                >
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={`py-3 px-4 ${
                        cIdx === 0
                          ? 'font-sans font-semibold text-text-primary'
                          : cIdx === 1
                          ? 'text-primary font-bold'
                          : 'font-sans text-text-secondary'
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Expert Key Takeaways & Actionable Advice */}
      <section className="glass-card p-lg md:p-xl rounded-2xl border border-glass-border mb-xxl">
        <h2 className="font-headline-md text-2xl font-bold text-text-primary mb-md flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">verified</span>
          <span>Key Financial &amp; Technical Takeaways</span>
        </h2>
        <ul className="space-y-3 text-text-secondary font-body-md leading-relaxed">
          {pageData.keyTakeaways.map((point, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">
                check_circle
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Recommended Partner & Amazon Associates Resources */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-xxl">
        <a
          href={catMeta.partnerUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="glass-card p-lg rounded-2xl border border-glass-border hover:border-primary transition-colors flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-primary">
                Recommended Platform
              </span>
              <span className="material-symbols-outlined text-text-secondary group-hover:text-primary transition-colors text-sm">
                open_in_new
              </span>
            </div>
            <h3 className="font-headline-md text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
              {catMeta.partnerName}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">{catMeta.partnerDesc}</p>
          </div>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-label-md text-primary font-semibold">
            Explore Free Account <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </span>
        </a>

        <a
          href={`https://www.amazon.in/s?k=${catMeta.amazonQuery}&tag=toolpixa-21`}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="glass-card p-lg rounded-2xl border border-glass-border hover:border-primary transition-colors flex flex-col justify-between group"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-secondary">
                Curated Reading &amp; Guides
              </span>
              <span className="material-symbols-outlined text-text-secondary group-hover:text-primary transition-colors text-sm">
                shopping_bag
              </span>
            </div>
            <h3 className="font-headline-md text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
              Top-Rated Books &amp; Exam Guides on Amazon India
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Browse bestselling Indian personal finance books, tax-saving handbooks, and latest exam preparation guides.
            </p>
          </div>
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-label-md text-primary font-semibold">
            View Bestsellers on Amazon.in <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </span>
        </a>
      </section>

      {/* Frequently Asked Questions */}
      {pageData.faqs.length > 0 && (
        <section className="mb-xxl">
          <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-text-primary mb-lg">
            Frequently Asked Questions
          </h2>
          <FaqAccordion faqs={pageData.faqs} />
        </section>
      )}

      {/* Sibling Calculations in the Same Vertical (Strong Internal Link Mesh) */}
      <section className="glass-card p-lg md:p-xl rounded-2xl border border-glass-border mb-xxl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-md border-b border-glass-border pb-3">
          <div>
            <h2 className="font-headline-md text-xl font-bold text-text-primary">
              More {catMeta.label}
            </h2>
            <p className="text-xs text-text-secondary">
              Compare adjacent loan amounts, salary packages, SIP targets, and grade conversions:
            </p>
          </div>
          <Link href="/calculate" className="text-xs font-label-md text-primary hover:underline">
            View All 105 Calculations →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {siblingPages.map((item) => (
            <Link
              key={item.slug}
              href={`/calculate/${item.slug}`}
              className="p-3 rounded-xl bg-surface-container border border-glass-border hover:border-primary text-xs font-medium text-text-secondary hover:text-text-primary transition-colors truncate"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Cross-Vertical Popular Calculations */}
      <section className="glass-card p-lg rounded-2xl border border-glass-border">
        <h2 className="font-headline-md text-lg font-bold text-text-primary mb-3">
          Popular Calculations Across Other Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {crossCategorySamples.map((item) => (
            <Link
              key={item.slug}
              href={`/calculate/${item.slug}`}
              className="p-3 rounded-xl bg-surface-container border border-glass-border hover:border-primary text-xs font-medium text-text-secondary hover:text-text-primary transition-colors truncate"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
