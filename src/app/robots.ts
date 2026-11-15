import { MetadataRoute } from 'next';

const BASE_URL = 'https://toolpixa.space';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    host: BASE_URL,
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
