import type { Metadata } from 'next'
import Header from '../components/Header'
import Footer from '../components/Footer'
import KarieraHero from './components/KarieraHero'
import TestimonialCarousel from './components/TestimonialCarousel'
import BenefityGrid from './components/BenefityGrid'
import FilozofieSecce from './components/FilozofieSecce'
import KulturaGrid from './components/KulturaGrid'
import VolnePozice from './components/VolnePozice'
import KarieraKontaktForm from './components/KarieraKontaktForm'
import { client, KARIERNI_POZICE_QUERY } from '@/lib/sanity'
import { pozice as POZICE_FALLBACK, type Pozice } from '@/lib/kariera-data'

export const metadata: Metadata = {
  title: 'Kariéra | Pokládámeee.cz — Práce v oblasti podlah MSK',
  description: 'Hledáme šikovné řemeslníky, obchodníky a koordinátory do týmu pokládámeee.cz v Moravskoslezském kraji. Volné pozice, férová odměna, firemní auto.',
  openGraph: {
    title: 'Kariéra | Pokládámeee.cz',
    description: 'Hledáme šikovné řemeslníky, obchodníky a koordinátory do týmu pokládámeee.cz v Moravskoslezském kraji.',
    url: 'https://www.pokladameee.cz/kariera',
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

  return (
    <>
      <Header opaque />
      <main>
        <KarieraHero />
        <TestimonialCarousel />
        <BenefityGrid />
        <FilozofieSecce />
        <KulturaGrid />
        <VolnePozice pozice={pozice} />
        <KarieraKontaktForm />
      </main>
      <Footer />
    </>
  )
}
