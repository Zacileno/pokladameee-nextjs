import Header from './components/Header'
import HeroSection from './components/HeroSection'
import SluzbySekce from './components/SluzbySekce'
import JakToFunguje from './components/JakToFunguje'
import RemeselnikSekce from './components/RemeselnikSekce'
import GalerieSekce from './components/GalerieSekce'
import VyhodyBadge from './components/VyhodyBadge'
import ReferenceSekce from './components/ReferenceSekce'
import KontaktSekce from './components/KontaktSekce'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SluzbySekce />
        <RemeselnikSekce />
        <GalerieSekce />
        <JakToFunguje />
        <VyhodyBadge />
        <ReferenceSekce />
        <KontaktSekce />
      </main>
      <Footer />
    </>
  )
}
