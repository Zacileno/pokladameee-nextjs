import { client, PROJEKTY_QUERY } from '../../lib/sanity'

export const revalidate = 0

type Projekt = {
  _id: string
  nazev: string
  claim?: string
  popis?: string
  url: string
  pocetKlientu?: number
  hodnoceni?: number
  barva?: string
  logoUrl?: string
  fotkaUrl?: string
}

const FALLBACK_PROJEKTY: Projekt[] = [
  {
    _id: 'fb-1',
    nazev: 'Malujemeee',
    claim: 'Malujeme byty, domy a kanceláře v celém MSK.',
    popis: 'Čistě, rychle, bez zápachu. Hotovo do týdne.',
    url: 'https://malujemeee.cz',
    pocetKlientu: 3200,
    hodnoceni: 4.9,
    barva: '#5B2D8E',
  },
  {
    _id: 'fb-2',
    nazev: 'Žaluzieee',
    claim: 'Žaluzie, rolety a záclony na míru.',
    popis: 'Montáž do 48 hodin po celém Moravskoslezském kraji.',
    url: 'https://www.zaluzieee.cz/',
    pocetKlientu: 30389,
    hodnoceni: 5.0,
    barva: '#1A7A4A',
  },
]

// accent barva tlačítka a hvězdiček podle barvy pozadí karty
const ACCENTY: Record<string, string> = {
  '#5B2D8E': '#FF8800',
  '#1A7A4A': '#FFD600',
}

function getAccent(barva: string): string {
  return ACCENTY[barva.toUpperCase()] ?? ACCENTY[barva] ?? '#FF8800'
}

function Hvezdicky({ pocet, accent }: { pocet: number; accent: string }) {
  return (
    <span style={{ color: accent, fontSize: 18, letterSpacing: 2 }}>
      {'★'.repeat(Math.round(pocet))}{'☆'.repeat(5 - Math.round(pocet))}
    </span>
  )
}

export default async function RemeselnikSekce() {
  let projekty: Projekt[] = FALLBACK_PROJEKTY
  try {
    const data = await client.fetch<Projekt[]>(PROJEKTY_QUERY)
    if (data?.length) projekty = data
  } catch {}

  return (
    <section style={{ background: '#FF8800', overflow: 'visible' }}>
      {/* Hlavička sekce */}
      <div className="container" style={{ paddingTop: 80, paddingBottom: 56 }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
            Naše rodina značek
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'white', lineHeight: 1.15, marginBottom: 20 }}>
            Dobré řemeslo si zaslouží<br />dobré jméno
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, lineHeight: 1.7, maxWidth: 620, margin: '0 auto' }}>
            Pokládámeee není jen firma — jsme součástí rodiny značek, které vrací řemeslu respekt.
            Potvrdilo nám to již <strong style={{ color: 'white' }}>8 932 klientů</strong> napříč projekty.
          </p>
        </div>
      </div>

      {/* Karty projektů */}
      <div className="container">
        <div className="projekt-seznam">
          {projekty.map((p) => {
            const barva = p.barva ?? '#1a1a1a'
            const accent = getAccent(barva)
            const btnColor = accent === '#FFD600' ? barva : 'white'

            return (
              <div key={p._id} className="projekt-karta" style={{ background: barva }}>
                <div className="projekt-karta-obsah">
                  {/* Logo */}
                  {p.logoUrl && (
                    <img src={p.logoUrl} alt={p.nazev} style={{ height: 36, width: 'auto', marginBottom: 20, objectFit: 'contain', objectPosition: 'left' }} />
                  )}

                  {/* Claim */}
                  {p.claim && (
                    <p style={{ color: 'rgba(0,0,0,0.75)', fontSize: 15, lineHeight: 1.5, marginBottom: p.popis ? 6 : 16 }}>
                      {p.claim}
                    </p>
                  )}

                  {/* Popis */}
                  {p.popis && (
                    <p style={{ color: 'rgba(0,0,0,0.45)', fontSize: 14, lineHeight: 1.5, marginBottom: 20 }}>
                      {p.popis}
                    </p>
                  )}

                  {/* Hodnocení + klienti */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                    {p.hodnoceni && <Hvezdicky pocet={p.hodnoceni} accent={accent} />}
                    {p.hodnoceni && (
                      <span style={{ color: 'rgba(0,0,0,0.7)', fontSize: 14, fontWeight: 700 }}>
                        {p.hodnoceni.toFixed(1)}
                      </span>
                    )}
                    {p.pocetKlientu && (
                      <span style={{ color: 'rgba(0,0,0,0.45)', fontSize: 13 }}>
                        · {p.pocetKlientu.toLocaleString('cs-CZ')} klientů
                      </span>
                    )}
                  </div>

                  {/* CTA tlačítko */}
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="rem-pruh-btn"
                    style={{ background: accent, color: btnColor }}>
                    {p.url.replace(/https?:\/\//, '').replace(/\/$/, '')} →
                  </a>
                </div>

                {/* Přetékající fotka řemeslníka */}
                {p.fotkaUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.fotkaUrl}
                    alt=""
                    className="projekt-karta-foto"
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
