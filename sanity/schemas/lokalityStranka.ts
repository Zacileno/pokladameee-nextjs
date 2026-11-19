import { defineType, defineField } from 'sanity'

// Texty stránky /lokality, které nejsou ve sdílených sekcích (mapa, Jak to funguje,
// typy podlah, kontakt mají vlastní dokumenty).
// Názvy polí jsou převzaté z jiných dokumentů schválně kvůli limitu atributů Sanity.
export const lokalityStrankaSchema = defineType({
  name: 'lokalityStranka',
  title: 'Lokality — stránka',
  type: 'document',
  fields: [
    defineField({
      name: 'nadpis',
      title: 'Nadpis sekce Co pokládámeee',
      description: 'Dlaždice typů podlah pod nadpisem se upravují v dokumentu „Co pokládámeee“.',
      type: 'formatovanyText',
    }),
    defineField({
      name: 'realizaceNadpis',
      title: 'Nadpis sekce Hodnocení',
      description: 'Nový řádek: Shift + Enter.',
      type: 'formatovanyText',
    }),
  ],
  preview: { prepare: () => ({ title: 'Lokality — stránka' }) },
})
