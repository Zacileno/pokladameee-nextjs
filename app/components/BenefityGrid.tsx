import BrandIcon from './BrandIcon'
import FormatovanyText from './FormatovanyText'
import type { RT } from '@/lib/prostyText'

interface Benefit {
  emoji?: string
  nadpis?: RT
  text?: RT
}

interface Props {
  benefity: Benefit[]
  nadpisSecce?: RT
}

export default function BenefityGrid({ benefity, nadpisSecce }: Props) {
  return (
    <section className="section" style={{ background: 'var(--gray-50)' }}>
      <div className="container">
        {nadpisSecce && (
          <h2 className="section-title" style={{ marginBottom: 40 }}><FormatovanyText value={nadpisSecce} fallback={null} /></h2>
        )}
        <div className="benefity-grid">
          {benefity.map((b, i) => (
            <div key={i} className="benefity-karta">
              <div style={{ marginBottom: 12 }}><BrandIcon emoji={b.emoji} size={52} /></div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}><FormatovanyText value={b.nadpis} fallback={null} /></h3>
              <p style={{ fontSize: 15, color: 'var(--gray-700)', lineHeight: 1.6 }}><FormatovanyText value={b.text} fallback={null} /></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
