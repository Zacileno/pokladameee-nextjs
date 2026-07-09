import { client } from '@/sanity/lib/client'

const DREVENA_PODLAHA_DATA = {
  _type: 'drevenaPodlaha',
  _id: 'drevenaPodlaha',
  heroNadpis: 'Dřevěná podlaha — pokládka bez starostí',
  heroPodnadpis: 'Přírodní, nadčasové a prémiové řešení, které do interiéru přináší teplo, charakter a originalitu — každá podlaha je jedinečná. Kompletně vyřešíme od zaměření po úklid, bez shánění materiálu, řemeslníků nebo odvozu odpadu. Ozvěte se a do 48 hodin přijedeme změřit, poradit a nacenit přímo na místě.',
  heroBadge: '🚛 Odvoz staré podlahy zdarma',
  istrip: [
    { emoji: '📏', text: 'Zaměření do 48 hodin' },
    { emoji: '🌳', text: 'Přírodní a nadčasový materiál' },
    { emoji: '🔨', text: 'Brousitelná a renovovatelná' },
    { emoji: '🏡', text: 'Zvyšuje hodnotu nemovitosti' },
    { emoji: '📊', text: 'Dlouhá životnost při správné péči' },
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
    { emoji: '🌳', nadpis: 'Přírodní a prémiový materiál', text: 'Dřevo je přírodní, nadčasové a prémiové řešení, které do interiéru přináší teplo a charakter. Zdravé i pro dětské pokoje a ložnice.' },
    { emoji: '🔨', nadpis: 'Opakovaně brousitelná', text: 'Na rozdíl od laminátu nebo vinylu lze masivní dřevěnou podlahu brousit a renovovat i několikrát za desítky let.' },
    { emoji: '🏡', nadpis: 'Zvyšuje hodnotu nemovitosti', text: 'Dřevěná podlaha je vnímaná jako prémiový standard a dlouhodobě zvyšuje hodnotu bytu i domu.' },
    { emoji: '🎨', nadpis: 'Každá podlaha je originál', text: 'Přírodní kresba dřeva, odstíny a kartáčování dělají z každé podlahy originál. Desítky dřevin od světlého dubu po tmavý ořech.' },
  ],
  krokyNadpis: 'Jak to probíhá',
  krokyPodnadpis: 'Od prvního kontaktu po hotovou podlahu — bez stresu a bez překvapení.',
  kroky: [
    { nadpis: 'Zaměření a konzultace zdarma', text: 'Do 48 h od poptávky přijedeme na místo, zhodnotíme podklad a poradíme s výběrem dřeviny podle prostoru i rozpočtu. Bez závazku.' },
    { nadpis: 'Vzorník, výběr a kalkulace na místě', text: 'Přivezeme vzorník dřevěných podlah — dub, buk, ořech i exotické dřeviny, různé odstíny a kartáčování. Cenu vám spočítáme rovnou na místě.' },
    { nadpis: 'Demontáž, příprava a pokládka', text: 'Odborně odstraníme starou podlahu, připravíme podklad a novou dřevěnou podlahu profesionálně položíme — lepení nebo zaklikávání, olejování či lakování.' },
    { nadpis: 'Úklid a záruka', text: 'Po sobě uklidíme a odpad ekologicky zlikvidujeme. Na práci máte záruku — když se něco stane, voláte nás, ne výrobce ani dodavatele.' },
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
