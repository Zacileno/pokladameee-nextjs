import Tlacitko from '@/app/components/Tlacitko'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  client,
  HERO_IKONKY_QUERY, SLUZBY_SEKCE_QUERY,
  OBECNE_NASTAVENI_QUERY, KONTAKT_SEKCE_QUERY,
} from '../../../../lib/sanity'
import { KRAJE, getKraj, getMesto } from '../../../../lib/lokality'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import VyhodySekce from '../../../components/VyhodySekce'
import SluzbySekce from '../../../components/SluzbySekce'
import ReferenceSekce from '../../../components/ReferenceSekce'
import KontaktSekce from '../../../components/KontaktSekce'
import CeduleGrafika from '../../../components/CeduleGrafika'
import MestoMapa from '../../../components/MestoMapa'

export const revalidate = 3600
export const dynamicParams = false

export function generateStaticParams() {
  return KRAJE.flatMap(k => k.mesta.map(m => ({ kraj: k.slug, mesto: m.slug })))
}

type Params = Promise<{ kraj: string; mesto: string }>

async function najdi(params: Params) {
  const { kraj: krajSlug, mesto: mestoSlug } = await params
  const kraj = getKraj(krajSlug)
  const mesto = kraj && getMesto(kraj, mestoSlug)
  return kraj && mesto ? { kraj, mesto } : null
}

// **tučně** → <strong>
function Text({ text }: { text: string }) {
  return <>{text.split(/\*\*(.+?)\*\*/).map((cast, i) => (i % 2 ? <strong key={i}>{cast}</strong> : cast))}</>
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const nalez = await najdi(params)
  if (!nalez) return {}
  const { kraj, mesto } = nalez
  const url = `https://www.pokladameee.cz/lokality/${kraj.slug}/${mesto.slug}`
  const description = `Pokládka vinylových, PVC, kobercových i dřevěných podlah ${mesto.vMeste} a okolí. Zaměření zdarma, odvoz staré podlahy a u vás do 48 hodin.`
  return {
    title: `Pokládka podlah ${mesto.nazev}`,
    description,
    openGraph: { title: `Pokládka podlah ${mesto.nazev} | pokládámeee.cz`, description, url },
    alternates: { canonical: url },
  }
}

export default async function MestoPage({ params }: { params: Params }) {
  const nalez = await najdi(params)
  if (!nalez) notFound()
  const { kraj, mesto } = nalez
  const dalsiMesta = kraj.mesta.filter(m => m.slug !== mesto.slug)

  let heroIkonkyData: any = null
  let sluzbySekce: any = null
  let obecneNastaveni: any = null
  let kontaktSekce: any = null
  try {
    ;[heroIkonkyData, sluzbySekce, obecneNastaveni, kontaktSekce] = await Promise.all([
      client.fetch(HERO_IKONKY_QUERY),
      client.fetch(SLUZBY_SEKCE_QUERY),
      client.fetch(OBECNE_NASTAVENI_QUERY),
      client.fetch(KONTAKT_SEKCE_QUERY),
    ])
  } catch {}

  return (
    <>
      <Header opaque />
      <main>
        {/* HERO */}
        <section style={{ background: 'white', paddingTop: 'calc(128px + var(--hlavicka-navic))', paddingBottom: 48 }}>
          <div className="container">
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>
              <a href="/" style={{ color: 'var(--orange)' }}>Domů</a>
              <span style={{ color: 'var(--gray-400)' }}> / </span>
              <a href={`/lokality/${kraj.slug}`} style={{ color: 'var(--orange)' }}>{kraj.nazev}</a>
              <span style={{ color: 'var(--gray-400)' }}> / {mesto.nazev}</span>
            </p>
            <div className="kraj-hero-grid">
              <div className="kraj-hero-text">
                <h1 style={{ fontSize: 'clamp(32px, 4.4vw, 50px)', fontWeight: 900, color: 'var(--black)', lineHeight: 1.1, marginBottom: 28 }}>
                  Pokládám<span style={{ color: 'var(--orange)' }}>eee</span> podlahy – {mesto.nazev}
                </h1>
                <div className="kraj-perex">
                  <p><Text text={mesto.perex} /></p>
                  <p>
                    <strong>Přijedeme k vám a zaměříme zdarma</strong>, poradíme s výběrem materiálu a připravíme kalkulaci.
                    Starou podlahu odvezeme a ekologicky zlikvidujeme, připravíme podklad a novou podlahu položíme. Po sobě uklidíme.
                  </p>
                  <p>
                    Pokládáme vinylové, PVC, kobercové i dřevěné podlahy. Vyplňte formulář a ozveme se vám s nejbližším volným termínem.
                  </p>
                </div>
                <a href="#kontakt" className="btn-primary kraj-cta" style={{ marginTop: 32, padding: '16px 32px' }}><Tlacitko klic="lokalityZamereni" fallback="Chci zaměření zdarma" /></a>
              </div>
              <CeduleGrafika text={mesto.nazev} />
            </div>
          </div>
        </section>

        <VyhodySekce ikonky={heroIkonkyData?.ikonky} />

        {/* MĚSTO A OKOLÍ — texty s místním nářečím */}
        <section className="section" style={{ background: 'var(--gray-50)' }}>
          <div className="container">
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 40 }}>
              Pokládám<span>eee</span> {mesto.vMeste} a okolí
            </h2>
            <div className="mapa-grid">
              <div className="kraj-perex">
                {mesto.okoli.map((odstavec, i) => <p key={i}><Text text={odstavec} /></p>)}
                <a href="#kontakt" className="btn-primary kraj-cta" style={{ marginTop: 18, padding: '16px 32px' }}><Tlacitko klic="lokalityKonzultace" fallback="Konzultace zdarma" /></a>
              </div>
              <MestoMapa kraj={kraj} mesto={mesto} />
            </div>
          </div>
        </section>

        <SluzbySekce data={sluzbySekce} />

        {/* DALŠÍ MĚSTA V KRAJI */}
        <section className="section" style={{ background: 'white' }}>
          <div className="container">
            <div className="kraj-mesta" style={{ marginTop: 0, textAlign: 'center' }}>
              <p style={{ fontSize: 17, fontWeight: 800, color: 'var(--black)', marginBottom: 16 }}>Pokládám<span style={{ color: 'var(--orange)' }}>eee</span> i v dalších městech {kraj.vKraji}</p>
              <div className="kraj-mesta-grid mesto-dalsi-grid">
                {dalsiMesta.map(m => (
                  <a key={m.slug} href={`/lokality/${kraj.slug}/${m.slug}`} className="kraj-mesto">{m.nazev}</a>
                ))}
              </div>
              <p style={{ fontSize: 14, marginTop: 16 }}>
                A v dalších městech a obcích {kraj.vKraji}… <a href={`/lokality/${kraj.slug}`} style={{ color: 'var(--orange)', fontWeight: 700 }}>Všechna místa →</a>
              </p>
            </div>
          </div>
        </section>

        <ReferenceSekce />
        <KontaktSekce kontakt={kontaktSekce} />
      </main>
      <Footer nastaveni={obecneNastaveni} />
    </>
  )
}
