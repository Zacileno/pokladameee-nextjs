import Header from './components/Header'
import HeroSection from './components/HeroSection'
import VyhodySekce from './components/VyhodySekce'
import SluzbySekce from './components/SluzbySekce'
import JakToFunguje from './components/JakToFunguje'
import GalerieSekce from './components/GalerieSekce'
import RemeselnikSekce from './components/RemeselnikSekce'
import ReferenceSekce from './components/ReferenceSekce'
import KontaktSekce from './components/KontaktSekce'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <VyhodySekce />
        <SluzbySekce />
        <JakToFunguje />
        <GalerieSekce />
        <RemeselnikSekce />
        <ReferenceSekce />
        <KontaktSekce />
      </main>
      <Footer />
    </>
  )
}
