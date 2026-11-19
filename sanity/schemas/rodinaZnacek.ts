import { defineType, defineField } from 'sanity'

export const rodinaZnacekSchema = defineType({
  name: 'rodinaZnacek',
  title: 'Rodina značek',
  type: 'document',
  fields: [
    defineField({ name: 'stitek', title: 'Štítek nad nadpisem', description: 'Malý text velkými písmeny nad nadpisem.', type: 'string' }),
    defineField({ name: 'nadpisText', title: 'Nadpis', description: 'Nový řádek: Shift + Enter.', type: 'formatovanyText' }),
    defineField({ name: 'podnadpisText', title: 'Podnadpis', description: 'Nový řádek: Shift + Enter.', type: 'formatovanyText' }),
    // staré prosté texty — web je použije jen když nová pole chybí
    defineField({ name: 'nadpis', title: 'Nadpis (starý)', type: 'string', hidden: true }),
    defineField({ name: 'podnadpis', title: 'Podnadpis (starý)', type: 'text', rows: 2, hidden: true }),
    defineField({ name: 'pocetKlientuCelkem', title: 'Počet klientů celkem (tučně v textu)', type: 'number' }),
  ],
  preview: { prepare: () => ({ title: 'Rodina značek' }) },
})
