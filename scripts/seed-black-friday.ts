import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { join } from 'path'
import { randomUUID } from 'crypto'

const client = createClient({
  projectId: '8cvsenqb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

// Pole typu "formatovanyText" (viz sanity/schemas/objects/formatovanyText.ts) čekají
// jeden Portable Text blok s obyčejnými (needitovanými) marks — editor si barvu/tučně/
// kurzívu/velikost doplní sám ve Studiu.
const rt = (text: string) => [{
  _type: 'block',
  _key: randomUUID().slice(0, 8),
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', _key: randomUUID().slice(0, 8), text, marks: [] }],
}]

async function seed() {
  const bannerPath = join(process.cwd(), 'public/assets/black-friday/banner.png')
  const bannerAsset = await client.assets.upload('image', readFileSync(bannerPath), { filename: 'black-friday-banner.png' })

  const result = await client.createOrReplace({
    _id: 'blackFriday',
    _type: 'blackFriday',

    topBarOznaceni: rt('🔥 BLACK FRIDAY'),
    topBarSleva: rt('25 %'),
    topBarZbytek: rt('na podlahové krytiny'),
    topBarDovetek: rt('A to není vše.'),
    topBarCta: rt('DETAIL AKCE →'),

    heroBadge: rt('BLACK FRIDAY JE TADY'),
    heroSleva: rt('25 %'),
    heroNadpisZbytek: rt('na podlahové krytiny'),
    heroPodnadpis: rt('Vinylové, PVC i dřevěné podlahy a koberce se slevou 25 %. Zaměření i odvoz staré podlahy máte zdarma.'),
    heroTlacitko: rt('Podlahy v akci ↓'),
    heroTlacitkoSekundarni: rt('ZAMĚŘENÍ ZDARMA'),

    bannerObrazek: { _type: 'image', asset: { _type: 'reference', _ref: bannerAsset._id } },
    videoNadpis: rt('Dopřejteee domovu novou podlahu'),
    body: [
      { _key: 'bd1', titul: rt('Odolná a voděodolná.'), text: rt('Vinyl i PVC zvládnou kuchyni, koupelnu i dětský pokoj a údržba je otázkou minuty.') },
      { _key: 'bd2', titul: rt('Hotovo, než se nadějeteee.'), text: rt('Od zaměření po pokládku bez zbytečného čekání. Přijedeme ve smluvený den.') },
      { _key: 'bd3', titul: rt('Bez starostí s úklidem.'), text: rt('Starou podlahu odstraníme, ekologicky zlikvidujeme a po sobě uklidíme.') },
    ],
    odstavec: rt('Pokud o nové podlaze přemýšlíte, právě teď je nejlepší chvíle posunout ji z „někdy“ na „teď“. Stačí vyplnit nezávazný formulář.'),
    zvyrazenyText: rt('BLACK FRIDAY = nová podlaha za méně peněz. Starosti necháte na nás.'),
    ctaPopupText: rt('Využít akci →'),
    adamText: rt('Přijedeme a ZDARMA zaměříme'),

    produktyNadpis: rt('V Black Friday náladě jsou všechny podlahy'),
    slevaBadge: rt('-25 %'),
    zdarmaPopisek: rt('Pokládáme v celém Moravskoslezském, Zlínském a Olomouckém kraji'),

    seoTitle: 'Black Friday – 25 % na podlahové krytiny',
    seoDescription: 'Black Friday na pokládámeee.cz: sleva 25 % na vinylové, PVC, dřevěné podlahy i koberce. Zaměření a odvoz staré podlahy zdarma po celém Moravskoslezském, Zlínském a Olomouckém kraji.',
  })

  console.log('✅ Seed hotov:', result._id)
}

seed().catch(console.error)
