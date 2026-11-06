import BrandIcon from '@/app/components/BrandIcon'
import FormatovanyText from '@/app/components/FormatovanyText'
import type { KarieraStranka } from '@/lib/kariera-data'

const eee = <span style={{ color: 'var(--orange)' }}>eee</span>

const kultura = [
  {
    emoji: '🎉',
    nadpis: <>Bavím{eee}</>,
    text: 'Deskovky, grilovačky nebo páteční pivko. Nikdo nás nenutí zůstat. A přesto se nám nechce odejít.',
  },
  {
    emoji: '⚽',
    nadpis: <>Sportujem{eee}</>,
    text: 'Víkendové výšlapy, sportovní turnaje nebo rychlá ranní nakopávačka. Nehoníme výkony, ale dobrou náladu.',
  },
  {
    emoji: '😄',
    nadpis: <>Smějeme s{eee}</>,
    text: 'Úsměv si udržujeme kvalitní kávou, společnými obědy nebo rodinnými akcemi.',
  },
  {
    emoji: '🤝',
    nadpis: <>Sdílím{eee}</>,
    text: 'Pravidelně se vidíme u firemní snídaně, kde se potkává celý tým i vedení. Mluvíme spolu napřímo – a díky tomu rosteme.',
  },
]

export default function KulturaGrid({ texty }: { texty?: KarieraStranka | null }) {
  const karty = texty?.kultura?.length
    ? texty.kultura.map(k => ({ ...k, nadpis: <FormatovanyText value={k.nadpis} fallback={null} /> }))
    : kultura

  return (
    <section style={{ background: '#F8F5F0', padding: '80px 0' }}>
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 48 }}>
          <FormatovanyText value={texty?.kulturaNadpis} fallback={<>Jak to u nás žij{eee}</>} />
        </h2>
        <div className="kariera-kultura-grid">
          {karty.map(({ emoji, nadpis, text }, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: 12,
              padding: 32,
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}>
              <div style={{ marginBottom: 16 }}><BrandIcon emoji={emoji} size={64} /></div>
              <h3 style={{ fontSize: 22, fontWeight: 700 }}>{nadpis}</h3>
              <p style={{ fontSize: 15, color: '#555', lineHeight: 1.7, marginTop: 12 }}><FormatovanyText value={text} fallback={null} /></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
