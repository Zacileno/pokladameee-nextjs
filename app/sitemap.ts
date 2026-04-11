import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://pokládámeee.cz', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://pokládámeee.cz/akce', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://pokládámeee.cz/inspirace', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}
