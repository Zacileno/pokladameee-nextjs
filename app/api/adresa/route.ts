import { NextRequest, NextResponse } from 'next/server'

// Našeptávač adres pro poptávkový formulář — Mapy.cz /v1/suggest, stejně
// jako v ERP (apps/web/src/app/api/maps/suggest). Volá se ze serveru, ať
// klíč MAPY_API_KEY nevidí prohlížeč. Bez klíče vrací prázdný seznam a
// formulář funguje jako dřív.

type MapySuggestItem = {
  name: string
  location: string
  zip?: string
  regionalStructure?: { name: string; type: string }[]
}

export type AdresaNavrh = { label: string; ulice: string; mesto: string; psc: string }

// Hrubá ochrana kvóty Mapy.cz proti skriptům (per serverless instance, jako u /api/kontakt).
const WINDOW_MS = 60 * 1000
const MAX_PER_WINDOW = 60
const hits = new Map<string, number[]>()

function limited(ip: string): boolean {
  const now = Date.now()
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  list.push(now)
  hits.set(ip, list)
  if (hits.size > 5000) hits.clear()
  return list.length > MAX_PER_WINDOW
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim()
  const key = process.env.MAPY_API_KEY
  if (!q || q.length < 3 || q.length > 200 || !key) return NextResponse.json({ data: [] })

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (limited(ip)) return NextResponse.json({ data: [] }, { status: 429 })

  const url = new URL('https://api.mapy.cz/v1/suggest')
  url.searchParams.set('apikey', key)
  url.searchParams.set('query', q)
  url.searchParams.set('lang', 'cs')
  url.searchParams.set('limit', '6')
  url.searchParams.set('locality', 'cz')
  url.searchParams.append('type', 'regional.address')
  url.searchParams.append('type', 'regional.street')

  try {
    const res = await fetch(url, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(5000) })
    if (!res.ok) return NextResponse.json({ data: [] })
    const json = (await res.json()) as { items?: MapySuggestItem[] }
    const data: AdresaNavrh[] = (json.items ?? []).map((item) => {
      const mesto = item.regionalStructure?.find((s) => s.type === 'regional.municipality')?.name ?? ''
      return {
        label: `${item.name}, ${item.location}`,
        ulice: item.name,
        mesto,
        psc: (item.zip ?? '').replace(/\s/g, ''),
      }
    })
    return NextResponse.json({ data })
  } catch {
    return NextResponse.json({ data: [] })
  }
}
