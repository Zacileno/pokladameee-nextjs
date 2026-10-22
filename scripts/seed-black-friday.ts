import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { join } from 'path'

const client = createClient({
  projectId: '8cvsenqb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

async function seed() {
  const bannerPath = join(process.cwd(), 'public/assets/black-friday/banner.png')
  const bannerAsset = await client.assets.upload('image', readFileSync(bannerPath), { filename: 'black-friday-banner.png' })

  const result = await client.createOrReplace({
    _id: 'blackFriday',
    _type: 'blackFriday',

    heroBadge: 'BLACK FRIDAY JE TADY',
    heroSleva: '25 %',
    heroNadpisZbytek: 'na podlahové krytiny',
    heroPodnadpis: 'Vinylové, PVC i dřevěné podlahy a koberce se slevou 25 %. Zaměření i odvoz staré podlahy máte zdarma.',
    heroTlacitko: 'Podlahy v akci ↓',

    bannerObrazek: { _type: 'image', asset: { _type: 'reference', _ref: bannerAsset._id } },
    videoNadpis: 'Dopřejteee domovu novou podlahu',
    body: [
      { _key: 'bd1', titul: 'Odolná a voděodolná.', text: 'Vinyl i PVC zvládnou kuchyni, koupelnu i dětský pokoj a údržba je otázkou minuty.' },
      { _key: 'bd2', titul: 'Hotovo, než se nadějeteee.', text: 'Od zaměření po pokládku bez zbytečného čekání. Přijedeme ve smluvený den.' },
      { _key: 'bd3', titul: 'Bez starostí s úklidem.', text: 'Starou podlahu odstraníme, ekologicky zlikvidujeme a po sobě uklidíme.' },
    ],
    odstavec: 'Pokud o nové podlaze přemýšlíte, právě teď je nejlepší chvíle posunout ji z „někdy“ na „teď“. Stačí vyplnit nezávazný formulář.',
    zvyrazenyText: 'BLACK FRIDAY = nová podlaha za méně peněz. Starosti necháte na nás.',
    ctaPopupText: 'Využít akci →',
    adamText: 'Přijedeme a ZDARMA zaměříme',

    produktyNadpis: 'V Black Friday náladě jsou všechny podlahy',
    slevaBadge: '-25 %',

    zdarmaNadpis: 'A k tomu služby zdarma',
    zdarmaPopisek: 'Pokládáme v celém Moravskoslezském, Zlínském a Olomouckém kraji',
    zdarmaPolozky: [
      { _key: 'zd1', emoji: '♻️', title: 'Odvoz staré podlahy' },
      { _key: 'zd2', emoji: '📐', title: 'Zaměření a kalkulace' },
    ],

    seoTitle: 'Black Friday – 25 % na podlahové krytiny',
    seoDescription: 'Black Friday na pokládámeee.cz: sleva 25 % na vinylové, PVC, dřevěné podlahy i koberce. Zaměření a odvoz staré podlahy zdarma po celém Moravskoslezském, Zlínském a Olomouckém kraji.',
  })

  console.log('✅ Seed hotov:', result._id)
}

seed().catch(console.error)
