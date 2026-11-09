import type { Metadata } from 'next'
import Image from 'next/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BrandIcon from '@/app/components/BrandIcon'
import ReferenceSekce from '@/app/components/ReferenceSekce'
import KontaktSekce from '@/app/components/KontaktSekce'
import FormatovanyText from '@/app/components/FormatovanyText'
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

type RT = Parameters<typeof FormatovanyText>[0]['value']

const FAKTA_IKONY = ['📐', '📋', '✅']

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
  const uvod = data?.uvod?.length ? data.uvod : s.uvod
  const fakta = data?.fakta?.length ? data.fakta : s.fakta
  const kapitoly = data?.kapitoly?.length ? data.kapitoly : s.kapitoly

  // přehled kroků: kapitoly, které mají číslované bloky
  const faze = kapitoly
    .map(k => ({ nadpis: k.nadpis, kroky: (k.bloky ?? []).filter(b => b.cislo) }))
    .filter(f => f.kroky.length)

  return (
    <>
      <Header opaque />
      <main>
        {/* ÚVOD */}
        <section className="pr-hero">
          <div className="container">
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }}>
              <a href="/" style={{ color: 'var(--orange)' }}>Domů</a>
              <span style={{ color: 'var(--gray-400)' }}> / Průběh realizace</span>
            </p>
            <h1 className="section-title">
              <FormatovanyText value={data?.nadpis as RT} fallback={<>Profesionální pokládka<br /><span>a průběh zakázky</span></>} />
            </h1>
            <div className="pr-hero-text"><Text value={uvod} /></div>
            <div className="pr-hero-tlacitka">
              <a href="#kontakt" className="btn-primary"><span>{data?.ctaTlacitko || s.ctaTlacitko}</span></a>
              <a href="#cesta-zakazky" className="pr-odkaz">Projít cestu zakázky ↓</a>
            </div>
            <div className="pr-fakta">
              {fakta.map((f, i) => (
                <div key={f._key} className="pr-fakt">
                  <BrandIcon emoji={FAKTA_IKONY[i % FAKTA_IKONY.length]} size={48} />
                  <div>
                    <h2>{f.nadpis}</h2>
                    <p>{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PŘEHLED CESTY ZAKÁZKY */}
        <section id="cesta-zakazky" className="section pr-prehled">
          <div className="container">
            <h2 className="section-title">{data?.prehledNadpis || s.prehledNadpis}</h2>
            <p className="pr-prehled-text">{data?.prehledText || s.prehledText}</p>
            <div className="pr-faze-grid">
              {faze.map((f, i) => (
                <div key={i} className="pr-faze">
                  <h3>{f.nadpis}</h3>
                  <ol>
                    {f.kroky.map(b => (
                      <li key={b._key}>
                        <a href={`#krok-${b.cislo}`}>
                          <span className="pr-cislo-maly">{b.cislo}</span>
                          <span>{b.nadpis}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* KAPITOLY */}
        {kapitoly.map((k, i) => (
          <section key={k._key} className="section" style={{ background: i % 2 ? 'var(--gray-50)' : 'white' }}>
            <div className="container">
              <div className="pr-kapitola-hlava">
                {k.stitek && <p className="pr-stitek">{k.stitek}</p>}
                {k.nadpis && <h2 className="section-title">{k.nadpis}</h2>}
                <Text value={k.uvod} />
              </div>
              {!!k.fotky?.length && (
                <div className="pr-fotky">
                  {k.fotky.filter(f => f.asset).map((f, j) => (
                    <figure key={j}>
                      <div className="pr-foto">
                        <Image src={urlFor(f).width(900).url()} alt={f.alt || f.popisek || ''} fill unoptimized style={{ objectFit: 'cover' }} />
                      </div>
                      {f.popisek && <figcaption>{f.popisek}</figcaption>}
                    </figure>
                  ))}
                </div>
              )}
              <div className="pr-bloky">
                {(k.bloky ?? []).map(b => {
                  const siroky = b.obsah?.some(o => o.listItem)
                  return (
                    <div key={b._key} id={b.cislo ? `krok-${b.cislo}` : undefined} className={`pr-blok${b.cislo ? ' pr-blok-krok' : ''}${siroky ? ' pr-blok-siroky' : ''}`}>
                      {b.cislo && <span className="pr-cislo">{b.cislo}</span>}
                      {b.nadpis && <h3>{b.nadpis}</h3>}
                      <Text value={b.obsah} />
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        ))}

        {/* VÝZVA */}
        <section className="pr-cta">
          <div className="container">
            <h2>{data?.ctaNadpis || s.ctaNadpis}</h2>
            <p>{data?.ctaText || s.ctaText}</p>
            <div className="pr-hero-tlacitka" style={{ justifyContent: 'center' }}>
              <a href="#kontakt" className="btn-primary"><span>{data?.ctaTlacitko || s.ctaTlacitko}</span></a>
              <a href="tel:+420790388487" className="pr-cta-tel">📞 +420 790 388 487</a>
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
