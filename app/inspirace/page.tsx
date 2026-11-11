import type { Metadata } from 'next'
import { client, INSPIRACE_QUERY, INSPIRACE_STRANKA_QUERY, KONTAKT_SEKCE_QUERY } from '../../lib/sanity'
import Header from '../components/Header'
import Footer from '../components/Footer'
import KontaktSekce from '../components/KontaktSekce'
import PredPoKarta from '../components/PredPoKarta'
import ReferenceSekce from '../components/ReferenceSekce'
import BrandIcon from '../components/BrandIcon'
import YouTubeVideo from '../components/YouTubeVideo'
import FormatovanyText from '../components/FormatovanyText'
import RealizaceGalerie from '../components/RealizaceGalerie'
import { FOTOGALERIE } from '../../lib/realizace'
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
  { emoji: '📐', nadpis: 'Zaměřímeee zdarma', text: 'Po vyplnění formuláře se vám ozveme, domluvíme termín a přijedeme. Zaměříme prostor a připravíme kalkulaci. Na naše náklady.' },
  { emoji: '🎨', nadpis: 'Poradímeee s výběrem', text: 'Pomůžeme vybrat podlahu, která sedne k vašemu provozu i interiéru — vinyl, PVC, dřevo nebo koberec.' },
  { emoji: '✨', nadpis: 'Položímeee a uklidímeee', text: 'Ve smluvený den dorazí naše parta, odstraní starou podlahu, připraví podklad a položí novou. Po sobě uklidíme.' },
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

// texty ze Sanity (Inspirace — stránka); prázdné pole = výchozí text níže
type RT = Parameters<typeof FormatovanyText>[0]['value']
type InspiraceStranka = {
  heroFotka?: { asset?: { url?: string } }
  heroNadpis?: RT; heroText?: RT; heroTlacitko?: RT
  ikonky?: { emoji?: string; text?: RT }[]
  realizaceNadpis?: RT; realizacePodnadpis?: RT; videoNadpis?: RT
  galerieNadpis?: RT; galeriePodnadpis?: RT
  procNadpis?: RT; procKarty?: { emoji?: string; nadpis?: RT; text?: RT }[]; procTlacitko?: RT; recenzeNadpis?: RT
}

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
  const ikonky = stranka?.ikonky?.length ? stranka.ikonky : ISTRIP
  const procKarty = stranka?.procKarty?.length ? stranka.procKarty : PROC

  return (
    <>
      <Header opaque />

      {/* HERO */}
      <section style={{ background: 'white', paddingTop: 'calc(128px + var(--hlavicka-navic))', paddingBottom: 64 }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 54px)', fontWeight: 900, color: 'var(--black)', lineHeight: 1.1, marginBottom: 40, textAlign: 'center' }}>
            <FormatovanyText value={stranka?.heroNadpis} fallback={<>Inspirac<span style={{ color: 'var(--orange)' }}>eee</span></>} />
          </h1>
          <div className="insp-hero-grid">
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>
                <a href="/" style={{ color: 'var(--orange)' }}>Domů</a>
                <span style={{ color: 'var(--gray-400)' }}> / Inspirace</span>
              </p>
              <p style={{ fontSize: 18, color: 'var(--gray-700)', lineHeight: 1.7, marginBottom: 32 }}>
                <FormatovanyText value={stranka?.heroText} fallback="Prohlédněte si, jak vypadají naše realizace naživo. Žádné vizualizace ani katalogové fotky — jen skutečné podlahy, které jsme položili zákazníkům po celém Moravskoslezském, Zlínském a Olomouckém kraji." />
              </p>
              <a href="#realizace" className="btn-primary" style={{ borderRadius: 10, padding: '15px 28px' }}>
                <span><FormatovanyText vOdkazu value={stranka?.heroTlacitko} fallback="Naše realizaceee" /></span>
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
            {ikonky.map(({ emoji, text }, i) => (
              <div key={i} className="sluzby-istrip-item">
                <BrandIcon emoji={emoji || '✨'} size={48} />
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-700)', lineHeight: 1.3 }}><FormatovanyText value={text} fallback="" /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIE */}
      <section id="realizace" className="section" style={{ scrollMarginTop: 'calc(80px + var(--hlavicka-navic))' }}>
        <div className="container">
          <h2 className="section-title"><FormatovanyText value={stranka?.realizaceNadpis} fallback={<>Naše <span>realizaceee</span></>} /></h2>
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            <FormatovanyText value={stranka?.realizacePodnadpis} fallback="Výběr z podlah, které jsme v poslední době položili. U některých realizací můžete posuvníkem porovnat stav před a po." />
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
            <h3><FormatovanyText value={stranka?.videoNadpis} fallback={<>Podívejte se na výsled<span>eee</span>k</>} /></h3>
            <YouTubeVideo id={VIDEO_PORUBACEK_VYSLEDEK.id} nazev={VIDEO_PORUBACEK_VYSLEDEK.nazev} />
          </div>
        </div>
      </section>

      {/* FOTOGALERIE — mix typů podlah, velký slider přes celou šířku */}
      <RealizaceGalerie
        id="fotogalerie"
        fotky={FOTOGALERIE}
        nadpis={<FormatovanyText value={stranka?.galerieNadpis} fallback={<>Fotogaleri<span>eee</span> našich realizací</>} />}
        podnadpis={<FormatovanyText value={stranka?.galeriePodnadpis} fallback="Vinyl, PVC, koberce i dřevo — hotové podlahy u našich zákazníků." />}
        velka
      />

      {/* PROČ POKLÁDÁMEEE */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center' }}><FormatovanyText value={stranka?.procNadpis} fallback={<>Proč <span>Pokládámeee</span></>} /></h2>
          <div className="insp-proc-grid">
            {procKarty.map(({ emoji, nadpis, text }, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 12, padding: '32px 28px', border: '1px solid var(--gray-100)' }}>
                <div style={{ marginBottom: 16 }}><BrandIcon emoji={emoji || '✨'} size={64} /></div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--black)', marginBottom: 10 }}><FormatovanyText value={nadpis} fallback="" /></h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: 'var(--gray-700)' }}><FormatovanyText value={text} fallback="" /></p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <a href="#kontakt" className="btn-primary"><span><FormatovanyText vOdkazu value={stranka?.procTlacitko} fallback="Chci zaměření zdarma" /></span></a>
          </div>
        </div>
      </section>

      <ReferenceSekce nadpis={<FormatovanyText value={stranka?.recenzeNadpis} fallback={<>Co o nás říkají<br /><span>zákazníci</span></>} />} />

      <KontaktSekce kontakt={kontaktSekce} />

      <Footer />
    </>
  )
}
