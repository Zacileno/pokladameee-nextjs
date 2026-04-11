import { defineType, defineField } from 'sanity'

export const akceSchema = defineType({
  name: 'akce',
  title: 'Akce a slevy',
  type: 'document',
  fields: [
    defineField({ name: 'nazev', title: 'Název akce', type: 'string', validation: r => r.required() }),
    defineField({ name: 'popis', title: 'Popis', type: 'text', rows: 3 }),
    defineField({ name: 'platnostDo', title: 'Platnost do', type: 'date' }),
    defineField({ name: 'aktivni', title: 'Aktivní', type: 'boolean', initialValue: true }),
    defineField({ name: 'badge', title: 'Badge text (např. "-20%")', type: 'string' }),
  ],
  preview: { select: { title: 'nazev', subtitle: 'badge' } },
})
