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
  // Bonusy — bankovky + mince
  '🤑': f => (
    <>
      <path d="M10 26h56v34H10z" fill={f} />
      <circle cx="38" cy="43" r="8" />
      <path d="M18 34v0M58 52v0" />
      <circle cx="70" cy="58" r="16" fill={f} />
      <circle cx="70" cy="58" r="9" />
      <path d="M70 53v10" />
    </>
  ),
  // Auto — osobní auto
  '🚘': f => (
    <>
      <path d="M10 62V50l8-4 10-14h30l12 14 14 4v12z" fill={f} />
      <path d="M32 36h12v10H24zM50 36h6l8 10H50z" />
      <circle cx="28" cy="64" r="7" fill={f} />
      <circle cx="72" cy="64" r="7" fill={f} />
    </>
  ),
  // Provize — rostoucí graf
  '🍰': f => (
    <>
      <path d="M14 70V14M14 70h70" />
      <path d="M24 70V52h10v18M42 70V40h10v18M60 70V28h10v42" fill={f} />
      <path d="M22 40l16-12 12 6 22-16M64 18h8v8" />
    </>
  ),
  // Manažer — postava s kravatou
  '🧑‍💼': f => (
    <>
      <circle cx="50" cy="26" r="13" fill={f} />
      <path d="M22 74c0-18 12-28 28-28s28 10 28 28z" fill={f} />
      <path d="M46 46l4 6 4-6M50 52l-4 14 4 6 4-6z" />
    </>
  ),
  // Mobilní telefon
  '📱': f => (
    <>
      <rect x="32" y="10" width="36" height="64" rx="6" fill={f} />
      <path d="M44 18h12" />
      <circle cx="50" cy="64" r="3" />
    </>
  ),
  // Sleva — štítek s procenty
  '🔥': f => (
    <>
      <path d="M50 10l10 8 12-2 3 12 10 7-6 11 6 11-10 7-3 12-12-2-10 8-10-8-12 2-3-12-10-7 6-11-6-11 10-7 3-12 12 2z" fill={f} />
      <path d="M40 58l20-24" />
      <circle cx="40" cy="36" r="4" />
      <circle cx="60" cy="56" r="4" />
    </>
  ),
  // Flexibilní doba — hodiny se šipkou
  '🕗': f => (
    <>
      <circle cx="50" cy="44" r="22" fill={f} />
      <path d="M50 32v12l8 6" />
      <path d="M20 26a34 34 0 0 1 60 2M80 18v10H70" />
    </>
  ),
  // Doprava — tankovací stojan
  '⛽': f => (
    <>
      <path d="M18 74V16h36v58z" fill={f} />
      <path d="M26 24h20v16H26z" />
      <path d="M54 32h8l8 8v24a4 4 0 0 0 8 0V30l-8-8" />
      <path d="M12 74h48" />
    </>
  ),
  // Paušál — bublina s voláním
  '🤳': f => (
    <>
      <path d="M14 18h60v38H40l-14 12V56H14z" fill={f} />
      <circle cx="32" cy="37" r="3" />
      <circle cx="44" cy="37" r="3" />
      <circle cx="56" cy="37" r="3" />
    </>
  ),
  // Ubytování — postel
  '🛏': f => (
    <>
      <path d="M10 72V22M90 72V50M10 50h80" />
      <path d="M10 50V40h22v10z" fill={f} />
      <path d="M34 50V38h50a6 6 0 0 1 6 6v6z" fill={f} />
      <path d="M10 62h80" />
    </>
  ),
  // Školení — absolventská čepice
  '👨‍💻': f => (
    <>
      <path d="M8 34l42-18 42 18-42 18z" fill={f} />
      <path d="M26 42v18c0 6 12 10 24 10s24-4 24-10V42" fill={f} />
      <path d="M86 37v20" />
      <circle cx="86" cy="60" r="3" />
    </>
  ),
  // Firemní akce — přípitek
  '🍻': f => (
    <>
      <path d="M14 24h26v44H14z" fill={f} />
      <path d="M40 32h6a5 5 0 0 1 5 5v14a5 5 0 0 1-5 5h-6" />
      <path d="M54 24h26v44H54z" fill={f} />
      <path d="M80 32h6a5 5 0 0 1 5 5v14a5 5 0 0 1-5 5h-6" />
      <path d="M14 32h26M54 32h26" />
      <path d="M42 12l2 6M50 8v6M58 12l-2 6" />
    </>
  ),
  // Sport — míč
  '⚽': f => (
    <>
      <circle cx="50" cy="44" r="30" fill={f} />
      <path d="M50 32l11 8-4 13H43l-4-13z" />
      <path d="M50 32V15M61 40l16-5M57 53l9 14M43 53l-9 14M39 40l-16-5" />
    </>
  ),
  // Volné víkendy — pohovka
  '🛋': f => (
    <>
      <path d="M20 50V30a6 6 0 0 1 6-6h48a6 6 0 0 1 6 6v20" fill={f} />
      <path d="M10 48a6 6 0 0 1 12 0v6h56v-6a6 6 0 0 1 12 0v20H10z" fill={f} />
      <path d="M22 54v14M78 54v14M16 68v6M84 68v6" />
    </>
  ),
  // Bavíme — kornout s konfetami
  '🎉': f => (
    <>
      <path d="M12 74l18-48 30 30z" fill={f} />
      <path d="M24 42l14 14M20 54l8 8" />
      <path d="M54 22c4-6 10-6 12 0M70 36c6-4 12 0 10 6M44 14l2-6M78 22l6-4M62 50h8" />
      <circle cx="64" cy="12" r="2.5" />
      <circle cx="86" cy="54" r="2.5" />
    </>
  ),
  // Smějeme se — smajlík
  '😄': f => (
    <>
      <circle cx="50" cy="44" r="30" fill={f} />
      <path d="M38 36v4M62 36v4" />
      <path d="M34 52c8 12 24 12 32 0z" />
    </>
  ),
  // Sdílíme — dvě bubliny
  '🤝': f => (
    <>
      <path d="M8 16h48v30H28l-12 10V46H8z" fill={f} />
      <path d="M44 36h48v30h-8v10L72 66H44z" fill={f} />
      <path d="M18 28h26M18 36h16M54 48h28M54 56h18" />
    </>
  ),
  // Odvoz — dodávka (stejná jako ♻)
  '🚛': f => (
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
  // Zaměření — úhelník (stejný jako 📐)
  '📏': f => (
    <>
      <path d="M16 80V20l60 60z" />
      <path d="M28 68V49l19 19z" />
      <path d="M16 32h6M16 44h9M16 56h6M16 68h9M28 80v-6M40 80v-9M52 80v-6M64 80v-9" />
      <path d="M56 50l26-26 6 6-26 26-9 3z" />
      <path d="M77 29l6 6" />
    </>
  ),
  // Záruka — štít s fajfkou
  '🛡': f => (
    <>
      <path d="M50 10l30 10v22c0 18-13 30-30 36-17-6-30-18-30-36V20z" fill={f} />
      <path d="M36 44l10 10 18-20" />
    </>
  ),
  // Životnost — přesýpací hodiny
  '📊': f => (
    <>
      <path d="M28 12h44M28 74h44" />
      <path d="M33 12c0 18 17 22 17 31s-17 13-17 31h34c0-18-17-22-17-31s17-13 17-31z" fill={f} />
      <path d="M42 66h16M46 30h8" />
    </>
  ),
  // Dřevo — strom
  '🌳': f => (
    <>
      <path d="M50 58l-8-6M50 54l8-6" />
      <path d="M50 10a16 16 0 0 1 15 10 14 14 0 0 1 4 27H31a14 14 0 0 1 4-27 16 16 0 0 1 15-10z" fill={f} />
      <path d="M50 74V50" />
    </>
  ),
  // Brousitelná — kladivo
  '🔨': f => (
    <>
      <g transform="rotate(40 50 44)">
      <rect x="45" y="34" width="10" height="44" rx="5" fill={f} />
      <path d="M30 16h40v18H30z" fill={f} />
      <path d="M30 22h-6v6h6" />
      </g>
    </>
  ),
  // Hodnota nemovitosti — dům se šipkou
  '🏡': f => (
    <>
      <path d="M14 44L50 14l36 30" />
      <path d="M22 38v34h56V38" fill={f} />
      <path d="M50 64V40M40 50l10-10 10 10" />
    </>
  ),
  // Koberec — role
  '🧶': f => (
    <>
      <path d="M14 66l10-12h66l-10 12z" fill={f} />
      <path d="M30 22h50a14 14 0 0 1 0 28H30" fill={f} />
      <circle cx="30" cy="36" r="14" fill={f} />
      <path d="M30 36a4 4 0 1 1 4 4 8 8 0 1 1-8-8" />
    </>
  ),
  // Tichá — reproduktor ztlumený
  '🔇': f => (
    <>
      <path d="M16 34h12l18-16v52L28 54H16z" fill={f} />
      <path d="M60 34l18 18M78 34L60 52" />
    </>
  ),
  // Komerční prostory — budova
  '🏢': f => (
    <>
      <path d="M20 74V16h38v58z" fill={f} />
      <path d="M58 34h22v40H58" fill={f} />
      <path d="M29 26h6M43 26h6M29 38h6M43 38h6M29 50h6M43 50h6M66 46h6M66 58h6" />
      <path d="M35 74V62h8v12" />
      <path d="M14 74h72" />
    </>
  ),
  // Cena — peněženka
  '💰': f => (
    <>
      <path d="M26 30l34-14 6 14" fill={f} />
      <rect x="16" y="30" width="64" height="42" rx="6" fill={f} />
      <rect x="56" y="42" width="28" height="18" rx="5" fill={f} />
      <circle cx="66" cy="51" r="2.5" />
    </>
  ),
  // Měkký došlap — noha zboku na pružné vrstvě
  '🦶': f => (
    <>
      <path d="M30 14v32c0 8 3 14 10 14h38c5 0 8-3 7-7-1-4-5-6-10-7l-22-6c-6-2-9-7-9-13V14" fill={f} />
      <path d="M12 70q9-6 19 0t19 0 19 0 19 0" />
    </>
  ),
  // Snadná údržba — koště
  '🧹': f => (
    <>
      <path d="M74 8L54 44" />
      <path d="M44 38l20 10-8 26-34-16z" fill={f} />
      <path d="M30 60l-4 8M38 64l-4 9M46 67l-3 9M52 70l-2 7" />
      <path d="M42 46l18 9" />
    </>
  ),
  // Voděodolná — kapka
  '💧': f => (
    <>
      <path d="M50 10S26 38 26 54a24 24 0 0 0 48 0C74 38 50 10 50 10z" fill={f} />
      <path d="M38 56a12 12 0 0 0 9 11" />
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
const normalize = (emoji: string) => emoji.replace(/\uFE0F/g, '').trim()

interface Props {
  emoji?: string
  size?: number
  tone?: BrandIconTone
  // výplň vnitřku ikony, když pozadí neodpovídá žádné variantě (např. poloprůhledná dlaždice)
  fill?: string
}

export default function BrandIcon({ emoji, size = 48, tone = 'default', fill }: Props) {
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
        {icon(fill ?? t.fill)}
      </g>
    </svg>
  )
}

// Text, který začíná emoji (např. "🚛 Odvoz staré podlahy zdarma" ze Sanity) → ikona + zbytek textu
export function IkonaText({ text, size = 28, tone = 'default' }: { text: string; size?: number; tone?: BrandIconTone }) {
  const [prvni = '', ...zbytek] = text.trim().split(/\s+/)
  if (!ICONS[normalize(prvni)]) return <>{text}</>
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <BrandIcon emoji={prvni} size={size} tone={tone} />
      {zbytek.join(' ')}
    </span>
  )
}
