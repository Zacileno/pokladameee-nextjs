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

  // Rozložení pravé části odpovídá CeduleGrafika (globals.css .cedule-*): rámeček 573 × 630,
  // postava 90 % výšky, cedule na tyči nakloněná za hlavou.
  const X = 690
  const png = await new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: '#FFFFFF', fontFamily: 'Barlow' }}>
        {/* levá část: logo, nadpis, podnadpis */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 0 20px 72px', width: 640 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${WEB}/assets/logo/logo-zakladni.svg`} width={347} height={60} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 48, fontSize: 58, fontWeight: 900, lineHeight: 1.08, color: '#000000' }}>
            {/* satori zahazuje mezery na okrajích kusů textu — mezera je proto okraj bloku */}
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex' }}>Pokládám</div>
              <div style={{ display: 'flex', color: ORANZOVA }}>eee</div>
              <div style={{ display: 'flex', marginLeft: 16 }}>podlahy</div>
            </div>
            <div style={{ display: 'flex', fontSize: nadpis.length > 14 ? 50 : 58 }}>{`– ${nadpis}`}</div>
          </div>
          <div style={{ display: 'flex', marginTop: 28, fontSize: 28, fontWeight: 600, color: '#3D3D3A' }}>{podnadpis}</div>
        </div>

        {/* cedule na tyči — za postavou; dlouhé názvy se zalomí na 2 řádky, aby se vešly */}
        <div style={{
          position: 'absolute', left: X + 80, top: 57, width: 321, height: 321,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          transform: 'rotate(18deg)', transformOrigin: '50% 100%',
        }}>
          <div style={{
            display: 'flex', background: MODRA, color: '#FFFFFF', border: '5px solid #FFFFFF', borderRadius: 12,
            boxShadow: `0 0 0 3px ${MODRA}`, padding: '12px 22px', fontSize: cedule.length > 12 ? 24 : 30, fontWeight: 900, lineHeight: 1.1,
            textAlign: 'center', transform: 'rotate(-6deg)', maxWidth: 260,
          }}>
            {cedule.toUpperCase()}
          </div>
          <div style={{ display: 'flex', flex: 1, width: 14, marginTop: -6, background: 'linear-gradient(90deg, #9a9a96, #d8d8d4 50%, #9a9a96)', borderRadius: 3 }} />
        </div>

        {/* postava */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={postava} alt="" style={{ position: 'absolute', bottom: 0, left: X + 46, height: 567 }} />

        {/* oranžový odznak vpravo dole od postavy */}
        <div style={{
          position: 'absolute', left: 1045, top: 420, width: 140, height: 140, borderRadius: 70, background: ORANZOVA,
          color: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          transform: 'rotate(-8deg)',
        }}>
          <div style={{ display: 'flex', fontSize: 21, fontWeight: 900, lineHeight: 1.05 }}>{odznak[0]}</div>
          <div style={{ display: 'flex', fontSize: 21, fontWeight: 900, lineHeight: 1.05 }}>{odznak[1]}</div>
          <div style={{ display: 'flex', marginTop: 8, background: '#FFFFFF', color: ORANZOVA, fontSize: 14, fontWeight: 600, borderRadius: 999, padding: '3px 12px' }}>{odznak[2]}</div>
        </div>

        {/* oranžový pruh dole přes celou šířku */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 12, background: ORANZOVA, display: 'flex' }} />
      </div>
    ),
    {
      ...NAHLED_VELIKOST,
      fonts: [
        { name: 'Barlow', data: cerna, weight: 900, style: 'normal' },
        { name: 'Barlow', data: tucna, weight: 600, style: 'normal' },
      ],
    },
  ).arrayBuffer()

  // PNG s fotkou má ~300 kB — WhatsApp velké obrázky nezobrazí, proto převod na JPG
  // (sharp je součástí instalace Next.js). Když převod selže, vrátí se PNG.
  try {
    const sharp = (await import('sharp')).default
    const jpg = await sharp(Buffer.from(png)).jpeg({ quality: 84, mozjpeg: true }).toBuffer()
    return new Response(new Uint8Array(jpg), { headers: { 'Content-Type': 'image/jpeg' } })
  } catch {
    return new Response(png, { headers: { 'Content-Type': 'image/png' } })
  }
}