import { defineType, defineField, defineArrayMember } from 'sanity'

// Odkaz v textu (tlačítko „Odkaz“ v editoru). Sdílí ho i editor stránky Průběh realizace.
// U textu uvnitř tlačítka se odkaz na webu nevykreslí — tlačítko už svůj cíl má.
export const odkazAnotace = defineArrayMember({
  name: 'odkaz',
  title: 'Odkaz',
  type: 'object',
  fields: [
    defineField({
      name: 'href',
      title: 'Adresa odkazu',
      type: 'string',
      description:
        'Stránka webu (/kariera, /#kontakt), celá adresa (https://…), e-mail (mailto:…) nebo telefon (tel:…). U textu tlačítka se odkaz nepoužije — tlačítko už svůj cíl má.',
      validation: (r) =>
        r.required().custom((v) =>
          !v || /^(\/|#|https?:\/\/|mailto:|tel:)/.test(String(v).trim())
            ? true
            : 'Začni lomítkem (/kariera), # (#kontakt), https://, mailto: nebo tel:',
        ),
    }),
    defineField({
      name: 'novaZalozka',
      title: 'Otevřít v nové záložce',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})

// Krátký formátovaný text pro jedno pole (badge, nadpis, tlačítko, odstavec…) s tučným písmem,
// kurzívou, barvou, velikostí a odkazem — záměrně jen JEDEN blok (validation max(1)),
// ať se dá vykreslit inline uvnitř existujícího <h1>/<p> bez vlastního odstavcového obalu.
// Vykresluje se přes app/components/FormatovanyText.tsx.
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
                    { title: 'Krémová (brand)', value: 'cream' },
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
          odkazAnotace,
        ],
      },
    }),
  ],
  validation: (r) => r.max(1).warning('Toto pole se vykresluje inline — používej jen jeden odstavec/blok.'),
})
