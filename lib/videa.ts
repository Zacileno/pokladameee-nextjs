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
export type KratkeVideo = { id: string; nazev: string; snimek?: 'sd1' | 'sd2' | 'sd3'; obrazek?: string }

// svislý náhled Shorts videa (9:16); záběry sd* jsou 4:3 s černými pruhy — ořízne je object-fit: cover
export const shortsNahled = (id: string, snimek?: KratkeVideo['snimek']) =>
  `https://i.ytimg.com/vi/${id}/${snimek ?? 'oardefault'}.jpg`

// Videa s Adamem byla 27. 11. 2026 na přání klientky z webu odstraněna (rady, nábor, Divadlo 1. díl).
// Prázdný seznam = sekce se na webu neukáže, dokud se ve Studiu nepřidají videa.

// homepage — realizace a zákaznice
export const SHORTS_JAK_PRACUJEME: KratkeVideo[] = [
  { id: 'Orkf19z4-BA', nazev: 'Jak u nás probíhá realizace?', snimek: 'sd1' },
  { id: 'hQ30eRhEdmU', nazev: 'Pokládka v Divadle loutek Ostrava' },
  { id: 'zEQy945zzQc', nazev: 'Porubáček: Jak probíhala realizace?' },
  { id: 'nb5pNlozjr8', nazev: 'Jak vypadá podlaha po realizaci?', snimek: 'sd1' },
]

// rady k výběru podlahy (Časté dotazy, Podlahy na míru)
export const SHORTS_VYBER_PODLAHY: KratkeVideo[] = []

// vinyl a údržba
export const SHORTS_VINYL: KratkeVideo[] = []

// Porubáček — zákaznice vypráví
export const SHORTS_PORUBACEK: KratkeVideo[] = [
  { id: 'Gm2N8rr-U1s', nazev: 'Porubáček: Kde hledali inspiraci?', snimek: 'sd1' },
  { id: 'zEQy945zzQc', nazev: 'Porubáček: Jak probíhala realizace?' },
  { id: 'DbarmydFlFI', nazev: 'Porubáček: Jak se o nás dozvěděli?', snimek: 'sd2' },
]

// Divadlo loutek Ostrava
export const SHORTS_DIVADLO: KratkeVideo[] = [
  { id: 'hQ30eRhEdmU', nazev: 'Divadlo loutek Ostrava — 1. díl' },
  { id: 'm9WJ9bJDJFI', nazev: 'Divadlo loutek Ostrava — 2. díl', snimek: 'sd1' },
]

// nábor
export const SHORTS_NABOR: KratkeVideo[] = []
