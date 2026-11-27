import { defineType, defineField } from 'sanity'

// Sekce videí na úvodní stránce (pod „Jak to funguje“)
export const uvodVideaSchema = defineType({
  name: 'uvodVidea',
  title: 'Úvodní stránka: videa',
  type: 'document',
  fields: [defineField({ name: 'videaSekce', title: 'Sekce videí', type: 'videaSekce' })],
  preview: { prepare: () => ({ title: 'Úvodní stránka: videa' }) },
})
