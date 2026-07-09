import { client } from '@/sanity/lib/client'

const PVC_PODLAHA_DATA = {
  _type: 'pvcPodlaha',
  _id: 'pvcPodlaha',
  heroNadpis: 'PVC podlaha — pokládka a montáž',
  heroPodnadpis: 'Odolná, voděodolná a snadná na údržbu. PVC podlahy jsou ideální pro koupelny, kuchyně, obchodní prostory a všechny náročné prostředí. Přijedeme zaměřit do 48 hodin, poradíme s výběrem a profesionálně položíme.',
  heroBadge: '🚛 Odvoz staré podlahy zdarma',
  istrip: [
    { emoji: '🏗️', text: 'Prvotřídní kvalita' },
    { emoji: '⏱️', text: 'Rychlá pokládka' },
    { emoji: '💧', text: 'Vodě odolná' },
    { emoji: '♻️', text: 'Ekologicky bezpečné' },
    { emoji: '📊', text: 'Průmyslový standard' },
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
    { emoji: '💪', nadpis: 'Extrémně odolná', text: 'PVC snáší vysokou zátěž, nárazům a opotřebení. Vhodná do komerčních prostor, kuchyní, bazénů i sportovních hal.' },
    { emoji: '💧', nadpis: 'Vodě odolná', text: 'Stoprocentně voděodolná — ideální do koupelen, kuchyní, předsíní a všech vlhkých prostor. Nehnívá a necpou se v ní bakterie.' },
    { emoji: '🧹', nadpis: 'Snadná údržba', text: 'Stačí von a voda — žádné speciální mycí prostředky. Ideální pro lidi s alergiemi a domácnosti s dětmi.' },
    { emoji: '🎨', nadpis: 'Pestrá nabídka', text: 'Desítky dekorů — imitace dřeva, kamene, betonu, moderní tóny a metalické efekty. Vždy najdeš design, který se shoduje s interiérem.' },
  ],
  krokyNadpis: 'Jak to probíhá',
  krokyPodnadpis: 'Od prvního kontaktu po hotovou podlahu — bez stresu a bez překvapení.',
  kroky: [
    { nadpis: 'Zavoláte nebo napíšete', text: 'Do 48 h přijedeme na zaměření — bez závazku a bez skrytých nákladů. Zhodnotíme stav podkladu a poradíme varianty.' },
    { nadpis: 'Vyberete materiál', text: 'Přivezeme vzorník PVC s různými tloušťkami a designy. Ukážeme vám diferenci mezi standard a premium třídou. Domlouváme se na ceně.' },
    { nadpis: 'Položíme a uklidíme', text: 'Profesionální pokládka — správná příprava podkladu, presné lepení, řez v rozích. Odvez staré podlahy, vyčistíme po sobě.' },
    { nadpis: 'Garanti a podpora', text: 'Na práci máte záruku. Kdyby se cokoliv stalo, voláte nás. Nabízíme i údržbu a regeneraci.' },
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
