# Instrukce pro vytvoření podstránky PVC Podlah

Tento dokument obsahuje detailní instrukce pro vytvoření nové podstránky `/sluzby/pvc-podlaha` podle vzoru vinylové podlahy.

---

## 📋 Přehled projektu

**Cíl:** Vytvořit podstránku PVC podlah, která:
- Kopíruje strukturu a design podstránky Vinylové podlahy (`/sluzby/vinylova-podlaha`)
- Obsahuje kontextové texty o PVC podlahách a jejich pokládce
- Je plně editovatelná přes Sanity CMS
- Fallback na hardcoded hodnoty, pokud Sanity vrátí null
- Lze ji nasadit do `dev` větve a vidět na Preview Vercel

**Struktura na konci:**
```
app/sluzby/pvc-podlaha/
├── page.tsx           # Hlavní server komponenta (fetchuje Sanity + FaqItem)
└── FaqItem.tsx        # Komponenta pro FAQ (client component)

sanity/schemas/
├── pvcPodlaha.ts      # Nové Sanity schéma (kopie vinylovaPodlahy se změnami)

lib/
├── sanity.ts          # Přidej PVC_PODLAHA_QUERY

scripts/
└── seed-pvc-podlaha.ts # Seed skript s demo obsahem
```

---

## 🛠️ Krok 1: Vytvoření Sanity schématu

Vytvořit soubor `/sanity/schemas/pvcPodlaha.ts`.

Zkopíruj obsah `/sanity/schemas/vinylovaPodlahy.ts` a proveď tyto změny:

```typescript
// Změna v defineType — ponech všechno stejné, jen změň:
name: 'pvcPodlaha'  // místo 'vinylovaPodlaha'
title: 'Podstránka: PVC podlaha',  // místo 'Podstránka: Vinylová podlaha'
// ...
preview: { prepare: () => ({ title: 'Podstránka: PVC podlaha' }) }
```

**Schéma zůstává identické**, jen se změní název.

---

## 🔗 Krok 2: Registrace schématu v Sanity

### 2a) Přidej do `/sanity/schemaTypes/index.ts`:
```typescript
// Na konci souboru přidej:
export { pvcPodlahaSchema } from '../schemas/pvcPodlaha'
```

### 2b) Přidej do `/sanity.config.ts`:
Najdi pole `schema.types` a přidej:
```typescript
pvcPodlahaSchema,  // vedle vinylovaPodlahaSchema
```

---

## 🔍 Krok 3: Přidání GROQ query do `/lib/sanity.ts`

Na konec souboru (za `VINYLOVA_PODLAHA_QUERY`) přidej:

```typescript
export const PVC_PODLAHA_QUERY = `*[_type == "pvcPodlaha"][0] {
  heroNadpis, heroPodnadpis, heroBadge,
  "heroFotkaUrl": heroFotka.asset->url,
  istrip[] { emoji, text },
  typyNadpis, typyPodnadpis,
  typy[] { nazev, badge, popis, vyhody, barva },
  benefityNadpis,
  benefity[] { emoji, nadpis, text },
  krokyNadpis, krokyPodnadpis,
  kroky[] { nadpis, text },
  referenceHodnoceni, referenceCitace, referenceJmeno,
  faq[] { otazka, odpoved }
}`
```

---

## 📄 Krok 4: Vytvoření `/app/sluzby/pvc-podlaha/page.tsx`

Zkopíruj celý obsah `/app/sluzby/vinylova-podlaha/page.tsx` a proveď tyto **globální** změny:

1. **Import query:**
   ```typescript
   import { client, PVC_PODLAHA_QUERY, KONTAKT_SEKCE_QUERY } from '@/lib/sanity'
   //                  ↑ změň z VINYLOVA_PODLAHA_QUERY
   ```

2. **Hardcoded výchozí hodnoty** — přepíš na texty o PVC:
   ```typescript
   const ISTRIP = [
     { emoji: '🏗️', text: 'Prvotřídní kvalita' },
     { emoji: '⏱️', text: 'Rychlá pokládka' },
     { emoji: '🛡️', text: 'Trvanlivá řešení' },
     { emoji: '♻️', text: 'Ekologicky bezpečné' },
     { emoji: '📊', text: 'Průmyslový standard' },
   ]
   ```

3. **Sekce TYPY** — změň popis na obsah o PVC (viz níže):
   ```typescript
   const TYPY = [
     {
       nazev: 'PVC lepená podlaha',
       badge: 'Nejpopulárnější volba',
       popis: 'PVC lepená podlaha se připevní k podkladu speciálním lepidlem. Nabízí výbornou stabilitu, zvukový komfort a je ideální pro vlhké prostory...',
       vyhody: ['Vysoká odolnost vůči vlhkosti', 'Tichá a pohodlná', 'Vhodná do všech typů místností'],
       barva: 'orange',
     },
     // ...
   ]
   ```

4. **Sekce BENEFITY** — uprav pro PVC:
   ```typescript
   const BENEFITY = [
     { emoji: '💪', nadpis: 'Extrémně odolná', text: 'PVC snáší vysokou zátěž, vhodná i do komerčních prostor' },
     { emoji: '💧', nadpis: 'Vodě odolná', text: 'Ideální do koupelny, kuchyně, bazénu' },
     // ...
   ]
   ```

5. **Sekce KROKY** — adaptuj workflow na PVC:
   ```typescript
   const KROKY = [
     { nadpis: 'Zavoláte nebo napíšete', text: 'Do 48 h přijedeme na zaměření — bez závazku a zdarma.' },
     { nadpis: 'Vyberete materiál', text: 'Přivezeme vzorník PVC, poradíme s odolností a designem.' },
     { nadpis: 'Položíme a uklidíme', text: 'Profesionální lepení, odpad ekologicky zlikvidujeme.' },
   ]
   ```

6. **Sekce FAQ** — změní texty na PVC-relevantní:
   ```typescript
   const FAQ = [
     {
       otazka: 'Jaký je rozdíl mezi PVC a vinylem?',
       odpoved: 'PVC je robustnější a vhodná do extrémněji namáhaných prostor. Vinyl je citlivější, PVC vydržuje více.',
     },
     // ...
   ]
   ```

7. **V render sekci — Hero nadpis:**
   ```typescript
   <p style={{ ... }}>
     PVC podlahy · MSK  {/* místo "Vinylové podlahy · MSK" */}
   </p>
   ```

8. **Data fetchování** — změň:
   ```typescript
   let data: VinylData | null = null  // typ zůstane stejný (nebo si vytvoř PvcData)
   try {
     ;[data, kontaktSekce] = await Promise.all([
       client.fetch<VinylData>(PVC_PODLAHA_QUERY),  // ← nová query
       client.fetch(KONTAKT_SEKCE_QUERY),
     ])
   } catch {}
   ```

9. **Fallback texty:**
   ```typescript
   const heroNadpis = data?.heroNadpis || 'PVC podlaha — pokládka a montáž'
   const heroPodnadpis = data?.heroPodnadpis || 'PVC podlahy pro každou místnost — vysoká odolnost, snadná údržba, profesionální pokládka do 48 hodin.'
   const heroBadge = data?.heroBadge || '🚛 Odvoz staré podlahy zdarma'
   ```

---

## 📄 Krok 5: Vytvoření `/app/sluzby/pvc-podlaha/FaqItem.tsx`

Zkopíruj obsah `/app/sluzby/vinylova-podlaha/FaqItem.tsx` — nic se neměnit!

Jednoduše ji zkopíruj bez změn. Je client component, který funguje pro obě podstránky.

---

## 📝 Krok 6: Seed skript — `/scripts/seed-pvc-podlaha.ts`

Vytvořit soubor `/scripts/seed-pvc-podlaha.ts`.

```typescript
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
      odpoved: 'Lepená PVC je kompatibilní s teplovodním a elektrickým podlahovým topením. Click (plovoucí) variantu s topením kombinovat nedoporučujeme — raději volte lepenou. Vždy je možné domluvit si speciální varianty.',
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
```

---

## 🚀 Krok 7: Spuštění seed skriptu

V terminálu (v pracovním adresáři projektu) spusť:

```bash
cd ~/Developer/pokladameee-nextjs
SANITY_TOKEN=$(grep authToken ~/.config/sanity/config.json | sed 's/.*"authToken": "\(.*\)".*/\1/') npx tsx scripts/seed-pvc-podlaha.ts
```

Nebo jednodušeji — zkopíruj si token z `~/.config/sanity/config.json` a spusť:

```bash
SANITY_TOKEN=<tvuj_token> npx tsx scripts/seed-pvc-podlaha.ts
```

Měl by ses vidět:
```
✅ PVC podlaha seed hotovo: pvcPodlaha
```

---

## 🔧 Krok 8: Test lokálně

```bash
npm run dev
# Otevři http://localhost:3000/sluzby/pvc-podlaha
```

Měl bys vidět:
- Hero sekci s modrým pozadím a texty o PVC
- Ikonový strip se 5 emojis
- Sekci s 2 typy PVC podlah (oranžový a modrý pruh)
- Benefity (4 emojis + texty)
- Jak to probíhá (4 kroky)
- Reference (hodnocení + citace)
- FAQ (5 otázek rozbalovacích)
- Kontakt sekci s Adamem

---

## 🐙 Krok 9: Git + Push do `dev`

```bash
cd ~/Developer/pokladameee-nextjs
git checkout dev
git pull origin dev
git add -A
git commit -m "feat: podstránka PVC podlahy (/sluzby/pvc-podlaha)"
git push origin dev
```

---

## 📊 Krok 10: Ověření na Preview Vercelu

1. Jdi do https://github.com/Zacileno/pokladameee-nextjs/deployments
2. Měl bys vidět deployment pro `dev` větev
3. Klikni na "Preview" a navštiv `/sluzby/pvc-podlaha`
4. Ověř, že vše funguje

---

## ✏️ Krok 11: Úprava obsahu v Sanity Studiu (volitelné)

Pokud chceš měnit texty nebo uploadovat fotky:

1. Jdi na https://pokladameee.cz/studio
2. V levém menu by měl být nový dokument "Podstránka: PVC podlaha"
3. Uprav cokoliv chceš — změny se okamžitě synchronizují (revalidate: 0)
4. Naklikej svými texty a foto

---

## 📋 Checklist — Co se mělo stát

- [x] Vytvořeno schéma `/sanity/schemas/pvcPodlaha.ts`
- [x] Registrováno v `/sanity/schemaTypes/index.ts`
- [x] Registrováno v `/sanity.config.ts`
- [x] Přidána query `PVC_PODLAHA_QUERY` do `/lib/sanity.ts`
- [x] Vytvořen `/app/sluzby/pvc-podlaha/page.tsx`
- [x] Zkopírován `/app/sluzby/pvc-podlaha/FaqItem.tsx`
- [x] Vytvořen `/scripts/seed-pvc-podlaha.ts`
- [x] Spuštěn seed skript
- [x] Ověřeno lokálně na `localhost:3000/sluzby/pvc-podlaha`
- [x] Pushnuty změny na `origin dev`
- [x] Zkontrolováno na Preview Vercelu

---

## 🎨 Bonus: Přidání PVC podlahy do navigace

Pokud chceš, aby se PVC podlahy zobrazovaly v menu Headeru vedle Vinylových podlah, uprav `/app/components/Header.tsx`:

Najdi sekci s Vinylovou podlahou v menu a přidej:
```jsx
<a href="/sluzby/pvc-podlaha">PVC podlaha</a>
```

---

## 🆘 Troubleshooting

- **Schéma se v Sanity Studiu neobjevuje** → Zkontroluj, že je registrováno na obou místech (`schemaTypes/index.ts` + `sanity.config.ts`). Refresh Studio.
- **Query vrací null** → Zkontroluj, že seed byl spuštěn úspěšně. Zkus `SANITY_TOKEN=... npx tsx scripts/seed-pvc-podlaha.ts` znovu.
- **Stránka se nezobrazuje na `/sluzby/pvc-podlaha`** → Zkontroluj, že je `page.tsx` v správné složce. Restartuj `npm run dev`.
- **Design se liší od Vinylové podlahy** → Měl jsi zkopírovat veškerý CSS a layout z `vinylova-podlaha/page.tsx`. Zkontroluj, že jsi neumazal žádný `className` či `style`.

---

**Hotovo! 🎉 Podstránka PVC podlah je připravena a viditelná na `dev` větvi.**
