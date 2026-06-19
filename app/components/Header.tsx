'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SLUZBY_ITEMS = [
  { label: 'Vinylová podlaha', href: '/sluzby/vinylova-podlaha' },
  { label: 'Dřevěná podlaha', href: '/sluzby/drevena-podlaha' },
  { label: 'PVC podlaha', href: '/sluzby/pvc-podlaha' },
  { label: 'Koberec', href: '/sluzby/koberec' },
]

export default function Header({ opaque }: { opaque?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const navLinkStyle = { color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: 15, transition: 'color 0.2s', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'inherit' }

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: (scrolled || opaque) ? 'rgba(21,76,134,0.97)' : 'transparent',
      backdropFilter: (scrolled || opaque) ? 'blur(12px)' : 'none',
      transition: 'background 0.3s',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        <a href="/">
          <Image
            src="/assets/logo/logo-inverzni-modre.svg"
            alt="pokládámeee.cz"
            width={220}
            height={38}
            style={{ height: 38, width: 'auto' }}
            priority
          />
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desk-nav">
          {/* Služby dropdown */}
          <div ref={servicesRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setServicesOpen(o => !o)}
              style={{ ...navLinkStyle, display: 'flex', alignItems: 'center', gap: 6 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
            >
              Služby <span style={{ fontSize: 10 }}>{servicesOpen ? '▲' : '▼'}</span>
            </button>
            {servicesOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 12px)', left: '50%', transform: 'translateX(-50%)',
                background: '#fff', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                minWidth: 220, padding: '8px 0', zIndex: 200,
              }}>
                {SLUZBY_ITEMS.map(item => (
                  <Link key={item.href} href={item.href} onClick={() => setServicesOpen(false)} style={{
                    display: 'block', padding: '12px 20px', color: '#000', fontSize: 15, fontWeight: 600,
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#FF8800')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#000')}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {[['#jak-to-funguje', 'Jak to funguje'], ['#reference', 'Reference'], ['/faq', 'FAQ']].map(([href, label]) => (
            <a key={href} href={href} style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: 15, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}>{label}</a>
          ))}
          <a href="/#kontakt" style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: 15, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}>Kontakt</a>
          <a href="/#kontakt" className="btn-primary" style={{ padding: '10px 22px', fontSize: 15 }}>Chci podlahu →</a>
        </nav>
        <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger"
          style={{ display: 'none', background: 'none', border: 'none', color: 'white', fontSize: 24, cursor: 'pointer' }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
      {menuOpen && (
        <div style={{ background: 'rgba(21,76,134,0.98)', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Služby s rozbalením */}
          <div>
            <button onClick={() => setMobileServicesOpen(o => !o)}
              style={{ color: 'white', fontWeight: 600, fontSize: 18, background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
              Služby <span style={{ fontSize: 12 }}>{mobileServicesOpen ? '▲' : '▼'}</span>
            </button>
            {mobileServicesOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12, paddingLeft: 16 }}>
                {SLUZBY_ITEMS.map(item => (
                  <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                    style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: 16 }}>
                    — {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {[['#jak-to-funguje', 'Jak to funguje'], ['#reference', 'Reference'], ['/faq', 'FAQ'], ['/#kontakt', 'Kontakt']].map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{ color: 'white', fontWeight: 600, fontSize: 18 }}>{label}</a>
          ))}
          <a href="/#kontakt" className="btn-primary" onClick={() => setMenuOpen(false)} style={{ textAlign: 'center', justifyContent: 'center' }}>Chci podlahu →</a>
        </div>
      )}
      <style>{`@media(max-width:768px){.desk-nav{display:none!important}.hamburger{display:block!important}}`}</style>
    </header>
  )
}
