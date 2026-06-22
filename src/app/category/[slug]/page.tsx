import React from 'react';
import Link from 'next/link';
import CategoryToolsGrid from '@/components/CategoryToolsGrid';
import { toolsRegistry } from '@/data/toolsRegistry';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const categoryTools = Object.values(toolsRegistry).filter(
    t => t.category.toLowerCase() === slug.toLowerCase()
  );
  
  // Example formatting
  const categoryName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <>

<main className="pt-16">
{slug.toLowerCase() === 'finance' && (
  <div className="w-full z-40 bg-surface-container/80 backdrop-blur-md border-b border-glass-border shadow-sm hidden md:block">
    <div className="flex justify-center items-center h-10 px-margin max-w-7xl mx-auto gap-8 overflow-x-auto no-scrollbar">
      <Link href="/category/finance?tag=loans" className="text-text-secondary hover:text-primary text-sm font-label-md uppercase tracking-widest whitespace-nowrap transition-colors">Loans</Link>
      <Link href="/category/finance?tag=tax" className="text-text-secondary hover:text-primary text-sm font-label-md uppercase tracking-widest whitespace-nowrap transition-colors">Tax</Link>
      <Link href="/category/finance?tag=investments" className="text-text-secondary hover:text-primary text-sm font-label-md uppercase tracking-widest whitespace-nowrap transition-colors">Investments</Link>
      <Link href="/category/finance?tag=savings" className="text-text-secondary hover:text-primary text-sm font-label-md uppercase tracking-widest whitespace-nowrap transition-colors">Savings</Link>
      <Link href="/category/finance?tag=retirement" className="text-text-secondary hover:text-primary text-sm font-label-md uppercase tracking-widest whitespace-nowrap transition-colors">Retirement</Link>
    </div>
  </div>
)}

<section className="relative w-full py-xxxl px-margin mesh-gradient flex flex-col items-center justify-center text-center overflow-hidden">

<div className="relative z-10 max-w-3xl">
<h1 className="font-display-lg text-display-lg mb-sm tracking-tight text-text-primary">{categoryName} Tools</h1>
<p className="font-body-lg text-body-lg text-text-secondary opacity-90">Explore all precision tools in this category. Built for accuracy, designed for professional grade calculations and financial planning.</p>
</div>

<div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
<div className="absolute -bottom-24 -right-24 w-96 h-96 bg-inverse-primary/10 blur-[120px] rounded-full"></div>
</section>



<CategoryToolsGrid initialTools={categoryTools} category={slug} />

<section className="max-w-7xl mx-auto px-margin mb-xxxl">
<div className="glass-card p-xxl rounded-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-xl justify-between">
<div className="relative z-10">
<h2 className="font-headline-lg text-headline-lg text-text-primary mb-xs">Need a custom tool?</h2>
<p className="font-body-md text-body-md text-text-secondary">Our developers are constantly building new precision instruments for financial analysis.</p>
</div>
                <Link href="mailto:support@toolpixa.space?subject=ToolPixa%20Tool%20Request" className="relative z-10 px-xxl py-md bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold rounded-lg primary-glow transition-all duration-300 hover:scale-105 active:scale-95 inline-block">
                    Request Tool
                </Link>
<div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full"></div>
</div>
</section>
</main>
    </>
  );
}
