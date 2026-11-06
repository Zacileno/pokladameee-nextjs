'use client'

// Texty tlačítek ze Sanity (dokument „Tlačítka (CTA)“), dostupné na celém webu přes
// provider v app/layout.tsx. Prázdné pole = na webu zůstane výchozí text z kódu.
// Obal <span> drží text pohromadě: .btn-primary je flex, takže by se jinak každý
// různě obarvený kousek textu stal samostatnou položkou s mezerou mezi nimi.

import { createContext, useContext } from 'react'
import FormatovanyText from './FormatovanyText'

type RT = Parameters<typeof FormatovanyText>[0]['value']

export type KlicTlacitka =
  | 'hlavicka'
  | 'hero'
  | 'sluzbySekce'
  | 'jakToFunguje'
  | 'vyhody'
  | 'video'
  | 'formular'
  | 'sluzbyPoptavka'
  | 'bfPopup'
  | 'dekujemeZpet'
  | 'notFoundZpet'
  | 'mapa'
  | 'lokalityZamereni'
  | 'lokalityKonzultace'
  | 'oNasKonzultace'
  | 'oNasKariera'

export type TlacitkaData = Partial<Record<KlicTlacitka, RT>> | null

const TlacitkaKontext = createContext<TlacitkaData>(null)

export function TlacitkaProvider({ data, children }: { data: TlacitkaData; children: React.ReactNode }) {
  return <TlacitkaKontext.Provider value={data}>{children}</TlacitkaKontext.Provider>
}

export default function Tlacitko({ klic, fallback }: { klic: KlicTlacitka; fallback: string }) {
  const data = useContext(TlacitkaKontext)
  return <span><FormatovanyText value={data?.[klic]} fallback={fallback} /></span>
}
