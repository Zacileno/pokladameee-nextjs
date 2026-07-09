import { client } from '@/sanity/lib/client'

const PVC_PODLAHA_DATA = {
  _type: 'pvcPodlaha',
  _id: 'pvcPodlaha',
  heroNadpis: 'PVC podlaha — pokládka bez starostí',
  heroPodnadpis: 'Praktická, cenově dostupná a příjemně teplá na chůzi. PVC podlahu vám kompletně vyřešíme od zaměření po úklid — bez shánění materiálu, řemeslníků nebo odvozu odpadu. Ozvěte se a do 48 hodin přijedeme změřit, poradit a nacenit přímo na místě.',
  heroBadge: '🚛 Odvoz staré podlahy zdarma',
  istrip: [
    { emoji: '📏', text: 'Zaměření do 48 hodin' },
    { emoji: '💧', text: 'Voděodolné a snadná údržba' },
    { emoji: '🦶', text: 'Měkké a teplé na chůzi' },
    { emoji: '💰', text: 'Cenově dostupné řešení' },
    { emoji: '🏢', text: 'Domácnosti i komerční prostory' },
  ],
  typyNadpis: 'Typy PVC podlah',
  typyPodnadpis: 'PVC existuje v mnoha tloušťkách a jakostech. Pomůžeme vám vybrat tu pravou pro vás.',
  typy: [
    {
      nazev: 'PVC lepená podlaha',
      badge: 'Nejpopulárnější volba',
      popis: 'PVC lepená podlaha se připevní k podkladu speciálním lepidlem. Nabízí maximální stabilitu, vynikající zvukový komfort a je ideální pro koupelny, kuchyně a obchodní prostory. Jsou to řešení s dlouhodobou životností a snadnou údržbou.',
      vyhody: [
        'Maximální stabilita a tichá chůze',
        'Vhodná pro podlahové topení',
        'Jednoduchá údržba a čistění',
        'Odolná proti vlhkosti a chemikáliím',
      ],
      barva: 'orange',
    },
    {
      nazev: 'PVC plovoucí (click)',
      badge: '',
      popis: 'PVC click podlaha se spojuje zámkovým systémem bez lepidla. Umožňuje rychlejší montáž a je snadnější ji opravit. Vhodná do obývacích pokojů, ložnic a kancelářských prostor. Výhodná pro ty, kdo chtějí snadnou demontáž.',
      vyhody: [
        'Rychlá a čistá montáž bez lepidla',
        'Snadná výměna poškozených dílů',
        'Vhodná pro DIY demontáž',
        'Nižší cena než lepená varianta',
      ],
      barva: 'blue',
    },
  ],
  benefityNadpis: 'Proč zvolit PVC podlahu?',
  benefity: [
    { emoji: '💰', nadpis: 'Cenově dostupné řešení', text: 'PVC nabízí skvělý poměr ceny a kvality. Získáte hezkou a funkční podlahu bez zbytečných nákladů — ideální volba, pokud chcete rozumně investovat.' },
    { emoji: '🦶', nadpis: 'Měkká a teplá na chůzi', text: 'Na rozdíl od tvrdších krytin je PVC příjemně měkké a teplé i bez bot. Oceníte to v ložnicích, dětských pokojích i obývacích prostorech.' },
    { emoji: '💧', nadpis: 'Voděodolná a snadná údržba', text: 'Stoprocentně voděodolná — ideální do koupelen, kuchyní i předsíní. Stačí pravidelné setření, žádná speciální chemie.' },
    { emoji: '🏢', nadpis: 'Univerzální nasazení', text: 'Hodí se do domácností i společných prostor, provozoven a komerčních objektů. Jedno řešení pro byt i firmu.' },
  ],
  krokyNadpis: 'Jak to probíhá',
  krokyPodnadpis: 'Od prvního kontaktu po hotovou podlahu — bez stresu a bez překvapení.',
  kroky: [
    { nadpis: 'Zaměření a konzultace zdarma', text: 'Do 48 h od poptávky přijedeme na místo, zhodnotíme podklad a poradíme s výběrem materiálu podle prostoru, zátěže i rozpočtu. Bez závazku.' },
    { nadpis: 'Vzorník, výběr a kalkulace na místě', text: 'Přivezeme vzorník PVC v různých dekorech a tloušťkách. Pomůžeme vybrat a cenu vám spočítáme rovnou na místě.' },
    { nadpis: 'Demontáž, příprava a pokládka', text: 'Odborně odstraníme starou podlahu, připravíme podklad a novou PVC podlahu profesionálně položíme — u jednodušších realizací obvykle za jeden den.' },
    { nadpis: 'Úklid a záruka', text: 'Po sobě uklidíme a odpad ekologicky zlikvidujeme. Na práci máte záruku — když se něco stane, voláte nás, ne výrobce ani dodavatele.' },
  ],
  referenceHodnoceni: 4.9,
  referenceCitace: 'PVC podlahu si vybrala naše rodinná firma na průmyslovém skladě. Je odolná, snadná na údržbu a už 3 roky je bez jediné vady. Doporučuju ji všem, kdo hledají praktické řešení.',
  referenceJmeno: 'Jan M. — Havířov, průmyslová zóna',
  faq: [
    {
      otazka: 'Jaký je rozdíl mezi PVC a vinylem?',
      odpoved: 'PVC je robustnější a vydržuje vyšší zátěž. Je vhodná do náročnějších prostor — kuchyní, garáží, komerčních budov. Vinyl je měkčí, jemnější a více vhodný pro obytné prostory. Jsou to dva různé materiály s různými vlastnostmi a cenou.',
    },
    {
      otazka: 'Jak dlouho trvá pokládka PVC podlahy?',
      odpoved: 'Záleží na velikosti plochy a přípravě podkladu. Průměrný pokoj (20–25 m²) zvládneme za jeden den. Počítejte s tím, že zahrnujeme demontáž staré podlahy a úklid. Přesný čas domluvíme při zaměření.',
    },
    {
      otazka: 'Je PVC vhodná do koupelny?',
      odpoved: 'Ano, PVC je ideální do koupelny. Je 100% voděodolná a odolná vůči chemikáliím (šampóny, gely). Neotupuje se, neabsorbuje vlhkost a nekažuje se. V koupelně jí nevidím lepší variantu.',
    },
    {
      otazka: 'Funguje PVC s podlahovým topením?',
      odpoved: 'Lepená PVC je kompatibilní s teplovodním i elektrickým podlahovým topením. Click (plovoucí) variantu s topením kombinovat nedoporučujeme — raději volte lepenou. Vždy je možné domluvit si speciální varianty.',
    },
    {
      otazka: 'Jak se údržuje PVC podlaha?',
      odpoved: 'Velmi jednoduše. Pravidelný smetení nebo vysavač. Na špinavé místo — vlhký mop s trochou neutrálního saponátu. Žádné vosky, zářidla nebo agresivní chemikálie. PVC vydržuje i průmyslové čistidla, pokud bude třeba.',
    },
  ],
}

async function seedPvcPodlaha() {
  try {
    const result = await client.createOrReplace(PVC_PODLAHA_DATA)
    console.log('✅ PVC podlaha seed hotovo:', result._id)
  } catch (err) {
    console.error('❌ Chyba:', err)
  }
}

seedPvcPodlaha()
