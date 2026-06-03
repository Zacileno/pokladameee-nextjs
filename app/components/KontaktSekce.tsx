import KontaktForm from './KontaktForm'

export default function KontaktSekce() {
  return (
    <section id="kontakt" className="section" style={{ background: 'white' }}>
      <div className="container">
        <div className="kontakt-grid">
          <div>
            <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Nezávazná poptávka</p>
            <h2 className="section-title">Napište<br /><span>přímo nám</span></h2>
            <p style={{ marginTop: 20, fontSize: 17, lineHeight: 1.7, color: 'var(--gray-700)', marginBottom: 40 }}>
              Zaměření je zdarma. Odpovíme do 24 hodin, obvykle dřív. Přijedeme k vám v celém MSK.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '24px', borderRadius: 12, background: 'var(--gray-50)', border: '1px solid var(--gray-100)', marginBottom: 32 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900, fontSize: 22, flexShrink: 0 }}>AH</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 18 }}>Adam Hajdušek</div>
                <div style={{ color: 'var(--gray-400)', fontSize: 14 }}>Zakladatel & hlavní technik</div>
                <div style={{ color: 'var(--gray-700)', fontSize: 14, marginTop: 6, fontStyle: 'italic' }}>„Každou podlahu řešíme osobně. Přijedeme se podívat."</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: '📞', label: 'Zavolejte', val: '+420 739 229 922', href: 'tel:+420739229922' },
                { icon: '✉️', label: 'Napište e-mail', val: 'adam.hajdusek@pokladameee.cz', href: 'mailto:adam.hajdusek@pokladameee.cz' },
                { icon: '🕐', label: 'Pracovní doba', val: 'Po–Pá 7:00–18:00' },
                { icon: '📍', label: 'Kde pokládáme', val: 'Moravskoslezský kraj' },
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
            <KontaktForm variant="full" />
          </div>
        </div>
      </div>
    </section>
  )
}
