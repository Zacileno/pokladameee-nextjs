import { MAPA_KRAJE, MAPA_SIRKA, MAPA_VYSKA } from '../../lib/mapa-kraju'
import { KRAJE } from '../../lib/lokality'

// Mapa ČR — proklikatelné jsou jen kraje, kam jezdíme (hover/barvy v globals.css: .mapa-kraj*)
export default function MapaSekce() {
  const aktivni = new Map(KRAJE.map(k => [k.mapaId, k]))

  return (
    <section id="kam-jezdime" className="section" style={{ background: 'white' }}>
      <div className="container">
        <div className="mapa-grid">
          <svg viewBox={`0 0 ${MAPA_SIRKA} ${MAPA_VYSKA}`} className="mapa-svg" role="img" aria-label="Mapa krajů, kde pokládáme podlahy">
            {MAPA_KRAJE.filter(k => !aktivni.has(k.id)).map(k => (
              <path key={k.id} d={k.d} className="mapa-kraj" fillRule="evenodd" />
            ))}
            {MAPA_KRAJE.filter(k => aktivni.has(k.id)).map(k => {
              const kraj = aktivni.get(k.id)!
              return (
                <a key={k.id} href={`/lokality/${kraj.slug}`} className="mapa-kraj-odkaz" aria-label={kraj.nazev}>
                  <path d={k.d} className="mapa-kraj mapa-kraj-aktivni" fillRule="evenodd" />
                </a>
              )
            })}
          </svg>

          <div style={{ textAlign: 'center' }}>
            <h2 className="section-title">Kam jezdím<span>eee</span>?</h2>
            <p style={{ fontSize: 20, fontWeight: 800, color: 'var(--black)', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 24 }}>
              Pokládáme ve <span style={{ color: 'var(--orange)' }}>3 krajích</span>
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 32 }}>
              Rádi prověříme, kdy bychom k vám mohli naplánovat trasu.{' '}
              <a href="#kontakt" style={{ color: 'var(--orange)', textDecoration: 'underline', textUnderlineOffset: 3 }}>Vyplňte náš formulář</a>{' '}
              a my vám dáme vědět, jestli a kdy k vám zvládneme dorazit.
            </p>
            <a href="#kontakt" className="btn-primary" style={{ padding: '16px 32px' }}>Chci zaměření zdarma</a>
            <div className="mapa-kraje-odkazy">
              {KRAJE.map(k => (
                <a key={k.slug} href={`/lokality/${k.slug}`}>{k.nazev}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
