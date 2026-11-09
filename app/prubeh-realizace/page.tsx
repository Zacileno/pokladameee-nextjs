import type { Metadata } from 'next'
import Image from 'next/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BrandIcon from '@/app/components/BrandIcon'
import CeduleGrafika from '@/app/components/CeduleGrafika'
import ReferenceSekce from '@/app/components/ReferenceSekce'
import KontaktSekce from '@/app/components/KontaktSekce'
import FormatovanyText from '@/app/components/FormatovanyText'
import PrubehKroky, { type Krok } from './PrubehKroky'
import { client, urlFor, KONTAKT_SEKCE_QUERY, PRUBEH_REALIZACE_QUERY } from '@/lib/sanity'
import { PRUBEH_VYCHOZI, type PrubehRealizaceStranka, type PtBlock } from '@/lib/prubeh-realizace'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Průběh realizace a profesionální pokládka',
  description: 'Jak probíhá pokládka podlahy od prvního zavolání po předání: zaměření zdarma, cenová nabídka, příprava podkladu, nivelace, pokládka, lištování a předávací protokol.',
  openGraph: {
    title: 'Průběh realizace | pokládámeee.cz',
    description: 'Kompletní služba od A do Z. Podívejte se, co zahrnuje profesionální pokládka a jak se postaráme o vaši zakázku.',
    url: 'https://www.pokladameee.cz/prubeh-realizace',
  },
  alternates: { canonical: 'https://www.pokladameee.cz/prubeh-realizace' },
}

type RT = Parameters<typeof FormatovanyText>[0]['value']

const BARVY: Record<string, string> = { orange: 'var(--orange)', blue: 'var(--blue)', black: 'var(--black)', gray: 'var(--gray-400)' }

const textKomponenty: PortableTextComponents = {
  block: { normal: ({ children }) => <p>{children}</p> },
  list: { bullet: ({ children }) => <ul className="pr-odrazky">{children}</ul> },
  listItem: { bullet: ({ children }) => <li>{children}</li> },
  marks: {
    barva: ({ value, children }) => <span style={{ color: BARVY[value?.hodnota] }}>{children}</span>,
  },
}

const Text = ({ value }: { value?: PtBlock[] }) =>
  value?.length ? <div className="pr-text"><PortableText value={value} components={textKomponenty} /></div> : null

const FAKTA_IKONY = ['📐', '📋', '✅']
const DOBRE_VEDET_IKONY = ['🛡', '📊', '🕐']
// výchozí fotky k tématům pokládky (přepíše je fotka nahraná ve Studiu)
const TEMA_FOTKY = [
  { src: '/realizace/vinyl-lepeny-bruzovice-1.jpg', alt: 'Nová vinylová podlaha v rozestavěném domě — Bruzovice' },
  { src: '/realizace/vinyl-lepeny-bruzovice-2.jpg', alt: 'Rovná podlaha v podkrovní místnosti po pokládce' },
  { src: '/realizace/vinyl-karvina-chodba-seda.jpg', alt: 'Pokládka vinylové podlahy na chodbě — Karviná' },
  { src: '/realizace/koberec-koprivnice-schody-2.jpg', alt: 'Koberec na schodišti s ukončovacími profily — Kopřivnice' },
]

export default async function PrubehRealizacePage() {
  let kontaktSekce: any = null
  let data: PrubehRealizaceStranka | null = null
  try {
    ;[kontaktSekce, data] = await Promise.all([
      client.fetch(KONTAKT_SEKCE_QUERY),
      client.fetch<PrubehRealizaceStranka | null>(PRUBEH_REALIZACE_QUERY),
    ])
  } catch {}

  // prázdné pole ve Studiu = výchozí text z podkladu
  const s = PRUBEH_VYCHOZI
  const t = (pole: keyof typeof s) => (data?.[pole] as string | undefined) || (s[pole] as string)
  const uvod = data?.uvod?.length ? data.uvod : s.uvod
  const fakta = data?.fakta?.length ? data.fakta : s.fakta
  const kapitoly = data?.kapitoly?.length ? data.kapitoly : s.kapitoly

  // kapitoly s čísly kroků = cesta zakázky, ostatní = témata profesionální pokládky
  const cesta = kapitoly.filter(k => k.bloky?.some(b => b.cislo))
  const temata = kapitoly.filter(k => !k.bloky?.some(b => b.cislo))
  const kroky: Krok[] = cesta.flatMap(k => (k.bloky ?? []).filter(b => b.cislo).map(b => ({
    cislo: b.cislo!, nadpis: b.nadpis ?? '', faze: k.nadpis ?? '', obsah: <Text value={b.obsah} />,
  })))
  const dobreVedet = cesta.flatMap(k => (k.bloky ?? []).filter(b => !b.cislo))
  const cestaUvod = cesta.find(k => k.uvod?.length)?.uvod

  return (
    <>
      <Header opaque />
      <main>
        {/* ÚVOD — text vlevo, Adam s cedulí vpravo */}
        <section className="pr-hero">
          <div className="container pr-hero-grid">
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>
                <a href="/" style={{ color: 'var(--orange)' }}>Domů</a>
                <span style={{ color: 'var(--gray-700)' }}> / Průběh realizace</span>
              </p>
              <h1 className="pr-h1">
                <FormatovanyText value={data?.nadpis as RT} fallback={<>Profesionální pokládka <span>a průběh zakázky</span></>} />
              </h1>
              <div className="pr-hero-text"><Text value={uvod} /></div>
              <div className="pr-tlacitka">
                <a href="#kontakt" className="btn-primary"><span>{t('ctaTlacitko')}</span></a>
                <a href="#cesta-zakazky" className="pr-odkaz">Jak to probíhá ↓</a>
              </div>
            </div>
            <CeduleGrafika text="Od A do Z" />
          </div>
          <div className="container">
            <div className="pr-fakta">
              {fakta.map((f, i) => (
                <div key={f._key} className="pr-fakt">
                  <BrandIcon emoji={FAKTA_IKONY[i % FAKTA_IKONY.length]} size={52} />
                  <div>
                    <h2>{f.nadpis}</h2>
                    <p>{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CESTA ZAKÁZKY — posuvník 12 kroků */}
        <section id="cesta-zakazky" className="section pr-cesta">
          <div className="container">
            <div className="pr-hlava pr-hlava-stred">
              <p className="pr-stitek">{cesta[0]?.stitek}</p>
              <h2 className="section-title">{t('prehledNadpis')}</h2>
              {cestaUvod && <div className="pr-hlava-text"><Text value={cestaUvod} /></div>}
            </div>
            <p className="pr-cesta-tip">{t('prehledText')}</p>
            <PrubehKroky kroky={kroky} />
          </div>
        </section>

        {/* DOBRÉ VĚDĚT — bloky cesty zakázky bez čísla */}
        {dobreVedet.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="pr-hlava pr-hlava-stred">
                <h2 className="section-title">{t('dobreVedetNadpis')}</h2>
              </div>
              <div className="pr-vedet-grid">
                {dobreVedet.map((b, i) => (
                  <div key={b._key} className="pr-vedet">
                    <BrandIcon emoji={DOBRE_VEDET_IKONY[i % DOBRE_VEDET_IKONY.length]} size={56} />
                    <h3>{b.nadpis}</h3>
                    <Text value={b.obsah} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PROFESIONÁLNÍ POKLÁDKA — témata střídavě fotka/text, podtémata rozbalovací */}
        <section className="section" style={{ background: 'var(--gray-50)' }}>
          <div className="container">
            <div className="pr-hlava pr-hlava-stred">
              <p className="pr-stitek">{temata[0]?.stitek}</p>
              <h2 className="section-title">{t('pokladkaNadpis')}</h2>
              <p className="pr-hlava-text">{t('pokladkaText')}</p>
            </div>
            <div className="pr-temata">
              {temata.map((k, i) => {
                const foto = k.fotky?.find(f => f.asset)
                return (
                  <div key={k._key} className={`pr-tema${i % 2 ? ' pr-tema-obracene' : ''}`}>
                    <div className="pr-tema-foto">
                      {foto
                        ? <Image src={urlFor(foto).width(1000).url()} alt={foto.alt || k.nadpis || ''} fill unoptimized style={{ objectFit: 'cover' }} />
                        : <Image src={TEMA_FOTKY[i % TEMA_FOTKY.length].src} alt={TEMA_FOTKY[i % TEMA_FOTKY.length].alt} fill unoptimized style={{ objectFit: 'cover' }} />}
                      <span className="pr-tema-cislo">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <div className="pr-tema-obsah">
                      <h3>{k.nadpis}</h3>
                      <Text value={k.uvod} />
                      <div className="pr-akordeon">
                        {(k.bloky ?? []).map((b, j) => (
                          <details key={b._key} open={j === 0}>
                            <summary>{b.nadpis}</summary>
                            <Text value={b.obsah} />
                          </details>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* VÝZVA — modrý pruh s Adamem (inspirace Malujemeee) */}
        <section className="pr-cta">
          <div className="container">
            <div className="pr-cta-box">
              <div className="pr-cta-obsah">
                <h2>{t('ctaNadpis')}</h2>
                <p>{t('ctaText')}</p>
                <div className="pr-tlacitka">
                  <a href="#kontakt" className="btn-primary"><span>{t('ctaTlacitko')}</span></a>
                  <a href="tel:+420790388487" className="pr-cta-tel">📞 +420 790 388 487</a>
                </div>
              </div>
              <img src="/assets/adam-postava.png" alt="Adam Hajdušek z pokládámeee.cz" width={469} height={900} className="pr-cta-adam" />
            </div>
          </div>
        </section>

        <ReferenceSekce />
        <KontaktSekce kontakt={kontaktSekce} />
      </main>
      <Footer />
    </>
  )
}
