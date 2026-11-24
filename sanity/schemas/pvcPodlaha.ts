import { defineType } from 'sanity'
import { podlahaPole, podlahaSkupiny } from './objects/podlahaPole'

export const pvcPodlahaSchema = defineType({
  name: 'pvcPodlaha',
  title: 'Podstránka: PVC podlaha',
  type: 'document',
  groups: podlahaSkupiny,
  fields: podlahaPole,
  preview: { prepare: () => ({ title: 'Podstránka: PVC podlaha' }) },
})
