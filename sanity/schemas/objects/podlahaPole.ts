import { defineField } from 'sanity'
import { nahled, odrazky, puvodni } from './pomocne'

// Společná pole čtyř podstránek: Vinylová, PVC, Kobercová a Dřevěná podlaha.
// Prázdné pole = na webu zůstane výchozí text.

const text = (name: string, title: string, group: string, description?: string) =>
  defineField({ name, title, type: 'formatovanyText', group, description })

const polozka = (name: string, title: string) => defineField({ name, title, type: 'formatovanyText' })

export const podlahaSkupiny = [
  { name: 'hero', title: 'Hero', default: true },
  { name: 'istrip', title: 'Ikonový strip' },
  { name: 'typy', title: 'Typy podlah' },
  { name: 'benefity', title: 'Proč zvolit' },
  { name: 'kroky', title: 'Jak to probíhá' },
  { name: 'galerie', title: 'Realizace' },
  { name: 'reference', title: 'Reference strip' },
  { name: 'faq', title: 'FAQ' },
]

export const podlahaPole = [
  text('heroStitekFormat', 'Hero — malý text nad nadpisem', 'hero'),
  text('heroNadpisFormat', 'Hero — nadpis', 'hero', 'Nový řádek: Shift + Enter.'),
  text('heroPodnadpisFormat', 'Hero — podnadpis', 'hero'),
  text('heroBadgeFormat', 'Hero — badge text (odvoz zdarma…)', 'hero', 'Emoji na začátku textu se na webu změní na ikonu.'),
  puvodni('heroNadpis'),
  puvodni('heroPodnadpis', 'text'),
  puvodni('heroBadge'),
  defineField({ name: 'tlacitkoPoptavka', title: 'Hero — text tlačítka', type: 'formatovanyText', group: 'hero' }),
  defineField({ name: 'heroFotka', title: 'Hero — fotka realizace', type: 'image', options: { hotspot: true }, group: 'hero' }),

  defineField({
    name: 'istrip',
    title: 'Ikonový strip (max. 5)',
    type: 'array',
    group: 'istrip',
    of: [{
      type: 'object',
      fields: [
        defineField({ name: 'emoji', title: 'Emoji', type: 'string' }),
        polozka('textFormat', 'Text'),
        puvodni('text'),
      ],
      preview: {
        select: { text: 'textFormat', stary: 'text', emoji: 'emoji' },
        prepare: ({ text, stary, emoji }) => ({ title: nahled(text) || stary, subtitle: emoji }),
      },
    }],
    validation: r => r.max(5),
  }),

  text('typyNadpisFormat', 'Typy podlah — nadpis sekce', 'typy'),
  text('typyPodnadpisFormat', 'Typy podlah — podnadpis sekce', 'typy'),
  puvodni('typyNadpis'),
  puvodni('typyPodnadpis', 'text'),
  defineField({
    name: 'typy',
    title: 'Karty typů (max. 2)',
    type: 'array',
    group: 'typy',
    of: [{
      type: 'object',
      fields: [
        polozka('nazevFormat', 'Název'),
        polozka('badgeFormat', 'Badge (volitelné)'),
        polozka('popisFormat', 'Popis'),
        odrazky('vyhodyFormat', 'Výhody (odrážky)'),
        defineField({ name: 'barva', title: 'Barva pruhu', type: 'string', options: { list: ['orange', 'blue'] } }),
        puvodni('nazev'),
        puvodni('badge'),
        puvodni('popis', 'text'),
        puvodni('vyhody', 'array', { of: [{ type: 'string' }] }),
      ],
      preview: {
        select: { nazev: 'nazevFormat', stary: 'nazev', badge: 'badgeFormat' },
        prepare: ({ nazev, stary, badge }) => ({ title: nahled(nazev) || stary, subtitle: nahled(badge) }),
      },
    }],
    validation: r => r.max(2),
  }),

  text('benefityNadpisFormat', 'Proč zvolit — nadpis sekce', 'benefity'),
  puvodni('benefityNadpis'),
  defineField({
    name: 'benefity',
    title: 'Benefity (max. 4)',
    type: 'array',
    group: 'benefity',
    of: [{
      type: 'object',
      fields: [
        defineField({ name: 'emoji', title: 'Emoji', type: 'string' }),
        polozka('nadpisFormat', 'Nadpis'),
        polozka('textFormat', 'Text'),
        puvodni('nadpis'),
        puvodni('text', 'text'),
      ],
      preview: {
        select: { nadpis: 'nadpisFormat', stary: 'nadpis', emoji: 'emoji' },
        prepare: ({ nadpis, stary, emoji }) => ({ title: nahled(nadpis) || stary, subtitle: emoji }),
      },
    }],
    validation: r => r.max(4),
  }),

  text('krokyNadpisFormat', 'Jak to probíhá — nadpis sekce', 'kroky'),
  text('krokyPodnadpisFormat', 'Jak to probíhá — podnadpis sekce', 'kroky'),
  puvodni('krokyNadpis'),
  puvodni('krokyPodnadpis', 'text'),
  defineField({
    name: 'kroky',
    title: 'Kroky (max. 4)',
    type: 'array',
    group: 'kroky',
    of: [{
      type: 'object',
      fields: [
        polozka('nadpisFormat', 'Nadpis'),
        polozka('textFormat', 'Text'),
        puvodni('nadpis'),
        puvodni('text', 'text'),
      ],
      preview: {
        select: { nadpis: 'nadpisFormat', stary: 'nadpis' },
        prepare: ({ nadpis, stary }) => ({ title: nahled(nadpis) || stary }),
      },
    }],
    validation: r => r.max(4),
  }),

  text('galerieNadpis', 'Galerie realizací — nadpis', 'galerie'),
  text('galeriePodnadpis', 'Galerie realizací — podnadpis', 'galerie'),

  defineField({ name: 'referenceHodnoceni', title: 'Reference — hodnocení (např. 4.8)', type: 'number', group: 'reference' }),
  defineField({ name: 'referenceCitace', title: 'Reference — citace', type: 'text', rows: 3, group: 'reference' }),
  defineField({ name: 'referenceJmeno', title: 'Reference — jméno a místo', type: 'string', group: 'reference' }),

  text('faqNadpis', 'FAQ — nadpis sekce', 'faq'),
  text('faqPodnadpis', 'FAQ — podnadpis sekce', 'faq'),
  defineField({
    name: 'faq',
    title: 'FAQ (otázky a odpovědi)',
    description: 'Stejné otázky se ukazují i na stránce Časté dotazy. Nový řádek: Shift + Enter.',
    type: 'array',
    group: 'faq',
    of: [{
      type: 'object',
      fields: [
        polozka('otazkaFormat', 'Otázka'),
        polozka('odpovedFormat', 'Odpověď'),
        puvodni('otazka'),
        puvodni('odpoved', 'text'),
      ],
      preview: {
        select: { otazka: 'otazkaFormat', stara: 'otazka' },
        prepare: ({ otazka, stara }) => ({ title: nahled(otazka) || stara }),
      },
    }],
  }),
]
