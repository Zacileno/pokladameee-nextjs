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
            {/* Hlavní foto */}
            <div style={{
              borderRadius: 16,
              overflow: 'hidden',
              aspectRatio: '4/5',
              position: 'relative',
              boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
            }}>
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
                alt="Adam Hajdušek – pokládámeee.cz"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Brand overlay badge */}
              <div style={{
                position: 'absolute',
                bottom: 20,
                left: 20,
                background: 'var(--orange)',
                color: 'white',
                fontWeight: 800,
                fontSize: 14,
                padding: '8px 16px',
                borderRadius: 100,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <span>✓</span> pokládámeee.cz
              </div>
            </div>

            {/* Floating stat karta */}
            <div style={{
              position: 'absolute',
              top: -20,
              right: -20,
              background: 'var(--blue)',
              color: 'white',
              borderRadius: 12,
              padding: '20px 24px',
              boxShadow: '0 12px 32px rgba(21,76,134,0.3)',
              textAlign: 'center',
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
            <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.75, color: 'var(--gray-700)', marginBottom: 24 }}>
              Každou zakázku řeším osobně. Přijedu se podívat, změřím prostor, poradím s výběrem vinylu a řeknu vám rovnou, co čekat — bez slibů, které nejde splnit.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: 'var(--gray-700)', marginBottom: 40 }}>
              Za sebou mám stovky instalací po celém MSK. Vinyl pokládám od roku 2018 a znám každý typ podkladu, se kterým se v moravskoslezských domácnostech setkáte.
            </p>

            {/* Důvěryhodnostní signály */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                ['🏆', '200+ realizací po celém MSK'],
                ['⭐', 'Hodnocení 5.0 na Google recenzích'],
                ['📞', 'Osobní komunikace — bez call centra'],
                ['🔧', 'Certifikovaný pokládač UpFloor vinyl'],
              ].map(([icon, text]) => (
                <div key={text as string} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}>{icon}</div>
                  <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--gray-700)' }}>{text as string}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width: 900px) {
          .rem-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
