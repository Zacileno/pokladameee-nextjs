'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Header({ opaque }: { opaque?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll() // nastav správný stav hned při mountu
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
          {[['#sluzby','Služby'],['#jak-to-funguje','Jak to funguje'],['#reference','Reference']].map(([href, label]) => (
            <a key={href} href={href} style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: 15, transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color='#fff')}
              onMouseLeave={e => (e.currentTarget.style.color='rgba(255,255,255,0.8)')}>{label}</a>
          ))}
          <a href="#kontakt" className="btn-primary" style={{ padding: '10px 22px', fontSize: 15 }}>Chci podlahu →</a>
        </nav>
        <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger"
          style={{ display:'none', background:'none', border:'none', color:'white', fontSize:24, cursor:'pointer' }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>
      {menuOpen && (
        <div style={{ background:'rgba(21,76,134,0.98)', borderTop:'1px solid rgba(255,255,255,0.1)', padding:'24px', display:'flex', flexDirection:'column', gap:20 }}>
          {[['#sluzby','Služby'],['#jak-to-funguje','Jak to funguje'],['#reference','Reference']].map(([href,label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{ color:'white', fontWeight:600, fontSize:18 }}>{label}</a>
          ))}
          <a href="#kontakt" className="btn-primary" onClick={() => setMenuOpen(false)} style={{ textAlign:'center', justifyContent:'center' }}>Chci podlahu →</a>
        </div>
      )}
      <style>{`@media(max-width:768px){.desk-nav{display:none!important}.hamburger{display:block!important}}`}</style>
    </header>
  )
}
