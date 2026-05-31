import { defineType, defineField } from 'sanity'

export const projektSchema = defineType({
  name: 'projekt',
  title: 'Projekty skupiny',
  type: 'document',
  fields: [
    defineField({ name: 'nazev', title: 'Název projektu', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      validation: r => r.required(),
    }),
    defineField({ name: 'url', title: 'URL webu', type: 'url', validation: r => r.required() }),
    defineField({ name: 'pocetKlientu', title: 'Počet klientů', type: 'number' }),
    defineField({ name: 'aktivni', title: 'Aktivní', type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'nazev', subtitle: 'url', media: 'logo' } },
})
