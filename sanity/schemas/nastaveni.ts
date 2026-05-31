import { defineType, defineField } from 'sanity'

export const nastaveniSchema = defineType({
  name: 'nastaveni',
  title: 'Nastavení webu',
  type: 'document',
  fields: [
    defineField({
      name: 'heroFotka',
      title: 'Hero fotka (pozadí úvodní sekce)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'telefon', title: 'Telefon', type: 'string' }),
    defineField({ name: 'email', title: 'E-mail', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Nastavení webu' }) },
})
