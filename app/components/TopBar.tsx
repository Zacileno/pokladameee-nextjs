'use client'
import { usePathname } from 'next/navigation'
import { TOP_BAR_VYSKA, zobrazitTopBar } from '@/lib/black-friday'
import FormatovanyText from './FormatovanyText'

type RT = { _type: 'block'; children?: { _type: 'span'; text: string; marks?: string[] }[] }[] | undefined

export type TopBarData = {
  topBarOznaceni?: RT
  topBarSleva?: RT
  topBarZbytek?: RT
  topBarDovetek?: RT
  topBarCta?: RT
}

// CTA tlačítka na webu nemají šipku — odstraníme ji i z textu ze Sanity (např. "DETAIL AKCE →")
const bezSipky = (value: RT): RT =>
  value?.map(block => ({
    ...block,
    children: block.children?.map(span => ({ ...span, text: span.text.replace(/\s*→\s*$/, '') })),
  }))

// Oznamovací lišta nad hlavičkou — je v normálním toku stránky, Header se pod ni posouvá (viz Header.tsx)
export default function TopBar({ data }: { data?: TopBarData }) {
  const pathname = usePathname()
  if (!zobrazitTopBar(pathname)) return null

  return (
    <a href="/black-friday" className="top-bar" style={{ height: TOP_BAR_VYSKA }}>
      <div className="container top-bar-obsah">
        <span className="top-bar-stitek">
          <FormatovanyText value={data?.topBarOznaceni} fallback="🔥 BLACK FRIDAY" />
        </span>
        <span className="top-bar-text">
          <span style={{ color: 'var(--orange)' }}>
            <FormatovanyText value={data?.topBarSleva} fallback={<>25&nbsp;%</>} />
          </span>{' '}
          <FormatovanyText value={data?.topBarZbytek} fallback="na podlahové krytiny" />
          <span className="top-bar-dovetek">. <FormatovanyText value={data?.topBarDovetek} fallback="A to není vše." /></span>
        </span>
        <span className="top-bar-cta">
          <FormatovanyText value={bezSipky(data?.topBarCta)} fallback="DETAIL AKCE" />
        </span>
      </div>
    </a>
  )
}
