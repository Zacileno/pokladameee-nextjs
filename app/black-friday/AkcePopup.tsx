'use client'
import { useState, useEffect } from 'react'
import KontaktForm from '../components/KontaktForm'

// Tlačítko "Využít akci" — stejně jako na Žaluzieee otevře vyskakovací okno s poptávkovým formulářem
export default function AkcePopup({ label = 'Využít akci' }: { label?: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button type="button" className="btn-primary" style={{ fontSize: 17, padding: '15px 32px' }} onClick={() => setOpen(true)}>
        {label}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="bf-popup-nadpis"
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ position: 'relative', background: 'white', borderRadius: 16, padding: '36px 32px', boxShadow: '0 24px 64px rgba(0,0,0,0.35)', width: '100%', maxWidth: 460, maxHeight: '90vh', overflowY: 'auto' }}
          >
            <button
              type="button"
              aria-label="Zavřít"
              onClick={() => setOpen(false)}
              style={{ position: 'absolute', top: 12, right: 14, background: 'none', fontSize: 26, lineHeight: 1, color: 'var(--gray-400)' }}
            >
              ×
            </button>
            <div style={{ marginBottom: 24 }}>
              <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Black Friday</p>
              <h3 id="bf-popup-nadpis" style={{ fontSize: 22, fontWeight: 900, marginBottom: 4 }}>Chci podlahu se slevou 25 %</h3>
              <p style={{ color: 'var(--gray-400)', fontSize: 14 }}>Odpovíme do 24 hodin. Zaměření zdarma.</p>
            </div>
            <KontaktForm />
          </div>
        </div>
      )}
    </>
  )
}
