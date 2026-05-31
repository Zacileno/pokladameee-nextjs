'use client'
import { useState } from 'react'

const HERO_FALLBACK = 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=1600&q=85'

export default function HeroSection({ heroFotkaUrl }: { heroFotkaUrl?: string | null }) {
  const bgImage = heroFotkaUrl || HERO_FALLBACK
  const [form, setForm] = useState({ jmeno: '', telefon: '', sluzba: '', zprava: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img src={bgImage} alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.75) 45%, rgba(0,0,0,0.55) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(255,136,0,0.12) 0%, transparent 50%)' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div className="hero-grid">
          {/* Levá strana */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,136,0,0.15)', border: '1px solid rgba(255,136,0,0.35)', borderRadius: 100, padding: '6px 16px', marginBottom: 28 }}>
              <span style={{ width: 8, height: 8, background: 'var(--orange)', borderRadius: '50%', display: 'inline-block' }} />
              <span style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 13, letterSpacing: '0.05em' }}>MORAVSKOSLEZSKÝ KRAJ</span>
            </div>
            <h1 style={{ fontSize: 'clamp(44px, 6vw, 88px)', fontWeight: 900, color: 'white', lineHeight: 1.0, marginBottom: 24 }}>
              Podlahy<br /><span style={{ color: 'var(--orange)' }}>beee</span>zstarostí
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 'clamp(16px, 2vw, 20px)', lineHeight: 1.65, maxWidth: 520, marginBottom: 32 }}>
              Pokládáme vinylové podlahy po celém MSK. Přijedeme zaměřit zdarma, hotovo do týdne. Starou podlahu ekologicky odstraníme.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
              {[{ num: '48h', label: 'zaměření' }, { num: '1 týden', label: 'realizace' }, { num: '0 Kč', label: 'zaměření' }].map(({ num, label }) => (
                <div key={num} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, padding: '12px 20px', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
                  <div style={{ color: 'var(--orange)', fontWeight: 900, fontSize: 22, lineHeight: 1 }}>{num}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#kontakt" className="btn-primary" style={{ fontSize: 17, padding: '15px 32px' }}>Chci zaměřit zdarma →</a>
              <a href="#inspirace" className="btn-secondary" style={{ fontSize: 17, padding: '15px 32px' }}>Zobrazit výsledky</a>
            </div>
          </div>

          {/* Formulář — skryto na mobilu přes CSS třídu */}
          <div className="hero-form" style={{ background: 'rgba(255,255,255,0.97)', borderRadius: 16, padding: '36px 32px', boxShadow: '0 24px 64px rgba(0,0,0,0.35)' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Hotovo!</h3>
                <p style={{ color: 'var(--gray-400)' }}>Brzy vám zavoláme a domluvíme termín zaměření.</p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 24 }}>
                  <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 4 }}>Nezávazná poptávka</h3>
                  <p style={{ color: 'var(--gray-400)', fontSize: 14 }}>Odpovíme do 24 hodin. Zaměření zdarma.</p>
                </div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <input type="text" placeholder="Jméno a příjmení *" required value={form.jmeno} onChange={e => setForm({...form, jmeno: e.target.value})} style={inp} />
                  <input type="tel" placeholder="Telefon *" required value={form.telefon} onChange={e => setForm({...form, telefon: e.target.value})} style={inp} />
                  <select value={form.sluzba} onChange={e => setForm({...form, sluzba: e.target.value})} style={{...inp, color: form.sluzba ? '#000' : '#999'}}>
                    <option value="">Typ podlahy...</option>
                    <option>Vinylová podlaha lepená</option>
                    <option>Vinylová podlaha plovoucí</option>
                    <option>Výměna staré podlahy</option>
                    <option>Chci pomoct s výběrem</option>
                  </select>
                  <textarea placeholder="Zpráva (rozloha, lokalita...)" value={form.zprava} onChange={e => setForm({...form, zprava: e.target.value})} rows={3} style={{...inp, resize: 'none'}} />
                  <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 12, color: 'var(--gray-400)', cursor: 'pointer' }}>
                    <input type="checkbox" required style={{ marginTop: 2, accentColor: 'var(--orange)' }} />
                    Souhlasím se zpracováním osobních údajů a obchodními podmínkami.
                  </label>
                  <button type="submit" className="btn-primary" style={{ justifyContent: 'center', fontSize: 16, padding: '14px' }}>Odeslat poptávku</button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const inp: React.CSSProperties = { padding: '12px 14px', border: '1.5px solid #E5E5E0', borderRadius: 6, fontSize: 15, outline: 'none', width: '100%', background: '#FAFAF8', transition: 'border-color 0.2s' }
