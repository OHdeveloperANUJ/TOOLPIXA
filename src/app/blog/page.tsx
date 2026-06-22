import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TiltCard from '@/components/TiltCard';
import { blogPosts } from '@/data/blogData';

export const metadata = {
  title: 'Blog - ToolPixa',
  description: 'Insights, guides, and news on finance, tech, and modern design.',
};

export default function BlogHome() {
  const featuredPost = blogPosts.find(post => post.isFeatured) || blogPosts[0];
  const recentPosts = blogPosts.filter(post => post.slug !== featuredPost.slug);

  return (
    <main className="pt-32 pb-xxl min-h-screen">
      
      {/* Page Header */}
      <section className="px-margin max-w-7xl mx-auto text-center mb-xl animate-fade-in-up">
        <h1 className="font-display-lg text-4xl md:text-5xl font-bold text-text-primary mb-sm tracking-tight">
          ToolPixa <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Insights</span>
        </h1>
        <p className="font-body-lg text-body-lg text-text-secondary max-w-2xl mx-auto">
          The latest thoughts on finance, design, and productivity from our experts.
        </p>
      </section>

      {/* Featured Article Hero */}
      <section className="px-margin max-w-7xl mx-auto mb-xxl animate-fade-in-up animate-stagger-1">
        <Link href={`/blog/${featuredPost.slug}`} className="block relative group overflow-hidden rounded-3xl border border-glass-border">
          <div className="absolute inset-0 z-0">
            <Image 
              src={featuredPost.imageUrl} 
              alt={featuredPost.title}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          </div>
          
          <div className="relative z-10 p-8 md:p-16 flex flex-col justify-end min-h-[500px]">
            <div className="glass-card max-w-2xl p-6 md:p-8 rounded-2xl border-l-4 border-l-primary group-hover:border-l-secondary transition-colors duration-500">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-primary/20 text-primary rounded-full">
                  Featured
                </span>
                <span className="text-text-secondary font-label-md text-sm">{featuredPost.readTime || '8 min read'}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight group-hover:text-primary transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-text-secondary font-body-md mb-6 line-clamp-2">
                {featuredPost.description}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-bright flex items-center justify-center text-primary font-bold">
                  {featuredPost.author.charAt(0)}
                </div>
                <div>
                  <div className="text-text-primary font-bold text-sm">{featuredPost.author}</div>
                  <div className="text-text-secondary text-xs">{featuredPost.date}</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Recent Articles Grid */}
      <section className="px-margin max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-lg">
          <h3 className="text-2xl font-bold text-text-primary">Recent Articles</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {recentPosts.map((post, index) => (
            <TiltCard 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`flex flex-col h-full rounded-2xl overflow-hidden glass-card group animate-fade-in-up animate-stagger-${(index % 4) + 1}`}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image 
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest bg-surface-dim/80 backdrop-blur-md text-text-primary rounded-full border border-glass-border">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3 text-text-secondary font-label-md text-xs">
                  <span>{post.date}</span>
                  <span>{post.readTime || '5 min read'}</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3 leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-text-secondary font-body-sm line-clamp-3 mb-4 flex-grow">
                  {post.description}
                </p>
                
                <div className="flex items-center gap-2 mt-auto">
                  <div className="w-8 h-8 rounded-full bg-surface-bright flex items-center justify-center text-primary font-bold text-xs">
                    {post.author.charAt(0)}
                  </div>
                  <span className="text-text-primary text-sm font-medium">{post.author}</span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

    </main>
  );
}
