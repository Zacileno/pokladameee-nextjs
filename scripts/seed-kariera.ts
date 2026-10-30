import { client } from '@/sanity/lib/client'
import { pozice } from '@/lib/kariera-data'

const DATUM_ZVEREJNENI: Record<string, string> = {
  'podlahar-vinylove-podlahy-msk': '2026-06-15',
  'obchodne-technicky-zastupce-msk': '2026-06-10',
  'vedouci-pokladkove-party-msk': '2026-06-05',
  'koordinator-zakazek-msk': '2026-05-28',
}

async function seedKariera() {
  for (const p of pozice) {
    const doc = {
      _type: 'karierniPozice',
      _id: `karierniPozice-${p.slug}`,
      nazev: p.nazev,
      slug: { _type: 'slug', current: p.slug },
      region: p.region,
      regionLabel: p.regionLabel,
      typ: p.typ,
      typLabel: p.typLabel,
      perex: p.perex,
      naplnPrace: p.naplnPrace,
      pozadujeme: p.pozadujeme,
      nabizime: p.nabizime,
      datumZverejneni: DATUM_ZVEREJNENI[p.slug] || '2026-01-01',
      aktivni: true,
    }
    try {
      const result = await client.createOrReplace(doc)
      console.log('✅ Kariérní pozice seed hotovo:', result._id)
    } catch (err) {
      console.error('❌ Chyba u', doc._id, ':', err)
    }
  }
}

seedKariera()
