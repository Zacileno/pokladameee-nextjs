import { client } from '@/sanity/lib/client'

const DREVENA_PODLAHA_DATA = {
  _type: 'drevenaPodlaha',
  _id: 'drevenaPodlaha',
  heroNadpis: 'Dřevěná podlaha — pokládka a montáž',
  heroPodnadpis: 'Přírodní materiál, který dodá interiéru teplo a eleganci. Dřevěné podlahy jsou investicí na desítky let — lze je opakovaně brousit a renovovat. Přijedeme zaměřit do 48 hodin, poradíme s výběrem dřeviny a profesionálně položíme.',
  heroBadge: '🚛 Odvoz staré podlahy zdarma',
  istrip: [
    { emoji: '🌳', text: 'Přírodní materiál' },
    { emoji: '⏱️', text: 'Rychlá pokládka' },
    { emoji: '🔨', text: 'Brousitelná a renovovatelná' },
    { emoji: '🏡', text: 'Zvyšuje hodnotu nemovitosti' },
    { emoji: '📊', text: 'Dlouhá životnost' },
  ],
  typyNadpis: 'Typy dřevěných podlah',
  typyPodnadpis: 'Dřevěné podlahy existují v mnoha dřevinách a technikách pokládky. Pomůžeme vám vybrat tu pravou pro vás.',
  typy: [
    {
      nazev: 'Dřevěná podlaha lepená',
      badge: 'Nejpopulárnější volba',
      popis: 'Dřevěná podlaha se lepí celoplošně k podkladu speciálním lepidlem. Nabízí maximální stabilitu, tichou chůzi a je vhodná i pro velké plochy bez dilatace uprostřed místnosti. Ideální pro obývací pokoje, ložnice i komerční prostory.',
      vyhody: [
        'Maximální stabilita a tichá chůze',
        'Vhodná pro velké plochy bez dilatačních spár',
        'Kompatibilní s podlahovým topením (dle dřeviny)',
        'Dlouhá životnost při správné péči',
      ],
      barva: 'orange',
    },
    {
      nazev: 'Dřevěná podlaha plovoucí (click)',
      badge: '',
      popis: 'Plovoucí podlaha se spojuje zámkovým systémem bez lepidla a pokládá se na podložku. Rychlejší montáž, snazší případná výměna poškozených lamel. Vhodná do obývacích pokojů, ložnic a kanceláří.',
      vyhody: [
        'Rychlá a čistá montáž bez lepidla',
        'Snadná výměna poškozených lamel',
        'Vhodná i pro DIY demontáž při stěhování',
        'Nižší cena instalace',
      ],
      barva: 'blue',
    },
  ],
  benefityNadpis: 'Proč zvolit dřevěnou podlahu?',
  benefity: [
    { emoji: '🌳', nadpis: 'Přírodní a zdravý materiál', text: 'Dřevo je přírodní, dýchající materiál bez škodlivých látek. Vhodné i do dětských pokojů a ložnic.' },
    { emoji: '🔨', nadpis: 'Opakovaně brousitelná', text: 'Na rozdíl od laminátu nebo vinylu lze masivní dřevěnou podlahu brousit a renovovat i několikrát za desítky let.' },
    { emoji: '🏡', nadpis: 'Zvyšuje hodnotu nemovitosti', text: 'Dřevěná podlaha je vnímaná jako prémiový standard a dlouhodobě zvyšuje hodnotu bytu i domu.' },
    { emoji: '🎨', nadpis: 'Přírodní krása a variabilita', text: 'Desítky dřevin, odstínů a kartáčování — od světlého dubu po tmavý ořech. Vždy najdeme design, který sedí k interiéru.' },
  ],
  krokyNadpis: 'Jak to probíhá',
  krokyPodnadpis: 'Od prvního kontaktu po hotovou podlahu — bez stresu a bez překvapení.',
  kroky: [
    { nadpis: 'Zavoláte nebo napíšete', text: 'Do 48 h přijedeme na zaměření — bez závazku a bez skrytých nákladů. Zhodnotíme stav podkladu a poradíme s výběrem dřeviny.' },
    { nadpis: 'Vyberete materiál', text: 'Přivezeme vzorník dřevěných podlah — dub, buk, ořech i exotické dřeviny, různé odstíny a kartáčování. Domluvíme se na ceně.' },
    { nadpis: 'Položíme a uklidíme', text: 'Profesionální pokládka — příprava podkladu, přesné lepení nebo zaklikávání, olejování či lakování. Odvoz staré podlahy, úklid po sobě.' },
    { nadpis: 'Garance a podpora', text: 'Na práci máte záruku. Poradíme i s údržbou, olejováním a případným budoucím broušením.' },
  ],
  referenceHodnoceni: 4.9,
  referenceCitace: 'Dubovou podlahu jsme řešili do celého přízemí rodinného domu. Kluci od pokládámeee odvedli precizní práci, podlaha je rovná a krásně doladěná s nábytkem. Po dvou letech vypadá jako nová.',
  referenceJmeno: 'Tomáš R. — Frýdek-Místek, rodinný dům',
  faq: [
    {
      otazka: 'Jaký je rozdíl mezi masivní a vícevrstvou dřevěnou podlahou?',
      odpoved: 'Masivní podlaha je z jednoho kusu dřeva a lze ji brousit vícekrát za celou její životnost. Vícevrstvá (engineered) má nosnou vrstvu z překližky a svrchní dýhu z pravého dřeva — je stabilnější a méně náchylná na vlhkost, ale broušení zvládne méně opakování.',
    },
    {
      otazka: 'Funguje dřevěná podlaha s podlahovým topením?',
      odpoved: 'Ano, ale je potřeba zvolit vhodnou dřevinu a konstrukci (nejčastěji vícevrstvou lepenou). Masivní dřevo s topením kombinovat nedoporučujeme kvůli většímu pnutí. Poradíme při zaměření.',
    },
    {
      otazka: 'Jak často je potřeba dřevěnou podlahu brousit?',
      odpoved: 'Záleží na provozu a tloušťce vrchní vrstvy — obvykle jednou za 8–15 let. Broušení podlahu zase zbaví škrábanců a obnoví původní vzhled.',
    },
    {
      otazka: 'Je dřevěná podlaha vhodná do kuchyně nebo koupelny?',
      odpoved: 'Do koupelny dřevo nedoporučujeme kvůli vysoké vlhkosti. Do kuchyně je možné s kvalitním olejováním nebo lakováním a opatrností u dřezu — jinak je vhodnější volit PVC nebo vinyl.',
    },
    {
      otazka: 'Jak se dřevěná podlaha udržuje?',
      odpoved: 'Pravidelné vysávání nebo zametání, otírání mírně navlhčeným hadrem. Jednou za čas doporučujeme obnovu oleje nebo laku. Vyvarujte se stojaté vodě a agresivním čisticím prostředkům.',
    },
  ],
}

async function seedDrevenaPodlaha() {
  try {
    const result = await client.createOrReplace(DREVENA_PODLAHA_DATA)
    console.log('✅ Dřevěná podlaha seed hotovo:', result._id)
  } catch (err) {
    console.error('❌ Chyba:', err)
  }
}

seedDrevenaPodlaha()
