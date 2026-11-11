'use client'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { TYP_NAZEV, type RealizaceFoto } from '@/lib/realizace'

type Props = {
  fotky: RealizaceFoto[]
  podlaha?: string
  id?: string
  nadtitulek?: string
  nadpis?: ReactNode
  podnadpis?: ReactNode
  velka?: boolean
}

const cesta = (f: RealizaceFoto) => `/realizace/${f.soubor}.jpg`
const popisek = (f: RealizaceFoto) => (f.typ ? `${TYP_NAZEV[f.typ]} · ${f.mesto}` : f.mesto)

export default function RealizaceGalerie({
  fotky,
  podlaha,
  id = 'realizace',
  nadtitulek,
  nadpis = <>Kde naše podlahy dělají radost? Inspirujt<span>eee</span> se</>,
  podnadpis = 'Fotky z našich realizací.',
  velka = false,
}: Props) {
  const draha = useRef<HTMLDivElement>(null)
  const [aktivni, setAktivni] = useState(0)
  const [otevrena, setOtevrena] = useState<number | null>(null)

  // posune slider tak, aby byla fotka i uprostřed
  const najet = (i: number, chovani: ScrollBehavior = 'smooth') => {
    const el = draha.current
    const slide = el?.children[i] as HTMLElement | undefined
    if (!el || !slide) return
    el.scrollTo({ left: slide.offsetLeft - (el.clientWidth - slide.clientWidth) / 2, behavior: chovani })
  }

  // aktivní je fotka nejblíž středu
  const priPosunu = () => {
    const el = draha.current
    if (!el) return
    const stred = el.scrollLeft + el.clientWidth / 2
    let nejblizsi = 0
    Array.from(el.children).forEach((c, i) => {
      const s = c as HTMLElement
      const vzdalenost = Math.abs(s.offsetLeft + s.clientWidth / 2 - stred)
      const nejlepsi = el.children[nejblizsi] as HTMLElement
      if (vzdalenost < Math.abs(nejlepsi.offsetLeft + nejlepsi.clientWidth / 2 - stred)) nejblizsi = i
    })
    setAktivni(nejblizsi)
  }

  // velká galerie začíná druhou fotkou, aby byly vidět sousední po obou stranách
  useEffect(() => {
    if (velka && fotky.length > 2) najet(1, 'instant')
  }, [])

  // šipky a Esc v otevřeném náhledu
  useEffect(() => {
    if (otevrena === null) return
    const klavesa = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOtevrena(null)
      if (e.key === 'ArrowRight') setOtevrena(i => (i === null ? i : (i + 1) % fotky.length))
      if (e.key === 'ArrowLeft') setOtevrena(i => (i === null ? i : (i - 1 + fotky.length) % fotky.length))
    }
    window.addEventListener('keydown', klavesa)
    return () => window.removeEventListener('keydown', klavesa)
  }, [otevrena, fotky.length])

  if (!fotky.length) return null
  const zvetsena = otevrena === null ? null : fotky[otevrena]
  const alt = (f: RealizaceFoto) => `${f.typ ? TYP_NAZEV[f.typ] : podlaha} — realizace ${f.mesto}`

  return (
    <section id={id} className="section" style={{ scrollMarginTop: 'calc(80px + var(--hlavicka-navic))' }}>
      <div className="container">
        {nadtitulek && <p className="realizace-nadtitulek">{nadtitulek}</p>}
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 8 }}>
          {nadpis}
        </h2>
        <p className="section-subtitle" style={{ textAlign: 'center', margin: '0 auto 40px' }}>
          {podnadpis}
        </p>
      </div>

      <div className={`realizace-slider${velka ? ' velka' : ''}`}>
        <div className="realizace-draha" ref={draha} onScroll={priPosunu}>
          {fotky.map((f, i) => (
            <button
              key={f.soubor}
              type="button"
              className={`realizace-slide${i === aktivni ? ' aktivni' : ''}`}
              onClick={() => (i === aktivni ? setOtevrena(i) : najet(i))}
              aria-label={i === aktivni ? `Zvětšit fotku — ${popisek(f)}` : `Zobrazit fotku — ${popisek(f)}`}
            >
              <img src={cesta(f)} alt={alt(f)} loading={i < 3 ? 'eager' : 'lazy'} />
              <span>{popisek(f)}</span>
            </button>
          ))}
        </div>
        {fotky.length > 1 && (
          <>
            <button type="button" className="realizace-sipka vlevo" aria-label="Předchozí fotka"
              onClick={() => najet(Math.max(0, aktivni - 1))} disabled={aktivni === 0}>‹</button>
            <button type="button" className="realizace-sipka vpravo" aria-label="Další fotka"
              onClick={() => najet(Math.min(fotky.length - 1, aktivni + 1))} disabled={aktivni === fotky.length - 1}>›</button>
          </>
        )}
      </div>

      <div className="realizace-tecky">
        {fotky.map((f, i) => (
          <button key={f.soubor} type="button" className={i === aktivni ? 'aktivni' : ''} onClick={() => najet(i)} aria-label={`Fotka ${i + 1}`} />
        ))}
      </div>

      {zvetsena && otevrena !== null && (
        <div className="realizace-lightbox" onClick={() => setOtevrena(null)} role="dialog" aria-label="Zvětšená fotka">
          <img src={cesta(zvetsena)} alt={alt(zvetsena)} />
          {fotky.length > 1 && (
            <>
              <button type="button" style={{ left: 20 }} aria-label="Předchozí fotka"
                onClick={e => { e.stopPropagation(); setOtevrena((otevrena - 1 + fotky.length) % fotky.length) }}>‹</button>
              <button type="button" style={{ right: 20 }} aria-label="Další fotka"
                onClick={e => { e.stopPropagation(); setOtevrena((otevrena + 1) % fotky.length) }}>›</button>
            </>
          )}
          <p>{popisek(zvetsena)}</p>
        </div>
      )}
    </section>
  )
}
