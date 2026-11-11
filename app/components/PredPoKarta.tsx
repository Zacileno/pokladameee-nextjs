'use client'
import { useState, type CSSProperties } from 'react'

type Props = {
  po: string
  pred?: string
  nazev: string
  material?: string
  rozloha?: string
}

const stitek = (vpravo: boolean): CSSProperties => ({
  position: 'absolute', top: 12, [vpravo ? 'right' : 'left']: 12,
  padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 700, color: 'white',
  background: vpravo ? 'var(--orange)' : 'rgba(0,0,0,0.6)', pointerEvents: 'none',
})

export default function PredPoKarta({ po, pred, nazev, material, rozloha }: Props) {
  const [pozice, setPozice] = useState(50)

  return (
    <div>
      <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '4/3', userSelect: 'none' }}>
        {pred ? (
          <>
            {/* posuvník: vlevo stav před, vpravo po */}
            <img src={pred} alt={`${nazev} — před pokládkou`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <img src={po} alt={`${nazev} — po pokládce`} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', clipPath: `inset(0 0 0 ${pozice}%)` }} />
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${pozice}%`, width: 3, marginLeft: -1.5, background: 'white', boxShadow: '0 0 6px rgba(0,0,0,0.4)', pointerEvents: 'none' }}>
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                width: 40, height: 40, borderRadius: '50%', background: 'var(--orange)', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900,
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}>‹ ›</div>
            </div>
            <span style={stitek(false)}>Před</span>
            <span style={stitek(true)}>Po</span>
            <input
              type="range" min={0} max={100} value={pozice}
              onChange={e => setPozice(Number(e.target.value))}
              aria-label={`Porovnání před a po — ${nazev}`}
              className="predpo-posuvnik"
            />
          </>
        ) : (
          <img src={po} alt={nazev} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
