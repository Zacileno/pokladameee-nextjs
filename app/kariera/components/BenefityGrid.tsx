const benefity = [
  { emoji: '🤑', label: 'Bonusy / Prémie' },
  { emoji: '🚘', label: 'Auto i pro soukromé účely' },
  { emoji: '🍰', label: 'Provize z prodeje' },
  { emoji: '🧑‍💼', label: 'Manažerský motivační program' },
  { emoji: '📱', label: 'Mobilní telefon' },
  { emoji: '🔥', label: 'Sleva na služby skupiny' },
  { emoji: '🕗', label: 'Flexibilní pracovní doba' },
  { emoji: '⛽', label: 'Příspěvek na dopravu' },
  { emoji: '🤳', label: 'Paušál i pro osobní účely' },
  { emoji: '🛏️', label: 'Příspěvek na ubytování' },
  { emoji: '👨‍💻', label: 'Vzdělávací kurzy a školení' },
  { emoji: '🍻', label: 'Firemní akce' },
  { emoji: '⚽', label: 'Multisport karta' },
  { emoji: '🛋️', label: 'Volné víkendy a svátky' },
]

export default function BenefityGrid({ compact = false }: { compact?: boolean }) {
  return (
    <section id="benefity" style={{ background: 'var(--blue)', padding: compact ? '48px 0' : '80px 0' }}>
      <div className="container">
        {!compact && (
          <h2 className="section-title" style={{ color: 'white', textAlign: 'center', marginBottom: 48 }}>
            Jaké benefity si naši zaměstnanci pochvalují?
          </h2>
        )}
        <div className="kariera-benefity-grid">
          {benefity.map(({ emoji, label }) => (
            <div key={label} style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 10,
              padding: '30px 20px',
              height: 150,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            }}>
              <span style={{ fontSize: 40 }}>{emoji}</span>
              <span style={{ fontSize: 13, color: 'white', textAlign: 'center', fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>
        {!compact && (
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <a href="#pozice" className="btn-primary" style={{ borderRadius: 10 }}>
              Otevřené pozice
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
