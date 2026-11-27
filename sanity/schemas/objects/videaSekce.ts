import { defineField, defineType } from 'sanity'

// Sekce krátkých videí na výšku (YouTube Shorts). Na webu ji vykresluje app/components/VideaSekce.tsx.
// Stejný název pole `videaSekce` ve všech dokumentech (šetří limit atributů Sanity).
export const kratkeVideoSchema = defineType({
  name: 'kratkeVideo',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'odkaz',
      title: 'Odkaz na YouTube',
      description: 'Zkopíruj odkaz na video, např. https://youtube.com/shorts/…',
      type: 'url',
      validation: r =>
        r.required().custom(v =>
          !v || /(youtu\.be\/|v=|shorts\/|embed\/)[\w-]{11}/.test(String(v)) ? true : 'Tohle nevypadá jako odkaz na video z YouTube',
        ),
    }),
    defineField({ name: 'nazev', title: 'Název pod videem', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'nahled',
      title: 'Náhled',
      description: 'Když mají dvě videa vedle sebe stejný úvodní obrázek, vyber u jednoho záběr z průběhu videa.',
      type: 'string',
      options: {
        list: [
          { title: 'Úvodní obrázek z YouTube', value: 'uvod' },
          { title: 'Záběr ze začátku videa (asi 1/4)', value: 'sd1' },
          { title: 'Záběr z poloviny videa', value: 'sd2' },
          { title: 'Záběr z konce videa (asi 3/4)', value: 'sd3' },
        ],
        layout: 'radio',
      },
      initialValue: 'uvod',
    }),
    defineField({
      name: 'vlastniNahled',
      title: 'Vlastní náhled (nepovinné)',
      description: 'Obrázek na výšku. Když ho nahraješ, použije se místo náhledu z YouTube.',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'nazev', subtitle: 'odkaz', media: 'vlastniNahled' },
  },
})

export const videaSekceSchema = defineType({
  name: 'videaSekce',
  title: 'Sekce videí',
  type: 'object',
  fields: [
    defineField({ name: 'skryt', title: 'Skrýt sekci videí na webu', type: 'boolean', initialValue: false }),
    defineField({ name: 'nadpis', title: 'Nadpis', type: 'formatovanyText' }),
    defineField({ name: 'podnadpis', title: 'Text pod nadpisem', type: 'formatovanyText' }),
    defineField({
      name: 'videa',
      title: 'Videa',
      description: 'Pořadí změníš přetažením. Podobně vypadající videa dávej na přeskáčku.',
      type: 'array',
      of: [{ type: 'kratkeVideo' }],
    }),
  ],
})

// pole do dokumentu stránky (záložka „Videa“)
export const videaSekcePole = defineField({ name: 'videaSekce', title: 'Sekce videí', type: 'videaSekce', group: 'videa' })
export const videaSkupina = { name: 'videa', title: 'Videa' }
