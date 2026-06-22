import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TiltCard from '@/components/TiltCard';
import ToolCard from '@/components/ToolCard';
import HeroSearch from '@/components/HeroSearch';
import { toolsRegistry } from '@/data/toolsRegistry';
import { blogPosts } from '@/data/blogData';

export default function Home() {
  const tools = Object.values(toolsRegistry);
  
  const categoryCounts = {
    finance: tools.filter(t => t.category.toLowerCase() === 'finance').length,
    student: tools.filter(t => t.category.toLowerCase() === 'student').length,
    health: tools.filter(t => t.category.toLowerCase() === 'health').length,
    converter: tools.filter(t => t.category.toLowerCase() === 'converter').length,
    developer: tools.filter(t => t.category.toLowerCase() === 'developer').length,
    image: tools.filter(t => t.category.toLowerCase() === 'image').length,
    video: tools.filter(t => t.category.toLowerCase() === 'video').length,
    pdf: tools.filter(t => t.category.toLowerCase() === 'pdf').length,
  };

  const totalTools = tools.length;

  return (
    <main className="pt-32 pb-xxl min-h-screen">
      {/* Hero Section */}
      <section className="px-margin max-w-7xl mx-auto text-center mb-xxl animate-fade-in-up">
        <h1 className="font-headline-lg text-headline-lg md:text-display-lg font-bold text-text-primary mb-sm leading-tight">
          {totalTools === 0 ? "Precision Calculators & Tools" : `${totalTools}+ Free Calculators & Tools`}
        </h1>
        <p className="font-body-lg text-body-lg text-text-secondary mb-xl max-w-2xl mx-auto">
          Instant. No Signups. Engineered for Precision. Every tool you&apos;ll ever need, delivered in a refined glass-grade interface.
        </p>
        
        {/* Central Hero Search */}
        <HeroSearch />
      </section>

      {/* Category Grid */}
      <section className="px-margin max-w-7xl mx-auto mb-xxl">
        <div className="flex items-center justify-between mb-lg">
          <h2 className="font-headline-md text-headline-md text-text-primary">Core Categories</h2>
          <Link className="font-label-md text-label-md text-primary flex items-center gap-1 hover:underline" href="/categories">
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
          {/* Finance */}
          <TiltCard href="/category/finance" className="p-lg rounded-2xl flex flex-col items-center text-center animate-fade-in-up">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-md border border-primary/20">
              <span className="material-symbols-outlined text-primary text-3xl">payments</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-text-primary text-[20px] mb-xs">Finance</h3>
            <p className="font-label-md text-label-md text-text-secondary">{categoryCounts.finance} Live Tools</p>
          </TiltCard>

          {/* Student */}
          <TiltCard href="/category/student" className="p-lg rounded-2xl flex flex-col items-center text-center animate-fade-in-up animate-stagger-1">
            <div className="w-16 h-16 rounded-2xl bg-tertiary/10 flex items-center justify-center mb-md border border-tertiary/20">
              <span className="material-symbols-outlined text-tertiary text-3xl">school</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-text-primary text-[20px] mb-xs">Student</h3>
            <p className="font-label-md text-label-md text-text-secondary">{categoryCounts.student} Live Tools</p>
          </TiltCard>

          {/* Health */}
          <TiltCard href="/category/health" className="p-lg rounded-2xl flex flex-col items-center text-center animate-fade-in-up animate-stagger-2">
            <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-md border border-secondary/20">
              <span className="material-symbols-outlined text-secondary text-3xl">health_and_safety</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-text-primary text-[20px] mb-xs">Health</h3>
            <p className="font-label-md text-label-md text-text-secondary">{categoryCounts.health} Live Tools</p>
          </TiltCard>

          {/* Converter */}
          <TiltCard href="/category/converter" className="p-lg rounded-2xl flex flex-col items-center text-center animate-fade-in-up animate-stagger-3">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-md border border-primary/20">
              <span className="material-symbols-outlined text-primary text-3xl">sync_alt</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-text-primary text-[20px] mb-xs">Converter</h3>
            <p className="font-label-md text-label-md text-text-secondary">{categoryCounts.converter} Live Tools</p>
          </TiltCard>

          {/* Developer */}
          <TiltCard href="/category/developer" className="p-lg rounded-2xl flex flex-col items-center text-center animate-fade-in-up animate-stagger-4">
            <div className="w-16 h-16 rounded-2xl bg-secondary-fixed/10 flex items-center justify-center mb-md border border-secondary-fixed/20">
              <span className="material-symbols-outlined text-secondary-fixed text-3xl">code</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-text-primary text-[20px] mb-xs">Developer</h3>
            <p className="font-label-md text-label-md text-text-secondary">{categoryCounts.developer} Live Tools</p>
          </TiltCard>

          {/* Image */}
          <TiltCard href="/category/image" className="p-lg rounded-2xl flex flex-col items-center text-center animate-fade-in-up animate-stagger-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-md border border-blue-500/20">
              <span className="material-symbols-outlined text-blue-500 text-3xl">image</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-text-primary text-[20px] mb-xs">Image</h3>
            <p className="font-label-md text-label-md text-text-secondary">{categoryCounts.image} Live Tools</p>
          </TiltCard>

          {/* Video */}
          <TiltCard href="/category/video" className="p-lg rounded-2xl flex flex-col items-center text-center animate-fade-in-up animate-stagger-6">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-md border border-red-500/20">
              <span className="material-symbols-outlined text-red-500 text-3xl">movie</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-text-primary text-[20px] mb-xs">Video</h3>
            <p className="font-label-md text-label-md text-text-secondary">{categoryCounts.video} Live Tools</p>
          </TiltCard>

          {/* PDF */}
          <TiltCard href="/category/pdf" className="p-lg rounded-2xl flex flex-col items-center text-center animate-fade-in-up animate-stagger-7">
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-md border border-green-500/20">
              <span className="material-symbols-outlined text-green-500 text-3xl">picture_as_pdf</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-text-primary text-[20px] mb-xs">PDF</h3>
            <p className="font-label-md text-label-md text-text-secondary">{categoryCounts.pdf} Live Tools</p>
          </TiltCard>
        </div>
      </section>

      {/* Explore by Topic (Chips) */}
      <section className="px-margin max-w-7xl mx-auto mb-xxl text-center">
        <h4 className="font-label-md text-label-md text-text-secondary uppercase tracking-widest mb-lg">Trending Topics</h4>
        <div className="flex flex-wrap justify-center gap-md">
          <button className="px-lg py-2 rounded-full glass-card border border-glass-border font-label-md text-label-md text-text-primary hover:text-primary hover:border-primary">Loans</button>
          <button className="px-lg py-2 rounded-full glass-card border border-glass-border font-label-md text-label-md text-text-primary hover:text-primary hover:border-primary">Grades</button>
          <button className="px-lg py-2 rounded-full glass-card border border-glass-border font-label-md text-label-md text-text-primary hover:text-primary hover:border-primary">Tax</button>
          <button className="px-lg py-2 rounded-full glass-card border border-glass-border font-label-md text-label-md text-text-primary hover:text-primary hover:border-primary">Unit Conversion</button>
          <button className="px-lg py-2 rounded-full glass-card border border-glass-border font-label-md text-label-md text-text-primary hover:text-primary hover:border-primary">Investments</button>
          <button className="px-lg py-2 rounded-full glass-card border border-glass-border font-label-md text-label-md text-text-primary hover:text-primary hover:border-primary">Scientific</button>
        </div>
      </section>

      {/* Most Used Section */}
      <section className="px-margin max-w-7xl mx-auto mb-xxl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-lg gap-sm">
          <div>
            <h2 className="font-headline-md text-headline-md text-text-primary mb-xs">Most Popular Tools</h2>
            <p className="font-body-md text-body-md text-text-secondary">Highly-optimized calculations used by thousands daily.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {tools.slice(0, 4).map((tool, index) => (
            <ToolCard 
              key={tool.id} 
              tool={tool} 
              className={`animate-fade-in-up ${index > 0 ? `animate-stagger-${index}` : ''}`} 
            />
          ))}
        </div>
      </section>

      {/* Latest Insights (Blog) */}
      <section className="px-margin max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-lg gap-sm">
          <div>
            <h2 className="font-headline-md text-headline-md text-text-primary mb-xs">Latest Insights</h2>
            <p className="font-body-md text-body-md text-text-secondary">Expert analysis on finance, tech, and productivity.</p>
          </div>
          <Link className="font-label-md text-label-md text-primary flex items-center gap-1 hover:underline" href="/blog">
            View Blog <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {blogPosts.slice(0, 3).map((post, index) => {
            const colors = ['primary', 'secondary', 'tertiary'];
            const color = colors[index % colors.length];
            return (
              <TiltCard key={post.slug} href={`/blog/${post.slug}`} className={`p-xl rounded-2xl flex flex-col items-start justify-end min-h-[300px] relative overflow-hidden group animate-fade-in-up ${index > 0 ? `animate-stagger-${index}` : ''}`}>
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className={`absolute inset-0 bg-gradient-to-br from-${color}/30 to-background/90 mix-blend-overlay`}></div>
                  <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/90 to-${color}/20`}></div>
                </div>
                <div className="relative z-10 w-full">
                  <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-${color}/20 text-${color} rounded-full mb-3 inline-block border border-${color}/30`}>{post.category}</span>
                  <h3 className={`font-headline-md text-xl text-text-primary mb-2 group-hover:text-${color} transition-colors line-clamp-2`}>{post.title}</h3>
                  <p className="font-label-md text-xs text-text-secondary">{post.readTime} • {post.date}</p>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </section>
    </main>
  );
}
