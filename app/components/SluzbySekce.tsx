type Sluzba = {
  emoji?: string
  title?: string
  desc?: string
  detail?: string
}

type Props = {
  data?: {
    nadpis?: string
    podnadpis?: string
    sluzby?: Sluzba[]
  }
}

const FALLBACK_SLUZBY: Sluzba[] = [
  { emoji: '🪵', title: 'Vinylová podlaha lepená', desc: 'Nejtrvanlivější varianta. Ideální do kuchyní, koupelen a prostor s vyšší zátěží. Lepíme pouze prémiové kolekce UpFloor.', detail: 'Od 346 Kč/m² materiál' },
  { emoji: '🏠', title: 'Vinylová podlaha plovoucí', desc: 'Rychlá montáž bez lepidla. Skvělá volba pro obývací pokoje a ložnice. Perfektní imitace dřeva i kamene.', detail: 'Montáž do 1 dne' },
  { emoji: '♻️', title: 'Výměna staré podlahy', desc: 'Ekologicky odstraníme vaši starou podlahu a připravíme podklad. Vše v jedné návštěvě bez zbytečného čekání.', detail: 'Ekologická likvidace zdarma' },
  { emoji: '📐', title: 'Zaměření a konzultace', desc: 'Přijedeme se podívat, poradíme s výběrem materiálu, barvy i vzoru. Připravíme nezávaznou kalkulaci do 24 hodin.', detail: 'Zdarma po celém MSK' },
]

export default function SluzbySekce({ data }: Props) {
  const nadpis = data?.nadpis || 'Specializujeme se na vinylové podlahy'
  const podnadpis = data?.podnadpis || 'Vinyl je dnes nejlepší volbou pro moderní domácnosti — odolný, vodovzdorný, snadná údržba a krásný design.'
  const sluzby = data?.sluzby?.length ? data.sluzby : FALLBACK_SLUZBY

  const nadpisSlova = nadpis.split(' ')
  const posledniDve = nadpisSlova.slice(-2).join(' ')
  const zbytek = nadpisSlova.slice(0, -2).join(' ')

  return (
    <section id="sluzby" className="section" style={{ background: 'var(--gray-50)' }}>
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Co pokládámeee</p>
          <h2 className="section-title">
            {zbytek && <>{zbytek}<br /></>}
            na <span>{posledniDve.replace(/^na /, '')}</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: 16 }}>{podnadpis}</p>
        </div>

        <div className="sluzby-grid">
          {sluzby.map((s, i) => (
            <div key={i} className="sluzba-karta">
              <div className="sluzba-ikona">{s.emoji}</div>
              <div className="sluzba-obsah">
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 12, color: 'var(--gray-700)' }}>{s.desc}</p>
                <div style={{ display: 'inline-block', background: 'var(--orange-light)', color: 'var(--orange)', fontWeight: 700, fontSize: 12, padding: '4px 10px', borderRadius: 100 }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <a href="#kontakt" className="btn-primary" style={{ fontSize: 16 }}>Nezávazně poptat →</a>
        </div>
      </div>
    </section>
  )
}
