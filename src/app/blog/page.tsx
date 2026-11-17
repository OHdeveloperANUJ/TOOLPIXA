import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TiltCard from '@/components/TiltCard';
import { blogPosts } from '@/data/blogData';

export const metadata = {
  title: 'Financial, Academic & Technical Guides — ToolPixa Blog',
  description: 'Deep-dive guides on SIP vs Lumpsum, Home Loan Prepayment, Old vs New Tax Regime, PPF vs FD, CGPA conversions, and Indian BMI cutoffs.',
  alternates: { canonical: 'https://www.toolpixa.space/blog' },
};

export default function BlogHome() {
  const featuredPost = blogPosts.find((post) => post.isFeatured) || blogPosts[0];
  const recentPosts = blogPosts.filter((post) => post.slug !== featuredPost.slug);

  return (
    <main className="pt-28 pb-xxl min-h-screen">
      {/* Page Header */}
      <section className="px-margin max-w-7xl mx-auto text-center mb-xl animate-fade-in-up">
        <p className="font-label-md text-xs text-primary uppercase tracking-widest mb-2">
          Editorial Research &amp; Mathematical Guides
        </p>
        <h1 className="font-display-lg text-4xl md:text-5xl font-bold text-text-primary mb-sm tracking-tight">
          ToolPixa Insights
        </h1>
        <p className="font-body-lg text-body-lg text-text-secondary max-w-2xl mx-auto">
          Practical, data-backed breakdowns on personal finance, tax planning, academic grading, and health metrics.
        </p>
      </section>

      {/* Featured Article Hero */}
      <section className="px-margin max-w-7xl mx-auto mb-xxl animate-fade-in-up">
        <Link
          href={`/blog/${featuredPost.slug}`}
          className="block relative group overflow-hidden rounded-3xl border border-glass-border bg-surface-container"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="relative min-h-[280px] lg:min-h-[420px] lg:col-span-7 overflow-hidden bg-surface-container-high">
              <Image
                src={featuredPost.imageUrl}
                alt={featuredPost.title}
                fill
                referrerPolicy="no-referrer"
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-center bg-surface-container">
              <div className="flex items-center gap-2 text-xs font-mono text-text-secondary mb-3">
                <span className="text-primary font-bold uppercase">Featured Guide</span>
                <span aria-hidden="true">·</span>
                <span>{featuredPost.category}</span>
                <span aria-hidden="true">·</span>
                <span>{featuredPost.readTime || '6 min read'}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight group-hover:text-primary transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-text-secondary font-body-md mb-6 line-clamp-3">
                {featuredPost.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-glass-border mt-auto">
                <div className="text-xs text-text-secondary">
                  By <span className="text-text-primary font-semibold">{featuredPost.author}</span> · {featuredPost.date}
                </div>
                <span className="text-xs font-label-md text-primary inline-flex items-center gap-1">
                  Read Guide <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Recent Articles Grid */}
      <section className="px-margin max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-lg">
          <h2 className="text-2xl font-bold text-text-primary">All Guides ({recentPosts.length})</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {recentPosts.map((post) => (
            <TiltCard
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-col h-full rounded-2xl overflow-hidden glass-card group border border-glass-border"
            >
              <div className="relative h-48 w-full overflow-hidden bg-surface-container-high">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2 text-text-secondary font-mono text-xs">
                  <span className="text-primary font-semibold">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime || '5 min read'}</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2 leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-text-secondary text-sm line-clamp-3 mb-4 flex-grow">
                  {post.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-glass-border mt-auto text-xs text-text-secondary">
                  <span>{post.author}</span>
                  <span className="text-primary font-medium inline-flex items-center gap-1">
                    Read <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>
    </main>
  );
}
