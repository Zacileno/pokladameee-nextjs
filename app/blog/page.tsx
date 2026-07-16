import type { Metadata } from 'next'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BlogCard, { type BlogPostSummary } from './BlogCard'
import Pagination from './Pagination'
import { client, BLOG_POSTS_QUERY } from '@/lib/sanity'
import { BLOG_FALLBACK_POSTS } from '@/lib/blog-fallback'

export const revalidate = 0

const PAGE_SIZE = 9

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Rady, návody a tipy k výběru a pokládce podlah — vinyl, PVC, koberce i dřevo. Píšeme pro vás z praxe.',
  openGraph: {
    title: 'Blog | pokládámeee.cz',
    description: 'Rady, návody a tipy k výběru a pokládce podlah.',
  },
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page } = await searchParams
  const currentPage = Math.max(1, parseInt(page || '1', 10) || 1)

  let posts: BlogPostSummary[] | null = null
  try {
    posts = await client.fetch<BlogPostSummary[]>(BLOG_POSTS_QUERY)
  } catch {}

  const allPosts: BlogPostSummary[] = posts?.length
    ? posts
    : BLOG_FALLBACK_POSTS.map(p => ({
        title: p.title,
        slug: p.slug,
        kategorie: p.kategorie,
        perex: p.perex,
        datumVydani: p.datumVydani,
      }))

  const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)
  const pagePosts = allPosts.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <>
      <Header opaque />

      <section style={{ background: 'var(--blue)', paddingTop: 140, paddingBottom: 64 }}>
        <div className="container">
          <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: '2px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 16 }}>
            Blog
          </p>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 16, maxWidth: 700 }}>
            Rady a tipy k podlahám z naší praxe
          </h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: 600 }}>
            Píšeme o výběru materiálu, pokládce i údržbě — ať víte, do čeho jdete, než si objednáte podlahu.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {pagePosts.length ? (
            <>
              <div className="blog-grid">
                {pagePosts.map((post, i) => (
                  <BlogCard key={post._id || post.slug || i} post={post} />
                ))}
              </div>
              <Pagination currentPage={safePage} totalPages={totalPages} />
            </>
          ) : (
            <p style={{ color: 'var(--gray-400)', textAlign: 'center' }}>Zatím tu nejsou žádné články.</p>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
