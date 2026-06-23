import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blogData';
import { ShareButtons, FollowButton } from '@/components/blog/BlogActions';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = blogPosts.find(p => p.slug === resolvedParams.slug);
  
  if (!post) return { title: 'Post Not Found - ToolPixa' };
  
  return {
    title: `${post.title} - ToolPixa Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = blogPosts.find(p => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0d1323] overflow-x-hidden">
      {/* Scroll Indicator */}
      <div className="fixed top-[64px] md:top-[80px] left-0 h-1 bg-gradient-to-r from-primary to-secondary z-50 w-full origin-left scale-x-0 transition-transform duration-100" id="readingProgress"></div>

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        <Image 
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1323] via-[#0d1323]/60 to-[#0d1323]/20"></div>
        <div className="absolute inset-0 flex items-end px-6 md:px-16 pb-24 max-w-5xl mx-auto w-full">
          <div className="w-full space-y-6 animate-fade-in-up">
            <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors mb-4 font-label-md uppercase text-sm tracking-widest">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back to Blog
            </Link>
            <div className="flex flex-wrap gap-4">
               <div className="inline-flex px-4 py-1.5 rounded-full bg-secondary-container/30 border border-secondary/20 backdrop-blur-md">
                 <span className="text-secondary font-label-md text-sm">{post.category}</span>
               </div>
            </div>
            
            <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] text-balance">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-6">
              <div className="h-12 w-12 rounded-full border border-primary/30 overflow-hidden bg-surface-bright flex items-center justify-center text-primary font-bold text-lg shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                {post.author.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-white font-body-md font-medium">{post.author}</span>
                <span className="text-on-surface-variant text-sm flex items-center gap-2">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Container with Sidebar Layout */}
      <article className="relative z-10 px-6 md:px-0 -mt-16 pb-32 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Main Content Area */}
        <div className="w-full lg:w-2/3 xl:w-3/4 space-y-8">
          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-12 shadow-2xl">
            
            {/* Mobile Table of Contents (Visible only on small screens) */}
            <div className="block lg:hidden mb-12 p-6 rounded-xl bg-surface-container/50 border border-white/5">
               <p className="text-primary font-label-md mb-4 flex items-center gap-2 text-sm tracking-widest uppercase font-bold">
                 <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                 Table of Contents
               </p>
               <ul className="space-y-3">
                 {extractToc(post.content).map(item => (
                   <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
                     <a href={`#${item.id}`} className="text-on-surface-variant hover:text-primary transition-colors text-sm font-body-md flex items-start gap-2">
                       <span className="mt-0.5 opacity-50">•</span>
                       <span className="leading-snug">{item.title}</span>
                     </a>
                   </li>
                 ))}
               </ul>
            </div>

            {/* Article Body */}
            <div className="prose prose-invert prose-lg max-w-none 
              prose-headings:font-headline-md prose-headings:text-white prose-headings:font-semibold prose-headings:tracking-tight
              prose-h1:text-4xl prose-h1:mb-8 prose-h1:border-b prose-h1:border-white/10 prose-h1:pb-4 prose-h1:mt-12
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 scroll-mt-24
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 scroll-mt-24
              prose-p:text-on-surface-variant prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:text-white prose-blockquote:italic prose-blockquote:font-body-lg prose-blockquote:my-10
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:list-disc prose-ul:text-on-surface-variant prose-ul:ml-6 prose-ul:mb-8 prose-ul:space-y-2
              prose-ol:list-decimal prose-ol:text-on-surface-variant prose-ol:ml-6 prose-ol:mb-8 prose-ol:space-y-2
              prose-li:marker:text-primary
              prose-p:first-of-type:first-letter:text-5xl prose-p:first-of-type:first-letter:font-bold prose-p:first-of-type:first-letter:mr-3 prose-p:first-of-type:first-letter:float-left prose-p:first-of-type:first-letter:text-primary prose-p:first-of-type:first-letter:mt-1
            ">
              <div dangerouslySetInnerHTML={{ __html: formatMarkdown(post.content) }} />
            </div>

            {/* Social Share */}
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="text-sm font-label-md text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
                  <span className="w-8 h-px bg-primary/50"></span> Share this post
                </span>
                <ShareButtons title={post.title} />
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[12px] text-primary tracking-wider uppercase font-bold shadow-[0_0_15px_rgba(var(--color-primary),0.2)]">#{post.category.replace(/\s+/g, '')}</span>
                <span className="px-4 py-1.5 rounded-full bg-surface-variant/50 border border-white/5 text-[12px] text-on-surface-variant tracking-wider uppercase hover:bg-white/10 transition-colors cursor-pointer">#Guide</span>
              </div>
            </div>
          </div>

          {/* Author Bio Section */}
          <div className="mt-12 relative group">
            {/* Glowing ambient background effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            
            <div className="relative bg-surface/80 backdrop-blur-xl rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 border border-white/10 shadow-2xl overflow-hidden">
              {/* Decorative shapes */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[40px] rounded-full pointer-events-none -mt-10 -mr-10"></div>
              <div className="absolute bottom-0 left-10 w-24 h-24 bg-secondary/10 blur-[30px] rounded-full pointer-events-none -mb-10"></div>
              
              {/* Author Avatar with pulsing rings */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20"></div>
                <div className="h-20 w-20 relative z-10 rounded-full border-2 border-primary bg-surface-container flex items-center justify-center text-primary font-display-md text-3xl shadow-[0_0_20px_rgba(var(--color-primary),0.3)]">
                  {post.author.charAt(0)}
                </div>
              </div>
              
              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-white font-headline-md text-xl font-bold tracking-wide">{post.author}</h2>
                  <span className="material-symbols-outlined text-primary text-[18px]" title="Verified Editorial Team">verified</span>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-5 max-w-2xl font-body-md">
                  Editorial team at <span className="text-white font-medium">ToolPixa</span>. We write about finance, calculators, and beautifully designed tools to help you make better financial decisions.
                </p>
                <FollowButton authorName={post.author} />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Sticky Sidebar */}
        <aside className="hidden lg:block w-1/3 xl:w-1/4 sticky top-24">
          <div className="p-6 rounded-2xl bg-surface-container/30 border border-white/5 shadow-2xl backdrop-blur-md">
             <p className="text-primary font-label-md mb-6 flex items-center gap-2 text-sm tracking-widest uppercase border-b border-white/10 pb-4 font-bold">
               <span className="material-symbols-outlined text-[18px]">menu_book</span>
               In This Article
             </p>
             <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
               {extractToc(post.content).map(item => (
                 <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
                   <a href={`#${item.id}`} className="text-on-surface-variant hover:text-primary transition-colors text-sm font-body-md flex items-start gap-3 group">
                     <span className="mt-1 opacity-40 group-hover:opacity-100 transition-opacity text-[10px]">■</span>
                     <span className="leading-snug">{item.title}</span>
                   </a>
                 </li>
               ))}
             </ul>
             
             {/* Read Time widget */}
             <div className="mt-8 pt-6 border-t border-white/10">
               <div className="flex items-center gap-3 text-on-surface-variant">
                 <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                 <div>
                   <div className="text-xs font-bold uppercase tracking-widest mb-0.5">Read Time</div>
                   <div className="text-sm">{post.readTime}</div>
                 </div>
               </div>
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
                const scrolled = (winScroll / height);
                el.style.transform = \`scaleX(\${scrolled})\`;
              }
            });
          }
        `}
      </Script>
    </main>
  );
}

// Very basic markdown formatter for mock data
function formatMarkdown(content: string) {
  let pCount = 0;
  
  const getAdTemplate = (index: number) => {
    const adTypes = [
      // 1. Internal Tool Ad
      `<div class="my-16 p-8 glass-card border border-primary/20 dark:border-primary/30 rounded-2xl bg-gradient-to-r from-primary/5 to-transparent dark:from-primary/10 flex flex-col sm:flex-row items-center gap-6 justify-between not-prose shadow-sm hover:shadow-md transition-shadow">
         <div>
           <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2"><span class="material-symbols-outlined text-primary">calculate</span> Need Exact Numbers?</h4>
           <p class="text-gray-600 dark:text-gray-300 text-sm">Use our Free Advanced Calculators to get precision results instantly.</p>
         </div>
         <a href="/categories" class="shrink-0 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg">Explore Tools</a>
       </div>`,
      // 2. Amazon Ad
      `<div class="my-16 p-8 glass-card border border-orange-500/20 dark:border-orange-500/30 rounded-2xl bg-gradient-to-r from-orange-500/5 to-transparent dark:from-orange-500/10 flex flex-col sm:flex-row items-center gap-6 justify-between not-prose shadow-sm hover:shadow-md transition-shadow">
         <div>
           <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2"><span class="material-symbols-outlined text-orange-500 dark:text-orange-400">shopping_bag</span> Recommended Reading</h4>
           <p class="text-gray-600 dark:text-gray-300 text-sm">Discover top-rated personal finance and educational books on Amazon.</p>
         </div>
         <a href="https://www.amazon.in/s?k=personal+finance+books&tag=toolpixa-21" target="_blank" rel="sponsored noopener" class="amazon-affiliate-link shrink-0 px-8 py-3 bg-gradient-to-r from-[#FF9900] to-[#FFB84D] text-black font-bold rounded-lg hover:scale-105 transition-transform flex items-center gap-2 shadow-md hover:shadow-lg">Shop Amazon <span class="material-symbols-outlined text-sm">open_in_new</span></a>
       </div>`,
      // 3. Groww External Ad
      `<div class="my-16 p-8 glass-card border border-green-500/20 dark:border-green-500/30 rounded-2xl bg-gradient-to-r from-green-500/5 to-transparent dark:from-green-500/10 flex flex-col sm:flex-row items-center gap-6 justify-between not-prose shadow-sm hover:shadow-md transition-shadow">
         <div>
           <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2"><span class="material-symbols-outlined text-green-600 dark:text-green-400">monitoring</span> Ready to Invest?</h4>
           <p class="text-gray-600 dark:text-gray-300 text-sm">Open a free Demat account with Groww and start building your wealth today.</p>
         </div>
         <a href="https://app.groww.in/v3cO/edi2uad9" target="_blank" rel="sponsored noopener" class="shrink-0 px-8 py-3 bg-[#00d09c] text-white font-bold rounded-lg hover:bg-[#00b386] transition-colors flex items-center gap-2 shadow-md hover:shadow-lg">Visit Groww <span class="material-symbols-outlined text-sm">open_in_new</span></a>
       </div>`,
      // 4. ClearTax External Ad
      `<div class="my-16 p-8 glass-card border border-blue-500/20 dark:border-blue-500/30 rounded-2xl bg-gradient-to-r from-blue-500/5 to-transparent dark:from-blue-500/10 flex flex-col sm:flex-row items-center gap-6 justify-between not-prose shadow-sm hover:shadow-md transition-shadow">
         <div>
           <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2"><span class="material-symbols-outlined text-blue-600 dark:text-blue-400">receipt_long</span> Tax Season Coming Up?</h4>
           <p class="text-gray-600 dark:text-gray-300 text-sm">File your ITR in minutes with ClearTax, India's most trusted tax filing platform.</p>
         </div>
         <a href="https://cleartax.in" target="_blank" rel="sponsored noopener" class="shrink-0 px-8 py-3 bg-[#1B57F0] text-white font-bold rounded-lg hover:bg-[#123EB5] transition-colors flex items-center gap-2 shadow-md hover:shadow-lg">File Taxes <span class="material-symbols-outlined text-sm">open_in_new</span></a>
       </div>`
    ];
    return adTypes[index % adTypes.length];
  };

  return content
    .split('\n\n')
    .map(paragraph => {
      const p = paragraph.trim();
      if (!p) return '';
      
      const parseInline = (text: string) => {
        return text
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/\`(.*?)\`/g, '<code class="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-surface-container text-primary font-code-sm border border-gray-200 dark:border-white/5">$1</code>')
          .replace(/\[(.*?)\]\((.*?)\)/g, (match, linkText, url) => {
            const isInternal = url.startsWith('/') || url.includes('toolpixa.space');
            if (isInternal) {
              return `<a href="${url}" class="text-primary hover:underline font-semibold">${linkText}</a>`;
            }
            return `<a href="${url}" target="_blank" rel="sponsored noopener" class="text-primary hover:underline font-semibold">${linkText}</a>`;
          });
      };

      if (p.startsWith('# ')) {
        const id = p.substring(2).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `<h1 id="${id}" class="text-gray-900 dark:text-white">${parseInline(p.substring(2))}</h1>`;
      } else if (p.startsWith('## ')) {
        const id = p.substring(3).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `<h2 id="${id}" class="text-gray-900 dark:text-white">${parseInline(p.substring(3))}</h2>`;
      } else if (p.startsWith('### ')) {
        const id = p.substring(4).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return `<h3 id="${id}" class="text-gray-900 dark:text-white">${parseInline(p.substring(4))}</h3>`;
      } else if (p.startsWith('> ')) {
        return `<blockquote class="text-gray-700 dark:text-gray-300 border-l-4 border-primary/50 bg-primary/5 p-4 rounded-r-lg">${parseInline(p.substring(2))}</blockquote>`;
      } else if (p.startsWith('- ')) {
        const items = p.split('\n').map(item => `<li class="text-gray-700 dark:text-gray-300">${parseInline(item.substring(2))}</li>`).join('');
        return `<ul class="list-disc pl-6 space-y-2 my-6">${items}</ul>`;
      } else if (p.match(/^\d+\.\s/)) {
        const items = p.split('\n').map(item => {
          const content = item.replace(/^\d+\.\s/, '');
          return `<li class="text-gray-700 dark:text-gray-300">${parseInline(content)}</li>`;
        }).join('');
        return `<ol class="list-decimal pl-6 space-y-2 my-6">${items}</ol>`;
      } else if (p.startsWith('![')) {
        const altMatch = p.match(/!\[(.*?)\]/);
        const urlMatch = p.match(/\((.*?)\)/);
        if (altMatch && urlMatch) {
          const alt = altMatch[1];
          const url = urlMatch[1];
          return `<figure class="my-12 relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-primary/30 dark:to-secondary/30 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div class="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg dark:shadow-2xl bg-gray-50 dark:bg-surface-container/50">
              <img src="${url}" alt="${alt}" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
            </div>
            ${alt ? `<figcaption class="mt-4 text-center text-xs font-label-md text-gray-500 dark:text-on-surface-variant/70 uppercase tracking-widest">${alt}</figcaption>` : ''}
          </figure>`;
        }
        return `<p class="text-gray-700 dark:text-gray-300 leading-relaxed">${parseInline(p)}</p>`;
      } else if (p.startsWith('|')) {
        // Advanced beautiful table support
        const lines = p.split('\n');
        if (lines.length > 2 && lines[1].includes('|---')) {
          const headers = lines[0].split('|').filter(h => h.trim() !== '').map(h => `<th class="px-6 py-4 font-bold">${h.trim()}</th>`).join('');
          const rows = lines.slice(2).map(line => {
            const cells = line.split('|').filter(c => c.trim() !== '' || c === ' ').map(c => `<td class="px-6 py-4">${c.trim()}</td>`).join('');
            return `<tr class="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">${cells}</tr>`;
          }).join('');
          return `<div class="overflow-x-auto my-12 bg-white dark:bg-white/[0.02] backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-lg dark:shadow-2xl relative overflow-hidden">
            <table class="w-full text-left border-collapse relative z-10">
              <thead class="bg-gray-50 dark:bg-surface-container/40 border-b border-gray-200 dark:border-white/10 text-primary font-label-md text-xs uppercase tracking-widest">
                <tr>${headers}</tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-white/5 text-gray-700 dark:text-on-surface-variant font-body-md">
                ${rows}
              </tbody>
            </table>
          </div>`;
        }
        return `<p class="text-gray-700 dark:text-gray-300 leading-relaxed">${parseInline(p)}</p>`;
      } else {
        // Parse basic inline styles and INJECT AD BANNERS
        let parsedP = parseInline(p);
        let html = `<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">${parsedP}</p>`;
        
        // Only count basic paragraphs for ad injection (skip headers/images/tables)
        pCount++;
        
        // Space out ads: Inject every 6 paragraphs instead of 3
        if (pCount > 0 && pCount % 10 === 0) {
          html += getAdTemplate(Math.floor(pCount / 10) - 1);
        }
        return html;
      }
    })
    .join('\n');
}

function extractToc(content: string) {
  const lines = content.split('\n');
  const toc: { id: string, title: string, level: number }[] = [];
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
