'use client';

import { useEffect, useState } from 'react';

// Maps ISO Country Code to Amazon TLD
const AMAZON_DOMAINS: Record<string, string> = {
  IN: 'amazon.in',
  US: 'amazon.com',
  GB: 'amazon.co.uk',
  CA: 'amazon.ca',
  AU: 'amazon.com.au',
  DE: 'amazon.de',
  FR: 'amazon.fr',
  IT: 'amazon.it',
  ES: 'amazon.es',
  JP: 'amazon.co.jp',
  BR: 'amazon.com.br',
  MX: 'amazon.com.mx'
};

export default function AmazonGlobalRouter() {
  const [domain, setDomain] = useState<string | null>(null);

  useEffect(() => {
    async function determineRegion() {
      // Check cache first
      const cached = localStorage.getItem('toolpixa_amazon_domain');
      if (cached) {
        setDomain(cached);
        return;
      }

      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        const countryCode = data.country_code || 'US';
        const targetDomain = AMAZON_DOMAINS[countryCode] || 'amazon.com';
        
        localStorage.setItem('toolpixa_amazon_domain', targetDomain);
        setDomain(targetDomain);
      } catch (error) {
        // Fallback to .com on error
        const targetDomain = 'amazon.com';
        localStorage.setItem('toolpixa_amazon_domain', targetDomain);
        setDomain(targetDomain);
      }
    }

    determineRegion();
  }, []);

  useEffect(() => {
    if (!domain) return;

    const updateLinks = () => {
      const links = document.querySelectorAll('.amazon-affiliate-link');
      links.forEach((link) => {
        const a = link as HTMLAnchorElement;
        if (a.dataset.routed) return; // Skip if already routed
        
        const href = a.getAttribute('href');
        if (href && href.includes('amazon.in')) {
          a.setAttribute('href', href.replace('amazon.in', domain));
          a.dataset.routed = 'true';
        }
      });
    };

    // Initial pass
    updateLinks();

    // Observe DOM for newly injected ads (like in blogs)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) updateLinks();
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [domain]);

  return null; // This is a logic-only component
}
