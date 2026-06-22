import { MetadataRoute } from 'next';

const BASE_URL = 'https://toolpixa.space'; // Change to actual domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
