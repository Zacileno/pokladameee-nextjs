'use client'
import { useState } from 'react'

export default function KontaktSekce() {
  const [form, setForm] = useState({ jmeno: '', prijmeni: '', email: '', telefon: '', ulice: '', mesto: '', psc: '', sluzba: '', zprava: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setSent(true)
    setLoading(false)
  }

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
                { icon: '📞', label: 'Zavolejte', val: '+420 XXX XXX XXX', href: 'tel:+420000000000' },
                { icon: '✉️', label: 'Napište e-mail', val: 'adam@pokládámeee.cz', href: 'mailto:adam@pokládámeee.cz' },
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
            {sent ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
                <h3 style={{ fontSize: 26, fontWeight: 900, marginBottom: 12 }}>Poptávka odeslána!</h3>
                <p style={{ color: 'var(--gray-400)', fontSize: 16 }}>Ozveme se vám do 24 hodin.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 6 }}>Nezávazná poptávka</h3>
                <p style={{ color: 'var(--gray-400)', fontSize: 14, marginBottom: 28 }}>Odpovíme do 24 hodin. Zaměření zdarma.</p>
                <div className="kontakt-form-row2">
                  <input type="text" placeholder="Jméno *" required value={form.jmeno} onChange={e => setForm({...form, jmeno: e.target.value})} style={inp} />
                  <input type="text" placeholder="Příjmení *" required value={form.prijmeni} onChange={e => setForm({...form, prijmeni: e.target.value})} style={inp} />
                </div>
                <div className="kontakt-form-row2">
                  <input type="email" placeholder="E-mail *" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} style={inp} />
                  <input type="tel" placeholder="Telefon" value={form.telefon} onChange={e => setForm({...form, telefon: e.target.value})} style={inp} />
                </div>
                <input type="text" placeholder="Ulice a č.p." value={form.ulice} onChange={e => setForm({...form, ulice: e.target.value})} style={{...inp, marginBottom: 12}} />
                <div className="kontakt-form-row3">
                  <input type="text" placeholder="Město" value={form.mesto} onChange={e => setForm({...form, mesto: e.target.value})} style={inp} />
                  <input type="text" placeholder="PSČ" value={form.psc} onChange={e => setForm({...form, psc: e.target.value})} style={inp} />
                </div>
                <select value={form.sluzba} onChange={e => setForm({...form, sluzba: e.target.value})} style={{...inp, marginBottom: 12, color: form.sluzba ? '#000' : '#999'}}>
                  <option value="">Mám zájem o...</option>
                  <option>Vinylová podlaha lepená</option>
                  <option>Vinylová podlaha plovoucí</option>
                  <option>Výměna staré podlahy</option>
                  <option>Konzultaci na místě</option>
                  <option>Chci pomoct s výběrem</option>
                </select>
                <textarea placeholder="Zpráva (rozloha, patro, lokalita...)" value={form.zprava} onChange={e => setForm({...form, zprava: e.target.value})} rows={4} style={{...inp, resize: 'none', marginBottom: 16}} />
                <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 12, color: 'var(--gray-400)', marginBottom: 20, cursor: 'pointer' }}>
                  <input type="checkbox" required style={{ marginTop: 2, accentColor: 'var(--orange)', flexShrink: 0 }} />
                  Souhlasím se zpracováním osobních údajů a všeobecnými obchodními podmínkami.
                </label>
                <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '15px', opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'Odesílám...' : 'Odeslat poptávku'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const inp: React.CSSProperties = { padding: '11px 14px', border: '1.5px solid #E5E5E0', borderRadius: 6, fontSize: 14, outline: 'none', width: '100%', background: 'white', transition: 'border-color 0.2s', display: 'block' }
