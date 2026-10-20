'use client'
import { useEffect, useId, useRef, useState } from 'react'
import type { AdresaNavrh } from '@/app/api/adresa/route'

type Props = {
  value: string
  onChange: (ulice: string) => void
  /** Vybraná adresa z našeptávače — doplní i město a PSČ. */
  onSelect: (adresa: { ulice: string; mesto: string; psc: string }) => void
  placeholder?: string
}

const formatPsc = (psc: string) => (/^\d{5}$/.test(psc) ? `${psc.slice(0, 3)} ${psc.slice(3)}` : psc)

/**
 * Pole „Ulice a č.p.“ s našeptávačem adres (Mapy.cz přes /api/adresa).
 * Bez výběru se chová jako obyčejné pole — adresu jde napsat i ručně.
 */
export default function AdresaNaseptavac({ value, onChange, onSelect, placeholder }: Props) {
  const [navrhy, setNavrhy] = useState<AdresaNavrh[]>([])
  const [otevreno, setOtevreno] = useState(false)
  const [aktivni, setAktivni] = useState(-1)
  // Po výběru adresy se do pole propíše text — ten už znovu nenašeptávat.
  const posledniVyber = useRef<string | null>(null)
  const listId = useId()

  useEffect(() => {
    const q = value.trim()
    if (q.length < 3 || q === posledniVyber.current) {
      setNavrhy([])
      return
    }
    const ctrl = new AbortController()
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/adresa?q=${encodeURIComponent(q)}`, { signal: ctrl.signal })
        const json = (await res.json()) as { data?: AdresaNavrh[] }
        setNavrhy(json.data ?? [])
        setAktivni(-1)
        setOtevreno(true)
      } catch {
        // přerušeno dalším psaním nebo výpadek — pole funguje dál bez návrhů
      }
    }, 250)
    return () => {
      clearTimeout(t)
      ctrl.abort()
    }
  }, [value])

  const vyber = (n: AdresaNavrh) => {
    posledniVyber.current = n.ulice
    onSelect({ ulice: n.ulice, mesto: n.mesto, psc: formatPsc(n.psc) })
    setNavrhy([])
    setOtevreno(false)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!otevreno || navrhy.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setAktivni((i) => (i + 1) % navrhy.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setAktivni((i) => (i <= 0 ? navrhy.length - 1 : i - 1))
    } else if (e.key === 'Enter' && aktivni >= 0) {
      e.preventDefault()
      vyber(navrhy[aktivni])
    } else if (e.key === 'Escape') {
      setOtevreno(false)
    }
  }

  const ukazat = otevreno && navrhy.length > 0

  return (
    <div className="adresa-naseptavac">
      <input
        className="form-input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          posledniVyber.current = null
          onChange(e.target.value)
        }}
        onKeyDown={onKeyDown}
        onFocus={() => navrhy.length > 0 && setOtevreno(true)}
        // Zpoždění, ať klik do seznamu stihne vybrat dřív, než se zavře.
        onBlur={() => setTimeout(() => setOtevreno(false), 150)}
        autoComplete="off"
        role="combobox"
        aria-expanded={ukazat}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={ukazat && aktivni >= 0 ? `${listId}-${aktivni}` : undefined}
      />
      {ukazat && (
        <ul id={listId} role="listbox" className="adresa-naseptavac-list">
          {navrhy.map((n, i) => (
            <li
              key={`${n.label}-${i}`}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === aktivni}
              className={i === aktivni ? 'is-active' : undefined}
              onMouseDown={(e) => {
                e.preventDefault()
                vyber(n)
              }}
            >
              {n.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
