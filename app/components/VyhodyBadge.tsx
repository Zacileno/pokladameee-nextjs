"use client"
export default function VyhodyBadge() {
  const vyhody = [
    { icon: '🏆', title: 'Prémiový vinyl UpFloor', desc: 'Pracujeme výhradně s ověřenými materiály s dlouhou zárukou.' },
    { icon: '⚡', title: 'Hotovo do týdne', desc: 'Od zaměření po položení v rekordním čase. Bez zdržování.' },
    { icon: '♻️', title: 'Ekologická likvidace', desc: 'Starou podlahu odstraníme a ekologicky zlikvidujeme. Starost na nás.' },
    { icon: '📍', title: 'MSK – známeee kraj', desc: 'Působíme v celém Moravskoslezském kraji. Přijedeme k vám.' },
  ]

  return (
    <section className="section" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          {/* Text vlevo */}
          <div>
            <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
              Proč nás vybrat
            </p>
            <h2 className="section-title">
              Podlahu<br /><span>bez zbytečných</span><br />starostí
            </h2>
            <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.7, color: 'var(--gray-700)', maxWidth: 420 }}>
              Přijedeme, zaměříme, poradíme s výběrem. Celá realizace od A do Z — demontáž, příprava podkladu, pokládka, úklid.
            </p>
            <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
              <a href="#kontakt" className="btn-primary">Zaměřit zdarma →</a>
            </div>
          </div>

          {/* Grid vpravo */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {vyhody.map((v, i) => (
              <div key={i} style={{
                padding: '28px 24px',
                borderRadius: 12,
                background: i === 0 ? 'var(--orange)' : i === 1 ? 'var(--blue)' : 'var(--gray-50)',
                border: i >= 2 ? '1px solid var(--gray-100)' : 'none',
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{v.icon}</div>
                <h3 style={{
                  fontSize: 16, fontWeight: 800,
                  color: i < 2 ? 'white' : 'var(--black)',
                  marginBottom: 8,
                }}>{v.title}</h3>
                <p style={{
                  fontSize: 14, lineHeight: 1.55,
                  color: i < 2 ? 'rgba(255,255,255,0.75)' : 'var(--gray-400)',
                }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){.vyhody-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}
