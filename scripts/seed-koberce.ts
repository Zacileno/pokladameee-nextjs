import { client } from '@/sanity/lib/client'

const KOBERCOVA_PODLAHA_DATA = {
  _type: 'kobercovaPodlaha',
  _id: 'kobercovaPodlaha',
  heroNadpis: 'Koberce — pokládka bez starostí',
  heroPodnadpis: 'Teplo pod nohama, tlumení hluku a nekonečná škála barev a vzorů. Koberec vám kompletně vyřešíme od zaměření po úklid — bez shánění materiálu, řemeslníků nebo odvozu odpadu. Ozvěte se a do 48 hodin přijedeme změřit, poradit a nacenit přímo na místě.',
  heroBadge: '🚛 Odvoz staré podlahy zdarma',
  istrip: [
    { emoji: '📏', text: 'Zaměření do 48 hodin' },
    { emoji: '🧶', text: 'Teplo a komfort pod nohama' },
    { emoji: '🔇', text: 'Tlumí hluk a kroky' },
    { emoji: '🎨', text: 'Stovky vzorů a barev' },
    { emoji: '🏢', text: 'Domácnosti i komerční prostory' },
  ],
  typyNadpis: 'Typy kobercových podlah',
  typyPodnadpis: 'Koberce existují v mnoha materiálech a technikách pokládky. Pomůžeme vám vybrat ten pravý pro vás.',
  typy: [
    {
      nazev: 'Koberec celoplošně lepený',
      badge: 'Nejpopulárnější volba',
      popis: 'Koberec se po celé ploše přilepí k podkladu. Nabízí maximální stabilitu, nehýbe se ani se nevlní a skvěle tlumí kročejový hluk. Ideální pro kanceláře, hotely, chodby a prostory s vysokým provozem.',
      vyhody: [
        'Maximální stabilita — nehýbe se ani se nevlní',
        'Vynikající tlumení kročejového hluku',
        'Vhodný do prostor s vysokým provozem',
        'Dlouhá životnost při správné péči',
      ],
      barva: 'orange',
    },
    {
      nazev: 'Koberec volně položený (na podložce)',
      badge: '',
      popis: 'Koberec leží volně na podložce, která zajišťuje měkkost a lepší tepelnou izolaci. Snadno se vymění nebo přemístí. Vhodný do ložnic, obývacích pokojů a dětských pokojů, kde oceníte příjemný došlap.',
      vyhody: [
        'Měkčí a příjemnější došlap',
        'Snadná výměna nebo přemístění',
        'Lepší tepelná izolace díky podložce',
        'Nižší cena instalace',
      ],
      barva: 'blue',
    },
  ],
  benefityNadpis: 'Proč zvolit koberec?',
  benefity: [
    { emoji: '🧶', nadpis: 'Teplo a komfort', text: 'Koberec izoluje teplo a je příjemný na dotek i bosou nohou. V zimě znatelně snižuje pocit chladu z podlahy.' },
    { emoji: '🔇', nadpis: 'Tlumí hluk', text: 'Skvěle pohlcuje zvuk kroků i akustiku místnosti. Ideální do bytů, kanceláří a místností nad obytnými prostory.' },
    { emoji: '🎨', nadpis: 'Stovky vzorů a barev', text: 'Od jednobarevných po vzorované, od krátkého vlasu po plyšový — najdeme koberec přesně podle vašeho interiéru.' },
    { emoji: '🏢', nadpis: 'Univerzální nasazení', text: 'Hodí se do bytů, rodinných domů i kanceláří a hotelových prostor — jedno řešení pro domácnost i firmu.' },
  ],
  krokyNadpis: 'Jak to probíhá',
  krokyPodnadpis: 'Od prvního kontaktu po hotovou podlahu — bez stresu a bez překvapení.',
  kroky: [
    { nadpis: 'Zaměření a konzultace zdarma', text: 'Do 48 h od poptávky přijedeme na místo, zhodnotíme podklad a poradíme s výběrem materiálu podle využití místnosti i rozpočtu. Bez závazku.' },
    { nadpis: 'Vzorník, výběr a kalkulace na místě', text: 'Přivezeme vzorník koberců — vlna, polypropylen, nylon, různé výšky vlasu i barvy. Cenu vám spočítáme rovnou na místě.' },
    { nadpis: 'Demontáž, příprava a pokládka', text: 'Odborně odstraníme starou podlahu, připravíme podklad a koberec profesionálně nainstalujeme — natažení nebo lepení, přesné řezy u stěn a dveří.' },
    { nadpis: 'Úklid a záruka', text: 'Po sobě uklidíme a odpad ekologicky zlikvidujeme. Na práci máte záruku — když se něco stane, voláte nás, ne výrobce ani dodavatele.' },
  ],
  referenceHodnoceni: 4.9,
  referenceCitace: 'Koberec jsme řešili do dětského pokoje a ložnice. Kluci od pokládámeee byli rychlí, čistí a poradili nám s výběrem materiálu, který zvládne i domácí mazlíčky. Výsledek je krásný a příjemný na chození.',
  referenceJmeno: 'Petra K. — Ostrava, rodinný dům',
  faq: [
    {
      otazka: 'Jaký koberec je nejvhodnější do ložnice?',
      odpoved: 'Do ložnice doporučujeme měkčí koberec s vyšším vlasem, ideálně z vlny nebo kvalitního polypropylenu. Zajistí příjemný došlap a dobrou tepelnou izolaci. Volně položený na podložce je zde nejčastější volba.',
    },
    {
      otazka: 'Je koberec vhodný pro alergiky?',
      odpoved: 'Moderní koberce s hustým vlasem naopak zachytávají prach a alergeny, které pak stačí odstranit pravidelným vysáváním. Doporučujeme kvalitní vysavač s HEPA filtrem a pravidelné čištění. U silných alergií raději volte hladké povrchy.',
    },
    {
      otazka: 'Jak dlouho koberec vydrží?',
      odpoved: 'Kvalitní celoplošně lepený koberec při běžném provozu vydrží 10–15 let, u nižší zátěže i déle. Životnost ovlivňuje materiál, hustota vlasu a pravidelná údržba.',
    },
    {
      otazka: 'Jak se koberec čistí a udržuje?',
      odpoved: 'Základ je pravidelné vysávání, ideálně 2–3× týdně. Skvrny odstraňujte ihned vlhkým hadříkem, jednou za rok doporučujeme strojové čištění. Vyvarujte se agresivních chemikálií, které mohou poškodit vlákna.',
    },
    {
      otazka: 'Můžu koberec položit na podlahové topení?',
      odpoved: 'Ano, ale je potřeba zvolit tenčí koberec s nižším tepelným odporem, aby teplo mohlo procházet do místnosti. Doporučujeme se poradit při zaměření — vybereme materiál, který s topením funguje bez problémů.',
    },
  ],
}

async function seedKobercovaPodlaha() {
  try {
    const result = await client.createOrReplace(KOBERCOVA_PODLAHA_DATA)
    console.log('✅ Kobercová podlaha seed hotovo:', result._id)
  } catch (err) {
    console.error('❌ Chyba:', err)
  }
}

seedKobercovaPodlaha()
