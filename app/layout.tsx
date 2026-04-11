import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'pokládámeee.cz – Podlahy beeezstarostí',
  description: 'Profesionální pokládka vinylových podlah v Moravskoslezském kraji. Zaměření zdarma, hotovo do týdne. Starou podlahu ekologicky odstraníme.',
  keywords: 'pokládání podlah, vinyl podlaha, Ostrava, MSK, Moravskoslezský kraj',
  openGraph: {
    title: 'pokládámeee.cz – Podlahy beeezstarostí',
    description: 'Profesionální pokládka vinylových podlah. Zaměření zdarma, hotovo do týdne.',
    locale: 'cs_CZ',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  )
}
