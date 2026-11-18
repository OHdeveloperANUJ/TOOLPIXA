import React, { Suspense } from 'react';
import Link from 'next/link';
import TiltCard from '@/components/TiltCard';
import CategoriesSearchSection from '@/components/CategoriesSearchSection';
import { toolsRegistry } from '@/data/toolsRegistry';
import tags from '../../../tags.json';

export const metadata = {
  title: 'All Tool Categories',
  description: 'Explore precision financial, academic, health, PDF, image, developer, and converter tools across all 8 categories on ToolPixa.',
  alternates: {
    canonical: 'https://www.toolpixa.space/categories',
  },
};

export default function CategoriesPage() {
  const tools = Object.values(toolsRegistry);
  
  const categories = [
        { id: 'finance', title: 'Finance', icon: 'payments', bg: 'bg-primary/10', border: 'border-primary/20', textClass: 'text-primary' },
    { id: 'student', title: 'Student', icon: 'school', bg: 'bg-tertiary/10', border: 'border-tertiary/20', textClass: 'text-tertiary' },
    { id: 'health', title: 'Health', icon: 'health_and_safety', bg: 'bg-secondary/10', border: 'border-secondary/20', textClass: 'text-secondary' },
    { id: 'converter', title: 'Converter', icon: 'sync_alt', bg: 'bg-primary/10', border: 'border-primary/20', textClass: 'text-primary' },
    { id: 'developer', title: 'Developer', icon: 'code', bg: 'bg-secondary-fixed/10', border: 'border-secondary-fixed/20', textClass: 'text-secondary-fixed' },
    { id: 'image', title: 'Image', icon: 'image', bg: 'bg-blue-500/10', border: 'border-blue-500/20', textClass: 'text-blue-500' },
    { id: 'video', title: 'Video', icon: 'movie', bg: 'bg-red-500/10', border: 'border-red-500/20', textClass: 'text-red-500' },
    { id: 'pdf', title: 'PDF', icon: 'picture_as_pdf', bg: 'bg-green-500/10', border: 'border-green-500/20', textClass: 'text-green-500' },

  ];

  return (
    <main className="pt-32 pb-xxl min-h-screen">
      <section className="px-margin max-w-7xl mx-auto text-center mb-xxl animate-fade-in-up">
        <h1 className="font-headline-lg text-headline-lg md:text-display-lg font-bold text-text-primary mb-sm leading-tight">
          Explore Categories
        </h1>
        <p className="font-body-lg text-body-lg text-text-secondary mb-xl max-w-2xl mx-auto">
          Every tool you&apos;ll ever need, organized by domain for rapid access.
        </p>
        <Suspense fallback={null}>
          <CategoriesSearchSection />
        </Suspense>
      </section>

      <section className="px-margin max-w-7xl mx-auto mb-xxl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
          {categories.map((cat, index) => {
            const count = tools.filter(t => t.category.toLowerCase() === cat.id).length;
            return (
              <TiltCard 
                key={cat.id}
                href={`/category/${cat.id}`} 
                className={`p-lg rounded-2xl flex flex-col items-center text-center animate-fade-in-up ${index > 0 ? `animate-stagger-${index}` : ''}`}
              >
                <div className={`w-16 h-16 rounded-2xl ${cat.bg} flex items-center justify-center mb-md border ${cat.border}`}>
                  <span className={`material-symbols-outlined ${cat.textClass} text-3xl`}>{cat.icon}</span>
                </div>
                <h2 className="font-headline-md text-headline-md text-text-primary text-[20px] mb-xs">{cat.title}</h2>
                <p className="font-label-md text-label-md text-text-secondary">{count} Live Tools</p>
              </TiltCard>
            );
          })}
        </div>
      </section>
      <section className="px-margin max-w-7xl mx-auto mb-xxl">
        <div className="glass-card rounded-2xl p-lg md:p-xl border border-glass-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-md">
            <div>
              <h2 className="font-headline-md text-xl md:text-2xl font-bold text-text-primary">Curated Topic Hubs &amp; Lookup Directories</h2>
              <p className="text-sm text-text-secondary">Jump directly to topic collections or pre-computed reference schedules.</p>
            </div>
            <Link href="/calculate" className="text-sm font-label-md text-primary hover:underline shrink-0">
              105+ Exact Calculation Tables →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.keys(tags).map((tagSlug) => (
              <Link
                key={tagSlug}
                href={`/tag/${tagSlug}`}
                className="p-3.5 rounded-xl bg-surface-container border border-glass-border hover:border-primary text-sm font-medium text-text-primary hover:text-primary transition-colors capitalize flex items-center justify-between"
              >
                <span>{tagSlug.replace(/-/g, ' ')} Hub</span>
                <span className="material-symbols-outlined text-sm text-primary">arrow_forward</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
