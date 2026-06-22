import type { Pozice } from '../../../../lib/kariera-data'
import BenefityGrid from '../../components/BenefityGrid'
import KarieraKontaktForm from '../../components/KarieraKontaktForm'
import VolnePozice from '../../components/VolnePozice'
import TestimonialCarousel from '../../components/TestimonialCarousel'

const sectionStyle = {
  padding: 32,
  background: '#F8F5F0',
  borderRadius: 12,
  marginBottom: 24,
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' as const, gap: 10 }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', gap: 10, fontSize: 15, color: '#444', lineHeight: 1.6 }}>
          <span style={{ color: 'var(--orange)', flexShrink: 0, fontWeight: 700 }}>✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function PoziceDetail({ pozice }: { pozice: Pozice }) {
  return (
    <>
      <section style={{ background: 'white', padding: '48px 0 0' }}>
        <div className="container">
          <p style={{ fontSize: 14, color: '#999', marginBottom: 24 }}>
            <a href="/" style={{ color: '#999' }}>Domů</a>
            {' / '}
            <a href="/kariera" style={{ color: '#999' }}>Kariéra</a>
            {' / '}
            <span style={{ color: '#555' }}>{pozice.nazev}</span>
          </p>

          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            <span style={{ background: 'var(--blue)', color: 'white', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 600 }}>
              {pozice.regionLabel}
            </span>
            <span style={{ background: '#E8F0F8', color: 'var(--blue)', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 600 }}>
              {pozice.typLabel}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, marginBottom: 24 }}>{pozice.nazev}</h1>
          <p style={{ fontSize: 18, color: '#444', lineHeight: 1.7, marginBottom: 48, maxWidth: 720 }}>{pozice.perex}</p>

          <div style={sectionStyle}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
              Náplň prác<span style={{ color: 'var(--orange)' }}>eee</span>:
            </h2>
            <BulletList items={pozice.naplnPrace} />
          </div>

          <div style={sectionStyle}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
              Požadujem<span style={{ color: 'var(--orange)' }}>eee</span>:
            </h2>
            <BulletList items={pozice.pozadujeme} />
          </div>

          <div style={sectionStyle}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
              Nabízím<span style={{ color: 'var(--orange)' }}>eee</span>:
            </h2>
            <BulletList items={pozice.nabizime} />
          </div>
        </div>
      </section>

      <BenefityGrid compact />
      <KarieraKontaktForm poziceNazev={pozice.nazev} />
      <VolnePozice excludeSlug={pozice.slug} />
      <TestimonialCarousel />
    </>
  )
}
