// Kraje a města, kam jezdíme — homepage mapa + podstránky /lokality/[kraj] a /lokality/[kraj]/[mesto].
// Texty měst jsou psané s nádechem místního nářečí. **tučně** = <strong>.

export type Mesto = {
  slug: string          // pokladka-podlah-ostrava
  nazev: string         // Ostrava (i na ceduli za Adamem)
  vMeste: string        // v Ostravě
  gps: [number, number] // [zeměpisná délka, šířka] — vlaječka na mapě
  perex: string         // úvodní odstavec v hero
  okoli: string[]       // sekce „Pokládámeee v … a okolí" (nářečí)
}

export type Kraj = {
  slug: string
  mapaId: string        // id kraje v lib/mapa-kraju.ts
  nazev: string         // Moravskoslezský kraj
  vKraji: string        // v Moravskoslezském kraji
  oblast: string        // pokračování věty „po celém kraji — …"
  mesta: Mesto[]
}

export const KRAJE: Kraj[] = [
  {
    slug: 'moravskoslezsky-kraj',
    mapaId: 'moravskoslezsky-kraj',
    nazev: 'Moravskoslezský kraj',
    vKraji: 'v Moravskoslezském kraji',
    oblast: 'od Ostravy přes Opavu a Frýdek-Místek až po Beskydy',
    mesta: [
      {
        slug: 'pokladka-podlah-ostrava',
        nazev: 'Ostrava',
        vMeste: 'v Ostravě',
        gps: [18.2625, 49.8209],
        perex: 'Bydlíte v Porubě, v centru, na Hrabůvce nebo v rodinném domě v Hošťálkovicích? Ať jde o panelák, nebo novostavbu, **novou podlahu vám v Ostravě položíme rychle a bez starostí**.',
        okoli: [
          'Ostrava je fajne město a my sem jezdíme dycky rádi. Proč? **Bo je tu prostě dobře!**',
          'Od Stodolní přes Dolní oblast Vítkovice až po Slezskou Ostravu — kaj jen potřebujete, tam přijedeme. Zaměříme zdarma, starou podlahu vyneseme a odvezeme a novou položíme tak, že ju budete mít ráda celá rodina.',
          'Šak víte, jak to chodí: nikdo nechce mít doma bordel tři týdny. U nás je **hotovo, než se nadějeteee**.',
        ],
      },
      {
        slug: 'pokladka-podlah-opava',
        nazev: 'Opava',
        vMeste: 'v Opavě',
        gps: [17.9045, 49.9387],
        perex: 'Ať bydlíte v historickém centru, na Kateřinkách nebo v domku za městem, **novou podlahu vám v Opavě položíme rychle, čistě a bez starostí**.',
        okoli: [
          'Opava je Slezsko, a ne Ostrava — to víme a respektujeme. **Šak to tu má svoju noblesu!**',
          'Jezdíme po celém Opavsku: Kateřinky, Kylešovice, Vávrovice i okolní obce jako Kravaře, Hradec nad Moravicí nebo Vítkov. Přijedeme, zaměříme zdarma a poradíme, jaká podlaha se k vám hodí.',
          'Starou podlahu odvezeme, podklad připravíme a novou položíme. A po sobě uklidíme — šak to je samozřejmost.',
        ],
      },
      {
        slug: 'pokladka-podlah-frydek-mistek',
        nazev: 'Frýdek-Místek',
        vMeste: 've Frýdku-Místku',
        gps: [18.3497, 49.6833],
        perex: 'Na frýdecké i místecké straně Ostravice, v paneláku i v chalupě pod Beskydy — **novou podlahu vám ve Frýdku-Místku položíme rychle a bez starostí**.',
        okoli: [
          'Jestli bydlíte ve Frýdku, nebo v Místku, to je nám jedno. **Podlahu položíme dycky stejně dobře na obou stranách řeky.**',
          'Jezdíme po celém Frýdecko-Místecku — do Baškovce, Palkovic, Brušperku i pod Lysou horu. Zaměříme zdarma a domluvíme termín, který vám sedí.',
          'A kdyby vám po pokládce zbyl čas, vyražte na Beskydy. Šak doma už máte hotovo.',
        ],
      },
      {
        slug: 'pokladka-podlah-havirov',
        nazev: 'Havířov',
        vMeste: 'v Havířově',
        gps: [18.4369, 49.7798],
        perex: 'Sorela, panelák na Šumbarku nebo rodinný dům v Životicích? **Novou podlahu vám v Havířově položíme rychle, čistě a bez starostí.**',
        okoli: [
          'Havířov postavili havíři a my si té poctivé práce vážíme. **Podlahu vám položíme jak na šichtě — pořádně a bez řečí.**',
          'Jezdíme do všech částí města, od Podlesí přes Prostřední Suchou až po Bludovice, a taky do okolních obcí jako Horní Suchá, Těrlicko nebo Šenov.',
          'Zaměření je zdarma, starou podlahu odvezeme a novou položíme. Fajne, ni?',
        ],
      },
      {
        slug: 'pokladka-podlah-karvina',
        nazev: 'Karviná',
        vMeste: 'v Karviné',
        gps: [18.5425, 49.8540],
        perex: 'Ve Fryštátě, na Mizerově nebo v Hranicích — **novou podlahu vám v Karviné položíme rychle, čistě a bez starostí**.',
        okoli: [
          'Karviná je kraj poctivé roboty. **Bo tu se dycky makalo pořádně** — a tak to děláme aj my.',
          'Jezdíme do všech částí Karviné i do okolí: Petřvald, Orlová, Stonava, Dětmarovice nebo Bohumín. Přijedeme, zaměříme zdarma a poradíme s výběrem.',
          'Starou podlahu vyneseme a odvezeme, novou položíme a po sobě uklidíme. Vy si mezitím dáte kafe.',
        ],
      },
      {
        slug: 'pokladka-podlah-novy-jicin',
        nazev: 'Nový Jičín',
        vMeste: 'v Novém Jičíně',
        gps: [18.0102, 49.5944],
        perex: 'Na Masarykově náměstí, na Žilině nebo v domku na Loučce — **novou podlahu vám v Novém Jičíně položíme rychle a bez starostí**.',
        okoli: [
          'Nový Jičín je město klobouků. **Před dobrou podlahou smekne každý** — a právě takovou vám položíme.',
          'Jezdíme po celém Novojičínsku: Kopřivnice, Příbor, Studénka, Bílovec i obce kolem Kravařska. Zaměříme zdarma a domluvíme termín, kerý vám sedí.',
          'Starou podlahu odvezeme, podklad připravíme a novou položíme. Šak to je naše robota.',
        ],
      },
      {
        slug: 'pokladka-podlah-trinec',
        nazev: 'Třinec',
        vMeste: 'v Třinci',
        gps: [18.6728, 49.6776],
        perex: 'Na Lyžbicích, v Oldřichovicích nebo v chałpě pod Javorovým — **novou podlahu vám v Třinci položíme rychle a bez starostí**.',
        okoli: [
          'Třinec mluví po naszymu, a my to mamy radzi. **Podlaha od nás bude fajnie — aj pro gorola, aj pro domácího.**',
          'Jezdíme po celém Třinecku: Konská, Kanada, Oldřichovice i obce jako Vendryně, Bystřice nebo Hrádek. Zaměříme zdarma a poradíme, co se k vám hodí.',
          'Starou podlahu odvezeme, novou položíme a po sobě uklidíme. Ani se nenadějete a je hotovo.',
        ],
      },
      {
        slug: 'pokladka-podlah-bruntal',
        nazev: 'Bruntál',
        vMeste: 'v Bruntále',
        gps: [17.4647, 49.9884],
        perex: 'V centru u zámku, na sídlišti nebo na chalupě pod Uhlířským vrchem — **novou podlahu vám v Bruntále položíme rychle a bez starostí**.',
        okoli: [
          'Na Bruntálsku se moc nářečím nemluví — tady se mluví řečí hor. **A ta říká: dělej to pořádně, ať to vydrží.**',
          'Jezdíme do Bruntálu i do okolí: Krnov, Rýmařov, Vrbno pod Pradědem nebo Karlova Studánka. Na horách to umíme — chalupy, penziony i rodinné domy.',
          'Zaměření je zdarma, starou podlahu odvezeme a novou položíme. Pak už jen na Praděd.',
        ],
      },
    ],
  },
  {
    slug: 'zlinsky-kraj',
    mapaId: 'zlinsky-kraj',
    nazev: 'Zlínský kraj',
    vKraji: 've Zlínském kraji',
    oblast: 'od Zlína přes Kroměříž a Uherské Hradiště až po Valašsko',
    mesta: [
      {
        slug: 'pokladka-podlah-zlin',
        nazev: 'Zlín',
        vMeste: 've Zlíně',
        gps: [17.6667, 49.2265],
        perex: 'V baťovském domku, na Jižních Svazích nebo v novostavbě na Malenovicích — **novou podlahu vám ve Zlíně položíme rychle a bez starostí**.',
        okoli: [
          'Zlín vyrostl na poctivé práci a my tu tradici držíme. **Šak Baťa by na tu podlahu byl pyšný!**',
          'Jezdíme do všech částí Zlína — Jižní Svahy, Louky, Malenovice, Prštné — a taky do Otrokovic, Fryštáku nebo Vizovic. Zaměříme zdarma a poradíme s výběrem.',
          'Starou podlahu enem vyneseme a odvezeme, novou položíme a uklidíme. Hotovo, než se nadějeteee.',
        ],
      },
      {
        slug: 'pokladka-podlah-kromeriz',
        nazev: 'Kroměříž',
        vMeste: 'v Kroměříži',
        gps: [17.3933, 49.2977],
        perex: 'V centru u Květné zahrady, na Oskolu nebo v domku v Hulíně — **novou podlahu vám v Kroměříži položíme rychle a bez starostí**.',
        okoli: [
          'Kroměříž je Haná jak vyšitá. A Hanák vé, co je dobré. **Tak pojte, podlahu vám položíme pěkně — tak akorát.**',
          'Jezdíme po celém Kroměřížsku: Hulín, Holešov, Chropyně, Bystřice pod Hostýnem i do okolních dědin. Zaměříme zdarma a domluvíme termín.',
          'Hanák prej nespěchá. My jo — do 48 hodin jsme u vás.',
        ],
      },
      {
        slug: 'pokladka-podlah-uherske-hradiste',
        nazev: 'Uherské Hradiště',
        vMeste: 'v Uherském Hradišti',
        gps: [17.4597, 49.0697],
        perex: 'V Hradišti, ve Starém Městě nebo v Kunovicích — **novou podlahu vám na Uherskohradišťsku položíme rychle a bez starostí**.',
        okoli: [
          'Na Slovácku sa umí dobře žít, dobře jest a dobře pít. **A dobrú podlahu k tomu přidáme my.**',
          'Jezdíme do Uherského Hradiště, Starého Města, Kunovic, Uherského Brodu i do vinařských dědin kolem. Zaměříme zdarma a poradíme, co sa k vám hodí.',
          'Starú podlahu odvezeme, novú položíme a po sobě uklidíme. Potom enem pozvat chasu na hody.',
        ],
      },
      {
        slug: 'pokladka-podlah-vsetin',
        nazev: 'Vsetín',
        vMeste: 've Vsetíně',
        gps: [17.9962, 49.3388],
        perex: 'Na Sychrově, v Rokytnici nebo v roubence pod kopcem — **novou podlahu vám ve Vsetíně položíme rychle a bez starostí**.',
        okoli: [
          'Na Valašsku sa nic nedělá napůl. **Šak co ogaři udělajú, to drží!**',
          'Jezdíme do Vsetína i po celém okolí: Karolinka, Velké Karlovice, Hovězí nebo Jablůnka. Paneláky, domky i chalupy na kopcoch.',
          'Zaměření je zdarma, starú podlahu odvezeme a novú položíme. Na slivovicu už nám nalévat nemusíte.',
        ],
      },
      {
        slug: 'pokladka-podlah-valasske-mezirici',
        nazev: 'Valašské Meziříčí',
        vMeste: 've Valašském Meziříčí',
        gps: [17.9712, 49.4718],
        perex: 'V Meziříčí, v Krásně nad Bečvou nebo v domku za městem — **novou podlahu vám ve Valašském Meziříčí položíme rychle a bez starostí**.',
        okoli: [
          'Valmez, to je Valašsko jak sa patří. **Podlahu vám položíme tak, že ju budete mět rádi aj za dvacet rokov.**',
          'Jezdíme do Meziříčí, Krásna, Zašové, Kelče i do okolních dědin. Zaměříme zdarma a poradíme s výběrem.',
          'Starú podlahu enem odvezeme, novú položíme a uklidíme. A frgál si dáte vy, ne my.',
        ],
      },
      {
        slug: 'pokladka-podlah-roznov-pod-radhostem',
        nazev: 'Rožnov pod Radhoštěm',
        vMeste: 'v Rožnově pod Radhoštěm',
        gps: [18.1430, 49.4585],
        perex: 'V centru, na Koryčanských pasekách nebo na chalupě pod Radhoštěm — **novou podlahu vám v Rožnově položíme rychle a bez starostí**.',
        okoli: [
          'Pod Radhoštěm sa žije pomalu, ale pořádně. **Šak aj my děláme pořádně — enem rychlejší.**',
          'Jezdíme do Rožnova, Zubří, Horní Bečvy, Prostřední Bečvy i Frenštátu. Rodinné domy, roubenky aj penziony.',
          'Zaměření je zdarma, starú podlahu odvezeme a novú položíme. Potom hurá na Pustevny.',
        ],
      },
    ],
  },
  {
    slug: 'olomoucky-kraj',
    mapaId: 'olomoucky-kraj',
    nazev: 'Olomoucký kraj',
    vKraji: 'v Olomouckém kraji',
    oblast: 'od Olomouce přes Přerov a Prostějov až po Jeseníky',
    mesta: [
      {
        slug: 'pokladka-podlah-olomouc',
        nazev: 'Olomouc',
        vMeste: 'v Olomouci',
        gps: [17.2509, 49.5938],
        perex: 'Ve starém bytě v centru, na Nových Sadech nebo v novostavbě v Hlubočkách — **novou podlahu vám v Olomouci položíme rychle a bez starostí**.',
        okoli: [
          'Olomóc je krásné město a Hanáci vijó, co je dobré. **Tak pojte, podlahu vám položíme jak se patří.**',
          'Jezdíme po celé Olomouci — Nová Ulice, Neředín, Lazce, Holice — i do okolí: Šternberk, Litovel, Uničov nebo Velká Bystřice.',
          'Zaměříme zdarma, starou podlahu odvezeme a novou položíme. A na tvarůžky už si zajdete sami.',
        ],
      },
      {
        slug: 'pokladka-podlah-prerov',
        nazev: 'Přerov',
        vMeste: 'v Přerově',
        gps: [17.4509, 49.4553],
        perex: 'Na Předmostí, v centru pod zámkem nebo v domku v Kozlovicích — **novou podlahu vám v Přerově položíme rychle a bez starostí**.',
        okoli: [
          'Přerov je Haná, a na Hané se mosí všecko dělat pořádně. **Tak to děláme i me.**',
          'Jezdíme do Přerova i do okolí: Lipník nad Bečvou, Kojetín, Tovačov nebo Brodek u Přerova. Zaměříme zdarma a poradíme s výběrem.',
          'Starou podlahu odvezeme, novou položíme a po sobě uklidíme. Dobré, ne?',
        ],
      },
      {
        slug: 'pokladka-podlah-prostejov',
        nazev: 'Prostějov',
        vMeste: 'v Prostějově',
        gps: [17.1118, 49.4719],
        perex: 'U Národního domu, na Hloučele nebo v domku v Držovicích — **novou podlahu vám v Prostějově položíme rychle a bez starostí**.',
        okoli: [
          'Prostějov je srdce Hané. **A Hanák si nenechá položit lecjakó podlahu** — proto mu položíme tu nejlepší.',
          'Jezdíme do Prostějova i po Prostějovsku: Kostelec na Hané, Konice, Plumlov nebo Němčice nad Hanou. Zaměříme zdarma a domluvíme termín.',
          'Starou podlahu odvezeme, novou položíme a uklidíme. Pak se mužete jit projit k Plumlovské přehradě.',
        ],
      },
      {
        slug: 'pokladka-podlah-sumperk',
        nazev: 'Šumperk',
        vMeste: 'v Šumperku',
        gps: [16.9706, 49.9653],
        perex: 'V centru, na Benátkách nebo na chalupě pod Jeseníky — **novou podlahu vám v Šumperku položíme rychle a bez starostí**.',
        okoli: [
          'Šumperk je brána Jeseníků. **A my jsme brána k nové podlaze** — rychlé a bez starostí.',
          'Jezdíme do Šumperka i do okolí: Zábřeh, Mohelnice, Bludov, Velké Losiny nebo Loučná nad Desnou. Paneláky, rodinné domy i horské chalupy.',
          'Zaměření je zdarma, starou podlahu odvezeme a novou položíme. Pak už jen vyrazit na Červenohorské sedlo.',
        ],
      },
      {
        slug: 'pokladka-podlah-hranice',
        nazev: 'Hranice',
        vMeste: 'v Hranicích',
        gps: [17.7348, 49.5480],
        perex: 'V centru u zámku, na sídlišti Hromůvka nebo v domku v Drahotuších — **novou podlahu vám v Hranicích položíme rychle a bez starostí**.',
        okoli: [
          'Hranice mají nejhlubší propast u nás. **Ale s naší podlahou se do žádné propasti nepropadnete!**',
          'Jezdíme po celém Záhoří a Hranicku: Drahotuše, Teplice nad Bečvou, Potštát, Bělotín i Hustopeče nad Bečvou. Zaměříme zdarma a šak se domluvíme.',
          'Starou podlahu odvezeme, novou položíme a uklidíme po sobě. Hotovo, než se nadějeteee.',
        ],
      },
      {
        slug: 'pokladka-podlah-jesenik',
        nazev: 'Jeseník',
        vMeste: 'v Jeseníku',
        gps: [17.2047, 50.2294],
        perex: 'V centru, v lázních nebo na chalupě v horách — **novou podlahu vám v Jeseníku položíme rychle a bez starostí**.',
        okoli: [
          'V Jeseníku se léčí čerstvým vzduchem a studenou vodou. **My léčíme staré podlahy** — rychle a bezbolestně.',
          'Jezdíme do Jeseníku i po celém Jesenicku: Lipová-lázně, Zlaté Hory, Mikulovice nebo Javorník. Rodinné domy, penziony i horské chalupy.',
          'Zaměření je zdarma, starou podlahu odvezeme a novou položíme. Pak už jen nádech a výšlap na Praděd.',
        ],
      },
    ],
  },
]

export const getKraj = (slug: string) => KRAJE.find(k => k.slug === slug)
export const getMesto = (kraj: Kraj, slug: string) => kraj.mesta.find(m => m.slug === slug)

// Přepočet GPS na souřadnice mapy v lib/mapa-kraju.ts (rovnoběžková projekce, hranice ČR)
export function naMapu([lon, lat]: [number, number]): [number, number] {
  return [(lon - 12.0906) / 6.7686 * 1000, (51.0556 - lat) / 2.5031 * 573]
}
