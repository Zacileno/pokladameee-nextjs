'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { pushDataLayerEvent } from '@/lib/gtm'
import { onlyLetters, onlyPhoneChars, onlyDigitsSpace } from '@/lib/formInput'

type FormData = {
  jmeno: string
  email: string
  telefon: string
  ulice: string
  mesto: string
  psc: string
  zprava: string
  website: string
  souhlas: boolean
}

const EMPTY: FormData = { jmeno: '', email: '', telefon: '', ulice: '', mesto: '', psc: '', zprava: '', website: '', souhlas: false }

export default function KontaktForm() {
  const router = useRouter()
  const [form, setForm] = useState<FormData>(EMPTY)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const setFiltered = (field: keyof FormData, filter: (v: string) => string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [field]: filter(e.target.value) }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.website) return
    if (!form.souhlas) {
      setError('Pro odeslání musíte souhlasit se zpracováním osobních údajů.')
      return
    }
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
      pushDataLayerEvent('formular_odeslani', { typ_formulare: 'poptavka' })
      router.push('/dekujeme')
    } catch (err: any) {
      setError(err.message || 'Nepodařilo se odeslat formulář. Zkuste to prosím znovu.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="kontakt-form" onSubmit={handleSubmit}>
      <input name="website" style={{ display: 'none' }} value={form.website} onChange={set('website')} tabIndex={-1} autoComplete="off" />
      <input className="form-input" type="text" placeholder="Jméno a příjmení *" required value={form.jmeno} onChange={setFiltered('jmeno', onlyLetters)} />
      <input className="form-input" type="email" placeholder="E-mail *" required value={form.email} onChange={set('email')} />
      <input className="form-input" type="tel" inputMode="tel" placeholder="Telefon *" required value={form.telefon} onChange={setFiltered('telefon', onlyPhoneChars)} />
      <input className="form-input" type="text" placeholder="Ulice a č.p." value={form.ulice} onChange={set('ulice')} />
      <div className="kontakt-form-row3">
        <input className="form-input" type="text" placeholder="Město" value={form.mesto} onChange={setFiltered('mesto', onlyLetters)} />
        <input className="form-input" type="text" inputMode="numeric" placeholder="PSČ" value={form.psc} onChange={setFiltered('psc', onlyDigitsSpace)} />
      </div>
      <textarea className="form-input form-textarea" placeholder="Zpráva (rozloha, lokalita...)" rows={3} value={form.zprava} onChange={set('zprava')} />
      <label className="form-gdpr">
        <input
          type="checkbox"
          checked={form.souhlas}
          onChange={e => setForm(f => ({ ...f, souhlas: e.target.checked }))}
          style={{ accentColor: 'var(--orange)', flexShrink: 0, marginTop: 2 }}
        />
        <span>
          Souhlasím se zpracováním osobních údajů dle{' '}
          <a href="/ochrana-osobnich-udaju" style={{ color: 'var(--orange)' }}>zásad ochrany osobních údajů</a>
          {' '}a{' '}
          <a href="/obchodni-podminky" style={{ color: 'var(--orange)' }}>obchodních podmínek</a>.
        </span>
      </label>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary form-submit">
        {loading ? 'Odesílám...' : 'Odeslat poptávku'}
      </button>
    </form>
  )
}
