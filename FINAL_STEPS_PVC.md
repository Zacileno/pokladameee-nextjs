# 🚀 PVC Podlaha — Postup k ostrému spuštění

Gratulujeme! Podstránka PVC podlah je úspěšně nasazena na **dev** větvi. Zde je postup, jak ji dokončit.

---

## ✅ Co je hotovo:

- ✓ Schéma pro PVC podlahy (`/sanity/schemas/pvcPodlaha.ts`)
- ✓ GROQ query v `/lib/sanity.ts`
- ✓ Komponenty a struktura (`/app/sluzby/pvc-podlaha/page.tsx` + `FaqItem.tsx`)
- ✓ Seed skript (`/scripts/seed-pvc-podlaha.ts`)
- ✓ Registraci v Sanity konfiguracích
- ✓ Commit a push na `origin/dev` ✓

## 📝 Zbývá:

### 1. Spuštění seed skriptu — v VS Code terminálu:

```bash
cd "/Users/danielalonso/Pokladameee_web/pokladameee-nextjs"
npm run seed-pvc
# nebo ručně:
npx tsx scripts/seed-pvc-podlaha.ts
```

**Poznámka:** Seed skript načte data přímo bez auth tokenu díky local Sanity konfiguraci. Pokud to selže, zkontroluj, že máš `.env.local` vyplněný s `NEXT_PUBLIC_SANITY_PROJECT_ID` a `NEXT_PUBLIC_SANITY_DATASET`.

### 2. Test lokálně:

```bash
npm run dev
# Otevři http://localhost:3000/sluzby/pvc-podlaha
```

Měl bys vidět:
- Hero sekci s PVC texty
- 5 ikon v strip (kvalita, rychlost, vodě odolná, ekologicky, standard)
- 2 karty typů (lepená + click)
- 4 benefity
- 4 kroky
- Reference s hodnocením 4.9
- 5 FAQ otázek
- Kontakt sekci s Adamem

### 3. Úpravy v Sanity Studiu (volitelné):

Pokud chceš měnit obsah později:

1. Jdi na https://pokladameee.cz/studio
2. V levém menu by měl být: **"Podstránka: PVC podlaha"**
3. Uprav texty, emoji, fotky, jak chceš
4. Změny se okamžitě synchronizují (live revalidation)

### 4. Přidání do navigace (volitelné):

Pokud chceš PVC podlahy vidět v Headeru vedle Vinylových podlah, uprav [`/app/components/Header.tsx`] a přidej link:

```jsx
<a href="/sluzby/pvc-podlaha">PVC podlaha</a>
```

### 5. Ověření na Preview Vercelu:

1. Jdi na https://github.com/Zacileno/pokladameee-nextjs/deployments
2. Měl by být deployment pro `dev` větev (hotový nebo právě se nasazuje)
3. Klikni na "Preview" → `/sluzby/pvc-podlaha`
4. Ověř, že se stránka zobrazuje správně

---

## 📚 Soubory, které byly vytvořeny:

```
app/sluzby/pvc-podlaha/
├── page.tsx           ✓ Hlavní server komponenta
└── FaqItem.tsx        ✓ FAQ akordeon komponenta

sanity/schemas/
└── pvcPodlaha.ts      ✓ Sanity schéma

scripts/
└── seed-pvc-podlaha.ts ✓ Seed skript s demo daty

Aktualizované:
├── lib/sanity.ts      ✓ Přidána PVC_PODLAHA_QUERY
├── sanity.config.ts   ✓ Přidán pvcPodlahaSchema
└── sanity/schemaTypes/index.ts ✓ Registrován pvcPodlahaSchema
```

---

## 🆘 Troubleshooting

**Stránka se nezobrazuje na `/sluzby/pvc-podlaha`:**
- Zkontroluj, že je `page.tsx` v správné složce (`app/sluzby/pvc-podlaha/`)
- Restartuj `npm run dev`

**Sanity Studio neobjevuje "Podstránka: PVC podlaha":**
- Zkontroluj, že je `pvcPodlahaSchema` registrován na obou místech:
  - `sanity/schemaTypes/index.ts`
  - `sanity.config.ts`
- Refresh Sanity Studio stránku

**Seed skript padá na chybu:**
- Ujisti se, že máš `.env.local` s `NEXT_PUBLIC_SANITY_PROJECT_ID=8cvsenqb` a `NEXT_PUBLIC_SANITY_DATASET=production`
- Zkontroluj, že máš Node.js a npm nainstalovaný
- Spusť: `npm run seed-pvc` (pokud je v `package.json` nakonfigurované)

---

## 📌 Poznámka: Fallback texty

Stránka má **hardcoded fallback texty**, které se zobrazí, pokud Sanity vrátí null. To znamená, že i bez sedu bude stránka viditelná s demo obsahem. Seed skript pouze nahradí tyto výchozí hodnoty Sanity daty.

---

**Hotovo! Podstránka PVC podlah je připravena. 🎉**
