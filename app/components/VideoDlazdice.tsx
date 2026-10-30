'use client'
import { useEffect, useState } from 'react'
import YouTubeVideo from './YouTubeVideo'
import { youtubeNahled, type Video } from '../../lib/videa'

// Dlaždice s náhledem videa — „Podívat se" otevře video v okně nad stránkou
export default function VideoDlazdice({ video }: { video: Video }) {
  const [otevreno, setOtevreno] = useState(false)

  useEffect(() => {
    if (!otevreno) return
    const zavrit = (e: KeyboardEvent) => { if (e.key === 'Escape') setOtevreno(false) }
    window.addEventListener('keydown', zavrit)
    return () => window.removeEventListener('keydown', zavrit)
  }, [otevreno])

  return (
    <>
      <div className="video-dlazdice">
        <button type="button" className="video-dlazdice-foto" onClick={() => setOtevreno(true)} aria-label={`Přehrát video: ${video.nazev}`}>
          <img src={youtubeNahled(video.id)} alt="" loading="lazy" />
          <span className="yt-video-play" aria-hidden="true" />
        </button>
        <div className="video-dlazdice-obsah">
          <h3>{video.nazev}</h3>
          <p>{video.popis}</p>
          <button type="button" className="btn-primary" onClick={() => setOtevreno(true)}>Podívat se</button>
        </div>
      </div>

      {otevreno && (
        <div className="video-modal" role="dialog" aria-modal="true" aria-label={video.nazev} onClick={() => setOtevreno(false)}>
          <div className="video-modal-obsah" onClick={e => e.stopPropagation()}>
            <button type="button" className="video-modal-zavrit" onClick={() => setOtevreno(false)} aria-label="Zavřít video">×</button>
            <YouTubeVideo id={video.id} nazev={video.nazev} autoplay />
          </div>
        </div>
      )}
    </>
  )
}
