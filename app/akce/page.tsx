import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Akce a slevy' }

export default function AkcePage() {
  return (
    <main style={{ paddingTop: 100, minHeight: '60vh' }}>
      <div className="container section">
        <h1 className="section-title">Akce a <span>slevy</span></h1>
        <p className="section-subtitle">Momentálně žádné aktivní akce. Sledujte nás — slevy přicházejí pravidelně.</p>
      </div>
    </main>
  )
}
