import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BrandIcon from '@/app/components/BrandIcon'
import JakToFunguje from '@/app/components/JakToFunguje'
import ReferenceSekce from '@/app/components/ReferenceSekce'
import MapaSekce from '@/app/components/MapaSekce'
import KontaktSekce from '@/app/components/KontaktSekce'
import FormatovanyText from '@/app/components/FormatovanyText'
import { client, JAK_TO_FUNGUJE_QUERY, KONTAKT_SEKCE_QUERY, CO_POKLADAME_STRANKA_QUERY } from '@/lib/sanity'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Co pokládáme',
  description: 'Pokládka podlah do bytů, rodinných domů, firem i bytových družstev v Moravskoslezském, Zlínském a Olomouckém kraji. Zaměření zdarma, odvoz staré podlahy zdarma.',
  openGraph: {
    title: 'Co pokládáme | pokládámeee.cz',
    description: 'Podlahy do bytů, domů, firem i bytových družstev. Zaměříme, položíme a po sobě uklidíme.',
    url: 'https://www.pokladameee.cz/co-pokladame',
  },
  alternates: { canonical: 'https://www.pokladameee.cz/co-pokladame' },
}

type RT = Parameters<typeof FormatovanyText>[0]['value']

type SkupinaTexty = { nazev?: RT; claim?: RT; popis?: RT; body?: { text?: RT }[]; cta?: RT }

type CoPokladameStranka = {
  nadpis?: RT
  uvodText?: RT
  byty?: SkupinaTexty
  domy?: SkupinaTexty
  firmy?: SkupinaTexty
  druzstva?: SkupinaTexty
  odkazRealizace?: RT
}

// fotky realizací z Inspirace (Sanity) — vyměnit za přesnější, až budou k dispozici
const FOTO = (id: string) => `https://cdn.sanity.io/images/8cvsenqb/production/${id}.jpg?w=1200&auto=format`

const SKUPINY = [
  {
    id: 'byty' as const, title: 'Byty', emoji: '🛋', claim: 'Rychle a čistě', cta: 'Chci podlahu do bytu',
    foto: FOTO('8f969172fe028ebea9dd69e99901ffe35e86533d-5712x4284'), alt: 'Nová podlaha v bytě 2+1 — Zábřeh',
    popis: <>Nová podlaha v bytě nemusí znamenat týdny nepořádku. <strong>Menší byt často zvládneme za jeden den</strong> — odstraníme starou podlahu, připravíme podklad a položíme vinyl, PVC, koberec nebo dřevo. Odcházíme čistě.</>,
    body: ['Zaměření a kalkulace zdarma', 'Odvoz staré podlahy zdarma', 'Pokládka v panelácích i novostavbách'],
  },
  {
    id: 'domy' as const, title: 'Rodinné domy', emoji: '🏡', claim: 'Celé patro i celý dům', cta: 'Chci podlahu do domu',
    foto: FOTO('fde870bd40794f73f8a532a8ad29ceb69d7093d5-1500x2000'), alt: 'Vinylová podlaha v rodinném domě — Stanislavice',
    popis: <>Od jednoho pokoje po celý dům. <strong>Poradíme, co se hodí kam</strong> — voděodolný vinyl do kuchyně a koupelny, koberec do ložnice, dřevo do obýváku. Podlahu sladíme napříč místnostmi, aby dům působil jednotně.</>,
    body: ['Poradíme s výběrem pro každou místnost', 'Vyrovnání podkladu a nivelace', 'Novostavby i rekonstrukce'],
  },
  {
    id: 'firmy' as const, title: 'Firmy', emoji: '🏢', claim: 'Bez přerušení provozu', cta: 'Chci podlahu do firmy',
    foto: FOTO('f8f1220e08455e64c09b07ef3937dfbf9dc24d19-4284x5712'), alt: 'Nová podlaha v zázemí Divadla loutek Ostrava',
    popis: <>Kanceláře, obchody, provozovny i školky. <strong>Práci naplánujeme tak, aby vám neomezila provoz</strong> — klidně po etapách nebo mimo otevírací dobu. Vybereme podlahu, která vydrží každodenní zátěž.</>,
    body: ['Termín podle vašeho provozu', 'Odolné zátěžové podlahy a koberce', 'Pracujeme i pro veřejné instituce'],
  },
  {
    id: 'druzstva' as const, title: 'Bytová družstva a SVJ', emoji: '🤝', claim: 'Kompletně a v termínu', cta: 'Chci podlahu do družstva',
    foto: '/realizace/koberec-koprivnice-schody.jpg', alt: 'Nový koberec na schodišti a chodbě — Kopřivnice',
    popis: <>Chodby, schodiště, společné prostory i jednotlivé byty. <strong>Postaráme se o vše od zaměření po úklid</strong> a dodržíme domluvené termíny. Pro celé družstvo máte jednoho člověka, který zakázku vede.</>,
    body: ['Jeden kontakt pro celou zakázku', 'Chodby, schodiště a společné prostory', 'Dodržené termíny a čistý dům'],
  },
]

export default async function CoPokladamePage() {
  let jakToFungujeData: any = null
  let kontaktSekce: any = null
  // texty stránky ze Sanity (Podlahy na míru); prázdné pole = výchozí text
  let stranka: CoPokladameStranka | null = null
  try {
    ;[jakToFungujeData, kontaktSekce, stranka] = await Promise.all([
      client.fetch(JAK_TO_FUNGUJE_QUERY),
      client.fetch(KONTAKT_SEKCE_QUERY),
      client.fetch<CoPokladameStranka | null>(CO_POKLADAME_STRANKA_QUERY),
    ])
  } catch {}

  return (
    <>
      <Header opaque />
      <main>
        {/* ÚVOD — nadpis a dlaždice skupin */}
        <section style={{ paddingTop: 'calc(120px + var(--hlavicka-navic))', paddingBottom: 80 }}>
          <div className="container">
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>
              <a href="/" style={{ color: 'var(--orange)' }}>Domů</a>
              <span style={{ color: 'var(--gray-400)' }}> / Co pokládáme</span>
            </p>
            <h1 className="section-title"><FormatovanyText value={stranka?.nadpis} fallback={<>Co pokládám<span>eee</span>? Všechno, co je potřeba.</>} /></h1>
            <p style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 760, margin: '8px 0 48px' }}>
              <FormatovanyText value={stranka?.uvodText} fallback={<>
                Novou podlahu vám položíme v <strong>bytě</strong>, <strong>rodinném domě</strong>, <strong>firmě</strong> i v celém <strong>bytovém družstvu</strong>.
                Zaměříme zdarma, poradíme s výběrem, starou podlahu odvezeme a po sobě uklidíme.
              </>} />
            </p>
            <div className="cp-dlazdice-grid">
              {SKUPINY.map(s => (
                <a key={s.id} href={`#${s.id}`} className="cp-dlazdice">
                  <div className="cp-dlazdice-foto">
                    <Image src={s.foto} alt={s.alt} fill unoptimized style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="cp-dlazdice-obsah">
                    <BrandIcon emoji={s.emoji} size={40} />
                    <div>
                      <h2><FormatovanyText value={stranka?.[s.id]?.nazev} fallback={s.title} /></h2>
                      <span><FormatovanyText value={stranka?.[s.id]?.claim} fallback={s.claim} /></span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* BLOKY SKUPIN — fotka a text střídavě vlevo/vpravo */}
        <section className="section" style={{ background: 'var(--gray-50)', paddingTop: 80 }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 96 }}>
            {SKUPINY.map((s, i) => (
              <div key={s.id} id={s.id} className={`cp-blok${i % 2 ? ' cp-blok-obraceny' : ''}`}>
                <div className="cp-blok-foto">
                  <Image src={s.foto} alt={s.alt} fill unoptimized style={{ objectFit: 'cover' }} />
                </div>
                <div className="cp-blok-obsah">
                  <p className="cp-blok-claim"><FormatovanyText value={stranka?.[s.id]?.claim} fallback={s.claim} /></p>
                  <h2 className="section-title"><FormatovanyText value={stranka?.[s.id]?.nazev} fallback={s.title} /></h2>
                  <p className="cp-blok-popis"><FormatovanyText value={stranka?.[s.id]?.popis} fallback={s.popis} /></p>
                  <ul className="cp-blok-body">
                    {(stranka?.[s.id]?.body?.length ? stranka[s.id]!.body!.map(b => b.text) : s.body).map((b, j) => (
                      <li key={j}><BrandIcon emoji="✅" size={24} /> <FormatovanyText value={b} fallback={null} /></li>
                    ))}
                  </ul>
                  <div className="cp-blok-tlacitka">
                    <a href="#kontakt" className="btn-primary"><FormatovanyText value={stranka?.[s.id]?.cta} fallback={s.cta} /></a>
                    <Link href="/inspirace" className="cp-blok-odkaz"><FormatovanyText value={stranka?.odkazRealizace} fallback="Naše realizace →" /></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <JakToFunguje data={jakToFungujeData} />
        <ReferenceSekce video={false} />
        <MapaSekce />
        <KontaktSekce kontakt={kontaktSekce} />
      </main>
      <Footer />
    </>
  )
}
