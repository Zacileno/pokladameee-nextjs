import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://pokládámeee.cz'),
  title: {
    default: 'pokládámeee.cz – Vinylové podlahy v MSK | Pokládka do týdne',
    template: '%s | pokládámeee.cz',
  },
  description: 'Profesionální pokládka vinylových podlah v Moravskoslezském kraji. Zaměření zdarma do 48 hodin, realizace do týdne. Starou podlahu ekologicky odstraníme. Volejte Adama Hajdušek.',
  keywords: ['vinylová podlaha', 'pokládka podlahy', 'Ostrava', 'MSK', 'Moravskoslezský kraj', 'vinyl lepený', 'podlahy Opava', 'podlahy Frýdek-Místek', 'pokládámeee'],
  authors: [{ name: 'pokládámeee.cz' }],
  openGraph: {
    title: 'pokládámeee.cz – Vinylové podlahy v MSK',
    description: 'Pokládka vinylových podlah v Moravskoslezském kraji. Zaměření zdarma, hotovo do týdne.',
    url: 'https://pokládámeee.cz',
    siteName: 'pokládámeee.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://pokládámeee.cz' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MK4KFBF8');` }} />
      </head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MK4KFBF8" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} /></noscript>
        {children}
      </body>
    </html>
  )
}
