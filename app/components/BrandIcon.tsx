import type { ReactNode } from 'react'

// Vlastní ikony v brandu (linka + dílec jako podlaha).
// Mapují se podle emoji, které přichází ze Sanity / fallbacků — neznámé emoji se vykreslí beze změny.

// f = výplň vnitřních ploch ikony (barva pozadí, aby ikona překryla dílec)
const ICONS: Record<string, (f: string) => ReactNode> = {
  // Zaměření — úhelník + tužka
  '📐': f => (
    <>
      <path d="M16 80V20l60 60z" />
      <path d="M28 68V49l19 19z" />
      <path d="M16 32h6M16 44h9M16 56h6M16 68h9M28 80v-6M40 80v-9M52 80v-6M64 80v-9" />
      <path d="M56 50l26-26 6 6-26 26-9 3z" />
      <path d="M77 29l6 6" />
    </>
  ),
  // Rychlost — stopky
  '⚡': f => (
    <>
      <circle cx="54" cy="52" r="25" fill={f} />
      <path d="M47 19h14M54 19v8M75 30l5-5" />
      <path d="M54 38v14l10 7" />
      <path d="M8 42h14M4 54h16M10 66h14" />
    </>
  ),
  // Odvoz staré podlahy — dodávka s prkny
  '♻': f => (
    <>
      <path d="M8 36h46v30H8z" fill={f} />
      <path d="M54 44h17l12 12v10H54z" fill={f} />
      <path d="M60 44v12h23" />
      <path d="M4 30h44l-3-6H4M8 24l-2-6h38" />
      <circle cx="22" cy="68" r="7" fill={f} />
      <circle cx="68" cy="68" r="7" fill={f} />
      <path d="M24 46a8 8 0 1 1 7 10M28 59l3-3-3-3" />
    </>
  ),
  // Výběr na míru — vějíř vzorků podlah
  '🎨': f => (
    <>
      <path d="M32 80L16 28l13-4 16 52z" fill={f} />
      <path d="M45 78l-4-54 13-1 4 54z" fill={f} />
      <path d="M58 78l12-52 13 3-12 52z" fill={f} />
      <path d="M23 42l6-2M27 56l6-2M44 38h6M45 52h6M71 42l5 1M68 56l5 1" />
    </>
  ),
  // Působnost — špendlík na mapě
  '📍': f => (
    <>
      <path d="M8 56l22-8 20 8 20-8 22 8v18l-20-8-20 8-20-8-22 8z" fill={f} />
      <path d="M30 48v18M70 48v18" />
      <path d="M50 62S31 43 31 28a19 19 0 0 1 38 0c0 15-19 34-19 34z" fill={f} />
      <circle cx="50" cy="28" r="7" />
    </>
  ),
  // Lepený vinyl — zubové hladítko nad lamelou
  '🪵': f => (
    <>
      <path d="M10 70l10-12h72L82 70z" fill={f} />
      <path d="M36 58l-5 12M60 58l-5 12" />
      <path d="M24 26h52v14H24z" fill={f} />
      <path d="M24 40l4 6 4-6 4 6 4-6 4 6 4-6 4 6 4-6 4 6 4-6 4 6 4-6" />
      <path d="M38 26V14h24v12" />
    </>
  ),
  // Plovoucí podlaha — dům s lamelami
  '🏠': f => (
    <>
      <path d="M14 44L50 14l36 30" />
      <path d="M22 38v34h56V38" fill={f} />
      <path d="M22 58h56M22 66h56M38 58v8M60 58v8M48 66v6M30 66v6M68 66v6" />
      <path d="M42 48V36h16v12" />
    </>
  ),
  // Prémiový materiál — medaile se stuhou
  '🏆': f => (
    <>
      <path d="M36 52L26 82l12-5 7 10 7-24M64 52l10 30-12-5-7 10-7-24" fill={f} />
      <circle cx="50" cy="38" r="24" fill={f} />
      <circle cx="50" cy="38" r="16" />
      <path d="M50 28l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
    </>
  ),
  // Kalkulace — podložka se seznamem
  '📋': f => (
    <>
      <path d="M24 18h52v62H24z" fill={f} />
      <path d="M40 12h20v12H40z" fill={f} />
      <path d="M34 38l4 4 7-8M52 38h16M34 54l4 4 7-8M52 54h16M52 70h16M34 70h10" />
    </>
  ),
  // Hotovo — fajfka v kruhu
  '✅': f => (
    <>
      <circle cx="50" cy="44" r="28" fill={f} />
      <path d="M36 45l10 10 19-21" />
    </>
  ),
  // Telefon — sluchátko
  '📞': f => (
    <>
      <path d="M30 14l12 16-8 8c4 10 12 18 22 22l8-8 16 12-8 12C46 78 22 54 18 22z" fill={f} />
      <path d="M58 20a20 20 0 0 1 18 18M58 8a32 32 0 0 1 30 30" />
    </>
  ),
  // Technik — klíč
  '🛠': f => (
    <>
      <g transform="translate(0 6) rotate(45 50 44)">
      <rect x="43" y="34" width="14" height="46" rx="7" fill={f} />
      <circle cx="50" cy="26" r="17" fill={f} />
      <path d="M43 6v15h14V6" fill={f} />
      <circle cx="50" cy="70" r="3" />
      </g>
    </>
  ),
  // E-mail — obálka
  '✉': f => (
    <>
      <path d="M12 24h76v48H12z" fill={f} />
      <path d="M12 24l38 30 38-30M12 72l28-24M88 72L60 48" />
    </>
  ),
  // Pracovní doba — hodiny
  '🕐': f => (
    <>
      <circle cx="50" cy="44" r="30" fill={f} />
      <path d="M50 26v18h14" />
      <path d="M50 16v4M50 68v4M22 44h4M74 44h4" />
    </>
  ),
}

// Barevné varianty podle pozadí, na kterém ikona leží
const TONES = {
  default: { line: 'var(--blue)', accent: 'var(--orange)', fill: '#fff' },
  onBlue: { line: '#fff', accent: 'var(--orange)', fill: 'var(--blue)' },
  onOrange: { line: '#fff', accent: 'var(--blue)', fill: 'var(--orange)' },
}

export type BrandIconTone = keyof typeof TONES

// Emoji může přijít s variačním selektorem (např. '♻️' = '♻' + U+FE0F)
const normalize = (emoji: string) => emoji.replace(/️/g, '').trim()

interface Props {
  emoji?: string
  size?: number
  tone?: BrandIconTone
}

export default function BrandIcon({ emoji, size = 48, tone = 'default' }: Props) {
  if (!emoji) return null
  const icon = ICONS[normalize(emoji)]

  if (!icon) {
    return <span style={{ fontSize: Math.round(size * 0.6), lineHeight: 1, display: 'inline-block' }}>{emoji}</span>
  }

  const t = TONES[tone]
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M20 76h60l12 14H8z" fill={t.accent} />
      <g fill="none" stroke={t.line} strokeWidth={size < 40 ? 5 : 3.4} strokeLinecap="round" strokeLinejoin="round">
        {icon(t.fill)}
      </g>
    </svg>
  )
}
