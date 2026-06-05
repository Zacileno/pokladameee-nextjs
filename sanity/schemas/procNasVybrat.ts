import { defineType, defineField } from 'sanity'

export const procNasVybratSchema = defineType({
  name: 'procNasVybrat',
  title: 'Proč nás vybrat',
  type: 'document',
  fields: [
    defineField({ name: 'nadpis', title: 'Nadpis', type: 'string' }),
    defineField({ name: 'podnadpis', title: 'Podnadpis', type: 'text', rows: 3 }),
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
  ],
  preview: { prepare: () => ({ title: 'Proč nás vybrat' }) },
})
