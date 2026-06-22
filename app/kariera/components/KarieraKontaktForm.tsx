'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type FormData = {
  jmeno: string
  prijmeni: string
  email: string
  telefon: string
  mesto: string
  zprava: string
  website: string
}

const EMPTY: FormData = { jmeno: '', prijmeni: '', email: '', telefon: '', mesto: '', zprava: '', website: '' }

export default function KarieraKontaktForm({ poziceNazev }: { poziceNazev?: string }) {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(EMPTY)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.website) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          typ: 'kariera',
          ...(poziceNazev ? { pozice: poziceNazev } : {}),
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Neznámá chyba')
      }
      router.push('/dekujeme')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Nepodařilo se odeslat formulář. Zkuste to prosím znovu.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #ddd',
    borderRadius: 8,
    fontSize: 15,
    outline: 'none',
  }

  return (
    <section style={{ background: '#F8F5F0', padding: '80px 0' }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <h2 className="section-title" style={{ marginBottom: 12 }}>
          Máš zájem? Napiš nám
        </h2>
        <p style={{ fontSize: 16, color: '#555', lineHeight: 1.7, marginBottom: 40 }}>
          Ať už jsi z Ostravy, Opavy, Havířova nebo okolí – se zkušenostmi nebo chutí se vše naučit, dej nám o sobě vědět! Ozvi se nám – stačí vyplnit krátký formulář.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input name="website" style={{ display: 'none' }} value={form.website} onChange={set('website')} tabIndex={-1} autoComplete="off" />

          <div className="kariera-form-grid-2col">
            <input style={inputStyle} type="text" placeholder="Jméno *" required value={form.jmeno} onChange={set('jmeno')} />
            <input style={inputStyle} type="text" placeholder="Příjmení *" required value={form.prijmeni} onChange={set('prijmeni')} />
          </div>
          <div className="kariera-form-grid-2col">
            <input style={inputStyle} type="email" placeholder="E-mail *" required value={form.email} onChange={set('email')} />
            <input style={inputStyle} type="tel" placeholder="Telefon *" required value={form.telefon} onChange={set('telefon')} />
          </div>
          <input style={inputStyle} type="text" placeholder="Z jakého jsi města?" value={form.mesto} onChange={set('mesto')} />
          <textarea
            style={{ ...inputStyle, resize: 'vertical' }}
            placeholder="Zkušenost a motivace pro práci s podlahami."
            rows={4}
            value={form.zprava}
            onChange={set('zprava')}
          />
          <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: '#555', cursor: 'pointer' }}>
            <input type="checkbox" required style={{ accentColor: 'var(--orange)', flexShrink: 0, marginTop: 2 }} />
            <span>
              Souhlasím se zpracováním osobních údajů dle{' '}
              <a href="/ochrana-osobnich-udaju" style={{ color: 'var(--orange)' }}>zásad ochrany osobních údajů</a>
            </span>
          </label>
          {error && <p style={{ color: '#c00', fontSize: 14 }}>{error}</p>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ borderRadius: 10, padding: '15px 32px', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Odesílám...' : 'Odeslat přihlášku'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
