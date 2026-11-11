import { defineType, defineField } from 'sanity'
import { IKONY } from './sluzbyStranka'

// Texty stránky /inspirace — prázdné pole = na webu zůstane výchozí text.
// „eee“ v nadpisech si obarvi oranžově přes „Barva textu“.
const text = (name: string, title: string, group: string) =>
  defineField({ name, title, type: 'formatovanyText', group })

export const inspiraceStrankaSchema = defineType({
  name: 'inspiraceStranka',
  title: 'Inspirace — stránka',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Úvod', default: true },
    { name: 'realizace', title: 'Naše realizace' },
    { name: 'galerie', title: 'Fotogalerie' },
    { name: 'proc', title: 'Proč Pokládámeee' },
  ],
  fields: [
    defineField({
      name: 'heroFotka',
      title: 'Hero fotka (vpravo v úvodní sekci)',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),
    text('heroNadpis', 'Nadpis stránky (např. „Inspiraceee“)', 'hero'),
    text('heroText', 'Úvodní text', 'hero'),
    text('heroTlacitko', 'Text tlačítka (vede na realizace)', 'hero'),
    defineField({
      name: 'ikonky',
      title: 'Ikonky pod úvodem',
      type: 'array',
      group: 'hero',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'emoji', title: 'Ikona', type: 'string', options: { list: IKONY } }),
          defineField({ name: 'text', title: 'Text', type: 'formatovanyText' }),
        ],
        preview: { select: { subtitle: 'emoji' }, prepare: ({ subtitle }) => ({ title: 'Ikonka', subtitle }) },
      }],
      validation: r => r.max(6),
    }),

    text('realizaceNadpis', 'Nadpis sekce realizací', 'realizace'),
    text('realizacePodnadpis', 'Text pod nadpisem', 'realizace'),
    text('videoNadpis', 'Nadpis nad videem', 'realizace'),

    text('galerieNadpis', 'Nadpis fotogalerie', 'galerie'),
    text('galeriePodnadpis', 'Text pod nadpisem fotogalerie', 'galerie'),

    text('procNadpis', 'Nadpis sekce', 'proc'),
    defineField({
      name: 'procKarty',
      title: 'Karty',
      type: 'array',
      group: 'proc',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'emoji', title: 'Ikona', type: 'string', options: { list: IKONY } }),
          defineField({ name: 'nadpis', title: 'Nadpis karty', type: 'formatovanyText' }),
          defineField({ name: 'text', title: 'Text karty', type: 'formatovanyText' }),
        ],
        preview: { select: { subtitle: 'emoji' }, prepare: ({ subtitle }) => ({ title: 'Karta', subtitle }) },
      }],
      validation: r => r.max(6),
    }),
    text('procTlacitko', 'Text tlačítka pod kartami', 'proc'),
    text('recenzeNadpis', 'Nadpis recenzí („Co o nás říkají zákazníci“)', 'proc'),
  ],
  preview: { prepare: () => ({ title: 'Inspirace — stránka' }) },
})
