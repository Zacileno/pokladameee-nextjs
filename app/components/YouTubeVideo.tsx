'use client'
import { useState } from 'react'
import { youtubeNahled } from '../../lib/videa'

// Přehrávač se načte až po kliknutí (rychlejší stránka, žádné cookies YouTube předem — youtube-nocookie.com)
export default function YouTubeVideo({ id, nazev, autoplay = false }: { id: string; nazev: string; autoplay?: boolean }) {
  const [hraje, setHraje] = useState(autoplay)

  return (
    <div className="yt-video">
      {hraje ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={nazev}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setHraje(true)} aria-label={`Přehrát video: ${nazev}`}>
          <img src={youtubeNahled(id)} alt="" loading="lazy" />
          <span className="yt-video-play" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
