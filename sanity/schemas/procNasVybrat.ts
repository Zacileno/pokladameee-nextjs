import { defineType, defineField } from 'sanity'

export const procNasVybratSchema = defineType({
  name: 'procNasVybrat',
  title: 'Proč nás vybrat',
  type: 'document',
  fields: [
    defineField({ name: 'stitek', title: 'Štítek nad nadpisem', description: 'Malý text velkými písmeny nad nadpisem.', type: 'string' }),
    defineField({ name: 'nadpisText', title: 'Nadpis', description: 'Nový řádek: Shift + Enter.', type: 'formatovanyText' }),
    defineField({ name: 'podnadpisText', title: 'Podnadpis', description: 'Nový řádek: Shift + Enter.', type: 'formatovanyText' }),
    // staré prosté texty — web je použije jen když nová pole chybí
    defineField({ name: 'nadpis', title: 'Nadpis (starý)', type: 'string', hidden: true }),
    defineField({ name: 'podnadpis', title: 'Podnadpis (starý)', type: 'text', rows: 3, hidden: true }),
    defineField({
      name: 'vyhody',
      title: 'Výhody (max. 4)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'emoji', title: 'Emoji / ikona', type: 'string' }),
            defineField({ name: 'title', title: 'Nadpis', type: 'string' }),
            defineField({ name: 'desc', title: 'Popis', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 'title', subtitle: 'desc' } },
        },
      ],
      validation: r => r.max(4),
    }),
    defineField({ name: 'tlacitko', title: 'Text tlačítka', type: 'formatovanyText' }),
  ],
  preview: { prepare: () => ({ title: 'Proč nás vybrat' }) },
})
