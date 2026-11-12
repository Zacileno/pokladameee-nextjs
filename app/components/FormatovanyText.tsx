// Vykreslí pole typu "formatovanyText" ze Sanity (jeden Portable Text blok s
// marks pro tučně/kurzívu/barvu/velikost/odkaz) inline, bez odstavcového obalu —
// aby šlo vložit doprostřed existujícího <h1>/<p>. Když Sanity nic nevrátí
// (nebo starý fallback), vykreslí se obyčejný text/JSX beze změny.

import { Fragment } from 'react'

const BARVY: Record<string, string> = {
  orange: 'var(--orange)',
  blue: 'var(--blue)',
  black: 'var(--black)',
  white: '#fff',
  gray: 'var(--gray-400)',
  cream: 'var(--orange-light)',
}

const VELIKOSTI: Record<string, string> = {
  small: '0.85em',
  normal: '1em',
  large: '1.25em',
  xlarge: '1.6em',
}

type Span = { _type: 'span'; text: string; marks?: string[] }
type MarkDef = { _type: string; _key: string; hodnota?: string; href?: string; novaZalozka?: boolean }
type Block = { _type: 'block'; children?: Span[]; markDefs?: MarkDef[] }

function renderSpan(span: Span, markDefs: MarkDef[], key: number, vOdkazu: boolean) {
  // Shift + Enter v editoru = nový řádek (\n) → <br />
  const casti = span.text.split('\n')
  let node: React.ReactNode = casti.length > 1
    ? casti.map((c, i) => <Fragment key={i}>{i > 0 && <br />}{c}</Fragment>)
    : span.text
  const marks = span.marks || []

  if (marks.includes('em')) node = <em>{node}</em>
  if (marks.includes('strong')) node = <strong>{node}</strong>

  const style: React.CSSProperties = {}
  let odkaz: MarkDef | undefined
  for (const markKey of marks) {
    const def = markDefs.find((d) => d._key === markKey)
    if (!def) continue
    if (def._type === 'barva' && def.hodnota) style.color = BARVY[def.hodnota]
    if (def._type === 'velikost' && def.hodnota) style.fontSize = VELIKOSTI[def.hodnota]
    if (def._type === 'odkaz' && def.href?.trim()) odkaz = def
  }

  // Odkaz — jen mimo tlačítka a jiné odkazy (<a> uvnitř <a> je neplatné HTML).
  if (odkaz?.href && !vOdkazu) {
    const href = odkaz.href.trim()
    const nova = !!odkaz.novaZalozka
    return (
      <a
        key={key}
        href={href}
        target={nova ? '_blank' : undefined}
        rel={nova || /^https?:/.test(href) ? 'noopener noreferrer' : undefined}
        style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3, ...style }}
      >
        {node}
      </a>
    )
  }

  if (Object.keys(style).length) node = <span style={style}>{node}</span>
  // bez obalového <span> — jinak by .section-title span obarvil oranžově celý nadpis
  return <Fragment key={key}>{node}</Fragment>
}

// vOdkazu: pole je uvnitř tlačítka/odkazu — odkaz z editoru se pak vykreslí jako obyčejný text.
export default function FormatovanyText({ value, fallback, vOdkazu = false }: { value?: Block[] | string | null; fallback: React.ReactNode; vOdkazu?: boolean }) {
  // Obyčejný string — buď fallback konstanta ze starého schématu, nebo placeholder. Vykreslí se přímo.
  if (typeof value === 'string') return <>{value}</>

  const block = value?.[0]
  if (!block?.children?.length) return <>{fallback}</>

  return (
    <>
      {block.children.map((span, i) => renderSpan(span, block.markDefs || [], i, vOdkazu))}
    </>
  )
}
