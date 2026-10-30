import { defineType, defineField } from 'sanity'

export const sluzbySekceSchema = defineType({
  name: 'sluzbySekce',
  title: 'Služby sekce',
  type: 'document',
  fields: [
    defineField({ name: 'nadpis', title: 'Nadpis', type: 'string' }),
    defineField({ name: 'podnadpis', title: 'Podnadpis', type: 'text', rows: 2 }),
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
  ],
  preview: { prepare: () => ({ title: 'Služby sekce' }) },
})
