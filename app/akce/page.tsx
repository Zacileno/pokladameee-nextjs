import type { Metadata } from 'next'
import { client, AKCE_QUERY } from '../../lib/sanity'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata: Metadata = { title: 'Akce a slevy' }
export const revalidate = 3600

type Akce = {
  _id: string
  nazev: string
  popis?: string
  platnostDo?: string
  badge?: string
}

export default async function AkcePage() {
  let akce: Akce[] = []
  try {
    akce = await client.fetch<Akce[]>(AKCE_QUERY)
  } catch {}

  return (
    <>
      <Header />
      <main style={{ paddingTop: 100, minHeight: '60vh' }}>
        <div className="container section">
          <h1 className="section-title">Akce a <span>slevy</span></h1>
          {akce.length === 0 ? (
            <p className="section-subtitle">Momentálně žádné aktivní akce. Sledujte nás — slevy přicházejí pravidelně.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24, marginTop: 48 }}>
              {akce.map(a => (
                <div key={a._id} style={{
                  padding: '32px 28px', borderRadius: 16,
                  background: 'white', border: '1px solid var(--gray-100)',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                }}>
                  {a.badge && (
                    <span style={{
                      display: 'inline-block', marginBottom: 16,
                      background: 'var(--orange)', color: 'white',
                      fontSize: 13, fontWeight: 800, padding: '4px 14px', borderRadius: 100,
                    }}>{a.badge}</span>
                  )}
                  <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>{a.nazev}</h2>
                  {a.popis && <p style={{ color: 'var(--gray-400)', fontSize: 15, lineHeight: 1.6 }}>{a.popis}</p>}
                  {a.platnostDo && (
                    <p style={{ marginTop: 16, fontSize: 13, fontWeight: 600, color: 'var(--orange)' }}>
                      Platí do: {new Date(a.platnostDo).toLocaleDateString('cs-CZ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
