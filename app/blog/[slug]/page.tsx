import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import KontaktSekce from '@/app/components/KontaktSekce'
import { portableTextComponents } from '@/app/components/PortableTextComponents'
import BlogCard, { type BlogPostSummary } from '../BlogCard'
import { client, BLOG_POST_QUERY, BLOG_POSTS_QUERY, BLOG_SLUGS_QUERY, KONTAKT_SEKCE_QUERY } from '@/lib/sanity'
import { BLOG_FALLBACK_POSTS } from '@/lib/blog-fallback'

export const revalidate = 0

type BlogPostData = {
  _id?: string
  title?: string
  kategorie?: string
  perex?: string
  datumVydani?: string
  obrazekUrl?: string
  obsah?: any[]
  seoTitle?: string
  seoDescription?: string
}

function formatDatum(iso?: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })
}

async function getPost(slug: string): Promise<{ data: BlogPostData; isFallback: boolean } | null> {
  try {
    const data = await client.fetch<BlogPostData | null>(BLOG_POST_QUERY, { slug })
    if (data) return { data, isFallback: false }
  } catch {}

  const fallback = BLOG_FALLBACK_POSTS.find(p => p.slug === slug)
  if (!fallback) return null
  return {
    data: {
      title: fallback.title,
      kategorie: fallback.kategorie,
      perex: fallback.perex,
      datumVydani: fallback.datumVydani,
    },
    isFallback: true,
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch<{ slug: string }[]>(BLOG_SLUGS_QUERY)
    if (slugs?.length) return slugs.map(s => ({ slug: s.slug }))
  } catch {}
  return BLOG_FALLBACK_POSTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const result = await getPost(slug)
  if (!result) return {}
  const { data } = result
  const title = data.seoTitle || data.title || 'Blog'
  const description = data.seoDescription || data.perex || ''

  return {
    title,
    description,
    openGraph: {
      title: `${title} | pokládámeee.cz`,
      description,
      url: `https://pokladameee.cz/blog/${slug}`,
      siteName: 'pokládámeee.cz',
      locale: 'cs_CZ',
      type: 'article',
      ...(data.obrazekUrl ? { images: [{ url: data.obrazekUrl }] } : {}),
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const result = await getPost(slug)
  if (!result) notFound()
  const { data, isFallback } = result

  let kontaktSekce: any = null
  let souvisejici: BlogPostSummary[] = []
  try {
    kontaktSekce = await client.fetch(KONTAKT_SEKCE_QUERY)
  } catch {}
  try {
    const all = await client.fetch<BlogPostSummary[]>(BLOG_POSTS_QUERY)
    souvisejici = (all || []).filter(p => p.slug !== slug).slice(0, 3)
  } catch {}

  const fallbackOdstavce = isFallback ? BLOG_FALLBACK_POSTS.find(p => p.slug === slug)?.odstavce : null

  return (
    <>
      <Header opaque />

      <section style={{ paddingTop: 120, paddingBottom: 40 }}>
        <div className="container">
          <div className="blog-clanek-hlavicka">
            <nav className="blog-breadcrumb">
              <a href="/">Domů</a>
              <span>›</span>
              <a href="/blog">Blog</a>
              {data.kategorie && (
                <>
                  <span>›</span>
                  <span>{data.kategorie}</span>
                </>
              )}
            </nav>
            <div className="blog-clanek-meta">
              {data.kategorie && <span className="blog-karta-kategorie">{data.kategorie}</span>}
              <span style={{ fontSize: 13, color: 'var(--gray-400)' }}>{formatDatum(data.datumVydani)}</span>
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', fontWeight: 900, lineHeight: 1.15 }}>
              {data.title}
            </h1>
          </div>

          {data.obrazekUrl && (
            <div className="blog-clanek-obrazek">
              <Image src={data.obrazekUrl} alt={data.title || ''} width={1200} height={514} unoptimized style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}

          <div className="blog-clanek-obsah">
            {data.obsah?.length ? (
              <PortableText value={data.obsah} components={portableTextComponents} />
            ) : (
              fallbackOdstavce?.map((odstavec, i) => <p key={i}>{odstavec}</p>)
            )}
          </div>
        </div>
      </section>

      {souvisejici.length > 0 && (
        <section className="section" style={{ background: 'var(--gray-50)' }}>
          <div className="container">
            <h2 className="section-title" style={{ fontSize: 28, marginBottom: 32 }}>Související články</h2>
            <div className="blog-souvisejici-grid">
              {souvisejici.map((post, i) => (
                <BlogCard key={post._id || post.slug || i} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      <KontaktSekce kontakt={kontaktSekce} />

      <Footer />
    </>
  )
}
