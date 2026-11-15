'use client';

import { useEffect, useState } from 'react';

// Maps Timezone Region / Locale to Amazon TLD without third-party IP tracking calls
function detectAmazonDomain(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Calcutta') || tz.includes('Kolkata') || tz.includes('Asia/Colombo')) {
      return 'amazon.in';
    }
    if (tz.includes('Europe/London')) return 'amazon.co.uk';
    if (tz.includes('Europe/Berlin')) return 'amazon.de';
    if (tz.includes('Europe/Paris')) return 'amazon.fr';
    if (tz.includes('Europe/Rome')) return 'amazon.it';
    if (tz.includes('Europe/Madrid')) return 'amazon.es';
    if (tz.includes('Australia/')) return 'amazon.com.au';
    if (tz.includes('America/Toronto') || tz.includes('America/Vancouver')) return 'amazon.ca';
    if (tz.includes('Asia/Tokyo')) return 'amazon.co.jp';
  } catch {
    // Fallback to amazon.in as primary store
  }
  return 'amazon.in';
}

export default function AmazonGlobalRouter() {
  const [domain, setDomain] = useState<string | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem('toolpixa_amazon_domain');
    if (cached) {
      setDomain(cached);
      return;
    }
    const targetDomain = detectAmazonDomain();
    localStorage.setItem('toolpixa_amazon_domain', targetDomain);
    setDomain(targetDomain);
  }, []);

  useEffect(() => {
    if (!domain) return;

    const updateLinks = () => {
      const links = document.querySelectorAll('.amazon-affiliate-link');
      links.forEach((link) => {
        const a = link as HTMLAnchorElement;
        if (a.dataset.routed) return;

        const href = a.getAttribute('href');
        if (href && href.includes('amazon.in')) {
          a.setAttribute('href', href.replace('amazon.in', domain));
          a.dataset.routed = 'true';
        }
      });
    };

    updateLinks();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) updateLinks();
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [domain]);

  return null;
}
