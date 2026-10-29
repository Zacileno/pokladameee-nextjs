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
