import { defineType, defineField } from 'sanity'

export const inspiraceSchema = defineType({
  name: 'inspirace',
  title: 'Inspirace / Galerie',
  type: 'document',
  fields: [
    defineField({ name: 'nazev', title: 'Popis projektu', type: 'string', validation: r => r.required() }),
    defineField({ name: 'material', title: 'Materiál', type: 'string' }),
    defineField({ name: 'rozloha', title: 'Rozloha (m²)', type: 'string' }),
    defineField({ name: 'lokalita', title: 'Lokalita (město)', type: 'string' }),
    defineField({
      name: 'fotoPo',
      title: 'Foto PO pokládce',
      type: 'image',
      options: { hotspot: true },
      validation: r => r.required(),
    }),
    defineField({
      name: 'fotoPred',
      title: 'Foto PŘED pokládkou',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'poradiZobrazeni', title: 'Pořadí zobrazení', type: 'number', initialValue: 100 }),
  ],
  orderings: [{ title: 'Pořadí', name: 'poradi', by: [{ field: 'poradiZobrazeni', direction: 'asc' }] }],
  preview: { select: { title: 'nazev', subtitle: 'lokalita', media: 'fotoPo' } },
})
