import { defineType, defineField } from 'sanity'

export const rodinaZnacekSchema = defineType({
  name: 'rodinaZnacek',
  title: 'Rodina značek',
  type: 'document',
  fields: [
    defineField({ name: 'nadpis', title: 'Nadpis', type: 'string' }),
    defineField({ name: 'podnadpis', title: 'Podnadpis', type: 'text', rows: 2 }),
    defineField({ name: 'pocetKlientuCelkem', title: 'Počet klientů celkem (tučně v textu)', type: 'number' }),
  ],
  preview: { prepare: () => ({ title: 'Rodina značek' }) },
})
