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

      {/* 50/50 pruhy projektů — jeden řádek */}
      <div className="rem-radek">
        {projekty.map((p) => {
          const meta = PROJEKT_META[p.nazev] ?? { barva: '#1a1a1a', accent: '#FF8800', claim: '', recenzi: 0, eeeFrom: p.nazev.length - 3 }
          return (
            <div key={p._id} className="rem-pruh-text" style={{ background: meta.barva }}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 700, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
                Také od nás
              </p>
              <h3 style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 900, color: 'white', lineHeight: 1.0, marginBottom: 14 }}>
                <NazevSProjektem nazev={p.nazev} accent={meta.accent} />
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.65, marginBottom: 18 }}>
                {meta.claim}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <span style={{ color: meta.accent, fontSize: 16 }}>★★★★★</span>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>
                  {p.pocetKlientu ? `${p.pocetKlientu.toLocaleString('cs-CZ')} klientů` : `${meta.recenzi} recenzí`}
                </span>
              </div>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="rem-pruh-btn"
                style={{ background: meta.accent, color: meta.accent === '#FFD600' ? '#1A7A4A' : 'white' }}>
                {p.url.replace('https://', '')} →
              </a>
            </div>
          )
        })}
      </div>
    </section>
  )
}
