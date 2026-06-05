type Vyhoda = { emoji?: string; title?: string; desc?: string }

const FALLBACK_VYHODY: Vyhoda[] = [
  { emoji: '🏆', title: 'Prémiový vinyl UpFloor', desc: 'Pracujeme výhradně s ověřenými materiály s dlouhou zárukou.' },
  { emoji: '⚡', title: 'Hotovo do týdne', desc: 'Od zaměření po položení v rekordním čase. Bez zdržování.' },
  { emoji: '♻️', title: 'Ekologická likvidace', desc: 'Starou podlahu odstraníme a ekologicky zlikvidujeme. Starost na nás.' },
  { emoji: '📍', title: 'MSK – známeee kraj', desc: 'Působíme v celém Moravskoslezském kraji. Přijedeme k vám.' },
]

export default function VyhodyBadge({ data }: { data?: { nadpis?: string; podnadpis?: string; vyhody?: Vyhoda[] } }) {
  const nadpis = data?.nadpis || 'Podlahu bez zbytečných starostí'
  const podnadpis = data?.podnadpis || 'Přijedeme, zaměříme, poradíme s výběrem. Celá realizace od A do Z — demontáž, příprava podkladu, pokládka, úklid.'
  const vyhody = data?.vyhody?.length ? data.vyhody : FALLBACK_VYHODY

  return (
    <section className="section" style={{ background: 'white' }}>
      <div className="container">
        <div className="vyhody-badge-grid">
          <div>
            <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Proč nás vybrat</p>
            <h2 className="section-title">{nadpis.split(' ').slice(0, -2).join(' ')}<br /><span>{nadpis.split(' ').slice(-2).join(' ')}</span></h2>
            <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.7, color: 'var(--gray-700)', maxWidth: 420 }}>{podnadpis}</p>
            <div style={{ marginTop: 32 }}>
              <a href="#kontakt" className="btn-primary">Zaměřit zdarma →</a>
            </div>
          </div>
          <div className="vyhody-badge-karty">
            {vyhody.map((v, i) => (
              <div key={i} style={{
                padding: '28px 24px', borderRadius: 12,
                background: i === 0 ? 'var(--orange)' : i === 1 ? 'var(--blue)' : 'var(--gray-50)',
                border: i >= 2 ? '1px solid var(--gray-100)' : 'none',
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{v.emoji}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: i < 2 ? 'white' : 'var(--black)', marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: i < 2 ? 'rgba(255,255,255,0.75)' : 'var(--gray-400)' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
