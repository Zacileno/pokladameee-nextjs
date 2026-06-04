import Image from 'next/image'
import KontaktForm from './KontaktForm'

interface KontaktData {
  nadpis?: string
  podnadpis?: string
  jmeno?: string
  role?: string
  citat?: string
  fotoUrl?: string
  telefon?: string
  email?: string
  pracovniDoba?: string
  region?: string
}

interface Props {
  kontakt?: KontaktData
}

export default function KontaktSekce({ kontakt }: Props) {
  const nadpis = kontakt?.nadpis || 'Napište přímo nám'
  const podnadpis = kontakt?.podnadpis || 'Zaměření je zdarma. Odpovíme do 24 hodin, obvykle dřív. Přijedeme k vám v celém MSK.'
  const jmeno = kontakt?.jmeno || 'Adam Hajdušek'
  const role = kontakt?.role || 'Zakladatel & hlavní technik'
  const citat = kontakt?.citat || 'Každou podlahu řešíme osobně. Přijedeme se podívat.'
  const fotoUrl = kontakt?.fotoUrl || null
  const telefon = kontakt?.telefon || '+420 739 229 922'
  const email = kontakt?.email || 'adam.hajdusek@pokladameee.cz'
  const pracovniDoba = kontakt?.pracovniDoba || 'Po–Pá 7:00–18:00'
  const region = kontakt?.region || 'Moravskoslezský kraj'

  const nadpisSlova = nadpis.split(' ')
  const posledniSlovo = nadpisSlova.pop()
  const zbytek = nadpisSlova.join(' ')

  return (
    <section id="kontakt" className="section" style={{ background: 'white' }}>
      <div className="container">
        <div className="kontakt-grid">
          <div>
            <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Nezávazná poptávka</p>
            <h2 className="section-title">
              {zbytek && <>{zbytek}<br /></>}
              <span>{posledniSlovo}</span>
            </h2>
            <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.7, color: 'var(--gray-700)', marginBottom: 40 }}>
              {podnadpis}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '24px', borderRadius: 12, background: 'var(--gray-50)', border: '1px solid var(--gray-100)', marginBottom: 32 }}>
              {fotoUrl ? (
                <Image
                  src={fotoUrl}
                  alt={jmeno}
                  width={64}
                  height={64}
                  unoptimized
                  style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                />
              ) : (
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: 22, flexShrink: 0 }}>
                  {jmeno.split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>{jmeno}</div>
                <div style={{ color: 'var(--gray-400)', fontSize: 14 }}>{role}</div>
                <div style={{ color: 'var(--gray-700)', fontSize: 14, marginTop: 6, fontStyle: 'italic' }}>„{citat}"</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: '📞', label: 'Zavolejte', val: telefon, href: `tel:${telefon.replace(/\s/g, '')}` },
                { icon: '✉️', label: 'Napište e-mail', val: email, href: `mailto:${email}` },
                { icon: '🕐', label: 'Pracovní doba', val: pracovniDoba },
                { icon: '📍', label: 'Kde pokládáme', val: region },
              ].map(({ icon, label, val, href }) => (
                <div key={label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--gray-400)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                    {href ? <a href={href} style={{ fontWeight: 700, color: 'var(--blue)', fontSize: 16 }}>{val}</a>
                           : <div style={{ fontWeight: 700, fontSize: 16 }}>{val}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--gray-50)', borderRadius: 16, padding: '40px 36px', border: '1px solid var(--gray-100)' }}>
            <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 6 }}>Nezávazná poptávka</h3>
            <p style={{ color: 'var(--gray-400)', fontSize: 14, marginBottom: 28 }}>Odpovíme do 24 hodin. Zaměření zdarma.</p>
            <KontaktForm />
          </div>
        </div>
      </div>
    </section>
  )
}
