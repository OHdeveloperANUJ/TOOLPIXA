import React from 'react';


export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // E.g. home-loan-emi-vs-personal-loan-emi -> Home Loan Emi Vs Personal Loan Emi
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Split the tools if possible
  const tools = title.split(' Vs ');
  const tool1 = tools[0] || 'Tool 1';
  const tool2 = tools[1] || 'Tool 2';

  return (
    <>

<main className="pt-xxl pb-xxxl px-margin max-w-7xl mx-auto animate-mount">



<section className="mb-xxl text-center lg:text-left relative overflow-hidden">
<div className="relative z-10">
<h1 className="font-display-lg text-display-lg text-text-primary mb-sm leading-tight">
                    Compare: <span className="text-primary">{tool1}</span> <br className="hidden md:block"/>vs <span className="text-secondary">{tool2}</span>
</h1>
<p className="font-body-lg text-body-lg text-text-secondary max-w-2xl">
                    Side-by-side analysis of features, formulas, and best use cases. Make informed financial decisions with precision analytics.
                </p>
</div>

<div className="absolute -top-24 -right-24 w-96 h-96 bg-primary opacity-10 blur-[120px] rounded-full"></div>
<div className="absolute top-48 -left-24 w-64 h-64 bg-secondary opacity-10 blur-[100px] rounded-full"></div>
</section>

<section className="mb-xxl overflow-x-auto">
<div className="min-w-[800px] grid grid-cols-3 gap-px bg-glass-border rounded-xl border border-glass-border overflow-hidden electric-glow">

<div className="bg-surface-container-high p-md flex items-center justify-center border-b border-glass-border">
<span className="font-headline-md text-headline-md text-on-surface-variant">Features</span>
</div>
<div className="bg-surface-container-high p-md border-b border-glass-border">
<div className="flex items-center gap-sm mb-xs">
<span className="material-symbols-outlined text-primary" >home</span>
<h3 className="font-headline-md text-headline-md text-primary">{tool1}</h3>
</div>
<p className="text-label-md font-label-md text-on-surface-variant opacity-70">Asset Building</p>
</div>
<div className="bg-surface-container-high p-md border-b border-glass-border">
<div className="flex items-center gap-sm mb-xs">
<span className="material-symbols-outlined text-secondary" >payments</span>
<h3 className="font-headline-md text-headline-md text-secondary">{tool2}</h3>
</div>
<p className="text-label-md font-label-md text-on-surface-variant opacity-70">Quick Liquidity</p>
</div>

<div className="bg-surface-container p-md flex items-center gap-sm">
<span className="material-symbols-outlined text-on-surface-variant text-sm">trending_up</span>
<span className="font-body-md text-body-md text-on-surface">Interest Rates</span>
</div>
<div className="bg-surface-container-low p-md">
<span className="font-code-sm text-code-sm text-primary text-lg">8.5% - 9.5%</span>
<p className="text-xs text-on-surface-variant mt-1">Lower due to collateral security</p>
</div>
<div className="bg-surface-container-low p-md">
<span className="font-code-sm text-code-sm text-secondary text-lg">10.5% - 24%</span>
<p className="text-xs text-on-surface-variant mt-1">Unsecured; risk premium applies</p>
</div>

<div className="bg-surface-container p-md flex items-center gap-sm">
<span className="material-symbols-outlined text-on-surface-variant text-sm">event</span>
<span className="font-body-md text-body-md text-on-surface">Max Tenure</span>
</div>
<div className="bg-surface-container-low p-md">
<span className="font-code-sm text-code-sm text-on-surface text-lg">Up to 30 years</span>
</div>
<div className="bg-surface-container-low p-md">
<span className="font-code-sm text-code-sm text-on-surface text-lg">Up to 5-7 years</span>
</div>

<div className="bg-surface-container p-md flex items-center gap-sm">
<span className="material-symbols-outlined text-on-surface-variant text-sm">account_balance_wallet</span>
<span className="font-body-md text-body-md text-on-surface">Tax Benefits</span>
</div>
<div className="bg-surface-container-low p-md">
<span className="font-body-md text-body-md text-on-surface">Significant <span className="text-xs text-primary block mt-1">(Section 80C & 24b)</span></span>
</div>
<div className="bg-surface-container-low p-md">
<span className="font-body-md text-body-md text-on-surface">None <span className="text-xs text-on-surface-variant block mt-1">(usually)</span></span>
</div>

<div className="bg-surface-container p-md flex items-center gap-sm">
<span className="material-symbols-outlined text-on-surface-variant text-sm">receipt_long</span>
<span className="font-body-md text-body-md text-on-surface">Processing Fees</span>
</div>
<div className="bg-surface-container-low p-md">
<span className="font-code-sm text-code-sm text-on-surface">0.5% - 1%</span>
</div>
<div className="bg-surface-container-low p-md">
<span className="font-code-sm text-code-sm text-on-surface">1% - 3%</span>
</div>

<div className="bg-surface-container p-md flex items-center gap-sm">
<span className="material-symbols-outlined text-on-surface-variant text-sm">star</span>
<span className="font-body-md text-body-md text-on-surface">Best For</span>
</div>
<div className="bg-surface-container-low p-md">
<span className="font-body-md text-body-md text-on-surface">Real estate & long-term asset building.</span>
</div>
<div className="bg-surface-container-low p-md">
<span className="font-body-md text-body-md text-on-surface">Immediate needs & flexible expenses.</span>
</div>
</div>
</section>

<section className="max-w-3xl mx-auto">
<div className="glass-card p-xl rounded-xxl text-center verdict-glow relative">
<div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-on-primary-fixed px-lg py-xs rounded-full font-label-md text-label-md uppercase tracking-widest border border-white/20">
                    Precision Verdict
                </div>
<h2 className="font-headline-lg text-headline-lg text-text-primary mb-md mt-sm">The Verdict</h2>
<div className="grid md:grid-cols-2 gap-lg text-left">
<div className="p-md bg-white/5 rounded-xl border border-white/5">
<h4 className="text-primary font-bold mb-xs flex items-center gap-xs">
<span className="material-symbols-outlined text-sm">check_circle</span> Home Loan
                        </h4>
<p className="text-body-md text-on-surface-variant leading-relaxed">
                            Choose a Home Loan for long-term property investment with tax advantages. Ideal for building multi-generational equity.
                        </p>
</div>
<div className="p-md bg-white/5 rounded-xl border border-white/5">
<h4 className="text-secondary font-bold mb-xs flex items-center gap-xs">
<span className="material-symbols-outlined text-sm">bolt</span> Personal Loan
                        </h4>
<p className="text-body-md text-on-surface-variant leading-relaxed">
                            Choose a Personal Loan for fast, unsecured funding with shorter commitments. Best for emergencies or bridge financing.
                        </p>
</div>
</div>
<button className="mt-xl bg-surface-bright border border-glass-border px-xl py-md rounded-full font-bold text-text-primary hover:scale-105 active:scale-95 transition-all flex items-center gap-sm mx-auto">
                    Calculate your EMI <span className="material-symbols-outlined">calculate</span>
</button>
</div>
</section>
</main>
    </>
  );
}
