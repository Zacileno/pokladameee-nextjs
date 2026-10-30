'use client'
import { useState } from 'react'

export default function FaqItem({ otazka, odpoved }: { otazka: string; odpoved: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--gray-100)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left', gap: 16,
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--black)', lineHeight: 1.4 }}>{otazka}</span>
        <span style={{
          flexShrink: 0, width: 28, height: 28, borderRadius: '50%',
          background: open ? 'var(--orange)' : 'var(--gray-100)',
          color: open ? 'white' : 'var(--gray-700)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 700, transition: 'background 0.2s',
        }}>
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--gray-700)', paddingBottom: 20, margin: 0 }}>
          {odpoved}
        </p>
      )}
    </div>
  )
}
