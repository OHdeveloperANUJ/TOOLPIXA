import React from 'react';
import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import { toolsRegistry } from '@/data/toolsRegistry';
import tags from '../../../../tags.json';

const BASE_URL = 'https://toolpixa.space';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tagName = slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  const canonicalUrl = `${BASE_URL}/tag/${slug.toLowerCase()}`;

  return {
    title: `${tagName} Calculators & Tools — Free Online Suite`,
    description: `Browse all precision calculators and utilities tagged with ${tagName}. Instant client-side calculations with no sign-ups required.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${tagName} Calculators & Tools | ToolPixa`,
      description: `Browse all precision calculators and utilities tagged with ${tagName}.`,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const normalizedSlug = slug.toLowerCase();
  const tagName = slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  const tagsMap = tags as Record<string, string[]>;
  const tagToolSlugs = tagsMap[normalizedSlug] || [];

  // Get tools from tags.json, or fallback to keyword matching across toolsRegistry
  let matchedTools = tagToolSlugs
    .map((id) => toolsRegistry[id])
    .filter(Boolean);

  if (matchedTools.length === 0) {
    const keyword = normalizedSlug.replace(/-/g, ' ');
    matchedTools = Object.values(toolsRegistry).filter(
      (t) =>
        t.title.toLowerCase().includes(keyword) ||
        t.description.toLowerCase().includes(keyword) ||
        t.category.toLowerCase().includes(keyword)
    );
  }

  if (matchedTools.length === 0) {
    matchedTools = Object.values(toolsRegistry).slice(0, 8);
  }

  return (
    <main className="relative pt-28 pb-xxxl">
      <section className="max-w-7xl mx-auto px-margin py-xl flex flex-col items-center text-center">
        <div className="text-xs font-label-md text-primary uppercase tracking-widest mb-sm">
          Topic Hub · {matchedTools.length} Tools Available
        </div>
        <h1 className="font-display-lg text-4xl md:text-6xl font-bold text-text-primary mb-sm text-balance">
          Tools for <span className="text-primary">{tagName}</span>
        </h1>
        <p className="font-body-lg text-body-lg text-text-secondary max-w-2xl">
          Precision calculators and online utilities curated for {tagName}. Run instant simulations, compare scenarios, and export schedules directly in your browser.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-margin pb-xxl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {matchedTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-margin">
        <div className="glass-card rounded-2xl p-xl text-center border border-glass-border">
          <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-text-primary mb-sm">
            Explore More Categories
          </h2>
          <p className="font-body-md text-text-secondary mb-lg max-w-xl mx-auto">
            Browse all 115+ calculators across Finance, Health, Student, Developer, Converter, PDF, and Image categories.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-md">
            <Link
              href="/categories"
              className="px-xl py-3 rounded-xl bg-primary text-on-primary font-label-md hover:opacity-90 transition-all"
            >
              Browse All Categories
            </Link>
            <Link
              href="/sitemap"
              className="px-xl py-3 rounded-xl glass-card text-text-primary border border-glass-border font-label-md hover:border-primary transition-all"
            >
              Full Tools Directory
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
