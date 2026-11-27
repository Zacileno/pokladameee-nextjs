import type { ReactNode } from 'react'
import KratkaVidea from './KratkaVidea'
import FormatovanyText from './FormatovanyText'
import { client, VIDEA_SEKCE_QUERY } from '../../lib/sanity'
import { youtubeId, VIDEA_S_ADAMEM, type KratkeVideo } from '../../lib/videa'
import { prostyText, type RT } from '../../lib/prostyText'

type VideaData = {
  skryt?: boolean
  nadpis?: RT
  podnadpis?: RT
  videa?: { odkaz?: string; nazev?: string; nahled?: string; obrazek?: string }[]
} | null

// Sekce krátkých videí ze Studia (pole „Sekce videí“ v dokumentu `typ`).
// Dokud ve Studiu žádná videa nejsou, ukáže se výchozí seznam z kódu (`videa`, `nadpis`, `podnadpis`).
export default async function VideaSekce({ typ, videa, nadpis, podnadpis, pozadi, id }: {
  typ: string
  videa: KratkeVideo[]
  nadpis?: ReactNode
  podnadpis?: ReactNode
  pozadi?: string
  id?: string
}) {
  let data: VideaData = null
  try {
    data = await client.fetch<VideaData>(VIDEA_SEKCE_QUERY, { typ })
  } catch {}
  if (data?.skryt) return null

  const zeStudia: KratkeVideo[] = (data?.videa || []).flatMap(v => {
    const idVidea = youtubeId(v.odkaz)
    if (!idVidea || VIDEA_S_ADAMEM.has(idVidea)) return []
    return [{
      id: idVidea,
      nazev: v.nazev || '',
      snimek: v.nahled === 'sd1' || v.nahled === 'sd2' || v.nahled === 'sd3' ? v.nahled : undefined,
      obrazek: v.obrazek ? `${v.obrazek}?w=520&h=924&fit=crop&auto=format` : undefined,
    }]
  })

  return (
    <KratkaVidea
      id={id}
      pozadi={pozadi}
      videa={zeStudia.length ? zeStudia : videa}
      nadpis={prostyText(data?.nadpis) ? <FormatovanyText value={data?.nadpis} fallback={null} /> : nadpis}
      podnadpis={prostyText(data?.podnadpis) ? <FormatovanyText value={data?.podnadpis} fallback={null} /> : podnadpis}
    />
  )
}
