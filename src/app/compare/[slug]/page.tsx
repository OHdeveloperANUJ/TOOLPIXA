import React from 'react';
import Link from 'next/link';
import { toolsRegistry } from '@/data/toolsRegistry';

const BASE_URL = 'https://www.toolpixa.space';

interface ComparisonConfig {
  title1: string;
  title2: string;
  slug1: string;
  slug2: string;
  subtitle1: string;
  subtitle2: string;
  rows: { label: string; icon: string; val1: string; sub1?: string; val2: string; sub2?: string }[];
  verdict1: string;
  verdict2: string;
}

const PRESET_COMPARISONS: Record<string, ComparisonConfig> = {
  'home-loan-emi-vs-personal-loan-emi': {
    title1: 'Home Loan EMI',
    title2: 'Personal Loan EMI',
    slug1: 'home-loan-emi-calculator',
    slug2: 'personal-loan-emi-calculator',
    subtitle1: 'Secured Long-Term Asset Financing',
    subtitle2: 'Unsecured Rapid Liquidity',
    rows: [
      { label: 'Typical Interest Rate', icon: 'trending_up', val1: '8.25% – 9.50% p.a.', sub1: 'Lower rate backed by property collateral', val2: '10.50% – 24.00% p.a.', sub2: 'Unsecured credit carries higher risk premium' },
      { label: 'Maximum Tenure', icon: 'event', val1: 'Up to 30 Years', val2: 'Up to 5 – 7 Years' },
      { label: 'Income Tax Benefits', icon: 'account_balance_wallet', val1: 'Sec 80C (₹1.5L) & Sec 24b (₹2L)', sub1: 'Under Old Tax Regime', val2: 'No standard deduction', sub2: 'Unless used for business/home renovation' },
      { label: 'Processing & Prepayment', icon: 'receipt_long', val1: '0% Foreclosure Fee on Floating Rate', val2: '2% – 5% Foreclosure Penalty' },
      { label: 'Ideal Use Case', icon: 'star', val1: 'Purchasing or constructing residential property', val2: 'Emergency medical, wedding, or short-term consolidation' },
    ],
    verdict1: 'Choose a Home Loan for property acquisition or home extension where long tenures and RBI zero-prepayment rules save lakhs in interest.',
    verdict2: 'Choose a Personal Loan only for urgent short-term liquidity needs when collateral isn’t available and you can repay within 12–36 months.',
  },
  'sip-vs-lumpsum': {
    title1: 'SIP Investment',
    title2: 'Lumpsum Investment',
    slug1: 'sip-calculator',
    slug2: 'mutual-fund-lumpsum',
    subtitle1: 'Systematic Rupee-Cost Averaging',
    subtitle2: 'Immediate Full-Capital Compounding',
    rows: [
      { label: 'Capital Deployment', icon: 'payments', val1: 'Fixed monthly installments', sub1: 'Starts from ₹500/month', val2: 'Single one-time deployment', sub2: 'Ideal for bonuses or maturity payouts' },
      { label: 'Market Volatility Impact', icon: 'trending_up', val1: 'Buys more units when markets dip', sub1: 'Automatic rupee-cost averaging', val2: 'High sensitivity to entry date valuation', sub2: 'Best when market PE valuations are low' },
      { label: 'Historical 10Y+ Edge', icon: 'analytics', val1: 'Wins in volatile or sideways start years', val2: 'Wins in ~65% of steady bull runs' },
      { label: 'Investor Psychology', icon: 'favorite', val1: 'Low stress; automated salary discipline', val2: 'Requires high conviction during corrections' },
    ],
    verdict1: 'Choose SIP for monthly salaried income or when deploying money during all-time market highs via a 6–12 month STP.',
    verdict2: 'Choose Lumpsum when you have idle windfall capital, an 8–10+ year horizon, and market valuations have corrected.',
  },
  'ppf-vs-fd': {
    title1: 'Public Provident Fund (PPF)',
    title2: 'Fixed Deposit (FD)',
    slug1: 'ppf-calculator',
    slug2: 'fd-calculator',
    subtitle1: 'Sovereign Tax-Free EEE Compounding',
    subtitle2: 'Flexible Tenure Bank Guarantee',
    rows: [
      { label: 'Current Interest Rate', icon: 'percent', val1: '7.10% p.a. (Compounded Annually)', val2: '6.25% – 7.25% p.a. (Compounded Quarterly)' },
      { label: 'Taxation Status', icon: 'receipt_long', val1: '100% Tax-Free (EEE Status)', sub1: 'Zero tax on interest or maturity', val2: 'Interest taxed at slab rate every year', sub2: 'TDS applies above ₹50,000/yr' },
      { label: 'Lock-in & Liquidity', icon: 'event', val1: '15 Years lock-in (partial after Year 7)', val2: '7 Days to 10 Years (instant premature break)' },
      { label: 'Capital Safety', icon: 'security', val1: '100% Government of India Sovereign Guarantee', val2: 'DICGC insured up to ₹5 Lakh per bank' },
    ],
    verdict1: 'Choose PPF for 15-year tax-free wealth creation and retirement planning, especially if you are in the 20% or 30% tax slab.',
    verdict2: 'Choose Fixed Deposits for emergency funds and 1–5 year goals where instant liquidity matters more than tax-free interest.',
  },
  'old-tax-regime-vs-new-tax-regime': {
    title1: 'Old Tax Regime',
    title2: 'New Tax Regime (FY 2025–26)',
    slug1: 'income-tax-calculator',
    slug2: 'salary-calculator',
    subtitle1: 'Deduction-Driven Tax Optimization',
    subtitle2: 'Lower Slabs with Zero Paperwork',
    rows: [
      { label: 'Zero-Tax Rebate Limit', icon: 'payments', val1: 'Up to ₹5.0 Lakh taxable income', val2: 'Up to ₹12.75 Lakh (for salaried with ₹75k std deduction)' },
      { label: 'Standard Deduction', icon: 'receipt', val1: '₹50,000 for salaried employees', val2: '₹75,000 for salaried employees' },
      { label: 'Allowed Exemptions', icon: 'account_balance_wallet', val1: 'HRA, 80C (₹1.5L), 80D, Home Loan 24b (₹2L)', val2: 'Most exemptions removed (80CCD(2) Employer NPS allowed)' },
      { label: 'Breakeven Threshold', icon: 'calculate', val1: 'Better if total deductions exceed ₹4.25L – ₹5L+', val2: 'Better for 85%+ of taxpayers with fewer deductions' },
    ],
    verdict1: 'Choose the Old Tax Regime only if you claim substantial HRA plus full 80C, 80D, and Home Loan interest exceeding ₹4.5 Lakh combined.',
    verdict2: 'Choose the New Tax Regime for lower default tax rates, zero tax up to ₹12.75L salaried income, and freedom from forced tax-saving lock-ins.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const preset = PRESET_COMPARISONS[slug.toLowerCase()];
  const title = preset
    ? `${preset.title1} vs ${preset.title2} — Side-by-Side Comparison`
    : slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  const canonicalUrl = `${BASE_URL}/compare/${slug.toLowerCase()}`;

  return {
    title,
    description: `Compare ${title} side by side: interest rates, formulas, tax benefits, and interactive calculators on ToolPixa.`,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase();
  const preset = PRESET_COMPARISONS[normalizedSlug];

  const rawParts = slug.split('-vs-');
  const slug1 = preset?.slug1 || (toolsRegistry[rawParts[0]] ? rawParts[0] : 'home-loan-emi-calculator');
  const slug2 = preset?.slug2 || (toolsRegistry[rawParts[1]] ? rawParts[1] : 'personal-loan-emi-calculator');

  const tool1 = preset?.title1 || toolsRegistry[slug1]?.title || (rawParts[0] || 'Tool 1').replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  const tool2 = preset?.title2 || toolsRegistry[slug2]?.title || (rawParts[1] || 'Tool 2').replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  const rows = preset?.rows || PRESET_COMPARISONS['home-loan-emi-vs-personal-loan-emi'].rows;
  const verdict1 = preset?.verdict1 || PRESET_COMPARISONS['home-loan-emi-vs-personal-loan-emi'].verdict1;
  const verdict2 = preset?.verdict2 || PRESET_COMPARISONS['home-loan-emi-vs-personal-loan-emi'].verdict2;

  return (
    <main className="pt-28 pb-xxxl px-margin max-w-7xl mx-auto">
      <nav className="font-label-md text-xs text-text-secondary mb-md flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-primary transition-colors">Compare</Link>
        <span>/</span>
        <span className="text-text-primary">{tool1} vs {tool2}</span>
      </nav>

      <section className="mb-xxl text-left relative">
        <h1 className="font-display-lg text-4xl md:text-5xl font-bold text-text-primary mb-sm leading-tight text-balance">
          Compare: <span className="text-primary">{tool1}</span> vs <span className="text-secondary">{tool2}</span>
        </h1>
        <p className="font-body-lg text-body-lg text-text-secondary max-w-2xl">
          Side-by-side analysis of rates, formulas, tax rules, and best use cases. Make data-driven decisions with instant calculators.
        </p>
      </section>

      <section className="mb-xxl overflow-x-auto">
        <div className="min-w-[760px] grid grid-cols-3 gap-px bg-glass-border rounded-2xl border border-glass-border overflow-hidden">
          <div className="bg-surface-container-high p-md flex items-center font-headline-md text-text-primary font-bold">
            Parameter
          </div>
          <div className="bg-surface-container-high p-md">
            <h2 className="font-headline-md text-lg font-bold text-primary">{tool1}</h2>
            <p className="text-xs font-label-md text-text-secondary mt-0.5">{preset?.subtitle1 || 'Primary Option'}</p>
          </div>
          <div className="bg-surface-container-high p-md">
            <h2 className="font-headline-md text-lg font-bold text-secondary">{tool2}</h2>
            <p className="text-xs font-label-md text-text-secondary mt-0.5">{preset?.subtitle2 || 'Alternative Option'}</p>
          </div>

          {rows.map((row, idx) => (
            <React.Fragment key={idx}>
              <div className="bg-surface-container p-md flex items-center gap-sm">
                <span className="material-symbols-outlined text-text-secondary text-sm">{row.icon}</span>
                <span className="font-body-md text-text-primary font-medium">{row.label}</span>
              </div>
              <div className="bg-surface-container-low p-md">
                <span className="font-code-sm text-text-primary font-semibold text-base tabular-nums">{row.val1}</span>
                {row.sub1 && <p className="text-xs text-text-secondary mt-1">{row.sub1}</p>}
              </div>
              <div className="bg-surface-container-low p-md">
                <span className="font-code-sm text-text-primary font-semibold text-base tabular-nums">{row.val2}</span>
                {row.sub2 && <p className="text-xs text-text-secondary mt-1">{row.sub2}</p>}
              </div>
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto">
        <div className="glass-card p-xl rounded-2xl border border-glass-border">
          <div className="text-xs font-label-md text-primary uppercase tracking-widest mb-2 text-center">
            Precision Verdict
          </div>
          <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-text-primary mb-lg text-center">
            Which One Should You Choose?
          </h2>
          <div className="grid md:grid-cols-2 gap-lg text-left mb-xl">
            <div className="p-lg bg-surface-container rounded-xl border border-glass-border flex flex-col justify-between">
              <div>
                <h3 className="text-primary font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">check_circle</span> {tool1}
                </h3>
                <p className="text-body-md text-text-secondary leading-relaxed mb-6">
                  {verdict1}
                </p>
              </div>
              <Link
                href={`/tools/${slug1}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-sm hover:opacity-90 transition-all"
              >
                Open {tool1} Calculator <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="p-lg bg-surface-container rounded-xl border border-glass-border flex flex-col justify-between">
              <div>
                <h3 className="text-secondary font-bold text-lg mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">bolt</span> {tool2}
                </h3>
                <p className="text-body-md text-text-secondary leading-relaxed mb-6">
                  {verdict2}
                </p>
              </div>
              <Link
                href={`/tools/${slug2}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-container-high text-text-primary border border-glass-border font-bold text-sm hover:border-primary transition-all"
              >
                Open {tool2} Calculator <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
