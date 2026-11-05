'use client'
import { useState } from 'react'
import { youtubeNahled } from '../../lib/videa'

// Přehrávač se načte až po kliknutí (rychlejší stránka, žádné cookies YouTube předem — youtube-nocookie.com).
// `nahled` = vlastní obrázek místo náhledu z YouTube, `pomer` = poměr stran (výchozí 16 / 9)
export default function YouTubeVideo({ id, nazev, autoplay = false, nahled, pomer }: { id: string; nazev: string; autoplay?: boolean; nahled?: string; pomer?: string }) {
  const [hraje, setHraje] = useState(autoplay)

  return (
    <div className="yt-video" style={pomer ? { aspectRatio: pomer } : undefined}>
      {hraje ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={nazev}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setHraje(true)} aria-label={`Přehrát video: ${nazev}`}>
          <img src={nahled || youtubeNahled(id)} alt="" loading="lazy" />
          <span className="yt-video-play" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
