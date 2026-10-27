import type { ReactNode } from 'react'

// Vlastní ikony v brandu (modrá linka + oranžový dílec jako podlaha).
// Mapují se podle emoji, které přichází ze Sanity / fallbacků — neznámé emoji se vykreslí beze změny.

const ICONS: Record<string, ReactNode> = {
  // Zaměření — úhelník + tužka
  '📐': (
    <>
      <path d="M16 80V20l60 60z" />
      <path d="M28 68V49l19 19z" />
      <path d="M16 32h6M16 44h9M16 56h6M16 68h9M28 80v-6M40 80v-9M52 80v-6M64 80v-9" />
      <path d="M56 50l26-26 6 6-26 26-9 3z" />
      <path d="M77 29l6 6" />
    </>
  ),
  // Rychlost — stopky
  '⚡': (
    <>
      <circle cx="54" cy="52" r="25" fill="#fff" />
      <path d="M47 19h14M54 19v8M75 30l5-5" />
      <path d="M54 38v14l10 7" />
      <path d="M8 42h14M4 54h16M10 66h14" />
    </>
  ),
  // Odvoz staré podlahy — dodávka s prkny
  '♻': (
    <>
      <path d="M8 36h46v30H8z" fill="#fff" />
      <path d="M54 44h17l12 12v10H54z" fill="#fff" />
      <path d="M60 44v12h23" />
      <path d="M4 30h44l-3-6H4M8 24l-2-6h38" />
      <circle cx="22" cy="68" r="7" fill="#fff" />
      <circle cx="68" cy="68" r="7" fill="#fff" />
      <path d="M24 46a8 8 0 1 1 7 10M28 59l3-3-3-3" />
    </>
  ),
  // Výběr na míru — vějíř vzorků podlah
  '🎨': (
    <>
      <path d="M32 80L16 28l13-4 16 52z" fill="#fff" />
      <path d="M45 78l-4-54 13-1 4 54z" fill="#fff" />
      <path d="M58 78l12-52 13 3-12 52z" fill="#fff" />
      <path d="M23 42l6-2M27 56l6-2M44 38h6M45 52h6M71 42l5 1M68 56l5 1" />
    </>
  ),
  // Působnost — špendlík na mapě
  '📍': (
    <>
      <path d="M8 56l22-8 20 8 20-8 22 8v18l-20-8-20 8-20-8-22 8z" fill="#fff" />
      <path d="M30 48v18M70 48v18" />
      <path d="M50 62S31 43 31 28a19 19 0 0 1 38 0c0 15-19 34-19 34z" fill="#fff" />
      <circle cx="50" cy="28" r="7" />
    </>
  ),
}

// Emoji může přijít s variačním selektorem (např. '♻️' = '♻' + U+FE0F)
const normalize = (emoji: string) => emoji.replace(/️/g, '').trim()

interface Props {
  emoji?: string
  size?: number
}

export default function BrandIcon({ emoji, size = 48 }: Props) {
  if (!emoji) return null
  const icon = ICONS[normalize(emoji)]

  if (!icon) {
    return <span style={{ fontSize: Math.round(size * 0.6), lineHeight: 1, display: 'inline-block' }}>{emoji}</span>
  }

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ display: 'block' }}>
      <path d="M20 76h60l12 14H8z" fill="var(--orange)" />
      <g fill="none" stroke="var(--blue)" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round">
        {icon}
      </g>
    </svg>
  )
}
