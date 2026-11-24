import { defineType } from 'sanity'
import { podlahaPole, podlahaSkupiny } from './objects/podlahaPole'

export const drevenaPodlahaSchema = defineType({
  name: 'drevenaPodlaha',
  title: 'Podstránka: Dřevěná podlaha',
  type: 'document',
  groups: podlahaSkupiny,
  fields: podlahaPole,
  preview: { prepare: () => ({ title: 'Podstránka: Dřevěná podlaha' }) },
})
