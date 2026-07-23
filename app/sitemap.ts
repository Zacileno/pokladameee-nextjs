import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.pokladameee.cz', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://www.pokladameee.cz/akce', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://www.pokladameee.cz/inspirace', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.pokladameee.cz/sluzby/vinylova-podlaha', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.pokladameee.cz/faq', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.pokladameee.cz/kariera', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.pokladameee.cz/kariera/podlahar-vinylove-podlahy-msk', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://www.pokladameee.cz/kariera/obchodne-technicky-zastupce-msk', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://www.pokladameee.cz/kariera/vedouci-pokladkove-party-msk', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://www.pokladameee.cz/kariera/koordinator-zakazek-msk', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]
}
