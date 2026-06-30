import { defineType, defineField } from 'sanity'

export const vinylovaPodlahaSchema = defineType({
  name: 'vinylovaPodlaha',
  title: 'Podstránka: Vinylová podlaha',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'istrip', title: 'Ikonový strip' },
    { name: 'typy', title: 'Typy podlah' },
    { name: 'benefity', title: 'Proč zvolit' },
    { name: 'kroky', title: 'Jak to probíhá' },
    { name: 'reference', title: 'Reference strip' },
    { name: 'faq', title: 'FAQ' },
  ],
  fields: [
    defineField({ name: 'heroNadpis', title: 'Hero — nadpis', type: 'string', group: 'hero' }),
    defineField({ name: 'heroPodnadpis', title: 'Hero — podnadpis', type: 'text', rows: 2, group: 'hero' }),
    defineField({ name: 'heroBadge', title: 'Hero — badge text (odvoz zdarma…)', type: 'string', group: 'hero' }),
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
          defineField({ name: 'text', title: 'Text', type: 'string' }),
        ],
        preview: { select: { title: 'text', subtitle: 'emoji' } },
      }],
      validation: r => r.max(5),
    }),

    defineField({ name: 'typyNadpis', title: 'Typy podlah — nadpis sekce', type: 'string', group: 'typy' }),
    defineField({ name: 'typyPodnadpis', title: 'Typy podlah — podnadpis sekce', type: 'text', rows: 2, group: 'typy' }),
    defineField({
      name: 'typy',
      title: 'Karty typů (max. 2)',
      type: 'array',
      group: 'typy',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'nazev', title: 'Název', type: 'string' }),
          defineField({ name: 'badge', title: 'Badge (volitelné)', type: 'string' }),
          defineField({ name: 'popis', title: 'Popis', type: 'text', rows: 3 }),
          defineField({ name: 'vyhody', title: 'Výhody (odrážky)', type: 'array', of: [{ type: 'string' }] }),
          defineField({ name: 'barva', title: 'Barva pruhu', type: 'string', options: { list: ['orange', 'blue'] } }),
        ],
        preview: { select: { title: 'nazev', subtitle: 'badge' } },
      }],
      validation: r => r.max(2),
    }),

    defineField({ name: 'benefityNadpis', title: 'Proč zvolit — nadpis sekce', type: 'string', group: 'benefity' }),
    defineField({
      name: 'benefity',
      title: 'Benefity (max. 4)',
      type: 'array',
      group: 'benefity',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'emoji', title: 'Emoji', type: 'string' }),
          defineField({ name: 'nadpis', title: 'Nadpis', type: 'string' }),
          defineField({ name: 'text', title: 'Text', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'nadpis', subtitle: 'emoji' } },
      }],
      validation: r => r.max(4),
    }),

    defineField({ name: 'krokyNadpis', title: 'Jak to probíhá — nadpis sekce', type: 'string', group: 'kroky' }),
    defineField({ name: 'krokyPodnadpis', title: 'Jak to probíhá — podnadpis sekce', type: 'text', rows: 2, group: 'kroky' }),
    defineField({
      name: 'kroky',
      title: 'Kroky (max. 4)',
      type: 'array',
      group: 'kroky',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'nadpis', title: 'Nadpis', type: 'string' }),
          defineField({ name: 'text', title: 'Text', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'nadpis' } },
      }],
      validation: r => r.max(4),
    }),

    defineField({ name: 'referenceHodnoceni', title: 'Reference — hodnocení (např. 4.8)', type: 'number', group: 'reference' }),
    defineField({ name: 'referenceCitace', title: 'Reference — citace', type: 'text', rows: 3, group: 'reference' }),
    defineField({ name: 'referenceJmeno', title: 'Reference — jméno a místo', type: 'string', group: 'reference' }),

    defineField({
      name: 'faq',
      title: 'FAQ (otázky a odpovědi)',
      type: 'array',
      group: 'faq',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'otazka', title: 'Otázka', type: 'string' }),
          defineField({ name: 'odpoved', title: 'Odpověď', type: 'text', rows: 3 }),
        ],
        preview: { select: { title: 'otazka' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Podstránka: Vinylová podlaha' }) },
})
