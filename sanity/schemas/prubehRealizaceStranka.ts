import { defineType, defineField, defineArrayMember } from 'sanity'

// Texty stránky /prubeh-realizace — prázdné pole = na webu zůstane výchozí text
// (lib/prubeh-realizace.ts). Kapitoly a bloky jsou seznamy, aby stránka zabrala
// v Sanity jen pár desítek atributů (limit free plánu je 2000).

// odstavce s tučným písmem, kurzívou, barvou a odrážkami
const odstavce = (name: string, title: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'block',
        styles: [{ title: 'Normální', value: 'normal' }],
        lists: [{ title: 'Odrážky', value: 'bullet' }],
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
                      { title: 'Šedá', value: 'gray' },
                    ],
                    layout: 'radio',
                  },
                  initialValue: 'orange',
                },
              ],
            },
          ],
        },
      }),
    ],
  })

export const prubehRealizaceStrankaSchema = defineType({
  name: 'prubehRealizaceStranka',
  title: 'Průběh realizace',
  type: 'document',
  groups: [
    { name: 'uvod', title: 'Úvod', default: true },
    { name: 'kapitoly', title: 'Kapitoly a kroky' },
    { name: 'zaver', title: 'Závěrečná výzva' },
  ],
  fields: [
    defineField({ name: 'nadpis', title: 'Nadpis stránky', type: 'formatovanyText', group: 'uvod' }),
    { ...odstavce('uvod', 'Úvodní text'), group: 'uvod' },
    defineField({
      name: 'fakta',
      title: 'Tři hlavní informace pod úvodem',
      type: 'array',
      group: 'uvod',
      of: [{
        type: 'object',
        name: 'fakt',
        fields: [
          defineField({ name: 'nadpis', title: 'Nadpis', type: 'string' }),
          defineField({ name: 'text', title: 'Text', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'nadpis', subtitle: 'text' } },
      }],
    }),
    defineField({ name: 'prehledNadpis', title: 'Přehled kroků: nadpis', type: 'string', group: 'uvod' }),
    defineField({ name: 'prehledText', title: 'Přehled kroků: text', type: 'text', rows: 2, group: 'uvod' }),
    defineField({ name: 'dobreVedetNadpis', title: 'Nadpis karet „Dobré vědět“', type: 'string', group: 'kapitoly' }),
    defineField({ name: 'pokladkaNadpis', title: 'Profesionální pokládka: nadpis sekce', type: 'string', group: 'kapitoly' }),
    defineField({ name: 'pokladkaText', title: 'Profesionální pokládka: text pod nadpisem', type: 'text', rows: 2, group: 'kapitoly' }),
    defineField({
      name: 'kapitoly',
      title: 'Kapitoly',
      description: 'Kapitoly s číslovanými kroky tvoří posuvník „Cesta zakázky“ (bloky bez čísla se ukážou jako karty „Dobré vědět“). Kapitoly bez čísel jsou témata v sekci „Profesionální pokládka“ (bloky = rozbalovací řádky).',
      type: 'array',
      group: 'kapitoly',
      of: [{
        type: 'object',
        name: 'kapitola',
        fields: [
          defineField({ name: 'stitek', title: 'Štítek nad nadpisem', description: 'Např. „Část 1 · Profesionální pokládka“', type: 'string' }),
          defineField({ name: 'nadpis', title: 'Nadpis kapitoly', type: 'string' }),
          odstavce('uvod', 'Úvodní text kapitoly (nepovinné)'),
          defineField({
            name: 'fotky',
            title: 'Fotka kapitoly (nepovinné)',
            description: 'Zobrazí se první fotka (u témat profesionální pokládky). Bez fotky se použije výchozí fotka z realizací.',
            type: 'array',
            of: [{
              type: 'image',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'alt', title: 'Popis pro nevidomé a Google', type: 'string' }),
                defineField({ name: 'popisek', title: 'Popisek pod fotkou', type: 'string' }),
              ],
            }],
          }),
          defineField({
            name: 'bloky',
            title: 'Bloky',
            type: 'array',
            of: [{
              type: 'object',
              name: 'blok',
              fields: [
                defineField({ name: 'cislo', title: 'Číslo kroku (nepovinné)', description: 'Vyplňte jen u kroků cesty zakázky (1–12).', type: 'string' }),
                defineField({ name: 'nadpis', title: 'Nadpis', type: 'string' }),
                odstavce('obsah', 'Text'),
              ],
              preview: {
                select: { cislo: 'cislo', nadpis: 'nadpis' },
                prepare: ({ cislo, nadpis }) => ({ title: cislo ? `${cislo}. ${nadpis ?? ''}` : nadpis }),
              },
            }],
          }),
        ],
        preview: { select: { title: 'nadpis', subtitle: 'stitek' } },
      }],
    }),
    defineField({ name: 'ctaNadpis', title: 'Nadpis výzvy', type: 'string', group: 'zaver' }),
    defineField({ name: 'ctaText', title: 'Text výzvy', type: 'text', rows: 3, group: 'zaver' }),
    defineField({ name: 'ctaTlacitko', title: 'Text tlačítka', type: 'string', group: 'zaver' }),
  ],
  preview: { prepare: () => ({ title: 'Průběh realizace' }) },
})
