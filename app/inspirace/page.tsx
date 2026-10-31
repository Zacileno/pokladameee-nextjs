import type { Metadata } from 'next'
import { client, INSPIRACE_QUERY, INSPIRACE_STRANKA_QUERY, KONTAKT_SEKCE_QUERY } from '../../lib/sanity'
import Header from '../components/Header'
import Footer from '../components/Footer'
import KontaktSekce from '../components/KontaktSekce'
import PredPoKarta from '../components/PredPoKarta'
import ReferenceSekce from '../components/ReferenceSekce'
import BrandIcon from '../components/BrandIcon'
import YouTubeVideo from '../components/YouTubeVideo'
import { VIDEO_PORUBACEK_VYSLEDEK } from '../../lib/videa'

export const metadata: Metadata = {
  title: 'Inspirace a galerie',
  description: 'Skutečné realizace vinylových, PVC, kobercových a dřevěných podlah v Moravskoslezském, Zlínském a Olomouckém kraji — žádné katalogové fotky, jen naše vlastní práce.',
  openGraph: {
    title: 'Inspirace a galerie | pokládámeee.cz',
    description: 'Skutečné realizace podlah v Moravskoslezském, Zlínském a Olomouckém kraji — žádné katalogové fotky, jen naše vlastní práce.',
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
  { emoji: '📍', text: 'MSK, Zlínský i Olomoucký kraj' },
]

const PROC = [
  { emoji: '📐', title: 'Zaměřímeee zdarma', desc: 'Po vyplnění formuláře se vám ozveme, domluvíme termín a přijedeme. Zaměříme prostor a připravíme kalkulaci. Na naše náklady.' },
  { emoji: '🎨', title: 'Poradímeee s výběrem', desc: 'Pomůžeme vybrat podlahu, která sedne k vašemu provozu i interiéru — vinyl, PVC, dřevo nebo koberec.' },
  { emoji: '✨', title: 'Položímeee a uklidímeee', desc: 'Ve smluvený den dorazí naše parta, odstraní starou podlahu, připraví podklad a položí novou. Po sobě uklidíme.' },
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

type InspiraceStranka = { heroFotka?: { asset?: { url?: string } } }

export default async function InspracePage() {
  let projekty: Inspirace[] = []
  let stranka: InspiraceStranka | null = null
  let kontaktSekce: any = null
  try {
    ;[projekty, stranka, kontaktSekce] = await Promise.all([
      client.fetch<Inspirace[]>(INSPIRACE_QUERY),
      client.fetch<InspiraceStranka | null>(INSPIRACE_STRANKA_QUERY),
      client.fetch(KONTAKT_SEKCE_QUERY),
    ])
  } catch {}
  const heroFotka = stranka?.heroFotka?.asset?.url

  return (
    <>
      <Header opaque />

      {/* HERO */}
      <section style={{ background: 'white', paddingTop: 128, paddingBottom: 64 }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 54px)', fontWeight: 900, color: 'var(--black)', lineHeight: 1.1, marginBottom: 40, textAlign: 'center' }}>
            Inspirac<span style={{ color: 'var(--orange)' }}>eee</span>
          </h1>
          <div className="insp-hero-grid">
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>
                <a href="/" style={{ color: 'var(--orange)' }}>Domů</a>
                <span style={{ color: 'var(--gray-400)' }}> / Inspirace</span>
              </p>
              <p style={{ fontSize: 18, color: 'var(--gray-700)', lineHeight: 1.7, marginBottom: 32 }}>
                Prohlédněte si, jak vypadají naše realizace naživo. Žádné vizualizace ani katalogové fotky — jen skutečné podlahy, které jsme položili zákazníkům po celém Moravskoslezském, Zlínském a Olomouckém kraji.
              </p>
              <a href="#realizace" className="btn-primary" style={{ borderRadius: 10, padding: '15px 28px' }}>
                Naše realizaceee
              </a>
            </div>
            <div className="insp-hero-foto">
              {heroFotka ? (
                <img src={heroFotka} alt="Realizace podlahy od pokládámeee" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--gray-100)', borderRadius: 16 }}>
                  <BrandIcon emoji="📸" size={96} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* IKONOVÝ STRIP */}
      <section style={{ background: 'white', borderTop: '1px solid var(--gray-100)', borderBottom: '1px solid var(--gray-100)' }}>
        <div className="container">
          <div className="sluzby-istripgrid">
            {ISTRIP.map(({ emoji, text }, i) => (
              <div key={text || i} className="sluzby-istrip-item">
                <BrandIcon emoji={emoji} size={48} />
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-700)', lineHeight: 1.3 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIE */}
      <section id="realizace" className="section" style={{ scrollMarginTop: 80 }}>
        <div className="container">
          <h2 className="section-title">Naše <span>realizaceee</span></h2>
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

          {/* VELKÉ VIDEO pod galerií */}
          <div className="velke-video">
            <h3>Podívejte se na výsled<span>eee</span>k</h3>
            <YouTubeVideo id={VIDEO_PORUBACEK_VYSLEDEK.id} nazev={VIDEO_PORUBACEK_VYSLEDEK.nazev} />
          </div>
        </div>
      </section>

      {/* PROČ POKLÁDÁMEEE */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}>Proč <span>Pokládámeee</span></h2>
          <div className="insp-proc-grid">
            {PROC.map(({ emoji, title, desc }) => (
              <div key={title} style={{ background: 'white', borderRadius: 12, padding: '32px 28px', border: '1px solid var(--gray-100)' }}>
                <div style={{ marginBottom: 16 }}><BrandIcon emoji={emoji} size={64} /></div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--black)', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--gray-700)' }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <a href="#kontakt" className="btn-primary">Chci zaměření zdarma</a>
          </div>
        </div>
      </section>

      <ReferenceSekce nadpis={<>Co o nás říkají<br /><span>zákazníci</span></>} />

      <KontaktSekce kontakt={kontaktSekce} />

      <Footer />
    </>
  )
}
