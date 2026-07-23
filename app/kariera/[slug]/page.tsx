import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import JsonLd from '../../components/JsonLd'
import PoziceDetail from './components/PoziceDetail'
import { client, KARIERNI_POZICE_QUERY, KARIERNI_POZICE_DETAIL_QUERY, KARIERNI_POZICE_SLUGS_QUERY } from '@/lib/sanity'
import { pozice as POZICE_FALLBACK, type Pozice } from '@/lib/kariera-data'

async function getVsechnyPozice(): Promise<Pozice[]> {
  try {
    const data = await client.fetch<Pozice[]>(KARIERNI_POZICE_QUERY)
    if (data?.length) return data
  } catch {}
  return POZICE_FALLBACK
}

async function getPozice(slug: string): Promise<Pozice | undefined> {
  try {
    const data = await client.fetch<Pozice | null>(KARIERNI_POZICE_DETAIL_QUERY, { slug })
    if (data) return data
  } catch {}
  return POZICE_FALLBACK.find(p => p.slug === slug)
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(KARIERNI_POZICE_SLUGS_QUERY)
    if (slugs?.length) return slugs.map(s => ({ slug: s.slug }))
  } catch {}
  return POZICE_FALLBACK.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = await getPozice(slug)
  if (!p) return {}
  return {
    title: `${p.nazev} | Kariéra pokládámeee.cz`,
    description: p.perex,
    openGraph: {
      title: `${p.nazev} | Kariéra pokládámeee.cz`,
      description: p.perex,
      url: `https://www.pokladameee.cz/kariera/${p.slug}`,
      siteName: 'pokládámeee.cz',
      locale: 'cs_CZ',
      type: 'website',
    },
    alternates: { canonical: `https://www.pokladameee.cz/kariera/${p.slug}` },
  }
}

function seznamNaHtml(nadpis: string, polozky: string[]) {
  if (!polozky?.length) return ''
  return `<p>${nadpis}:</p><ul>${polozky.map(i => `<li>${i}</li>`).join('')}</ul>`
}

export default async function PozicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [p, vsechnyPozice] = await Promise.all([getPozice(slug), getVsechnyPozice()])
  if (!p) notFound()

  const datumPosted = p.datumZverejneni || '2026-01-01'
  const validThrough = new Date(new Date(datumPosted).getTime() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)

  const jobPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: p.nazev,
    description: `<p>${p.perex}</p>${seznamNaHtml('Náplň práce', p.naplnPrace)}${seznamNaHtml('Požadujeme', p.pozadujeme)}${seznamNaHtml('Nabízíme', p.nabizime)}`,
    datePosted: datumPosted,
    validThrough,
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'pokládámeee.cz',
      sameAs: 'https://www.pokladameee.cz',
      logo: 'https://www.pokladameee.cz/assets/logo/logo-zakladni.svg',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressRegion: p.regionLabel,
        addressCountry: 'CZ',
      },
    },
  }

  return (
    <>
      <JsonLd data={jobPostingJsonLd} />
      <Header opaque />
      <main>
        <PoziceDetail pozice={p} vsechnyPozice={vsechnyPozice} />
      </main>
      <Footer />
    </>
  )
}
