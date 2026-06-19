interface Props {
  nadpis: string
  podnadpis: string
  ctaText?: string
  ctaHref?: string
}

export default function HeroSluzby({ nadpis, podnadpis, ctaText = 'Nezávazná konzultace zdarma', ctaHref = '/#kontakt' }: Props) {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #FF8800 0%, #e65c00 100%)',
      padding: '100px 24px 80px',
      textAlign: 'center',
    }}>
      <div className="container">
        <h1 style={{ fontSize: 'clamp(36px, 5vw, 48px)', fontWeight: 900, color: '#fff', marginBottom: 20, lineHeight: 1.1 }}>
          {nadpis}
        </h1>
        <p style={{ fontSize: 20, color: 'rgba(255,255,255,0.9)', maxWidth: 600, margin: '0 auto 36px', lineHeight: 1.6 }}>
          {podnadpis}
        </p>
        <a href={ctaHref} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#fff', color: '#FF8800', fontWeight: 700, fontSize: 16,
          padding: '14px 28px', borderRadius: 8, textDecoration: 'none',
          transition: 'transform 0.15s',
        }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
        >
          {ctaText} →
        </a>
      </div>
    </section>
  )
}
