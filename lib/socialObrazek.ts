// Obecný náhledový obrázek pro sdílení odkazu (Facebook, WhatsApp, LinkedIn…).
// Adresa /nahled.jpg vrací obrázek nahraný ve Studiu (Obecné nastavení), jinak výchozí
// soubor public/assets/social-pokladameee.jpg — viz app/nahled.jpg/route.ts.
// Stránky s vlastním openGraph ho musí uvést samy, jinak by náhled neměly.
export const SOCIAL_OBRAZEK = [
  {
    url: '/nahled.jpg',
    width: 1200,
    height: 630,
    alt: 'pokládámeee.cz – Podlahy beeezstarostně. Poradímeee, zaměřímeee zdarma, pokládámeee.',
  },
]
