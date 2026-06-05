type Krok = { title?: string; desc?: string }

const FALLBACK_KROKY: Krok[] = [
  { title: 'Poptáteee nás', desc: 'Vyplníte formulář nebo nám zavoláte. Brzy vás kontaktujeme a domluvíme termín návštěvy.' },
  { title: 'Zaměřímeee', desc: 'Přijedeme zdarma k vám domů. Zaměříme prostor, poradíme s výběrem vinylu a připravíme kalkulaci.' },
  { title: 'Pokládámeee', desc: 'Naše parta dorazí ve smluvený den. Odstraníme starou podlahu, připravíme podklad a položíme novou.' },
  { title: 'Uklidímeee', desc: 'Po dokončení po sobě uklidíme. Odcházíme čistě — vy si jen užíváte novou podlahu.' },
]

export default function JakToFunguje({ data }: { data?: { kroky?: Krok[] } }) {
  const kroky = data?.kroky?.length ? data.kroky : FALLBACK_KROKY

  return (
    <section id="jak-to-funguje" className="section" style={{ background: 'var(--blue)', overflow: 'hidden', position: 'relative' }}>
      <div style={{
        position: 'absolute', right: -120, top: '50%', transform: 'translateY(-50%)',
        width: 500, height: 500, background: 'rgba(255,136,0,0.06)', borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 56 }}>
          <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
            Jak to fungujeee
          </p>
          <h2 className="section-title" style={{ color: 'white' }}>
            Čtyři kroky<br />
            <span style={{ color: 'var(--orange)' }}>k nové podlaze</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
          {kroky.map((k, i) => (
            <div key={i} style={{
              padding: '36px 32px',
              background: i % 2 === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
              position: 'relative',
            }}>
              <div style={{ fontSize: 72, fontWeight: 900, color: 'rgba(255,136,0,0.15)', lineHeight: 1, marginBottom: -16, position: 'relative', zIndex: 0 }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: 'white', marginBottom: 12, position: 'relative', zIndex: 1 }}>{k.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, lineHeight: 1.65, position: 'relative', zIndex: 1 }}>{k.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 56, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <a href="#kontakt" className="btn-primary" style={{ fontSize: 16 }}>Začít teď →</a>
          <div style={{ display: 'flex', gap: 32 }}>
            {[['⚡', 'Do 48 hodin', 'zaměříme'], ['📋', 'Zdarma', 'kalkulace'], ['✅', 'Do týdne', 'hotovo']].map(([icon, num, label]) => (
              <div key={num} style={{ color: 'white' }}>
                <div style={{ fontSize: 20 }}>{icon} <strong style={{ color: 'var(--orange)' }}>{num}</strong></div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
