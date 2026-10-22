import { defineType, defineField } from 'sanity'

export const blackFridaySchema = defineType({
  name: 'blackFriday',
  title: 'Podstránka: Black Friday',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'video', title: 'Banner + text' },
    { name: 'produkty', title: 'Produkty v akci' },
    { name: 'zdarma', title: 'Služby zdarma' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'heroBadge', title: 'Hero — badge (nad nadpisem)', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSleva', title: 'Hero — výše slevy (zvýrazněná oranžově, např. "25 %")', type: 'string', group: 'hero' }),
    defineField({ name: 'heroNadpisZbytek', title: 'Hero — zbytek nadpisu (za slevou)', type: 'string', group: 'hero' }),
    defineField({ name: 'heroPodnadpis', title: 'Hero — podnadpis', type: 'text', rows: 2, group: 'hero' }),
    defineField({ name: 'heroTlacitko', title: 'Hero — text tlačítka (scroll na produkty)', type: 'string', group: 'hero' }),
    defineField({ name: 'heroFotka', title: 'Hero — fotka pozadí (volitelné, jinak hlavní hero fotka webu)', type: 'image', options: { hotspot: true }, group: 'hero' }),

    defineField({ name: 'bannerObrazek', title: 'Banner — obrázek (místo videa)', type: 'image', options: { hotspot: true }, group: 'video' }),
    defineField({ name: 'videoNadpis', title: 'Text vedle banneru — nadpis', type: 'string', group: 'video' }),
    defineField({
      name: 'body',
      title: 'Odrážky s fajfkou (max. 3)',
      type: 'array',
      group: 'video',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'titul', title: 'Tučný začátek věty', type: 'string' }),
          defineField({ name: 'text', title: 'Zbytek věty', type: 'string' }),
        ],
        preview: { select: { title: 'titul', subtitle: 'text' } },
      }],
      validation: r => r.max(3),
    }),
    defineField({ name: 'odstavec', title: 'Odstavec pod odrážkami', type: 'text', rows: 2, group: 'video' }),
    defineField({ name: 'zvyrazenyText', title: 'Zvýrazněný řádek (BLACK FRIDAY = …)', type: 'text', rows: 2, group: 'video' }),
    defineField({ name: 'ctaPopupText', title: 'Text tlačítka "Využít akci"', type: 'string', group: 'video' }),
    defineField({ name: 'adamText', title: 'Text vedle Adamovy fotky', type: 'string', group: 'video' }),

    defineField({ name: 'produktyNadpis', title: 'Nadpis sekce s produkty', type: 'string', group: 'produkty' }),
    defineField({ name: 'slevaBadge', title: 'Text badge na kartách produktů (např. "-25 %")', type: 'string', group: 'produkty' }),

    defineField({ name: 'zdarmaNadpis', title: 'Nadpis sekce "služby zdarma"', type: 'string', group: 'zdarma' }),
    defineField({ name: 'zdarmaPopisek', title: 'Popisek pod nadpisem', type: 'string', group: 'zdarma' }),
    defineField({
      name: 'zdarmaPolozky',
      title: 'Karty služeb zdarma (max. 4)',
      type: 'array',
      group: 'zdarma',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'emoji', title: 'Emoji', type: 'string' }),
          defineField({ name: 'title', title: 'Název', type: 'string' }),
        ],
        preview: { select: { title: 'title', subtitle: 'emoji' } },
      }],
      validation: r => r.max(4),
    }),

    defineField({ name: 'seoTitle', title: 'SEO — title', type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO — description', type: 'text', rows: 2, group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Podstránka: Black Friday' }) },
})
