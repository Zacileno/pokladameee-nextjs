import BrandIcon from './BrandIcon'

type Krok = { nadpis?: string; text?: string }

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

const ikona = (k: Krok, i: number) => IKONY.find(([re]) => re.test(k.nadpis ?? ''))?.[1] ?? ZALOZNI[i % ZALOZNI.length]

// "Jak to probíhá" na podstránkách služeb — stejné dlaždice jako "Jak to funguje" na homepage
export default function PostupKroky({ kroky }: { kroky: Krok[] }) {
  return (
    <div className="kroky-grid postup-kroky">
      {kroky.map((k, i) => (
        <div key={k.nadpis || i} className="krok-karta">
          <span className="krok-cislo">{i + 1}</span>
          <BrandIcon emoji={ikona(k, i)} size={64} />
          <h3>{k.nadpis}</h3>
          <p>{k.text}</p>
        </div>
      ))}
    </div>
  )
}
