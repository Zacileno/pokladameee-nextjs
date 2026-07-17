import type { Metadata } from 'next'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import KontaktSekce from '@/app/components/KontaktSekce'
import JsonLd from '@/app/components/JsonLd'
import FaqItem from './FaqItem'
import {
  client,
  VINYLOVA_PODLAHA_QUERY,
  PVC_PODLAHA_QUERY,
  KOBERCOVA_PODLAHA_QUERY,
  DREVENA_PODLAHA_QUERY,
  KONTAKT_SEKCE_QUERY,
} from '@/lib/sanity'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Časté otázky',
  description: 'Odpovědi na nejčastější otázky o pokládce vinylových, PVC, kobercových a dřevěných podlah. Zaměření zdarma do 48 hodin, kompletní servis od výběru materiálu po úklid.',
  openGraph: {
    title: 'Časté otázky | pokládámeee.cz',
    description: 'Odpovědi na nejčastější otázky o pokládce podlah — vinyl, PVC, koberce i dřevo.',
    url: 'https://www.pokladameee.cz/faq',
  },
  alternates: { canonical: 'https://www.pokladameee.cz/faq' },
}

type FaqEntry = { otazka?: string; odpoved?: string }

const OBECNE: FaqEntry[] = [
  { otazka: 'Jak rychle k vám přijedete?', odpoved: 'Po poptávce vás navštívíme do 48 hodin. Prostor profesionálně zaměříme, zhodnotíme stav podkladu a rovnou na místě vám podlahu naceníme.' },
  { otazka: 'Musím předem vědět, jakou podlahu chci?', odpoved: 'Ne. Od toho jsme tady my — přivezeme vzorník, vysvětlíme rozdíly mezi materiály selským rozumem a doporučíme řešení podle prostoru, zátěže i rozpočtu.' },
  { otazka: 'Řešíte i demontáž staré podlahy a odpad?', odpoved: 'Ano. Starou podlahu odborně odstraníme a odpad ekologicky zlikvidujeme — nemusíte shánět kontejner ani další firmu.' },
  { otazka: 'Co všechno je součástí ceny?', odpoved: 'Zaměření, konzultaci, materiál, přípravu podkladu, demontáž staré podlahy, pokládku i úklid po sobě. Podlahu řešíme kompletně od A do Z.' },
  { otazka: 'Máte na práci záruku?', odpoved: 'Ano, na odvedenou práci poskytujeme záruku. Pokud se cokoliv objeví, voláte přímo nás — neposíláme vás mezi výrobce, dodavatele a řemeslníky.' },
  { otazka: 'Působíte v celém Moravskoslezském kraji?', odpoved: 'Ano, jezdíme po celém MSK — Ostrava, Opava, Frýdek-Místek, Havířov a okolí.' },
]

const VINYL_FALLBACK: FaqEntry[] = [
  { otazka: 'Jaký je rozdíl mezi lepeným a plovoucím vinylem?', odpoved: 'Lepený vinyl se přilepí přímo k podkladu — je stabilnější, tišší a ideální pro podlahové topení. Plovoucí (click) vinyl se spojuje zámkovým systémem bez lepidla, takže je rychlejší na montáž a snáze se vyměňuje. Pro většinu domácností doporučujeme lepenou variantu UpFloor.' },
  { otazka: 'Jak dlouho trvá pokládka podlahy?', odpoved: 'Průměrný pokoj (20–25 m²) zvládneme za jeden pracovní den. Počítejte s tím, že zahrnujeme i demontáž staré podlahy a přípravu podkladu. Přesný harmonogram domluvíme na zaměření.' },
  { otazka: 'Musím si zajistit odvoz staré podlahy?', odpoved: 'Ne — odvoz a ekologická likvidace staré podlahy je součástí naší ceny. Nemusíte řešit kontejner ani odvoz.' },
  { otazka: 'Je vinylová podlaha vhodná do koupelny?', odpoved: 'Ano, lepený vinyl je 100% voděodolný a výborně snáší vlhkost. Používáme ho pravidelně do koupelen, kuchyní i předsíní. Plovoucí variantu do trvale vlhkých prostor nedoporučujeme.' },
  { otazka: 'Funguje vinyl s podlahovým topením?', odpoved: 'Lepená vinylová podlaha je plně kompatibilní s teplovodním i elektrickým podlahovým topením. Plovoucí variantu s topením kombinovat nelze — u té doporučujeme jiný materiál.' },
]

const PVC_FALLBACK: FaqEntry[] = [
  { otazka: 'Jaký je rozdíl mezi PVC a vinylem?', odpoved: 'PVC je robustnější a vydržuje vyšší zátěž. Je vhodná do náročnějších prostor — kuchyní, garáží, komerčních budov. Vinyl je měkčí, jemnější a více vhodný pro obytné prostory. Jsou to dva různé materiály s různými vlastnostmi a cenou.' },
  { otazka: 'Jak dlouho trvá pokládka PVC podlahy?', odpoved: 'Záleží na velikosti plochy a přípravě podkladu. Průměrný pokoj (20–25 m²) zvládneme za jeden den. Počítejte s tím, že zahrnujeme demontáž staré podlahy a úklid. Přesný čas domluvíme při zaměření.' },
  { otazka: 'Je PVC vhodná do koupelny?', odpoved: 'Ano, PVC je ideální do koupelny. Je 100% voděodolná a odolná vůči chemikáliím (šampóny, gely). Neotupuje se, neabsorbuje vlhkost a nekažuje se. V koupelně jí nevidím lepší variantu.' },
  { otazka: 'Funguje PVC s podlahovým topením?', odpoved: 'Lepená PVC je kompatibilní s teplovodním i elektrickým podlahovým topením. Click (plovoucí) variantu s topením kombinovat nedoporučujeme — raději volte lepenou. Vždy je možné domluvit si speciální varianty.' },
  { otazka: 'Jak se údržuje PVC podlaha?', odpoved: 'Velmi jednoduše. Pravidelný smetení nebo vysavač. Na špinavé místo — vlhký mop s trochou neutrálního saponátu. Žádné vosky, zářidla nebo agresivní chemikálie. PVC vydržuje i průmyslové čistidla, pokud bude třeba.' },
]

const KOBERCE_FALLBACK: FaqEntry[] = [
  { otazka: 'Jaký koberec je nejvhodnější do ložnice?', odpoved: 'Do ložnice doporučujeme měkčí koberec s vyšším vlasem, ideálně z vlny nebo kvalitního polypropylenu. Zajistí příjemný došlap a dobrou tepelnou izolaci. Volně položený na podložce je zde nejčastější volba.' },
  { otazka: 'Je koberec vhodný pro alergiky?', odpoved: 'Moderní koberce s hustým vlasem naopak zachytávají prach a alergeny, které pak stačí odstranit pravidelným vysáváním. Doporučujeme kvalitní vysavač s HEPA filtrem a pravidelné čištění. U silných alergií raději volte hladké povrchy.' },
  { otazka: 'Jak dlouho koberec vydrží?', odpoved: 'Kvalitní celoplošně lepený koberec při běžném provozu vydrží 10–15 let, u nižší zátěže i déle. Životnost ovlivňuje materiál, hustota vlasu a pravidelná údržba.' },
  { otazka: 'Jak se koberec čistí a udržuje?', odpoved: 'Základ je pravidelné vysávání, ideálně 2–3× týdně. Skvrny odstraňujte ihned vlhkým hadříkem, jednou za rok doporučujeme strojové čištění. Vyvarujte se agresivních chemikálií, které mohou poškodit vlákna.' },
  { otazka: 'Můžu koberec položit na podlahové topení?', odpoved: 'Ano, ale je potřeba zvolit tenčí koberec s nižším tepelným odporem, aby teplo mohlo procházet do místnosti. Doporučujeme se poradit při zaměření — vybereme materiál, který s topením funguje bez problémů.' },
]

const DREVO_FALLBACK: FaqEntry[] = [
  { otazka: 'Jaký je rozdíl mezi masivní a vícevrstvou dřevěnou podlahou?', odpoved: 'Masivní podlaha je z jednoho kusu dřeva a lze ji brousit vícekrát za celou její životnost. Vícevrstvá (engineered) má nosnou vrstvu z překližky a svrchní dýhu z pravého dřeva — je stabilnější a méně náchylná na vlhkost, ale broušení zvládne méně opakování.' },
  { otazka: 'Funguje dřevěná podlaha s podlahovým topením?', odpoved: 'Ano, ale je potřeba zvolit vhodnou dřevinu a konstrukci (nejčastěji vícevrstvou lepenou). Masivní dřevo s topením kombinovat nedoporučujeme kvůli většímu pnutí. Poradíme při zaměření.' },
  { otazka: 'Jak často je potřeba dřevěnou podlahu brousit?', odpoved: 'Záleží na provozu a tloušťce vrchní vrstvy — obvykle jednou za 8–15 let. Broušení podlahu zase zbaví škrábanců a obnoví původní vzhled.' },
  { otazka: 'Je dřevěná podlaha vhodná do kuchyně nebo koupelny?', odpoved: 'Do koupelny dřevo nedoporučujeme kvůli vysoké vlhkosti. Do kuchyně je možné s kvalitním olejováním nebo lakováním a opatrností u dřezu — jinak je vhodnější volit PVC nebo vinyl.' },
  { otazka: 'Jak se dřevěná podlaha udržuje?', odpoved: 'Pravidelné vysávání nebo zametání, otírání mírně navlhčeným hadrem. Jednou za čas doporučujeme obnovu oleje nebo laku. Vyvarujte se stojaté vodě a agresivním čisticím prostředkům.' },
]

const KATEGORIE = [
  { id: 'obecne', label: 'Obecné' },
  { id: 'vinyl', label: 'Vinyl' },
  { id: 'pvc', label: 'PVC' },
  { id: 'koberce', label: 'Koberce' },
  { id: 'drevo', label: 'Dřevo' },
]

export default async function FaqPage() {
  let vinylData: { faq?: FaqEntry[] } | null = null
  let pvcData: { faq?: FaqEntry[] } | null = null
  let kobercovaData: { faq?: FaqEntry[] } | null = null
  let drevenaData: { faq?: FaqEntry[] } | null = null
  let kontaktSekce: any = null

  try {
    ;[vinylData, pvcData, kobercovaData, drevenaData, kontaktSekce] = await Promise.all([
      client.fetch(VINYLOVA_PODLAHA_QUERY),
      client.fetch(PVC_PODLAHA_QUERY),
      client.fetch(KOBERCOVA_PODLAHA_QUERY),
      client.fetch(DREVENA_PODLAHA_QUERY),
      client.fetch(KONTAKT_SEKCE_QUERY),
    ])
  } catch {}

  const sekce = [
    { id: 'obecne', nadpis: 'Obecné otázky', faq: OBECNE },
    { id: 'vinyl', nadpis: 'Vinylová podlaha', faq: vinylData?.faq?.length ? vinylData.faq : VINYL_FALLBACK },
    { id: 'pvc', nadpis: 'PVC podlaha', faq: pvcData?.faq?.length ? pvcData.faq : PVC_FALLBACK },
    { id: 'koberce', nadpis: 'Koberce', faq: kobercovaData?.faq?.length ? kobercovaData.faq : KOBERCE_FALLBACK },
    { id: 'drevo', nadpis: 'Dřevěná podlaha', faq: drevenaData?.faq?.length ? drevenaData.faq : DREVO_FALLBACK },
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: sekce.flatMap(s => s.faq).map((f: FaqEntry) => ({
      '@type': 'Question',
      name: f.otazka || '',
      acceptedAnswer: { '@type': 'Answer', text: f.odpoved || '' },
    })),
  }

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <Header opaque />

      {/* HERO */}
      <section style={{ background: 'var(--blue)', paddingTop: 140, paddingBottom: 64 }}>
        <div className="container">
          <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '2px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 16 }}>
            Časté otázky
          </p>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 16, maxWidth: 700 }}>
            Co lidé nejčastěji řeší, než si u nás objednají podlahu
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: 600, marginBottom: 32 }}>
            Nenašli jste odpověď? Zavolejte nebo napište — poradíme přímo na míru vašemu prostoru.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {KATEGORIE.map(k => (
              <a key={k.id} href={`#${k.id}`} style={{
                background: 'rgba(255,255,255,0.12)', color: 'white', fontWeight: 700, fontSize: 14,
                padding: '8px 18px', borderRadius: 100, border: '1px solid rgba(255,255,255,0.25)',
                textDecoration: 'none',
              }}>
                {k.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SEKCE */}
      {sekce.map((s, i) => (
        <section key={s.id} id={s.id} className="section" style={{ background: i % 2 === 0 ? 'var(--gray-50)' : 'white', scrollMarginTop: 90 }}>
          <div className="container" style={{ maxWidth: 760 }}>
            <h2 className="section-title" style={{ marginBottom: 32 }}>{s.nadpis}</h2>
            <div className="faq-list">
              {s.faq.map((f: FaqEntry, idx: number) => (
                <FaqItem key={f.otazka || idx} otazka={f.otazka || ''} odpoved={f.odpoved || ''} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <KontaktSekce kontakt={kontaktSekce} />

      <Footer />
    </>
  )
}
