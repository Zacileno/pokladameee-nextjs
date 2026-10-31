import type { ReactNode } from 'react'
import { client, REFERENCE_QUERY } from '../../lib/sanity'
import { VIDEO_PORUBACEK_REFERENCE } from '../../lib/videa'
import VideoDlazdice from './VideoDlazdice'
import RecenzeSlider, { type Recenze } from './RecenzeSlider'

export const revalidate = 60

// Google profil „Pokládámeee - Ostrava" — hodnocení a počet recenzí aktualizovat ručně
const GOOGLE_HODNOCENI = 4.8
const GOOGLE_POCET_RECENZI = 34
const GOOGLE_PROFIL_URL = 'https://maps.google.com/?cid=8576817033522695571'

const FALLBACK: Recenze[] = [
  { _id: 'f1', jmeno: 'Martin K.', text: 'Vinyl položen za jeden den, parta přišla přesně, po sobě uklidili. Doporučuji!', hvezdicky: 5 },
  { _id: 'f2', jmeno: 'Petra N.', text: 'Konečně firma, která splní co slíbí. Zaměřili v úterý, v pátek máme novou podlahu.', hvezdicky: 5 },
  { _id: 'f3', jmeno: 'Radek Š.', text: 'Skvělý výběr vinylu, poradili s barvou i s tím co vydrží se psem. Spokojenost.', hvezdicky: 5 },
]

// nadpis lze přepsat (např. na Inspiraci), jinak "Hodnoceeení našich zákazníků"
// video=false skryje videoreferenci (podstránky služeb mají vlastní video)
export default async function ReferenceSekce({ nadpis, video = true }: { nadpis?: ReactNode; video?: boolean } = {}) {
  let recenze: Recenze[] = FALLBACK
  try {
    const data = await client.fetch<Recenze[]>(REFERENCE_QUERY)
    if (data?.length) recenze = data
  } catch {}

  return (
    <section id="reference" className="section recenze-sekce">
      <div className="container">
        <div className="recenze-grid">
          <div className="recenze-souhrn">
            <h2>{nadpis ?? <>Hodnoc<span>eee</span>ní<br />našich zákazníků</>}</h2>
            <div className="recenze-souhrn-cislo">
              <span>{GOOGLE_HODNOCENI.toFixed(1).replace('.', ',')}</span>
              <div>
                <div className="recenze-souhrn-hvezdy" aria-hidden="true">★★★★★</div>
                <a href={GOOGLE_PROFIL_URL} target="_blank" rel="noopener noreferrer">{GOOGLE_POCET_RECENZI} recenzí</a>
              </div>
            </div>
            <a href={GOOGLE_PROFIL_URL} target="_blank" rel="noopener noreferrer" className="recenze-google" aria-label="Recenze Pokládámeee na Googlu">
              <span className="recenze-google-logo" aria-hidden="true">
                <span style={{ color: '#4285F4' }}>G</span><span style={{ color: '#EA4335' }}>o</span><span style={{ color: '#FBBC05' }}>o</span><span style={{ color: '#4285F4' }}>g</span><span style={{ color: '#34A853' }}>l</span><span style={{ color: '#EA4335' }}>e</span>
              </span>
              <span className="recenze-google-pod">★★★★★ <small>Reviews</small></span>
            </a>
          </div>

          <RecenzeSlider recenze={recenze} />
        </div>

        {video && (
          <div style={{ marginTop: 56 }}>
            <VideoDlazdice video={VIDEO_PORUBACEK_REFERENCE} />
          </div>
        )}
      </div>
    </section>
  )
}
