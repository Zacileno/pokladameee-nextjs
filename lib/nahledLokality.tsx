import { ImageResponse } from 'next/og'
import { client } from './sanity'

// Náhledový obrázek pro sdílení stránek /lokality: Adam s cedulí (jako CeduleGrafika
// na začátku stránky), vlevo logo a nadpis stránky. Postava se bere ze Studia
// (Obecné nastavení → Postava na stránkách lokalit), stejně jako na stránce.

export const NAHLED_VELIKOST = { width: 1200, height: 630 }

const WEB = 'https://www.pokladameee.cz'
const MODRA = '#154C86'
const ORANZOVA = '#FF8800'

// Barlow ze stejného Google Fonts jako web; jen znaky, které obrázek opravdu použije.
async function nactiFont(vaha: number, text: string): Promise<ArrayBuffer> {
  const css = await (
    await fetch(`https://fonts.googleapis.com/css2?family=Barlow:wght@${vaha}&text=${encodeURIComponent(text)}`)
  ).text()
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1]
  if (!src) throw new Error('Font Barlow se nepodařilo načíst')
  return (await fetch(src)).arrayBuffer()
}

export async function nahledLokality(cedule: string, nadpis: string) {
  let postava = `${WEB}/assets/adam-postava.png`
  try {
    const url = await client.fetch<string | null>(`*[_type == "obecneNastaveni"][0].foto.asset->url`)
    if (url) postava = `${url}?h=1200&fm=png`
  } catch {}

  const podnadpis = 'Vinylové, PVC, kobercové i dřevěné podlahy'
  const odznak = ['Zaměření', 'zdarma!', 'do 48 hodin']
  const vsechenText = ['Pokládámeee podlahy –', nadpis, cedule.toUpperCase(), podnadpis, ...odznak].join('')
  const [cerna, tucna] = await Promise.all([nactiFont(900, vsechenText), nactiFont(600, vsechenText)])

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: '#FFFFFF', fontFamily: 'Barlow' }}>
        {/* oranžový pruh dole přes celou šířku */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 14, background: ORANZOVA, display: 'flex' }} />

        {/* levá část: logo, nadpis, podnadpis */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 0 0 72px', width: 700 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${WEB}/assets/logo/logo-zakladni.svg`} width={347} height={60} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 48, fontSize: 60, fontWeight: 900, lineHeight: 1.08, color: '#000000' }}>
            <div style={{ display: 'flex' }}>
              Pokládám<span style={{ color: ORANZOVA }}>eee</span>&nbsp;podlahy –
            </div>
            <div style={{ display: 'flex' }}>{nadpis}</div>
          </div>
          <div style={{ display: 'flex', marginTop: 28, fontSize: 30, fontWeight: 600, color: '#3D3D3A' }}>{podnadpis}</div>
        </div>

        {/* pravá část: cedule na tyči za Adamem */}
        <div style={{ position: 'absolute', left: 790, top: 70, width: 330, height: 330, display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'rotate(18deg)' }}>
          <div style={{
            display: 'flex', background: MODRA, color: '#FFFFFF', border: '5px solid #FFFFFF', borderRadius: 12,
            boxShadow: `0 0 0 3px ${MODRA}`, padding: '14px 22px', fontSize: 34, fontWeight: 900, lineHeight: 1.1,
            textAlign: 'center', transform: 'rotate(-6deg)', maxWidth: 330,
          }}>
            {cedule.toUpperCase()}
          </div>
          <div style={{ display: 'flex', flex: 1, width: 14, marginTop: -6, background: 'linear-gradient(90deg, #9a9a96, #d8d8d4 50%, #9a9a96)', borderRadius: 3 }} />
        </div>

        {/* Adam */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={postava} alt="" height={590} style={{ position: 'absolute', bottom: 0, left: 760, height: 590 }} />

        {/* oranžový odznak */}
        <div style={{
          position: 'absolute', left: 690, top: 330, width: 150, height: 150, borderRadius: 75, background: ORANZOVA,
          color: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          transform: 'rotate(-8deg)',
        }}>
          <div style={{ display: 'flex', fontSize: 22, fontWeight: 900, lineHeight: 1.05 }}>{odznak[0]}</div>
          <div style={{ display: 'flex', fontSize: 22, fontWeight: 900, lineHeight: 1.05 }}>{odznak[1]}</div>
          <div style={{ display: 'flex', marginTop: 8, background: '#FFFFFF', color: ORANZOVA, fontSize: 15, fontWeight: 600, borderRadius: 999, padding: '3px 12px' }}>{odznak[2]}</div>
        </div>
      </div>
    ),
    {
      ...NAHLED_VELIKOST,
      fonts: [
        { name: 'Barlow', data: cerna, weight: 900, style: 'normal' },
        { name: 'Barlow', data: tucna, weight: 600, style: 'normal' },
      ],
    },
  )
}
