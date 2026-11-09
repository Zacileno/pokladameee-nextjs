'use client'
import { useState, type ReactNode } from 'react'
import BrandIcon from '@/app/components/BrandIcon'

export type Krok = { cislo: string; nadpis: string; faze: string; obsah: ReactNode }

const IKONY = ['📞', '📐', '💰', '🎨', '📋', '🚛', '🏠', '🛠', '🔨', '🪵', '✅', '🤝']

// Cesta zakázky jako posuvník (inspirace Žaluzieee): časová osa s čísly + jedna karta.
// Karta se přizpůsobí délce textu; šipky jsou nad ní, aby při přepnutí neuskakovaly.
export default function PrubehKroky({ kroky }: { kroky: Krok[] }) {
  const [aktivni, setAktivni] = useState(0)
  const posun = (o: number) => setAktivni(a => (a + o + kroky.length) % kroky.length)

  return (
    <div className="prk">
      <div className="prk-osa" role="tablist" aria-label="Kroky zakázky">
        {kroky.map((k, i) => (
          <button
            key={k.cislo}
            type="button"
            role="tab"
            aria-selected={i === aktivni}
            aria-label={`Krok ${k.cislo}: ${k.nadpis}`}
            className={`prk-tecka${i === aktivni ? ' prk-tecka-aktivni' : ''}${i < aktivni ? ' prk-tecka-hotovo' : ''}`}
            onClick={() => setAktivni(i)}
          >
            {k.cislo}
          </button>
        ))}
      </div>

      <div className="prk-ovladani">
        <button type="button" className="prk-sipka" onClick={() => posun(-1)} aria-label="Předchozí krok">←</button>
        <span className="prk-pocet"><strong>{aktivni + 1}</strong> / {kroky.length}</span>
        <button type="button" className="prk-sipka" onClick={() => posun(1)} aria-label="Další krok">→</button>
      </div>

      <div className="prk-karta">
        {kroky.map((k, i) => (
          <article key={k.cislo} className={`prk-krok${i === aktivni ? ' prk-krok-aktivni' : ''}`} aria-hidden={i !== aktivni} role="tabpanel">
            <div className="prk-krok-hlava">
              <div className="prk-krok-ikona"><BrandIcon emoji={IKONY[i % IKONY.length]} size={72} /></div>
              <span className="prk-velke-cislo">{k.cislo.padStart(2, '0')}</span>
              <p className="prk-faze">{k.faze}</p>
              <h3>{k.nadpis}</h3>
            </div>
            <div className="prk-krok-text">{k.obsah}</div>
          </article>
        ))}
      </div>
    </div>
  )
}
