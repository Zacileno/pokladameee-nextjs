import type { Metadata } from 'next'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'Obchodní podmínky | pokládámeee.cz',
  description: 'Všeobecné obchodní podmínky společnosti SYSPOD s.r.o. — pokládka vinylových podlah v Moravskoslezském kraji.',
}

const h2Style: React.CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
  color: '#154C86',
  marginTop: 40,
  marginBottom: 12,
}

const pStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.7,
  color: '#000',
  marginBottom: 16,
}

const olStyle: React.CSSProperties = {
  paddingLeft: 20,
  marginBottom: 16,
}

const liStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.7,
  color: '#000',
  marginBottom: 6,
}

const aStyle: React.CSSProperties = {
  color: '#FF8800',
  textDecoration: 'underline',
}

export default function ObchodniPodminkyPage() {
  return (
    <>
      <Header opaque />
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '120px 24px 80px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#154C86', marginBottom: 8 }}>
          Všeobecné obchodní podmínky
        </h1>
        <p style={{ fontSize: 14, color: '#666', marginBottom: 32 }}>SYSPOD s.r.o. · platné od 1. 6. 2026</p>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>Čl. I – Úvodní ustanovení</h2>
          <ol style={olStyle}>
            <li style={liStyle}>Tyto všeobecné obchodní podmínky (dále jen „VOP") obchodní společnosti SYSPOD s.r.o., IČO: 295 24 083, se sídlem Ostravská 38, Vrbice, 735 51 Bohumín (dále jen „zhotovitel") upravují v souladu s ustanovením § 1751 odst. 1 zákona č. 89/2012 Sb., občanský zákoník, v platném znění (dále jen „OZ") vzájemná práva a povinnosti smluvních stran vzniklé v souvislosti nebo na základě smlouvy o dílo (dále jen „smlouva o dílo") uzavírané mezi zhotovitelem a jinou fyzickou nebo právnickou osobou (dále jen „objednatel") za použití prostředků komunikace na dálku nebo na místě určeném zhotovitelem, jakož i vzájemná práva a povinnosti smluvních stran vzniklé na základě smlouvy o dílo spočívající v dodání a instalaci podlahových krytin a příslušenství (dále jen „věci k provedení díla"), uzavírané mezi zhotovitelem a jinou fyzickou nebo právnickou osobou. Dílem se rozumí pokládka a instalace podlahové krytiny, jak je vymezena ve smlouvě o dílo.</li>
            <li style={liStyle}>Neadresovaná nabídka k uzavření smlouvy o dílo je zhotovitelem umístěna na webové stránce s formulářem pro nezávaznou poptávku umístěnou na internetové adrese https://www.pokladameee.cz (dále jen „www stránky"), a to prostřednictvím rozhraní webové stránky.</li>
            <li style={liStyle}>Ustanovení odchylná od VOP je možné sjednat ve smlouvě o dílo. Odchylná ujednání ve smlouvě o dílo mají přednost před ustanoveními VOP.</li>
            <li style={liStyle}>Ustanovení VOP jsou nedílnou součástí smlouvy o dílo. Smlouva o dílo a VOP jsou vyhotoveny v českém jazyce. Smlouva o dílo je uzavírána pouze v českém jazyce. Pokud vznikne pro potřebu objednatele překlad textu smlouvy o dílo, platí, že v případě sporu o výklad pojmů platí výklad smlouvy o dílo v českém jazyce.</li>
            <li style={liStyle}>Znění VOP může zhotovitel jednostranně měnit či doplňovat dle § 1752 OZ.</li>
          </ol>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>Čl. II – Uzavření smlouvy o dílo</h2>
          <ol style={olStyle}>
            <li style={liStyle}>Veškerá prezentace věcí k provedení díla umístěná ve webovém rozhraní obchodu je informativního charakteru a nepředstavuje závaznou nabídku dle § 1732 OZ, nýbrž jen výzvu k podání nabídky dle § 1733 OZ, tudíž zhotovitel není povinen uzavřít smlouvu o dílo ohledně těchto věcí k provedení díla. Ustanovení § 1732 odst. 2 občanského zákoníku se nepoužije.</li>
            <li style={liStyle}>Webové rozhraní www stránek obsahuje informace o věcech k provedení díla, bez uvedení cen jednotlivých věcí k provedení díla a nákladů na pokládku a nákladů spojených s dodáním věcí k provedení díla k objednateli.</li>
            <li style={liStyle}>V případě učinění poptávky objednatelem prostřednictvím www stránek zhotovitele vyplní objednatel poptávkový formulář na www stránkách, v němž uvede své jméno, příjmení, e-mail, místo, kde má být dílo zhotoveno, telefon a o jakou konkrétní věc k provedení díla má zájem. Do části „Zpráva" může objednatel uvést skutečnosti, které považuje za důležité pro stanovení cenové nabídky. Poptávku objednatel odešle kliknutím na tlačítko „ODESLAT". Údaje uvedené v poptávce jsou zhotovitelem považovány za správné. Zhotovitel obdržení poptávky objednateli potvrdí elektronickou poštou, a to na adresu elektronické pošty objednatele uvedenou v poptávkovém formuláři. Konkrétní cenová nabídka na provedení díla bude objednateli učiněna až po obdržení všech potřebných informací od objednatele, zpravidla po zaměření prostoru.</li>
            <li style={liStyle}>Objednatel může učinit poptávku rovněž prostřednictvím telefonátu či e-mailu na kontaktní údaje uvedené na www stránkách zhotovitele. V e-mailové zprávě nebo v telefonátu je objednatel povinen uvést své jméno, příjmení, e-mail, místo, kde má být dílo zhotoveno, telefon a o jakou konkrétní věc k provedení díla má zájem. V případě poptávky učiněné prostřednictvím e-mailu se zhotovitel s objednatelem spojí prostřednictvím e-mailu na e-mailovou adresu, ze které byla poptávka odeslána, či na telefonní číslo, které bylo v poptávce uvedeno. Konkrétní cenová nabídka na provedení díla bude objednateli učiněna až po obdržení všech potřebných informací od objednatele.</li>
            <li style={liStyle}>Cena díla zahrnuje cenu jednotlivých věcí k provedení díla (podlahových krytin a příslušenství), náklady na pokládku a instalaci, náklady spojené s dopravou, to vše včetně daně z přidané hodnoty v zákonné výši a souvisejících poplatků (dále jen „cena díla").</li>
            <li style={liStyle}>Smlouva o dílo je uzavřena podpisem písemného návrhu smlouvy o dílo smluvními stranami, anebo je uzavřena v okamžiku, kdy zhotovitel doručí objednateli bezvýhradně odsouhlasenou potvrzenou objednávku objednatele a současně uhrazením zálohy až do výše 70 % celkové ceny díla, jejíž úhrada je zhotovitelem stvrzena objednateli vystavením příjmového pokladního dokladu v případě hotovostní platby; v případě úhrady prostřednictvím platebního terminálu nebo bankovním převodem se za uhrazení zálohy považuje úhrada částky uvedená na zálohové faktuře vystavené zhotovitelem. Závaznou výši zálohy z celkové ceny díla stanovuje zhotovitel. Po provedení pokládky je zhotovitel povinen objednateli předat předávací protokol a VOP.</li>
            <li style={liStyle}>Smlouvou o dílo se zhotovitel zavazuje dodat objednateli dílo specifikované ve smlouvě. Dílo může být specifikováno i odkazem na nabídku zhotovitele či odkazem na zhotovitelem bezvýhradně odsouhlasenou potvrzenou objednávku objednatele. Eventuální změny díla či jeho provádění po uzavření smlouvy o dílo budou sjednány v dodatku ke smlouvě o dílo, popř. oběma stranami akceptovanou změnou objednávky. Objednatel se zavazuje dílo převzít a zaplatit za něj zhotoviteli sjednanou cenu díla.</li>
            <li style={liStyle}>Objednatel souhlasí s použitím komunikačních prostředků na dálku při uzavírání smlouvy o dílo. Náklady vzniklé objednateli při použití komunikačních prostředků na dálku v souvislosti s uzavřením smlouvy o dílo (náklady na internetové připojení, náklady na telefonní hovory) si hradí objednatel sám.</li>
            <li style={liStyle}>Zhotovitel je svou nabídkou vázán po dobu 14 dnů od data, kdy byla nabídka odeslána objednateli, není-li v nabídce výslovně uvedeno jinak. Smluvní strany ujednávají, že odpověď s dodatkem nebo odchylkou, která podstatně nemění podmínky nabídky, není přijetím nabídky ve smyslu § 1740 odst. 3 OZ. Nabídka zhotovitele na uzavření smlouvy o dílo je vždy odvolatelná a lze ji odvolat, pokud odvolání dojde objednateli před doručením přijetí nabídky zhotoviteli.</li>
          </ol>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>Čl. III – Odstoupení od smlouvy o dílo a ukončení smlouvy o dílo dohodou</h2>
          <ol style={olStyle}>
            <li style={liStyle}>Objednatel bere na vědomí, že dle § 1837 písm. d) OZ nemůže odstoupit od smlouvy o dílo, neboť se jedná o zboží, které je vyrobeno nebo připraveno podle požadavků objednatele nebo přizpůsobené jeho osobním potřebám (podlahová krytina vybraná, nastříhaná a objednaná na míru konkrétního prostoru).</li>
            <li style={liStyle}>Smlouvu o dílo je možné ukončit písemnou dohodou uzavřenou mezi zhotovitelem a objednatelem, a to až do doby, než bude materiál k provedení díla specifikovaný ve smlouvě o dílo závazně objednán u dodavatele. Zda je tímto způsobem možné smlouvu o dílo ukončit, sdělí zhotovitel objednateli na jeho písemnou žádost. V případě uzavření dohody o ukončení smlouvy o dílo je zhotovitel povinen ke dni ukončení smlouvy o dílo vrátit objednateli veškerá peněžitá plnění obdržená od objednatele po uzavření smlouvy o dílo, ponížená o částku 1 500 Kč, která představuje paušální náhradu nákladů zhotovitele souvisejících s administrativní činností vynaloženou na zpracování objednávky objednatele dle smlouvy o dílo až do jejího ukončení. Požadavek písemné formy jednání dle tohoto odstavce je splněn i jednáním prostřednictvím prostých e-mailů (bez tzv. zaručeného elektronického podpisu).</li>
          </ol>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>Čl. IV – Cena díla</h2>
          <ol style={olStyle}>
            <li style={liStyle}>Cena díla je objednateli stanovena cenovou nabídkou zhotovitele zaslanou písemně e-mailem či sdělenou telefonicky. Cena díla je platná v okamžiku odeslání (sdělení) cenové nabídky. V případě, že se DPH do uzavření smlouvy o dílo změní, je objednatel povinen uhradit nedoplatek ceny díla, popř. zhotovitel neprodleně kontaktuje objednatele s výzvou o sdělení, kam je možné uhradit objednateli přeplatek ceny díla.</li>
            <li style={liStyle}>Případné slevy z ceny díla poskytnuté zhotovitelem objednateli nelze vzájemně kombinovat.</li>
            <li style={liStyle}>
              Cena díla je splatná následovně:
              <ol type="a" style={{ paddingLeft: 20, marginTop: 8 }}>
                <li style={liStyle}>objednatel uhradí zálohu až ve výši 70 % ceny díla při zaměření prostoru (nebo při uzavření smlouvy o dílo), v hotovosti anebo prostřednictvím platebního terminálu nebo bankovním převodem; a</li>
                <li style={liStyle}>zbývající část ceny díla (po odečtení uhrazené zálohy dle písm. a. výše tohoto odstavce) bezprostředně po dokončení díla a vystavení daňového dokladu – konečné faktury s okamžitou splatností, a to v hotovosti, prostřednictvím platebního terminálu nebo bankovním převodem.</li>
              </ol>
            </li>
            <li style={liStyle}>Objednatel na sebe v souladu s ustanovením § 1765 odst. 2 OZ přebírá nebezpečí změny okolností.</li>
            <li style={liStyle}>Dojde-li v průběhu provádění díla bez zavinění zhotovitele k nutnosti provést dílo odchylně, k nutnosti provést další práce nebo dodat další věci určené pro provedení díla, v nabídce nebo ve smlouvě o dílo neuvedené (zejména z důvodu stavu podkladní vrstvy, nutnosti reprofilace podkladu, skrytých vad apod.), upozorní zhotovitel objednatele prokazatelným způsobem na tuto skutečnost spolu s uvedením dopadu takové změny díla na termín plnění díla a cenu díla. Zhotovitel je povinen provést takovou změnu díla pouze tehdy, dá-li s touto změnou díla, termínem plnění díla a cenou díla objednatel písemný souhlas. Výjimkou jsou pouze práce bezprostředně nutné k tomu, aby nedošlo ke vzniku škody na prováděném díle. Za takové práce či takto dodané věci náleží zhotoviteli cena, která bude ujednaná mezi zhotovitelem a objednatelem.</li>
            <li style={liStyle}>Bankovní poplatky objednatele spojené s platbami zhotoviteli hradí objednatel. Smluvní strany výslovně sjednávají, že objednatel nebude mít nárok na jakékoli zvýhodnění v případě, že uhradí cenu díla či její část před okamžikem její splatnosti.</li>
            <li style={liStyle}>Smluvní strany výslovně sjednávají, že objednatel není oprávněn pozdržet žádnou platbu jakékoli části ceny díla z důvodu vad díla nebo jiných tvrzených nároků objednatele vůči zhotoviteli.</li>
            <li style={liStyle}>Zhotovitel je oprávněn od smlouvy o dílo odstoupit, bude-li objednatel, přes písemnou výzvu zhotovitele k zaplacení v dodatečné lhůtě v délce 10 dnů, v prodlení s úhradou jakéhokoliv svého závazku.</li>
            <li style={liStyle}>Zhotovitel je oprávněn pozastavit plnění veškerých svých smluvních povinností vůči objednateli až do úplné úhrady všech svých splatných pohledávek, jež má za objednatelem. V takovém případě bude objednatel povinen nahradit zhotoviteli veškeré škody, náklady a výdaje jemu vzniklé.</li>
          </ol>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>Čl. V – Provádění díla, předání a převzetí díla, nabytí vlastnického práva</h2>
          <ol style={olStyle}>
            <li style={liStyle}>Objednatel se zavazuje poskytnout zhotoviteli potřebnou součinnost pro plnění závazků plynoucích zhotoviteli ze smlouvy o dílo a těchto VOP.</li>
            <li style={liStyle}>Zhotovitel se zavazuje provést dílo ve lhůtě dohodnuté ve smlouvě o dílo, zpravidla do 3 kalendářních týdnů ode dne zaměření prostoru v místě provádění díla; ustanovení čl. V odst. 3 VOP tím není dotčeno.</li>
            <li style={liStyle}>Termín zhotovení díla je závislý na termínech dodání věcí k provedení díla dodavateli zhotovitele a na disponibilní kapacitě pokládačů. Termíny dodání se mohou u jednotlivých druhů podlahových krytin lišit v závislosti na skladové dostupnosti a termínech dodání od výrobce. Zhotovitel se nedostane do prodlení s provedením díla, prokáže-li, že prodlení vzniklo v souvislosti s jednáním výrobců a dodavatelů věcí určených k provedení díla. Dodržení termínu předání díla je závislé na součinnosti ze strany objednatele, zejména na řádném předání všech podkladů, informací a věcí potřebných k provedení díla, umožnění vstupu do prostor, kde má být dílo provedeno, a uhrazení zálohy dle čl. IV odst. 3 písm. a. VOP.</li>
            <li style={liStyle}>Po dobu prodlení objednatele s poskytnutím součinnosti k provádění díla není zhotovitel v prodlení s plněním díla.</li>
            <li style={liStyle}>Zhotovitel neodpovídá za vady díla způsobené nevhodnými pokyny objednatele, nevhodnou dokumentací nebo nevhodným stavem podkladní vrstvy, na jehož použití objednatel trval i přes upozornění zhotovitele. Objednatel je povinen zajistit, aby podkladní vrstva splňovala technické požadavky pro pokládku zvolené podlahové krytiny (rovinnost, vlhkost, pevnost apod.); v opačném případě nese objednatel odpovědnost za vady díla vzniklé v důsledku nevyhovujícího podkladu.</li>
            <li style={liStyle}>Objednatel se zavazuje zajistit zhotoviteli takové podmínky, aby zhotovitel mohl provádět dílo. Zvláště je povinen zajistit pro zhotovitele a jeho pracovníky přístup, vstup a vjezd na místo, kde má být dílo provedeno, zabezpečit přístup k dodávce elektrické energie a vody, je-li jich k provedení díla třeba, vyklidit prostor a odstranit stávající podlahové krytiny (pokud není ve smlouvě o dílo sjednáno jinak), to vše po celou dobu provádění díla. V případě nesplnění těchto povinností ze strany objednatele se adekvátně prodlužuje termín dokončení díla.</li>
            <li style={liStyle}>Zhotovitel postupuje při plánování časového harmonogramu provádění díla tak, aby mohl dílo provést nerušeně najednou. Odhad doby provádění díla zhotovitel sdělí objednateli před jeho započetím. V případě, že po sdělení konkrétní doby provádění díla nebude moci zhotovitel provést dílo najednou převážně a/nebo z důvodů na straně objednatele, zavazuje se objednatel uhradit zhotoviteli paušální náklady spojené s dokončením díla ve výši 1 500 Kč za každé takové jednotlivé porušení. V této částce jsou zahrnuty náklady na marně vynaloženou dopravu a marně vynaloženou činnost pracovníků zhotovitele. Cenu za dílo navýšenou o tyto náklady je objednatel povinen uhradit v termínu spolu s doplatkem ceny díla dle smlouvy o dílo a těchto VOP. Po dobu pokračování v provádění díla po jeho přerušení z důvodů na straně objednatele není zhotovitel v prodlení s prováděním díla.</li>
            <li style={liStyle}>Pokud je třeba při provádění díla zhotovitelem zasáhnout do zařízení nebo instalací jiného výrobce či zhotovitele (např. podlahové vytápění), odpovídá objednatel sám za obdržení jeho souhlasu či pokynů, kterými podmiňuje případné dodržení jím vystavených záruk.</li>
            <li style={liStyle}>Zhotovitel zaručuje a odpovídá za možnost instalace díla v prostorách objednatele pouze pro způsob využití v rozsahu údajů a technických parametrů uvedených v nabídce zhotovitele. Totéž se týká jiného účelu užití díla či jeho kompatibility s jiným zařízením objednatele, pokud zhotovitel v tomto směru objednatele výslovně neujistil, že je to tak možné.</li>
            <li style={liStyle}>Způsob předání a převzetí díla, doba a místo předání a převzetí díla je sjednáno ve smlouvě o dílo. Zhotovitel je povinen předat dílo objednateli. Objednatel je povinen dílo převzít a zaplatit za něj ujednanou cenu díla.</li>
            <li style={liStyle}>Objednatel je povinen dílo převzít a převzetí potvrdit v předávacím protokolu. Tuto povinnost má i v případě, že má dílo vady a nedodělky, které samy o sobě, ani ve spojení s jinými nebrání užívání díla a ani významným způsobem užívání díla neztěžují. Veškeré výhrady je objednatel povinen uvést v předávacím protokolu.</li>
            <li style={liStyle}>Zhotovitel není v prodlení se svou povinností včas předat dílo, jestliže je toto prodlení způsobeno skutečnostmi, které nastaly nezávisle na vůli zhotovitele (tzv. vyšší moc), nebo pokud nastaly z důvodu na straně objednatele.</li>
            <li style={liStyle}>Termín předání díla se automaticky prodlužuje v případě prodlení objednatele se splněním jakékoliv jeho povinnosti vyplývající ze smlouvy o dílo nebo těchto VOP.</li>
            <li style={liStyle}>Dílo se považuje za splněné jeho převzetím objednatelem v místě předání a potvrzením předávacího protokolu nebo okamžikem, kdy objednatel odmítl převzít dílo nebo nepřevzal dílo v místě předání díla, nebo okamžikem, kdy objednatel odmítl potvrdit předávací protokol. Objednatel je vázán potvrzením předávacího protokolu osobou nacházející se v místě předání díla, neurčil-li ve smlouvě o dílo výslovně osobu oprávněnou k takovému potvrzení.</li>
            <li style={liStyle}>Nebezpečí škody na díle přechází na objednatele okamžikem převzetí díla od zhotovitele nebo okamžikem, který se považuje za převzetí díla objednatelem podle předchozího odstavce těchto VOP.</li>
            <li style={liStyle}>Objednatel nabude vlastnické právo k předmětu díla, zejména k věcem určeným k provedení díla dodaným zhotovitelem, okamžikem zaplacení celé ceny díla.</li>
            <li style={liStyle}>Do okamžiku nabytí vlastnického práva podle těchto VOP je objednatel povinen respektovat a ochraňovat vlastnické právo zhotovitele a do tohoto vlastnického práva nezasahovat. Objednatel je oprávněn s dílem disponovat a nakládat s ním způsobem ovlivňujícím jeho hodnotu až po nabytí vlastnického práva, pokud není výslovně ve smlouvě o dílo ujednáno jinak.</li>
          </ol>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>Čl. VI – Práva z vadného plnění, reklamace a záruka za jakost</h2>
          <ol style={olStyle}>
            <li style={liStyle}>Není-li výslovným prohlášením zhotovitele uvedeno jinak, jsou práva z vadného plnění, reklamace a záruka upraveny v reklamačním řádu.</li>
            <li style={liStyle}>Reklamační řád je nedílnou součástí smlouvy o dílo.</li>
          </ol>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>Čl. VII – Zaměření a pokládka</h2>
          <ol style={olStyle}>
            <li style={liStyle}>Zhotovitel provádí zaměření prostoru za účelem přípravy cenové nabídky a zadání požadavků na materiál zdarma. Objednatel je v takovém případě povinen uhradit zálohu za dílo ve výši až 70 % ceny díla v den zaměření nebo v den uzavření smlouvy o dílo dle čl. II odst. 6 VOP.</li>
          </ol>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>Čl. VIII – Další práva a povinnosti smluvních stran</h2>
          <ol style={olStyle}>
            <li style={liStyle}>Objednatel se zavazuje umožnit zhotoviteli přístup do místa budoucího provádění díla za účelem zaměření prostoru, a to v den a čase mezi nimi předem dohodnutém. V případě, že v tu dobu nebude objednatel v místě budoucího provádění díla přítomen, ani místo jinak nezpřístupní, je povinen uhradit zhotoviteli náklady na druhé a popřípadě následující zaměření (budou-li předchozí zaměření zmařena ze strany objednatele). Objednatel souhlasí s tím, že v takovém případě budou náklady na zaměření zhotovitelem promítnuty do ceny za dílo dle smlouvy o dílo a VOP. Cenu za dílo navýšenou o tyto náklady je objednatel povinen uhradit v termínu spolu s doplatkem ceny díla dle smlouvy o dílo a těchto VOP.</li>
            <li style={liStyle}>Zhotovitel a objednatel se zavazují uchovat v tajnosti veškeré informace získané v souvislosti se smlouvou o dílo, a to i po zániku smlouvy o dílo.</li>
            <li style={liStyle}>Zhotovitel není povinen hradit nepřímé a následné škody vzniklé porušením povinností v souvislosti se smlouvou o dílo. Za nepřímé a následné škody se považují zejména ušlý zisk, náklady spojené s nemožností užívat dílo, náklady na zajištění náhradního ubytování nebo bydlení, náklady kapitálu, škody vzniklé jako následek pozdního dokončení díla apod. Zhotovitel není povinen hradit škodu způsobenou objednateli vadou díla zhotovitele. Žádné z těchto uvedených omezení náhrady škody se nevztahuje na škodu způsobenou úmyslně nebo z hrubé nedbalosti.</li>
            <li style={liStyle}>Vyřizování stížností spotřebitelů zajišťuje zhotovitel prostřednictvím elektronické adresy <a href="mailto:podlahy@pokladameee.cz" style={aStyle}>podlahy@pokladameee.cz</a>. Informaci o vyřízení stížnosti objednatele zašle zhotovitel na elektronickou adresu objednatele.</li>
            <li style={liStyle}>K mimosoudnímu řešení spotřebitelských sporů ze smlouvy o dílo je příslušná Česká obchodní inspekce, se sídlem Štěpánská 796/44, 110 00 Praha 1, IČ: 000 20 869, internetová adresa: <a href="https://adr.coi.cz/cs" style={aStyle}>https://adr.coi.cz/cs</a>. Platformu pro řešení sporů on-line nacházející se na internetové adrese <a href="http://ec.europa.eu/consumers/odr" style={aStyle}>http://ec.europa.eu/consumers/odr</a> je možné využít při řešení sporů mezi zhotovitelem a objednatelem ze smlouvy o dílo.</li>
            <li style={liStyle}>Evropské spotřebitelské centrum Česká republika, se sídlem Štěpánská 567/15, 120 00 Praha 2 je kontaktním místem podle Nařízení Evropského parlamentu a Rady (EU) č. 524/2013 ze dne 21. května 2013 o řešení spotřebitelských sporů on-line a o změně nařízení (ES) č. 2006/2004 a směrnice 2009/22/ES (nařízení o řešení spotřebitelských sporů on-line).</li>
            <li style={liStyle}>Zhotovitel je oprávněn provádět dílo na základě živnostenského oprávnění. Živnostenskou kontrolu provádí v rámci své působnosti příslušný živnostenský úřad. Dozor nad oblastí ochrany osobních údajů vykonává Úřad pro ochranu osobních údajů. Česká obchodní inspekce vykonává ve vymezeném rozsahu mimo jiné dozor nad dodržováním zákona č. 634/1992 Sb., o ochraně spotřebitele, ve znění pozdějších předpisů.</li>
          </ol>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>Čl. IX – Ochrana osobních údajů</h2>
          <p style={pStyle}>Svou informační povinnost vůči objednateli ve smyslu čl. 13 Nařízení Evropského parlamentu a Rady 2016/679 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů a o volném pohybu těchto údajů a o zrušení směrnice 95/46/ES (obecné nařízení o ochraně osobních údajů) (dále jen „Nařízení GDPR") související se zpracováním osobních údajů objednatele pro účely plnění smlouvy o dílo, pro účely jednání o smlouvě o dílo a pro účely plnění veřejnoprávních povinností zhotovitele plní zhotovitel prostřednictvím zvláštního dokumentu (<a href="/ochrana-osobnich-udaju" style={aStyle}>Zásady ochrany osobních údajů</a>) dostupného na www stránkách.</p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>Čl. X – Doručování</h2>
          <p style={pStyle}>Smluvní strany akceptují doručování veškerých písemností prostřednictvím elektronické pošty bez zaručeného či uznávaného elektronického podpisu.</p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={h2Style}>Čl. XI – Závěrečná ustanovení</h2>
          <ol style={olStyle}>
            <li style={liStyle}>Strany smlouvy o dílo se dohodly, že všechny spory vznikající mezi nimi z takové smlouvy, jejíž součástí jsou i tyto VOP, a v souvislosti s ní, nebo s jejím uzavíráním, budou rozhodovány výlučně u soudů ČR, jejíž místní příslušnost bude výlučně určena dle sídla zhotovitele ke dni podání žaloby. Volbou příslušnosti podle předchozí věty není objednatel, který je spotřebitelem, zbaven ochrany, kterou mu poskytují ustanovení právního řádu, od nichž se nelze smluvně odchýlit, a jež by se v případě neexistence volby příslušnosti jinak použila dle Nařízení Evropského parlamentu a Rady (ES) č. 1215/2012 ze dne 12. 12. 2012 o příslušnosti a uznávání a výkonu soudních rozhodnutí v občanských a obchodních věcech (Nařízení Brusel I bis).</li>
            <li style={liStyle}>Pokud vztah založený uzavřenou smlouvou o dílo obsahuje mezinárodní (zahraniční) prvek, pak si smluvní strany sjednávají, že vztah se řídí českým právem. Volbou práva podle předchozí věty není objednatel, který je spotřebitelem, zbaven ochrany, kterou mu poskytují ustanovení právního řádu, od nichž se nelze smluvně odchýlit, a jež by se v případě neexistence volby práva jinak použila dle ustanovení čl. 6 odst. 1 Nařízení Evropského parlamentu a Rady (ES) č. 593/2008 ze dne 17. června 2008 o právu rozhodném pro smluvní závazkové vztahy (Řím I).</li>
            <li style={liStyle}>Je-li některé ustanovení VOP neplatné nebo neúčinné, nebo se takovým stane, namísto neplatných ustanovení nastoupí ustanovení, jehož smysl se neplatnému ustanovení co nejvíce přibližuje. Neplatností nebo neúčinností jednoho ustanovení není dotčena platnost ostatních ustanovení.</li>
            <li style={liStyle}>Tyto VOP nabývají platnosti a účinnosti dnem 1. 6. 2026.</li>
          </ol>
        </section>

        <p style={{ ...pStyle, marginTop: 40 }}>
          Přečtěte si také náš <a href="/reklamacni-rad" style={aStyle}>Reklamační řád</a>.
        </p>
      </main>
      <Footer />
    </>
  )
}
