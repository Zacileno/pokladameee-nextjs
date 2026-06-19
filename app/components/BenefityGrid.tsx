interface Benefit {
  emoji: string
  nadpis: string
  text: string
}

interface Props {
  benefity: Benefit[]
  nadpisSecce?: string
}

export default function BenefityGrid({ benefity, nadpisSecce }: Props) {
  return (
    <section className="section" style={{ background: 'var(--gray-50)' }}>
      <div className="container">
        {nadpisSecce && (
          <h2 className="section-title" style={{ marginBottom: 40 }}>{nadpisSecce}</h2>
        )}
        <div className="benefity-grid">
          {benefity.map((b, i) => (
            <div key={i} className="benefity-karta">
              <div style={{ fontSize: 32, marginBottom: 12 }}>{b.emoji}</div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{b.nadpis}</h3>
              <p style={{ fontSize: 15, color: 'var(--gray-700)', lineHeight: 1.6 }}>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
