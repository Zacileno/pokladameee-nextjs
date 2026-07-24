import type { Metadata } from 'next'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BenefityGrid from '@/app/components/BenefityGrid'
import RemeselnikSekce from '@/app/components/RemeselnikSekce'
import KontaktSekce from '@/app/components/KontaktSekce'
import FaqItem from './FaqItem'
import { client, KOBERCOVA_PODLAHA_QUERY, KONTAKT_SEKCE_QUERY } from '@/lib/sanity'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Koberce — pokládka bez starostí',
  description: 'Profesionální pokládka koberců v Moravskoslezském kraji. Zaměření a konzultace zdarma do 48 hodin, kompletní servis od výběru materiálu po úklid. Odvoz staré podlahy zdarma.',
  openGraph: {
    title: 'Koberce — pokládka bez starostí | pokládámeee.cz',
    description: 'Profesionální pokládka koberců v Moravskoslezském kraji. Zaměření zdarma do 48 hodin, kompletní servis od výběru materiálu po úklid.',
    url: 'https://www.pokladameee.cz/sluzby/koberce',
  },
  alternates: { canonical: 'https://www.pokladameee.cz/sluzby/koberce' },
}

const BENEFITY = [
  { emoji: '🧶', nadpis: 'Teplo a komfort', text: 'Koberec izoluje teplo a je příjemný na dotek i bosou nohou. V zimě znatelně snižuje pocit chladu z podlahy.' },
  { emoji: '🔇', nadpis: 'Tlumí hluk', text: 'Skvěle pohlcuje zvuk kroků i akustiku místnosti. Ideální do bytů, kanceláří a místností nad obytnými prostory.' },
  { emoji: '🎨', nadpis: 'Stovky vzorů a barev', text: 'Od jednobarevných po vzorované, od krátkého vlasu po plyšový — najdeme koberec přesně podle vašeho interiéru.' },
  { emoji: '🏢', nadpis: 'Univerzální nasazení', text: 'Hodí se do bytů, rodinných domů i kanceláří a hotelových prostor — jedno řešení pro domácnost i firmu.' },
]

const KROKY = [
  { nadpis: 'Zaměření a konzultace zdarma', text: 'Do 48 h od poptávky přijedeme na místo, zhodnotíme podklad a poradíme s výběrem materiálu podle využití místnosti i rozpočtu. Bez závazku.' },
  { nadpis: 'Vzorník, výběr a kalkulace na místě', text: 'Přivezeme vzorník koberců — vlna, polypropylen, nylon, různé výšky vlasu i barvy. Cenu vám spočítáme rovnou na místě.' },
  { nadpis: 'Demontáž, příprava a pokládka', text: 'Odborně odstraníme starou podlahu, připravíme podklad a koberec profesionálně nainstalujeme — natažení nebo lepení, přesné řezy u stěn a dveří.' },
  { nadpis: 'Úklid a záruka', text: 'Po sobě uklidíme a odpad ekologicky zlikvidujeme. Na práci máte záruku — když se něco stane, voláte nás, ne výrobce ani dodavatele.' },
]

const ISTRIP = [
  { emoji: '📏', text: 'Zaměření do 48 hodin' },
  { emoji: '🧶', text: 'Teplo a komfort pod nohama' },
  { emoji: '🔇', text: 'Tlumí hluk a kroky' },
  { emoji: '🎨', text: 'Stovky vzorů a barev' },
  { emoji: '🏢', text: 'Domácnosti i komerční prostory' },
]

const TYPY = [
  {
    nazev: 'Koberec celoplošně lepený',
    badge: 'Nejpopulárnější volba',
    popis: 'Koberec se po celé ploše přilepí k podkladu. Nabízí maximální stabilitu, nehýbe se ani se nevlní a skvěle tlumí kročejový hluk. Ideální pro kanceláře, hotely, chodby a prostory s vysokým provozem.',
    vyhody: [
      'Maximální stabilita — nehýbe se ani se nevlní',
      'Vynikající tlumení kročejového hluku',
      'Vhodný do prostor s vysokým provozem',
      'Dlouhá životnost při správné péči',
    ],
    barva: 'orange',
  },
  {
    nazev: 'Koberec volně položený (na podložce)',
    badge: '',
    popis: 'Koberec leží volně na podložce, která zajišťuje měkkost a lepší tepelnou izolaci. Snadno se vymění nebo přemístí. Vhodný do ložnic, obývacích pokojů a dětských pokojů, kde oceníte příjemný došlap.',
    vyhody: [
      'Měkčí a příjemnější došlap',
      'Snadná výměna nebo přemístění',
      'Lepší tepelná izolace díky podložce',
      'Nižší cena instalace',
    ],
    barva: 'blue',
  },
]

const FAQ = [
  {
    otazka: 'Jaký koberec je nejvhodnější do ložnice?',
    odpoved: 'Do ložnice doporučujeme měkčí koberec s vyšším vlasem, ideálně z vlny nebo kvalitního polypropylenu. Zajistí příjemný došlap a dobrou tepelnou izolaci. Volně položený na podložce je zde nejčastější volba.',
  },
  {
    otazka: 'Je koberec vhodný pro alergiky?',
    odpoved: 'Moderní koberce s hustým vlasem naopak zachytávají prach a alergeny, které pak stačí odstranit pravidelným vysáváním. Doporučujeme kvalitní vysavač s HEPA filtrem a pravidelné čištění. U silných alergií raději volte hladké povrchy.',
  },
  {
    otazka: 'Jak dlouho koberec vydrží?',
    odpoved: 'Kvalitní celoplošně lepený koberec při běžném provozu vydrží 10–15 let, u nižší zátěže i déle. Životnost ovlivňuje materiál, hustota vlasu a pravidelná údržba.',
  },
  {
    otazka: 'Jak se koberec čistí a udržuje?',
    odpoved: 'Základ je pravidelné vysávání, ideálně 2–3× týdně. Skvrny odstraňujte ihned vlhkým hadříkem, jednou za rok doporučujeme strojové čištění. Vyvarujte se agresivních chemikálií, které mohou poškodit vlákna.',
  },
  {
    otazka: 'Můžu koberec položit na podlahové topení?',
    odpoved: 'Ano, ale je potřeba zvolit tenčí koberec s nižším tepelným odporem, aby teplo mohlo procházet do místnosti. Doporučujeme se poradit při zaměření — vybereme materiál, který s topením funguje bez problémů.',
  },
]

type Typ = { nazev?: string; badge?: string; popis?: string; vyhody?: string[]; barva?: string }
type Krok = { nadpis?: string; text?: string }
type Istrip = { emoji?: string; text?: string }
type Benefit = { emoji?: string; nadpis?: string; text?: string }
type FaqEntry = { otazka?: string; odpoved?: string }

type KobercovaData = {
  heroNadpis?: string
  heroPodnadpis?: string
  heroBadge?: string
  heroFotkaUrl?: string
  istrip?: Istrip[]
  typyNadpis?: string
  typyPodnadpis?: string
  typy?: Typ[]
  benefityNadpis?: string
  benefity?: Benefit[]
  krokyNadpis?: string
  krokyPodnadpis?: string
  kroky?: Krok[]
  referenceHodnoceni?: number
  referenceCitace?: string
  referenceJmeno?: string
  faq?: FaqEntry[]
}

export default async function KobercovaPodlahaPage() {
  let data: KobercovaData | null = null
  let kontaktSekce: any = null
  try {
    ;[data, kontaktSekce] = await Promise.all([
      client.fetch<KobercovaData>(KOBERCOVA_PODLAHA_QUERY),
      client.fetch(KONTAKT_SEKCE_QUERY),
    ])
  } catch {}

  const heroNadpis = data?.heroNadpis || 'Koberce — pokládka bez starostí'
  const heroPodnadpis = data?.heroPodnadpis || 'Teplo pod nohama, tlumení hluku a nekonečná škála barev a vzorů. Koberec vám kompletně vyřešíme od zaměření po úklid — bez shánění materiálu, řemeslníků nebo odvozu odpadu. Ozvěte se a do 48 hodin přijedeme změřit, poradit a nacenit přímo na místě.'
  const heroBadge = data?.heroBadge || '🚛 Odvoz staré podlahy zdarma'
  const heroFotkaUrl = data?.heroFotkaUrl || null

  const istrip = data?.istrip?.length ? data.istrip : ISTRIP
  const typyNadpis = data?.typyNadpis || 'Typy kobercových podlah'
  const typyPodnadpis = data?.typyPodnadpis || 'Koberce existují v mnoha materiálech a technikách pokládky. Pomůžeme vám vybrat ten pravý pro vás.'
  const typy = data?.typy?.length ? data.typy : TYPY

  const benefityNadpis = data?.benefityNadpis || 'Proč zvolit koberec?'
  const benefity = data?.benefity?.length ? data.benefity : BENEFITY

  const krokyNadpis = data?.krokyNadpis || 'Jak to probíhá'
  const krokyPodnadpis = data?.krokyPodnadpis || 'Od prvního kontaktu po hotovou podlahu — bez stresu a bez překvapení.'
  const kroky = data?.kroky?.length ? data.kroky : KROKY

  const referenceHodnoceni = data?.referenceHodnoceni ?? 4.9
  const referenceCitace = data?.referenceCitace || 'Koberec jsme řešili do dětského pokoje a ložnice. Kluci od pokládámeee byli rychlí, čistí a poradili nám s výběrem materiálu, který zvládne i domácí mazlíčky. Výsledek je krásný a příjemný na chození.'
  const referenceJmeno = data?.referenceJmeno || 'Petra K. — Ostrava, rodinný dům'

  const faq = data?.faq?.length ? data.faq : FAQ

  return (
    <>
      <Header opaque />

      {/* HERO */}
      <section style={{ background: 'var(--blue)', paddingTop: 100, paddingBottom: 0, overflow: 'hidden' }}>
        <div className="container">
          <div className="hero-sluzby-grid" style={{ paddingBottom: 64 }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '2px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 16 }}>
                Koberce · MSK
              </p>
              <h1 style={{ fontSize: 'clamp(36px, 5vw, 54px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 20 }}>
                {heroNadpis}
              </h1>
              <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: 12, maxWidth: 520 }}>
                {heroPodnadpis}
              </p>
              <p style={{ fontSize: 15, color: 'var(--orange)', fontWeight: 700, marginBottom: 36 }}>
                {heroBadge}
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="/#kontakt" className="btn-primary" style={{ borderRadius: 10, padding: '15px 28px' }}>
                  Nezávazná poptávka →
                </a>
                <a href="tel:+420730454309" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.12)', color: 'white',
                  fontWeight: 700, fontSize: 16, padding: '14px 24px',
                  borderRadius: 10, border: '1px solid rgba(255,255,255,0.25)',
                  textDecoration: 'none', transition: 'background 0.2s',
                }}>
                  📞 +420 730 454 309
                </a>
              </div>
            </div>
            {/* Foto realizace / placeholder */}
            {heroFotkaUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={heroFotkaUrl}
                alt={heroNadpis}
                style={{ borderRadius: '12px 12px 0 0', width: '100%', height: '100%', objectFit: 'cover', minHeight: 320 }}
              />
            ) : (
              <div style={{
                background: 'rgba(255,255,255,0.07)',
                borderRadius: '12px 12px 0 0',
                minHeight: 320,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.3)', fontSize: 14, textAlign: 'center', padding: 32,
              }}>
                Foto realizace<br />(bude doplněno)
              </div>
            )}
          </div>
        </div>
      </section>

      {/* IKONOVÝ STRIP */}
      <section style={{ background: 'white', borderBottom: '1px solid var(--gray-100)' }}>
        <div className="container">
          <div className="sluzby-istripgrid">
            {istrip.map(({ emoji, text }, i) => (
              <div key={text || i} className="sluzby-istrip-item">
                <span style={{ fontSize: 28, flexShrink: 0 }}>{emoji}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-700)', lineHeight: 1.3 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TYPY PODLAH */}
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: 8 }}>{typyNadpis}</h2>
          <p className="section-subtitle" style={{ marginBottom: 40 }}>{typyPodnadpis}</p>
          <div className="typy-grid">
            {typy.map((t, i) => {
              const barva = t.barva === 'blue' ? 'var(--blue)' : 'var(--orange)'
              return (
                <div key={t.nazev || i} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 32, borderLeft: `4px solid ${barva}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: 20, fontWeight: 800 }}>{t.nazev}</h3>
                    {t.badge && (
                      <span style={{ background: barva, color: '#fff', fontWeight: 700, fontSize: 12, padding: '4px 12px', borderRadius: 100, whiteSpace: 'nowrap' }}>{t.badge}</span>
                    )}
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--gray-700)', marginBottom: 16 }}>
                    {t.popis}
                  </p>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {(t.vyhody || []).map(v => (
                      <li key={v} style={{ fontSize: 14, color: 'var(--gray-700)', display: 'flex', gap: 8 }}>
                        <span style={{ color: barva, fontWeight: 700 }}>✓</span>{v}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <BenefityGrid benefity={benefity as { emoji: string; nadpis: string; text: string }[]} nadpisSecce={benefityNadpis} />

      {/* JAK TO PROBÍHÁ */}
      <section className="section" style={{ background: '#FFF5E8' }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: 8 }}>{krokyNadpis}</h2>
          <p className="section-subtitle" style={{ marginBottom: 40 }}>{krokyPodnadpis}</p>
          <div className="kroky-grid">
            {kroky.map((k, i) => (
              <div key={k.nadpis || i} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', background: 'var(--orange)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 900, fontSize: 20, flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{k.nadpis}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--gray-700)' }}>{k.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REFERENCE STRIP */}
      <section className="section" style={{ background: 'var(--blue)' }}>
        <div className="container">
          <div className="sluzby-ref-grid">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 72, fontWeight: 900, color: 'white', lineHeight: 1 }}>{referenceHodnoceni.toFixed(1)}</div>
              <div style={{ display: 'flex', gap: 4, justifyContent: 'center', margin: '8px 0' }}>
                {[1,2,3,4,5].map(i => (
                  <span key={i} style={{ fontSize: 22, color: '#FBBC04', opacity: i === 5 ? 0.4 : 1 }}>★</span>
                ))}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 16 }}>Hodnocení zákazníků</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>G</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600 }}>Google recenze</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 64, color: 'var(--orange)', lineHeight: 0, marginBottom: 24, fontFamily: 'Georgia, serif' }}>&quot;</div>
              <p style={{ fontSize: 18, fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', lineHeight: 1.7, marginBottom: 20 }}>
                {referenceCitace}
              </p>
              <p style={{ fontWeight: 700, color: 'var(--orange)' }}>{referenceJmeno}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 8 }}>Časté otázky</h2>
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 48px' }}>Odpovídáme na to, co zákazníci řeší nejčastěji.</p>
          <div className="faq-list">
            {faq.map((f, i) => (
              <FaqItem key={f.otazka || i} otazka={f.otazka || ''} odpoved={f.odpoved || ''} />
            ))}
          </div>
        </div>
      </section>

      <RemeselnikSekce />

      <KontaktSekce kontakt={kontaktSekce} />

      <Footer />
    </>
  )
}
