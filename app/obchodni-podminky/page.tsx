import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Obchodní podmínky' }

export default function PodminkyPage() {
  return (
    <main style={{ paddingTop: 100, minHeight: '60vh' }}>
      <div className="container section" style={{ maxWidth: 800 }}>
        <h1 className="section-title">Obchodní <span>podmínky</span></h1>
        <p style={{ marginTop: 32, fontSize: 17, lineHeight: 1.8 }}>
          Provozovatel: Adam Hajdušek, pokládámeee.cz, Moravskoslezský kraj. Obchodní podmínky jsou v přípravě — pro aktuální informace nás kontaktujte na adam@pokládámeee.cz nebo telefonicky.
        </p>
      </div>
    </main>
  )
}
