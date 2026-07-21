import { defineType, defineField } from 'sanity'

export const blogPostSchema = defineType({
  name: 'blogPost',
  title: 'Blog — článek',
  type: 'document',
  groups: [
    { name: 'obsah', title: 'Obsah' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Nadpis', type: 'string', group: 'obsah', validation: r => r.required() }),
    defineField({
      name: 'slug',
      title: 'URL adresa (slug)',
      type: 'slug',
      group: 'obsah',
      options: { source: 'title', maxLength: 96 },
      validation: r => r.required(),
    }),
    defineField({
      name: 'kategorie',
      title: 'Kategorie',
      type: 'string',
      group: 'obsah',
      options: {
        list: [
          { title: 'Tipy', value: 'Tipy' },
          { title: 'Návody', value: 'Návody' },
          { title: 'Zajímavosti', value: 'Zajímavosti' },
          { title: 'Novinky', value: 'Novinky' },
        ],
      },
    }),
    defineField({ name: 'perex', title: 'Perex (krátký úryvek na kartě)', type: 'text', rows: 3, group: 'obsah', validation: r => r.required().max(220) }),
    defineField({ name: 'hlavniObrazek', title: 'Hlavní obrázek', type: 'image', options: { hotspot: true }, group: 'obsah', validation: r => r.required() }),
    defineField({ name: 'datumVydani', title: 'Datum vydání', type: 'datetime', group: 'obsah', validation: r => r.required() }),
    defineField({
      name: 'pouzitHtmlKod',
      title: 'Vložit obsah jako HTML kód místo psaní v editoru',
      description: 'Vypnuto = píšete přes normální textový editor níže. Zapnuto = místo editoru se zobrazí pole na vložení vlastního HTML kódu.',
      type: 'boolean',
      initialValue: false,
      group: 'obsah',
    }),
    defineField({
      name: 'obsah',
      title: 'Obsah článku',
      type: 'array',
      group: 'obsah',
      hidden: ({ parent }) => !!parent?.pouzitHtmlKod,
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normální', value: 'normal' },
            { title: 'Nadpis H2', value: 'h2' },
            { title: 'Nadpis H3', value: 'h3' },
          ],
          lists: [
            { title: 'Odrážky', value: 'bullet' },
            { title: 'Číslovaný seznam', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Tučně', value: 'strong' },
              { title: 'Kurzíva', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Odkaz',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'obsahHtml',
      title: 'Obsah článku (HTML kód)',
      description: 'Vložte přímo HTML kód textu článku (odstavce <p>, nadpisy <h2>/<h3>, odkazy, obrázky...). Vykreslí se přesně tak, jak je napsané.',
      type: 'text',
      rows: 20,
      group: 'obsah',
      hidden: ({ parent }) => !parent?.pouzitHtmlKod,
    }),
    defineField({ name: 'seoTitle', title: 'SEO titulek (volitelné, jinak se použije nadpis)', type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO popisek (volitelné, jinak se použije perex)', type: 'text', rows: 2, group: 'seo' }),
  ],
  orderings: [
    {
      title: 'Datum vydání, od nejnovějšího',
      name: 'datumVydaniDesc',
      by: [{ field: 'datumVydani', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'kategorie', media: 'hlavniObrazek' },
  },
})
