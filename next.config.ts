import type { NextConfig } from "next";
import fs from 'fs';
import path from 'path';

const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin'
  }
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    const redirectsList = [
      { source: '/tools/:slug.html', destination: '/tools/:slug', permanent: true },
      { source: '/category/:slug.html', destination: '/category/:slug', permanent: true },
      { source: '/blog/:slug.html', destination: '/blog/:slug', permanent: true },
      { source: '/compare/:slug.html', destination: '/compare/:slug', permanent: true },
      { source: '/tag/:slug.html', destination: '/tag/:slug', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/terms.html', destination: '/terms', permanent: true },
      { source: '/disclaimer.html', destination: '/disclaimer', permanent: true },
      { source: '/categories.html', destination: '/categories', permanent: true },
      { source: '/profile.html', destination: '/profile', permanent: true },
      { source: '/sitemap.html', destination: '/sitemap', permanent: true },
    ];

    try {
      const registryPath = path.join(process.cwd(), 'src/data/toolsRegistry.ts');
      if (fs.existsSync(registryPath)) {
        const content = fs.readFileSync(registryPath, 'utf8');
        const matches = content.match(/^\s+['"]([a-z0-9-]+)['"]:\s*\{/gm);
        if (matches) {
          const slugs = matches.map(m => m.replace(/^\s+['"]|['"]:\s*\{/g, ''));
          for (const slug of slugs) {
            const underscoreSlug = slug.replace(/-/g, '_');
            if (underscoreSlug !== slug) {
              redirectsList.push({
                source: `/tools/${underscoreSlug}.html`,
                destination: `/tools/${slug}`,
                permanent: true,
              });
            }
            redirectsList.push({
              source: `/${underscoreSlug}.html`,
              destination: `/tools/${slug}`,
              permanent: true,
            });
            redirectsList.push({
              source: `/${slug}.html`,
              destination: `/tools/${slug}`,
              permanent: true,
            });
          }
        }
      }
    } catch (e) {
      console.error('Failed to parse toolsRegistry for redirects:', e);
    }

    return redirectsList;
  },
};

export default nextConfig;
