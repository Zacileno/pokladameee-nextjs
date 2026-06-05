import { defineType, defineField } from 'sanity'

export const obecneNastaveniSchema = defineType({
  name: 'obecneNastaveni',
  title: 'Obecné nastavení',
  type: 'document',
  fields: [
    defineField({ name: 'telefon', title: 'Telefon', type: 'string' }),
    defineField({ name: 'email', title: 'E-mail', type: 'string' }),
    defineField({ name: 'pracovniDoba', title: 'Pracovní doba', type: 'string' }),
    defineField({ name: 'region', title: 'Region', type: 'string' }),
    defineField({ name: 'popisFooter', title: 'Popis firmy (footer)', type: 'text', rows: 3 }),
  ],
  preview: { prepare: () => ({ title: 'Obecné nastavení' }) },
})
