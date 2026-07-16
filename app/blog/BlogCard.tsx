import Image from 'next/image'

export type BlogPostSummary = {
  _id?: string
  title?: string
  slug?: string
  kategorie?: string
  perex?: string
  datumVydani?: string
  obrazekUrl?: string
}

function formatDatum(iso?: string) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogCard({ post }: { post: BlogPostSummary }) {
  return (
    <a href={`/blog/${post.slug}`} className="blog-karta">
      <div className="blog-karta-obrazek">
        {post.obrazekUrl ? (
          <Image src={post.obrazekUrl} alt={post.title || ''} fill unoptimized style={{ objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-400)', fontSize: 14 }}>
            Foto článku
          </div>
        )}
      </div>
      <div className="blog-karta-obsah">
        <div className="blog-karta-meta">
          {post.kategorie && <span className="blog-karta-kategorie">{post.kategorie}</span>}
          <span>{formatDatum(post.datumVydani)}</span>
        </div>
        <h3 className="blog-karta-nadpis">{post.title}</h3>
        <p className="blog-karta-perex">{post.perex}</p>
        <span className="blog-karta-link">Číst dále →</span>
      </div>
    </a>
  )
}
