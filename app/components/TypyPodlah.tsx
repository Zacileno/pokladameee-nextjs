import Image from 'next/image'
import Link from 'next/link'
import BrandIcon from '@/app/components/BrandIcon'
import FormatovanyText from '@/app/components/FormatovanyText'
import { client, VINYLOVA_PODLAHA_QUERY, PVC_PODLAHA_QUERY, KOBERCOVA_PODLAHA_QUERY, DREVENA_PODLAHA_QUERY } from '@/lib/sanity'

// Dlaždice 4 typů podlah (fotka, krátký popis, tlačítko „Zobrazit produkt“) — na /sluzby a /lokality.
// Fotky jsou hero fotky podstránek služeb, texty z dokumentu „Co pokládámeee“ (sluzbyStranka).

type RT = Parameters<typeof FormatovanyText>[0]['value']

export type TypyPodlahTexty = {
  vinyl?: { nazev?: RT; popis?: RT }
  pvc?: { nazev?: RT; popis?: RT }
  koberce?: { nazev?: RT; popis?: RT }
  drevo?: { nazev?: RT; popis?: RT }
  tlacitkoProdukt?: RT
} | null

const SLUZBY = [
  { slug: 'vinylova-podlaha', klic: 'vinyl' as const, title: 'Vinylová podlaha', emoji: '🪵', query: VINYLOVA_PODLAHA_QUERY, barva: 'linear-gradient(160deg, var(--blue), var(--blue-dark))',
    popis: <>Lepená i plovoucí. <strong>Odolná a voděodolná</strong>, věrně napodobí dřevo i kámen. Skvělá do kuchyně, koupelny i obýváku.</> },
  { slug: 'pvc-podlaha', klic: 'pvc' as const, title: 'PVC podlaha', emoji: '💧', query: PVC_PODLAHA_QUERY, barva: 'linear-gradient(160deg, #FF8800, #c66300)',
    popis: <><strong>Praktická a cenově dostupná.</strong> Příjemná na chůzi a snadno se udržuje — zvládne i každodenní provoz celé rodiny.</> },
  { slug: 'koberce', klic: 'koberce' as const, title: 'Koberce', emoji: '🧶', query: KOBERCOVA_PODLAHA_QUERY, barva: 'linear-gradient(160deg, var(--blue), #FF8800)',
    popis: <><strong>Teplo pod nohama</strong> a tlumení hluku. Široký výběr barev a struktur do ložnice, dětského pokoje i kanceláře.</> },
  { slug: 'drevena-podlaha', klic: 'drevo' as const, title: 'Dřevěná podlaha', emoji: '🌳', query: DREVENA_PODLAHA_QUERY, barva: 'linear-gradient(160deg, #3D3D3A, #000)',
    popis: <><strong>Přírodní a nadčasová.</strong> Do interiéru přinese teplo, charakter a originalitu.</> },
]

// uroven: h2 na /sluzby (pod H1 stránky), h3 na /lokality (pod nadpisem sekce)
export default async function TypyPodlah({ texty, uroven = 'h2' }: { texty?: TypyPodlahTexty; uroven?: 'h2' | 'h3' }) {
  const Nadpis = uroven
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

  return (
    <div className="sluzby-dlazdice-grid">
      {SLUZBY.map((s, i) => (
        <div key={s.slug} className="sluzby-dlazdice">
          <Link href={`/sluzby/${s.slug}`} className="sluzby-dlazdice-foto" aria-label={s.title}>
            {fotky[i] ? (
              <Image src={fotky[i] as string} alt={s.title} fill unoptimized style={{ objectFit: 'cover' }} />
            ) : (
              <div style={{ position: 'absolute', inset: 0, background: s.barva, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BrandIcon emoji={s.emoji} size={72} tone="onBlue" fill="none" />
              </div>
            )}
          </Link>
          <div className="sluzby-dlazdice-obsah">
            <Nadpis><FormatovanyText value={texty?.[s.klic]?.nazev} fallback={s.title} /></Nadpis>
            <p><FormatovanyText value={texty?.[s.klic]?.popis} fallback={s.popis} /></p>
            <Link href={`/sluzby/${s.slug}`} className="btn-primary"><span><FormatovanyText vOdkazu value={texty?.tlacitkoProdukt} fallback="Zobrazit produkt" /></span></Link>
          </div>
        </div>
      ))}
    </div>
  )
}
