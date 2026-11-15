import { MetadataRoute } from 'next';
import { toolsRegistry } from '@/data/toolsRegistry';
import { blogPosts } from '@/data/blogData';
import { programmaticSlugs } from '@/data/programmaticSeo';
import tags from '../../tags.json';

export const dynamic = 'force-static';

const BASE_URL = 'https://www.toolpixa.space';

const CATEGORIES = [
  'finance',
  'student',
  'health',
  'converter',
  'developer',
  'image',
  'video',
  'pdf',
];

const COMPARISONS = [
  'home-loan-emi-vs-personal-loan-emi',
  'sip-vs-lumpsum',
  'ppf-vs-fd',
  'old-tax-regime-vs-new-tax-regime',
  'sbi-vs-hdfc-home-loan-emi',
  '50-lakh-home-loan-emi-10-15-20-years',
  '30-lakh-home-loan-emi-calculator',
  'direct-vs-regular-mutual-fund',
  '12-lakh-15-lakh-20-lakh-in-hand-salary',
  'vtu-anna-sppu-cbse-cgpa-to-percentage',
  'ssc-upsc-neet-photo-signature-size-20kb-50kb',
  'gold-loan-vs-personal-loan-emi',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/calculate`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/disclaimer`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/sitemap`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Add all 8 categories
  CATEGORIES.forEach((cat) => {
    sitemapEntries.push({
      url: `${BASE_URL}/category/${cat}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    });
  });

  // Add all 115+ tools
  Object.keys(toolsRegistry).forEach((slug) => {
    sitemapEntries.push({
      url: `${BASE_URL}/tools/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    });
  });

  // Add all 105 programmatic exact-calculation & exam pages
  programmaticSlugs.forEach((slug) => {
    sitemapEntries.push({
      url: `${BASE_URL}/calculate/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    });
  });

  // Add all blog articles
  blogPosts.forEach((blog) => {
    const parsedDate = blog.date ? new Date(blog.date) : now;
    sitemapEntries.push({
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastModified: isNaN(parsedDate.getTime()) ? now : parsedDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    });
  });

  // Add all tag hubs
  Object.keys(tags).forEach((tag) => {
    sitemapEntries.push({
      url: `${BASE_URL}/tag/${tag}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  // Add comparison pages
  COMPARISONS.forEach((comp) => {
    sitemapEntries.push({
      url: `${BASE_URL}/compare/${comp}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    });
  });

  return sitemapEntries;
}
