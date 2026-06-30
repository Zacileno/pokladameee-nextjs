const kultura = [
  {
    emoji: '🎉',
    nadpisBase: 'Bavím',
    text: 'Deskovky, grilovačky nebo páteční pivko. Nikdo nás nenutí zůstat. A přesto se nám nechce odejít.',
  },
  {
    emoji: '⚽',
    nadpisBase: 'Sportujem',
    text: 'Víkendové výšlapy, sportovní turnaje nebo rychlá ranní nakopávačka. Nehoníme výkony, ale dobrou náladu.',
  },
  {
    emoji: '😄',
    nadpisBase: 'Smějeme s',
    text: 'Úsměv si udržujeme kvalitní kávou, společnými obědy nebo rodinnými akcemi.',
  },
  {
    emoji: '🤝',
    nadpisBase: 'Sdílím',
    text: 'Pravidelně se vidíme u firemní snídaně, kde se potkává celý tým i vedení. Mluvíme spolu napřímo – a díky tomu rosteme.',
  },
]

export default function KulturaGrid() {
  return (
    <section style={{ background: '#F8F5F0', padding: '80px 0' }}>
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 48 }}>
          Jak to u nás žij<span style={{ color: 'var(--orange)' }}>eee</span>
        </h2>
        <div className="kariera-kultura-grid">
          {kultura.map(({ emoji, nadpisBase, text }) => (
            <div key={nadpisBase} style={{
              background: 'white',
              borderRadius: 12,
              padding: 32,
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{emoji}</div>
              <h3 style={{ fontSize: 22, fontWeight: 700 }}>
                {nadpisBase}<span style={{ color: 'var(--orange)' }}>eee</span>
              </h3>
              <p style={{ fontSize: 15, color: '#555', lineHeight: 1.7, marginTop: 12 }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
