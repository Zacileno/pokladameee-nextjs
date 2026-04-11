import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Inspirace a galerie' }

export default function InspracePage() {
  return (
    <main style={{ paddingTop: 100, minHeight: '60vh' }}>
      <div className="container section">
        <h1 className="section-title">Inspirace a <span>galerie</span></h1>
        <p className="section-subtitle">Ukázky naší práce — vinylové podlahy z celého MSK.</p>
      </div>
    </main>
  )
}
