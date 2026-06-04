import { client, HERO_SEKCE_QUERY, KONTAKT_SEKCE_QUERY } from '../lib/sanity'
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

type HeroSekce = {
  heroFotka?: { asset: { url: string } }
}

type KontaktSekceData = {
  nadpis?: string
  podnadpis?: string
  jmeno?: string
  role?: string
  citat?: string
  fotoUrl?: string
  telefon?: string
  email?: string
  pracovniDoba?: string
  region?: string
}

export default async function Home() {
  let heroSekce: HeroSekce | null = null
  let kontaktSekce: KontaktSekceData | null = null

  try {
    ;[heroSekce, kontaktSekce] = await Promise.all([
      client.fetch<HeroSekce>(HERO_SEKCE_QUERY),
      client.fetch<KontaktSekceData>(KONTAKT_SEKCE_QUERY),
    ])
  } catch {}

  return (
    <>
      <Header />
      <main>
        <HeroSection heroFotkaUrl={heroSekce?.heroFotka?.asset?.url} />
        <VyhodySekce />
        <SluzbySekce />
        <JakToFunguje />
        <GalerieSekce />
        <RemeselnikSekce />
        <VyhodyBadge />
        <ReferenceSekce />
        <KontaktSekce kontakt={kontaktSekce ?? undefined} />
      </main>
      <Footer />
    </>
  )
}
