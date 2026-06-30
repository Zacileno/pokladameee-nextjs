export default function KarieraHero() {
  return (
    <section style={{
      position: 'relative',
      minHeight: 500,
      display: 'flex',
      alignItems: 'center',
      background: 'linear-gradient(135deg, var(--blue) 0%, #0d3560 100%)',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(0,0,0,0.35)',
        zIndex: 1,
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 120, paddingBottom: 80 }}>
        <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: '2px', color: 'var(--orange)', textTransform: 'uppercase', marginBottom: 16 }}>
          Kariéra
        </p>
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: 'white', lineHeight: 1.1, marginBottom: 12 }}>
          Staň se součástí Pokládám<span style={{ color: 'var(--orange)' }}>eee</span>
        </h1>
        <p style={{ fontSize: 'clamp(24px, 3vw, 44px)', fontWeight: 400, color: 'white', lineHeight: 1.2, marginBottom: 36 }}>
          Leader v oblasti podlah v MSK
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a href="#pozice" className="btn-primary" style={{ borderRadius: 10, padding: '15px 28px' }}>
            Otevřené pozice
          </a>
          <a href="#benefity" className="btn-secondary" style={{ borderRadius: 10, padding: '15px 28px' }}>
            Proč pracovat s námi
          </a>
        </div>
      </div>
    </section>
  )
}
