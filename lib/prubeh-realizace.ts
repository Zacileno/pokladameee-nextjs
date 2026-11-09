// Výchozí texty stránky /prubeh-realizace (podklad od Adama, 29. 10. 2026).
// Stejná data slouží jako fallback, když Sanity nic nevrátí, i jako počáteční
// obsah dokumentu prubehRealizaceStranka ve Studiu.

export type PtSpan = { _type: 'span'; _key: string; text: string; marks: string[] }
export type PtBlock = {
  _type: 'block'
  _key: string
  style: 'normal'
  markDefs: { _type: string; _key: string; hodnota?: string }[]
  children: PtSpan[]
  listItem?: 'bullet'
  level?: number
}

export type PrubehBlok = { _key: string; _type: 'blok'; cislo?: string; nadpis?: string; obsah?: PtBlock[] }
export type PrubehFoto = { asset?: { _ref: string }; alt?: string; popisek?: string }
export type PrubehKapitola = { _key: string; _type: 'kapitola'; stitek?: string; nadpis?: string; uvod?: PtBlock[]; fotky?: PrubehFoto[]; bloky?: PrubehBlok[] }
export type PrubehFakt = { _key: string; _type: 'fakt'; nadpis?: string; text?: string }

export type PrubehRealizaceStranka = {
  nadpis?: unknown
  uvod?: PtBlock[]
  fakta?: PrubehFakt[]
  prehledNadpis?: string
  prehledText?: string
  kapitoly?: PrubehKapitola[]
  ctaNadpis?: string
  ctaText?: string
  ctaTlacitko?: string
}

let n = 0
const key = () => `k${(n++).toString(36)}`

// mini zápis: každý řádek = nový odstavec, "- " = odrážka, **tučně**
function pt(zapis: string): PtBlock[] {
  return zapis.trim().split(/\n+/).map((radek): PtBlock => {
    const odrazka = radek.startsWith('- ')
    const text = odrazka ? radek.slice(2) : radek
    const children: PtSpan[] = text.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((kus): PtSpan => {
      const tucne = kus.startsWith('**')
      return { _type: 'span', _key: key(), text: tucne ? kus.slice(2, -2) : kus, marks: tucne ? ['strong'] : [] }
    })
    return { _type: 'block', _key: key(), style: 'normal', markDefs: [], children, ...(odrazka ? { listItem: 'bullet' as const, level: 1 } : {}) }
  })
}

const blok = (nadpis: string, obsah: string, cislo?: string): PrubehBlok => ({ _key: key(), _type: 'blok', ...(cislo ? { cislo } : {}), nadpis, obsah: pt(obsah) })
const kapitola = (stitek: string, nadpis: string, uvod: string, bloky: PrubehBlok[]): PrubehKapitola => ({ _key: key(), _type: 'kapitola', stitek, nadpis, uvod: uvod ? pt(uvod) : [], bloky })

const C1 = 'Část 1 · Profesionální pokládka'
const C2 = 'Část 2 · Cesta zakázky'

export const PRUBEH_VYCHOZI: Required<Omit<PrubehRealizaceStranka, 'nadpis'>> = {
  uvod: pt(`
U Pokládámeee zajišťujeme **kompletní službu od A do Z**, od prvního telefonátu až po předání. Pomůžeme vybrat podlahu, posoudíme podklad a podle dohodnutého rozsahu zajistíme materiál, odstranění původní krytiny, potřebné opravy, pokládku i dokončení.
Konkrétní práce a související služby vždy pojmenujeme v nabídce, abyste věděli, co přebíráme my a co je potřeba připravit u vás.
`),
  fakta: [
    { _key: key(), _type: 'fakt', nadpis: 'Zaměření zdarma', text: 'Běžně do 48 hodin od poptávky, přímo u vás doma.' },
    { _key: key(), _type: 'fakt', nadpis: 'Nabídka do 1–2 dnů', text: 'Po upřesnění rozsahu dostanete konkrétní cenu.' },
    { _key: key(), _type: 'fakt', nadpis: 'Služba od A do Z', text: 'Koordinujeme celý dohodnutý rozsah, od výběru po předání.' },
  ],
  prehledNadpis: 'Cesta zakázky od zavolání po předání',
  prehledText: 'Dvanáct kroků, kterými vás provedeme. Kliknutím na krok se dostanete k podrobnostem.',
  kapitoly: [
    kapitola(C1, 'Co zahrnuje profesionální pokládka', '', [
      blok('Nejdříve zjistíme, co je pod podlahou', `
Podklad je základ, na který přijde nová krytina. Může jít o beton, potěr, desky, parkety nebo původní dlažbu. Ověřujeme jeho **rovnost, pevnost, stabilitu a vlhkost**. Současně kontrolujeme výslednou výšku u dveří, prahů a sousedních místností. Každá krytina má jiné požadavky a podle nich volíme přípravu.
`),
      blok('Odstraníme domluvené původní vrstvy', `
Pokud je to součástí zakázky, odstraníme starou podlahu a příslušné lišty, **zajistíme odvoz i likvidaci**. Právě po demontáži se někdy ukáže skutečný stav: další vrstva lina, zbytky lepidla, popraskaný potěr nebo uvolněné desky. To, co je zakryté, nelze při běžném zaměření úplně prověřit. Po odkrytí proto podklad zkontrolujeme znovu.
`),
      blok('Připravíme pevný a čistý základ', `
Podle stavu podkladu obrousíme výstupky, odstraníme nevhodné zbytky a nesoudržné části, opravíme poškozená místa a povrch zbavíme prachu. Pokud se podklad hýbe, rozpadá nebo zůstává vlhký, nejprve řešíme příčinu. **Nová podlaha tyto problémy sama neodstraní.** Potřebný postup vám vysvětlíme před pokračováním prací.
`),
    ]),
    kapitola(C1, 'Co znamená, když se bude nivelovat', `
**Nivelace znamená vyrovnání podkladu speciální hmotou.** Po přípravě povrchu ji naneseme a rozprostřeme tak, aby vznikl dostatečně rovný a hladký základ pro vybranou podlahu. Je to samostatná etapa realizace, která potřebuje materiál, práci a čas na vyschnutí.
`, [
      blok('Proč může být vyrovnání potřeba', `
U tenkého PVC nebo lepeného vinylu se mohou nerovnosti a spáry podkladu později ukázat na povrchu. U zámkových podlah mohou způsobovat pohyb dílců a namáhání spojů. Někde stačí lokální oprava nebo broušení, jinde je vhodné vyrovnat celou plochu. **Nivelaci proto neurčujeme automaticky pro každou místnost.**
`),
      blok('Jak práce probíhají', `
Nejprve připravíme podklad a ošetříme jej vhodným přípravným nátěrem. Penetrace upravuje savost nebo pomáhá další vrstvě přilnout. Na hladkých nesavých površích může být potřeba jiný typ přípravy, například adhezní můstek, tedy nátěr podporující spojení vrstev. Výběr závisí na podkladu a použité hmotě.
Následně provedeme vyrovnání v potřebné tloušťce. Vrstva může být v jednotlivých místech různě vysoká, protože vychází z naměřených nerovností. Po vytvrdnutí a dostatečném vyschnutí povrch podle použitého systému přebrousíme, vyčistíme a ověříme jeho připravenost pro krytinu.
`),
      blok('Co to znamená pro běžný provoz domácnosti', `
Místnost musí být po dohodnutou dobu vyklizená a nová vrstva se nesmí předčasně zatěžovat. Pokud se vyrovnává chodba, je potřeba předem vyřešit i přístup do ostatních místností. **Realizace tak může proběhnout ve více návštěvách.** Doba, kdy je prostor mimo provoz, může být delší než čas, který u vás skutečně tráví parta.
Možnost opatrně chodit po vyrovnávací vrstvě ještě neznamená, že na ni lze ihned položit podlahu nebo vrátit nábytek. Přestávku určují použité materiály, tloušťka vrstvy, teplota i vlhkost. Vždy vám sdělíme konkrétní režim pro vaši zakázku.
`),
      blok('Co nivelace vyřeší a co vyžaduje jiné řešení', `
Nivelace upravuje povrch vhodného podkladu. Pohybující se prkna, uvolněné parkety, zásadně poškozená konstrukce nebo zdroj vlhkosti mohou vyžadovat další zásah. Rovný povrch pro pokládku také nemusí znamenat dokonale vodorovnou podlahu celého staršího domu. Pokud potřebujete srovnat i celkový sklon, řešíme to výslovně při návrhu.
`),
    ]),
    kapitola(C1, 'Jak probíhá samotná pokládka', `
Před začátkem ověříme připravenost podkladu, správnost materiálu a podmínky v místnosti. Krytinu podle pokynů výrobce necháme přizpůsobit prostředí. Rozvrhneme směr pokládky, návaznost dekoru a rozložení dílců nebo pásů. **Pečlivé rozměření pomáhá zvládnout i šikmé stěny, výklenky a přechody mezi místnostmi.**
`, [
      blok('Lepený vinyl', `
Jednotlivé dílce lepíme na hladký připravený podklad. Přesně je zařízneme u stěn, zárubní a dalších překážek a přitlačíme podle předepsaného postupu. Důležitá je příprava podkladu i správná práce s lepidlem. Po dokončení je nutné dodržet jeho vytvrzení a povolený způsob zatížení. **Skladba do rybí kosti** vyžaduje samostatné rozvržení a více práce než běžná prkenná skladba.
`),
      blok('Zámková podlaha SPC nebo click vinyl', `
Dílce spojujeme pomocí zámků. U plovoucího provedení nejsou přilepené k podkladu. I tak potřebují pevný a dostatečně rovný základ. U stěn a dalších pevných částí ponecháváme prostor pro předepsaný pohyb podlahy, kterému se říká **dilatace**. Tuto možnost pohybu musí zachovat i dokončení u lišt a přechodů.
Podložku vybíráme podle konkrétní podlahy a jejích montážních pokynů. Některé výrobky ji mají už z výroby. Další vrstva se proto nepřidává automaticky a podložka nenahrazuje nutné opravy podkladu.
`),
      blok('PVC v roli', `
Materiál rozvrhneme podle tvaru místnosti, šířky role a případných spojů. Přesně jej zařízneme kolem stěn a dalších detailů. Způsob připevnění a provedení spojů určíme podle výrobku, velikosti plochy a způsobu používání. Nelze obecně slíbit, že se každé PVC pouze volně položí. **U tenké krytiny je zvlášť důležité, aby se vady podkladu neprokreslily na povrch.**
`),
      blok('Koberec a dřevěná podlaha', `
U koberce řešíme rozvržení pásů, směr vlasu, případné napojení, připevnění a zakončení okrajů podle typu výrobku a využití prostoru. U dřevěných podlah volíme postup podle konkrétního systému. Důležité jsou také vhodné podmínky v místnosti a vlhkost podkladu. Předem vám vysvětlíme, co váš materiál potřebuje při pokládce i následném používání.
`),
      blok('Proč objednáváme více materiálu, než činí plocha pokoje', `
Krytinu musíme přizpůsobit místnosti, směru a vzoru. Část se spotřebuje na řezy; objednávku ovlivňuje také šířka role nebo celé balení dílců. Proto se dodané množství může lišit od skutečné plochy pokládky. **Potřebný prořez a zaokrouhlení zohledníme v nabídce.**
`),
    ]),
    kapitola(C1, 'Lištování a dokončení všech návazností', '', [
      blok('Obvodové lišty a přechodové profily', `
Obvodové lišty dokončují napojení podlahy na stěny a zakrývají její okraj podle zvoleného systému. Řešíme jejich dekor, výšku, rohy, kouty i zakončení. Přechodové profily propojují různé krytiny, překrývají potřebné oddělení ploch nebo řeší výškový rozdíl. Jejich umístění a vzhled probíráme při zaměření, protože mají vliv na výsledek i pohodlné používání.
`),
      blok('Dveře a drobné detaily', `
Krytinu přesně přizpůsobíme zárubním, trubkám a dalším konstrukcím. Tmelení nebo silikonování používáme tam, kde odpovídá danému detailu a systému podlahy. Pokud nová skladba vyžaduje zkrácení dveří nebo návaznou zednickou opravu, domluvíme konkrétní řešení a rozsah. **Tyto práce je potřeba uvést v nabídce samostatně.**
`),
      blok('Běžné situace, které ovlivní postup', `
- **Podklad je nerovný.** Podle měření navrhneme broušení, lokální opravy nebo vyrovnání celé plochy. Samotná nová krytina nerovnosti nespraví.
- **Staré parkety nebo desky se hýbou.** Nejdříve ověříme příčinu a navrhneme stabilní základ. Vhodným řešením může být upevnění, výměna vrstev nebo jiná skladba; postup stanovíme podle skutečného stavu.
- **Chcete zachovat dlažbu.** U vhodného systému může pevná dlažba zůstat. Prověříme její stav, soudržnost, spáry, nerovnosti a výslednou výšku. Uvolněná nebo poškozená místa musíme nejprve vyřešit.
- **Podklad je vlhký.** Nejdříve je potřeba zjistit příčinu a určit vhodný postup. Pokládka může vyžadovat delší čekání nebo odborné opatření. Termín upřesníme podle ověřených podmínek.
- **V bytě se dál bydlí.** Dohodneme umístění nábytku, přístup a případné rozdělení na etapy. Musí to umožnit technologie, dostupný prostor i návaznosti podlah. Více etap může znamenat více návštěv a jinou cenu.
`),
      blok('Po dokončení prostor připravíme k předání', `
Odstraníme zbytky po sjednaných pracích a zkontrolujeme podlahu, lišty, přechody a zakončení. Společně projdeme výsledek a vysvětlíme vám další používání. Pokud potřebujete větší rozsah úklidu nebo vrácení nábytku, dohodneme jej jako součást zakázky.
`),
    ]),
    kapitola(C2, 'Od zavolání po cenovou nabídku', `
Můžete se na nás obrátit s hotovou představou i jen s potřebou vyměnit podlahu. **Provedeme vás výběrem a zařídíme dohodnutou realizaci.** Předem vysvětlíme, co bude potřeba, kdo co zajistí a jak práce ovlivní provoz domácnosti.
`, [
      blok('První zavolání nebo odeslání poptávky', `
Zjistíme, kde se bude realizovat, které místnosti řešíte, přibližnou plochu a požadovaný termín. Zeptáme se na původní krytinu, představu o nové podlaze a na to, zda se v prostoru bydlí. Zaznamenáme kontakt a domluvíme návštěvu technika. Pokud máte fotografie, pomohou nám připravit se na zaměření. **Přesný rozměr ani odborné znalosti při prvním zavolání nepotřebujete.**
`, '1'),
      blok('Bezplatné zaměření a konzultace na místě', `
Technik změří prostor, prohlédne dostupný podklad a s pomocí vzorků probere vhodné materiály a dekory. Ptá se na běžné používání místností, děti, domácí zvířata, kolečkové židle nebo podlahové vytápění, aby doporučení odpovídalo skutečným potřebám.
Při návštěvě řešíme zejména:
- rozměry a členění místností, směr pokládky, návaznosti a potřebný materiál včetně prořezu,
- viditelný stav podkladu, rovnost, výšky a vlhkost vhodnou metodou; co lze potvrdit až po odkrytí,
- obvodové lišty, přechody, dveře, prahy, schody a další detaily,
- demontáž staré krytiny, odvoz, likvidaci, nábytek a případné práce po etapách,
- přístup, parkování, výnos, výtah, skladování materiálu a návaznost dalších řemesel.
Domluvený rozsah zaznamenáme a pořídíme potřebné fotografie pro přípravu nabídky a realizační tým. Dostanete srozumitelné doporučení a vysvětlení podmínek, které mohou ovlivnit cenu nebo termín.
`, '2'),
      blok('Konkrétní cenová nabídka', `
Na základě zaměření připravíme nabídku na domluvenou krytinu, přípravu podkladu, pokládku a dokončení. Uvedeme i sjednané související služby, například demontáž, odvoz, výnos nebo manipulaci s nábytkem. Pokud počítáme s určitou tloušťkou nivelace či stavem skrytých vrstev, uvedeme tento předpoklad a vysvětlíme postup při odlišném nálezu. **Máte rozumět celkové ceně i tomu, za co ji platíte.**
`, '3'),
    ]),
    kapitola(C2, 'Odsouhlasení a příprava realizace', '', [
      blok('Projdeme nabídku a doladíme výběr', `
Po zaslání nabídky s vámi dořešíme otázky, případné varianty materiálu, dekor a rozsah prací. Pokud se neozvete sami, třetí den se vám připomeneme. Jakoukoli změnu rozsahu nebo ceny promítneme do odsouhlasených podkladů. **Než začneme materiál objednávat, musí být jasné, na čem jsme se dohodli.**
`, '4'),
      blok('Potvrzení zakázky a záloha', `
Po odsouhlasení nabídky vystavíme zálohovou fakturu, **standardně na 50 % ceny**, pokud není dohodnuto jinak. Po úhradě zajistíme materiál a navážeme další přípravu. Výše zálohy i platební podmínky patří do konkrétní dohody; například u realizací s větším časovým odstupem mohou být individuální.
`, '5'),
      blok('Materiál a konkrétní harmonogram', `
Koordinujeme dostupnost krytiny, lišt, profilů a potřebné stavební chemie s kapacitou realizačního týmu. Termín musí zohlednit také připravenost prostoru a přestávky mezi jednotlivými vrstvami. **Potvrdíme vám, kdy přijedeme**, zda proběhne více návštěv a po jakou dobu bude prostor omezený. Pokud se podmínky změní, domluvíme upravený postup.
`, '6'),
      blok('Příprava domácnosti a předání informací partě', `
Před zahájením si rozdělíme konkrétní úkoly. Navazující podlahářské práce, které si objednáte u nás, nemusíte sami shánět. Potřebujete ale přesně vědět, co zajistit před naším příjezdem:
- které plochy budou vyklizené a kdo přesune nábytek; těžké kusy, vestavby a spotřebiče řešíme zvlášť,
- jak se dostaneme do objektu, kdo bude kontaktní osoba a kudy lze materiál vyložit a vynést,
- kde může být materiál uložený, dostupnost elektřiny a podle prací také vody,
- jak se během prací omezí vstup do místností a pohyb dětí a domácích zvířat,
- návaznost na malování, kuchyň, dveře a další řemesla a potřebný režim podlahového topení.
Realizační tým od nás dostane zaměření, fotografie, odsouhlasený materiál a rozsah i důležité poznámky k podkladu a přístupu. **Při příjezdu party tak nemusíte znovu vysvětlovat celou zakázku.**
`, '7'),
    ]),
    kapitola(C2, 'Práce u vás a řešení zjištěných změn', '', [
      blok('Příjezd a kontrola podmínek', `
Na místě projdeme sjednaný rozsah, připravenost místností, přístup a materiál. Domluvíme organizaci práce a ochranu dotčených navazujících částí prostoru podle povahy zakázky. Víte, na koho se obrátit s dotazem a které místnosti bude možné používat.
`, '8'),
      blok('Demontáž a příprava podkladu', `
Provedeme objednanou demontáž a po odkrytí podlahy ověříme skutečný stav. Následují sjednané opravy, broušení, přípravné nátěry a případná nivelace. Pokud je podklad připravený už předem, zkontrolujeme jeho vhodnost pro vybranou krytinu. To platí i tehdy, když jste si část přípravy zajišťovali sami.
V této etapě mohou vzniknout přestávky, během kterých u vás nikdo nepracuje. Materiály ale stále tvrdnou nebo vysychají. Před navazující pokládkou ověříme, že je možné pokračovat. **Předem dohodnutý harmonogram proto popisuje i tyto intervaly** a omezení pohybu.
`, '9'),
      blok('Jak postupujeme při problému, který nebyl vidět', `
Pokud po demontáži najdeme například uvolněné desky, rozpadlý potěr, větší nerovnosti nebo vlhkost, nález vám ukážeme a vysvětlíme. Navrhneme potřebné řešení, vyčíslíme změnu a sdělíme dopad do termínu. **Změnu rozsahu a ceny si necháme odsouhlasit před provedením prací.**
Rozhodujete tak na základě konkrétních informací. Potřebnou opravu nepřekryjeme novou krytinou a její cenu nedořešujeme až u hotové práce.
`),
      blok('Pokládka a dokončení', `
Na připravený podklad položíme krytinu domluveným způsobem, namontujeme lišty a přechody a dokončíme dohodnuté detaily. Zajistíme sjednaný odvoz zbytků a **úklid po našich pracích**. Případné vrácení nábytku proběhne v dohodnutém rozsahu a až tehdy, kdy nové vrstvy dovolují potřebné zatížení.
`, '10'),
      blok('Jak může vypadat návaznost jednotlivých etap', `
U vhodného připraveného podkladu lze navázat přímo pokládkou a dokončením. Pokud odstraňujeme starou krytinu a vyrovnáváme podklad, přibývá přípravná etapa a nutná přestávka. U vlhkého nebo nestabilního základu stanovíme další harmonogram po vyřešení příčiny. **Každá z těchto situací potřebuje jiný čas**; jednotný počet dnů by vás mohl uvést v omyl.
`),
      blok('Jak dlouho to celé trvá', `
Běžným cílem je **bezplatné zaměření do 48 hodin** a **nabídka do 1–2 dnů** po upřesnění rozsahu.
Podlahu do týdne zvládneme, pokud je materiál skladem, podklad je připravený, máme volnou kapacitu a technologické přestávky to dovolí. **Přesný termín vždy potvrdíme pro vaši konkrétní zakázku.** Dobu schnutí, nutnost nivelace ani doplňkové služby nelze slíbit univerzálně, určíme je podle skutečného stavu.
`),
    ]),
    kapitola(C2, 'Předání díla a následná péče', '', [
      blok('Společná kontrola a předávací protokol', `
Hotovou realizaci projdeme společně. Zkontrolujeme vzhled a provedení podlahy, lišty, přechody a dohodnuté detaily. **Předání zaznamenáme do protokolu** včetně případných výhrad a dohodnutého řešení. Máte prostor se zeptat a víte, co přebíráte.
Vysvětlíme, kdy je možné po podlaze chodit, vrátit nábytek a začít s běžným čištěním. Doporučíme vhodné ochranné podložky pod nábytek a způsob údržby konkrétní krytiny. U podlahového vytápění předáme potřebné pokyny k dalšímu provozu podle použitých materiálů.
`, '11'),
      blok('Konečné vyúčtování a kontakt po realizaci', `
Vystavíme konečné vyúčtování, ve kterém zohledníme uhrazenou zálohu a odsouhlasené změny. Následuje doplatek podle dohodnutých podmínek. **Můžete se na nás obrátit i po realizaci** s otázkami k používání a údržbě nebo s případným problémem. Budeme rádi za vaši zpětnou vazbu či recenzi.
`, '12'),
    ]),
  ],
  ctaNadpis: 'Začneme bezplatným zaměřením',
  ctaText: 'Popište nám, co potřebujete. Ozveme se, domluvíme termín zaměření a provedeme vás celou realizací.',
  ctaTlacitko: 'Chci nezávazné zaměření',
}
