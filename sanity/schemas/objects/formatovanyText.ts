import { defineType, defineArrayMember } from 'sanity'

// Krátký formátovaný text pro jedno pole (badge, nadpis, tlačítko, odstavec…) —
// záměrně jen JEDEN blok (validation max(1)), ať se dá vykreslit inline uvnitř
// existujícího <h1>/<p> bez vlastního odstavcového obalu. Vykresluje se přes
// app/components/FormatovanyText.tsx.
export const formatovanyTextSchema = defineType({
  name: 'formatovanyText',
  title: 'Formátovaný text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{ title: 'Normální', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [
          { title: 'Tučně', value: 'strong' },
          { title: 'Kurzíva', value: 'em' },
        ],
        annotations: [
          {
            name: 'barva',
            title: 'Barva textu',
            type: 'object',
            fields: [
              {
                name: 'hodnota',
                title: 'Barva',
                type: 'string',
                options: {
                  list: [
                    { title: 'Oranžová (brand)', value: 'orange' },
                    { title: 'Modrá (brand)', value: 'blue' },
                    { title: 'Černá', value: 'black' },
                    { title: 'Bílá', value: 'white' },
                    { title: 'Šedá', value: 'gray' },
                  ],
                  layout: 'radio',
                },
                initialValue: 'orange',
              },
            ],
          },
          {
            name: 'velikost',
            title: 'Velikost textu',
            type: 'object',
            fields: [
              {
                name: 'hodnota',
                title: 'Velikost',
                type: 'string',
                options: {
                  list: [
                    { title: 'Menší', value: 'small' },
                    { title: 'Normální', value: 'normal' },
                    { title: 'Větší', value: 'large' },
                    { title: 'Výrazně větší', value: 'xlarge' },
                  ],
                  layout: 'radio',
                },
                initialValue: 'normal',
              },
            ],
          },
        ],
      },
    }),
  ],
  validation: (r) => r.max(1).warning('Toto pole se vykresluje inline — používej jen jeden odstavec/blok.'),
})
