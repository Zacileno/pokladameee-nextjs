import { client } from '@/lib/sanity'

// Obecný náhledový obrázek pro sdílení (og:image všech stránek bez vlastního náhledu).
// Vrací obrázek ze Studia (Obecné nastavení → Náhledový obrázek pro sdílení), oříznutý
// na 1200 × 630 a jako JPG (WhatsApp velké PNG nezobrazí). Když ve Studiu nic není,
// přesměruje na výchozí soubor.
export async function GET(request: Request) {
  let url: string | null = null
  try {
    url = await client.fetch<string | null>(`*[_type == "obecneNastaveni"][0].bannerObrazek.asset->url`)
  } catch {}

  if (url) {
    try {
      const res = await fetch(`${url}?w=1200&h=630&fit=crop&fm=jpg&q=85`)
      if (res.ok) {
        const data = await res.arrayBuffer()
        return new Response(data, {
          headers: {
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=300, s-maxage=300, stale-while-revalidate=86400',
          },
        })
      }
    } catch {}
  }

  return Response.redirect(new URL('/assets/social-pokladameee.jpg', request.url), 307)
}
