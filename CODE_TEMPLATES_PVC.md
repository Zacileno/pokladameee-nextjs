# PVC Podlaha — Kód šablony

Tento soubor obsahuje přesné šablony kódu pro každý soubor, který je potřeba vytvořit. Zkopíruj kód podle výše popsaného workflow.

---

## 1️⃣ `/sanity/schemas/pvcPodlaha.ts`

Zkopíruj z `vinylovaPodlahy.ts` a změň:

```typescript
import { defineType, defineField } from 'sanity'

export const pvcPodlahaSchema = defineType({
  name: 'pvcPodlaha',  // ← ZMĚNĚNO
  title: 'Podstránka: PVC podlaha',  // ← ZMĚNĚNO
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'istrip', title: 'Ikonový strip' },
    { name: 'typy', title: 'Typy podlah' },
    { name: 'benefity', title: 'Proč zvolit' },
    { name: 'kroky', title: 'Jak to probíhá' },
    { name: 'reference', title: 'Reference strip' },
    { name: 'faq', title: 'FAQ' },
  ],
  // ... rest zůstane IDENTICKÝ jako vinylovaPodlahy.ts
  preview: { prepare: () => ({ title: 'Podstránka: PVC podlaha' }) },
})
```

---

## 2️⃣ `/sanity/schemaTypes/index.ts` — přidej řádek

Na konec (vedle ostatních exportů):
```typescript
export { pvcPodlahaSchema } from '../schemas/pvcPodlaha'
```

---

## 3️⃣ `/sanity.config.ts` — uprav pole `schema.types`

Najdi blok:
```typescript
schema: {
  types: [
    // ... ostatní typy
    vinylovaPodlahaSchema,
    // ... ostatní
  ],
},
```

Přidej:
```typescript
schema: {
  types: [
    // ... ostatní typy
    vinylovaPodlahaSchema,
    pvcPodlahaSchema,  // ← PŘIDEJ TENHLE ŘÁDEK
    // ... ostatní
  ],
},
```

Nezapomeň importovat na začátek souboru:
```typescript
import { pvcPodlahaSchema } from './sanity/schemas/pvcPodlaha'
```

---

## 4️⃣ `/lib/sanity.ts` — přidej query

Na konec (za `VINYLOVA_PODLAHA_QUERY`):

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

## 5️⃣ `/app/sluzby/pvc-podlaha/page.tsx` — hlavní soubor

Zkopíruj celý `/app/sluzby/vinylova-podlaha/page.tsx` a nahraď následující sekce:

### Import — Řádek 1–6
```typescript
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BenefityGrid from '@/app/components/BenefityGrid'
import RemeselnikSekce from '@/app/components/RemeselnikSekce'
import KontaktSekce from '@/app/components/KontaktSekce'
import FaqItem from './FaqItem'
import { client, PVC_PODLAHA_QUERY, KONTAKT_SEKCE_QUERY } from '@/lib/sanity'  // ← ZMĚNĚNO
```

### Hardcoded ISTRIP — Řádek ~14–22
```typescript
const ISTRIP = [
  { emoji: '🏗️', text: 'Prvotřídní kvalita' },
  { emoji: '⏱️', text: 'Rychlá pokládka' },
  { emoji: '💧', text: 'Vodě odolná' },
  { emoji: '♻️', text: 'Ekologicky bezpečné' },
  { emoji: '📊', text: 'Průmyslový standard' },
]
```

### Hardcoded TYPY — Řádek ~24–50
```typescript
const TYPY = [
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
]
```

### Hardcoded BENEFITY — Řádek ~52–59
```typescript
const BENEFITY = [
  { emoji: '💪', nadpis: 'Extrémně odolná', text: 'PVC snáší vysokou zátěž, nárazům a opotřebení. Vhodná do komerčních prostor, kuchyní, bazénů i sportovních hal.' },
  { emoji: '💧', nadpis: 'Vodě odolná', text: 'Stoprocentně voděodolná — ideální do koupelen, kuchyní, předsíní a všech vlhkých prostor. Nehnívá a necpou se v ní bakterie.' },
  { emoji: '🧹', nadpis: 'Snadná údržba', text: 'Stačí von a voda — žádné speciální mycí prostředky. Ideální pro lidi s alergiemi a domácnosti s dětmi.' },
  { emoji: '🎨', nadpis: 'Pestrá nabídka', text: 'Desítky dekorů — imitace dřeva, kamene, betonu, moderní tóny a metalické efekty. Vždy najdeš design, který se shoduje s interiérem.' },
]
```

### Hardcoded KROKY — Řádek ~61–64
```typescript
const KROKY = [
  { nadpis: 'Zavoláte nebo napíšete', text: 'Do 48 h přijedeme na zaměření — bez závazku a bez skrytých nákladů. Zhodnotíme stav podkladu a poradíme varianty.' },
  { nadpis: 'Vyberete materiál', text: 'Přivezeme vzorník PVC s různými tloušťkami a designy. Ukážeme vám diferenci mezi standard a premium třídou. Domlouváme se na ceně.' },
  { nadpis: 'Položíme a uklidíme', text: 'Profesionální pokládka — správná příprava podkladu, presné lepení, řez v rozích. Odvez staré podlahy, vyčistíme po sobě.' },
  { nadpis: 'Garanti a podpora', text: 'Na práci máte záruku. Kdyby se cokoliv stalo, voláte nás. Nabízíme i údržbu a regeneraci.' },
]
```

### Hardcoded FAQ — Řádek ~82–...
```typescript
const FAQ = [
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
]
```

### Data fetching — Řádek ~130–137
```typescript
export default async function PvcPodlahaPage() {
  let data: VinylData | null = null  // typ zůstane stejný (nebo si vytvoř PvcData - nepovinné)
  let kontaktSekce: any = null
  try {
    ;[data, kontaktSekce] = await Promise.all([
      client.fetch<VinylData>(PVC_PODLAHA_QUERY),  // ← ZMĚNĚNO
      client.fetch(KONTAKT_SEKCE_QUERY),
    ])
  } catch {}
```

### Fallback texty — Řádek ~139–142
```typescript
const heroNadpis = data?.heroNadpis || 'PVC podlaha — pokládka a montáž'
const heroPodnadpis = data?.heroPodnadpis || 'Odolná, voděodolná a snadná na údržbu. PVC podlahy jsou ideální pro koupelny, kuchyně, obchodní prostory a všechny náročné prostředí. Přijedeme zaměřit do 48 hodin, poradíme s výběrem a profesionálně položíme.'
const heroBadge = data?.heroBadge || '🚛 Odvoz staré podlahy zdarma'
const heroFotkaUrl = data?.heroFotkaUrl || null
```

### Hero label — Řádek ~165–167
```typescript
<p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '2px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 16 }}>
  PVC podlahy · MSK
</p>
```

**Zbytek souboru zůstane IDENTICKÝ!** (Design, CSS třídy, komponenty…)

---

## 6️⃣ `/app/sluzby/pvc-podlaha/FaqItem.tsx`

Zkopíruj **bez jakýchkoliv změn** z `/app/sluzby/vinylova-podlaha/FaqItem.tsx`:

```typescript
'use client'

import { useState } from 'react'

interface FaqItemProps {
  otazka: string
  odpoved: string
}

export default function FaqItem({ otazka, odpoved }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div style={{
      borderBottom: '1px solid var(--gray-200)',
      paddingBottom: 16,
      marginBottom: 20,
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontSize: 16,
          fontWeight: 700,
          color: 'var(--gray-900)',
          textAlign: 'left',
        }}
      >
        {otazka}
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 24,
          height: 24,
          background: 'var(--orange)',
          color: 'white',
          borderRadius: '50%',
          fontSize: 12,
          fontWeight: 900,
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
          flexShrink: 0,
        }}>
          +
        </span>
      </button>
      {isOpen && (
        <p style={{
          marginTop: 12,
          fontSize: 15,
          color: 'var(--gray-700)',
          lineHeight: 1.6,
        }}>
          {odpoved}
        </p>
      )}
    </div>
  )
}
```

---

## 7️⃣ `/scripts/seed-pvc-podlaha.ts` — úplný soubor

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

**Hotovo! Máš všechny šablony kódu.** Stačí je zkopírovat do správných souborů a podstránka bude hotová. 🎉
