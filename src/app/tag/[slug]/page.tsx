import React from 'react';


export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tagName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <>

<main className="relative">
<div className="hero-glow"></div>



<section className="max-w-screen-2xl mx-auto px-margin py-xxl flex flex-col items-center text-center">
<div className="inline-flex items-center gap-xs px-sm py-xs rounded-full glass-card border-primary/20 mb-md">
<span className="material-symbols-outlined text-primary text-[18px]" >sell</span>
<span className="font-label-md text-label-md text-primary uppercase tracking-widest">Financial Tag</span>
</div>
<h1 className="font-display-lg text-display-lg md:text-[64px] text-text-primary mb-sm">Tools for <span className="text-primary">Loans</span></h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                Precision calculators and financial instruments tagged with &apos;{tagName}&apos;. 
                Simulate repayments, compare rates, and plan your financial future with professional-grade accuracy.
            </p>
</section>

<section className="max-w-screen-2xl mx-auto px-margin pb-xxxl">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">

<div className="glass-card rounded-xl p-lg flex flex-col h-full group transition-all duration-300 hover:-translate-y-2">
<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-md border border-primary/20 group-hover:bg-primary/20 transition-colors">
<span className="material-symbols-outlined text-primary text-[28px]">home_max</span>
</div>
<h3 className="font-headline-md text-headline-md text-text-primary mb-xs">Home Loan EMI</h3>
<p className="font-body-md text-on-surface-variant mb-xl flex-grow">
                        Calculate monthly installments for your dream home with advanced amortization schedules.
                    </p>
<div className="flex items-center justify-between pt-md border-t border-glass-border">
<span className="font-code-sm text-code-sm text-primary/60 uppercase">Real Estate</span>
<button className="flex items-center gap-xs font-label-md text-label-md text-primary group/btn active:scale-95 transition-all">
                            Open Tool
                            <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
</button>
</div>
</div>

<div className="glass-card rounded-xl p-lg flex flex-col h-full group transition-all duration-300 hover:-translate-y-2">
<div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center mb-md border border-tertiary/20 group-hover:bg-tertiary/20 transition-colors">
<span className="material-symbols-outlined text-tertiary text-[28px]">person</span>
</div>
<h3 className="font-headline-md text-headline-md text-text-primary mb-xs">Personal Loan EMI</h3>
<p className="font-body-md text-on-surface-variant mb-xl flex-grow">
                        Quick estimates for personal expenses, medical bills, or travel funding with flexible interest inputs.
                    </p>
<div className="flex items-center justify-between pt-md border-t border-glass-border">
<span className="font-code-sm text-code-sm text-tertiary/60 uppercase">Individual</span>
<button className="flex items-center gap-xs font-label-md text-label-md text-tertiary group/btn active:scale-95 transition-all">
                            Open Tool
                            <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
</button>
</div>
</div>

<div className="glass-card rounded-xl p-lg flex flex-col h-full group transition-all duration-300 hover:-translate-y-2">
<div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-md border border-secondary/20 group-hover:bg-secondary/20 transition-colors">
<span className="material-symbols-outlined text-secondary text-[28px]">directions_car</span>
</div>
<h3 className="font-headline-md text-headline-md text-text-primary mb-xs">Car Loan EMI</h3>
<p className="font-body-md text-on-surface-variant mb-xl flex-grow">
                        Analyze down payments and tenure options for your next vehicle purchase.
                    </p>
<div className="flex items-center justify-between pt-md border-t border-glass-border">
<span className="font-code-sm text-code-sm text-secondary/60 uppercase">Automotive</span>
<button className="flex items-center gap-xs font-label-md text-label-md text-secondary group/btn active:scale-95 transition-all">
                            Open Tool
                            <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
</button>
</div>
</div>

<div className="glass-card rounded-xl p-lg flex flex-col h-full group transition-all duration-300 hover:-translate-y-2">
<div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center mb-md border border-primary-container/20 group-hover:bg-primary-container/20 transition-colors">
<span className="material-symbols-outlined text-primary-container text-[28px]">domain</span>
</div>
<h3 className="font-headline-md text-headline-md text-text-primary mb-xs">Business Loan EMI</h3>
<p className="font-body-md text-on-surface-variant mb-xl flex-grow">
                        Scale your enterprise with precision calculations for working capital and expansion loans.
                    </p>
<div className="flex items-center justify-between pt-md border-t border-glass-border">
<span className="font-code-sm text-code-sm text-primary-container/60 uppercase">Enterprise</span>
<button className="flex items-center gap-xs font-label-md text-label-md text-primary-container group/btn active:scale-95 transition-all">
                            Open Tool
                            <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
</button>
</div>
</div>
</div>
</section>

<section className="max-w-screen-2xl mx-auto px-margin pb-xxxl">
<div className="relative overflow-hidden glass-card rounded-xxl p-xxl text-center border border-primary/20">
<div className="absolute inset-0 opacity-10 pointer-events-none">

</div>
<div className="relative z-10">
<h2 className="font-headline-lg text-headline-lg text-text-primary mb-sm">Need a custom loan strategy?</h2>
<p className="font-body-lg text-on-surface-variant mb-xl max-w-xl mx-auto">
                        Our advanced API provides high-precision data for institutions and developers. Integrate ToolPixa financial engines today.
                    </p>
<div className="flex flex-col sm:flex-row items-center justify-center gap-md">
<button className="button-gradient px-xxl py-sm rounded-full text-white font-label-md text-label-md hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">Get Started Now</button>
<button className="glass-card px-xxl py-sm rounded-full text-text-primary font-label-md text-label-md hover:scale-105 active:scale-95 transition-all">Documentation</button>
</div>
</div>
</div>
</section>
</main>
    </>
  );
}
