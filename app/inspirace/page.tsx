import type { Metadata } from 'next'
import { client, INSPIRACE_QUERY, KONTAKT_SEKCE_QUERY } from '../../lib/sanity'
import Header from '../components/Header'
import Footer from '../components/Footer'
import KontaktSekce from '../components/KontaktSekce'
import PredPoKarta from '../components/PredPoKarta'

export const metadata: Metadata = {
  title: 'Inspirace a galerie',
  description: 'Skutečné realizace vinylových, PVC, kobercových a dřevěných podlah po celém Moravskoslezském kraji — žádné katalogové fotky, jen naše vlastní práce.',
  openGraph: {
    title: 'Inspirace a galerie | pokládámeee.cz',
    description: 'Skutečné realizace podlah po celém Moravskoslezském kraji — žádné katalogové fotky, jen naše vlastní práce.',
    url: 'https://www.pokladameee.cz/inspirace',
  },
  alternates: { canonical: 'https://www.pokladameee.cz/inspirace' },
}
export const revalidate = 3600

const ISTRIP = [
  { emoji: '📐', text: 'Zaměření zdarma' },
  { emoji: '⚡', text: 'U vás do 48 hodin' },
  { emoji: '🚛', text: 'Odvoz staré podlahy zdarma' },
  { emoji: '🛡️', text: 'Záruka na práci' },
  { emoji: '📍', text: 'Celý Moravskoslezský kraj' },
]

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
  let kontaktSekce: any = null
  try {
    ;[projekty, kontaktSekce] = await Promise.all([
      client.fetch<Inspirace[]>(INSPIRACE_QUERY),
      client.fetch(KONTAKT_SEKCE_QUERY),
    ])
  } catch {}

  return (
    <>
      <Header opaque />

      {/* HERO */}
      <section style={{ background: 'var(--blue)', paddingTop: 100, paddingBottom: 64 }}>
        <div className="container">
          <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '2px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 16 }}>
            Galerie realizací · MSK
          </p>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 54px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 20, maxWidth: 720 }}>
            Inspirace a galerie
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: 12, maxWidth: 620 }}>
            Prohlédněte si, jak vypadají naše realizace naživo. Žádné vizualizace ani katalogové fotky — jen skutečné podlahy, které jsme položili zákazníkům po celém Moravskoslezském kraji.
          </p>
          <p style={{ fontSize: 15, color: 'var(--orange)', fontWeight: 700, marginBottom: 36 }}>
            📸 Skutečné realizace, žádné stock fotky
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#kontakt" className="btn-primary" style={{ borderRadius: 10, padding: '15px 28px' }}>
              Nezávazná poptávka →
            </a>
            <a href="tel:+420790388487" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.12)', color: 'white',
              fontWeight: 700, fontSize: 16, padding: '14px 24px',
              borderRadius: 10, border: '1px solid rgba(255,255,255,0.25)',
              textDecoration: 'none', transition: 'background 0.2s',
            }}>
              📞 +420 790 388 487
            </a>
          </div>
        </div>
      </section>

      {/* IKONOVÝ STRIP */}
      <section style={{ background: 'white', borderTop: '1px solid var(--gray-100)', borderBottom: '1px solid var(--gray-100)' }}>
        <div className="container">
          <div className="sluzby-istripgrid">
            {ISTRIP.map(({ emoji, text }, i) => (
              <div key={text || i} className="sluzby-istrip-item">
                <span style={{ fontSize: 28, flexShrink: 0 }}>{emoji}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-700)', lineHeight: 1.3 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIE */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Naše <span>realizace</span></h2>
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            Výběr z podlah, které jsme v poslední době položili. U některých realizací si můžete prokliknout stav před a po.
          </p>
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
      </section>

      <KontaktSekce kontakt={kontaktSekce} />

      <Footer />
    </>
  )
}
