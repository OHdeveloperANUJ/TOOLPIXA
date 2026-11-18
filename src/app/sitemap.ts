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
  const siteUpdated = new Date('2026-11-17T00:00:00Z');
  const programmaticUpdated = new Date('2026-11-10T00:00:00Z');
  const staticUpdated = new Date('2026-10-15T00:00:00Z');

  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: siteUpdated,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/calculate`,
      lastModified: siteUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: siteUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: siteUpdated,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/sitemap`,
      lastModified: siteUpdated,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: staticUpdated,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: staticUpdated,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: staticUpdated,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: staticUpdated,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/disclaimer`,
      lastModified: staticUpdated,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  CATEGORIES.forEach((cat) => {
    sitemapEntries.push({
      url: `${BASE_URL}/category/${cat}`,
      lastModified: siteUpdated,
      changeFrequency: 'weekly',
      priority: 0.85,
    });
  });

  Object.keys(toolsRegistry).forEach((slug) => {
    sitemapEntries.push({
      url: `${BASE_URL}/tools/${slug}`,
      lastModified: siteUpdated,
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  programmaticSlugs.forEach((slug) => {
    sitemapEntries.push({
      url: `${BASE_URL}/calculate/${slug}`,
      lastModified: programmaticUpdated,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  blogPosts.forEach((blog) => {
    const parsedDate = blog.date ? new Date(blog.date) : staticUpdated;
    sitemapEntries.push({
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastModified: isNaN(parsedDate.getTime()) ? staticUpdated : parsedDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    });
  });

  Object.keys(tags).forEach((tag) => {
    sitemapEntries.push({
      url: `${BASE_URL}/tag/${tag}`,
      lastModified: siteUpdated,
      changeFrequency: 'weekly',
      priority: 0.65,
    });
  });

  COMPARISONS.forEach((comp) => {
    sitemapEntries.push({
      url: `${BASE_URL}/compare/${comp}`,
      lastModified: programmaticUpdated,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return sitemapEntries;
}
