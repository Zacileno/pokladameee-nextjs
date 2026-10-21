'use client'
import { useState, useEffect } from 'react'

type Zbyva = { dny: number; hodiny: number; minuty: number; vteriny: number }

// Česká koncovka podle počtu: 1 den, 2–4 dny, 5+ dní
const sklonuj = (n: number, [jedna, dveAzCtyri, pet]: [string, string, string]) =>
  n === 1 ? jedna : n >= 2 && n <= 4 ? dveAzCtyri : pet

const spocitej = (konec: number): Zbyva | null => {
  const rozdil = konec - Date.now()
  if (rozdil <= 0) return null
  return {
    dny: Math.floor(rozdil / 86_400_000),
    hodiny: Math.floor((rozdil / 3_600_000) % 24),
    minuty: Math.floor((rozdil / 60_000) % 60),
    vteriny: Math.floor((rozdil / 1000) % 60),
  }
}

/**
 * Odpočet do konce akce. `konec` je ISO datum s časovou zónou, např. '2026-11-06T00:00:00+01:00'.
 * Čas se počítá až v prohlížeči (po mountu), aby se server a klient nerozcházely.
 */
export default function Odpocet({ konec, popisek = 'Zbývá' }: { konec: string; popisek?: string }) {
  const konecMs = new Date(konec).getTime()
  const [zbyva, setZbyva] = useState<Zbyva | null | undefined>(undefined)

  useEffect(() => {
    setZbyva(spocitej(konecMs))
    const interval = setInterval(() => setZbyva(spocitej(konecMs)), 1000)
    return () => clearInterval(interval)
  }, [konecMs])

  if (zbyva === null) {
    return (
      <div className="bf-odpocet">
        <span style={{ fontWeight: 700, color: 'var(--gray-700)' }}>Akce skončila</span>
      </div>
    )
  }

  const polozky: [number | undefined, [string, string, string]][] = [
    [zbyva?.dny, ['den', 'dny', 'dní']],
    [zbyva?.hodiny, ['hodina', 'hodiny', 'hodin']],
    [zbyva?.minuty, ['minuta', 'minuty', 'minut']],
    [zbyva?.vteriny, ['vteřina', 'vteřiny', 'vteřin']],
  ]

  return (
    <div className="bf-odpocet" role="timer" aria-live="off">
      <span style={{ fontSize: 22, lineHeight: 1 }} aria-hidden="true">⏰</span>
      <span style={{ fontWeight: 600, color: 'var(--gray-700)' }}>{popisek}</span>
      {polozky.map(([hodnota, tvary]) => (
        <span key={tvary[2]} className="bf-odpocet-polozka">
          <strong style={{ color: 'var(--orange)', fontWeight: 900, fontVariantNumeric: 'tabular-nums' }}>
            {hodnota ?? '--'}
          </strong>{' '}
          <span style={{ color: 'var(--gray-700)' }}>{sklonuj(hodnota ?? 0, tvary)}</span>
        </span>
      ))}
    </div>
  )
}
