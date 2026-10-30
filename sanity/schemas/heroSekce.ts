import { defineType, defineField } from 'sanity'

export const heroSekceSchema = defineType({
  name: 'heroSekce',
  title: 'Hero sekce',
  type: 'document',
  fields: [
    defineField({
      name: 'heroFotka',
      title: 'Hero fotka (pozadí úvodní sekce)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: { prepare: () => ({ title: 'Hero sekce' }) },
})
