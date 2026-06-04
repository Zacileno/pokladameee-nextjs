import { defineType, defineField } from 'sanity'

export const projektSchema = defineType({
  name: 'projekt',
  title: 'Projekty skupiny',
  type: 'document',
  fields: [
    defineField({ name: 'nazev', title: 'Název projektu', type: 'string', validation: r => r.required() }),
    defineField({ name: 'claim', title: 'Claim (podnadpis)', type: 'string' }),
    defineField({ name: 'popis', title: 'Krátký popis (1–2 věty)', type: 'text', rows: 2 }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'fotkaRemselniku', title: 'Fotka řemeslníka (PNG průhledné pozadí)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'pocetKlientu', title: 'Počet klientů', type: 'number' }),
    defineField({ name: 'hodnoceni', title: 'Hodnocení (např. 4.9)', type: 'number' }),
    defineField({ name: 'url', title: 'URL webu', type: 'url', validation: r => r.required() }),
    defineField({ name: 'barva', title: 'Barva pozadí karty (hex)', type: 'string' }),
    defineField({ name: 'aktivni', title: 'Aktivní', type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'nazev', subtitle: 'url', media: 'logo' } },
})
