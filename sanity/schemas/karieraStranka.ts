import { defineType, defineField } from 'sanity'
import { IKONY } from './sluzbyStranka'

// ikony používané na kariéře navíc oproti službám (všechny umí BrandIcon)
const IKONY_KARIERA = [...new Set(['🤑', '🚘', '🍰', '🧑‍💼', '📱', '🔥', '🕗', '⛽', '🤳', '🛏️', '👨‍💻', '🍻', '⚽', '🛋️', '🎉', '😄', '🤝', ...IKONY])]

// Texty stránek /kariera, detailu pozice a /dekujeme-kariera — prázdné pole = na webu zůstane výchozí text.
// „eee“ v nadpisech si obarvi oranžově přes „Barva textu“.
const text = (name: string, title: string, group: string) =>
  defineField({ name, title, type: 'formatovanyText', group })

// pole bez formátování — políčka formuláře a přepínače, kam formátovaný text nejde vložit
const prosty = (name: string, title: string, group: string) =>
  defineField({ name, title, type: 'string', group })

export const karieraStrankaSchema = defineType({
  name: 'karieraStranka',
  title: 'Kariéra',
  type: 'document',
  groups: [
    { name: 'uvod', title: 'Úvod', default: true },
    { name: 'pribehy', title: 'Příběhy lidí' },
    { name: 'benefity', title: 'Benefity' },
    { name: 'filozofie', title: 'Filozofie' },
    { name: 'kultura', title: 'Jak to u nás žijeee' },
    { name: 'pozice', title: 'Volné pozice' },
    { name: 'formular', title: 'Formulář' },
    { name: 'detail', title: 'Detail pozice' },
    { name: 'dekujeme', title: 'Děkovná stránka' },
  ],
  fields: [
    text('heroStitek', 'Štítek nad nadpisem (např. „Kariéra“)', 'uvod'),
    text('heroNadpis', 'Nadpis stránky', 'uvod'),
    text('heroPodnadpis', 'Podnadpis', 'uvod'),
    text('heroTlacitkoPozice', 'Tlačítko 1 (vede na volné pozice)', 'uvod'),
    text('heroTlacitkoProc', 'Tlačítko 2 (vede na benefity)', 'uvod'),

    text('pribehyNadpis', 'Nadpis sekce', 'pribehy'),
    defineField({
      name: 'pribehy',
      title: 'Příběhy',
      description: 'Zobrazují se i na stránce O nás a na detailu pozice.',
      type: 'array',
      group: 'pribehy',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'nadpis', title: 'Téma (malý nadpis)', type: 'formatovanyText' }),
          defineField({ name: 'citat', title: 'Citát', type: 'formatovanyText' }),
          defineField({ name: 'jmeno', title: 'Jméno', type: 'formatovanyText' }),
        ],
        preview: { select: { title: 'jmeno.0.children.0.text', subtitle: 'nadpis.0.children.0.text' } },
      }],
    }),

    text('benefityNadpis', 'Nadpis sekce', 'benefity'),
    defineField({
      name: 'benefity',
      title: 'Benefity',
      description: 'Zobrazují se i na detailu pozice.',
      type: 'array',
      group: 'benefity',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'emoji', title: 'Ikona', type: 'string', options: { list: IKONY_KARIERA } }),
          defineField({ name: 'text', title: 'Text', type: 'formatovanyText' }),
        ],
        preview: { select: { title: 'text.0.children.0.text', subtitle: 'emoji' } },
      }],
    }),
    text('benefityTlacitko', 'Text tlačítka pod benefity', 'benefity'),

    text('filozofieNadpis', 'Nadpis sekce', 'filozofie'),
    defineField({
      name: 'filozofie',
      title: 'Karty',
      description: 'Číslo karty (01, 02…) se doplňuje samo podle pořadí.',
      type: 'array',
      group: 'filozofie',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'nadpis', title: 'Nadpis karty', type: 'formatovanyText' }),
          defineField({ name: 'text', title: 'Text karty', type: 'formatovanyText' }),
        ],
        preview: { select: { title: 'nadpis.0.children.0.text' } },
      }],
    }),

    text('kulturaNadpis', 'Nadpis sekce', 'kultura'),
    defineField({
      name: 'kultura',
      title: 'Karty',
      description: 'Zobrazují se i na stránce O nás.',
      type: 'array',
      group: 'kultura',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'emoji', title: 'Ikona', type: 'string', options: { list: IKONY_KARIERA } }),
          defineField({ name: 'nadpis', title: 'Nadpis karty', type: 'formatovanyText' }),
          defineField({ name: 'text', title: 'Text karty', type: 'formatovanyText' }),
        ],
        preview: { select: { title: 'nadpis.0.children.0.text', subtitle: 'emoji' } },
      }],
    }),

    text('poziceNadpis', 'Nadpis sekce na stránce Kariéra', 'pozice'),
    text('poziceDalsiNadpis', 'Nadpis sekce na detailu pozice („Další volné pozice“)', 'pozice'),
    prosty('filtrVse', 'Filtr: všechny pozice', 'pozice'),
    prosty('filtrMsk', 'Filtr: Moravskoslezský kraj', 'pozice'),

    text('formNadpis', 'Nadpis formuláře', 'formular'),
    text('formText', 'Text pod nadpisem', 'formular'),
    prosty('formJmeno', 'Políčko: jméno', 'formular'),
    prosty('formPrijmeni', 'Políčko: příjmení', 'formular'),
    prosty('formEmail', 'Políčko: e-mail', 'formular'),
    prosty('formTelefon', 'Políčko: telefon', 'formular'),
    prosty('formMesto', 'Políčko: město', 'formular'),
    prosty('formZprava', 'Políčko: zkušenost a motivace', 'formular'),
    text('formSouhlas', 'Souhlas (před odkazem)', 'formular'),
    text('formSouhlasOdkaz', 'Souhlas (text odkazu na zásady)', 'formular'),
    text('formTlacitko', 'Text tlačítka', 'formular'),
    prosty('formOdesilam', 'Text tlačítka během odesílání', 'formular'),
    prosty('formChybaSouhlas', 'Chybová hláška: chybí souhlas', 'formular'),

    text('detailNaplnNadpis', 'Nadpis „Náplň práce“', 'detail'),
    text('detailPozadujemeNadpis', 'Nadpis „Požadujeme“', 'detail'),
    text('detailNabizimeNadpis', 'Nadpis „Nabízíme“', 'detail'),

    text('dekujemeNadpis', 'Nadpis', 'dekujeme'),
    text('dekujemeText', 'Text', 'dekujeme'),
    text('dekujemeTlacitko', 'Text tlačítka zpět na kariéru', 'dekujeme'),
    text('dekujemeSlogan', 'Text pod rámečkem', 'dekujeme'),
  ],
  preview: { prepare: () => ({ title: 'Kariéra' }) },
})
