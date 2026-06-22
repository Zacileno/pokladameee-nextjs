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

export const metadata: Metadata = {
  title: 'Kariéra | Pokládámeee.cz — Práce v oblasti podlah MSK',
  description: 'Hledáme šikovné řemeslníky, obchodníky a koordinátory do týmu pokládámeee.cz v Moravskoslezském kraji. Volné pozice, férová odměna, firemní auto.',
  openGraph: {
    title: 'Kariéra | Pokládámeee.cz',
    description: 'Hledáme šikovné řemeslníky, obchodníky a koordinátory do týmu pokládámeee.cz v Moravskoslezském kraji.',
    url: 'https://pokladameee.cz/kariera',
    siteName: 'pokládámeee.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
}

export default function KarieraPage() {
  return (
    <>
      <Header opaque />
      <main>
        <KarieraHero />
        <TestimonialCarousel />
        <BenefityGrid />
        <FilozofieSecce />
        <KulturaGrid />
        <VolnePozice />
        <KarieraKontaktForm />
      </main>
      <Footer />
    </>
  )
}
