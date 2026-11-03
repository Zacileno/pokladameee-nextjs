// Fotky z realizací (soubory v public/realizace). Popisek = jen město, nikdy jméno ani adresa zákazníka.
// Jen hotové realizace a každá místnost jen jednou — žádné „před" ani stejný pokoj z jiného úhlu.

export type TypPodlahy = 'vinyl' | 'pvc' | 'koberce' | 'drevo'

export const TYP_NAZEV: Record<TypPodlahy, string> = {
  vinyl: 'Vinylová podlaha',
  pvc: 'PVC podlaha',
  koberce: 'Koberec',
  drevo: 'Dřevěná podlaha',
}

export type RealizaceFoto = {
  soubor: string
  mesto: string
  typ?: TypPodlahy
}

// slider „Kde naše podlahy dělají radost?" na produktových stránkách — stejná města nejdou po sobě
export const REALIZACE: Record<TypPodlahy, RealizaceFoto[]> = {
  vinyl: [
    { soubor: 'vinyl-uvalno-jidelna', mesto: 'Úvalno' },
    { soubor: 'vinyl-lepeny-bruzovice-1', mesto: 'Bruzovice' },
    { soubor: 'vinyl-petrvald-kuchyn', mesto: 'Petřvald' },
    { soubor: 'vinyl-stanislavice-obyvak-2', mesto: 'Stanislavice' },
    { soubor: 'vinyl-karvina-pokoj', mesto: 'Karviná' },
    { soubor: 'vinyl-divadlo-ostrava', mesto: 'Ostrava' },
    { soubor: 'vinyl-skalice-obyvak', mesto: 'Skalice' },
    { soubor: 'vinyl-lepeny-bruzovice-2', mesto: 'Bruzovice' },
    { soubor: 'vinyl-karvina-chodba-seda', mesto: 'Karviná' },
    { soubor: 'vinyl-stanislavice-chodba', mesto: 'Stanislavice' },
  ],
  pvc: [
    { soubor: 'pvc-frydek-mistek-kuchyn', mesto: 'Frýdek-Místek' },
    { soubor: 'pvc-stablovice-pokoj', mesto: 'Štáblovice' },
    { soubor: 'pvc-frydek-mistek-pokoj', mesto: 'Frýdek-Místek' },
    { soubor: 'pvc-posilovna-ostrava', mesto: 'Ostrava' },
  ],
  koberce: [
    { soubor: 'koberec-koprivnice-chodba', mesto: 'Kopřivnice' },
    { soubor: 'koberec-posilovna-ostrava', mesto: 'Ostrava' },
    { soubor: 'koberec-koprivnice-schody-2', mesto: 'Kopřivnice' },
    { soubor: 'koberec-posilovna-ostrava-2', mesto: 'Ostrava' },
  ],
  drevo: [
    { soubor: 'drevo-zabreh-pokoj', mesto: 'Zábřeh' },
    { soubor: 'drevo-zabreh-chodba', mesto: 'Zábřeh' },
  ],
}

// „Fotogalerieee našich realizací" na stránce Inspirace — typy podlah promíchané,
// žádná fotka dvakrát, stejné město nikdy dvakrát po sobě
export const FOTOGALERIE: RealizaceFoto[] = [
  { soubor: 'vinyl-stanislavice-obyvak', mesto: 'Stanislavice', typ: 'vinyl' },
  { soubor: 'pvc-frydek-mistek-kuchyn', mesto: 'Frýdek-Místek', typ: 'pvc' },
  { soubor: 'drevo-zabreh-pokoj', mesto: 'Zábřeh', typ: 'drevo' },
  { soubor: 'koberec-koprivnice-schody-2', mesto: 'Kopřivnice', typ: 'koberce' },
  { soubor: 'vinyl-uvalno-jidelna', mesto: 'Úvalno', typ: 'vinyl' },
  { soubor: 'pvc-stablovice-pokoj', mesto: 'Štáblovice', typ: 'pvc' },
  { soubor: 'vinyl-lepeny-bruzovice-1', mesto: 'Bruzovice', typ: 'vinyl' },
  { soubor: 'koberec-posilovna-ostrava', mesto: 'Ostrava', typ: 'koberce' },
  { soubor: 'vinyl-petrvald-kuchyn', mesto: 'Petřvald', typ: 'vinyl' },
  { soubor: 'drevo-zabreh-chodba', mesto: 'Zábřeh', typ: 'drevo' },
  { soubor: 'vinyl-karvina-pokoj', mesto: 'Karviná', typ: 'vinyl' },
  { soubor: 'pvc-frydek-mistek-pokoj', mesto: 'Frýdek-Místek', typ: 'pvc' },
  { soubor: 'vinyl-skalice-obyvak', mesto: 'Skalice', typ: 'vinyl' },
  { soubor: 'koberec-koprivnice-chodba', mesto: 'Kopřivnice', typ: 'koberce' },
  { soubor: 'vinyl-divadlo-ostrava', mesto: 'Ostrava', typ: 'vinyl' },
  { soubor: 'vinyl-lepeny-bruzovice-2', mesto: 'Bruzovice', typ: 'vinyl' },
  { soubor: 'pvc-posilovna-ostrava', mesto: 'Ostrava', typ: 'pvc' },
  { soubor: 'vinyl-karvina-chodba-seda', mesto: 'Karviná', typ: 'vinyl' },
  { soubor: 'vinyl-stanislavice-chodba', mesto: 'Stanislavice', typ: 'vinyl' },
]
