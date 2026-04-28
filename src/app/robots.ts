import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/settings', '/login', '/signup'],
    },
    sitemap: 'https://smoking.yu-fu.site/sitemap.xml',
  };
}
