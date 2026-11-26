// YouTube videa z realizací (id = část URL za youtu.be/)

export type Video = { id: string; nazev: string; popis: string }

export const VIDEO_PORUBACEK_REFERENCE: Video = {
  id: 'YYML7erhBAM',
  nazev: 'Nový koberec v dětském centru Porubáček',
  popis: 'Dětské centrum Porubáček v Ostravě-Porubě má nový, útulný a bezpečný koberec na hraní. Jak celá realizace probíhala, popisuje přímo zákaznice.',
}

export const VIDEO_PORUBACEK_VYSLEDEK: Video = {
  id: 'jSNl8xDruf8',
  nazev: 'Výsledek po realizaci — Porubáček Ostrava',
  popis: 'Rychlý pohled na dokončenou pokládku koberce v dětském centru Porubáček.',
}

export const youtubeNahled = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`

// ID videa z odkazu na YouTube (youtu.be/ID, watch?v=ID, shorts/ID, embed/ID)
export const youtubeId = (url?: string) => url?.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/)?.[1]

// ── Krátká videa na výšku (YouTube Shorts, kanál Pokládámeee) ──
// snimek = záběr z průběhu videa (sd1 ≈ 25 %, sd2 ≈ 50 %, sd3 ≈ 75 %) místo titulního náhledu,
// aby vedle sebe nestály stejně vypadající náhledy
export type KratkeVideo = { id: string; nazev: string; snimek?: 'sd1' | 'sd2' | 'sd3' }

// svislý náhled Shorts videa (9:16); záběry sd* jsou 4:3 s černými pruhy — ořízne je object-fit: cover
export const shortsNahled = (id: string, snimek?: KratkeVideo['snimek']) =>
  `https://i.ytimg.com/vi/${id}/${snimek ?? 'oardefault'}.jpg`

// homepage — mix: realizace, zákaznice, rada od Adama
export const SHORTS_JAK_PRACUJEME: KratkeVideo[] = [
  { id: 'Orkf19z4-BA', nazev: 'Jak u nás probíhá realizace?', snimek: 'sd1' },
  { id: 'VI05J18FUMc', nazev: 'Pokládka v Divadle loutek Ostrava' },
  { id: 'f_H_r-VjtHA', nazev: 'Na tohle si při výběru dejte pozor' },
  { id: 'zEQy945zzQc', nazev: 'Porubáček: Jak probíhala realizace?' },
  { id: 'nb5pNlozjr8', nazev: 'Jak vypadá podlaha po realizaci?', snimek: 'sd1' },
]

// rady k výběru podlahy
export const SHORTS_VYBER_PODLAHY: KratkeVideo[] = [
  { id: 'UWFfDZP31eI', nazev: 'Největší chyba při výběru podlahy' },
  { id: 'f_H_r-VjtHA', nazev: 'Na tohle si při výběru dejte pozor' },
  { id: 'WVEvnmfJFHM', nazev: 'Co je nejtěžší na výběru podlahy?' },
  { id: 'qbQbT107bMk', nazev: '3 věci, které podlahář neřekne nahlas' },
]

// vinyl a údržba
export const SHORTS_VINYL: KratkeVideo[] = [
  { id: 'RwrobPmdnF4', nazev: 'Jak popsat vinyl jednou větou?' },
  { id: 'AGBFw0X2Ru4', nazev: 'Jak se udržuje vinylová podlaha?' },
  { id: 'q-enqqxMdjA', nazev: 'Jaká podlaha je nejlepší na údržbu?' },
]

// Porubáček — zákaznice vypráví
export const SHORTS_PORUBACEK: KratkeVideo[] = [
  { id: 'Gm2N8rr-U1s', nazev: 'Porubáček: Kde hledali inspiraci?', snimek: 'sd1' },
  { id: 'zEQy945zzQc', nazev: 'Porubáček: Jak probíhala realizace?' },
  { id: 'DbarmydFlFI', nazev: 'Porubáček: Jak se o nás dozvěděli?', snimek: 'sd2' },
]

// Divadlo loutek Ostrava (m9WJ9bJDJFI je skoro totožné s hQ30eRhEdmU, proto vynecháno)
export const SHORTS_DIVADLO: KratkeVideo[] = [
  { id: 'VI05J18FUMc', nazev: 'Divadlo loutek Ostrava: pokládka' },
  { id: 'hQ30eRhEdmU', nazev: 'Divadlo loutek Ostrava: realizace', snimek: 'sd1' },
]

// nábor
export const SHORTS_NABOR: KratkeVideo[] = [
  { id: 'gWwFRnoOmkw', nazev: 'Hledáme podlaháře' },
  { id: 'Fhm9XhQyOog', nazev: 'Přidej se k nám jako podlahář' },
]
