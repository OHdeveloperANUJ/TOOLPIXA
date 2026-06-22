import React from 'react';
import Link from 'next/link';
import tags from '../../../tags.json';

export default function HTMLSitemap() {
  const categories = ['finance', 'student', 'health', 'converter', 'developer'];
  
  // Extract tools from tags
  const toolsByTag = tags as Record<string, string[]>;

  return (
    <main className="pt-32 pb-xxl px-margin max-w-4xl mx-auto min-h-screen">
      <nav className="font-label-md text-label-md text-text-secondary mb-lg flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="text-glass-border">/</span>
        <span className="text-text-primary">Sitemap</span>
      </nav>

      <header className="mb-xl animate-fade-in-up">
        <h1 className="font-headline-lg text-[48px] font-bold text-text-primary mb-sm leading-tight">
          Sitemap
        </h1>
        <p className="font-body-lg text-body-lg text-text-secondary">
          A complete overview of ToolPixa.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-xl animate-fade-in-up delay-100">
        {/* Left Column: Core & Categories */}
        <div className="space-y-xl">
          <section className="glass-card p-xl rounded-2xl border border-glass-border">
            <h2 className="font-headline-md text-[24px] text-text-primary mb-md border-b border-glass-border pb-2">Core Pages</h2>
            <ul className="space-y-sm font-body-md text-text-secondary">
              <li><Link href="/" className="hover:text-primary transition-colors">Homepage</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
            </ul>
          </section>

          <section className="glass-card p-xl rounded-2xl border border-glass-border">
            <h2 className="font-headline-md text-[24px] text-text-primary mb-md border-b border-glass-border pb-2">Categories</h2>
            <ul className="space-y-sm font-body-md text-text-secondary">
              {categories.map(cat => (
                <li key={cat} className="capitalize">
                  <Link href={`/category/${cat}`} className="hover:text-primary transition-colors">{cat} Tools</Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column: Tools organized by Tags */}
        <div className="space-y-xl">
          <section className="glass-card p-xl rounded-2xl border border-glass-border">
            <h2 className="font-headline-md text-[24px] text-text-primary mb-md border-b border-glass-border pb-2">Tools Directory</h2>
            
            {Object.keys(toolsByTag).length === 0 ? (
               <p className="font-body-md text-text-secondary">Tools are currently being built...</p>
            ) : (
              <div className="space-y-lg">
                {Object.entries(toolsByTag).map(([tag, tools]) => (
                  <div key={tag}>
                    <h3 className="font-label-md text-primary uppercase tracking-wider mb-sm">{tag.replace('-', ' ')}</h3>
                    {tools.length === 0 ? (
                      <p className="font-body-sm text-text-secondary italic">No tools yet.</p>
                    ) : (
                      <ul className="space-y-xs font-body-md text-text-secondary pl-4 border-l border-glass-border">
                        {tools.map(tool => (
                          <li key={tool}>
                            <Link href={`/tools/${tool}`} className="hover:text-primary transition-colors">
                              {tool.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
