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
    defineField({ name: 'nadpisKontakt', title: 'Kontakt — Nadpis', type: 'string' }),
    defineField({ name: 'podnadpisKontakt', title: 'Kontakt — Podnadpis', type: 'text', rows: 3 }),
    defineField({ name: 'jmenoKontakt', title: 'Kontakt — Jméno', type: 'string' }),
    defineField({ name: 'roleKontakt', title: 'Kontakt — Role', type: 'string' }),
    defineField({ name: 'citatKontakt', title: 'Kontakt — Citát', type: 'text', rows: 2 }),
    defineField({ name: 'fotoKontakt', title: 'Kontakt — Foto', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'telefonKontakt', title: 'Kontakt — Telefon', type: 'string' }),
    defineField({ name: 'emailKontakt', title: 'Kontakt — E-mail', type: 'string' }),
    defineField({ name: 'pracovniDobaKontakt', title: 'Kontakt — Pracovní doba', type: 'string' }),
    defineField({ name: 'regionKontakt', title: 'Kontakt — Region', type: 'string' }),
  ],
  preview: { prepare: () => ({ title: 'Nastavení webu' }) },
})
