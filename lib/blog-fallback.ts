export type BlogFallbackPost = {
  slug: string
  title: string
  kategorie: string
  perex: string
  datumVydani: string
  obrazekUrl?: string
  odstavce: string[]
}

export const BLOG_FALLBACK_POSTS: BlogFallbackPost[] = [
  {
    slug: 'jak-vybrat-spravnou-podlahu-do-bytu',
    title: 'Jak vybrat správnou podlahu do bytu',
    kategorie: 'Návody',
    perex: 'Vinyl, PVC, koberec, nebo dřevo? Projdeme si, podle čeho se rozhodnout, aby vám podlaha vydržela roky bez starostí.',
    datumVydani: '2026-06-02T08:00:00.000Z',
    odstavce: [
      'Výběr podlahy není jen o tom, co se vám líbí na fotce — rozhoduje hlavně to, kam podlaha přijde a jak moc bude zatížená.',
      'V obývacím pokoji nebo ložnici oceníte teplo a měkkost — tam se hodí koberec nebo dřevo. Do koupelny, kuchyně nebo předsíně naopak potřebujete materiál, který snese vlhkost a časté mytí — ideálně lepený vinyl nebo PVC.',
      'Pokud máte podlahové topení, počítejte s tím, že ne každý materiál je s ním kompatibilní — masivní dřevo obvykle ne, lepený vinyl a PVC ano.',
      'Nevíte si rady? Přijedeme k vám na zaměření zdarma a poradíme přímo na místě, co bude nejlepší volba pro váš konkrétní prostor.',
    ],
  },
  {
    slug: '5-nejcastejsich-chyb-pri-pokladce-vinylu',
    title: '5 nejčastějších chyb při pokládce vinylu',
    kategorie: 'Tipy',
    perex: 'Špatně připravený podklad dokáže zničit i tu nejkvalitnější podlahu. Přehled chyb, které vidíme nejčastěji — a jak se jim vyhnout.',
    datumVydani: '2026-05-14T08:00:00.000Z',
    odstavce: [
      'Nejčastější chybou je podcenění přípravy podkladu. Vinyl je tenký materiál a jakákoli nerovnost nebo prach pod ním se dřív nebo později projeví na povrchu.',
      'Druhá chyba je pokládka bez aklimatizace materiálu — vinyl potřebuje čas přizpůsobit se teplotě a vlhkosti místnosti, jinak může časem měnit tvar.',
      'Třetí problém je špatně zvolené lepidlo nebo jeho nesprávné dávkování. Málo lepidla znamená, že se podlaha bude vlnit, moc lepidla zase prosakuje spárami.',
      'Poslední dvě časté chyby: chybějící dilatační spáry u velkých ploch a podcenění vlhkosti podkladu před pokládkou.',
    ],
  },
  {
    slug: 'proc-zvolit-lepenou-podlahu-misto-plovouci',
    title: 'Proč zvolit lepenou podlahu místo plovoucí',
    kategorie: 'Zajímavosti',
    perex: 'Plovoucí podlaha se zdá jako rychlejší a jednodušší volba. Kdy se ale vyplatí připlatit si za lepenou variantu?',
    datumVydani: '2026-04-22T08:00:00.000Z',
    odstavce: [
      'Lepená podlaha je pevně spojená s podkladem, takže nedochází k žádnému pohybu ani vrzání — na rozdíl od plovoucí varianty.',
      'Díky lepení je i zvukový komfort výrazně lepší — kroky jsou tišší a přenos hluku do nižších pater je nižší.',
      'Lepená podlaha je také jediná spolehlivá volba, pokud máte podlahové topení — teplo se přenáší rovnoměrněji a bez rizika deformace materiálu.',
      'Nevýhodou je pracnější a dražší instalace a to, že se hůř demontuje. Pokud ale plánujete v bytě zůstat dlouhodobě, lepená podlaha se vyplatí.',
    ],
  },
]
