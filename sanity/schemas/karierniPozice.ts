import { defineType, defineField } from 'sanity'

export const karierniPoziceSchema = defineType({
  name: 'karierniPozice',
  title: 'Kariéra — pozice',
  type: 'document',
  fields: [
    defineField({ name: 'nazev', title: 'Název pozice', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'slug',
      title: 'URL adresa (slug)',
      type: 'slug',
      options: { source: 'nazev', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({ name: 'region', title: 'Region (hodnota pro filtr)', type: 'string', initialValue: 'moravskoslezsky-kraj' }),
    defineField({ name: 'regionLabel', title: 'Region (zobrazený text)', type: 'string', initialValue: 'Moravskoslezský kraj', validation: r => r.required() }),
    defineField({
      name: 'typ',
      title: 'Typ pozice',
      type: 'string',
      options: {
        list: [
          { title: 'V terénu', value: 'v-terenu' },
          { title: 'Kancelář / V terénu', value: 'kombinovane' },
          { title: 'Kancelář', value: 'kancelar' },
        ],
      },
    }),
    defineField({ name: 'typLabel', title: 'Typ pozice (zobrazený text)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'perex', title: 'Perex', type: 'text', rows: 3, validation: r => r.required() }),
    defineField({ name: 'naplnPrace', title: 'Náplň práce', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'pozadujeme', title: 'Požadujeme', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'nabizime', title: 'Nabízíme', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'datumZverejneni',
      title: 'Datum zveřejnění',
      description: 'Používá se i pro structured data (JobPosting) v Google.',
      type: 'date',
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: r => r.required(),
    }),
    defineField({ name: 'aktivni', title: 'Pozice je aktivní (zobrazit na webu)', type: 'boolean', initialValue: true }),
  ],
  orderings: [
    {
      title: 'Datum zveřejnění, od nejnovějšího',
      name: 'datumZverejneniDesc',
      by: [{ field: 'datumZverejneni', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'nazev', subtitle: 'regionLabel' },
  },
})
