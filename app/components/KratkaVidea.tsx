'use client'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import YouTubeVideo from './YouTubeVideo'
import { shortsNahled, type KratkeVideo } from '../../lib/videa'

// Řada krátkých videí na výšku (YouTube Shorts) — klik otevře video v okně nad stránkou.
// Na mobilu se řada posouvá prstem, na počítači šipkami.
export default function KratkaVidea({ videa, nadpis, podnadpis, pozadi, id }: {
  videa: KratkeVideo[]
  nadpis?: ReactNode
  podnadpis?: ReactNode
  pozadi?: string
  id?: string
}) {
  const [otevrene, setOtevrene] = useState<KratkeVideo | null>(null)
  const rada = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!otevrene) return
    const zavrit = (e: KeyboardEvent) => { if (e.key === 'Escape') setOtevrene(null) }
    window.addEventListener('keydown', zavrit)
    return () => window.removeEventListener('keydown', zavrit)
  }, [otevrene])

  const posun = (smer: 1 | -1) => {
    const el = rada.current
    if (el) el.scrollBy({ left: smer * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  if (!videa.length) return null

  return (
    <section id={id} className="section kratka-videa" style={pozadi ? { background: pozadi } : undefined}>
      <div className="container">
        {(nadpis || podnadpis) && (
          <div className="kratka-videa-hlava">
            {nadpis && <h2 className="section-title">{nadpis}</h2>}
            {podnadpis && <p className="section-subtitle">{podnadpis}</p>}
          </div>
        )}
        <div className="kratka-videa-obal">
          <div className="kratka-videa-rada" ref={rada}>
            {videa.map(v => (
              <button key={v.id} type="button" className="kratke-video" onClick={() => setOtevrene(v)} aria-label={`Přehrát video: ${v.nazev}`}>
                <span className="kratke-video-foto">
                  <img src={shortsNahled(v.id, v.snimek)} alt="" loading="lazy" />
                  <span className="yt-video-play" aria-hidden="true" />
                </span>
                <span className="kratke-video-nazev">{v.nazev}</span>
              </button>
            ))}
          </div>
          {videa.length > 4 && (
            <>
              <button type="button" className="kratka-videa-sipka vlevo" onClick={() => posun(-1)} aria-label="Předchozí videa">‹</button>
              <button type="button" className="kratka-videa-sipka vpravo" onClick={() => posun(1)} aria-label="Další videa">›</button>
            </>
          )}
        </div>
      </div>

      {otevrene && (
        <div className="video-modal" role="dialog" aria-modal="true" aria-label={otevrene.nazev} onClick={() => setOtevrene(null)}>
          <div className="video-modal-obsah video-modal-svisle" onClick={e => e.stopPropagation()}>
            <button type="button" className="video-modal-zavrit" onClick={() => setOtevrene(null)} aria-label="Zavřít video">×</button>
            <YouTubeVideo id={otevrene.id} nazev={otevrene.nazev} autoplay pomer="9 / 16" />
          </div>
        </div>
      )}
    </section>
  )
}
