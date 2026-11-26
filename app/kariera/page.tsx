import type { Metadata } from 'next'
import { SOCIAL_OBRAZEK } from '@/lib/socialObrazek'
import Header from '../components/Header'
import Footer from '../components/Footer'
import KarieraHero from './components/KarieraHero'
import TestimonialCarousel from './components/TestimonialCarousel'
import BenefityGrid from './components/BenefityGrid'
import FilozofieSecce from './components/FilozofieSecce'
import KulturaGrid from './components/KulturaGrid'
import VolnePozice from './components/VolnePozice'
import KarieraKontaktForm from './components/KarieraKontaktForm'
import KratkaVidea from '../components/KratkaVidea'
import { SHORTS_NABOR } from '@/lib/videa'
import { client, KARIERNI_POZICE_QUERY, KARIERA_STRANKA_QUERY } from '@/lib/sanity'
import { pozice as POZICE_FALLBACK, type KarieraStranka, type Pozice } from '@/lib/kariera-data'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Kariéra — práce v oblasti podlah v MSK',
  description: 'Hledáme šikovné řemeslníky, obchodníky a koordinátory do týmu pokládámeee.cz v Moravskoslezském kraji. Volné pozice, férová odměna, firemní auto.',
  openGraph: {
    title: 'Kariéra | Pokládámeee.cz',
    description: 'Hledáme šikovné řemeslníky, obchodníky a koordinátory do týmu pokládámeee.cz v Moravskoslezském kraji.',
    url: 'https://www.pokladameee.cz/kariera',
    images: SOCIAL_OBRAZEK,
    siteName: 'pokládámeee.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
  alternates: { canonical: 'https://www.pokladameee.cz/kariera' },
}

export default async function KarieraPage() {
  let pozice: Pozice[] = POZICE_FALLBACK
  try {
    const data = await client.fetch<Pozice[]>(KARIERNI_POZICE_QUERY)
    if (data?.length) pozice = data
  } catch {}

  // texty stránky ze Sanity (Kariéra — stránka); prázdné pole = výchozí text
  const texty = await client.fetch<KarieraStranka | null>(KARIERA_STRANKA_QUERY).catch(() => null)

  return (
    <>
      <Header opaque />
      <main>
        <KarieraHero texty={texty} />
        <TestimonialCarousel texty={texty} />
        <BenefityGrid texty={texty} />
        <FilozofieSecce texty={texty} />
        <KratkaVidea
          videa={SHORTS_NABOR}
          nadpis={<>Koho hledám<span>eee</span>?</>}
          podnadpis="Adam vám za minutu řekne, jak to u nás chodí."
        />
        <KulturaGrid texty={texty} />
        <VolnePozice pozice={pozice} texty={texty} />
        <KarieraKontaktForm texty={texty} />
      </main>
      <Footer />
    </>
  )
}
