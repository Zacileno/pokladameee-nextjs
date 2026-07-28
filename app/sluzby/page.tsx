import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import KontaktSekce from '@/app/components/KontaktSekce'
import { client, VINYLOVA_PODLAHA_QUERY, PVC_PODLAHA_QUERY, KOBERCOVA_PODLAHA_QUERY, DREVENA_PODLAHA_QUERY, KONTAKT_SEKCE_QUERY } from '@/lib/sanity'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Naše služby',
  description: 'Pokládka vinylových, PVC, kobercových a dřevěných podlah v Moravskoslezském kraji. Zaměření zdarma, odvoz staré podlahy zdarma.',
  openGraph: {
    title: 'Naše služby | pokládámeee.cz',
    description: 'Pokládka vinylových, PVC, kobercových a dřevěných podlah v Moravskoslezském kraji.',
    url: 'https://www.pokladameee.cz/sluzby',
  },
  alternates: { canonical: 'https://www.pokladameee.cz/sluzby' },
}

const ISTRIP = [
  { emoji: '📐', text: 'Zaměření zdarma' },
  { emoji: '⚡', text: 'U vás do 48 hodin' },
  { emoji: '🚛', text: 'Odvoz staré podlahy zdarma' },
  { emoji: '🛡️', text: 'Záruka na práci' },
  { emoji: '📍', text: 'Celý Moravskoslezský kraj' },
]

const SLUZBY = [
  { slug: 'vinylova-podlaha', title: 'Vinylová podlaha', emoji: '🪵', query: VINYLOVA_PODLAHA_QUERY, barva: 'linear-gradient(160deg, var(--blue), var(--blue-dark))' },
  { slug: 'pvc-podlaha', title: 'PVC podlaha', emoji: '💧', query: PVC_PODLAHA_QUERY, barva: 'linear-gradient(160deg, #FF8800, #c66300)' },
  { slug: 'koberce', title: 'Koberce', emoji: '🧶', query: KOBERCOVA_PODLAHA_QUERY, barva: 'linear-gradient(160deg, var(--blue), #FF8800)' },
  { slug: 'drevena-podlaha', title: 'Dřevěná podlaha', emoji: '🌳', query: DREVENA_PODLAHA_QUERY, barva: 'linear-gradient(160deg, #3D3D3A, #000)' },
]

export default async function SluzbyPage() {
  const fotky = await Promise.all(
    SLUZBY.map(async s => {
      try {
        const data = await client.fetch<{ heroFotkaUrl?: string }>(s.query)
        return data?.heroFotkaUrl || null
      } catch {
        return null
      }
    })
  )

  let kontaktSekce: any = null
  try {
    kontaktSekce = await client.fetch(KONTAKT_SEKCE_QUERY)
  } catch {}

  return (
    <>
      <Header opaque />
      <main>
        <section style={{ paddingTop: 120, paddingBottom: 80 }}>
          <div className="container">
            <div style={{ marginBottom: 48, textAlign: 'center' }}>
              <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Co pokládámeee</p>
              <h1 className="section-title">
                Naše <span>služby</span>
              </h1>
              <p className="section-subtitle" style={{ margin: '16px auto 0' }}>
                Vyberte si podlahu, o kterou máte zájem — na každé stránce najdete detaily, typy materiálů i časté otázky.
              </p>
            </div>

            <div className="sluzby-prehled-grid">
              {SLUZBY.map((s, i) => (
                <Link key={s.slug} href={`/sluzby/${s.slug}`} className="sluzby-prehled-karta">
                  {fotky[i] ? (
                    <Image src={fotky[i] as string} alt={s.title} fill unoptimized style={{ objectFit: 'cover' }} />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, background: s.barva, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>
                      {s.emoji}
                    </div>
                  )}
                  <div className="sluzby-prehled-overlay" />
                  <span className="sluzby-prehled-label">{s.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: 'white', borderBottom: '1px solid var(--gray-100)' }}>
          <div className="container">
            <div className="sluzby-istripgrid">
              {ISTRIP.map(({ emoji, text }, i) => (
                <div key={text || i} className="sluzby-istrip-item">
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{emoji}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-700)', lineHeight: 1.3 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <KontaktSekce kontakt={kontaktSekce} />
      </main>
      <Footer />
    </>
  )
}
