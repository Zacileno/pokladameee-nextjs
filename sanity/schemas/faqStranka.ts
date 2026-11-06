import { defineType, defineField } from 'sanity'

// Texty stránky /faq — prázdné pole = na webu zůstane výchozí text.
// Otázky ke službám se dál berou z podstránek služeb, aby nebyly na dvou místech.
const text = (name: string, title: string, group: string) =>
  defineField({ name, title, type: 'formatovanyText', group })

const sekce = (name: string, title: string, group: string, description?: string) =>
  defineField({
    name,
    title,
    description,
    type: 'object',
    group,
    options: { collapsible: true, collapsed: false },
    fields: [
      defineField({ name: 'stitek', title: 'Štítek v hlavičce stránky', type: 'formatovanyText' }),
      defineField({ name: 'nadpis', title: 'Nadpis sekce', type: 'formatovanyText' }),
    ],
  })

export const faqStrankaSchema = defineType({
  name: 'faqStranka',
  title: 'FAQ',
  type: 'document',
  groups: [
    { name: 'uvod', title: 'Úvod', default: true },
    { name: 'obecne', title: 'Obecné otázky' },
    { name: 'sluzby', title: 'Sekce služeb' },
  ],
  fields: [
    text('nadpisMaly', 'Malý nadpis nad hlavním nadpisem', 'uvod'),
    text('nadpis', 'Hlavní nadpis', 'uvod'),
    text('podnadpis', 'Text pod nadpisem', 'uvod'),
    sekce('obecne', 'Sekce Obecné otázky', 'obecne'),
    defineField({
      name: 'otazky',
      title: 'Obecné otázky',
      type: 'array',
      group: 'obecne',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'otazka', title: 'Otázka', type: 'formatovanyText' }),
          defineField({ name: 'odpoved', title: 'Odpověď', type: 'formatovanyText' }),
        ],
        preview: { select: { title: 'otazka.0.children.0.text', subtitle: 'odpoved.0.children.0.text' } },
      }],
    }),
    sekce('vinyl', 'Sekce Vinylová podlaha', 'sluzby', 'Otázky a odpovědi se upravují v dokumentu „Podstránka: Vinylová podlaha“, záložka FAQ.'),
    sekce('pvc', 'Sekce PVC podlaha', 'sluzby', 'Otázky a odpovědi se upravují v dokumentu „Podstránka: PVC podlaha“, záložka FAQ.'),
    sekce('koberce', 'Sekce Koberce', 'sluzby', 'Otázky a odpovědi se upravují v dokumentu „Podstránka: Kobercová podlaha“, záložka FAQ.'),
    sekce('drevo', 'Sekce Dřevěná podlaha', 'sluzby', 'Otázky a odpovědi se upravují v dokumentu „Podstránka: Dřevěná podlaha“, záložka FAQ.'),
  ],
  preview: { prepare: () => ({ title: 'FAQ' }) },
})
