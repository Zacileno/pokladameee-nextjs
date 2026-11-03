// Fotky z realizací pro galerii „Inspirujteee se" na produktových stránkách.
// Soubory jsou v public/realizace. Popisek = jen město, nikdy jméno ani adresa zákazníka.

export type RealizaceFoto = {
  soubor: string
  mesto: string
}

export type TypPodlahy = 'vinyl' | 'pvc' | 'koberce' | 'drevo'

export const REALIZACE: Record<TypPodlahy, RealizaceFoto[]> = {
  vinyl: [
    { soubor: 'vinyl-uvalno-jidelna', mesto: 'Úvalno' },
    { soubor: 'vinyl-lepeny-bruzovice-1', mesto: 'Bruzovice' },
    { soubor: 'vinyl-petrvald-kuchyn', mesto: 'Petřvald' },
    { soubor: 'vinyl-uvalno-obyvak', mesto: 'Úvalno' },
    { soubor: 'vinyl-stanislavice-chodba', mesto: 'Stanislavice' },
    { soubor: 'vinyl-karvina-pokoj', mesto: 'Karviná' },
    { soubor: 'vinyl-skalice-obyvak', mesto: 'Skalice' },
    { soubor: 'vinyl-uvalno-krb', mesto: 'Úvalno' },
    { soubor: 'vinyl-karvina-chodba-seda', mesto: 'Karviná' },
    { soubor: 'vinyl-stanislavice-pokoj', mesto: 'Stanislavice' },
    { soubor: 'vinyl-karvina-pokoj-2', mesto: 'Karviná' },
    { soubor: 'vinyl-stanislavice-obyvak-2', mesto: 'Stanislavice' },
    { soubor: 'vinyl-lepeny-bruzovice-2', mesto: 'Bruzovice' },
  ],
  pvc: [
    { soubor: 'pvc-frydek-mistek-kuchyn', mesto: 'Frýdek-Místek' },
    { soubor: 'pvc-stablovice-pokoj', mesto: 'Štáblovice' },
    { soubor: 'pvc-frydek-mistek-pokoj-2', mesto: 'Frýdek-Místek' },
    { soubor: 'pvc-frydek-mistek-kuchyn-2', mesto: 'Frýdek-Místek' },
    { soubor: 'pvc-posilovna-ostrava', mesto: 'Ostrava' },
    { soubor: 'pvc-frydek-mistek-pokoj', mesto: 'Frýdek-Místek' },
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
    { soubor: 'drevo-zabreh-pokoj-2', mesto: 'Zábřeh' },
  ],
}
