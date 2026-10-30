// Kraje, kam jezdíme — homepage mapa + podstránky /lokality/[kraj].
// Města zatím jen jako výpis (bez vlastních podstránek).

export type Kraj = {
  slug: string
  mapaId: string        // id kraje v lib/mapa-kraju.ts
  nazev: string         // Moravskoslezský kraj
  vKraji: string        // v Moravskoslezském kraji
  oblast: string        // pokračování věty „po celém kraji — …"
  mesta: string[]
}

export const KRAJE: Kraj[] = [
  {
    slug: 'moravskoslezsky-kraj',
    mapaId: 'moravskoslezsky-kraj',
    nazev: 'Moravskoslezský kraj',
    vKraji: 'v Moravskoslezském kraji',
    oblast: 'od Ostravy přes Opavu a Frýdek-Místek až po Beskydy',
    mesta: ['Ostrava', 'Opava', 'Frýdek-Místek', 'Havířov', 'Karviná', 'Nový Jičín', 'Třinec', 'Bruntál'],
  },
  {
    slug: 'zlinsky-kraj',
    mapaId: 'zlinsky-kraj',
    nazev: 'Zlínský kraj',
    vKraji: 've Zlínském kraji',
    oblast: 'od Zlína přes Kroměříž a Uherské Hradiště až po Valašsko',
    mesta: ['Zlín', 'Kroměříž', 'Uherské Hradiště', 'Vsetín', 'Valašské Meziříčí', 'Rožnov pod Radhoštěm'],
  },
  {
    slug: 'olomoucky-kraj',
    mapaId: 'olomoucky-kraj',
    nazev: 'Olomoucký kraj',
    vKraji: 'v Olomouckém kraji',
    oblast: 'od Olomouce přes Přerov a Prostějov až po Jeseníky',
    mesta: ['Olomouc', 'Přerov', 'Prostějov', 'Šumperk', 'Hranice', 'Jeseník'],
  },
]

export const getKraj = (slug: string) => KRAJE.find(k => k.slug === slug)
