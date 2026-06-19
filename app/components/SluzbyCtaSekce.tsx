interface Props {
  nadpis?: string
  text?: string
}

export default function SluzbyCtaSekce({
  nadpis = 'Chcete vědět přesnou cenu?',
  text = 'Přijedeme do 48 hodin, zaměříme a naceníme zdarma — bez závazku.',
}: Props) {
  return (
    <section style={{ background: '#154C86', padding: '80px 24px', textAlign: 'center' }}>
      <div className="container">
        <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 900, color: '#fff', marginBottom: 16 }}>
          {nadpis}
        </h2>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.85)', marginBottom: 36, maxWidth: 560, margin: '0 auto 36px' }}>
          {text}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <a href="tel:+420739229922" style={{
            color: '#fff', fontSize: 28, fontWeight: 700, textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            +420 739 229 922
          </a>
          <a href="/#kontakt" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#FF8800', color: '#fff', fontWeight: 700, fontSize: 16,
            padding: '14px 28px', borderRadius: 8, textDecoration: 'none',
            transition: 'background 0.2s, transform 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#e67a00'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#FF8800'; e.currentTarget.style.transform = 'none' }}
          >
            Napište nám →
          </a>
        </div>
      </div>
    </section>
  )
}
