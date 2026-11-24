import { defineType } from 'sanity'
import { podlahaPole, podlahaSkupiny } from './objects/podlahaPole'

export const vinylovaPodlahaSchema = defineType({
  name: 'vinylovaPodlaha',
  title: 'Podstránka: Vinylová podlaha',
  type: 'document',
  groups: podlahaSkupiny,
  fields: podlahaPole,
  preview: { prepare: () => ({ title: 'Podstránka: Vinylová podlaha' }) },
})
