import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/blog-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://floydslabs.com';

  const staticRoutes = [
    { url: baseUrl, changeFrequency: 'monthly' as const, priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/tools`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/apps`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: 'yearly' as const, priority: 0.5 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const blogRoutes = (getAllSlugs() ?? []).map((slug) => ({
    url: `${baseUrl}/blog/${slug ?? ''}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
