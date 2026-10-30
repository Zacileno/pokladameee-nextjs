'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { TOP_BAR_VYSKA, zobrazitTopBar } from '@/lib/black-friday'

const SLUZBY_LINKS: [string, string][] = [
  ['/sluzby/vinylova-podlaha', 'Vinylová podlaha'],
  ['/sluzby/pvc-podlaha', 'PVC podlaha'],
  ['/sluzby/drevena-podlaha', 'Dřevěná podlaha'],
  ['/sluzby/koberce', 'Koberce'],
]

// hlavní menu (velký pruh) a vedlejší odkazy (malé, vpravo nahoře)
const HLAVNI_LINKS: [string, string][] = [
  ['/co-pokladame', 'Co pokládáme'],
  ['/inspirace', 'Inspirace'],
  ['/#kontakt', 'Kontakt'],
]

const VEDLEJSI_LINKS: [string, string][] = [
  ['/#jak-to-funguje', 'Jak to funguje'],
  ['/#reference', 'Reference'],
  ['/faq', 'FAQ'],
  ['/kariera', 'Kariéra'],
  ['/blog', 'Blog'],
]

export default function Header({ opaque }: { opaque?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sluzbyOpen, setSluzbyOpen] = useState(false)
  const [sluzbyMobileOpen, setSluzbyMobileOpen] = useState(false)
  const pathname = usePathname()
  // Nad hlavičkou je TopBar — dokud je vidět, Header sedí pod ním, po odscrollování vyjede nahoru
  const topBarVyska = zobrazitTopBar(pathname) ? TOP_BAR_VYSKA : 0
  const [top, setTop] = useState(topBarVyska)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      setTop(Math.max(0, topBarVyska - window.scrollY))
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [topBarVyska])

  // podstránky (/sluzby, /blog…) podtrhneme, odkazy na kotvy na homepage ne
  const aktivni = (href: string) => !href.includes('#') && !!pathname?.startsWith(href)

  return (
    <header style={{
      position: 'fixed', top, left: 0, right: 0, zIndex: 100,
      background: (scrolled || opaque) ? 'rgba(21,76,134,0.97)' : 'transparent',
      backdropFilter: (scrolled || opaque) ? 'blur(12px)' : 'none',
      transition: 'background 0.3s',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
    }}>
      {/* 1. řádek — logo a vedlejší odkazy vpravo (podle Žaluzieee) */}
      <div className="container hlavicka-radek">
        <a href="/" className="header-logo" style={{ marginLeft: -12 }}>
          <Image
            src="/assets/logo/logo-inverzni-modre.svg"
            alt="pokládámeee.cz"
            width={220}
            height={38}
            style={{ height: 38, width: 'auto' }}
            priority
          />
        </a>
        <nav className="desk-nav hlavicka-vedlejsi">
          {VEDLEJSI_LINKS.map(([href, label]) => (
            <a key={href} href={href} className={aktivni(href) ? 'aktivni' : ''}>{label}</a>
          ))}
        </nav>
        <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger"
          style={{ display: 'none', background: 'none', border: 'none', color: 'white', fontSize: 24, cursor: 'pointer' }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* 2. řádek — hlavní menu v zaobleném pruhu, vpravo tlačítko a telefon */}
      <div className="container desk-nav">
        <div className="hlavicka-lista">
          <nav className="hlavicka-hlavni">
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setSluzbyOpen(true)}
              onMouseLeave={() => setSluzbyOpen(false)}
            >
              <a href="/sluzby" className={aktivni('/sluzby') ? 'aktivni' : ''} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Služby <span style={{ fontSize: 12, transform: sluzbyOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', display: 'inline-block' }}>▾</span>
              </a>
              {sluzbyOpen && (
                <div style={{ position: 'absolute', top: '100%', left: 0, paddingTop: 12, minWidth: 220 }}>
                  <div style={{ background: 'white', borderRadius: 10, boxShadow: '0 12px 32px rgba(0,0,0,0.18)', padding: 8, display: 'flex', flexDirection: 'column' }}>
                    {SLUZBY_LINKS.map(([href, label]) => (
                      <a key={href} href={href} style={{ color: 'var(--gray-700)', fontWeight: 600, fontSize: 14.5, padding: '10px 14px', borderRadius: 6, transition: 'background 0.15s, color 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--gray-50)'; e.currentTarget.style.color = 'var(--orange)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--gray-700)' }}>
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {HLAVNI_LINKS.map(([href, label]) => (
              <a key={href} href={href} className={aktivni(href) ? 'aktivni' : ''}>{label}</a>
            ))}
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <a href="/#kontakt" className="btn-primary" style={{ padding: '9px 20px', fontSize: 15 }}>Chci podlahu</a>
            <a href="tel:+420790388487" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'white', fontWeight: 800, fontSize: 16, whiteSpace: 'nowrap' }}>
              <Image src="https://cdn.sanity.io/images/8cvsenqb/production/306c4a22e24e1a5c96a6be2521d307acb1a0da87-120x120.png" alt="Adam Hajdušek" width={32} height={32} unoptimized
                style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid rgba(255,255,255,0.6)' }} />
              +420 790 388 487
            </a>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div style={{ background: 'rgba(21,76,134,0.98)', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <button onClick={() => setSluzbyMobileOpen(!sluzbyMobileOpen)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', color: 'white', fontWeight: 600, fontSize: 18, fontFamily: 'inherit', cursor: 'pointer', padding: 0 }}>
              Služby
              <span style={{ fontSize: 14, transform: sluzbyMobileOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
            </button>
            {sluzbyMobileOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16, paddingLeft: 16 }}>
                <a href="/sluzby" onClick={() => setMenuOpen(false)} style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: 16 }}>Všechny služby</a>
                {SLUZBY_LINKS.map(([href, label]) => (
                  <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontSize: 16 }}>{label}</a>
                ))}
              </div>
            )}
          </div>
          {[['/co-pokladame', 'Co pokládáme'], ['/inspirace', 'Inspirace'], ['/#jak-to-funguje', 'Jak to funguje'], ['/#reference', 'Reference'], ['/faq', 'FAQ'], ['/#kontakt', 'Kontakt'], ['/kariera', 'Kariéra'], ['/blog', 'Blog']].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{ color: 'white', fontWeight: 600, fontSize: 18 }}>{label}</a>
          ))}
          <a href="/#kontakt" className="btn-primary" onClick={() => setMenuOpen(false)} style={{ textAlign: 'center', justifyContent: 'center' }}>Chci podlahu</a>
          <a href="tel:+420790388487" onClick={() => setMenuOpen(false)} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'white', fontWeight: 700, fontSize: 18 }}>
            <Image src="https://cdn.sanity.io/images/8cvsenqb/production/306c4a22e24e1a5c96a6be2521d307acb1a0da87-120x120.png" alt="Adam Hajdušek" width={32} height={32} unoptimized
              style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid rgba(255,255,255,0.6)' }} />
            +420 790 388 487
          </a>
        </div>
      )}
      <style>{`@media(max-width:768px){.desk-nav{display:none!important}.hamburger{display:block!important}}`}</style>
    </header>
  )
}
