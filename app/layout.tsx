import type { Metadata } from 'next'
import './globals.css'
import JsonLd from './components/JsonLd'

const LOCAL_BUSINESS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: 'pokládámeee.cz',
  image: 'https://www.pokladameee.cz/assets/logo/logo-zakladni.svg',
  url: 'https://www.pokladameee.cz',
  telephone: '+420739229922',
  email: 'adam.hajdusek@pokladameee.cz',
  description: 'Profesionální pokládka vinylových, PVC, kobercových a dřevěných podlah v Moravskoslezském kraji. Zaměření zdarma, odvoz staré podlahy zdarma.',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Moravskoslezský kraj',
    addressCountry: 'CZ',
  },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Moravskoslezský kraj',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '07:00',
    closes: '18:00',
  },
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pokladameee.cz'),
  title: {
    default: 'pokládámeee.cz – Vinylové podlahy v MSK | Pokládka do týdne',
    template: '%s | pokládámeee.cz',
  },
  description: 'Profesionální pokládka vinylových podlah v Moravskoslezském kraji. Zaměření zdarma do 48 hodin, realizace do týdne. Starou podlahu ekologicky odstraníme. Volejte Adama Hajdušek.',
  keywords: ['vinylová podlaha', 'pokládka podlahy', 'Ostrava', 'MSK', 'Moravskoslezský kraj', 'vinyl lepený', 'podlahy Opava', 'podlahy Frýdek-Místek', 'pokládámeee'],
  authors: [{ name: 'pokládámeee.cz' }],
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
  openGraph: {
    title: 'pokládámeee.cz – Vinylové podlahy v MSK',
    description: 'Pokládka vinylových podlah v Moravskoslezském kraji. Zaměření zdarma, hotovo do týdne.',
    url: 'https://www.pokladameee.cz',
    siteName: 'pokládámeee.cz',
    locale: 'cs_CZ',
    type: 'website',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.pokladameee.cz' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MK4KFBF8');` }} />
        <JsonLd data={LOCAL_BUSINESS_JSON_LD} />
      </head>
      <body>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MK4KFBF8" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} /></noscript>
        {children}
      </body>
    </html>
  )
}
