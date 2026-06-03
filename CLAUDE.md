# pokládámeee.cz — CLAUDE.md

Tento soubor je zdrojem pravdy pro vývoj webu pokládámeee.cz.
Vždy ho čti před zahájením práce.

---

## Projekt

**Web:** pokládámeee.cz — firma na pokládku vinylových podlah v MSK  
**Kontakt:** Adam Hajdušek (zakladatel & technik)  
**Telefon:** +420 739 229 922  
**Email:** adam.hajdusek@pokladameee.cz  
**Oblast:** Moravskoslezský kraj  
**Claim:** Podlahy beeezstarostí  
**Hlavní služba:** Vinyl lepený (primárně UpFloor), odvoz staré podlahy zdarma

---

## Repozitáře a URL

| Co | URL |
|----|-----|
| GitHub (vývoj) | `github.com/Zacileno/pokladameee-testing` |
| GitHub (produkce) | `github.com/Zacileno/pokladameee-nextjs` |
| GitHub (landing) | `github.com/Zacileno/pokladameee-landing` |
| Vývoj (testing) | `pokladameee-testing.vercel.app` ← **sem pushovat při vývoji** |
| Produkce | `pokladameee-nextjs.vercel.app` + `pokladameee.cz` |
| Sanity Studio (testing) | `pokladameee-testing.vercel.app/studio` |
| Lokální dev | `localhost:3000` |

**Důležité:** Veškerý vývoj probíhá na `pokladameee-testing`. Na produkci (`pokladameee-nextjs`) visí prozatím jen provizorní landing page z `pokladameee-landing` repo. Až bude testing hotový, přesuneme obsah na produkci.

---

## Git remoty (v ~/Developer/pokladameee-nextjs)

```bash
origin      → github.com/Zacileno/pokladameee-testing   ← pushovat sem
production  → github.com/Zacileno/pokladameee-nextjs
```

Push vždy do `origin main`.

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
  page.tsx                 # Homepage — fetchuje nastaveni ze Sanity, předává heroFotkaUrl
  components/
    Header.tsx             # Fixed, průhledný → modrý rgba(21,76,134,0.97) po scrollu
    HeroSection.tsx        # Fullscreen foto + formulář vpravo (skrytý na mobilu), heroFotka ze Sanity
    VyhodySekce.tsx        # Ikonová lišta 5 ikon, hned pod hero
    SluzbySekce.tsx        # 4 karty služeb
    JakToFunguje.tsx       # 4 kroky, modrý background
    GalerieSekce.tsx       # Galerie před/po, napojená na Sanity schema inspirace
    RemeselnikSekce.tsx    # Sekce důvěryhodnosti — sesterské projekty ze Sanity, oranžový bg
    VyhodyBadge.tsx        # 4 výhody, 2-sloupcový grid
    ReferenceSekce.tsx     # Recenze ze Sanity schema reference (aktivni==true), fallback placeholder
    KontaktSekce.tsx       # Kontaktní formulář + reálné kontakty (používá KontaktForm variant="full")
    KontaktForm.tsx        # Sdílený formulář — prop variant: "hero" | "full", POST /api/kontakt, redirect /dekujeme
    Footer.tsx             # 3-sloupcový footer + reálné kontakty
  api/kontakt/route.ts     # POST → Make webhook (MAKE_WEBHOOK_URL env var)
  dekujeme/page.tsx        # Děkovná stránka po odeslání formuláře
  akce/page.tsx
  inspirace/page.tsx
  ochrana-osobnich-udaju/page.tsx
  obchodni-podminky/page.tsx
  robots.ts
  sitemap.ts
  studio/[[...tool]]/page.tsx   # Sanity Studio embedded

lib/
  sanity.ts                # Sanity client, urlFor helper, GROQ queries

sanity/
  schemas/
    akce.ts                # Schema: Akce a slevy
    inspirace.ts           # Schema: Galerie před/po
    reference.ts           # Schema: Recenze (jmeno, text, hvezdicky, datum, aktivni)
    nastaveni.ts           # Schema: Singleton nastavení webu (heroFotka, telefon, email)
    projekt.ts             # Schema: Projekty skupiny (nazev, logo, url, pocetKlientu, aktivni)

public/
  assets/
    logo/                  # SVG loga (3 varianty)
    elementy/              # Brand grafické elementy
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
1. Diskuze a zadání → **Claude.ai chat**
2. Větší změny → Claude Code píše kód a pushne na GitHub
3. Vercel auto-deployuje `pokladameee-testing` z `origin/main`
4. Vizuální review → Claude in Chrome (screenshot → feedback → fix)
5. Lokální preview: `npm run dev` ve Warpu

### Git příkazy (Warp)
```bash
cd ~/Developer/pokladameee-nextjs
git pull
git add -A && git commit -m "feat: popis" && git push origin main
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
MAKE_WEBHOOK_URL=https://placeholder.make.webhook   ← nahradit reálnou URL z Make
```

Stejné proměnné musí být na Vercelu: Settings → Environment Variables (na obou projektech).
**TODO Vercel:** Přidat `MAKE_WEBHOOK_URL` s reálnou webhook URL z Make.com na projektu `pokladameee-testing`.

---

## Sanity CMS

- **Studio URL:** `/studio` (lokálně i produkčně)
- **Project ID:** `8cvsenqb`
- **Organizace:** Zacileno

**Schémata:**
- `inspirace` — galerie před/po (fotoPo povinné, fotoPred volitelné)
- `akce` — akce a slevy s přepínačem aktivní/neaktivní
- `reference` — recenze (jmeno, text, hvezdicky 1-5, datum, aktivni)
- `nastaveni` — singleton nastavení webu (heroFotka, telefon, email)
- `projekt` — sesterské projekty pro sekci důvěryhodnosti (nazev, logo, url, pocetKlientu, aktivni)

**CORS origins** (nastavit v sanity.io/manage → projekt 8cvsenqb → API → CORS):
```
https://pokladameee-testing.vercel.app  ← Allow credentials: ✓
https://pokladameee-nextjs.vercel.app
http://localhost:3000
```

---

## Sanity — obsah k doplnění přes Studio

Na `pokladameee-testing.vercel.app/studio`:
- **Projekty skupiny** — přidat Malujemeee (malujemeee.cz) a Žaluzieee (zaluzieee.cz) s logy
- **Recenze** — přidat reálné recenze z Google
- **Nastavení** — nahrát hero fotku až bude k dispozici

---

## TODO — zbývá do plnohodnotného webu

### 🔴 Kritické
- [ ] Formspree ID — propojit hero formulář + kontaktní formulář
- [ ] Nahrát loga Malujemeee + Žaluzieee do Sanity (Projekty skupiny)
- [ ] Přidat reálné recenze do Sanity (Reference)
- [ ] Ověřit že schémata reference, nastaveni, projekt jsou vidět v Sanity Studiu

### 🟡 Důležité
- [ ] Reálná hero fotka pozadí (nahrát přes Sanity → Nastavení)
- [ ] Reálné fotky galerie před/po (nahrát přes Sanity → Inspirace / Galerie)
- [ ] Vyplnit GDPR a obchodní podmínky
- [ ] Google Search Console — registrace domény
- [ ] Přesměrovat pokladameee.cz na Next.js až bude testing hotový

### 🟢 Nice to have
- [ ] Napojit AkceSekce na Sanity
- [ ] Přidat Akce + Inspirace do navigace v Headeru
- [ ] Google Analytics / GA4
- [ ] Formspree integrace

---

## Technické poznámky

- **Google Fonts:** načítáme přes `<link>` tag (ne `next/font`) — build server na Vercelu nemá přístup na internet
- **Logo filter:** `logo-inverzni-modre.svg` má bílý text nativně — není třeba CSS filter
- **Vercel framework preset:** musí být nastaven na **Next.js** (jinak 404) — na `pokladameee-testing` opraveno ručně přes dashboard
- **Landing page:** `pokladameee-landing` repo, čistý HTML, nasazený na `pokladameee-nextjs` Vercel projekt + doména `pokladameee.cz`
- **Sanity init:** byl spuštěn v projektu — nevytvářej nový projekt, vždy použij `8cvsenqb`
- **Vercel framework preset:** při vytváření nového projektu přes CLI se může nastavit na "Other" — vždy zkontrolovat v Settings → Build and Deployment
