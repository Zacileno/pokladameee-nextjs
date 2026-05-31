import { client, PROJEKTY_QUERY } from '../../lib/sanity'

export const revalidate = 3600

type Projekt = {
  _id: string
  nazev: string
  url: string
  pocetKlientu?: number
  logo?: { asset: { url: string } }
}

const FALLBACK_PROJEKTY: Projekt[] = [
  { _id: 'fb-1', nazev: 'Malujemeee', url: 'https://malujemeee.cz', pocetKlientu: 3200 },
  { _id: 'fb-2', nazev: 'Žaluzieee', url: 'https://zaluzieee.cz', pocetKlientu: 1400 },
]

export default async function RemeselnikSekce() {
  let projekty: Projekt[] = FALLBACK_PROJEKTY
  try {
    const data = await client.fetch<Projekt[]>(PROJEKTY_QUERY)
    if (data?.length) projekty = data
  } catch {}

  return (
    <section className="section" style={{ background: '#FF8800', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
            Naše rodina značek
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'white', lineHeight: 1.15, marginBottom: 20 }}>
            Dobré řemeslo si zaslouží<br />dobré jméno
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 17, lineHeight: 1.7, maxWidth: 620, margin: '0 auto' }}>
            Pokládámeee není jen firma — jsme součástí rodiny značek, které vrací řemeslu respekt. Potvrdilo nám to již <strong style={{ color: 'white' }}>8 932 klientů</strong> napříč projekty.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
          {projekty.map(p => (
            <a
              key={p._id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1.5px solid rgba(255,255,255,0.25)',
                borderRadius: 16,
                padding: '28px 32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 12,
                minWidth: 180,
                textDecoration: 'none',
                transition: 'background 0.2s',
                backdropFilter: 'blur(8px)',
              }}
            >
              {p.logo?.asset?.url ? (
                <img src={p.logo.asset.url} alt={p.nazev} style={{ height: 48, objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
              ) : (
                <div style={{ fontWeight: 900, fontSize: 22, color: 'white', letterSpacing: '-0.02em' }}>{p.nazev}</div>
              )}
              {p.pocetKlientu ? (
                <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 600 }}>
                  {p.pocetKlientu.toLocaleString('cs-CZ')} klientů
                </div>
              ) : null}
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{p.url.replace('https://', '')}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
