import BrandIcon from './BrandIcon'

type Krok = { title?: string; desc?: string }

const FALLBACK_KROKY: Krok[] = [
  { title: 'Poptáteee nás', desc: 'Vyplníte formulář nebo nám zavoláte. Brzy vás kontaktujeme a domluvíme termín návštěvy.' },
  { title: 'Zaměřímeee', desc: 'Přijedeme zdarma k vám domů. Zaměříme prostor, poradíme s výběrem vinylu a připravíme kalkulaci.' },
  { title: 'Pokládámeee', desc: 'Naše parta dorazí ve smluvený den. Odstraníme starou podlahu, připravíme podklad a položíme novou.' },
  { title: 'Uklidímeee', desc: 'Po dokončení po sobě uklidíme. Odcházíme čistě — vy si jen užíváte novou podlahu.' },
]

// ikony kroků podle pořadí: poptávka, zaměření, pokládka, úklid
const IKONY_KROKU = ['📞', '📐', '🪵', '🧹']

// "Poptáteee nás" → Poptát<span>eee</span> nás
const sEee = (text = '') => {
  const i = text.indexOf('eee')
  return i < 0 ? text : <>{text.slice(0, i)}<span>eee</span>{text.slice(i + 3)}</>
}

export default function JakToFunguje({ data }: { data?: { kroky?: Krok[] } }) {
  const kroky = data?.kroky?.length ? data.kroky : FALLBACK_KROKY

  return (
    <section id="jak-to-funguje" className="section" style={{ background: 'var(--blue)', overflow: 'hidden', position: 'relative' }}>
      <div style={{
        position: 'absolute', right: -120, top: '50%', transform: 'translateY(-50%)',
        width: 500, height: 500, background: 'rgba(255,136,0,0.06)', borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 64 }}>
          <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
            Jak to fungujeee
          </p>
          <h2 className="section-title" style={{ color: 'white' }}>
            Čtyři kroky{' '}
            <span style={{ color: 'var(--orange)' }}>k nové podlaze</span>
          </h2>
        </div>
        <div className="kroky-grid">
          {kroky.map((k, i) => (
            <div key={i} className="krok-karta">
              <span className="krok-cislo">{i + 1}</span>
              <BrandIcon emoji={IKONY_KROKU[i] ?? '✅'} size={64} />
              <h3>{sEee(k.title)}</h3>
              <p>{k.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 56, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <a href="#kontakt" className="btn-primary" style={{ fontSize: 16 }}>Začít teď</a>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[['⚡', 'Do 48 hodin', 'zaměříme'], ['📋', 'Zdarma', 'kalkulace'], ['✅', 'Hotovo', 'než se nadějeteee']].map(([icon, num, label]) => (
              <div key={num} style={{ color: 'white' }}>
                <div style={{ fontSize: 20, display: 'flex', alignItems: 'center', gap: 8 }}><BrandIcon emoji={icon} size={32} tone="onBlue" /> <strong style={{ color: 'var(--orange)' }}>{num}</strong></div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
