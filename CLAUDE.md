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
| Staging (větev `dev`) | Vercel preview URL pro větev `dev` ← **sem pushovat při vývoji** |
| Produkce (větev `main`) | `pokladameee-nextjs.vercel.app` + `pokladameee.cz` |
| Sanity Studio | `pokladameee.cz/studio` (nebo staging URL `/studio`) |
| Lokální dev | `localhost:3000` |

**Workflow:** Vývoj probíhá na větvi `dev` (staging), po review se merguje do `main` (produkce).  
`pokladameee-testing` repo je archivované — nepoužívat.

---

## Git remoty (v ~/Developer/pokladameee-nextjs)

```bash
origin      → github.com/Zacileno/pokladameee-nextjs   ← jediné repo
testing-old → github.com/Zacileno/pokladameee-testing  ← archiv, nepoužívat
```

Push vždy do `origin dev` (vývoj) nebo `origin main` (produkce).

---

## Tech stack

- **Framework:** Next.js (App Router, TypeScript)
- **Styly:** Inline styles + CSS třídy v `globals.css` — žádný Tailwind
- **CMS:** Sanity (`projectId: 8cvsenqb`, dataset: `production`)
- **Formuláře:** vlastní API route `/api/kontakt` → Make webhook + Resend emaily
- **Emaily:** Resend — transakční emaily z `/api/kontakt` (Adamovi + zákazníkovi)
- **Deployment:** Vercel (auto-deploy z `main` branche)
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

## Struktura projektu

```
app/
  layout.tsx               # Root layout, metadata, favicon, Google Fonts link
  globals.css              # CSS proměnné + VŠECHNY media queries (breakpoint 900px)
  page.tsx                 # Homepage — fetchuje vše ze Sanity paralelně (Promise.all)
  components/
    Header.tsx             # Fixed, průhledný → modrý rgba(21,76,134,0.97) po scrollu
                           # onScroll() voláno při mountu (fix pro refresh na #anchor)
    HeroSection.tsx        # Fullscreen foto + formulář vpravo (skrytý na mobilu)
    VyhodySekce.tsx        # Ikonová lišta 5 ikon — Sanity: heroIkonky, mobil: 2-sloupcový grid
    SluzbySekce.tsx        # 4 služby — Sanity: sluzbySekce, mobil: horizontální kartičky
    JakToFunguje.tsx       # 4 kroky — Sanity: jakToFunguje, modrý background
    GalerieSekce.tsx       # Galerie před/po — Sanity: inspirace
    RemeselnikSekce.tsx    # Rodina značek — Sanity: rodinaZnacek (hlavička) + projekt (karty)
                           # Karty s přetékající fotkou řemeslníka (PNG průhledné pozadí, poměr 2:3)
    VyhodyBadge.tsx        # Proč nás vybrat — Sanity: procNasVybrat, 4 výhody 2-sloupcový grid
    ReferenceSekce.tsx     # Recenze — Sanity: reference (aktivni==true), fallback placeholder
    KontaktSekce.tsx       # Kontaktní sekce — Sanity: kontaktSekce
    KontaktForm.tsx        # Sdílený formulář — POST /api/kontakt, redirect /dekujeme
    Footer.tsx             # 3-sloupcový footer — Sanity: obecneNastaveni (kontakty + popis)
  api/kontakt/route.ts     # POST → Make webhook (MAKE_WEBHOOK_URL) + Resend emaily
  dekujeme/page.tsx        # Děkovná stránka po odeslání formuláře
  akce/page.tsx
  inspirace/page.tsx
  ochrana-osobnich-udaju/page.tsx
  obchodni-podminky/page.tsx
  robots.ts
  sitemap.ts
  studio/[[...tool]]/page.tsx   # Sanity Studio embedded

lib/
  sanity.ts                # Sanity client, urlFor helper, všechny GROQ queries

sanity/
  schemas/
    heroSekce.ts           # Hero obrázek (heroFotka)
    heroIkonky.ts          # Hero ikonky — array max 5 (emoji, title, sub)
    sluzbySekce.ts         # Služby — nadpis, podnadpis, array max 4 (emoji, title, desc, detail)
    jakToFunguje.ts        # Jak to funguje — array max 4 kroků (title, desc)
    procNasVybrat.ts       # Proč nás vybrat — nadpis, podnadpis, array max 4 (emoji, title, desc)
    rodinaZnacek.ts        # Rodina značek — nadpis, podnadpis, pocetKlientuCelkem
    projekt.ts             # Projekty skupiny — nazev, claim, popis, logo, fotkaRemselniku,
                           #   pocetKlientu, hodnoceni, url, barva, barvaBtn, aktivni
    inspirace.ts           # Galerie před/po (fotoPo povinné, fotoPred volitelné)
    akce.ts                # Akce a slevy (aktivni přepínač)
    reference.ts           # Recenze (jmeno, text, hvezdicky 1-5, datum, aktivni)
    obecneNastaveni.ts     # Obecné nastavení — telefon, email, pracovniDoba, region, popisFooter
    kontaktSekce.ts        # Kontaktní sekce — nadpis, podnadpis, jmeno, role, citat,
                           #   foto, telefon, email, pracovniDoba, region

  schemaTypes/
    index.ts               # Registrace všech schémat

public/
  favicon.svg              # Favicon — oranžová ikona (3 pruhy)
  assets/
    logo/                  # SVG loga (3 varianty)
    elementy/              # Brand grafické elementy
    adam.jpg               # Fotka Adama, 400×400px, pro kontaktní sekci
```

---

## Sanity — přehled dokumentů (singletons)

Každý typ má právě jeden dokument s pevným `_id`. Vytvořeny přes API seed:

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
| `heroIkonky` | Hero ikonky | ikonky[] |

Kolekce (více dokumentů): `projekt`, `inspirace`, `akce`, `reference`

---

## Responsivita — důležité pravidlo

Breakpoint: **900px**, sekundárně 480px. Vše definováno v `globals.css`.

CSS třídy pro layouty:
- `.hero-grid` — 2 sloupce → 1 sloupec, `.hero-form` skrytý
- `.vyhody-lista` / `.vyhody-item` — desktop flex row → mobil 2-sloupcový grid
- `.sluzby-grid` / `.sluzba-karta` — desktop 2 sloupce → mobil 1 sloupec, horizontální karta
- `.projekt-seznam` / `.projekt-karta` / `.projekt-karta-foto` — karty s přetékající fotkou
- `.vyhody-badge-grid` / `.vyhody-badge-karty` — gridy
- `.kontakt-grid`, `.kontakt-form-row2`, `.kontakt-form-row3`
- `.footer-grid`

**Nikdy** nepřidávej `@media` přímo do komponent — vždy jen do `globals.css`.

---

## GROQ queries (lib/sanity.ts)

Všechny queries pojmenovány jako `*_QUERY` konstanty. `page.tsx` je fetchuje paralelně přes `Promise.all`. Každá komponenta má fallback na hardcoded hodnoty pokud Sanity vrátí null.

---

## Workflow

### Jak pracujeme
1. Diskuze a zadání → **Claude.ai chat**
2. Větší změny → Claude Code píše kód a pushne na GitHub
3. Vercel auto-deployuje staging z větve `dev`, produkci z větve `main`
4. Vizuální review → Claude in Chrome (screenshot → feedback → fix)
5. Lokální preview: `npm run dev` ve Warpu

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
MAKE_WEBHOOK_URL=https://...   ← reálná URL z Make (nastaveno na Vercelu) ✓
RESEND_API_KEY=re_...          ← nastaveno na Vercelu ✓
```

**Sanity token pro seed skripty:** `~/.config/sanity/config.json` → `authToken` (osobní CLI token, nikam nepushovat, na Vercel nepatří — web čte pouze publikovaný obsah bez autentizace)

---

## Sanity CMS

- **Studio URL:** `/studio` (lokálně i produkčně)
- **Project ID:** `8cvsenqb`
- **Organizace:** Zacileno
- **revalidate:** aktuálně `0` (dev fáze — okamžitá propagace změn). Před produkcí nastavit na `3600`.

**CORS origins** (sanity.io/manage → projekt 8cvsenqb → API → CORS):
```
https://pokladameee-testing.vercel.app  ← Allow credentials: ✓
https://pokladameee-nextjs.vercel.app
http://localhost:3000
```

---

## Sanity — obsah k doplnění přes Studio

Na `pokladameee-testing.vercel.app/studio`:
- **Projekty skupiny** — nahrát logo Malujemeee + Žaluzieee, fotky řemeslníků (PNG, průhledné pozadí, poměr 2:3)
- **Hero obrázek** — nahrát reálnou hero fotku pozadí
- **Recenze** — přidat reálné recenze z Google
- **Kontaktní sekce** — nahrát foto Adama (nebo použít `/public/assets/adam.jpg`)

---

## TODO — zbývá do plnohodnotného webu

### 🔴 Kritické
- [x] ~~Registrace na resend.com, ověření domény, RESEND_API_KEY na Vercelu~~ ✓
- [x] ~~Vyplnit MAKE_WEBHOOK_URL na Vercelu~~ ✓
- [ ] Přepnout příjemce emailu v `/api/kontakt/route.ts` z `martin@zacileno.cz` na `adam.hajdusek@pokladameee.cz`
- [ ] Nahrát loga + fotky řemeslníků do Sanity (Projekty skupiny)
- [ ] Přidat reálné recenze do Sanity (Reference)

### 🟡 Důležité
- [ ] Reálná hero fotka pozadí (Sanity → Hero obrázek)
- [ ] Reálné fotky galerie před/po (Sanity → Inspirace / Galerie)
- [ ] Vyplnit GDPR a obchodní podmínky
- [ ] Google Search Console — registrace domény
- [ ] Před produkcí: `revalidate` z `0` na `3600` v `page.tsx` a `RemeselnikSekce.tsx`
- [ ] Přesměrovat pokladameee.cz na Next.js až bude testing hotový

### 🟢 Nice to have
- [ ] Napojit AkceSekce na Sanity (schema existuje, sekce zatím není na homepage)
- [ ] Přidat Akce + Inspirace do navigace v Headeru
- [ ] Google Analytics / GA4
- [ ] On-demand revalidation ze Sanity webhooku (místo časového revalidate)

---

## Technické poznámky

- **Formuláře — flow:** `KontaktForm` → POST `/api/kontakt` → Make webhook + Resend emaily → redirect `/dekujeme`
- **Resend odesílací adresa:** `no-reply@pokladameee.cz` (doména ověřena)
- **Testovací email:** notifikace jde na `martin@zacileno.cz` — před produkcí přepnout
- **Google Fonts:** načítáme přes `<link>` tag (ne `next/font`) — build server na Vercelu nemá přístup na internet
- **Logo filter:** footer používá `logo-zakladni.svg` s `filter: brightness(0) invert(1)` pro bílou variantu
- **Sanity init:** byl spuštěn v projektu — nevytvářej nový projekt, vždy použij `8cvsenqb`
- **Vercel framework preset:** musí být nastaven na **Next.js** (jinak 404) — na `pokladameee-testing` opraveno
- **Seed skripty:** `scripts/seed-kontakt.ts` — vyžaduje `SANITY_TOKEN` env var
- **Fotka řemeslníka v kartách:** PNG s průhledným pozadím, doporučený poměr **2:3** (např. 600×900px), min. 800px výška
