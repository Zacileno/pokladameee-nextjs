import type { MetadataRoute } from 'next'
import { client, BLOG_SLUGS_QUERY } from '@/lib/sanity'
import { BLOG_FALLBACK_POSTS } from '@/lib/blog-fallback'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs: { slug: string }[] = await client.fetch(BLOG_SLUGS_QUERY).catch(() => [])
  const blogSlugs = slugs.length > 0 ? slugs.map(s => s.slug) : BLOG_FALLBACK_POSTS.map(p => p.slug)

  return [
    { url: 'https://www.pokladameee.cz', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://www.pokladameee.cz/akce', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://www.pokladameee.cz/co-pokladame', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.pokladameee.cz/o-nas', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://www.pokladameee.cz/inspirace', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.pokladameee.cz/sluzby/vinylova-podlaha', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.pokladameee.cz/faq', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.pokladameee.cz/kariera', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.pokladameee.cz/kariera/podlahar-vinylove-podlahy-msk', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://www.pokladameee.cz/kariera/obchodne-technicky-zastupce-msk', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://www.pokladameee.cz/kariera/vedouci-pokladkove-party-msk', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://www.pokladameee.cz/kariera/koordinator-zakazek-msk', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://www.pokladameee.cz/blog', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    ...blogSlugs.map(slug => ({
      url: `https://www.pokladameee.cz/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
