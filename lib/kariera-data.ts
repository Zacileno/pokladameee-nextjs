export type Pozice = {
  slug: string
  nazev: string
  region: string
  regionLabel: string
  typ: string
  typLabel: string
  perex: string
  naplnPrace: string[]
  pozadujeme: string[]
  nabizime: string[]
}

export const pozice: Pozice[] = [
  {
    slug: 'pokladac-vinylove-podlahy-msk',
    nazev: 'Pokládač vinylových podlah',
    region: 'moravskoslezsky-kraj',
    regionLabel: 'Moravskoslezský kraj',
    typ: 'v-terenu',
    typLabel: 'V terénu',
    perex: 'Jsme pokládámeee.cz – dynamická firma specializující se na vinylové podlahy v celém MSK. Rosteme rychle a hledáme šikovné řemeslníky, kteří chtějí dělat kvalitní práci a být za ni férově odměněni.',
    naplnPrace: [
      'Pokládka vinylových podlah (lepených i plovoucích) v domácnostech a firmách',
      'Demontáž a ekologická likvidace starých podlah',
      'Příprava podkladu (broušení, vyrovnání)',
      'Komunikace se zákazníkem přímo na stavbě',
      'Udržování pořádku a úklid po dokončení',
    ],
    pozadujeme: [
      'Zkušenost s pokládkou podlah nebo příbuzným řemeslem výhodou – naučíme i šikovného nováčka',
      'Manuální zručnost a smysl pro detail',
      'Řidičský průkaz sk. B (auto zajistíme)',
      'Spolehlivost, dochvilnost, zodpovědný přístup',
      'Schopnost pracovat v terénu po celém MSK',
    ],
    nabizime: [
      'Nástupní mzda 35 000–45 000 Kč + prémie za výkon',
      'Firemní auto včetně paliva',
      'Vybavení a pracovní pomůcky zajišťujeme',
      'Zaškolení – vlastní postup pokládky dle standardů pokládámeee',
      'Stabilní zákazníci, plný kalendář – neřešíš sehánění práce',
      'Volné víkendy a svátky',
      'Firemní telefon a pracovní oděv',
    ],
  },
  {
    slug: 'obchodne-technicky-zastupce-msk',
    nazev: 'Obchodně-technický zástupce pro MSK',
    region: 'moravskoslezsky-kraj',
    regionLabel: 'Moravskoslezský kraj',
    typ: 'kombinovane',
    typLabel: 'Kancelář / V terénu',
    perex: 'Hledáme člověka s obchodním talentem, který zvládne zákazníkovi poradit s výběrem podlahy přímo u něj doma a uzavřít obchod na místě. Naše call centrum ti plní kalendář – ty se soustředíš na výsledky.',
    naplnPrace: [
      'Schůzky se zákazníky, kteří projevili zájem (domlouvá call centrum)',
      'Zaměření prostoru a návrh řešení na míru',
      'Prezentace materiálů a cenová nabídka přímo u zákazníka',
      'Uzavírání obchodů',
      'Spolupráce s pokládkovými partami (předání zakázky)',
    ],
    pozadujeme: [
      'Min. 1 rok zkušeností v přímém prodeji nebo B2C obchodu',
      'Technické cítění (schopnost zaměřit místnost, základy výpočtu m²)',
      'Řidičský průkaz sk. B (firemní auto k dispozici)',
      'Ochota jezdit po celém MSK',
      'Sebevědomá komunikace, empatie, uzavírací dovednosti',
    ],
    nabizime: [
      'Průměrný výdělek 60 000–80 000 Kč (provize + fix)',
      'Strop neexistuje – výdělek je ve tvých rukou',
      'Firemní auto i pro soukromé účely',
      'Mobilní telefon a paušál',
      'Zázemí skupiny EEE (Malujemeee, Žaluzieee)',
      'Firemní akademie – zaučení, produktové školení',
      'Flexibilní časové sloty schůzek (plánuješ si sám)',
    ],
  },
  {
    slug: 'vedouci-pokladkove-party-msk',
    nazev: 'Vedoucí pokládkové party',
    region: 'moravskoslezsky-kraj',
    regionLabel: 'Moravskoslezský kraj',
    typ: 'v-terenu',
    typLabel: 'V terénu',
    perex: 'Hledáme zkušeného řemeslníka, který chce přijmout větší zodpovědnost a vést vlastní partu. Ideální pro někoho, kdo umí pracovat i s lidmi a chce kariérní posun.',
    naplnPrace: [
      'Vedení 2–3členné pokládkové party',
      'Organizace práce na zakázce, komunikace s koordinátorem',
      'Přímá pokládka podlah + dohled nad kvalitou práce party',
      'Přejímka zakázky od zákazníka, komunikace a servis',
      'Zodpovědnost za materiál a vybavení party',
    ],
    pozadujeme: [
      'Min. 2 roky zkušeností s pokládkou podlah',
      'Zkušenosti s vedením lidí výhodou',
      'Řidičský průkaz sk. B',
      'Organizační schopnosti, schopnost řešit problémy v terénu',
      'Komunikativnost a přirozená autorita',
    ],
    nabizime: [
      'Mzda 45 000–60 000 Kč + manažerský motivační program',
      'Firemní auto i pro soukromé účely',
      'Telefon s paušálem',
      'Ubytování / příspěvek na ubytování pro dojíždějící',
      'Jasná kariérní linka (vedoucí party → oblastní koordinátor)',
      'Vzdělávací kurzy a školení',
    ],
  },
  {
    slug: 'koordinator-zakazek-msk',
    nazev: 'Koordinátor zakázek / dispečer',
    region: 'moravskoslezsky-kraj',
    regionLabel: 'Moravskoslezský kraj',
    typ: 'kancelar',
    typLabel: 'Kancelář',
    perex: 'Hledáme organizačního tahouna, který bude mozkem naší logistiky. Koordinuješ pokládkové party, zákazníky a termíny – bez tebe by to nešlo.',
    naplnPrace: [
      'Plánování a koordinace pokládkových part (termíny, lokality, materiál)',
      'Komunikace se zákazníky – potvrzování termínů, řešení změn',
      'Zpracování objednávek materiálu a sledování skladu',
      'Spolupráce s obchodními zástupci (přebírání zakázek)',
      'Řešení operativních situací v reálném čase',
    ],
    pozadujeme: [
      'Zkušenost s koordinací, dispečinkem nebo operativou výhodou',
      'Výborná organizace času, multitasking',
      'Komunikativnost – telefon a e-mail jsou tvůj hlavní nástroj',
      'Základní práce s PC (Excel nebo Google Sheets, e-mail)',
      'Klidná hlava pod tlakem',
    ],
    nabizime: [
      'Mzda 32 000–42 000 Kč + prémie',
      'Stálá pracovní doba (Po–Pá, kancelář v MSK)',
      'Mobilní telefon',
      'Vzdělávací kurzy',
      'Firemní akce, Multisport karta',
      'Volné víkendy a svátky',
      'Přátelský tým, přímá komunikace s vedením',
    ],
  },
]
