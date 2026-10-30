// Vykreslí pole typu "formatovanyText" ze Sanity (jeden Portable Text blok s
// marks pro tučně/kurzívu/barvu/velikost) inline, bez odstavcového obalu —
// aby šlo vložit doprostřed existujícího <h1>/<p>. Když Sanity nic nevrátí
// (nebo starý fallback), vykreslí se obyčejný text/JSX beze změny.

const BARVY: Record<string, string> = {
  orange: 'var(--orange)',
  blue: 'var(--blue)',
  black: 'var(--black)',
  white: '#fff',
  gray: 'var(--gray-400)',
}

const VELIKOSTI: Record<string, string> = {
  small: '0.85em',
  normal: '1em',
  large: '1.25em',
  xlarge: '1.6em',
}

type Span = { _type: 'span'; text: string; marks?: string[] }
type MarkDef = { _type: string; _key: string; hodnota?: string }
type Block = { _type: 'block'; children?: Span[]; markDefs?: MarkDef[] }

function renderSpan(span: Span, markDefs: MarkDef[], key: number) {
  let node: React.ReactNode = span.text
  const marks = span.marks || []

  if (marks.includes('em')) node = <em>{node}</em>
  if (marks.includes('strong')) node = <strong>{node}</strong>

  const style: React.CSSProperties = {}
  for (const markKey of marks) {
    const def = markDefs.find((d) => d._key === markKey)
    if (!def) continue
    if (def._type === 'barva' && def.hodnota) style.color = BARVY[def.hodnota]
    if (def._type === 'velikost' && def.hodnota) style.fontSize = VELIKOSTI[def.hodnota]
  }

  if (Object.keys(style).length) node = <span style={style}>{node}</span>
  return <span key={key}>{node}</span>
}

export default function FormatovanyText({ value, fallback }: { value?: Block[] | string | null; fallback: React.ReactNode }) {
  // Obyčejný string — buď fallback konstanta ze starého schématu, nebo placeholder. Vykreslí se přímo.
  if (typeof value === 'string') return <>{value}</>

  const block = value?.[0]
  if (!block?.children?.length) return <>{fallback}</>

  return (
    <>
      {block.children.map((span, i) => renderSpan(span, block.markDefs || [], i))}
    </>
  )
}
