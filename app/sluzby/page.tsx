import type { Metadata } from 'next'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import KontaktSekce from '@/app/components/KontaktSekce'
import BrandIcon from '@/app/components/BrandIcon'
import FormatovanyText from '@/app/components/FormatovanyText'
import TypyPodlah from '@/app/components/TypyPodlah'
import { client, KONTAKT_SEKCE_QUERY, SLUZBY_STRANKA_QUERY } from '@/lib/sanity'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Co pokládámeee',
  description: 'Pokládka vinylových, PVC, kobercových a dřevěných podlah v Moravskoslezském, Zlínském a Olomouckém kraji. Zaměření zdarma, odvoz staré podlahy zdarma.',
  openGraph: {
    title: 'Co pokládámeee | pokládámeee.cz',
    description: 'Pokládka vinylových, PVC, kobercových a dřevěných podlah v Moravskoslezském, Zlínském a Olomouckém kraji.',
    url: 'https://www.pokladameee.cz/sluzby',
  },
  alternates: { canonical: 'https://www.pokladameee.cz/sluzby' },
}

type RT = Parameters<typeof FormatovanyText>[0]['value']

type SluzbyStranka = {
  nadpis?: RT
  uvodText?: RT
  uvodOdkaz?: RT
  kroky?: { emoji?: string; slovo?: string }[]
  vinyl?: { nazev?: RT; popis?: RT }
  pvc?: { nazev?: RT; popis?: RT }
  koberce?: { nazev?: RT; popis?: RT }
  drevo?: { nazev?: RT; popis?: RT }
  tlacitkoProdukt?: RT
  ikonky?: { emoji?: string; text?: RT }[]
}

const ISTRIP: { emoji?: string; text?: RT }[] = [
  { emoji: '📐', text: 'Zaměření zdarma' },
  { emoji: '⚡', text: 'U vás do 48 hodin' },
  { emoji: '🚛', text: 'Odvoz staré podlahy zdarma' },
  { emoji: '🛡️', text: 'Záruka na práci' },
  { emoji: '📍', text: 'MSK, Zlínský i Olomoucký kraj' },
]

const KROKY = [
  { emoji: '📐', slovo: 'Zaměřím' },
  { emoji: '🎨', slovo: 'Poradím' },
  { emoji: '✨', slovo: 'Položím' },
]

export default async function SluzbyPage() {
  let kontaktSekce: any = null
  try {
    kontaktSekce = await client.fetch(KONTAKT_SEKCE_QUERY)
  } catch {}

  // texty stránky ze Sanity (Co pokládámeee); prázdné pole = výchozí text
  let stranka: SluzbyStranka | null = null
  let kroky = KROKY
  try {
    stranka = await client.fetch<SluzbyStranka | null>(SLUZBY_STRANKA_QUERY)
    const zeSanity = (stranka?.kroky || []).filter(k => k.slovo).map(k => ({ emoji: k.emoji || '✨', slovo: k.slovo as string }))
    if (zeSanity.length) kroky = zeSanity
  } catch {}

  const ikonky = stranka?.ikonky?.length ? stranka.ikonky : ISTRIP

  return (
    <>
      <Header opaque />
      <main>
        <section style={{ paddingTop: 'calc(120px + var(--hlavicka-navic))', paddingBottom: 80 }}>
          <div className="container">
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>
              <a href="/" style={{ color: 'var(--orange)' }}>Domů</a>
              <span style={{ color: 'var(--gray-400)' }}> / Co pokládámeee</span>
            </p>
            <h1 className="section-title"><FormatovanyText value={stranka?.nadpis} fallback={<>Co pokládám<span>eee</span></>} /></h1>
            <div className="sluzby-uvod">
              <p style={{ fontSize: 17, lineHeight: 1.7 }}>
                <FormatovanyText value={stranka?.uvodText} fallback={<>
                  Podlahu vám vyřešíme <strong>od A do Z</strong> — zaměříme, poradíme s výběrem, odvezeme tu starou a novou položíme.
                  Vyberte si <strong>vinyl</strong>, <strong>PVC</strong>, <strong>koberec</strong> nebo <strong>dřevo</strong> podle toho, co od podlahy čekáte doma i v kanceláři.
                  Nejste si něčím jistí? Sepsali jsme
                </>} />{' '}
                <a href="/faq" style={{ color: 'var(--orange)', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3 }}><FormatovanyText vOdkazu value={stranka?.uvodOdkaz} fallback="odpovědi na nejčastější dotazy" /></a>.
              </p>
              <div className="sluzby-uvod-kroky">
                {kroky.map(k => (
                  <div key={k.slovo} className="sluzby-uvod-krok">
                    <BrandIcon emoji={k.emoji} size={44} />
                    <span>{k.slovo}<span style={{ color: 'var(--orange)' }}>eee</span></span>
                  </div>
                ))}
              </div>
            </div>

            {/* DLAŽDICE — fotka, krátký popis a proklik */}
            <TypyPodlah texty={stranka} />
          </div>
        </section>

        <section style={{ background: 'white', borderTop: '1px solid var(--gray-100)', borderBottom: '1px solid var(--gray-100)' }}>
          <div className="container">
            <div className="sluzby-istripgrid">
              {ikonky.map(({ emoji, text }, i) => (
                <div key={i} className="sluzby-istrip-item">
                  <BrandIcon emoji={emoji || '✨'} size={48} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-700)', lineHeight: 1.3 }}><FormatovanyText value={text} fallback={null} /></span>
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
