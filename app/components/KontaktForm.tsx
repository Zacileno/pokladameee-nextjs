'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type FormData = {
  jmeno: string
  email: string
  telefon: string
  ulice: string
  mesto: string
  psc: string
  zprava: string
}

const EMPTY: FormData = { jmeno: '', email: '', telefon: '', ulice: '', mesto: '', psc: '', zprava: '' }

export default function KontaktForm() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(EMPTY)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Neznámá chyba')
      }
      router.push('/dekujeme')
    } catch (err: any) {
      setError(err.message || 'Nepodařilo se odeslat formulář. Zkuste to prosím znovu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="kontakt-form" onSubmit={handleSubmit}>
      <input className="form-input" type="text" placeholder="Jméno a příjmení *" required value={form.jmeno} onChange={set('jmeno')} />
      <input className="form-input" type="email" placeholder="E-mail *" required value={form.email} onChange={set('email')} />
      <input className="form-input" type="tel" placeholder="Telefon *" required value={form.telefon} onChange={set('telefon')} />
      <input className="form-input" type="text" placeholder="Ulice a č.p." value={form.ulice} onChange={set('ulice')} />
      <div className="kontakt-form-row3">
        <input className="form-input" type="text" placeholder="Město" value={form.mesto} onChange={set('mesto')} />
        <input className="form-input" type="text" placeholder="PSČ" value={form.psc} onChange={set('psc')} />
      </div>
      <textarea className="form-input form-textarea" placeholder="Zpráva (rozloha, lokalita...)" rows={3} value={form.zprava} onChange={set('zprava')} />
      <label className="form-gdpr">
        <input type="checkbox" required style={{ accentColor: 'var(--orange)', flexShrink: 0, marginTop: 2 }} />
        Souhlasím se zpracováním osobních údajů a obchodními podmínkami.
      </label>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary form-submit">
        {loading ? 'Odesílám...' : 'Odeslat poptávku'}
      </button>
    </form>
  )
}
