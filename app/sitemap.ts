import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://pokládámeee.cz', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://pokládámeee.cz/akce', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://pokládámeee.cz/inspirace', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://pokládámeee.cz/sluzby/vinylova-podlaha', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://pokládámeee.cz/faq', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://pokládámeee.cz/kariera', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://pokládámeee.cz/kariera/pokladac-vinylove-podlahy-msk', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://pokládámeee.cz/kariera/obchodne-technicky-zastupce-msk', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://pokládámeee.cz/kariera/vedouci-pokladkove-party-msk', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://pokládámeee.cz/kariera/koordinator-zakazek-msk', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]
}
