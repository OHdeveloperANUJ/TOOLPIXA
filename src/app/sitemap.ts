import { MetadataRoute } from 'next';
import { toolsRegistry } from '@/data/toolsRegistry';
import { blogPosts } from '@/data/blogData';
import tags from '../../tags.json';

const BASE_URL = 'https://toolpixa.space';

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
      priority: 0.5,
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
      priority: 0.7,
    });
  });

  return sitemapEntries;
}
