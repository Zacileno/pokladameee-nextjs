import { defineType, defineField } from 'sanity'

export const kontaktSekceSchema = defineType({
  name: 'kontaktSekce',
  title: 'Kontaktní sekce',
  type: 'document',
  fields: [
    defineField({ name: 'nadpis', title: 'Nadpis', type: 'string' }),
    defineField({ name: 'podnadpis', title: 'Podnadpis', type: 'text', rows: 3 }),
    defineField({ name: 'jmeno', title: 'Jméno', type: 'string' }),
    defineField({ name: 'role', title: 'Role', type: 'string' }),
    defineField({ name: 'citat', title: 'Citát', type: 'text', rows: 2 }),
    defineField({ name: 'foto', title: 'Foto', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'telefon', title: 'Telefon', type: 'string' }),
    defineField({ name: 'email', title: 'E-mail', type: 'string' }),
    defineField({ name: 'pracovniDoba', title: 'Pracovní doba', type: 'string' }),
    defineField({ name: 'region', title: 'Region', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Kontaktní sekce' }) },
})
