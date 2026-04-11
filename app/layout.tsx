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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
