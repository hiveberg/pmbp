import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/demo', '/download', '/support', '/privacy', '/docs'].map(
    (path) => ({
      url: `${siteConfig.siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : 0.7,
    }),
  );
}
