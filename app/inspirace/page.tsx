import type { Metadata } from 'next'
import { client, INSPIRACE_QUERY } from '../../lib/sanity'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PredPoKarta from '../components/PredPoKarta'

export const metadata: Metadata = { title: 'Inspirace a galerie' }
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

export default async function InspracePage() {
  let projekty: Inspirace[] = []
  try {
    projekty = await client.fetch<Inspirace[]>(INSPIRACE_QUERY)
  } catch {}

  return (
    <>
      <Header />
      <main style={{ paddingTop: 100, minHeight: '60vh' }}>
        <div className="container section">
          <h1 className="section-title">Inspirace a <span>galerie</span></h1>
          <p className="section-subtitle">Ukázky naší práce — vinylové podlahy z celého MSK.</p>
          {projekty.length === 0 ? (
            <p style={{ color: 'var(--gray-400)', marginTop: 32 }}>Brzy přidáme první realizace. Sledujte nás!</p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 24, marginTop: 48,
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
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
