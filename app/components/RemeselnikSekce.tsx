export default function RemeselnikSekce() {
  return (
    <section className="section" style={{ background: 'var(--orange-light)', overflow: 'hidden' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}>
          {/* Fotka vlevo */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 16, overflow: 'hidden', aspectRatio: '4/5', position: 'relative',
              boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
                alt="Adam Hajdušek – pokládámeee.cz"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', bottom: 20, left: 20,
                background: 'var(--orange)', color: 'white', fontWeight: 800,
                fontSize: 14, padding: '8px 16px', borderRadius: 100,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span>✓</span> pokládámeee.cz
              </div>
            </div>
            <div style={{
              position: 'absolute', top: -20, right: -20,
              background: 'var(--blue)', color: 'white',
              borderRadius: 12, padding: '20px 24px',
              boxShadow: '0 12px 32px rgba(21,76,134,0.3)', textAlign: 'center',
            }}>
              <div style={{ fontSize: 36, fontWeight: 900, lineHeight: 1 }}>200+</div>
              <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>realizací</div>
            </div>
          </div>

          {/* Text vpravo */}
          <div>
            <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
              Kdo u vás přijde
            </p>
            <h2 className="section-title" style={{ color: 'var(--black)' }}>
              Adam Hajdušek<br />
              <span>zakladatel & technik</span>
            </h2>
            <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.75, color: 'var(--gray-700)', marginBottom: 16 }}>
              Každou zakázku řeším osobně. Přijedu, změřím, poradím s výběrem vinylu — a řeknu vám rovnou co čekat, bez keců.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--gray-700)', marginBottom: 40 }}>
              Přes 200 realizací po celém MSK. Vinyl pokládám od roku 2018. Znám každý typ podkladu, na který v moravskoslezských domácnostech narazíte.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                ['🏆', '200+ realizací v MSK'],
                ['⭐', 'Hodnocení 5.0 na Google'],
                ['📞', 'Voláte mně — ne call centru'],
                ['🔧', 'Certifikovaný pokládač UpFloor'],
              ].map(([icon, text]) => (
                <div key={text as string} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, background: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}>{icon}</div>
                  <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--gray-700)' }}>{text as string}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
