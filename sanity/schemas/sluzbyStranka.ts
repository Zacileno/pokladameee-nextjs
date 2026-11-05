import { defineType, defineField } from 'sanity'

// ikony, které umí BrandIcon (app/components/BrandIcon.tsx)
export const IKONY = ['📐', '🎨', '✨', '⚡', '♻', '📍', '🪵', '🏠', '🏆', '📋', '✅', '📞', '🛠', '✉', '🕐', '🚛', '📏', '🛡', '📊', '🌳', '🔨', '🏡', '🧶', '🔇', '🏢', '💰', '🧹', '💧', '📸', '🤝', '🔥']

// Texty stránky /sluzby — prázdné pole = na webu zůstane výchozí text.
const text = (name: string, title: string, group: string) =>
  defineField({ name, title, type: 'formatovanyText', group })

const dlazdice = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    group: 'dlazdice',
    options: { collapsible: true, collapsed: false },
    fields: [
      defineField({ name: 'nazev', title: 'Název', type: 'formatovanyText' }),
      defineField({ name: 'popis', title: 'Popis', type: 'formatovanyText' }),
    ],
  })

export const sluzbyStrankaSchema = defineType({
  name: 'sluzbyStranka',
  title: 'Služby — stránka',
  type: 'document',
  groups: [
    { name: 'uvod', title: 'Úvod', default: true },
    { name: 'dlazdice', title: 'Dlaždice služeb' },
    { name: 'vyhody', title: 'Pruh s výhodami' },
  ],
  fields: [
    text('nadpis', 'Nadpis stránky (např. „Naše služby“)', 'uvod'),
    text('uvodText', 'Úvodní text (před odkazem na FAQ)', 'uvod'),
    text('uvodOdkaz', 'Text odkazu na FAQ (na konci úvodního textu)', 'uvod'),
    defineField({
      name: 'kroky',
      title: 'Slogan s ikonkami (pod úvodním textem)',
      description: 'Slovo pište bez „eee“ — to se doplní oranžově samo (např. „Zaměřím“ → Zaměřímeee).',
      type: 'array',
      group: 'uvod',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'emoji', title: 'Ikona', type: 'string', options: { list: IKONY } }),
            defineField({ name: 'slovo', title: 'Slovo (bez „eee“)', type: 'string' }),
          ],
          preview: { select: { title: 'slovo', subtitle: 'emoji' } },
        },
      ],
      validation: r => r.max(5),
    }),
    dlazdice('vinyl', 'Vinylová podlaha'),
    dlazdice('pvc', 'PVC podlaha'),
    dlazdice('koberce', 'Koberce'),
    dlazdice('drevo', 'Dřevěná podlaha'),
    text('tlacitkoProdukt', 'Text tlačítka u dlaždic (např. „Zobrazit produkt“)', 'dlazdice'),
    defineField({
      name: 'ikonky',
      title: 'Výhody s ikonkami',
      type: 'array',
      group: 'vyhody',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'emoji', title: 'Ikona', type: 'string', options: { list: IKONY } }),
          defineField({ name: 'text', title: 'Text', type: 'formatovanyText' }),
        ],
        preview: { select: { subtitle: 'emoji' }, prepare: ({ subtitle }) => ({ title: 'Výhoda', subtitle }) },
      }],
      validation: r => r.max(6),
    }),
  ],
  initialValue: {
    kroky: [
      { _key: 'zamerim', emoji: '📐', slovo: 'Zaměřím' },
      { _key: 'poradim', emoji: '🎨', slovo: 'Poradím' },
      { _key: 'polozim', emoji: '✨', slovo: 'Položím' },
    ],
  },
  preview: { prepare: () => ({ title: 'Služby — stránka' }) },
})
