import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reklamační řád | pokládámeee',
  description: 'Reklamační řád společnosti SYSPOD s.r.o. — pokládka vinylových podlah v Moravskoslezském kraji.',
}

const s = {
  wrapper: { maxWidth: 860, margin: '120px auto 80px', padding: '0 24px', fontFamily: 'Barlow, sans-serif' } as React.CSSProperties,
  h1: { fontSize: '2rem', fontWeight: 700, color: '#154C86', marginBottom: 4 } as React.CSSProperties,
  subtitle: { color: '#666', marginBottom: 24, fontSize: '0.95rem' } as React.CSSProperties,
  hr: { border: 'none', borderTop: '2px solid #FFE9CF', margin: '24px 0 32px' } as React.CSSProperties,
  h2: { fontSize: '1.1rem', fontWeight: 700, color: '#154C86', marginTop: 40, marginBottom: 12 } as React.CSSProperties,
  h3: { fontSize: '1rem', fontWeight: 700, color: '#333', marginTop: 24, marginBottom: 8 } as React.CSSProperties,
  p: { lineHeight: 1.75, marginBottom: 12, color: '#222' } as React.CSSProperties,
  ol: { paddingLeft: 24, lineHeight: 1.75, color: '#222' } as React.CSSProperties,
  ul: { paddingLeft: 24, lineHeight: 1.75, color: '#222' } as React.CSSProperties,
  li: { marginBottom: 10 } as React.CSSProperties,
  link: { color: '#FF8800', textDecoration: 'underline' } as React.CSSProperties,
}

export default function ReklamacniRadPage() {
  return (
    <main>
      <div style={s.wrapper}>
        <h1 style={s.h1}>Reklamační řád</h1>
        <p style={s.subtitle}>SYSPOD s.r.o. · platný od 1. 6. 2026</p>
        <hr style={s.hr} />

        <h2 style={s.h2}>Úvodní ustanovení</h2>
        <ol style={s.ol}>
          <li style={s.li}>Zhotovitel je právnická osoba zapsaná v obchodním rejstříku, obchodní společnost SYSPOD s.r.o., se sídlem Ostravská 38, Vrbice, 735 51 Bohumín, IČO: 295 24 083.</li>
          <li style={s.li}>Objednatel je subjekt, který se zhotovitelem uzavřel smlouvu o dílo (zahrnující zaměření prostoru, dodání podlahové krytiny, pokládku a instalaci, či libovolnou kombinaci těchto plnění).</li>
          <li style={s.li}>Objednatel je povinen prohlédnout provedené dílo bezprostředně po jeho převzetí, a to takovým způsobem, aby mohl při vynaložení veškeré odborné péče zjistit zjevné vady díla.</li>
          <li style={s.li}>Pokud je zjištěno mechanické poškození dodaného materiálu nebo díla, je objednatel povinen vyhotovit záznam o poškození do předávacího protokolu za přítomnosti zástupce zhotovitele. V opačném případě se má za to, že dílo bylo předáno bez mechanického poškození.</li>
          <li style={s.li}>Objednatel přebírá dokončené dílo na základě předávacího protokolu. Převzetí díla potvrdí na předávacím protokolu buď objednatel, nebo jím zmocněný zástupce či zaměstnanec oprávněný k takovému úkonu.</li>
          <li style={s.li}>Objednatel je povinen oznámit zhotoviteli písemně vady díla a uplatnit konkrétní nárok z odpovědnosti za vady bez zbytečného odkladu poté, co je mohl při včasné prohlídce a dostatečné péči zjistit. Obdobné platí i pro vadu skrytou.</li>
          <li style={s.li}>Zhotovitel nenese odpovědnost za vady zjištěné po zřejmé manipulaci ze strany objednatele nebo třetích osob, ani za poškození vzniklá nevhodným používáním nebo údržbou podlahové krytiny v rozporu s pokyny výrobce.</li>
          <li style={s.li}>Objednatel bere na vědomí, že přírodní materiály (dřevo, korek, přírodní textil) vykazují přirozené variace v kresbě, struktuře a odstínu, které jsou charakteristickou vlastností přírodních surovin a nejsou předmětem reklamace.</li>
        </ol>

        <h2 style={s.h2}>I. Záruční podmínky</h2>
        <ol style={s.ol}>
          <li style={s.li}>V případě, že se po převzetí díla objednatelem vyskytnou v záruční době vady, může objednatel uplatnit svou oprávněnou reklamaci. Záruční doba počíná běžet ode dne předání díla, který je uveden v předávacím protokolu.</li>
          <li style={s.li}>
            Záruka zaniká v následujících případech:
            <ol type="a" style={{ paddingLeft: 24, marginTop: 8 }}>
              <li style={s.li}>Uplynutím záruční doby.</li>
              <li style={s.li}>Nevhodným používáním, skladováním nebo údržbou podlahové krytiny v rozporu s pokyny výrobce nebo zhotovitele.</li>
              <li style={s.li}>Nedodržením podmínek pro používání podlahové krytiny (nedostatečná nebo nadměrná vlhkost prostředí, teplotní extrémy, nevhodné čisticí prostředky apod.).</li>
              <li style={s.li}>Neodbornou manipulací, zásahem do díla ze strany objednatele nebo třetích osob.</li>
              <li style={s.li}>Poškozením díla živelnými událostmi (záplava, požár apod.).</li>
              <li style={s.li}>Nevyhovujícím stavem podkladní vrstvy, na který byl objednatel před zahájením pokládky upozorněn.</li>
              <li style={s.li}>Porušením povinností objednatele vyplývajících z bodů 3 až 7 Úvodních ustanovení.</li>
            </ol>
          </li>
          <li style={s.li}>V případě reklamace položené podlahové krytiny se záruka vztahuje pouze na vady, které jsou viditelné při prohlídce z výšky stoje (přibližně 1,6 m) při běžném osvětlení místnosti, a za předpokladu, že pokládka byla provedena v souladu s montážními podmínkami platnými v daný moment.</li>
        </ol>

        <h2 style={s.h2}>II. Vyřízení reklamace</h2>
        <ol style={s.ol}>
          <li style={s.li}>Reklamace bude postoupena k vyřízení pouze tehdy, pokud bude podána písemnou formou, tedy řádným vyplněním reklamačního protokolu (který je nedílnou součástí tohoto Reklamačního řádu) a jeho doručením zhotoviteli poštou, osobně nebo e-mailem na adresu podlahy@pokladameee.cz.</li>
          <li style={s.li}>Společně s reklamačním protokolem je vždy nutné doložit doklady o díle vystavené zhotovitelem objednateli (předávací protokol, faktura). Objednatel je povinen zajistit zhotoviteli přístup k reklamované části díla za účelem prohlídky a posouzení vady.</li>
          <li style={s.li}>Při zjištění rozdílu v množství nebo druhu dodaného materiálu oproti údajům na faktuře je objednatel povinen podat do sedmi pracovních dnů písemnou zprávu o těchto vadách zhotoviteli. Při nedodržení této lhůty nebude reklamace uznána.</li>
          <li style={s.li}>Pokud byla reklamace neoprávněná, zhotovitel naúčtuje objednateli veškeré vzniklé náklady na lokalizaci vady, dopravu a posouzení. Objednatel je povinen tyto náklady uhradit nejpozději do čtrnácti dnů od ukončení reklamačního řízení.</li>
          <li style={s.li}>Reklamovat dílo nelze z důvodu nepřesných či zkreslených vizualizací nebo fotografií materiálů uvedených na internetových stránkách zhotovitele.</li>
          <li style={s.li}>Jde-li o vadu neodstranitelnou, která však nebrání užívání díla určenému účelu, má objednatel nárok na přiměřenou slevu z ceny díla. V případě, že tato vada výrazně ztěžuje možnost používání díla, má objednatel nárok na odstranění vady nebo přiměřenou náhradu.</li>
          <li style={s.li}>V případě, že objednatel nesouhlasí s rozhodnutím odpovědného pracovníka, může se písemně obrátit na jednatele společnosti.</li>
          <li style={s.li}>Objednatel nemůže měnit uplatněné reklamační nároky, není-li dohodnuto jinak.</li>
          <li style={s.li}>Zhotovitel je povinen oznámit výsledek reklamačního řízení objednateli za předpokladu splnění všech povinností vyplývajících z tohoto reklamačního řádu.</li>
          <li style={s.li}>Oprávněnost každé reklamace a posouzení odstranitelnosti či neodstranitelnosti vady provede odpovědný pracovník zhotovitele a své stanovisko sdělí objednateli nejpozději do sedmi pracovních dnů od řádného uplatnění reklamace. V případě oprávněné reklamace je zhotovitel povinen vyřídit reklamaci ve lhůtě přiměřené povaze vady, nejpozději však šedesát kalendářních dnů od jejího řádného uplatnění, nedohodnou-li se obě strany písemně jinak.</li>
          <li style={s.li}>Tento reklamační řád je platný od 1. 6. 2026.</li>
        </ol>

        <h2 style={s.h2}>III. Rozsah záruky — z reklamací jsou vyloučeny tyto vady</h2>

        <h3 style={s.h3}>Vinylová plovoucí podlaha (LVT, SPC, click vinyl)</h3>
        <ul style={s.ul}>
          <li style={s.li}>Rozdíly v rozměrech spadající do výrobních tolerancí výrobce.</li>
          <li style={s.li}>Rozdíly způsobené chybným zadáním objednávky ze strany objednatele.</li>
          <li style={s.li}>Závady způsobené pokládkou do nevyhovujícího prostředí (nadměrná vlhkost podkladu přesahující hodnoty doporučené výrobcem, nerovnost podkladu mimo toleranci apod.).</li>
          <li style={s.li}>Závady způsobené nevhodným použitím nebo nesprávným ošetřováním (nesprávné čisticí prostředky, nadměrná vlhkost při mytí, ostrá bodová zatížení bez ochranných podložek apod.).</li>
          <li style={s.li}>Závady způsobené mechanickým poškozením ze strany uživatele.</li>
          <li style={s.li}>Přirozené barevné variace a rozdíly v kresbě dezénu u zakázek realizovaných ve více etapách nebo z různých šarží.</li>
          <li style={s.li}>Drobné barevné odchylky oproti vzorníku způsobené rozdílnými světelnými podmínkami.</li>
          <li style={s.li}>Dilatační spáry a pohyby plovoucí podlahy v rámci výrobních tolerancí a pokynů výrobce (teplotní roztažnost).</li>
          <li style={s.li}>Zvýraznění podkladní vrstvy (telegrafování) u SPC/LVT podlah v důsledku nerovnosti podkladu přesahující toleranci, na niž byl objednatel předem upozorněn.</li>
          <li style={s.li}>Škrábance a povrchové vady viditelné pouze při bočním osvětlení nebo z výšky pod 30 cm.</li>
        </ul>

        <h3 style={s.h3}>Laminátová podlaha</h3>
        <ul style={s.ul}>
          <li style={s.li}>Rozdíly v rozměrech spadající do výrobních tolerancí výrobce.</li>
          <li style={s.li}>Závady způsobené pokládkou na nevyhovující podklad (nadměrná vlhkost, nerovnost, nedostatečná teplota při pokládce apod.).</li>
          <li style={s.li}>Bobtnání, deformace nebo zdvihání laminátových prken způsobené nadměrnou vlhkostí prostředí nebo kontaktem s vodou v důsledku jednání objednatele.</li>
          <li style={s.li}>Závady způsobené mechanickým poškozením ze strany uživatele (např. pádem těžkých předmětů, tažením nábytku bez ochranných plstí).</li>
          <li style={s.li}>Přirozené barevné variace a rozdíly v kresbě imitací dřeva či kamene.</li>
          <li style={s.li}>Povrchové škrábance a vady viditelné pouze při bočním osvětlení nebo z výšky pod 30 cm.</li>
          <li style={s.li}>Zvýraznění podkladní vrstvy v důsledku nerovnosti, na niž byl objednatel předem upozorněn.</li>
          <li style={s.li}>Dilatační spáry v rámci pokynů výrobce.</li>
          <li style={s.li}>Opotřebení povrchu odpovídající normálnímu používání (AC třída opotřebení odpovídající intenzitě provozu).</li>
        </ul>

        <h3 style={s.h3}>Dřevěná podlaha (masiv, třívrstvá, dýhovaná)</h3>
        <ul style={s.ul}>
          <li style={s.li}>Rozdíly v rozměrech spadající do výrobních tolerancí výrobce.</li>
          <li style={s.li}>Přirozené variace v kresbě, barevném odstínu, sukovitosti a struktuře dřeva — jsou nedílnou charakteristikou přírodního materiálu.</li>
          <li style={s.li}>Přirozené pohyby dřeva (bobtnání, smršťování) způsobené sezónními změnami vlhkosti a teploty vzduchu v rámci doporučených provozních podmínek.</li>
          <li style={s.li}>Závady způsobené provozem mimo doporučené podmínky (relativní vlhkost vzduchu pod 40 % nebo nad 65 %, teplota mimo rozmezí 15–25 °C).</li>
          <li style={s.li}>Postupné vyblednutí povrchové úpravy a přirozené stárnutí dřeva působením UV záření.</li>
          <li style={s.li}>Závady způsobené nesprávným ošetřováním a údržbou (nevhodné čisticí nebo ošetřovací prostředky, nadměrné vlhčení povrchu).</li>
          <li style={s.li}>Povrchové škrábance a vady způsobené mechanickým namáháním (přesouvání nábytku, bodová zatížení, obuv s kovovými podpatky apod.).</li>
          <li style={s.li}>Barevné a texturní rozdíly mezi deskami z různých šarží nebo kmenů.</li>
          <li style={s.li}>Mírné praskání nebo vrzání podlahy v suchém období způsobené přirozeným pohybem dřeva.</li>
        </ul>

        <h3 style={s.h3}>PVC podlaha v rolích a dílcích</h3>
        <ul style={s.ul}>
          <li style={s.li}>Rozdíly v rozměrech a odchylky tloušťky spadající do výrobních tolerancí výrobce.</li>
          <li style={s.li}>Přirozené barevné variace a rozdíly v kresbě dezénu u zakázek z různých výrobních šarží.</li>
          <li style={s.li}>Závady způsobené pokládkou na nevyhovující podklad (vlhkost, znečištění, nerovnost mimo toleranci).</li>
          <li style={s.li}>Závady způsobené nesprávným ošetřováním (nevhodné chemické čisticí prostředky, nadměrné vlhčení).</li>
          <li style={s.li}>Závady způsobené mechanickým poškozením ze strany uživatele (ostrá bodová zatížení, tah nábytku).</li>
          <li style={s.li}>Přirozené barevné změny povrchu vlivem UV záření (slunečního záření) u tmavých dezénů.</li>
          <li style={s.li}>Drobné vzduchové bubliny nebo vzedmutí způsobené nevhodnou teplotou při pokládce, na niž byl objednatel upozorněn.</li>
          <li style={s.li}>Stopy po přechodových lištách a spárách v místech napojení nebo u zdí, které jsou technicky nevyhnutelné.</li>
        </ul>

        <h3 style={s.h3}>Koberec (textilní podlahová krytina)</h3>
        <ul style={s.ul}>
          <li style={s.li}>Rozdíly v rozměrech spadající do výrobních tolerancí výrobce.</li>
          <li style={s.li}>Přirozené variace v barvě a vzoru koberce u zakázek realizovaných z různých šarží nebo rolí.</li>
          <li style={s.li}>Přirozené sešlapání a změna vzhledu vlasu v místech vysoké zátěže (chůze, nábytek) při normálním používání.</li>
          <li style={s.li}>Drobné záchyty a tahané smyčky způsobené ostrými předměty nebo zvířaty.</li>
          <li style={s.li}>Závady způsobené nesprávnou údržbou (nevhodné čisticí prostředky, nadměrné vlhčení, nesprávný postup čištění).</li>
          <li style={s.li}>Skvrny vzniklé po předání díla objednateli.</li>
          <li style={s.li}>Přirozené barevné změny koberce vlivem UV záření (výraznější u přírodních vláken).</li>
          <li style={s.li}>Efekt „nažehleného koberce" (změna lesku vlasu) v místech pohybu nábytku — jedná se o charakteristiku textilního vlasu.</li>
          <li style={s.li}>Barevný rozdíl v odstínu koberce v závislosti na směru pohledu (efekt pile direction) — je přirozenou vlastností textilní krytiny.</li>
        </ul>

        <h3 style={s.h3}>Soklové lišty a příslušenství</h3>
        <ul style={s.ul}>
          <li style={s.li}>Rozdíly v rozměrech a drobné barevné odchylky spadající do výrobních tolerancí výrobce.</li>
          <li style={s.li}>Rozdíly v odstínu lišt z různých výrobních šarží.</li>
          <li style={s.li}>Závady způsobené mechanickým poškozením ze strany uživatele.</li>
          <li style={s.li}>Drobné spáry v rozích a spojích lišt v rozsahu technologických tolerancí pokládky.</li>
          <li style={s.li}>Závady způsobené pohybem stavební konstrukce (sedání budovy, smršťování omítek apod.).</li>
          <li style={s.li}>Povrchové škrábance a vady viditelné pouze při bočním osvětlení nebo z těsné blízkosti.</li>
        </ul>

        <p style={{ ...s.p, marginTop: 40 }}>
          Přečtěte si také naše{' '}
          <a href="/obchodni-podminky" style={s.link}>Všeobecné obchodní podmínky</a>.
        </p>
      </div>
    </main>
  )
}
