import FormatovanyText from '@/app/components/FormatovanyText'
import type { KarieraStranka } from '@/lib/kariera-data'

const filozofie: NonNullable<KarieraStranka['filozofie']> = [
  {
    nadpis: 'Inovace, rozvoj a kvalita',
    text: 'Neusínáme na vavřínech. Neustále se učíme a zkoušíme nové postupy pokládky. Hledáme cesty, jak věci dělat ještě lépe a rychleji. Kvalita je pro nás standard, ne výjimka.',
  },
  {
    nadpis: 'Důvěra a spolehlivost',
    text: 'Nehledáme výmluvy, hledáme řešení. Ať už jde o kolegu, nebo zákazníka – dané slovo platí. Zákazník nám svěřuje podlahu svého domova.',
  },
  {
    nadpis: 'Přátelské a profi prostředí',
    text: 'Každý z nás má svou roli. Spojujeme profesionalitu s přátelským přístupem. Tvoříme prostředí, kde se lidé cítí dobře a zároveň odvádějí špičkovou práci.',
  },
]

export default function FilozofieSecce({ texty }: { texty?: KarieraStranka | null }) {
  const karty = texty?.filozofie?.length ? texty.filozofie : filozofie

  return (
    <section style={{ background: 'white', padding: '80px 0' }}>
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 56 }}>
          <FormatovanyText value={texty?.filozofieNadpis} fallback={<>Naše filozofi<span style={{ color: 'var(--orange)' }}>eee</span></>} />
        </h2>
        <div className="kariera-filozofie-grid">
          {karty.map(({ nadpis, text }, i) => (
            <div key={i} style={{
              position: 'relative',
              padding: '40px 32px',
              border: '1px solid #eee',
              borderRadius: 12,
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute',
                top: -20,
                left: 20,
                fontSize: 120,
                fontWeight: 900,
                color: 'rgba(255,136,0,0.08)',
                lineHeight: 1,
                fontFamily: 'Barlow, sans-serif',
                pointerEvents: 'none',
                userSelect: 'none',
              }}>{String(i + 1).padStart(2, '0')}</div>
              <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, marginTop: 60 }}><FormatovanyText value={nadpis} fallback={null} /></h3>
              <p style={{ fontSize: 15, color: '#555', lineHeight: 1.7 }}><FormatovanyText value={text} fallback={null} /></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
