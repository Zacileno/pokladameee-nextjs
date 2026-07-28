import type { Metadata } from 'next'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BenefityGrid from '@/app/components/BenefityGrid'
import RemeselnikSekce from '@/app/components/RemeselnikSekce'
import KontaktSekce from '@/app/components/KontaktSekce'
import FaqItem from './FaqItem'
import { client, PVC_PODLAHA_QUERY, KONTAKT_SEKCE_QUERY } from '@/lib/sanity'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'PVC podlaha — pokládka bez starostí',
  description: 'Profesionální pokládka PVC podlah v Moravskoslezském kraji. Zaměření a konzultace zdarma do 48 hodin, kompletní servis od výběru materiálu po úklid. Odvoz staré podlahy zdarma.',
  openGraph: {
    title: 'PVC podlaha — pokládka bez starostí | pokládámeee.cz',
    description: 'Profesionální pokládka PVC podlah v Moravskoslezském kraji. Zaměření zdarma do 48 hodin, kompletní servis od výběru materiálu po úklid.',
    url: 'https://www.pokladameee.cz/sluzby/pvc-podlaha',
  },
  alternates: { canonical: 'https://www.pokladameee.cz/sluzby/pvc-podlaha' },
}

const BENEFITY = [
  { emoji: '💰', nadpis: 'Cenově dostupné řešení', text: 'PVC nabízí skvělý poměr ceny a kvality. Získáte hezkou a funkční podlahu bez zbytečných nákladů — ideální volba, pokud chcete rozumně investovat.' },
  { emoji: '🦶', nadpis: 'Měkká a teplá na chůzi', text: 'Na rozdíl od tvrdších krytin je PVC příjemně měkké a teplé i bez bot. Oceníte to v ložnicích, dětských pokojích i obývacích prostorech.' },
  { emoji: '💧', nadpis: 'Voděodolná a snadná údržba', text: 'Stoprocentně voděodolná — ideální do koupelen, kuchyní i předsíní. Stačí pravidelné setření, žádná speciální chemie.' },
  { emoji: '🏢', nadpis: 'Univerzální nasazení', text: 'Hodí se do domácností i společných prostor, provozoven a komerčních objektů. Jedno řešení pro byt i firmu.' },
]

const KROKY = [
  { nadpis: 'Zaměření a konzultace zdarma', text: 'Do 48 h od poptávky přijedeme na místo, zhodnotíme podklad a poradíme s výběrem materiálu podle prostoru, zátěže i rozpočtu. Bez závazku.' },
  { nadpis: 'Vzorník, výběr a kalkulace na místě', text: 'Přivezeme vzorník PVC v různých dekorech a tloušťkách. Pomůžeme vybrat a cenu vám spočítáme rovnou na místě.' },
  { nadpis: 'Demontáž, příprava a pokládka', text: 'Odborně odstraníme starou podlahu, připravíme podklad a novou PVC podlahu profesionálně položíme — u jednodušších realizací obvykle za jeden den.' },
  { nadpis: 'Úklid a záruka', text: 'Po sobě uklidíme a odpad ekologicky zlikvidujeme. Na práci máte záruku — když se něco stane, voláte nás, ne výrobce ani dodavatele.' },
]

const ISTRIP = [
  { emoji: '📏', text: 'Zaměření do 48 hodin' },
  { emoji: '💧', text: 'Voděodolné a snadná údržba' },
  { emoji: '🦶', text: 'Měkké a teplé na chůzi' },
  { emoji: '💰', text: 'Cenově dostupné řešení' },
  { emoji: '🏢', text: 'Domácnosti i komerční prostory' },
]

const TYPY = [
  {
    nazev: 'PVC lepená podlaha',
    badge: 'Nejpopulárnější volba',
    popis: 'PVC lepená podlaha se připevní k podkladu speciálním lepidlem. Nabízí maximální stabilitu, vynikající zvukový komfort a je ideální pro koupelny, kuchyně a obchodní prostory. Jsou to řešení s dlouhodobou životností a snadnou údržbou.',
    vyhody: [
      'Maximální stabilita a tichá chůze',
      'Vhodná pro podlahové topení',
      'Jednoduchá údržba a čistění',
      'Odolná proti vlhkosti a chemikáliím',
    ],
    barva: 'orange',
  },
  {
    nazev: 'PVC plovoucí (click)',
    badge: '',
    popis: 'PVC click podlaha se spojuje zámkovým systémem bez lepidla. Umožňuje rychlejší montáž a je snadnější ji opravit. Vhodná do obývacích pokojů, ložnic a kancelářských prostor. Výhodná pro ty, kdo chtějí snadnou demontáž.',
    vyhody: [
      'Rychlá a čistá montáž bez lepidla',
      'Snadná výměna poškozených dílů',
      'Vhodná pro DIY demontáž',
      'Nižší cena než lepená varianta',
    ],
    barva: 'blue',
  },
]

const FAQ = [
  {
    otazka: 'Jaký je rozdíl mezi PVC a vinylem?',
    odpoved: 'PVC je robustnější a vydržuje vyšší zátěž. Je vhodná do náročnějších prostor — kuchyní, garáží, komerčních budov. Vinyl je měkčí, jemnější a více vhodný pro obytné prostory. Jsou to dva různé materiály s různými vlastnostmi a cenou.',
  },
  {
    otazka: 'Jak dlouho trvá pokládka PVC podlahy?',
    odpoved: 'Záleží na velikosti plochy a přípravě podkladu. Průměrný pokoj (20–25 m²) zvládneme za jeden den. Počítejte s tím, že zahrnujeme demontáž staré podlahy a úklid. Přesný čas domluvíme při zaměření.',
  },
  {
    otazka: 'Je PVC vhodná do koupelny?',
    odpoved: 'Ano, PVC je ideální do koupelny. Je 100% voděodolná a odolná vůči chemikáliím (šampóny, gely). Neotupuje se, neabsorbuje vlhkost a nekažuje se. V koupelně jí nevidím lepší variantu.',
  },
  {
    otazka: 'Funguje PVC s podlahovým topením?',
    odpoved: 'Lepená PVC je kompatibilní s teplovodním i elektrickým podlahovým topením. Click (plovoucí) variantu s topením kombinovat nedoporučujeme — raději volte lepenou. Vždy je možné domluvit si speciální varianty.',
  },
  {
    otazka: 'Jak se údržuje PVC podlaha?',
    odpoved: 'Velmi jednoduše. Pravidelný smetení nebo vysavač. Na špinavé místo — vlhký mop s trochou neutrálního saponátu. Žádné vosky, zářidla nebo agresivní chemikálie. PVC vydržuje i průmyslové čistidla, pokud bude třeba.',
  },
]

type Typ = { nazev?: string; badge?: string; popis?: string; vyhody?: string[]; barva?: string }
type Krok = { nadpis?: string; text?: string }
type Istrip = { emoji?: string; text?: string }
type Benefit = { emoji?: string; nadpis?: string; text?: string }
type FaqEntry = { otazka?: string; odpoved?: string }

type PvcData = {
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

export default async function PvcPodlahaPage() {
  let data: PvcData | null = null
  let kontaktSekce: any = null
  try {
    ;[data, kontaktSekce] = await Promise.all([
      client.fetch<PvcData>(PVC_PODLAHA_QUERY),
      client.fetch(KONTAKT_SEKCE_QUERY),
    ])
  } catch {}

  const heroNadpis = data?.heroNadpis || 'PVC podlaha — pokládka bez starostí'
  const heroPodnadpis = data?.heroPodnadpis || 'Praktická, cenově dostupná a příjemně teplá na chůzi. PVC podlahu vám kompletně vyřešíme od zaměření po úklid — bez shánění materiálu, řemeslníků nebo odvozu odpadu. Ozvěte se a do 48 hodin přijedeme změřit, poradit a nacenit přímo na místě.'
  const heroBadge = data?.heroBadge || '🚛 Odvoz staré podlahy zdarma'
  const heroFotkaUrl = data?.heroFotkaUrl || null

  const istrip = data?.istrip?.length ? data.istrip : ISTRIP
  const typyNadpis = data?.typyNadpis || 'Typy PVC podlah'
  const typyPodnadpis = data?.typyPodnadpis || 'PVC existuje v mnoha tloušťkách a jakostech. Pomůžeme vám vybrat tu pravou pro vás.'
  const typy = data?.typy?.length ? data.typy : TYPY

  const benefityNadpis = data?.benefityNadpis || 'Proč zvolit PVC podlahu?'
  const benefity = data?.benefity?.length ? data.benefity : BENEFITY

  const krokyNadpis = data?.krokyNadpis || 'Jak to probíhá'
  const krokyPodnadpis = data?.krokyPodnadpis || 'Od prvního kontaktu po hotovou podlahu — bez stresu a bez překvapení.'
  const kroky = data?.kroky?.length ? data.kroky : KROKY

  const referenceHodnoceni = data?.referenceHodnoceni ?? 4.9
  const referenceCitace = data?.referenceCitace || 'PVC podlahu si vybrala naše rodinná firma na průmyslovém skladě. Je odolná, snadná na údržbu a už 3 roky je bez jediné vady. Doporučuju ji všem, kdo hledají praktické řešení.'
  const referenceJmeno = data?.referenceJmeno || 'Jan M. — Havířov, průmyslová zóna'

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
                PVC podlahy · MSK
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
                <a href="#kontakt" className="btn-primary" style={{ borderRadius: 10, padding: '15px 28px' }}>
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
