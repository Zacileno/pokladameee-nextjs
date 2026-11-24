import { defineType, defineField } from 'sanity'
import { nahled, odrazky, puvodni } from './objects/pomocne'

const blok = (text: string) => [
  { _type: 'block', _key: 'b0', style: 'normal', markDefs: [], children: [{ _type: 'span', _key: 's0', text, marks: [] }] },
]

export const karierniPoziceSchema = defineType({
  name: 'karierniPozice',
  title: 'Kariéra — pozice',
  type: 'document',
  fields: [
    defineField({
      name: 'nazev',
      title: 'Název pozice',
      description: 'Bez formátování — používá ho Google, záložka prohlížeče, adresa stránky a formulář.',
      type: 'string',
      validation: r => r.required(),
    }),
    defineField({
      name: 'nadpis',
      title: 'Název pozice na webu (formátovaný)',
      description: 'Nadpis na stránce pozice a v seznamu volných pozic. Při změně názvu uprav obě pole. Prázdné = použije se Název pozice.',
      type: 'formatovanyText',
    }),
    defineField({
      name: 'slug',
      title: 'URL adresa (slug)',
      type: 'slug',
      options: { source: 'nazev', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({ name: 'region', title: 'Region (hodnota pro filtr)', type: 'string', initialValue: 'moravskoslezsky-kraj' }),
    defineField({ name: 'regionLabelFormat', title: 'Region (zobrazený text)', type: 'formatovanyText', initialValue: () => blok('Moravskoslezský kraj') }),
    puvodni('regionLabel'),
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
    defineField({ name: 'typLabelFormat', title: 'Typ pozice (zobrazený text)', type: 'formatovanyText' }),
    defineField({ name: 'perexFormat', title: 'Perex', description: 'Nový řádek: Shift + Enter.', type: 'formatovanyText' }),
    odrazky('naplnPraceFormat', 'Náplň práce'),
    odrazky('pozadujemeFormat', 'Požadujeme'),
    odrazky('nabizimeFormat', 'Nabízíme'),
    puvodni('typLabel'),
    puvodni('perex', 'text'),
    puvodni('naplnPrace', 'array', { of: [{ type: 'string' }] }),
    puvodni('pozadujeme', 'array', { of: [{ type: 'string' }] }),
    puvodni('nabizime', 'array', { of: [{ type: 'string' }] }),
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
    select: { title: 'nazev', region: 'regionLabelFormat', stary: 'regionLabel' },
    prepare: ({ title, region, stary }) => ({ title, subtitle: nahled(region) || stary }),
  },
})
