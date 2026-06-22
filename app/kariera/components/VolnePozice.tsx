'use client'
import { useState } from 'react'
import { pozice } from '../../../lib/kariera-data'

const FILTERS = [
  { value: 'vse', label: 'Vše' },
  { value: 'moravskoslezsky-kraj', label: 'Moravskoslezský kraj' },
]

export default function VolnePozice({ excludeSlug }: { excludeSlug?: string }) {
  const [activeFilter, setActiveFilter] = useState('vse')

  const filtered = pozice.filter(p => {
    if (excludeSlug && p.slug === excludeSlug) return false
    if (activeFilter === 'vse') return true
    return p.region === activeFilter
  })

  return (
    <section id="pozice" style={{ background: 'white', padding: '80px 0' }}>
      <div className="container">
        {!excludeSlug && (
          <h2 className="section-title" style={{ marginBottom: 32 }}>
            Volné pozic<span style={{ color: 'var(--orange)' }}>eee</span>
          </h2>
        )}
        {excludeSlug && (
          <h2 className="section-title" style={{ marginBottom: 32 }}>
            Další volné pozic<span style={{ color: 'var(--orange)' }}>eee</span>
          </h2>
        )}

        <div className="kariera-filtry" style={{ marginBottom: 24 }}>
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 15,
                padding: '8px 16px',
                borderRadius: 8,
                fontWeight: activeFilter === f.value ? 700 : 400,
                color: activeFilter === f.value ? 'var(--blue)' : '#999',
                borderBottom: activeFilter === f.value ? '2px solid var(--blue)' : '2px solid transparent',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <select
          className="kariera-filtry-mobile"
          value={activeFilter}
          onChange={e => setActiveFilter(e.target.value)}
          style={{ marginBottom: 24 }}
        >
          {FILTERS.map(f => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>

        <div>
          {filtered.map(p => (
            <a
              key={p.slug}
              href={`/kariera/${p.slug}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'white',
                boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                borderRadius: 10,
                padding: '0 24px',
                minHeight: 90,
                marginBottom: 12,
                cursor: 'pointer',
                transition: 'box-shadow 0.2s, transform 0.2s',
                textDecoration: 'none',
                color: 'inherit',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.18)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.1)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              <div>
                <p style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{p.nazev}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ background: 'var(--blue)', color: 'white', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 600 }}>
                    {p.regionLabel}
                  </span>
                  <span style={{ background: '#E8F0F8', color: 'var(--blue)', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 600 }}>
                    {p.typLabel}
                  </span>
                </div>
              </div>
              <span style={{ fontSize: 24, color: 'var(--orange)', flexShrink: 0 }}>→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
