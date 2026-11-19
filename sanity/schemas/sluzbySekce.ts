import { defineType, defineField } from 'sanity'

export const sluzbySekceSchema = defineType({
  name: 'sluzbySekce',
  title: 'Služby sekce',
  type: 'document',
  fields: [
    defineField({ name: 'stitek', title: 'Štítek nad nadpisem', description: 'Malý text velkými písmeny nad nadpisem.', type: 'string' }),
    defineField({ name: 'nadpisText', title: 'Nadpis', description: 'Nový řádek: Shift + Enter.', type: 'formatovanyText' }),
    defineField({ name: 'podnadpisText', title: 'Podnadpis', description: 'Nový řádek: Shift + Enter.', type: 'formatovanyText' }),
    // staré prosté texty — web je použije jen když nová pole chybí
    defineField({ name: 'nadpis', title: 'Nadpis (starý)', type: 'string', hidden: true }),
    defineField({ name: 'podnadpis', title: 'Podnadpis (starý)', type: 'text', rows: 2, hidden: true }),
    defineField({
      name: 'sluzby',
      title: 'Služby (max. 4)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'emoji', title: 'Emoji / ikona', type: 'string' }),
            defineField({ name: 'title', title: 'Název služby', type: 'string' }),
            defineField({ name: 'desc', title: 'Popis', type: 'text', rows: 3 }),
            defineField({ name: 'detail', title: 'Detail badge (cena, čas…)', type: 'string' }),
          ],
          preview: { select: { title: 'title', subtitle: 'detail' } },
        },
      ],
      validation: r => r.max(4),
    }),
    defineField({ name: 'tlacitko', title: 'Text tlačítka', type: 'formatovanyText' }),
  ],
  preview: { prepare: () => ({ title: 'Služby sekce' }) },
})
