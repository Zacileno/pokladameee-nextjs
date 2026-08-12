import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Stránka nenalezena — pokládámeee.cz',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-50)', padding: '40px 24px', textAlign: 'center' }}>
      <Link href="/" style={{ marginBottom: 48 }}>
        <Image src="/assets/logo/logo-zakladni.svg" alt="pokládámeee.cz" width={180} height={48} style={{ height: 48, width: 'auto' }} />
      </Link>

      <div style={{ background: 'white', borderRadius: 20, padding: 'clamp(40px, 6vw, 72px)', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', maxWidth: 560, width: '100%' }}>
        <div style={{ fontSize: 'clamp(56px, 9vw, 88px)', fontWeight: 900, lineHeight: 1, marginBottom: 8, color: 'var(--blue)' }}>
          4<span style={{ color: 'var(--orange)' }}>0</span>4
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 3.5vw, 32px)', fontWeight: 900, marginBottom: 16, lineHeight: 1.2 }}>
          Tahle podlaha tu není položená
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: 'var(--gray-700)', marginBottom: 36 }}>
          Stránka, kterou hledáte, neexistuje nebo byla přesunuta. Zkuste se vrátit na hlavní stránku, nebo nám rovnou zavolejte.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
          <Link href="/" className="btn-primary" style={{ fontSize: 16, padding: '13px 28px' }}>← Zpět na hlavní stránku</Link>
          <a href="tel:+420790388487" className="btn-secondary" style={{ fontSize: 16, padding: '12px 28px', background: 'var(--blue)', color: 'white', borderRadius: 'var(--radius)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            📞 +420 790 388 487
          </a>
        </div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', paddingTop: 24, borderTop: '1px solid var(--gray-100)' }}>
          <Link href="/#jak-to-funguje" style={{ color: 'var(--gray-500)', fontSize: 14, fontWeight: 600 }}>Jak to funguje</Link>
          <Link href="/#reference" style={{ color: 'var(--gray-500)', fontSize: 14, fontWeight: 600 }}>Reference</Link>
          <Link href="/faq" style={{ color: 'var(--gray-500)', fontSize: 14, fontWeight: 600 }}>FAQ</Link>
          <Link href="/#kontakt" style={{ color: 'var(--gray-500)', fontSize: 14, fontWeight: 600 }}>Kontakt</Link>
          <Link href="/kariera" style={{ color: 'var(--gray-500)', fontSize: 14, fontWeight: 600 }}>Kariéra</Link>
        </div>
      </div>

      <p style={{ marginTop: 32, color: 'var(--gray-400)', fontSize: 14 }}>
        pokládámeee.cz — <span style={{ color: 'var(--orange)', fontWeight: 700 }}>Podlahy beeezstarostí</span>
      </p>
    </main>
  )
}
