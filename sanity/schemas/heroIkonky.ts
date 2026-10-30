import { defineType, defineField } from 'sanity'

export const heroIkonkySchema = defineType({
  name: 'heroIkonky',
  title: 'Hero ikonky',
  type: 'document',
  fields: [
    defineField({
      name: 'ikonky',
      title: 'Ikonky (max. 5)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'emoji', title: 'Emoji / ikona', type: 'string' }),
            defineField({ name: 'title', title: 'Nadpis', type: 'string' }),
            defineField({ name: 'sub', title: 'Podnadpis', type: 'string' }),
          ],
          preview: { select: { title: 'title', subtitle: 'sub' } },
        },
      ],
      validation: r => r.max(5),
    }),
  ],
  preview: { prepare: () => ({ title: 'Hero ikonky' }) },
})
