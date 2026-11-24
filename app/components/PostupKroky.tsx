import BrandIcon from './BrandIcon'
import FormatovanyText from './FormatovanyText'
import { prostyText, type RT } from '@/lib/prostyText'

type Krok = { nadpis?: RT; text?: RT }

// ikona podle nadpisu kroku (texty jsou v Sanity, liší se podle podlahy)
const IKONY: [RegExp, string][] = [
  [/zavol|napíš|poptáv/i, '📞'],
  [/zaměř/i, '📐'],
  [/podklad/i, '🔨'],
  [/vzorník|vyber|výběr|materiál/i, '🎨'],
  [/demontáž|polož|pokládk/i, '🪵'],
  [/úklid|uklid/i, '🧹'],
]
const ZALOZNI = ['📞', '📐', '🪵', '🧹']

const ikona = (k: Krok, i: number) => IKONY.find(([re]) => re.test(prostyText(k.nadpis)))?.[1] ?? ZALOZNI[i % ZALOZNI.length]

// "Jak to probíhá" na podstránkách služeb — stejné dlaždice jako "Jak to funguje" na homepage
export default function PostupKroky({ kroky }: { kroky: Krok[] }) {
  return (
    <div className="kroky-grid postup-kroky">
      {kroky.map((k, i) => (
        <div key={i} className="krok-karta">
          <span className="krok-cislo">{i + 1}</span>
          <BrandIcon emoji={ikona(k, i)} size={64} />
          <h3><FormatovanyText value={k.nadpis} fallback={null} /></h3>
          <p><FormatovanyText value={k.text} fallback={null} /></p>
        </div>
      ))}
    </div>
  )
}
