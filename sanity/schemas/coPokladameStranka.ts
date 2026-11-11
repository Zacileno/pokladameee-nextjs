import { defineType, defineField } from 'sanity'

// Texty stránky /co-pokladame — prázdné pole = na webu zůstane výchozí text.
const text = (name: string, title: string, group: string) =>
  defineField({ name, title, type: 'formatovanyText', group })

const skupina = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    group: 'skupiny',
    options: { collapsible: true, collapsed: false },
    fields: [
      defineField({ name: 'nazev', title: 'Název (na dlaždici i v nadpisu bloku)', type: 'formatovanyText' }),
      defineField({ name: 'claim', title: 'Krátký claim (na dlaždici i nad nadpisem bloku)', type: 'formatovanyText' }),
      defineField({ name: 'popis', title: 'Popis', type: 'formatovanyText' }),
      defineField({
        name: 'body',
        title: 'Odrážky',
        type: 'array',
        of: [{
          type: 'object',
          fields: [defineField({ name: 'text', title: 'Text', type: 'formatovanyText' })],
          preview: { select: { title: 'text.0.children.0.text' } },
        }],
      }),
      defineField({ name: 'cta', title: 'Text tlačítka', type: 'formatovanyText' }),
    ],
  })

export const coPokladameStrankaSchema = defineType({
  name: 'coPokladameStranka',
  title: 'Podlahy na míru',
  type: 'document',
  groups: [
    { name: 'uvod', title: 'Úvod', default: true },
    { name: 'skupiny', title: 'Skupiny zákazníků' },
  ],
  fields: [
    text('nadpis', 'Nadpis stránky', 'uvod'),
    text('uvodText', 'Úvodní text', 'uvod'),
    skupina('byty', 'Byty'),
    skupina('domy', 'Rodinné domy'),
    skupina('firmy', 'Firmy'),
    skupina('druzstva', 'Bytová družstva a SVJ'),
    text('odkazRealizace', 'Text odkazu na realizace (u všech skupin)', 'skupiny'),
  ],
  preview: { prepare: () => ({ title: 'Podlahy na míru' }) },
})
