import BrandIcon from '@/app/components/BrandIcon'
import FormatovanyText from '@/app/components/FormatovanyText'
import type { KarieraStranka } from '@/lib/kariera-data'

const benefity: NonNullable<KarieraStranka['benefity']> = [
  { emoji: '🤑', text: 'Bonusy / Prémie' },
  { emoji: '🚘', text: 'Auto i pro soukromé účely' },
  { emoji: '🍰', text: 'Provize z prodeje' },
  { emoji: '🧑‍💼', text: 'Manažerský motivační program' },
  { emoji: '📱', text: 'Mobilní telefon' },
  { emoji: '🔥', text: 'Sleva na služby skupiny' },
  { emoji: '🕗', text: 'Flexibilní pracovní doba' },
  { emoji: '⛽', text: 'Příspěvek na dopravu' },
  { emoji: '🤳', text: 'Paušál i pro osobní účely' },
  { emoji: '🛏️', text: 'Příspěvek na ubytování' },
  { emoji: '👨‍💻', text: 'Vzdělávací kurzy a školení' },
  { emoji: '🍻', text: 'Firemní akce' },
  { emoji: '⚽', text: 'Multisport karta' },
  { emoji: '🛋️', text: 'Volné víkendy a svátky' },
]

export default function BenefityGrid({ compact = false, texty }: { compact?: boolean; texty?: KarieraStranka | null }) {
  const polozky = texty?.benefity?.length ? texty.benefity : benefity

  return (
    <section id="benefity" style={{ background: 'var(--blue)', padding: compact ? '48px 0' : '80px 0' }}>
      <div className="container">
        {!compact && (
          <h2 className="section-title" style={{ color: 'white', textAlign: 'center', marginBottom: 48 }}>
            <FormatovanyText value={texty?.benefityNadpis} fallback="Jaké benefity si naši zaměstnanci pochvalují?" />
          </h2>
        )}
        <div className="kariera-benefity-grid">
          {polozky.map(({ emoji, text }, i) => (
            <div key={i} style={{
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
              <BrandIcon emoji={emoji} size={56} tone="onBlue" fill="#2C5E92" />
              <span style={{ fontSize: 13, color: 'white', textAlign: 'center', fontWeight: 500 }}><FormatovanyText value={text} fallback={null} /></span>
            </div>
          ))}
        </div>
        {!compact && (
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <a href="#pozice" className="btn-primary" style={{ borderRadius: 10 }}>
              <FormatovanyText value={texty?.benefityTlacitko} fallback="Otevřené pozice" />
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
