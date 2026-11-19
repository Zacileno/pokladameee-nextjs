import { defineType, defineField } from 'sanity'

// Sekce s mapou „Kam jezdímeee?“ — jedna společná pro všechny stránky, kde mapa je
// (úvodní stránka, /lokality, Podlahy na míru, stránky podlah).
// Názvy polí jsou převzaté z jiných dokumentů schválně: Sanity počítá limit atributů
// podle názvu pole, takže stejný název limit nezvyšuje.
export const mapaSekceSchema = defineType({
  name: 'mapaSekce',
  title: 'Sekce Kam jezdímeee (mapa)',
  type: 'document',
  fields: [
    defineField({
      name: 'nadpisText',
      title: 'Nadpis',
      description: 'Na stránce /lokality je to hlavní nadpis stránky (H1). Nový řádek: Shift + Enter.',
      type: 'formatovanyText',
    }),
    defineField({
      name: 'podnadpisText',
      title: 'Řádek pod nadpisem',
      description: 'Na webu se zobrazí velkými písmeny.',
      type: 'formatovanyText',
    }),
    defineField({
      name: 'heroText',
      title: 'Text',
      description: 'Odkaz na formulář: označ text a klikni na Odkaz, adresa #kontakt.',
      type: 'formatovanyText',
    }),
  ],
  preview: { prepare: () => ({ title: 'Sekce Kam jezdímeee (mapa)' }) },
})
