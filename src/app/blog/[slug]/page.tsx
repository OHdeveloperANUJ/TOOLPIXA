import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blogData';
import { ShareButtons, FollowButton } from '@/components/blog/BlogActions';

const BASE_URL = 'https://toolpixa.space';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) return { title: 'Post Not Found' };

  const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl },
        ],
      },
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: post.imageUrl.startsWith('http') ? post.imageUrl : `${BASE_URL}${post.imageUrl}`,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          '@type': 'Organization',
          name: post.author,
          url: BASE_URL,
        },
        publisher: {
          '@type': 'Organization',
          name: 'ToolPixa',
          logo: {
            '@type': 'ImageObject',
            url: `${BASE_URL}/logo.png`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Scroll Indicator */}
      <div
        className="fixed top-[64px] left-0 h-1 bg-gradient-to-r from-primary to-secondary z-50 w-full origin-left scale-x-0 transition-transform duration-100"
        id="readingProgress"
      ></div>

      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[420px] w-full overflow-hidden bg-slate-900">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          referrerPolicy="no-referrer"
          className="object-cover opacity-65"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30"></div>
        <div className="absolute inset-0 flex items-end px-6 md:px-16 pb-16 max-w-6xl mx-auto w-full">
          <div className="w-full space-y-4 animate-fade-in-up">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-white transition-colors font-label-md uppercase text-xs tracking-widest"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to Guides
            </Link>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <span className="text-blue-400 font-semibold uppercase">{post.category}</span>
              <span aria-hidden="true">·</span>
              <span>{post.date}</span>
              <span aria-hidden="true">·</span>
              <span>{post.readTime || '6 min read'}</span>
            </div>

            <h1 className="font-display-lg text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight text-balance max-w-4xl">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Container with Sidebar Layout */}
      <article className="relative z-10 px-6 md:px-8 pt-10 pb-24 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        {/* Main Content Area */}
        <div className="w-full lg:w-2/3 xl:w-3/4 space-y-8">
          <div className="glass-card border border-glass-border rounded-2xl p-6 md:p-12 shadow-xl">
            {/* Mobile Table of Contents */}
            <div className="block lg:hidden mb-10 p-5 rounded-xl bg-surface-container border border-glass-border">
              <p className="text-primary font-label-md mb-3 flex items-center gap-2 text-xs tracking-widest uppercase font-bold">
                <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                Table of Contents
              </p>
              <ul className="space-y-2">
                {extractToc(post.content).map((item) => (
                  <li key={item.id} className={item.level === 3 ? 'ml-4' : ''}>
                    <a
                      href={`#${item.id}`}
                      className="text-text-secondary hover:text-primary transition-colors text-sm font-body-md flex items-start gap-2"
                    >
                      <span className="mt-0.5 opacity-50">·</span>
                      <span className="leading-snug">{item.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Body */}
            <div
              className="prose dark:prose-invert prose-lg max-w-none
              prose-headings:font-headline-md prose-headings:text-text-primary prose-headings:font-bold prose-headings:tracking-tight
              prose-h1:text-3xl prose-h1:mb-6 prose-h1:border-b prose-h1:border-glass-border prose-h1:pb-4 prose-h1:mt-10
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 scroll-mt-24
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 scroll-mt-24
              prose-p:text-text-secondary prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-2 prose-blockquote:border-primary prose-blockquote:bg-surface-container prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:text-text-primary prose-blockquote:italic prose-blockquote:my-8
              prose-strong:text-text-primary prose-strong:font-semibold
              prose-ul:list-disc prose-ul:text-text-secondary prose-ul:ml-6 prose-ul:mb-6 prose-ul:space-y-2
              prose-ol:list-decimal prose-ol:text-text-secondary prose-ol:ml-6 prose-ol:mb-6 prose-ol:space-y-2
              prose-li:marker:text-primary"
            >
              <div dangerouslySetInnerHTML={{ __html: formatMarkdown(post.content) }} />
            </div>

            {/* Social Share */}
            <div className="mt-12 pt-6 border-t border-glass-border flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-label-md text-text-secondary uppercase tracking-widest">
                  Share this guide
                </span>
                <ShareButtons title={post.title} />
              </div>
              <div className="flex items-center gap-2 text-xs text-text-secondary font-mono">
                <span>Topic: {post.category}</span>
                <span>·</span>
                <Link href="/categories" className="text-primary hover:underline">
                  Explore Calculators
                </Link>
              </div>
            </div>
          </div>

          {/* Author Bio Section */}
          <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 border border-glass-border">
            <div className="h-16 w-16 shrink-0 rounded-full border border-primary/40 bg-surface-container flex items-center justify-center text-primary font-bold text-2xl">
              {post.author.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-text-primary font-headline-md text-lg font-bold">{post.author}</h2>
                <span className="material-symbols-outlined text-primary text-[18px]" title="Verified Editorial Team">
                  verified
                </span>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed mb-4 max-w-2xl">
                Editorial &amp; financial research team at <strong className="text-text-primary">ToolPixa</strong>. We build deterministic calculators and practical guides to help you make informed financial, academic, and health decisions.
              </p>
              <FollowButton authorName={post.author} />
            </div>
          </div>
        </div>

        {/* Desktop Sticky Sidebar */}
        <aside className="hidden lg:block w-1/3 xl:w-1/4 sticky top-24 space-y-6">
          <div className="p-6 rounded-2xl glass-card border border-glass-border">
            <p className="text-primary font-label-md mb-4 flex items-center gap-2 text-xs tracking-widest uppercase border-b border-glass-border pb-3 font-bold">
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
              In This Guide
            </p>
            <ul className="space-y-3 max-h-[55vh] overflow-y-auto pr-2">
              {extractToc(post.content).map((item) => (
                <li key={item.id} className={item.level === 3 ? 'ml-4' : ''}>
                  <a
                    href={`#${item.id}`}
                    className="text-text-secondary hover:text-primary transition-colors text-sm flex items-start gap-2"
                  >
                    <span className="mt-1 opacity-40 text-xs">·</span>
                    <span className="leading-snug">{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-glass-border space-y-3">
            <p className="text-xs font-label-md uppercase tracking-wider text-primary font-bold">
              Try Our Calculators
            </p>
            <p className="text-xs text-text-secondary leading-relaxed">
              Run your own numbers instantly using our client-side tools:
            </p>
            <div className="space-y-2 pt-1 text-sm">
              <Link href="/tools/sip-calculator" className="block text-text-primary hover:text-primary transition-colors font-medium">
                → SIP Wealth Calculator
              </Link>
              <Link href="/tools/home-loan-emi-calculator" className="block text-text-primary hover:text-primary transition-colors font-medium">
                → Home Loan EMI &amp; Prepayment
              </Link>
              <Link href="/tools/income-tax-calculator" className="block text-text-primary hover:text-primary transition-colors font-medium">
                → Income Tax Calculator
              </Link>
              <Link href="/tools/ppf-calculator" className="block text-text-primary hover:text-primary transition-colors font-medium">
                → PPF Maturity Calculator
              </Link>
            </div>
          </div>
        </aside>
      </article>

      <Script id="reading-progress-script">
        {`
          if (typeof window !== 'undefined') {
            window.addEventListener('scroll', () => {
              const el = document.getElementById('readingProgress');
              if (el) {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = height > 0 ? (winScroll / height) : 0;
                el.style.transform = \`scaleX(\${scrolled})\`;
              }
            });
          }
        `}
      </Script>
    </main>
  );
}

function formatMarkdown(content: string) {
  let pCount = 0;

  const getAdTemplate = (index: number) => {
    const adTypes = [
      `<div class="my-10 p-6 glass-card border border-glass-border rounded-2xl flex flex-col sm:flex-row items-center gap-6 justify-between not-prose">
         <div>
           <h4 class="text-lg font-bold text-text-primary mb-1 flex items-center gap-2"><span class="material-symbols-outlined text-primary">calculate</span> Run Your Own Numbers Instantly</h4>
           <p class="text-text-secondary text-sm">Use our 115+ free online calculators for instant, private projections.</p>
         </div>
         <a href="/categories" class="shrink-0 px-6 py-2.5 bg-primary text-on-primary font-bold rounded-xl hover:opacity-90 transition-opacity text-sm">Explore Calculators</a>
       </div>`,
      `<div class="my-10 p-6 glass-card border border-glass-border rounded-2xl flex flex-col sm:flex-row items-center gap-6 justify-between not-prose">
         <div>
           <h4 class="text-lg font-bold text-text-primary mb-1 flex items-center gap-2"><span class="material-symbols-outlined text-orange-500">shopping_bag</span> Recommended Financial &amp; Study Essentials</h4>
           <p class="text-text-secondary text-sm">Discover top-rated personal finance books and productivity gear on Amazon.</p>
         </div>
         <a href="https://www.amazon.in/s?k=personal+finance+books&tag=toolpixa-21" target="_blank" rel="sponsored noopener noreferrer" class="amazon-affiliate-link shrink-0 px-6 py-2.5 bg-[#FF9900] text-slate-950 font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 text-sm">Shop on Amazon <span class="material-symbols-outlined text-sm">open_in_new</span></a>
       </div>`,
    ];
    return adTypes[index % adTypes.length];
  };

  return content
    .split('\n\n')
    .map((paragraph) => {
      const p = paragraph.trim();
      if (!p) return '';

      const parseInline = (text: string) => {
        return text
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(
            /\`(.*?)\`/g,
            '<code class="px-1.5 py-0.5 rounded-md bg-surface-container text-primary font-code-sm border border-glass-border">$1</code>'
          )
          .replace(/\[(.*?)\]\((.*?)\)/g, (_match, linkText, url) => {
            const isInternal = url.startsWith('/') || url.includes('toolpixa.space');
            if (isInternal) {
              const cleanUrl = url.replace('https://toolpixa.space', '');
              return `<a href="${cleanUrl || '/'}" class="text-primary hover:underline font-semibold">${linkText}</a>`;
            }
            const isAmazon = url.includes('amazon.');
            return `<a href="${url}" target="_blank" rel="sponsored noopener noreferrer" class="${isAmazon ? 'amazon-affiliate-link ' : ''}text-primary hover:underline font-semibold">${linkText}</a>`;
          });
      };

      if (p.startsWith('# ')) {
        const id = p.substring(2).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `<h2 id="${id}">${parseInline(p.substring(2))}</h2>`;
      } else if (p.startsWith('## ')) {
        const id = p.substring(3).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `<h2 id="${id}">${parseInline(p.substring(3))}</h2>`;
      } else if (p.startsWith('### ')) {
        const id = p.substring(4).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `<h3 id="${id}">${parseInline(p.substring(4))}</h3>`;
      } else if (p.startsWith('> ')) {
        return `<blockquote>${parseInline(p.substring(2))}</blockquote>`;
      } else if (p.startsWith('- ')) {
        const items = p
          .split('\n')
          .map((item) => `<li>${parseInline(item.substring(2))}</li>`)
          .join('');
        return `<ul>${items}</ul>`;
      } else if (p.match(/^\d+\.\s/)) {
        const items = p
          .split('\n')
          .map((item) => {
            const itemText = item.replace(/^\d+\.\s/, '');
            return `<li>${parseInline(itemText)}</li>`;
          })
          .join('');
        return `<ol>${items}</ol>`;
      } else if (p.startsWith('![')) {
        const altMatch = p.match(/!\[(.*?)\]/);
        const urlMatch = p.match(/\((.*?)\)/);
        if (altMatch && urlMatch) {
          const alt = altMatch[1];
          const url = urlMatch[1];
          return `<figure class="my-8">
            <div class="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-glass-border bg-surface-container">
              <img src="${url}" alt="${alt}" referrerpolicy="no-referrer" loading="lazy" class="w-full h-full object-cover" />
            </div>
            ${alt ? `<figcaption class="mt-2 text-center text-xs font-mono text-text-secondary">${alt}</figcaption>` : ''}
          </figure>`;
        }
        return `<p>${parseInline(p)}</p>`;
      } else if (p.startsWith('|')) {
        const lines = p.split('\n');
        if (lines.length > 2 && lines[1].includes('|---')) {
          const headers = lines[0]
            .split('|')
            .filter((h) => h.trim() !== '')
            .map((h) => `<th class="px-4 py-3 font-bold text-text-primary">${parseInline(h.trim())}</th>`)
            .join('');
          const rows = lines
            .slice(2)
            .map((line) => {
              const cells = line
                .split('|')
                .filter((c) => c.trim() !== '' || c === ' ')
                .map((c) => `<td class="px-4 py-3 tabular-nums">${parseInline(c.trim())}</td>`)
                .join('');
              return `<tr class="border-t border-glass-border">${cells}</tr>`;
            })
            .join('');
          return `<div class="overflow-x-auto my-8 rounded-xl border border-glass-border bg-surface-container not-prose">
            <table class="w-full text-left border-collapse text-sm">
              <thead class="bg-surface-container-high border-b border-glass-border text-xs uppercase font-mono">
                <tr>${headers}</tr>
              </thead>
              <tbody class="text-text-secondary">
                ${rows}
              </tbody>
            </table>
          </div>`;
        }
        return `<p>${parseInline(p)}</p>`;
      } else {
        const parsedP = parseInline(p);
        let html = `<p>${parsedP}</p>`;
        pCount++;
        if (pCount > 0 && pCount % 8 === 0) {
          html += getAdTemplate(Math.floor(pCount / 8) - 1);
        }
        return html;
      }
    })
    .join('\n');
}

function extractToc(content: string) {
  const lines = content.split('\n');
  const toc: { id: string; title: string; level: number }[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      const title = trimmed.substring(3);
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      toc.push({ id, title, level: 2 });
    } else if (trimmed.startsWith('### ')) {
      const title = trimmed.substring(4);
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      toc.push({ id, title, level: 3 });
    }
  }
  return toc;
}
