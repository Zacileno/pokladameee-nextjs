import { defineType, defineField } from 'sanity'

export const blackFridaySchema = defineType({
  name: 'blackFriday',
  title: 'Podstránka: Black Friday',
  type: 'document',
  groups: [
    { name: 'topBar', title: 'Horní lišta' },
    { name: 'hero', title: 'Hero' },
    { name: 'video', title: 'Banner + text' },
    { name: 'produkty', title: 'Produkty v akci' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'topBarOznaceni', title: 'Horní lišta — štítek (např. "🔥 BLACK FRIDAY")', type: 'formatovanyText', group: 'topBar' }),
    defineField({ name: 'topBarSleva', title: 'Horní lišta — sleva (zvýrazněná oranžově, např. "25 %")', type: 'formatovanyText', group: 'topBar' }),
    defineField({ name: 'topBarZbytek', title: 'Horní lišta — zbytek textu (za slevou)', type: 'formatovanyText', group: 'topBar' }),
    defineField({ name: 'topBarDovetek', title: 'Horní lišta — dovětek (skrytý na mobilu)', type: 'formatovanyText', group: 'topBar' }),
    defineField({ name: 'topBarCta', title: 'Horní lišta — text odkazu (např. "DETAIL AKCE")', type: 'formatovanyText', group: 'topBar' }),

    defineField({ name: 'heroBadge', title: 'Hero — badge (nad nadpisem)', type: 'formatovanyText', group: 'hero' }),
    defineField({ name: 'heroSleva', title: 'Hero — výše slevy (zvýrazněná oranžově, např. "25 %")', type: 'formatovanyText', group: 'hero' }),
    defineField({ name: 'heroNadpisZbytek', title: 'Hero — zbytek nadpisu (za slevou)', type: 'formatovanyText', group: 'hero' }),
    defineField({ name: 'heroPodnadpis', title: 'Hero — podnadpis', type: 'formatovanyText', group: 'hero' }),
    defineField({ name: 'heroTlacitko', title: 'Hero — text hlavního tlačítka (scroll na produkty)', type: 'formatovanyText', group: 'hero' }),
    defineField({ name: 'heroTlacitkoSekundarni', title: 'Hero — text vedlejšího tlačítka (scroll na formulář)', type: 'formatovanyText', group: 'hero' }),
    defineField({ name: 'heroFotka', title: 'Hero — fotka pozadí (volitelné, jinak hlavní hero fotka webu)', type: 'image', options: { hotspot: true }, group: 'hero' }),

    defineField({ name: 'bannerObrazek', title: 'Banner — obrázek (místo videa)', type: 'image', options: { hotspot: true }, group: 'video' }),
    defineField({ name: 'videoNadpis', title: 'Text vedle banneru — nadpis', type: 'formatovanyText', group: 'video' }),
    defineField({
      name: 'body',
      title: 'Odrážky s fajfkou (max. 3)',
      type: 'array',
      group: 'video',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'titul', title: 'Tučný začátek věty', type: 'formatovanyText' }),
          defineField({ name: 'text', title: 'Zbytek věty', type: 'formatovanyText' }),
        ],
        preview: { select: { title: 'titul.0.children.0.text', subtitle: 'text.0.children.0.text' } },
      }],
      validation: r => r.max(3),
    }),
    defineField({ name: 'odstavec', title: 'Odstavec pod odrážkami', type: 'formatovanyText', group: 'video' }),
    defineField({ name: 'zvyrazenyText', title: 'Zvýrazněný řádek (BLACK FRIDAY = …)', type: 'formatovanyText', group: 'video' }),
    defineField({ name: 'ctaPopupText', title: 'Text tlačítka "Využít akci"', type: 'formatovanyText', group: 'video' }),
    defineField({ name: 'adamText', title: 'Text vedle Adamovy fotky', type: 'formatovanyText', group: 'video' }),

    defineField({ name: 'produktyNadpis', title: 'Nadpis sekce s produkty', type: 'formatovanyText', group: 'produkty' }),
    defineField({ name: 'slevaBadge', title: 'Text badge na kartách produktů (např. "-25 %")', type: 'formatovanyText', group: 'produkty' }),
    defineField({ name: 'zdarmaPopisek', title: 'Informační řádek pod produkty (působnost)', type: 'formatovanyText', group: 'produkty' }),

    defineField({ name: 'seoTitle', title: 'SEO — title', type: 'string', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO — description', type: 'text', rows: 2, group: 'seo' }),
  ],
  preview: { prepare: () => ({ title: 'Podstránka: Black Friday' }) },
})
