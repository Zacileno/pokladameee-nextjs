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

const PROJEKT_META: Record<string, { barva: string; accent: string; claim: string; recenzi: number; eeeFrom: number }> = {
  Malujemeee: { barva: '#5B2D8E', accent: '#FF8800', claim: 'Malujeme byty, domy a kanceláře v celém MSK. Čistě, rychle, bez zápachu.', recenzi: 184, eeeFrom: 6 },
  Žaluzieee:  { barva: '#1A7A4A', accent: '#FFD600', claim: 'Žaluzie, rolety a záclony na míru. Montáž do 48 hodin po celém Moravskoslezském kraji.', recenzi: 97, eeeFrom: 7 },
}

function getEeeFrom(nazev: string): number {
  return PROJEKT_META[nazev]?.eeeFrom ?? nazev.length - 3
}

function NazevSProjektem({ nazev, accent }: { nazev: string; accent: string }) {
  const idx = getEeeFrom(nazev)
  return (
    <span>
      {nazev.slice(0, idx)}
      <span style={{ color: accent }}>{nazev.slice(idx)}</span>
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
    <section style={{ background: '#FF8800', overflow: 'hidden' }}>
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

      {/* Fullwidth pruhy projektů */}
      <div style={{ paddingBottom: 80 }}>
        {projekty.map((p, i) => {
          const meta = PROJEKT_META[p.nazev] ?? { barva: '#1a1a1a', accent: '#FF8800', claim: '', recenzi: 0, eeeFrom: p.nazev.length - 3 }
          const reversed = i % 2 === 1
          return (
            <div key={p._id} className="rem-pruh" style={{ background: meta.barva, flexDirection: reversed ? 'row-reverse' : 'row' }}>
              {/* Textová část */}
              <div className="rem-pruh-text">
                <p style={{ color: 'rgba(255,255,255,0.55)', fontWeight: 700, fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>
                  Také od nás
                </p>
                <h3 style={{ fontSize: 'clamp(34px, 4vw, 56px)', fontWeight: 900, color: 'white', lineHeight: 1.0, marginBottom: 18 }}>
                  <NazevSProjektem nazev={p.nazev} accent={meta.accent} />
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, lineHeight: 1.7, maxWidth: 420, marginBottom: 20 }}>
                  {meta.claim}
                </p>
                {/* Hvězdičky + recenze */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
                  <span style={{ color: meta.accent, fontSize: 18, letterSpacing: 2 }}>★★★★★</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
                    {p.pocetKlientu ? `${p.pocetKlientu.toLocaleString('cs-CZ')} spokojených klientů` : `${meta.recenzi} recenzí`}
                  </span>
                </div>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="rem-pruh-btn"
                  style={{ background: meta.accent, color: meta.accent === '#FFD600' ? '#1A7A4A' : 'white' }}>
                  Navštívit {p.url.replace('https://', '')} →
                </a>
              </div>

              {/* Vizuální část */}
              <div className="rem-pruh-visual" style={{ background: `linear-gradient(135deg, ${meta.barva} 0%, color-mix(in srgb, ${meta.barva} 60%, black) 100%)` }}>
                {p.logo?.asset?.url ? (
                  <img src={p.logo.asset.url} alt={p.nazev} style={{ maxHeight: 80, maxWidth: 220, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
                ) : (
                  <span style={{ fontSize: 'clamp(64px, 8vw, 110px)', fontWeight: 900, color: 'white', opacity: 0.08, lineHeight: 1, userSelect: 'none', letterSpacing: '-0.04em', display: 'block' }}>
                    {p.nazev}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
