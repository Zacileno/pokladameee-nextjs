import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import KontaktSekce from '@/app/components/KontaktSekce'
import Odpocet from '@/app/components/Odpocet'
import FormatovanyText from '@/app/components/FormatovanyText'
import AkcePopup from './AkcePopup'
import { BF_KONEC } from '@/lib/black-friday'
import { client, HERO_SEKCE_QUERY, VINYLOVA_PODLAHA_QUERY, PVC_PODLAHA_QUERY, KOBERCOVA_PODLAHA_QUERY, DREVENA_PODLAHA_QUERY, KONTAKT_SEKCE_QUERY, BLACK_FRIDAY_QUERY } from '@/lib/sanity'

export const revalidate = 0

type RT = { _type: 'block'; children?: { _type: 'span'; text: string; marks?: string[] }[] }[] | undefined

type BlackFridayData = {
  topBarOznaceni?: RT
  topBarSleva?: RT
  topBarZbytek?: RT
  topBarDovetek?: RT
  topBarCta?: RT
  heroBadge?: RT
  heroSleva?: RT
  heroNadpisZbytek?: RT
  heroPodnadpis?: RT
  heroTlacitko?: RT
  heroTlacitkoSekundarni?: RT
  heroFotkaUrl?: string
  bannerObrazekUrl?: string
  videoNadpis?: RT
  body?: { titul?: RT; text?: RT }[]
  odstavec?: RT
  zvyrazenyText?: RT
  ctaPopupText?: RT
  adamText?: RT
  produktyNadpis?: RT
  slevaBadge?: RT
  zdarmaPopisek?: RT
  seoTitle?: string
  seoDescription?: string
}

async function getData(): Promise<BlackFridayData> {
  try {
    return (await client.fetch<BlackFridayData>(BLACK_FRIDAY_QUERY)) || {}
  } catch {
    return {}
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData()
  const title = data.seoTitle || 'Black Friday – 25 % na podlahové krytiny'
  const description = data.seoDescription || 'Black Friday na pokládámeee.cz: sleva 25 % na vinylové, PVC, dřevěné podlahy i koberce. Zaměření a odvoz staré podlahy zdarma po celém Moravskoslezském, Zlínském a Olomouckém kraji.'
  return {
    title,
    description,
    openGraph: {
      title: `${title} | pokládámeee.cz`,
      description: 'Sleva 25 % na vinylové, PVC, dřevěné podlahy i koberce. Zaměření zdarma.',
      url: 'https://www.pokladameee.cz/black-friday',
    },
    alternates: { canonical: 'https://www.pokladameee.cz/black-friday' },
  }
}

const HERO_FALLBACK = 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1600&q=85'
const BANNER_FALLBACK = '/assets/black-friday/banner.png'

const BODY_FALLBACK = [
  { titul: 'Odolná a voděodolná.', text: 'Vinyl i PVC zvládnou kuchyni, koupelnu i dětský pokoj a údržba je otázkou minuty.' },
  { titul: 'Hotovo, než se nadějeteee.', text: 'Od zaměření po pokládku bez zbytečného čekání. Přijedeme ve smluvený den.' },
  { titul: 'Bez starostí s úklidem.', text: 'Starou podlahu odstraníme, ekologicky zlikvidujeme a po sobě uklidíme.' },
]

const PRODUKTY = [
  { slug: 'vinylova-podlaha', title: 'Vinylová podlaha', emoji: '🪵', query: VINYLOVA_PODLAHA_QUERY, barva: 'linear-gradient(160deg, var(--blue), var(--blue-dark))' },
  { slug: 'pvc-podlaha', title: 'PVC podlaha', emoji: '💧', query: PVC_PODLAHA_QUERY, barva: 'linear-gradient(160deg, #FF8800, #c66300)' },
  { slug: 'drevena-podlaha', title: 'Dřevěná podlaha', emoji: '🌳', query: DREVENA_PODLAHA_QUERY, barva: 'linear-gradient(160deg, #3D3D3A, #000)' },
  { slug: 'koberce', title: 'Koberce', emoji: '🧶', query: KOBERCOVA_PODLAHA_QUERY, barva: 'linear-gradient(160deg, var(--blue), #FF8800)' },
]

export default async function BlackFridayPage() {
  const data = await getData()

  let heroFotkaUrl: string | null = data.heroFotkaUrl || null
  let fotky: (string | null)[] = PRODUKTY.map(() => null)

  try {
    const [heroSekce, ...produktyData] = await Promise.all([
      client.fetch<{ heroFotka?: { asset?: { url?: string } } } | null>(HERO_SEKCE_QUERY),
      ...PRODUKTY.map(p => client.fetch<{ heroFotkaUrl?: string } | null>(p.query)),
    ])
    if (!heroFotkaUrl) heroFotkaUrl = heroSekce?.heroFotka?.asset?.url || null
    fotky = produktyData.map(d => d?.heroFotkaUrl || null)
  } catch {}

  // Stejná fotka Adama jako v KontaktSekce — lokální adam.jpg má useknutou hlavu, proto jen jako záloha
  let adamFotoUrl = '/assets/adam.jpg'
  let kontaktSekce: any = null
  try {
    kontaktSekce = await client.fetch(KONTAKT_SEKCE_QUERY)
    if (kontaktSekce?.fotoUrl) adamFotoUrl = kontaktSekce.fotoUrl
  } catch {}

  const bannerObrazekUrl = data.bannerObrazekUrl || BANNER_FALLBACK
  const body = data.body?.length ? data.body : BODY_FALLBACK

  return (
    <>
      <Header />
      <main>
        {/* ── HERO s odpočtem ── */}
        <section className="bf-hero" style={{ position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <img src={heroFotkaUrl || HERO_FALLBACK} alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.75) 45%, rgba(0,0,0,0.55) 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(255,136,0,0.12) 0%, transparent 50%)' }} />
          </div>

          <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%', textAlign: 'center' }}>
            <div className="bf-odpocet-obal">
              <Odpocet konec={BF_KONEC} />
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,136,0,0.15)', border: '1px solid rgba(255,136,0,0.35)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
              <span style={{ width: 8, height: 8, background: 'var(--orange)', borderRadius: '50%', display: 'inline-block' }} />
              <span style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 13, letterSpacing: '0.05em' }}>
                <FormatovanyText value={data.heroBadge} fallback="BLACK FRIDAY JE TADY" />
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(44px, 6vw, 88px)', fontWeight: 900, color: 'white', lineHeight: 1.0, marginBottom: 24 }}>
              <span style={{ color: 'var(--orange)' }}><FormatovanyText value={data.heroSleva} fallback={<>25&nbsp;%</>} /></span>{' '}
              <FormatovanyText value={data.heroNadpisZbytek} fallback="na podlahové krytiny" />
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.65, maxWidth: 620, margin: '0 auto 32px' }}>
              <FormatovanyText value={data.heroPodnadpis} fallback="Vinylové, PVC i dřevěné podlahy a koberce se slevou 25 %. Zaměření i odvoz staré podlahy máte zdarma." />
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#bfprodukty" className="btn-primary" style={{ fontSize: 17, padding: '15px 32px' }}>
                <FormatovanyText value={data.heroTlacitko} fallback="Podlahy v akci ↓" />
              </a>
              <a href="#kontakt" className="btn-primary" style={{ fontSize: 17, padding: '15px 32px', background: '#154C86' }}>
                <FormatovanyText value={data.heroTlacitkoSekundarni} fallback="ZAMĚŘENÍ ZDARMA" />
              </a>
            </div>
          </div>
        </section>

        {/* ── VIDEO + TEXT ── */}
        <section className="section" style={{ background: 'white' }}>
          <div className="container">
            <div className="bf-video-grid">
              <div className="bf-video-placeholder" style={{ aspectRatio: '700/633', position: 'relative', overflow: 'hidden' }}>
                <Image src={bannerObrazekUrl} alt="Black Friday jeee tady! 25 % sleva" fill unoptimized style={{ objectFit: 'cover', objectPosition: 'center' }} />
              </div>

              <div>
                <h2 className="section-title" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)' }}>
                  <FormatovanyText value={data.videoNadpis} fallback="Dopřejteee domovu novou podlahu" />
                </h2>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, margin: '24px 0' }}>
                  {body.map((b, i) => (
                    <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--orange)', fontWeight: 900, fontSize: 18, lineHeight: 1.5, flexShrink: 0 }}>✓</span>
                      <p style={{ fontSize: 16 }}><strong style={{ color: 'var(--black)' }}><FormatovanyText value={b.titul} fallback="" /></strong> <FormatovanyText value={b.text} fallback="" /></p>
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize: 16, marginBottom: 16 }}>
                  <FormatovanyText value={data.odstavec} fallback="Pokud o nové podlaze přemýšlíte, právě teď je nejlepší chvíle posunout ji z „někdy“ na „teď“. Stačí vyplnit nezávazný formulář." />
                </p>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--black)', marginBottom: 32 }}>
                  <FormatovanyText value={data.zvyrazenyText} fallback="BLACK FRIDAY = nová podlaha za méně peněz. Starosti necháte na nás." />
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
                  <AkcePopup label={<FormatovanyText value={data.ctaPopupText} fallback="Využít akci →" />} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Image src={adamFotoUrl} alt="Adam Hajdušek" width={52} height={52} unoptimized style={{ borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', border: '2px solid var(--orange)', flexShrink: 0 }} />
                    <span style={{ fontWeight: 800, fontSize: 15, color: 'var(--blue)' }}>
                      <FormatovanyText value={data.adamText} fallback="Přijedeme a ZDARMA zaměříme" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRODUKTY V AKCI ── */}
        <section id="bfprodukty" className="section" style={{ background: 'var(--blue)', scrollMarginTop: 72 }}>
          <div className="container">
            <h2 className="section-title" style={{ color: 'white', textAlign: 'center', marginBottom: 48 }}>
              <FormatovanyText value={data.produktyNadpis} fallback="V Black Friday náladě jsou všechny podlahy" />
            </h2>
            <div className="sluzby-prehled-grid">
              {PRODUKTY.map((p, i) => (
                <Link key={p.slug} href={`/sluzby/${p.slug}`} className="sluzby-prehled-karta">
                  {fotky[i] ? (
                    <Image src={fotky[i] as string} alt={p.title} fill unoptimized style={{ objectFit: 'cover' }} />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, background: p.barva, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>
                      {p.emoji}
                    </div>
                  )}
                  <div className="sluzby-prehled-overlay" />
                  <span className="bf-sleva-badge"><FormatovanyText value={data.slevaBadge} fallback="-25 %" /></span>
                  <span className="sluzby-prehled-label">{p.title}</span>
                </Link>
              ))}
            </div>

            <p style={{ color: 'rgba(255,255,255,0.65)', textAlign: 'center', marginTop: 40 }}>
              📍 <FormatovanyText value={data.zdarmaPopisek} fallback="Pokládáme v celém Moravskoslezském, Zlínském a Olomouckém kraji" />
            </p>
          </div>
        </section>
      </main>

      <KontaktSekce kontakt={kontaktSekce} />

      <Footer />
    </>
  )
}
