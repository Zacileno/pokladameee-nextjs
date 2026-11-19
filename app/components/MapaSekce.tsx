import Tlacitko from '@/app/components/Tlacitko'
import FormatovanyText from './FormatovanyText'
import { client, MAPA_SEKCE_QUERY } from '../../lib/sanity'
import { MAPA_KRAJE, MAPA_SIRKA, MAPA_VYSKA } from '../../lib/mapa-kraju'
import { KRAJE } from '../../lib/lokality'

// Mapa ČR — proklikatelné jsou jen kraje, kam jezdíme (hover/barvy v globals.css: .mapa-kraj*)
// uvodStranky: na /lokality je mapa první sekcí — odsazení pod hlavičku, drobečková navigace a H1.
// Texty ze Studia (dokument „Sekce Kam jezdímeee (mapa)“), jinak výchozí texty níže.
type FText = Parameters<typeof FormatovanyText>[0]['value']
type MapaData = { nadpisText?: FText; podnadpisText?: FText; heroText?: FText } | null

export default async function MapaSekce({ uvodStranky = false }: { uvodStranky?: boolean } = {}) {
  let data: MapaData = null
  try {
    data = await client.fetch<MapaData>(MAPA_SEKCE_QUERY)
  } catch {}
  const aktivni = new Map(KRAJE.map(k => [k.mapaId, k]))
  const Nadpis = uvodStranky ? 'h1' : 'h2'

  return (
    <section id="kam-jezdime" className="section" style={{ background: 'white', ...(uvodStranky ? { paddingTop: 'calc(120px + var(--hlavicka-navic))' } : {}) }}>
      <div className="container">
        {uvodStranky && (
          <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>
            <a href="/" style={{ color: 'var(--orange)' }}>Domů</a>
            <span style={{ color: 'var(--gray-400)' }}> / Lokality</span>
          </p>
        )}
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
            <Nadpis className="section-title"><FormatovanyText value={data?.nadpisText} fallback={<>Kam jezdím<span>eee</span>?</>} /></Nadpis>
            <p style={{ fontSize: 20, fontWeight: 800, color: 'var(--black)', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 24 }}>
              <FormatovanyText value={data?.podnadpisText} fallback={<>Pokládáme ve <span style={{ color: 'var(--orange)' }}>3 krajích</span></>} />
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 32 }}>
              <FormatovanyText value={data?.heroText} fallback={<>
                Rádi prověříme, kdy bychom k vám mohli naplánovat trasu.{' '}
                <a href="#kontakt" style={{ color: 'var(--orange)', textDecoration: 'underline', textUnderlineOffset: 3 }}>Vyplňte náš formulář</a>{' '}
                a my vám dáme vědět, jestli a kdy k vám zvládneme dorazit.
              </>} />
            </p>
            <a href="#kontakt" className="btn-primary mapa-cta" style={{ padding: '16px 32px' }}><Tlacitko klic="mapa" fallback="Chci zaměření zdarma" /></a>
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
