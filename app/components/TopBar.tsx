'use client'
import { usePathname } from 'next/navigation'
import { TOP_BAR_VYSKA, zobrazitTopBar } from '@/lib/black-friday'

// Oznamovací lišta nad hlavičkou — je v normálním toku stránky, Header se pod ni posouvá (viz Header.tsx)
export default function TopBar() {
  const pathname = usePathname()
  if (!zobrazitTopBar(pathname)) return null

  return (
    <a href="/black-friday" className="top-bar" style={{ height: TOP_BAR_VYSKA }}>
      <div className="container top-bar-obsah">
        <span className="top-bar-stitek">🔥 BLACK FRIDAY</span>
        <span className="top-bar-text">
          <span style={{ color: 'var(--orange)' }}>25&nbsp;%</span> na podlahové krytiny<span className="top-bar-dovetek">. A&nbsp;to není vše.</span>
        </span>
        <span className="top-bar-cta">DETAIL AKCE →</span>
      </div>
    </a>
  )
}
