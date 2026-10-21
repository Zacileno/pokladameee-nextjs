import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import Odpocet from '@/app/components/Odpocet'
import AkcePopup from './AkcePopup'
import { client, HERO_SEKCE_QUERY, VINYLOVA_PODLAHA_QUERY, PVC_PODLAHA_QUERY, KOBERCOVA_PODLAHA_QUERY, DREVENA_PODLAHA_QUERY } from '@/lib/sanity'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Black Friday – 25 % na podlahové krytiny',
  description: 'Black Friday na pokládámeee.cz: sleva 25 % na vinylové, PVC, dřevěné podlahy i koberce. Zaměření a odvoz staré podlahy zdarma po celém Moravskoslezském kraji.',
  openGraph: {
    title: 'Black Friday – 25 % na podlahové krytiny | pokládámeee.cz',
    description: 'Sleva 25 % na vinylové, PVC, dřevěné podlahy i koberce. Zaměření zdarma.',
    url: 'https://www.pokladameee.cz/black-friday',
  },
  alternates: { canonical: 'https://www.pokladameee.cz/black-friday' },
}

// Akce běží 14 dní: od pátku 23. 10. 2026 do konce čtvrtka 5. 11. 2026 (00:00 6. 11., středoevropský čas)
const KONEC_AKCE = '2026-11-06T00:00:00+01:00'

const HERO_FALLBACK = 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1600&q=85'

const BODY = [
  { title: 'Odolná a voděodolná.', text: 'Vinyl i PVC zvládnou kuchyni, koupelnu i dětský pokoj a údržba je otázkou minuty.' },
  { title: 'Hotovo do týdne.', text: 'Od zaměření po pokládku bez zbytečného čekání. Přijedeme ve smluvený den.' },
  { title: 'Bez starostí s úklidem.', text: 'Starou podlahu odstraníme, ekologicky zlikvidujeme a po sobě uklidíme.' },
]

const PRODUKTY = [
  { slug: 'vinylova-podlaha', title: 'Vinylová podlaha', emoji: '🪵', query: VINYLOVA_PODLAHA_QUERY, barva: 'linear-gradient(160deg, var(--blue), var(--blue-dark))' },
  { slug: 'pvc-podlaha', title: 'PVC podlaha', emoji: '💧', query: PVC_PODLAHA_QUERY, barva: 'linear-gradient(160deg, #FF8800, #c66300)' },
  { slug: 'drevena-podlaha', title: 'Dřevěná podlaha', emoji: '🌳', query: DREVENA_PODLAHA_QUERY, barva: 'linear-gradient(160deg, #3D3D3A, #000)' },
  { slug: 'koberce', title: 'Koberce', emoji: '🧶', query: KOBERCOVA_PODLAHA_QUERY, barva: 'linear-gradient(160deg, var(--blue), #FF8800)' },
]

const SLUZBY_ZDARMA = [
  { title: 'Odvoz staré podlahy', emoji: '♻️', barva: 'linear-gradient(160deg, var(--blue), var(--blue-dark))' },
  { title: 'Zaměření a kalkulace', emoji: '📐', barva: 'linear-gradient(160deg, #FF8800, #c66300)' },
]

export default async function BlackFridayPage() {
  let heroFotkaUrl: string | null = null
  let fotky: (string | null)[] = PRODUKTY.map(() => null)

  try {
    const [heroSekce, ...produktyData] = await Promise.all([
      client.fetch<{ heroFotka?: { asset?: { url?: string } } } | null>(HERO_SEKCE_QUERY),
      ...PRODUKTY.map(p => client.fetch<{ heroFotkaUrl?: string } | null>(p.query)),
    ])
    heroFotkaUrl = heroSekce?.heroFotka?.asset?.url || null
    fotky = produktyData.map(d => d?.heroFotkaUrl || null)
  } catch {}

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
              <Odpocet konec={KONEC_AKCE} />
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,136,0,0.15)', border: '1px solid rgba(255,136,0,0.35)', borderRadius: 100, padding: '6px 16px', marginBottom: 24 }}>
              <span style={{ width: 8, height: 8, background: 'var(--orange)', borderRadius: '50%', display: 'inline-block' }} />
              <span style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 13, letterSpacing: '0.05em' }}>BLACK FRIDAY JE TADY</span>
            </div>
            <h1 style={{ fontSize: 'clamp(44px, 6vw, 88px)', fontWeight: 900, color: 'white', lineHeight: 1.0, marginBottom: 24 }}>
              <span style={{ color: 'var(--orange)' }}>25 %</span> na podlahové krytiny
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.65, maxWidth: 620, margin: '0 auto 32px' }}>
              Vinylové, PVC i dřevěné podlahy a koberce <strong style={{ color: 'white' }}>se slevou 25 %</strong>. Zaměření i odvoz staré podlahy máte zdarma.
            </p>
            <a href="#bfprodukty" className="btn-primary" style={{ fontSize: 17, padding: '15px 32px' }}>Podlahy v akci ↓</a>
          </div>
        </section>

        {/* ── VIDEO + TEXT ── */}
        <section className="section" style={{ background: 'white' }}>
          <div className="container">
            <div className="bf-video-grid">
              <div className="bf-video-placeholder" aria-label="Místo pro video">
                <span style={{ fontSize: 40, lineHeight: 1 }} aria-hidden="true">▶</span>
                <span style={{ fontWeight: 700, fontSize: 18 }}>Zde bude video</span>
              </div>

              <div>
                <h2 className="section-title" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)' }}>
                  Dopřejt<span>eee</span> domovu novou podlahu
                </h2>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14, margin: '24px 0' }}>
                  {BODY.map(b => (
                    <li key={b.title} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--orange)', fontWeight: 900, fontSize: 18, lineHeight: 1.5, flexShrink: 0 }}>✓</span>
                      <p style={{ fontSize: 16 }}><strong style={{ color: 'var(--black)' }}>{b.title}</strong> {b.text}</p>
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize: 16, marginBottom: 16 }}>
                  Pokud o nové podlaze přemýšlíte, právě teď je nejlepší chvíle posunout ji z „někdy“ na „teď“. Stačí vyplnit nezávazný formulář.
                </p>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--black)', marginBottom: 32 }}>
                  <span style={{ color: 'var(--orange)' }}>BLACK FRIDAY</span> = nová podlaha za méně peněz. Starosti necháte na nás.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
                  <AkcePopup />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Image src="/assets/adam.jpg" alt="Adam Hajdušek" width={52} height={52} style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--orange)' }} />
                    <span style={{ fontWeight: 800, fontSize: 15, color: 'var(--blue)' }}>Přijedeme a ZDARMA zaměříme</span>
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
              V Black Friday náladě jsou všechny <span>podlahy</span>
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
                  <span className="bf-sleva-badge">-25&nbsp;%</span>
                  <span className="sluzby-prehled-label">{p.title}</span>
                </Link>
              ))}
            </div>

            <h2 className="section-title" style={{ color: 'white', textAlign: 'center', marginTop: 80, marginBottom: 12, fontSize: 'clamp(26px, 3vw, 40px)' }}>
              A k tomu služby <span>zdarma</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', textAlign: 'center', marginBottom: 40 }}>
              Pokládáme v celém Moravskoslezském kraji
            </p>
            <div className="bf-zdarma-grid">
              {SLUZBY_ZDARMA.map(s => (
                <div key={s.title} className="sluzby-prehled-karta" style={{ aspectRatio: '4/3' }}>
                  <div style={{ position: 'absolute', inset: 0, background: s.barva, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>
                    {s.emoji}
                  </div>
                  <div className="sluzby-prehled-overlay" />
                  <span className="bf-sleva-badge" style={{ fontSize: 15 }}>ZDARMA</span>
                  <span className="sluzby-prehled-label">{s.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
