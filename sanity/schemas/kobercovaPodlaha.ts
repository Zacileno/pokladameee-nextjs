import { defineField, defineType } from 'sanity'
import { podlahaPole, podlahaSkupiny } from './objects/podlahaPole'

export const kobercovaPodlahaSchema = defineType({
  name: 'kobercovaPodlaha',
  title: 'Podstránka: Kobercová podlaha',
  type: 'document',
  groups: podlahaSkupiny,
  fields: [
    ...podlahaPole,
    defineField({ name: 'videoNadpis', title: 'Video z realizace — nadpis', type: 'formatovanyText', group: 'galerie' }),
  ],
  preview: { prepare: () => ({ title: 'Podstránka: Kobercová podlaha' }) },
})
