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
| GitHub (jediné repo) | `github.com/Zacileno/pokladameee-nextjs` |
| Staging (větev `dev`) | Vercel preview — viz Deployments v projektu `pokladameee-nextjs` |
| Produkce (větev `main`) | `pokladameee-nextjs.vercel.app` + `pokladameee.cz` |
| Sanity Studio | `pokladameee.cz/studio` |
| Lokální dev | `localhost:3000` |

**Workflow:** Vývoj na větvi `dev` (staging) → po review merge do `main` (produkce).  
`pokladameee-testing` repo je archivované — nepoužívat.

---

## Git remoty (v ~/Developer/pokladameee-nextjs)

```bash
origin      → github.com/Zacileno/pokladameee-nextjs   ← jediné repo
testing-old → github.com/Zacileno/pokladameee-testing  ← archiv, nepoužívat
```

Výchozí větev pro práci: `dev`. Push vždy do `origin dev` (vývoj) nebo `origin main` (produkce).

---

## Tech stack

- **Framework:** Next.js 16 (App Router, TypeScript, Turbopack)
- **Styly:** Inline styles + CSS třídy v `globals.css` — žádný Tailwind
- **CMS:** Sanity (`projectId: 8cvsenqb`, dataset: `production`)
- **Formuláře:** vlastní API route `/api/kontakt` → Make webhook + Resend emaily
- **Emaily:** Resend — transakční emaily z `/api/kontakt` (Adamovi + zákazníkovi)
- **Deployment:** Vercel — větev `dev` → Preview, větev `main` → Production (`pokladameee.cz`)
- **Font:** Barlow (Google Fonts, načítán přes `<link>` v layout.tsx — ne next/font)
- **Obrázky:** `next/image`, unoptimized: true, remote patterns: Unsplash + cdn.sanity.io
- **Favicon:** `/public/favicon.svg` — oranžová ikona (3 pruhy) ze loga

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
- `logo-inverzni-modre.svg` — bílý text + oranžová ikona → **používá se v headeru**
- `logo-zakladni.svg` — černý text + oranžová ikona → světlá pozadí, footer (s CSS filter invert)
- `logo-bile.svg` — bílá ikona → záloha

**Fotka Adama:** `/public/assets/adam.jpg` — oříznutá 400×400px, pro kontaktní sekci

**Brand pravidlo eee:** suffix `eee` vždy v `<span>` s oranžovou barvou.
Slovo před ním musí končit souhláskou: `pokládám` + `eee` ✓, nikdy `pokládáme` + `eee` ✗

---

## Architektura — homepage (app/page.tsx)

`page.tsx` fetchuje data ze Sanity paralelně přes `Promise.all` a předává je komponentám.  
Každá komponenta má fallback na hardcoded hodnoty pokud Sanity vrátí null.

### Sekce na homepage (v pořadí)

| Komponenta | Sanity zdroj | Stav |
|---|---|---|
| `Header` | — | ✅ viditelná |
| `HeroSection` | `heroSekce`, `heroIkonky` | ✅ viditelná |
| `VyhodySekce` | `heroIkonky` | ✅ viditelná |
| `SluzbySekce` | `sluzbySekce` | ✅ viditelná |
| `JakToFunguje` | `jakToFunguje` | ✅ viditelná |
| `GalerieSekce` | `inspirace` | ⛔ **skrytá** (zakomentovaná v page.tsx) |
| `RemeselnikSekce` | `rodinaZnacek` + `projekt` | ✅ viditelná |
| `VyhodyBadge` | `procNasVybrat` | ✅ viditelná |
| `ReferenceSekce` | `reference` (aktivni==true) | ✅ viditelná |
| `KontaktSekce` | `kontaktSekce` | ✅ viditelná |
| `Footer` | `obecneNastaveni` | ✅ viditelná |

### Skryté prvky — vrátit až bude GalerieSekce viditelná

- `HeroSection.tsx:41` — button "Zobrazit výsledky" (`href="#inspirace"`) je zakomentován.  
  Až odkomentujeme `<GalerieSekce />` v `page.tsx`, odkomentovat i tento button.

---

## Komponenty — detaily

```
app/components/
  Header.tsx          # Fixed, průhledný → modrý rgba(21,76,134,0.97) po scrollu
                      # onScroll() voláno při mountu (fix pro refresh na #anchor)
  HeroSection.tsx     # Fullscreen foto + formulář vpravo (skrytý na mobilu)
                      # Button "Zobrazit výsledky" zakomentován — vrátit s GalerieSekce
  VyhodySekce.tsx     # Ikonová lišta 5 ikon, mobil: 2-sloupcový grid
  SluzbySekce.tsx     # 4 služby, mobil: horizontální kartičky
  JakToFunguje.tsx    # 4 kroky, modrý background
  GalerieSekce.tsx    # Galerie před/po — SKRYTÁ (zakomentována v page.tsx)
  RemeselnikSekce.tsx # Rodina značek — hlavička + karty projektů skupiny
                      # Karty s přetékající fotkou řemeslníka (PNG průhledné pozadí, 2:3)
  VyhodyBadge.tsx     # Proč nás vybrat — 4 výhody, 2-sloupcový grid
  ReferenceSekce.tsx  # Recenze (aktivni==true), fallback placeholder
  KontaktSekce.tsx    # Kontaktní sekce s formulářem
  KontaktForm.tsx     # Sdílený formulář — POST /api/kontakt, redirect /dekujeme
  Footer.tsx          # 3-sloupcový footer
```

---

## Struktura projektu

```
app/
  layout.tsx                        # Root layout, metadata, favicon, Google Fonts link
  globals.css                       # CSS proměnné + VŠECHNY media queries (breakpoint 900px)
  page.tsx                          # Homepage — fetchuje vše ze Sanity paralelně
  components/                       # Viz sekce Komponenty výše
  api/kontakt/route.ts              # POST → Make webhook + Resend emaily
                                    #   typ='kariera' → email přihlášky, jinak email poptávky
  dekujeme/page.tsx                 # Děkovná stránka po odeslání poptávky zákazníka
  dekujeme-kariera/page.tsx         # Děkovná stránka po odeslání přihlášky na kariéru
  kariera/page.tsx                  # /kariera — kariéra stránka (hardcoded data)
  kariera/[slug]/page.tsx           # /kariera/[slug] — detail pozice
  kariera/components/               # KarieraHero, TestimonialCarousel, BenefityGrid,
                                    #   FilozofieSecce, KulturaGrid, VolnePozice, KarieraKontaktForm
  kariera/[slug]/components/        # PoziceDetail
  akce/page.tsx
  inspirace/page.tsx
  ochrana-osobnich-udaju/page.tsx
  obchodni-podminky/page.tsx
  robots.ts
  sitemap.ts
  studio/[[...tool]]/page.tsx       # Sanity Studio embedded

lib/
  sanity.ts             # Sanity client, urlFor helper, všechny GROQ queries (*_QUERY konstanty)
  kariera-data.ts       # Hardcoded data 4 pozic (slug, texty, bullet listy)

sanity/
  schemas/
    heroSekce.ts        # Hero obrázek (heroFotka)
    heroIkonky.ts       # Hero ikonky — array max 5 (emoji, title, sub)
    sluzbySekce.ts      # Služby — nadpis, podnadpis, array max 4 (emoji, title, desc, detail)
    jakToFunguje.ts     # Jak to funguje — array max 4 kroků (title, desc)
    procNasVybrat.ts    # Proč nás vybrat — nadpis, podnadpis, array max 4 (emoji, title, desc)
    rodinaZnacek.ts     # Rodina značek — nadpis, podnadpis, pocetKlientuCelkem
    projekt.ts          # Projekty skupiny — nazev, claim, popis, logo, fotkaRemselniku,
                        #   pocetKlientu, hodnoceni, url, barva, barvaBtn, aktivni
    inspirace.ts        # Galerie před/po (fotoPo povinné, fotoPred volitelné)
    akce.ts             # Akce a slevy (aktivni přepínač)
    reference.ts        # Recenze (jmeno, text, hvezdicky 1-5, datum, aktivni)
    obecneNastaveni.ts  # Obecné nastavení — telefon, email, pracovniDoba, region, popisFooter
    kontaktSekce.ts     # Kontaktní sekce — nadpis, podnadpis, jmeno, role, citat,
                        #   foto, telefon, email, pracovniDoba, region
  schemaTypes/
    index.ts            # Registrace všech schémat

public/
  favicon.svg
  assets/
    logo/               # SVG loga (3 varianty)
    elementy/           # Brand grafické elementy
    adam.jpg            # Fotka Adama, 400×400px
```

---

## Sanity — přehled dokumentů

Každý typ má právě jeden dokument s pevným `_id` (singletons):

| `_id` / typ | Studio název | Obsah |
|---|---|---|
| `heroSekce` | Hero obrázek | heroFotka |
| `heroIkonky` | Hero ikonky | ikonky[] |
| `sluzbySekce` | Služby sekce | nadpis, podnadpis, sluzby[] |
| `jakToFunguje` | Jak to funguje | kroky[] |
| `procNasVybrat` | Proč nás vybrat | nadpis, podnadpis, vyhody[] |
| `rodinaZnacek` | Rodina značek | nadpis, podnadpis, pocetKlientuCelkem |
| `obecneNastaveni` | Obecné nastavení | telefon, email, pracovniDoba, region, popisFooter |
| `kontaktSekce` | Kontaktní sekce | všechna kontaktní pole + foto |

Kolekce (více dokumentů): `projekt`, `inspirace`, `akce`, `reference`

---

## Responsivita

Breakpoint: **900px**, sekundárně 480px. Vše definováno v `globals.css`.

CSS třídy pro layouty:
- `.hero-grid` — 2 sloupce → 1 sloupec, `.hero-form` skrytý na mobilu
- `.vyhody-lista` / `.vyhody-item` — desktop flex row → mobil 2-sloupcový grid
- `.sluzby-grid` / `.sluzba-karta` — desktop 2 sloupce → mobil 1 sloupec, horizontální karta
- `.projekt-seznam` / `.projekt-karta` / `.projekt-karta-foto` — karty s přetékající fotkou
- `.vyhody-badge-grid` / `.vyhody-badge-karty` — gridy
- `.kontakt-grid`, `.kontakt-form-row2`, `.kontakt-form-row3`
- `.footer-grid`

**Nikdy** nepřidávej `@media` přímo do komponent — vždy jen do `globals.css`.

---

## Workflow

### Git příkazy (Warp)
```bash
cd ~/Developer/pokladameee-nextjs

# Vývoj → staging
git checkout dev
git pull origin dev
git add -A && git commit -m "feat: popis" && git push origin dev

# Nasazení na produkci
git checkout main
git merge dev
git push origin main
git checkout dev   # vrátit se na dev
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
MAKE_WEBHOOK_URL=https://...   ← reálná URL z Make
RESEND_API_KEY=re_...          ← z resend.com → API Keys
```

**Vercel env vars** (projekt `pokladameee-nextjs` → Environment Variables):
- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` — Production + Preview ✓
- `RESEND_API_KEY`, `MAKE_WEBHOOK_URL` — Production + Preview ✓

**Sanity token pro seed skripty:** `~/.config/sanity/config.json` → `authToken` (osobní CLI token, nikam nepushovat)

---

## Sanity CMS

- **Studio URL:** `pokladameee.cz/studio`
- **Project ID:** `8cvsenqb`
- **Organizace:** Zacileno
- **revalidate:** aktuálně `0` (okamžitá propagace). Před ostrou produkcí zvážit `3600`.

**CORS origins** (sanity.io/manage → projekt 8cvsenqb → API → CORS):
```
https://www.pokladameee.cz        ← Allow credentials: ✓
https://pokladameee-nextjs.vercel.app
http://localhost:3000
```

---

## Sanity — obsah k doplnění přes Studio

Na `pokladameee.cz/studio`:
- **Projekty skupiny** — nahrát logo Malujemeee + Žaluzieee, fotky řemeslníků (PNG, průhledné pozadí, poměr 2:3)
- **Hero obrázek** — nahrát reálnou hero fotku pozadí
- **Recenze** — přidat reálné recenze z Google
- **Kontaktní sekce** — nahrát foto Adama (nebo použít `/public/assets/adam.jpg`)

---

## TODO — zbývá do plnohodnotného webu

### 🔴 Kritické
- [x] ~~Registrace na resend.com, ověření domény, RESEND_API_KEY na Vercelu~~ ✓
- [x] ~~Vyplnit MAKE_WEBHOOK_URL na Vercelu~~ ✓
- [x] ~~Single-repo workflow (dev/main větve)~~ ✓
- [ ] Přepnout příjemce emailu v `/api/kontakt/route.ts` z `martin@zacileno.cz` na `adam.hajdusek@pokladameee.cz`
- [ ] Nahrát loga + fotky řemeslníků do Sanity (Projekty skupiny)
- [ ] Přidat reálné recenze do Sanity (Reference)

### 🟡 Důležité
- [ ] Reálná hero fotka pozadí (Sanity → Hero obrázek)
- [ ] Reálné fotky galerie před/po (Sanity → Inspirace) — pak odkomentovat GalerieSekce + button v Hero
- [ ] Vyplnit GDPR a obchodní podmínky
- [ ] Google Search Console — registrace domény
- [ ] Přidat `https://www.pokladameee.cz` do Sanity CORS origins

### 🟢 Nice to have
- [ ] Napojit AkceSekce na Sanity (schema existuje, sekce zatím není na homepage)
- [ ] Přidat Akce + Inspirace do navigace v Headeru
- [ ] Google Analytics / GA4
- [ ] On-demand revalidation ze Sanity webhooku
- [ ] Kariéra — dořešit posílání životopisů v přihlašovacím formuláři (file upload → Resend attachment nebo odkaz na úložiště)
- [ ] Kariéra — volitelně napojit pozice na Sanity CMS (aktuálně hardcoded v `lib/kariera-data.ts`)

---

## Technické poznámky

- **Formuláře — flow (poptávka):** `KontaktForm` → POST `/api/kontakt` → Make webhook + Resend emaily → redirect `/dekujeme`
- **Formuláře — flow (kariéra):** `KarieraKontaktForm` → POST `/api/kontakt` (pole `typ:'kariera'`, `pozice`) → Make webhook + Resend emaily → redirect `/dekujeme-kariera`
- **Resend odesílací adresa:** `no-reply@pokladameee.cz` (doména ověřena)
- **Testovací email:** notifikace jde na `martin@zacileno.cz` — před produkcí přepnout na Adama
- **Google Fonts:** načítáme přes `<link>` tag (ne `next/font`) — build server na Vercelu nemá přístup na internet
- **Logo filter:** footer používá `logo-zakladni.svg` s `filter: brightness(0) invert(1)` pro bílou variantu
- **Sanity init:** byl spuštěn v projektu — nevytvářej nový projekt, vždy použij `8cvsenqb`
- **Seed skripty:** `scripts/seed-kontakt.ts` — vyžaduje `SANITY_TOKEN` env var
- **Fotka řemeslníka v kartách:** PNG s průhledným pozadím, doporučený poměr **2:3** (např. 600×900px), min. 800px výška
