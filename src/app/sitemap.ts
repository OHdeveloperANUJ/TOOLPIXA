import { MetadataRoute } from 'next';
import { toolsRegistry } from '@/data/toolsRegistry';
import { blogPosts } from '@/data/blogData';

const BASE_URL = 'https://toolpixa.space'; // Change to actual domain

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Add all tools to sitemap
  Object.values(toolsRegistry).forEach((tool) => {
    sitemapEntries.push({
      url: `${BASE_URL}/tools/${tool.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });

  // Add all blogs to sitemap
  blogPosts.forEach((blog) => {
    sitemapEntries.push({
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastModified: new Date(blog.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  });

  return sitemapEntries;
}
