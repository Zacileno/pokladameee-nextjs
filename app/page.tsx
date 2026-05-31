import { client, NASTAVENI_QUERY } from '../lib/sanity'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import VyhodySekce from './components/VyhodySekce'
import SluzbySekce from './components/SluzbySekce'
import JakToFunguje from './components/JakToFunguje'
import GalerieSekce from './components/GalerieSekce'
import RemeselnikSekce from './components/RemeselnikSekce'
import VyhodyBadge from './components/VyhodyBadge'
import ReferenceSekce from './components/ReferenceSekce'
import KontaktSekce from './components/KontaktSekce'
import Footer from './components/Footer'

export const revalidate = 3600

type Nastaveni = {
  heroFotka?: { asset: { url: string } }
  telefon?: string
  email?: string
}

export default async function Home() {
  let nastaveni: Nastaveni | null = null
  try {
    nastaveni = await client.fetch<Nastaveni>(NASTAVENI_QUERY)
  } catch {}

  return (
    <>
      <Header />
      <main>
        <HeroSection heroFotkaUrl={nastaveni?.heroFotka?.asset?.url} />
        <VyhodySekce />
        <SluzbySekce />
        <JakToFunguje />
        <GalerieSekce />
        <RemeselnikSekce />
        <VyhodyBadge />
        <ReferenceSekce />
        <KontaktSekce />
      </main>
      <Footer />
    </>
  )
}
