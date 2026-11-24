import { cache } from 'react'
import { client, LOKALITA_KRAJ_QUERY, LOKALITA_MESTO_QUERY, LOKALITY_NAZVY_QUERY } from './sanity'
import type { RT } from './prostyText'
import type { Odstavce } from '@/app/components/FormatovaneOdstavce'

// Texty krajů a měst ze Studia (Lokality — kraje / města); prázdné pole = výchozí text z lib/lokality.ts

type SpolecneTexty = {
  nazev?: string
  cedule?: string
  nadpis?: RT
  perex?: Odstavce
  mestaText?: RT
  seoTitle?: string
  seoDescription?: string
}

export type KrajTexty = SpolecneTexty | null

export type MestoTexty = (SpolecneTexty & {
  okoliNadpis?: RT
  okoliText?: Odstavce
  mestaNadpis?: RT
  mestaOdkaz?: RT
}) | null

export const adresaKraje = (kraj: string) => `/lokality/${kraj}`
export const adresaMesta = (kraj: string, mesto: string) => `/lokality/${kraj}/${mesto}`

export const nactiKraj = cache((kraj: string): Promise<KrajTexty> =>
  client.fetch<KrajTexty>(LOKALITA_KRAJ_QUERY, { adresa: adresaKraje(kraj) }).catch(() => null))

export const nactiMesto = cache((kraj: string, mesto: string): Promise<MestoTexty> =>
  client.fetch<MestoTexty>(LOKALITA_MESTO_QUERY, { adresa: adresaMesta(kraj, mesto) }).catch(() => null))

export type NazevLokality = { adresa?: string; nazev?: string }

// názvy krajů a měst do odkazů: vrací funkci (adresa, výchozí název) → název ze Studia
export const nactiNazvy = cache(async () => {
  const seznam = await client.fetch<NazevLokality[] | null>(LOKALITY_NAZVY_QUERY).catch(() => null)
  return nazevPodleAdresy(seznam)
})

export function nazevPodleAdresy(seznam?: NazevLokality[] | null) {
  const mapa = new Map((seznam ?? []).map(l => [l.adresa, l.nazev]))
  return (adresa: string, vychozi: string) => mapa.get(adresa) || vychozi
}
