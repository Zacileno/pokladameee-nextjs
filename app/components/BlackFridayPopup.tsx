'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BF_KONEC } from '@/lib/black-friday'

const ZPOZDENI_MS = 3000
const KLIC_ZAVRENO = 'bf-popup-zavreno'

// Vyskakovací banner Black Friday na homepage — stejně jako na Žaluzieee se objeví po 3 s,
// po zavření se v rámci návštěvy (session) už neukáže a po konci akce zmizí úplně
export default function BlackFridayPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (Date.now() >= new Date(BF_KONEC).getTime()) return
    try {
      if (sessionStorage.getItem(KLIC_ZAVRENO)) return
    } catch {}
    const t = setTimeout(() => setOpen(true), ZPOZDENI_MS)
    return () => clearTimeout(t)
  }, [])

  const zavrit = () => {
    setOpen(false)
    try { sessionStorage.setItem(KLIC_ZAVRENO, '1') } catch {}
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') zavrit() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Black Friday akce"
      onClick={zavrit}
      style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative', width: '100%', maxWidth: 520, borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.35)' }}
      >
        <Link href="/black-friday" onClick={zavrit} style={{ display: 'block' }}>
          <Image
            src="/assets/black-friday-popup.jpg"
            alt="Black Friday jeee tady! Sleva 25 % na podlahové krytiny"
            width={700}
            height={633}
            unoptimized
            priority
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
          <span
            className="btn-primary"
            style={{ position: 'absolute', left: '50%', bottom: 20, transform: 'translateX(-50%)', boxShadow: '0 6px 18px rgba(0,0,0,0.35)' }}
          >
            Využít akci
          </span>
        </Link>
        <button
          type="button"
          aria-label="Zavřít"
          onClick={zavrit}
          style={{ position: 'absolute', top: 12, right: 12, width: 40, height: 40, borderRadius: '50%', background: 'white', color: 'var(--blue)', fontSize: 28, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
        >
          ×
        </button>
      </div>
    </div>
  )
}
