import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BrandIcon from '@/app/components/BrandIcon'
import SluzbySekce from '@/app/components/SluzbySekce'
import RemeselnikSekce from '@/app/components/RemeselnikSekce'
import KontaktSekce from '@/app/components/KontaktSekce'
import KulturaGrid from '@/app/kariera/components/KulturaGrid'
import TestimonialCarousel from '@/app/kariera/components/TestimonialCarousel'
import { client, SLUZBY_SEKCE_QUERY, RODINA_ZNACEK_QUERY, KONTAKT_SEKCE_QUERY } from '@/lib/sanity'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'O nás',
  description: 'Kdo jsme a za čím si stojíme. Pokládámeee.cz patří do rodiny značek eee spolu s Malujemeee a Žaluzieee — vracíme dobré jméno řemeslu v Moravskoslezském, Zlínském a Olomouckém kraji.',
  openGraph: {
    title: 'O nás | pokládámeee.cz',
    description: 'Kdo jsme a za čím si stojíme. Vracíme dobré jméno řemeslu.',
    url: 'https://www.pokladameee.cz/o-nas',
  },
  alternates: { canonical: 'https://www.pokladameee.cz/o-nas' },
}

const FOTO = (id: string) => `https://cdn.sanity.io/images/8cvsenqb/production/${id}.jpg?w=1600&auto=format`

// struktura podle žaluzieee.cz/o-nas — texty k odsouhlasení
const HODNOTY = [
  { emoji: '🛠', nadpis: <>Vracím<span>eee</span> dobré jméno řemeslu</>, text: 'Dobře položená podlaha je stejně důležitá jako férová domluva a dodržený termín. Postaráme se o vše na klíč — od zaměření po úklid — a vy nemusíte nic řešit.' },
  { emoji: '🏡', nadpis: 'Podlaha bez zbytečných starostí', text: 'Přijedeme, zaměříme a poradíme s výběrem. Starou podlahu odvezeme, připravíme podklad, položíme novou a po sobě uklidíme.' },
  { emoji: '🛡', nadpis: 'Důvěra a spolehlivost', text: 'Nehledáme výmluvy, hledáme řešení. Ať jde o kolegu, nebo zákazníka — dané slovo platí. Zákazník nám svěřuje podlahu svého domova.' },
  { emoji: '🤝', nadpis: 'Přátelské a profi prostředí', text: 'Každý z nás má svou roli. Spojujeme profesionalitu s přátelským přístupem — lidé se u nás cítí dobře a odvádějí špičkovou práci.' },
]

const ZASADY = [
  { zaklad: 'Rostem', text: 'Pomáháme si a učíme se jeden od druhého. Každá zakázka nás posune o kus dál.' },
  { zaklad: 'Inovujem', text: 'Zkoušíme nové postupy, materiály i nástroje, aby byla práce rychlejší a podlaha vydržela déle.' },
  { zaklad: 'Spolupracujem', text: 'Neumíš? Naučíme tě. Nemůžeš? Pomůžeme ti. Nechceš? Tak to spolu nepůjde.' },
  { zaklad: 'Nesoudím', text: 'Nasloucháme s respektem a bez předsudků — kolegům i zákazníkům.' },
  { zaklad: 'Dodržujem', text: 'Chodíme včas, držíme termíny a uděláme i to, do čeho se zrovna nikomu nechce.' },
]

const CISLA = [
  ['35 000+', 'spokojených klientů v rodině značek eee'],
  ['3 kraje', 'Moravskoslezský, Zlínský a Olomoucký'],
  ['0 Kč', 'za zaměření a odvoz staré podlahy'],
]

export default async function ONasPage() {
  let sluzbySekce: any = null
  let rodinaZnacek: any = null
  let kontaktSekce: any = null
  try {
    ;[sluzbySekce, rodinaZnacek, kontaktSekce] = await Promise.all([
      client.fetch(SLUZBY_SEKCE_QUERY),
      client.fetch(RODINA_ZNACEK_QUERY),
      client.fetch(KONTAKT_SEKCE_QUERY),
    ])
  } catch {}

  return (
    <>
      <Header />
      <main>
        {/* ÚVOD — fotka s tmavým překryvem jako na homepage */}
        <section className="onas-hero">
          <Image src={FOTO('7be65aebfe541d2cc4660c6ce2eab9a53ae66305-1800x1200')} alt="Nová podlaha od pokládámeee.cz" fill priority unoptimized style={{ objectFit: 'cover' }} />
          <div className="container onas-hero-obsah">
            <p className="onas-stitek">O nás</p>
            <h1>S podlahami měním<span>eee</span> domovy.</h1>
            <p className="onas-hero-podnadpis">A taky to, jak se v nich žije.</p>
            <p className="onas-hero-text">
              Spojuje nás hrdost na dobře odvedenou práci. Věříme, že pěkný domov dělá lepší každý den — proto pokládáme podlahy tak, abyste z nich měli radost roky.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#kontakt" className="btn-primary">Nezávazná konzultace</a>
              <a href="/kariera" className="btn-secondary">Zajímá mě práce u vás</a>
            </div>
          </div>
        </section>

        {/* NÁŠ PŘÍBĚH */}
        <section className="section">
          <div className="container onas-pribeh">
            <div>
              <p className="onas-stitek">Náš příběh</p>
              <h2 className="section-title">Kdo jsm<span>eee</span>?</h2>
              <p className="onas-odstavec">
                Pokládámeee patří do rodiny značek <strong>eee</strong> — spolu s Malujemeee a Žaluzieee. Všechny vznikly se stejným cílem: <strong>vrátit řemeslu dobré jméno</strong>. Žádné nedodržené termíny, žádný nepořádek po odchodu, žádné výmluvy.
              </p>
              <p className="onas-odstavec">
                U nás to znamená podlahy. Vinyl, PVC, koberce i dřevo pokládáme v bytech, rodinných domech, firmách i bytových družstvech. Na každou zakázku máte jednoho člověka, který ji vede od zaměření až po úklid.
              </p>
              <div className="onas-zakladatel">
                <Image src="/assets/adam.jpg" alt="Adam Hajdušek" width={64} height={64} />
                <div>
                  <strong>Adam Hajdušek</strong>
                  <span>Zakladatel & hlavní technik</span>
                </div>
              </div>
            </div>
            <div className="onas-cisla">
              {CISLA.map(([cislo, popis]) => (
                <div key={cislo} className="onas-cislo">
                  <strong>{cislo}</strong>
                  <span>{popis}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HODNOTY */}
        <section className="section" style={{ background: 'var(--gray-50)' }}>
          <div className="container">
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 48 }}>Na čem nám záleží</h2>
            <div className="onas-hodnoty">
              {HODNOTY.map(h => (
                <div key={h.emoji} className="onas-hodnota">
                  <BrandIcon emoji={h.emoji} size={64} />
                  <div>
                    <h3>{h.nadpis}</h3>
                    <p>{h.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ZÁSADY */}
        <section className="section">
          <div className="container">
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 48 }}>Za čím si stojím<span>eee</span></h2>
            <div className="onas-zasady">
              {ZASADY.map(z => (
                <div key={z.zaklad} className="onas-zasada">
                  <h3>{z.zaklad}<span>eee</span></h3>
                  <p>{z.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <KulturaGrid />
        <TestimonialCarousel />
        <SluzbySekce data={sluzbySekce} />

        {/* RÁDI PORADÍME */}
        <section className="section">
          <div className="container onas-poradime">
            <div className="onas-poradime-foto">
              <Image src={FOTO('fde870bd40794f73f8a532a8ad29ceb69d7093d5-1500x2000')} alt="Hotová podlaha v rodinném domě — Stanislavice" fill unoptimized style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <p className="onas-stitek">Rádi poradím<span>eee</span></p>
              <h2 className="section-title">Podlahu na míru uděláme i vám</h2>
              <p className="onas-odstavec">
                Přijedeme k vám, zaměříme a poradíme s výběrem materiálu, barvy i vzoru. Starou podlahu odstraníme a odvezeme, novou položíme a po sobě uklidíme.
              </p>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="#kontakt" className="btn-primary">Nezávazná konzultace</a>
                <a href="/kariera" className="cp-blok-odkaz">Zajímá mě práce u vás →</a>
              </div>
            </div>
          </div>
        </section>

        <KontaktSekce kontakt={kontaktSekce} />
        <RemeselnikSekce data={rodinaZnacek} />
      </main>
      <Footer />
    </>
  )
}
