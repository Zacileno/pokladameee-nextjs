'use client'
import { useState } from 'react'

const projekty = [
  {
    id: 1,
    nazev: 'Obývací pokoj, Ostrava',
    material: 'Vinyl lepený, dub světlý',
    rozloha: '42 m²',
    pred: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    po: 'https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=600&q=80',
  },
  {
    id: 2,
    nazev: 'Kuchyň + jídelna, Opava',
    material: 'Vinyl lepený, beton šedý',
    rozloha: '28 m²',
    pred: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80',
    po: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
  },
  {
    id: 3,
    nazev: 'Ložnice, Frýdek-Místek',
    material: 'Vinyl plovoucí, ořech tmavý',
    rozloha: '19 m²',
    pred: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=600&q=80',
    po: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
  },
  {
    id: 4,
    nazev: 'Celý byt 3+1, Karviná',
    material: 'Vinyl lepený, dub přírodní',
    rozloha: '67 m²',
    pred: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
    po: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
  },
]

function PredPo({ pred, po, nazev }: { pred: string; po: string; nazev: string }) {
  const [zobrazit, setZobrazit] = useState<'pred' | 'po'>('po')

  return (
    <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '4/3', cursor: 'pointer' }}
      onClick={() => setZobrazit(z => z === 'pred' ? 'po' : 'pred')}>
      <img
        src={zobrazit === 'pred' ? pred : po}
        alt={nazev}
        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s' }}
      />
      {/* Přepínač */}
      <div style={{
        position: 'absolute', top: 12, left: 12,
        display: 'flex', gap: 4,
      }}>
        {(['pred', 'po'] as const).map(stav => (
          <button key={stav}
            onClick={e => { e.stopPropagation(); setZobrazit(stav) }}
            style={{
              padding: '4px 12px',
              borderRadius: 100,
              border: 'none',
              fontSize: 12,
              fontWeight: 700,
              cursor: 'pointer',
              background: zobrazit === stav ? 'var(--orange)' : 'rgba(0,0,0,0.5)',
              color: 'white',
              transition: 'background 0.2s',
            }}>
            {stav === 'pred' ? 'Před' : 'Po'}
          </button>
        ))}
      </div>
      {/* Hint */}
      <div style={{
        position: 'absolute', bottom: 12, right: 12,
        background: 'rgba(0,0,0,0.5)',
        color: 'white', fontSize: 11, fontWeight: 600,
        padding: '3px 8px', borderRadius: 100,
      }}>
        klikni pro přepnutí
      </div>
    </div>
  )
}

export default function GalerieSekce() {
  return (
    <section id="inspirace" className="section" style={{ background: 'white' }}>
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
            Naše práce
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <h2 className="section-title">
              Výsledky mluví<br /><span>samy za sebe</span>
            </h2>
            <p style={{ color: 'var(--gray-400)', fontSize: 15, maxWidth: 360, lineHeight: 1.6 }}>
              Kliknutím na fotku přepínáš mezi stavem před a po pokládce.
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {projekty.map(p => (
            <div key={p.id}>
              <PredPo pred={p.pred} po={p.po} nazev={p.nazev} />
              <div style={{ marginTop: 14 }}>
                <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{p.nazev}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{
                    background: 'var(--gray-50)', border: '1px solid var(--gray-100)',
                    fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 100,
                    color: 'var(--gray-700)',
                  }}>{p.material}</span>
                  <span style={{
                    background: 'var(--orange-light)', border: '1px solid rgba(255,136,0,0.2)',
                    fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 100,
                    color: 'var(--orange)',
                  }}>{p.rozloha}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <a href="#kontakt" className="btn-primary" style={{ fontSize: 16 }}>
            Chci taky novou podlahu →
          </a>
        </div>
      </div>
    </section>
  )
}
