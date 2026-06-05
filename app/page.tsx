import {
  client,
  HERO_SEKCE_QUERY, HERO_IKONKY_QUERY,
  SLUZBY_SEKCE_QUERY, JAK_TO_FUNGUJE_QUERY,
  PROC_NAS_VYBRAT_QUERY, RODINA_ZNACEK_QUERY,
  OBECNE_NASTAVENI_QUERY, KONTAKT_SEKCE_QUERY,
} from '../lib/sanity'
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

export const revalidate = 0

export default async function Home() {
  let heroSekce: any = null
  let heroIkonkyData: any = null
  let sluzbySekce: any = null
  let jakToFungujeData: any = null
  let procNasVybratData: any = null
  let rodinaZnacekData: any = null
  let obecneNastaveni: any = null
  let kontaktSekce: any = null

  try {
    ;[heroSekce, heroIkonkyData, sluzbySekce, jakToFungujeData, procNasVybratData, rodinaZnacekData, obecneNastaveni, kontaktSekce] = await Promise.all([
      client.fetch(HERO_SEKCE_QUERY),
      client.fetch(HERO_IKONKY_QUERY),
      client.fetch(SLUZBY_SEKCE_QUERY),
      client.fetch(JAK_TO_FUNGUJE_QUERY),
      client.fetch(PROC_NAS_VYBRAT_QUERY),
      client.fetch(RODINA_ZNACEK_QUERY),
      client.fetch(OBECNE_NASTAVENI_QUERY),
      client.fetch(KONTAKT_SEKCE_QUERY),
    ])
  } catch {}

  return (
    <>
      <Header />
      <main>
        <HeroSection heroFotkaUrl={heroSekce?.heroFotka?.asset?.url} />
        <VyhodySekce ikonky={heroIkonkyData?.ikonky} />
        <SluzbySekce data={sluzbySekce} />
        <JakToFunguje data={jakToFungujeData} />
        <GalerieSekce />
        <RemeselnikSekce data={rodinaZnacekData} />
        <VyhodyBadge data={procNasVybratData} />
        <ReferenceSekce />
        <KontaktSekce kontakt={kontaktSekce} />
      </main>
      <Footer nastaveni={obecneNastaveni} />
    </>
  )
}
