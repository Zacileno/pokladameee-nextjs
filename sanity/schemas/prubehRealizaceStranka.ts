import { defineType, defineField, defineArrayMember } from 'sanity'
import { odkazAnotace, velikostAnotace } from './objects/formatovanyText'
import { nahled, puvodni } from './objects/pomocne'

// Texty stránky /prubeh-realizace — prázdné pole = na webu zůstane výchozí text
// (lib/prubeh-realizace.ts).

// odstavce s tučným písmem, kurzívou, barvou, velikostí, odkazem a odrážkami
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
            velikostAnotace,
            odkazAnotace,
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
      name: 'uvodFoto',
      title: 'Fotka v úvodu',
      description: 'Postava na průhledném pozadí (PNG), ideálně na výšku a aspoň 900 px vysoká. Prázdné = výchozí fotka Adama.',
      type: 'image',
      group: 'uvod',
      fields: [defineField({ name: 'alt', title: 'Popis pro nevidomé a Google', type: 'string' })],
    }),
    defineField({
      name: 'fakta',
      title: 'Tři hlavní informace pod úvodem',
      type: 'array',
      group: 'uvod',
      of: [{
        type: 'object',
        name: 'fakt',
        fields: [
          defineField({ name: 'nadpisFormat', title: 'Nadpis', type: 'formatovanyText' }),
          defineField({ name: 'textFormat', title: 'Text', type: 'formatovanyText' }),
          puvodni('nadpis'),
          puvodni('text', 'text'),
        ],
        preview: {
          select: { nadpis: 'nadpisFormat', stary: 'nadpis', text: 'textFormat' },
          prepare: ({ nadpis, stary, text }) => ({ title: nahled(nadpis) || stary, subtitle: nahled(text) }),
        },
      }],
    }),
    defineField({ name: 'odkazKroky', title: 'Odkaz pod úvodem („Jak to probíhá ↓“)', type: 'formatovanyText', group: 'uvod' }),
    defineField({ name: 'prehledNadpisFormat', title: 'Přehled kroků: nadpis', type: 'formatovanyText', group: 'uvod' }),
    defineField({ name: 'prehledTextFormat', title: 'Přehled kroků: text', type: 'formatovanyText', group: 'uvod' }),
    defineField({ name: 'dobreVedetNadpisFormat', title: 'Nadpis karet „Dobré vědět“', type: 'formatovanyText', group: 'kapitoly' }),
    defineField({ name: 'pokladkaNadpisFormat', title: 'Profesionální pokládka: nadpis sekce', type: 'formatovanyText', group: 'kapitoly' }),
    defineField({ name: 'pokladkaTextFormat', title: 'Profesionální pokládka: text pod nadpisem', type: 'formatovanyText', group: 'kapitoly' }),
    puvodni('prehledNadpis'),
    puvodni('prehledText', 'text'),
    puvodni('dobreVedetNadpis'),
    puvodni('pokladkaNadpis'),
    puvodni('pokladkaText', 'text'),
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
          defineField({ name: 'nadpisFormat', title: 'Nadpis kapitoly', type: 'formatovanyText' }),
          puvodni('nadpis'),
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
                defineField({ name: 'nadpisFormat', title: 'Nadpis', type: 'formatovanyText' }),
                puvodni('nadpis'),
                odstavce('obsah', 'Text'),
              ],
              preview: {
                select: { cislo: 'cislo', nadpis: 'nadpisFormat', stary: 'nadpis' },
                prepare: ({ cislo, nadpis, stary }) => {
                  const text = nahled(nadpis) || stary
                  return { title: cislo ? `${cislo}. ${text ?? ''}` : text }
                },
              },
            }],
          }),
        ],
        preview: {
          select: { nadpis: 'nadpisFormat', stary: 'nadpis' },
          prepare: ({ nadpis, stary }) => ({ title: nahled(nadpis) || stary }),
        },
      }],
    }),
    defineField({ name: 'ctaNadpisFormat', title: 'Nadpis výzvy', type: 'formatovanyText', group: 'zaver' }),
    defineField({ name: 'ctaTextFormat', title: 'Text výzvy', type: 'formatovanyText', group: 'zaver' }),
    defineField({ name: 'ctaTlacitkoFormat', title: 'Text tlačítka', type: 'formatovanyText', group: 'zaver' }),
    puvodni('ctaNadpis'),
    puvodni('ctaText', 'text'),
    puvodni('ctaTlacitko'),
    defineField({
      name: 'ctaFoto',
      title: 'Fotka u výzvy',
      description: 'Postava na průhledném pozadí (PNG), ideálně na výšku a aspoň 900 px vysoká. Prázdné = výzva bez fotky.',
      type: 'image',
      group: 'zaver',
      fields: [defineField({ name: 'alt', title: 'Popis pro nevidomé a Google', type: 'string' })],
    }),
  ],
  preview: { prepare: () => ({ title: 'Průběh realizace' }) },
})
