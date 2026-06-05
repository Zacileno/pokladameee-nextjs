import { defineType, defineField } from 'sanity'

export const jakToFungujeSchema = defineType({
  name: 'jakToFunguje',
  title: 'Jak to funguje',
  type: 'document',
  fields: [
    defineField({
      name: 'kroky',
      title: 'Kroky (max. 4)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Nadpis kroku', type: 'string' }),
            defineField({ name: 'desc', title: 'Popis', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'title', subtitle: 'desc' } },
        },
      ],
      validation: r => r.max(4),
    }),
  ],
  preview: { prepare: () => ({ title: 'Jak to funguje' }) },
})
