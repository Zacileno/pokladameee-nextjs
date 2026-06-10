import type { Metadata } from 'next'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'Zásady ochrany osobních údajů | pokládámeee.cz',
  description: 'Informace o zpracování osobních údajů společností SYSPOD s.r.o.',
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

const ulStyle: React.CSSProperties = {
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

export default function OchranaOsobnichUdajuPage() {
  return (
    <>
      <Header opaque />
      <main style={{ maxWidth: 800, margin: '0 auto', padding: '120px 24px 80px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, color: '#154C86', marginBottom: 32 }}>
        Zásady ochrany osobních údajů
      </h1>

      <section style={{ marginBottom: 32 }}>
        <h2 style={h2Style}>Úvod</h2>
        <p style={pStyle}>
          Obchodní společnost SYSPOD s.r.o., sídlem Ostravská 38, Vrbice, 735 51 Bohumín, IČ: 29524083, zaps. v obchodním rejstříku vedeném Krajským soudem v Ostravě pod sp.zn. C 103814 (dále jen „Společnost" nebo též „Správce") přistupuje k osobním údajům maximálně zodpovědně, chrání veškeré zpracovávané osobní údaje, kdy za tímto účelem přijala přiměřená bezpečnostní opatření a při jejich zpracování postupuje v souladu s obecně závaznými právními předpisy, zejména Nařízením Evropského parlamentu a Rady (EU) 2016/679 ze dne 27. dubna 2016 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů a o volném pohybu těchto údajů a o zrušení směrnice 95/46/ES (obecné nařízení o ochraně osobních údajů); (dále jen „GDPR").
        </p>
        <p style={pStyle}>
          Cílem těchto zásad je seznámit své zákazníky, jakož i další osoby, jejichž údaje může Společnost zpracovávat, jakým způsobem Společnost osobní údaje zpracovává a chrání, včetně informace o právech subjektu osobních údajů a jejich uplatnění.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={h2Style}>Správce osobních údajů</h2>
        <p style={pStyle}>
          SYSPOD s.r.o.<br />
          Sídlem Ostravská 38, Vrbice, 735 51 Bohumín<br />
          IČ: 29524083<br />
          zaps. v obchodním rejstříku vedeném Krajským soudem v Ostravě pod sp.zn. C 103814
        </p>
        <p style={pStyle}>
          <a href="https://www.pokladameee.cz" style={aStyle}>www.pokladameee.cz</a><br />
          email: <a href="mailto:adam.hajdusek@pokladameee.cz" style={aStyle}>adam.hajdusek@pokladameee.cz</a><br />
          tel.: <a href="tel:+420739229922" style={aStyle}>+420 739 229 922</a>
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={h2Style}>Účel a zpracování osobních údajů</h2>
        <p style={pStyle}>
          Správce zpracovává osobní údaje za účelem plnění smluvních závazků, tj. zejména za účelem komunikace s klienty, přípravy cenových nabídek, realizace zakázek a poskytování služeb v oblasti pokládky podlahových krytin. Osobní údaje jsou dále zpracovávány pro účely plnění zákonných povinností (zejm. účetních a daňových) a pro účely oprávněných zájmů Správce (zejm. ochrana práv a právních nároků).
        </p>
        <p style={pStyle}>
          Právním základem zpracování osobních údajů je zejména:
        </p>
        <ul style={ulStyle}>
          <li style={liStyle}>plnění smlouvy nebo provedení opatření přijatých před uzavřením smlouvy na žádost subjektu údajů (čl. 6 odst. 1 písm. b) GDPR),</li>
          <li style={liStyle}>plnění právní povinnosti, která se na Správce vztahuje (čl. 6 odst. 1 písm. c) GDPR),</li>
          <li style={liStyle}>oprávněný zájem Správce (čl. 6 odst. 1 písm. f) GDPR),</li>
          <li style={liStyle}>souhlas subjektu údajů (čl. 6 odst. 1 písm. a) GDPR) — tam, kde je vyžadován.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={h2Style}>Zpracované osobní údaje</h2>
        <p style={pStyle}>
          Správce zpracovává zejména následující kategorie osobních údajů:
        </p>
        <ul style={ulStyle}>
          <li style={liStyle}>identifikační údaje (jméno, příjmení),</li>
          <li style={liStyle}>kontaktní údaje (e-mailová adresa, telefonní číslo, adresa),</li>
          <li style={liStyle}>údaje poskytnuté v rámci poptávkového formuláře (popis zakázky, lokace, rozsah prací),</li>
          <li style={liStyle}>smluvní a fakturační údaje (v případě uzavření smlouvy),</li>
          <li style={liStyle}>provozní a lokalizační údaje (při návštěvě webových stránek — viz sekce Cookies).</li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={h2Style}>Zpracování osobních údajů na základě souhlasu</h2>
        <p style={pStyle}>
          Pokud Správce zpracovává osobní údaje na základě Vašeho souhlasu, máte právo tento souhlas kdykoli odvolat. Odvolání souhlasu nemá vliv na zákonnost zpracování prováděného před jeho odvoláním. Souhlas lze odvolat zasláním zprávy na e-mailovou adresu <a href="mailto:adam.hajdusek@pokladameee.cz" style={aStyle}>adam.hajdusek@pokladameee.cz</a>.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={h2Style}>Cookies</h2>
        <p style={pStyle}>
          Webové stránky <a href="https://www.pokladameee.cz" style={aStyle}>www.pokladameee.cz</a> mohou využívat soubory cookies a podobné technologie za účelem správného fungování stránek a analýzy návštěvnosti. Cookies jsou malé textové soubory ukládané do Vašeho zařízení při návštěvě webu.
        </p>
        <p style={pStyle}>
          Využívání analytických cookies (pokud jsou nasazeny) je podmíněno Vaším souhlasem. Nezbytné cookies pro správnou funkci webu jsou zpracovávány na základě oprávněného zájmu Správce. Nastavení cookies lze kdykoli změnit ve Vašem prohlížeči.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={h2Style}>Příjemci osobních údajů</h2>
        <p style={pStyle}>
          Osobní údaje mohou být předány třetím stranám pouze v nezbytném rozsahu a za předpokladu, že je pro to právní základ. Příjemci mohou být zejména:
        </p>
        <ul style={ulStyle}>
          <li style={liStyle}>poskytovatelé IT služeb a hostingu (zpracovatelé),</li>
          <li style={liStyle}>poskytovatelé e-mailových a komunikačních služeb,</li>
          <li style={liStyle}>orgány veřejné moci, pokud to ukládá zákon.</li>
        </ul>
        <p style={pStyle}>
          Osobní údaje nejsou předávány do třetích zemí mimo Evropský hospodářský prostor, ledaže je zajištěna odpovídající úroveň ochrany ve smyslu GDPR.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={h2Style}>Doba zpracování osobních údajů</h2>
        <p style={pStyle}>
          Osobní údaje jsou uchovávány po dobu nezbytně nutnou k naplnění účelu zpracování:
        </p>
        <ul style={ulStyle}>
          <li style={liStyle}>údaje z poptávkového formuláře — po dobu jednání o zakázce a následně po dobu trvání smluvního vztahu,</li>
          <li style={liStyle}>smluvní a fakturační dokumentace — po dobu stanovenou zákonem (zpravidla 10 let od vystavení dokladu),</li>
          <li style={liStyle}>údaje zpracovávané na základě souhlasu — do odvolání souhlasu,</li>
          <li style={liStyle}>údaje zpracovávané na základě oprávněného zájmu — do doby, než je vznesen oprávněný námitka.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={h2Style}>Práva subjektu údajů</h2>
        <p style={pStyle}>
          V souvislosti se zpracováním osobních údajů máte tato práva:
        </p>
        <ul style={ulStyle}>
          <li style={liStyle}><strong>Právo na přístup</strong> — máte právo získat potvrzení, zda jsou Vaše osobní údaje zpracovávány, a pokud ano, získat k nim přístup.</li>
          <li style={liStyle}><strong>Právo na opravu</strong> — máte právo požadovat opravu nepřesných nebo doplnění neúplných osobních údajů.</li>
          <li style={liStyle}><strong>Právo na výmaz</strong> — máte právo požadovat výmaz osobních údajů, pokud jsou splněny zákonné podmínky (tzv. „právo být zapomenut").</li>
          <li style={liStyle}><strong>Právo na omezení zpracování</strong> — máte právo požadovat omezení zpracování v případech stanovených GDPR.</li>
          <li style={liStyle}><strong>Právo na přenositelnost údajů</strong> — máte právo obdržet své osobní údaje ve strukturovaném, běžně používaném formátu a předat je jinému správci.</li>
          <li style={liStyle}><strong>Právo vznést námitku</strong> — máte právo vznést námitku proti zpracování na základě oprávněného zájmu nebo pro účely přímého marketingu.</li>
          <li style={liStyle}><strong>Právo odvolat souhlas</strong> — tam, kde je zpracování založeno na souhlasu, máte právo jej kdykoli odvolat.</li>
          <li style={liStyle}><strong>Právo podat stížnost</strong> — máte právo podat stížnost u dozorového úřadu, jímž je <a href="https://www.uoou.cz" style={aStyle}>Úřad pro ochranu osobních údajů</a> (www.uoou.cz).</li>
        </ul>
        <p style={pStyle}>
          Svá práva uplatňujte písemně na e-mailové adrese <a href="mailto:adam.hajdusek@pokladameee.cz" style={aStyle}>adam.hajdusek@pokladameee.cz</a> nebo na adrese sídla Společnosti. Správce odpoví bez zbytečného odkladu, nejpozději do 30 dnů od obdržení žádosti.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={h2Style}>Aktualizace zásad</h2>
        <p style={pStyle}>
          Tyto zásady ochrany osobních údajů mohou být průběžně aktualizovány. Aktuální verze je vždy dostupná na adrese <a href="https://www.pokladameee.cz/ochrana-osobnich-udaju" style={aStyle}>www.pokladameee.cz/ochrana-osobnich-udaju</a>.
        </p>
      </section>
    </main>
      <Footer />
    </>
  )
}
