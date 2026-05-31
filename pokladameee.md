# pokládámeee.cz — CLAUDE.md

Tento soubor je zdrojem pravdy pro vývoj webu pokládámeee.cz.
Vždy ho čti před zahájením práce.

---

## Projekt

**Web:** pokládámeee.cz — firma na pokládku vinylových podlah v MSK  
**Kontakt:** Adam Hajdušek (zakladatel & technik)  
**Oblast:** Moravskoslezský kraj  
**Claim:** Podlahy beeezstarostí  
**Hlavní služba:** Vinyl lepený (primárně UpFloor), odvoz staré podlahy zdarma

---

## Repozitáře a URL

| Co | URL |
|----|-----|
| GitHub (hlavní web) | `github.com/Zacileno/pokladameee-nextjs` |
| GitHub (landing) | `github.com/Zacileno/pokladameee-landing` |
| Produkce Next.js | `pokladameee-nextjs.vercel.app` |
| Doména | `pokladameee.cz` — zatím provizorní landing, přesměrovat na Next.js až bude hotový |
| Sanity Studio | `pokladameee-nextjs.vercel.app/studio` |
| Lokální dev | `localhost:3000` |

---

## Tech stack

- **Framework:** Next.js (App Router, TypeScript)
- **Styly:** Inline styles + CSS třídy v `globals.css` — žádný Tailwind
- **CMS:** Sanity (`projectId: 8cvsenqb`, dataset: `production`)
- **Formuláře:** Formspree (ID zatím nevyplněno — placeholder v HeroSection + KontaktSekce)
- **Deployment:** Vercel (auto-deploy z `main` branche)
- **Font:** Barlow (Google Fonts, načítán přes `<link>` v layout.tsx — ne next/font)
- **Obrázky:** `next/image`, unoptimized: true, remote patterns: Unsplash + cdn.sanity.io

---

## Brand

| Token | Hodnota |
|-------|---------|
| Primární oranžová | `#FF8800` |
| Sekundární modrá | `#154C86` |
| Krémová | `#FFE9CF` |
| Černá | `#000000` |
| CSS vars | `--orange`, `--blue`, `--orange-light` |

**Logo soubory** (`/public/assets/logo/`):
- `logo-inverzni-modre.svg` — bílý text + oranžová ikona → **používá se v headeru a footeru**
- `logo-zakladni.svg` — černý text + oranžová ikona → světlá pozadí
- `logo-bile.svg` — bílá ikona → záloha

**Brand pravidlo eee:** suffix `eee` vždy v `<span>` s oranžovou barvou.
Slovo před ním musí končit souhláskou: `pokládám` + `eee` ✓, nikdy `pokládáme` + `eee` ✗

---

## Struktura projektu

```
app/
  layout.tsx               # Root layout, metadata, Google Fonts link
  globals.css              # CSS proměnné + VŠECHNY media queries (breakpoint 900px)
  page.tsx                 # Homepage — určuje pořadí sekcí
  components/
    Header.tsx             # Fixed, průhledný → modrý rgba(21,76,134,0.97) po scrollu
    HeroSection.tsx        # Fullscreen foto + formulář vpravo (skrytý na mobilu)
    VyhodySekce.tsx        # Ikonová lišta 5 ikon, hned pod hero
    SluzbySekce.tsx        # 4 karty služeb
    JakToFunguje.tsx       # 4 kroky, modrý background
    GalerieSekce.tsx       # Galerie před/po s přepínačem (Unsplash placeholder)
    RemeselnikSekce.tsx    # Adam Hajdušek, oranžový background (Unsplash placeholder)
    VyhodyBadge.tsx        # 4 výhody, 2-sloupcový grid
    ReferenceSekce.tsx     # 6 recenzí (placeholder)
    KontaktSekce.tsx       # Kontaktní formulář + kontaktní info
    Footer.tsx             # 3-sloupcový footer
  akce/page.tsx
  inspirace/page.tsx
  ochrana-osobnich-udaju/page.tsx
  obchodni-podminky/page.tsx
  robots.ts                # Auto-generovaný robots.txt
  sitemap.ts               # Auto-generovaná sitemap
  studio/[[...tool]]/page.tsx   # Sanity Studio embedded

lib/
  sanity.ts                # Sanity client, urlFor helper, GROQ queries

sanity/
  schemas/
    akce.ts                # Schema: Akce a slevy
    inspirace.ts           # Schema: Galerie před/po

public/
  assets/
    logo/                  # SVG loga (3 varianty)
    elementy/              # Brand grafické elementy (dílce, kolečka)
```

---

## Responsivita — důležité pravidlo

Breakpoint: **900px**, sekundárně 480px. Vše definováno v `globals.css`.

CSS třídy pro layouty:
- `.hero-grid` — 2 sloupce → 1 sloupec, `.hero-form` skrytý
- `.vyhody-lista` / `.vyhody-item` — flex row → column
- `.rem-grid` — 2 sloupce → 1 sloupec
- `.vyhody-badge-grid` / `.vyhody-badge-karty` — gridy
- `.kontakt-grid`, `.kontakt-form-row2`, `.kontakt-form-row3`
- `.footer-grid`

**Nikdy** nepřidávej `@media` přímo do komponent — vždy jen do `globals.css`.

---

## Workflow

### Jak pracujeme
1. Diskuze a zadání → **Claude.ai chat** (tady)
2. Větší změny → Claude píše kód, pushne na GitHub
3. Vercel auto-deployuje z `main` branche
4. Lokální preview: `npm run dev` ve Warpu

### Git příkazy (Warp)
```bash
git pull                          # stáhnout změny
git add -A && git commit -m "fix: popis" && git push   # pushnutí
```

Commit prefix: `feat` / `fix` / `style` / `content` / `chore`

### Spuštění lokálně
```bash
cd ~/Developer/pokladameee-nextjs
npm run dev
# → localhost:3000
```

---

## Prostředí

**`.env.local`** (vytvořit lokálně, nesmí být v gitu):
```
NEXT_PUBLIC_SANITY_PROJECT_ID=8cvsenqb
NEXT_PUBLIC_SANITY_DATASET=production
# FORMSPREE_ID=xxxxxxxx    ← doplnit po registraci
```

Stejné proměnné musí být na Vercelu: Settings → Environment Variables.

---

## Sanity CMS

- **Studio URL:** `/studio` (lokálně i produkčně)
- **Project ID:** `8cvsenqb`
- **Organizace:** Zacileno

**Schémata:**
- `inspirace` — galerie před/po (fotoPo povinné, fotoPred volitelné)
- `akce` — akce a slevy s přepínačem aktivní/neaktivní

**CORS origins** (nastavit v sanity.io/manage):
```
https://pokladameee-nextjs.vercel.app
http://localhost:3000
```

---

## TODO — zbývá do plnohodnotného webu

### 🔴 Kritické
- [ ] Reálný telefon Adama (nahradit `+420 XXX XXX XXX`)
- [ ] Reálný email (nahradit placeholder)
- [ ] Formspree ID — propojit hero formulář + kontaktní formulář
- [ ] Přesměrovat `pokladameee.cz` z landing page na tento Next.js web

### 🟡 Důležité
- [ ] Reálná hero fotka pozadí (aktuálně Unsplash)
- [ ] Reálné fotky galerie před/po (aktuálně Unsplash)
- [ ] Fotka Adama Hajdušek v obrandovaném tričku (RemeselnikSekce)
- [ ] Vyplnit GDPR a obchodní podmínky
- [ ] Google Search Console — registrace domény

### 🟢 Nice to have
- [ ] Napojit GalerieSekce na Sanity (aktuálně hardcoded)
- [ ] Napojit AkceSekce na Sanity
- [ ] Přidat Akce + Inspirace do navigace v Headeru
- [ ] Google Analytics / GA4

---

## Technické poznámky

- **Google Fonts:** načítáme přes `<link>` tag (ne `next/font`) — build server na Vercelu nemá přístup na internet
- **Logo filter:** `logo-inverzni-modre.svg` má bílý text nativně — není třeba CSS filter
- **Vercel framework preset:** musí být nastaven na **Next.js** (jinak 404)
- **Landing page:** samostatný repo `pokladameee-landing`, čistý HTML soubor, žádný build
- **Sanity init:** byl spuštěn v projektu — nevytvářej nový projekt, použij `8cvsenqb`
