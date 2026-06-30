import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BenefityGrid from '@/app/components/BenefityGrid'
import RemeselnikSekce from '@/app/components/RemeselnikSekce'
import KontaktSekce from '@/app/components/KontaktSekce'
import FaqItem from './FaqItem'
import { client, VINYLOVA_PODLAHA_QUERY, KONTAKT_SEKCE_QUERY } from '@/lib/sanity'

export const revalidate = 0

const BENEFITY = [
  { emoji: '💧', nadpis: 'Voděodolný', text: 'Odolává vlhkosti — vhodný do koupelny, kuchyně i předsíně' },
  { emoji: '🔇', nadpis: 'Tichý a příjemný', text: 'Tlumí kroky, příjemný na chůzi, teplý na dotek' },
  { emoji: '🎨', nadpis: 'Stovky dekorů', text: 'Imitace dřeva, kamene, betonu i moderní neutrální odstíny' },
  { emoji: '🏠', nadpis: 'Podlahové topení', text: 'Kompatibilní s teplovodním i elektrickým vytápěním (lepená verze)' },
]

const KROKY = [
  { nadpis: 'Zavoláte nebo napíšete', text: 'Do 48 h přijedeme na zaměření — bez závazku a zdarma.' },
  { nadpis: 'Vyberete materiál', text: 'Přivezeme vzorník UpFloor, poradíme s výběrem a barvou.' },
  { nadpis: 'Položíme a uklidíme', text: 'Profesionální pokládka, odpad ekologicky zlikvidujeme.' },
]

const ISTRIP = [
  { emoji: '📐', text: 'Zaměření zdarma' },
  { emoji: '⚡', text: 'U vás do 48 hodin' },
  { emoji: '🚛', text: 'Odvoz staré podlahy zdarma' },
  { emoji: '🛡️', text: 'Záruka na práci' },
  { emoji: '📍', text: 'Celý Moravskoslezský kraj' },
]

const TYPY = [
  {
    nazev: 'Vinylová lepená podlaha',
    badge: 'Naše hlavní specializace',
    popis: 'Lepený vinyl se přilepí přímo k podkladu speciálním lepidlem. Je stabilní, tichý a ideální pro podlahové topení. Pracujeme primárně s kolekcí UpFloor.',
    vyhody: ['Vhodný pro podlahové topení', 'Maximální stabilita a ticho', 'Do koupelny, kuchyně i předsíně'],
    barva: 'orange',
  },
  {
    nazev: 'Plovoucí vinyl (click)',
    badge: '',
    popis: 'Click vinyl se spojuje zámkovým systémem bez lepidla. Rychlá montáž, snadná výměna. Vhodný do obývacích pokojů, ložnic a dětských pokojů.',
    vyhody: ['Rychlá a čistá montáž', 'Snadná oprava poškozených dílů', 'Vhodný pro DIY demontáž'],
    barva: 'blue',
  },
]

const FAQ = [
  {
    otazka: 'Jaký je rozdíl mezi lepeným a plovoucím vinylem?',
    odpoved: 'Lepený vinyl se přilepí přímo k podkladu — je stabilnější, tišší a ideální pro podlahové topení. Plovoucí (click) vinyl se spojuje zámkovým systémem bez lepidla, takže je rychlejší na montáž a snáze se vyměňuje. Pro většinu domácností doporučujeme lepenou variantu UpFloor.',
  },
  {
    otazka: 'Jak dlouho trvá pokládka podlahy?',
    odpoved: 'Průměrný pokoj (20–25 m²) zvládneme za jeden pracovní den. Počítejte s tím, že zahrnujeme i demontáž staré podlahy a přípravu podkladu. Přesný harmonogram domluvíme na zaměření.',
  },
  {
    otazka: 'Musím si zajistit odvoz staré podlahy?',
    odpoved: 'Ne — odvoz a ekologická likvidace staré podlahy je součástí naší ceny. Nemusíte řešit kontejner ani odvoz.',
  },
  {
    otazka: 'Je vinylová podlaha vhodná do koupelny?',
    odpoved: 'Ano, lepený vinyl je 100% voděodolný a výborně snáší vlhkost. Používáme ho pravidelně do koupelen, kuchyní i předsíní. Plovoucí variantu do trvale vlhkých prostor nedoporučujeme.',
  },
  {
    otazka: 'Funguje vinyl s podlahovým topením?',
    odpoved: 'Lepená vinylová podlaha je plně kompatibilní s teplovodním i elektrickým podlahovým topením. Plovoucí variantu s topením kombinovat nelze — u té doporučujeme jiný materiál.',
  },
]

type Typ = { nazev?: string; badge?: string; popis?: string; vyhody?: string[]; barva?: string }
type Krok = { nadpis?: string; text?: string }
type Istrip = { emoji?: string; text?: string }
type Benefit = { emoji?: string; nadpis?: string; text?: string }
type FaqEntry = { otazka?: string; odpoved?: string }

type VinylData = {
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

export default async function VinylovaPodlahaPage() {
  let data: VinylData | null = null
  let kontaktSekce: any = null
  try {
    ;[data, kontaktSekce] = await Promise.all([
      client.fetch<VinylData>(VINYLOVA_PODLAHA_QUERY),
      client.fetch(KONTAKT_SEKCE_QUERY),
    ])
  } catch {}

  const heroNadpis = data?.heroNadpis || 'Vinylová podlaha — pokládka a montáž'
  const heroPodnadpis = data?.heroPodnadpis || 'Lepená i plovoucí — přijedeme zaměřit do 48 hodin, poradíme s výběrem a profesionálně položíme.'
  const heroBadge = data?.heroBadge || '🚛 Odvoz staré podlahy zdarma'
  const heroFotkaUrl = data?.heroFotkaUrl || null

  const istrip = data?.istrip?.length ? data.istrip : ISTRIP
  const typyNadpis = data?.typyNadpis || 'Typy vinylových podlah'
  const typyPodnadpis = data?.typyPodnadpis || 'Pomůžeme vybrat variantu, která sedí vašemu prostoru a životnímu stylu.'
  const typy = data?.typy?.length ? data.typy : TYPY

  const benefityNadpis = data?.benefityNadpis || 'Proč zvolit vinylovou podlahu?'
  const benefity = data?.benefity?.length ? data.benefity : BENEFITY

  const krokyNadpis = data?.krokyNadpis || 'Jak to probíhá'
  const krokyPodnadpis = data?.krokyPodnadpis || 'Od prvního kontaktu po hotovou podlahu — bez stresu.'
  const kroky = data?.kroky?.length ? data.kroky : KROKY

  const referenceHodnoceni = data?.referenceHodnoceni ?? 4.8
  const referenceCitace = data?.referenceCitace || 'Adam přijel den po zavolání, zaměřil a rovnou přivezl vzorník. Podlahu položili za jeden den, uklidili po sobě a stará dlažba zmizela. Doporučuju.'
  const referenceJmeno = data?.referenceJmeno || 'Markéta K. — Ostrava'

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
                Vinylové podlahy · MSK
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
                <a href="tel:+420739229922" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.12)', color: 'white',
                  fontWeight: 700, fontSize: 16, padding: '14px 24px',
                  borderRadius: 10, border: '1px solid rgba(255,255,255,0.25)',
                  textDecoration: 'none', transition: 'background 0.2s',
                }}>
                  📞 +420 739 229 922
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
