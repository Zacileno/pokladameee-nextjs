import { defineType, defineField } from 'sanity'

export const referenceSchema = defineType({
  name: 'recenze',
  title: 'Recenze',
  type: 'document',
  fields: [
    defineField({ name: 'jmeno', title: 'Jméno', type: 'string', validation: r => r.required() }),
    defineField({ name: 'text', title: 'Text recenze', type: 'text', validation: r => r.required() }),
    defineField({
      name: 'hvezdicky',
      title: 'Hvězdičky (1–5)',
      type: 'number',
      validation: r => r.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({ name: 'datum', title: 'Datum', type: 'date' }),
    defineField({ name: 'lokalita', title: 'Město', type: 'string', description: 'Zobrazí se pod jménem, např. Ostrava' }),
    defineField({ name: 'fotka', title: 'Fotka realizace', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'odkaz', title: 'Odkaz na recenzi na Googlu', type: 'url', description: 'Na Google Mapách u recenze: tři tečky → Sdílet recenzi → Kopírovat odkaz' }),
    defineField({ name: 'aktivni', title: 'Aktivní', type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'jmeno', subtitle: 'text' } },
})
