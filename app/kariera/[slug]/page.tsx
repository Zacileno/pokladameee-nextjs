import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { pozice } from '../../../lib/kariera-data'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PoziceDetail from './components/PoziceDetail'

export function generateStaticParams() {
  return pozice.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const p = pozice.find(p => p.slug === slug)
  if (!p) return {}
  return {
    title: `${p.nazev} | Kariéra pokládámeee.cz`,
    description: p.perex,
    openGraph: {
      title: `${p.nazev} | Kariéra pokládámeee.cz`,
      description: p.perex,
      url: `https://pokladameee.cz/kariera/${p.slug}`,
      siteName: 'pokládámeee.cz',
      locale: 'cs_CZ',
      type: 'website',
    },
  }
}

export default async function PozicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = pozice.find(p => p.slug === slug)
  if (!p) notFound()

  return (
    <>
      <Header opaque />
      <main>
        <PoziceDetail pozice={p} />
      </main>
      <Footer />
    </>
  )
}
