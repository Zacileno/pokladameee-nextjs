export default function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="blog-pagination" aria-label="Stránkování">
      {currentPage > 1 ? (
        <a href={currentPage - 1 === 1 ? '/blog' : `/blog?page=${currentPage - 1}`}>‹ Novější</a>
      ) : (
        <span className="disabled">‹ Novější</span>
      )}
      {pages.map(p => (
        p === currentPage
          ? <span key={p} className="aktivni">{p}</span>
          : <a key={p} href={p === 1 ? '/blog' : `/blog?page=${p}`}>{p}</a>
      ))}
      {currentPage < totalPages ? (
        <a href={`/blog?page=${currentPage + 1}`}>Starší ›</a>
      ) : (
        <span className="disabled">Starší ›</span>
      )}
    </nav>
  )
}
