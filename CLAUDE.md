# pokládámeee.cz — CLAUDE.md

Tento soubor je zdrojem pravdy pro vývoj webu pokládámeee.cz.
Vždy ho čti před zahájením práce.

---

## Projekt

**Web:** pokládámeee.cz — firma na pokládku vinylových podlah v MSK  
**Kontakt:** Adam Hajdušek (zakladatel & technik)  
**Telefon:** +420 730 454 309  
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

**⚠️ Kanonická doména pro metadata/SEO je vždy `https://www.pokladameee.cz`** (bez diakritiky, s `www`). Apex (`pokladameee.cz`) i `http://` na ni přesměrovávají (Cloudflare → Vercel). **Nikdy nepoužívat „pokládámeee.cz" s diakritikou** v `metadataBase`, `canonical`, `sitemap.ts` ani OG tagách — taková doména neexistuje (ani doslova, ani její IDN/punycode tvar `xn--pokldmeee-31ab.cz` není registrovaný). Diakritika je jen ve značce/brandu (`pokládámeee.cz` v title/textu), nikdy v URL.

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
- **Rich text:** `@portabletext/react` — renderování Sanity Portable Text (zatím jen blog)
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

### Podstránky služeb (Sluzby)

| Podstránka | Soubory | Stav |
|---|---|---|
| **Vinylová podlaha** | `/app/sluzby/vinylova-podlaha/` | ✅ hotová + Sanity · na `main` i `dev` |
| **PVC podlaha** | `/app/sluzby/pvc-podlaha/` | ✅ hotová + Sanity schema + seed · texty přepsané dle klientova brief · na `main` i `dev` |
| **Koberce** | `/app/sluzby/koberce/` | ✅ hotová + Sanity schema + seed · texty přepsané dle klientova brief · na `main` i `dev` |
| **Dřevěná podlaha** | `/app/sluzby/drevena-podlaha/` | ✅ hotová + Sanity schema + seed · texty přepsané dle klientova brief · na `main` i `dev` |

Struktura je identická — všechny podstránky fetchují ze Sanity, mají fallback na hardcoded texty, FAQ akordeon, reference strip, atd.

**Důležité:** PVC, Koberce a Dřevěná podlaha jsou už živé i na produkci (`main`), ale **záměrně nejsou nikde odkázané** (ne v Headeru, ne v sitemap.ts) — přístupné jen přímou URL, stejně jako vinylová podlaha. Až budou finální (reálné foto, schválení), přidat do navigace v Headeru a do `app/sitemap.ts`.

### FAQ stránka (`/app/faq/`)

Samostatná stránka `/faq` — dřív na ni Header odkazoval, ale neexistovala (404). Skládá se ze 2 částí:
- **FAQ ze 4 podstránek služeb** — natahuje se živě ze Sanity (stejné GROQ query jako podstránky), needituje se samostatně — úpravy dělat přes „Podstránka: X" → FAQ v každém dokumentu.
- **Sekce „Obecné otázky"** — natvrdo v kódu (`app/faq/page.tsx`, konstanta `OBECNE`), **není v Sanity** — vědomě odloženo, needitovatelné přes Studio.

Na `main` i `dev`.

### Blog (`/app/blog/`)

- **`/blog`** — přehledová stránka, grid článků (`.blog-grid`), stránkování po 9 (`?page=N`)
- **`/blog/[slug]`** — detail článku: breadcrumb, hlavní obrázek, obsah článku (Portable Text nebo surové HTML, viz níže), „Související články" (max 3, ze stejné kolekce), na konci `<KontaktSekce>` jako CTA
- **Obsah v Sanity** — dokument `blogPost` (kolekce, ne singleton). Editace přes Studio → „Blog — článek". Pole: `title`, `slug`, `kategorie`, `perex`, `hlavniObrazek`, `datumVydani`, `pouzitHtmlKod`, `obsah`, `obsahHtml`, `seoTitle`/`seoDescription` (volitelné override).
- **Přepínač editoru:** boolean pole `pouzitHtmlKod` ve Studiu přepíná, které ze dvou polí se použije — **vypnuto** (výchozí) = normální rich-text editor, pole `obsah` (Portable Text: H2/H3, tučně, kurzíva, odrážky, odkazy, obrázky). **Zapnuto** = zobrazí se místo toho pole `obsahHtml` (syrový HTML kód), vykreslí se přes `dangerouslySetInnerHTML` (`app/blog/[slug]/page.tsx`). Zbytek stránky (hero obrázek, breadcrumb, související články, CTA) je nezávislý na této volbě. **Pozor:** `obsahHtml` je bez sanitizace — editovat by ho měl jen důvěryhodný správce (Adam), ne cizí přispěvatelé.
- **Renderování Portable Textu:** `@portabletext/react` + `app/components/PortableTextComponents.tsx` (mapování H2/H3/odkazy/obrázky na styl webu)
- **Fallback:** `lib/blog-fallback.ts` — 3 demo články použité, pokud Sanity nevrátí žádný `blogPost` (stejný vzor jako u ostatních podstránek)
- **Bez odkazu v navigaci** — zatím se drží stejné konvence jako PVC/koberce/dřevo: přístupné přímou URL (`/blog`), zvážit přidání do Headeru a `sitemap.ts`, až budou nahrané reálné obrázky článků
- **Chybí:** `hlavniObrazek` u demo článků (seed skript ho nenastavuje — nahrát ručně přes Studio)

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
  PortableTextComponents.tsx  # Mapování Sanity Portable Text bloků na styl webu (blog)
  JsonLd.tsx           # Vykreslení <script type="application/ld+json"> — structured data
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
  kariera/page.tsx                  # /kariera — kariéra stránka, fetchuje KARIERNI_POZICE_QUERY (fallback kariera-data.ts)
  kariera/[slug]/page.tsx           # /kariera/[slug] — detail pozice + JobPosting JSON-LD
  kariera/components/               # KarieraHero, TestimonialCarousel, BenefityGrid,
                                    #   FilozofieSecce, KulturaGrid, VolnePozice, KarieraKontaktForm
  kariera/[slug]/components/        # PoziceDetail
  sluzby/vinylova-podlaha/
    page.tsx                        # Server component, fetchuje VINYLOVA_PODLAHA_QUERY + KONTAKT_SEKCE_QUERY
    FaqItem.tsx                     # Client component (useState) — FAQ akordeon
  sluzby/pvc-podlaha/               # Stejná struktura jako vinylova-podlaha
  sluzby/koberce/                   # Stejná struktura jako vinylova-podlaha
  sluzby/drevena-podlaha/           # Stejná struktura jako vinylova-podlaha
  faq/
    page.tsx                        # Agreguje FAQ ze 4 podstránek (živě ze Sanity) + hardcoded obecné otázky
    FaqItem.tsx
  blog/
    page.tsx                        # /blog — grid článků + stránkování (?page=N)
    BlogCard.tsx                    # Karta článku (obrázek, kategorie, datum, perex, "Číst dále")
    Pagination.tsx                  # Číslované stránkování
    [slug]/page.tsx                 # Detail článku — breadcrumb, obsah (Portable Text nebo HTML), související, KontaktSekce CTA
  akce/page.tsx
  inspirace/page.tsx
  ochrana-osobnich-udaju/page.tsx
  obchodni-podminky/page.tsx
  robots.ts
  sitemap.ts                        # Neobsahuje PVC/koberce/drevena/faq/blog — zvážit doplnění, až budou finální
  studio/[[...tool]]/page.tsx       # Sanity Studio embedded

lib/
  sanity.ts             # Sanity client, urlFor helper, všechny GROQ queries (*_QUERY konstanty)
  kariera-data.ts       # Fallback data 4 pozic (slug, texty, bullet listy) — použije se, pokud Sanity nevrátí karierniPozice
  gtm.ts                # pushDataLayerEvent() helper — custom GTM dataLayer eventy
  blog-fallback.ts      # 3 demo články — fallback, pokud Sanity nevrátí blogPost dokumenty

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
    vinylovaPodlaha.ts  # Podstránka vinylová podlaha — singleton, vše editovatelné
                        #   hero, istrip[], typy[], benefity[], kroky[],
                        #   referenceStrip, faq[]
    pvcPodlaha.ts       # Podstránka PVC podlaha — stejná struktura jako vinylovaPodlaha
    kobercovaPodlaha.ts # Podstránka Kobercová podlaha — stejná struktura
    drevenaPodlaha.ts   # Podstránka Dřevěná podlaha — stejná struktura
    blogPost.ts          # Blog — článek (kolekce, ne singleton): title, slug, kategorie,
                          #   perex, hlavniObrazek, datumVydani, pouzitHtmlKod (přepínač),
                          #   obsah (Portable Text) / obsahHtml (surové HTML, dle přepínače)
    karierniPozice.ts    # Kariéra — pozice (kolekce, ne singleton): nazev, slug, region,
                          #   regionLabel, typ, typLabel, perex, naplnPrace[], pozadujeme[],
                          #   nabizime[], datumZverejneni (i pro JobPosting JSON-LD), aktivni
  schemaTypes/
    index.ts            # Registrace schémat pro Next.js stránky (import v app/)
  lib/
    client.ts            # Sanity klient pro seed skripty — token: process.env.SANITY_TOKEN,
                          #   useCdn: !SANITY_TOKEN (bez tokenu by create/replace mutace padaly na 403)

scripts/
  seed-kontakt.ts           # Seed kontaktSekce dokumentu
  seed-pvc-podlaha.ts        # Seed pvcPodlaha dokumentu
  seed-koberce.ts            # Seed kobercovaPodlaha dokumentu
  seed-drevena-podlaha.ts    # Seed drevenaPodlaha dokumentu
  seed-vinylova-podlaha.ts  # Seed vinylovaPodlaha dokumentu (demo obsah)
  seed-blog.ts               # Seed 3 demo blogPost dokumentů (bez hlavniObrazek — nahrát přes Studio)
  seed-kariera.ts             # Seed 4 karierniPozice dokumentů z lib/kariera-data.ts + datumZverejneni

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
| `vinylovaPodlaha` | Podstránka: Vinylová podlaha | hero, istrip[], typy[], benefity[], kroky[], referenceStrip, faq[] |
| `pvcPodlaha` | Podstránka: PVC podlaha | hero, istrip[], typy[], benefity[], kroky[], referenceStrip, faq[] |
| `kobercovaPodlaha` | Podstránka: Kobercová podlaha | hero, istrip[], typy[], benefity[], kroky[], referenceStrip, faq[] |
| `drevenaPodlaha` | Podstránka: Dřevěná podlaha | hero, istrip[], typy[], benefity[], kroky[], referenceStrip, faq[] |

Kolekce (více dokumentů): `projekt`, `inspirace`, `akce`, `reference`, `blogPost`, `karierniPozice`

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
- **Blog — články** — nahrát `hlavniObrazek` u 3 demo článků (seed skript ho nenastavuje)

---

## TODO — zbývá do plnohodnotného webu

### 🔴 Kritické
- [x] ~~Registrace na resend.com, ověření domény, RESEND_API_KEY na Vercelu~~ ✓
- [x] ~~Vyplnit MAKE_WEBHOOK_URL na Vercelu~~ ✓
- [x] ~~Single-repo workflow (dev/main větve)~~ ✓
- [x] ~~PVC podlaha — nová podstránka (/sluzby/pvc-podlaha)~~ ✓
- [x] ~~Koberce — nová podstránka (/sluzby/koberce)~~ ✓
- [x] ~~Dřevěná podlaha — nová podstránka (/sluzby/drevena-podlaha)~~ ✓
- [x] ~~Spustit seed skript pro PVC podlahy~~ ✓
- [x] ~~Spustit seed skript pro Koberce~~ ✓
- [x] ~~Spustit seed skript pro Dřevěnou podlahu~~ ✓
- [x] ~~Přepsat texty PVC/Koberce/Dřevěná podlaha podle klientova vydefinování služby (brief)~~ ✓
- [x] ~~Nasadit PVC/Koberce/Dřevěná podlaha i na produkci (main), bez odkazu v navigaci~~ ✓
- [x] ~~Oprava: `/faq` vracelo 404 (odkaz v Headeru existoval, stránka ne) — vytvořena a nasazena~~ ✓
- [x] ~~Oprava: odkazy „Jak to funguje" / „Reference" mimo homepage nefungovaly~~ ✓
- [x] ~~Vlastní GTM dataLayer event `formular_odeslani` při úspěšném odeslání formuláře~~ ✓
- [x] ~~Blogová sekce (/blog + /blog/[slug]) — Sanity CMS, grid, stránkování, SEO/OG, responzivní~~ ✓
- [x] ~~Kritická SEO chyba: kanonická doména v metadatech/sitemapu/robots.txt neexistovala (diakritika) — opraveno na www.pokladameee.cz~~ ✓
- [x] ~~Vinylová podlaha — chyběla vlastní metadata (title/description/OG)~~ ✓
- [x] ~~/dekujeme a /dekujeme-kariera — nastaveno noindex,follow~~ ✓
- [x] ~~Vlastní `alternates.canonical` na všech 16 stránkách (dosud dědily z homepage)~~ ✓
- [x] ~~Structured data (JSON-LD) — LocalBusiness site-wide, FAQPage na /faq, Article na blog článcích~~ ✓
- [x] ~~Structured data (JSON-LD) — JobPosting na detailu kariérních pozic~~ ✓
- [x] ~~Vlastní 404 stránka v designu webu~~ ✓
- [x] ~~Kariéra — napojení pozic na Sanity CMS (fallback na lib/kariera-data.ts)~~ ✓
- [ ] Nahrát loga + fotky řemeslníků do Sanity (Projekty skupiny)
- [ ] Přidat reálné recenze do Sanity (Reference)

### 🟡 Důležité
- [ ] Reálná hero fotka pozadí (Sanity → Hero obrázek)
- [ ] Reálné fotky galerie před/po (Sanity → Inspirace) — pak odkomentovat GalerieSekce + button v Hero
- [ ] Vinylová podlaha — nahrát reálnou hero fotku realizace (Sanity → Podstránka: Vinylová podlaha → Hero fotka)
- [ ] PVC podlaha — nahrát reálnou hero fotku realizace (Sanity → Podstránka: PVC podlaha → Hero fotka)
- [ ] Koberce — nahrát reálnou hero fotku realizace (Sanity → Podstránka: Kobercová podlaha → Hero fotka)
- [ ] Dřevěná podlaha — nahrát reálnou hero fotku realizace (Sanity → Podstránka: Dřevěná podlaha → Hero fotka)
- [ ] Vinylová podlaha — přidat do navigace v Headeru (až bude finální)
- [ ] PVC podlaha — přidat do navigace v Headeru (až bude finální)
- [ ] Koberce — přidat do navigace v Headeru (až bude finální)
- [ ] Dřevěná podlaha — přidat do navigace v Headeru (až bude finální)
- [ ] Přidat PVC/Koberce/Dřevěná podlaha/FAQ/Blog do `app/sitemap.ts` (až budou finální — dnes tam záměrně nejsou, viz podstránky výše)
- [ ] Blog — nahrát hlavní obrázky ke 3 demo článkům, přidat do navigace v Headeru (až bude finální)
- [ ] Blog — napsat reálné články (demo obsah slouží jen jako ukázka struktury/designu)
- [ ] Vinylová podlaha — projít a případně přepsat texty podle klientova brief (zatím záměrně beze změny, na výslovné přání)
- [ ] Vyplnit GDPR a obchodní podmínky
- [x] ~~Google Search Console — registrace domény (`www.pokladameee.cz`) + odeslání sitemap.xml~~ ✓
- [x] ~~Přidat `https://www.pokladameee.cz` do Sanity CORS origins~~ ✓

### 🟢 Nice to have
- [ ] Napojit AkceSekce na Sanity (schema existuje, sekce zatím není na homepage)
- [ ] Přidat Akce + Inspirace do navigace v Headeru
- [x] ~~Google Analytics / GA4 — trigger + konverze v GTM UI pro poptávkový formulář~~ ✓
- [ ] Google Analytics / GA4 — trigger + konverze v GTM UI pro kariérní formulář (`typ_formulare: kariera`) — zatím nenastaveno
- [ ] On-demand revalidation ze Sanity webhooku
- [ ] Kariéra — dořešit posílání životopisů v přihlašovacím formuláři (file upload → Resend attachment nebo odkaz na úložiště)
- [ ] Sekce „Obecné otázky" na `/faq` — vytvořit Sanity schema, aby šla editovat přes Studio (zatím vědomě hardcoded v kódu, na výslovné přání ponecháno)

---

## Technické poznámky

- **Formuláře — flow (poptávka):** `KontaktForm` → POST `/api/kontakt` → Make webhook + Resend emaily → `pushDataLayerEvent('formular_odeslani', { typ_formulare: 'poptavka' })` → redirect `/dekujeme`
- **Formuláře — flow (kariéra):** `KarieraKontaktForm` → POST `/api/kontakt` (pole `typ:'kariera'`, `pozice`) → Make webhook + Resend emaily → `pushDataLayerEvent('formular_odeslani', { typ_formulare: 'kariera', pozice })` → redirect `/dekujeme-kariera`
- **GTM dataLayer event:** `gtm.historyChange-v2` NENÍ spolehlivý signál odeslání formuláře — je to obecná GTM systémová událost při jakékoli klientské navigaci. Proto vlastní `formular_odeslani` (viz `lib/gtm.ts`), pushuje se až po potvrzeném `res.ok`, ne na klik tlačítka.
- **Resend odesílací adresa:** `no-reply@pokladameee.cz` (doména ověřena)
- **Notifikace o poptávce i přihlášce na kariéru:** chodí jen na `adam.hajdusek@pokladameee.cz` (Martin odebrán z obou)
- **Google Fonts:** načítáme přes `<link>` tag (ne `next/font`) — build server na Vercelu nemá přístup na internet
- **Logo filter:** footer používá `logo-zakladni.svg` s `filter: brightness(0) invert(1)` pro bílou variantu
- **Sanity init:** byl spuštěn v projektu — nevytvářej nový projekt, vždy použij `8cvsenqb`
- **Seed skripty:** `scripts/seed-*.ts` — vyžadují `SANITY_TOKEN` env var (`~/.config/sanity/config.json` → `authToken`). Spuštění: `SANITY_TOKEN=xxx npx tsx scripts/seed-xxx.ts`
- **Sanity schéma — dvě místa registrace:** nové schema VŽDY přidat na obě místa:
  1. `sanity/schemaTypes/index.ts` — pro Next.js stránky
  2. `sanity.config.ts` → pole `schema.types` — pro Sanity Studio UI (bez tohoto se dokument v Studiu nezobrazí)
- **Fotka řemeslníka v kartách:** PNG s průhledným pozadím, doporučený poměr **2:3** (např. 600×900px), min. 800px výška
- **KontaktSekce na podstránkách:** vždy fetchovat `KONTAKT_SEKCE_QUERY` a předat jako prop — jinak se zobrazí jen iniciály místo fotky Adama
- **Async server component vs. client component:** pokud stránka potřebuje `useState` (např. FAQ akordeon), extrahovat interaktivní část do samostatného `'use client'` souboru — async server komponenty (`RemeselnikSekce` aj.) nelze renderovat z `'use client'` stránky

---

## Workflow — nová CMS stránka (postup)

Při budování nové stránky s Sanity daty postupuj vždy takto:

1. **Design + placeholder obsah** — nejdřív finalizujeme design s hardcoded hodnotami, schválíme vizuál
2. **Schema** — po schválení designu vytvořit `sanity/schemas/xxx.ts` a zaregistrovat na obou místech (`schemaTypes/index.ts` + `sanity.config.ts`)
3. **GROQ query** — přidat do `lib/sanity.ts`
4. **Napojit stránku** — stránka fetchuje data, hardcoded hodnoty zůstávají jako fallback
5. **Seed skript** — vytvořit `scripts/seed-xxx.ts` s demo obsahem a **sám navrhnout jeho spuštění** uživateli — nečekat, až se zeptá
6. **Spustit seed** — `SANITY_TOKEN=xxx npx tsx scripts/seed-xxx.ts`
7. **Commitnout** schema + seed skript + aktualizovat CLAUDE.md

**Klíčové pravidlo:** Krok 5 (seed skript + návrh spuštění) provádíme proaktivně — po dokončení napojení na Sanity automaticky upozornit uživatele, že je připravený seed a nabídnout spuštění. Uživatel nemusí o seed říkat sám.
