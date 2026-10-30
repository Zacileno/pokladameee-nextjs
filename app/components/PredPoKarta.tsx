'use client'
import { useState } from 'react'

type Props = {
  po: string
  pred?: string
  nazev: string
  material?: string
  rozloha?: string
}

export default function PredPoKarta({ po, pred, nazev, material, rozloha }: Props) {
  const hasPred = Boolean(pred)
  const [zobrazit, setZobrazit] = useState<'pred' | 'po'>('po')

  return (
    <div>
      <div
        style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '4/3', cursor: hasPred ? 'pointer' : 'default' }}
        onClick={() => hasPred && setZobrazit(z => z === 'pred' ? 'po' : 'pred')}
      >
        <img
          src={zobrazit === 'pred' && pred ? pred : po}
          alt={nazev}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.3s' }}
        />
        {hasPred && (
          <>
            <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 4 }}>
              {(['pred', 'po'] as const).map(stav => (
                <button
                  key={stav}
                  onClick={e => { e.stopPropagation(); setZobrazit(stav) }}
                  style={{
                    padding: '4px 12px', borderRadius: 100, border: 'none',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    background: zobrazit === stav ? 'var(--orange)' : 'rgba(0,0,0,0.5)',
                    color: 'white', transition: 'background 0.2s',
                  }}
                >
                  {stav === 'pred' ? 'Před' : 'Po'}
                </button>
              ))}
            </div>
            <div style={{
              position: 'absolute', bottom: 12, right: 12,
              background: 'rgba(0,0,0,0.5)', color: 'white',
              fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 100,
            }}>
              klikni pro přepnutí
            </div>
          </>
        )}
      </div>
      <div style={{ marginTop: 14 }}>
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>{nazev}</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {material && (
            <span style={{
              background: 'var(--gray-50)', border: '1px solid var(--gray-100)',
              fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 100,
              color: 'var(--gray-700)',
            }}>{material}</span>
          )}
          {rozloha && (
            <span style={{
              background: 'var(--orange-light)', border: '1px solid rgba(255,136,0,0.2)',
              fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 100,
              color: 'var(--orange)',
            }}>{rozloha}</span>
          )}
        </div>
      </div>
    </div>
  )
}
