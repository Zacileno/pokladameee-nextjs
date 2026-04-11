import { client, INSPIRACE_QUERY } from '../../lib/sanity'
import PredPoKarta from './PredPoKarta'

export const revalidate = 3600

type Inspirace = {
  _id: string
  nazev: string
  material?: string
  rozloha?: string
  lokalita?: string
  fotoPo: { asset: { url: string } }
  fotoPred?: { asset: { url: string } }
}

const FALLBACK: Inspirace[] = [
  {
    _id: 'fallback-1',
    nazev: 'Obývací pokoj, Ostrava',
    material: 'Vinyl lepený, dub světlý',
    rozloha: '42 m²',
    fotoPo: { asset: { url: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=600&q=80' } },
    fotoPred: { asset: { url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' } },
  },
  {
    _id: 'fallback-2',
    nazev: 'Kuchyň + jídelna, Opava',
    material: 'Vinyl lepený, beton šedý',
    rozloha: '28 m²',
    fotoPo: { asset: { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80' } },
    fotoPred: { asset: { url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80' } },
  },
  {
    _id: 'fallback-3',
    nazev: 'Ložnice, Frýdek-Místek',
    material: 'Vinyl plovoucí, ořech tmavý',
    rozloha: '19 m²',
    fotoPo: { asset: { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' } },
    fotoPred: { asset: { url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80' } },
  },
  {
    _id: 'fallback-4',
    nazev: 'Celý byt 3+1, Karviná',
    material: 'Vinyl lepený, dub přírodní',
    rozloha: '67 m²',
    fotoPo: { asset: { url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80' } },
    fotoPred: { asset: { url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80' } },
  },
]

export default async function GalerieSekce() {
  let projekty: Inspirace[] = FALLBACK
  try {
    const data = await client.fetch<Inspirace[]>(INSPIRACE_QUERY)
    if (data?.length) projekty = data
  } catch {}

  return (
    <section id="inspirace" className="section" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
            Naše práce
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <h2 className="section-title">
              Výsledky mluví<br /><span>samy za sebe</span>
            </h2>
            <p style={{ color: 'var(--gray-400)', fontSize: 15, maxWidth: 360, lineHeight: 1.6 }}>
              Kliknutím na fotku přepínáš mezi stavem před a po pokládce.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {projekty.map(p => (
            <PredPoKarta
              key={p._id}
              po={p.fotoPo?.asset?.url}
              pred={p.fotoPred?.asset?.url}
              nazev={p.nazev}
              material={p.material}
              rozloha={p.rozloha}
            />
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <a href="#kontakt" className="btn-primary" style={{ fontSize: 16 }}>
            Chci taky novou podlahu →
          </a>
        </div>
      </div>
    </section>
  )
}
