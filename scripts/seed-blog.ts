import { client } from '@/sanity/lib/client'
import { randomUUID } from 'crypto'

function block(text: string, style: 'normal' | 'h2' = 'normal') {
  return {
    _type: 'block',
    _key: randomUUID(),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: randomUUID(), text, marks: [] }],
  }
}

const BLOG_POSTS = [
  {
    _type: 'blogPost',
    _id: 'blogPost-jak-vybrat-spravnou-podlahu-do-bytu',
    title: 'Jak vybrat správnou podlahu do bytu',
    slug: { _type: 'slug', current: 'jak-vybrat-spravnou-podlahu-do-bytu' },
    kategorie: 'Návody',
    perex: 'Vinyl, PVC, koberec, nebo dřevo? Projdeme si, podle čeho se rozhodnout, aby vám podlaha vydržela roky bez starostí.',
    datumVydani: '2026-06-02T08:00:00.000Z',
    obsah: [
      block('Výběr podlahy není jen o tom, co se vám líbí na fotce — rozhoduje hlavně to, kam podlaha přijde a jak moc bude zatížená.'),
      block('Podle místnosti', 'h2'),
      block('V obývacím pokoji nebo ložnici oceníte teplo a měkkost — tam se hodí koberec nebo dřevo. Do koupelny, kuchyně nebo předsíně naopak potřebujete materiál, který snese vlhkost a časté mytí — ideálně lepený vinyl nebo PVC.'),
      block('Podlahové topení', 'h2'),
      block('Pokud máte podlahové topení, počítejte s tím, že ne každý materiál je s ním kompatibilní — masivní dřevo obvykle ne, lepený vinyl a PVC ano.'),
      block('Nevíte si rady? Přijedeme k vám na zaměření zdarma a poradíme přímo na místě, co bude nejlepší volba pro váš konkrétní prostor.'),
    ],
  },
  {
    _type: 'blogPost',
    _id: 'blogPost-5-nejcastejsich-chyb-pri-pokladce-vinylu',
    title: '5 nejčastějších chyb při pokládce vinylu',
    slug: { _type: 'slug', current: '5-nejcastejsich-chyb-pri-pokladce-vinylu' },
    kategorie: 'Tipy',
    perex: 'Špatně připravený podklad dokáže zničit i tu nejkvalitnější podlahu. Přehled chyb, které vidíme nejčastěji — a jak se jim vyhnout.',
    datumVydani: '2026-05-14T08:00:00.000Z',
    obsah: [
      block('Nejčastější chybou je podcenění přípravy podkladu. Vinyl je tenký materiál a jakákoli nerovnost nebo prach pod ním se dřív nebo později projeví na povrchu.'),
      block('Chybějící aklimatizace materiálu', 'h2'),
      block('Vinyl potřebuje čas přizpůsobit se teplotě a vlhkosti místnosti, jinak může časem měnit tvar.'),
      block('Špatné lepidlo', 'h2'),
      block('Málo lepidla znamená, že se podlaha bude vlnit, moc lepidla zase prosakuje spárami.'),
      block('Poslední dvě časté chyby: chybějící dilatační spáry u velkých ploch a podcenění vlhkosti podkladu před pokládkou.'),
    ],
  },
  {
    _type: 'blogPost',
    _id: 'blogPost-proc-zvolit-lepenou-podlahu-misto-plovouci',
    title: 'Proč zvolit lepenou podlahu místo plovoucí',
    slug: { _type: 'slug', current: 'proc-zvolit-lepenou-podlahu-misto-plovouci' },
    kategorie: 'Zajímavosti',
    perex: 'Plovoucí podlaha se zdá jako rychlejší a jednodušší volba. Kdy se ale vyplatí připlatit si za lepenou variantu?',
    datumVydani: '2026-04-22T08:00:00.000Z',
    obsah: [
      block('Lepená podlaha je pevně spojená s podkladem, takže nedochází k žádnému pohybu ani vrzání — na rozdíl od plovoucí varianty.'),
      block('Zvukový komfort a topení', 'h2'),
      block('Díky lepení je i zvukový komfort výrazně lepší — kroky jsou tišší a přenos hluku do nižších pater je nižší. Lepená podlaha je také jediná spolehlivá volba, pokud máte podlahové topení.'),
      block('Nevýhodou je pracnější a dražší instalace a to, že se hůř demontuje. Pokud ale plánujete v bytě zůstat dlouhodobě, lepená podlaha se vyplatí.'),
    ],
  },
]

async function seedBlog() {
  for (const post of BLOG_POSTS) {
    try {
      const result = await client.createOrReplace(post)
      console.log('✅ Blog článek seed hotovo:', result._id)
    } catch (err) {
      console.error('❌ Chyba u', post._id, ':', err)
    }
  }
  console.log('ℹ️  Hlavní obrázky (hlavniObrazek) zatím nejsou nastavené — nahrajte je ručně přes Studio (/studio → Blog — článek).')
}

seedBlog()
