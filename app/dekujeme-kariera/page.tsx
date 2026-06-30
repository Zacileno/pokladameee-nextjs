import Link from 'next/link'
import Image from 'next/image'

export const metadata = { title: 'Děkujeme za přihlášku — pokládámeee.cz' }

export default function DekujemeKariera() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--gray-50)', padding: '40px 24px', textAlign: 'center' }}>
      <Link href="/" style={{ marginBottom: 48 }}>
        <Image src="/assets/logo/logo-zakladni.svg" alt="pokládámeee.cz" width={180} height={48} style={{ height: 48, width: 'auto' }} />
      </Link>

      <div style={{ background: 'white', borderRadius: 20, padding: 'clamp(40px, 6vw, 72px)', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', maxWidth: 520, width: '100%' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: 32 }}>
          ✓
        </div>
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 36px)', fontWeight: 900, marginBottom: 16, lineHeight: 1.1 }}>
          Děkujeme za přihlášku!
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.7, color: 'var(--gray-700)', marginBottom: 36 }}>
          Vaši přihlášku jsme přijali. Ozveme se vám co nejdříve — obvykle do pár pracovních dní.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/kariera" className="btn-primary" style={{ fontSize: 16, padding: '13px 28px' }}>← Zpět na kariéru</Link>
          <a href="tel:+420739229922" className="btn-secondary" style={{ fontSize: 16, padding: '12px 28px', background: 'var(--blue)', color: 'white', borderRadius: 'var(--radius)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            📞 +420 739 229 922
          </a>
        </div>
      </div>

      <p style={{ marginTop: 32, color: 'var(--gray-400)', fontSize: 14 }}>
        pokládámeee.cz — <span style={{ color: 'var(--orange)', fontWeight: 700 }}>Podlahy beeezstarostí</span>
      </p>
    </main>
  )
}
