'use client'
import { useState, useEffect } from 'react'

const testimonials = [
  {
    nadpis: 'Osobní růst a kariéra',
    citat: 'Každý projekt je jiný, pořád se učím. Tady nemáš šanci zašedivět – furt se něco děje a ty buď jdeš dopředu, nebo ti ujede vlak.',
    jmeno: 'Tomáš',
  },
  {
    nadpis: 'Otevřená firemní kultura',
    citat: 'Přišel jsem jako řemeslník, za půl roku mám pod sebou partu. Nikdo tě tady nezašlápne – naopak, když vidí potenciál, dají ti šanci.',
    jmeno: 'Lukáš',
  },
  {
    nadpis: 'Ohodnocení dle výkonu',
    citat: 'Vím, co vydělám. Žádné výmluvy, žádné tajemství – dostanu přesně to, co si odmakám. A volné víkendy jsou pro mě základ.',
    jmeno: 'Petra',
  },
]

export default function TestimonialCarousel() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActive(i => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(timer)
  }, [])

  const t = testimonials[active]

  return (
    <section style={{ background: 'white', padding: '80px 0' }}>
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 48 }}>
          Proč si nás naši lidé vybrali?
        </h2>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{
            background: '#EDE9F8',
            borderRadius: 10,
            padding: '40px 48px',
            position: 'relative',
            minHeight: 220,
          }}>
            <div style={{ fontSize: 80, color: 'var(--orange)', lineHeight: 0, marginBottom: 24, fontFamily: 'Georgia, serif' }}>"</div>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--blue)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 16 }}>
              {t.nadpis}
            </p>
            <p style={{ fontSize: 18, fontStyle: 'italic', color: '#444', lineHeight: 1.7, marginBottom: 24 }}>
              {t.citat}
            </p>
            <p style={{ fontSize: 19, fontWeight: 700, color: 'var(--blue)' }}>{t.jmeno}</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 24 }}>
            <button
              onClick={() => setActive(i => (i - 1 + testimonials.length) % testimonials.length)}
              style={{
                background: 'var(--orange)', color: 'white', border: 'none',
                borderRadius: 10, width: 45, height: 60, fontSize: 20, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >‹</button>
            <div style={{ display: 'flex', gap: 8 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  style={{
                    width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer',
                    background: 'var(--orange)', opacity: i === active ? 1 : 0.3, padding: 0,
                  }}
                />
              ))}
            </div>
            <button
              onClick={() => setActive(i => (i + 1) % testimonials.length)}
              style={{
                background: 'var(--orange)', color: 'white', border: 'none',
                borderRadius: 10, width: 45, height: 60, fontSize: 20, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >›</button>
          </div>
        </div>
      </div>
    </section>
  )
}
