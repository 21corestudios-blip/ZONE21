import type { MetadataRoute } from 'next';

const siteUrl = 'https://zone21.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/a-propos',
          '/ecosysteme',
          '/contact',
          '/mentions-legales',
          '/wear',
        ],
        disallow: ['/account', '/dashboard', '/login', '/checkout', '/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}