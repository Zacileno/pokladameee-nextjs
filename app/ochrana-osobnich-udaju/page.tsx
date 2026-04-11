import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Ochrana osobních údajů' }

export default function GdprPage() {
  return (
    <main style={{ paddingTop: 100, minHeight: '60vh' }}>
      <div className="container section" style={{ maxWidth: 800 }}>
        <h1 className="section-title">Ochrana <span>osobních údajů</span></h1>
        <p style={{ marginTop: 32, fontSize: 17, lineHeight: 1.8 }}>
          Správcem osobních údajů je Adam Hajdušek, pokládámeee.cz. Osobní údaje zpracováváme pouze za účelem vyřízení vaší poptávky a kontaktování v záležitosti zakázky. Údaje nepředáváme třetím stranám. Máte právo na přístup, opravu nebo výmaz svých údajů. Kontakt: adam@pokládámeee.cz
        </p>
      </div>
    </main>
  )
}
