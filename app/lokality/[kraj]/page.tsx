import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  client,
  HERO_IKONKY_QUERY, SLUZBY_SEKCE_QUERY,
  OBECNE_NASTAVENI_QUERY, KONTAKT_SEKCE_QUERY,
} from '../../../lib/sanity'
import { KRAJE, getKraj } from '../../../lib/lokality'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import VyhodySekce from '../../components/VyhodySekce'
import SluzbySekce from '../../components/SluzbySekce'
import ReferenceSekce from '../../components/ReferenceSekce'
import KontaktSekce from '../../components/KontaktSekce'
import CeduleGrafika from '../../components/CeduleGrafika'

export const revalidate = 3600
export const dynamicParams = false

export function generateStaticParams() {
  return KRAJE.map(k => ({ kraj: k.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ kraj: string }> }): Promise<Metadata> {
  const { kraj: slug } = await params
  const kraj = getKraj(slug)
  if (!kraj) return {}
  const url = `https://www.pokladameee.cz/lokality/${kraj.slug}`
  const description = `Pokládka vinylových, PVC, kobercových i dřevěných podlah ${kraj.vKraji}. Zaměření zdarma, odvoz staré podlahy a u vás do 48 hodin.`
  return {
    title: `Pokládka podlah – ${kraj.nazev}`,
    description,
    openGraph: { title: `Pokládka podlah – ${kraj.nazev} | pokládámeee.cz`, description, url },
    alternates: { canonical: url },
  }
}

export default async function KrajPage({ params }: { params: Promise<{ kraj: string }> }) {
  const { kraj: slug } = await params
  const kraj = getKraj(slug)
  if (!kraj) notFound()

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
              <span style={{ color: 'var(--gray-400)' }}> / {kraj.nazev}</span>
            </p>
            <div className="kraj-hero-grid">
              <div>
                <h1 style={{ fontSize: 'clamp(32px, 4.4vw, 50px)', fontWeight: 900, color: 'var(--black)', lineHeight: 1.1, marginBottom: 28 }}>
                  Pokládám<span style={{ color: 'var(--orange)' }}>eee</span> podlahy – {kraj.nazev}
                </h1>
                <div className="kraj-perex">
                  <p>
                    <strong>Hledáte novou podlahu</strong>, která vydrží každodenní provoz rodiny, dětí i domácích mazlíčků?
                    Pokládáme vinylové, PVC, kobercové i dřevěné podlahy po celém kraji — {kraj.oblast}.
                  </p>
                  <p>
                    <strong>Přijedeme k vám a zaměříme zdarma</strong>, poradíme s výběrem materiálu a připravíme kalkulaci.
                    Starou podlahu odvezeme a ekologicky zlikvidujeme, připravíme podklad a novou podlahu položíme. Po sobě uklidíme.
                  </p>
                  <p>
                    Jezdíme <strong>i do menších obcí</strong>. Vyplňte formulář a ozveme se vám s nejbližším volným termínem.
                  </p>
                </div>
                <a href="#kontakt" className="btn-primary" style={{ marginTop: 32, padding: '16px 32px' }}>Chci zaměření zdarma</a>
              </div>
              <CeduleGrafika text={kraj.nazev} />
            </div>

            {/* MĚSTA — zatím bez vlastních podstránek */}
            <div className="kraj-mesta">
              <div className="kraj-mesta-grid">
                {kraj.mesta.map(m => (
                  <div key={m} className="kraj-mesto">{m}</div>
                ))}
              </div>
              <p style={{ fontSize: 14, marginTop: 16 }}>A v dalších městech a obcích {kraj.vKraji}…</p>
            </div>
          </div>
        </section>

        <VyhodySekce ikonky={heroIkonkyData?.ikonky} />
        <SluzbySekce data={sluzbySekce} />
        <ReferenceSekce />
        <KontaktSekce kontakt={kontaktSekce} />
      </main>
      <Footer nastaveni={obecneNastaveni} />
    </>
  )
}
