import { defineType, defineField } from 'sanity'

export const inspiraceStrankaSchema = defineType({
  name: 'inspiraceStranka',
  title: 'Inspirace — stránka',
  type: 'document',
  fields: [
    defineField({
      name: 'heroFotka',
      title: 'Hero fotka (vpravo v úvodní sekci)',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: { prepare: () => ({ title: 'Inspirace — stránka' }) },
})
