'use client'
import { useRef, useState } from 'react'

export type Recenze = {
  _id: string
  jmeno: string
  text: string
  hvezdicky: number
  datum?: string
  lokalita?: string
  odkaz?: string
  fotkaUrl?: string
}

// "2026-06-04" → "06/2026"
const mesicRok = (datum?: string) => {
  const m = datum?.match(/^(\d{4})-(\d{2})/)
  return m ? `${m[2]}/${m[1]}` : ''
}

// Slider recenzí podle vzoru Žaluzieee — fotka s uvozovkami, text, šipky a tečky
export default function RecenzeSlider({ recenze }: { recenze: Recenze[] }) {
  const [aktivni, setAktivni] = useState(0)
  const dotykX = useRef<number | null>(null)
  const pocet = recenze.length
  const posun = (o: number) => setAktivni(i => (i + o + pocet) % pocet)

  if (!pocet) return null

  return (
    <div
      className="recenze-slider"
      onTouchStart={e => { dotykX.current = e.touches[0].clientX }}
      onTouchEnd={e => {
        if (dotykX.current === null) return
        const rozdil = e.changedTouches[0].clientX - dotykX.current
        if (Math.abs(rozdil) > 40) posun(rozdil < 0 ? 1 : -1)
        dotykX.current = null
      }}
    >
      {pocet > 1 && (
        <button type="button" className="recenze-sipka recenze-sipka-vlevo" onClick={() => posun(-1)} aria-label="Předchozí recenze">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
        </button>
      )}

      {/* všechny slidy leží přes sebe, výška sekce tak neskáče podle délky textu */}
      <div className="recenze-slidy">
        {recenze.map((r, i) => {
          const misto = [r.lokalita, mesicRok(r.datum)].filter(Boolean).join(' ')
          return (
            <div key={r._id} className={`recenze-slide${r.fotkaUrl ? '' : ' bez-fotky'}${i === aktivni ? ' aktivni' : ''}`} aria-hidden={i !== aktivni}>
              {r.fotkaUrl && (
                <div className="recenze-foto">
                  <img src={r.fotkaUrl} alt={`Realizace podlahy — ${r.jmeno.trim()}`} loading="lazy" />
                </div>
              )}
              <div className="recenze-obsah">
                {!r.fotkaUrl && <span className="recenze-uvozovky" aria-hidden="true">”</span>}
                <div className="recenze-hvezdy" aria-label={`${r.hvezdicky} z 5 hvězdiček`}>{'★'.repeat(r.hvezdicky)}</div>
                <p className="recenze-text">{r.text}</p>
                <div className="recenze-paticka">
                  <div>
                    <div className="recenze-jmeno">{r.jmeno.trim()}</div>
                    {misto && <div className="recenze-misto">{misto}</div>}
                  </div>
                  {r.odkaz && (
                    <a href={r.odkaz} target="_blank" rel="noopener noreferrer" className="recenze-detail" tabIndex={i === aktivni ? 0 : -1}>
                      Zobrazit na Googlu
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {pocet > 1 && (
        <button type="button" className="recenze-sipka recenze-sipka-vpravo" onClick={() => posun(1)} aria-label="Další recenze">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      )}

      {pocet > 1 && (
        <div className="recenze-tecky">
          {recenze.map((r, i) => (
            <button key={r._id} type="button" className={i === aktivni ? 'aktivni' : ''} onClick={() => setAktivni(i)} aria-label={`Recenze ${i + 1}`} />
          ))}
        </div>
      )}
    </div>
  )
}
