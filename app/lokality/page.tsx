import type { Metadata } from 'next'
import {
  client,
  JAK_TO_FUNGUJE_QUERY, SLUZBY_STRANKA_QUERY,
  OBECNE_NASTAVENI_QUERY, KONTAKT_SEKCE_QUERY, LOKALITY_STRANKA_QUERY,
} from '../../lib/sanity'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MapaSekce from '../components/MapaSekce'
import JakToFunguje from '../components/JakToFunguje'
import TypyPodlah, { type TypyPodlahTexty } from '../components/TypyPodlah'
import ReferenceSekce from '../components/ReferenceSekce'
import KontaktSekce from '../components/KontaktSekce'
import FormatovanyText from '../components/FormatovanyText'

// /lokality — rozcestník krajů: mapa s textem, 4 kroky k nové podlaze, typy podlah, hodnocení.
// Kontaktní sekce na konci je cílem tlačítek „Chci zaměření zdarma" (#kontakt).

export const revalidate = 0

const ADRESA = 'https://www.pokladameee.cz/lokality'
const POPIS = 'Pokládáme vinylové, PVC, kobercové i dřevěné podlahy v Moravskoslezském, Zlínském a Olomouckém kraji. Vyberte svůj kraj a město — zaměření zdarma.'

export const metadata: Metadata = {
  title: 'Lokality – kam jezdímeee',
  description: POPIS,
  openGraph: { title: 'Lokality – kam jezdímeee | pokládámeee.cz', description: POPIS, url: ADRESA },
  alternates: { canonical: ADRESA },
}

export default async function LokalityPage() {
  let jakToFungujeData: any = null
  let sluzbyStranka: TypyPodlahTexty = null
  let obecneNastaveni: any = null
  let kontaktSekce: any = null
  let stranka: { nadpis?: Parameters<typeof FormatovanyText>[0]['value']; realizaceNadpis?: Parameters<typeof FormatovanyText>[0]['value'] } | null = null
  try {
    ;[jakToFungujeData, sluzbyStranka, obecneNastaveni, kontaktSekce, stranka] = await Promise.all([
      client.fetch(JAK_TO_FUNGUJE_QUERY),
      client.fetch(SLUZBY_STRANKA_QUERY),
      client.fetch(OBECNE_NASTAVENI_QUERY),
      client.fetch(KONTAKT_SEKCE_QUERY),
      client.fetch(LOKALITY_STRANKA_QUERY),
    ])
  } catch {}

  return (
    <>
      <Header opaque />
      <main>
        <MapaSekce uvodStranky />
        <JakToFunguje data={jakToFungujeData} />

        {/* TYPY PODLAH — stejné dlaždice jako na /sluzby */}
        <section className="section" style={{ background: 'var(--gray-50)' }}>
          <div className="container">
            <h2 className="section-title" style={{ marginBottom: 40 }}><FormatovanyText value={stranka?.nadpis} fallback={<>Co pokládám<span>eee</span></>} /></h2>
            <TypyPodlah texty={sluzbyStranka} uroven="h3" />
          </div>
        </section>

        {/* nadpis hodnocení ze Studia (Lokality — stránka), jinak výchozí nadpis sekce */}
        <ReferenceSekce nadpis={stranka?.realizaceNadpis?.length ? <FormatovanyText value={stranka.realizaceNadpis} fallback={null} /> : undefined} />
        <KontaktSekce kontakt={kontaktSekce} />
      </main>
      <Footer nastaveni={obecneNastaveni} />
    </>
  )
}
