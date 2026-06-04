import { defineType, defineField } from 'sanity'

export const obecneNastaveniSchema = defineType({
  name: 'obecneNastaveni',
  title: 'Obecné nastavení',
  type: 'document',
  fields: [
    defineField({ name: 'telefon', title: 'Telefon', type: 'string' }),
    defineField({ name: 'email', title: 'E-mail', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Obecné nastavení' }) },
})
