import { defineField, defineType } from 'sanity'
import { KRAJE } from '../../lib/lokality'

// Texty podstránek /lokality/[kraj] a /lokality/[kraj]/[mesto].
// Prázdné pole = na webu zůstane výchozí text (lib/lokality.ts).
// Stránky samotné (adresy, mapa) jsou v kódu — nový dokument novou stránku nezaloží.

const ADRESY_KRAJE = KRAJE.map(k => `/lokality/${k.slug}`)
const ADRESY_MESTA = KRAJE.flatMap(k => k.mesta.map(m => `/lokality/${k.slug}/${m.slug}`))

const adresa = (povolene: string[]) =>
  defineField({
    name: 'adresa',
    title: 'Stránka na webu',
    description: 'Nejde změnit. Novou stránku kraje nebo města musí založit vývojář.',
    type: 'string',
    group: 'uvod',
    readOnly: true,
    validation: r => r.custom(v => (v && povolene.includes(v) ? true : 'Novou stránku musí založit vývojář, tady jde upravovat jen existující.')),
  })

const text = (name: string, title: string, group: string, description?: string) =>
  defineField({ name, title, type: 'formatovanyText', group, description })

const odstavce = (name: string, title: string, group: string) =>
  defineField({ name, title, type: 'formatovaneOdstavce', group, description: 'Enter = nový odstavec. Text tlačítka pod textem se upravuje v Obecném nastavení.' })

const nazvy = (co: string) => [
  defineField({ name: 'nazev', title: `Název ${co}`, description: 'V drobečkové navigaci a v odkazech na tuto stránku.', type: 'string', group: 'uvod' }),
  defineField({ name: 'cedule', title: 'Text na ceduli', description: 'Cedule na stránce i na obrázku pro sdílení na sítích.', type: 'string', group: 'uvod' }),
]

const seo = [
  defineField({ name: 'seoTitle', title: 'Titulek pro Google a záložku prohlížeče', description: '„| pokládámeee.cz“ se doplní samo.', type: 'string', group: 'seo' }),
  defineField({ name: 'seoDescription', title: 'Popisek pro Google a sdílení', type: 'text', rows: 3, group: 'seo' }),
]

const razeni = [{ title: 'Podle názvu', name: 'nazev', by: [{ field: 'nazev', direction: 'asc' as const }] }]

export const lokalitaKrajSchema = defineType({
  name: 'lokalitaKraj',
  title: 'Lokality — kraje',
  type: 'document',
  groups: [
    { name: 'uvod', title: 'Úvod', default: true },
    { name: 'mesta', title: 'Města' },
    { name: 'seo', title: 'Google a sdílení' },
  ],
  fields: [
    adresa(ADRESY_KRAJE),
    ...nazvy('kraje'),
    text('nadpis', 'Nadpis stránky', 'uvod', 'Nový řádek: Shift + Enter.'),
    odstavce('perex', 'Úvodní text', 'uvod'),
    text('mestaText', 'Text pod seznamem měst', 'mesta', 'Názvy měst v seznamu se upravují v dokumentech měst.'),
    ...seo,
  ],
  orderings: razeni,
  preview: { select: { title: 'nazev', subtitle: 'adresa' } },
})

export const lokalitaMestoSchema = defineType({
  name: 'lokalitaMesto',
  title: 'Lokality — města',
  type: 'document',
  groups: [
    { name: 'uvod', title: 'Úvod', default: true },
    { name: 'okoli', title: 'Město a okolí' },
    { name: 'mesta', title: 'Další města' },
    { name: 'seo', title: 'Google a sdílení' },
  ],
  fields: [
    adresa(ADRESY_MESTA),
    ...nazvy('města'),
    text('nadpis', 'Nadpis stránky', 'uvod', 'Nový řádek: Shift + Enter.'),
    odstavce('perex', 'Úvodní text', 'uvod'),
    text('okoliNadpis', 'Město a okolí — nadpis', 'okoli'),
    odstavce('okoliText', 'Město a okolí — text', 'okoli'),
    text('mestaNadpis', 'Další města — nadpis', 'mesta'),
    text('mestaText', 'Text pod seznamem měst', 'mesta', 'Názvy měst v seznamu se upravují v dokumentech měst.'),
    text('mestaOdkaz', 'Odkaz na stránku kraje („Všechna místa →“)', 'mesta'),
    ...seo,
  ],
  orderings: razeni,
  preview: { select: { title: 'nazev', subtitle: 'adresa' } },
})
