'use client'
import { createContext, useContext, type ReactNode } from 'react'

// Začátek a konec Black Friday ze Sanity pro klientské komponenty (horní lišta, hlavička, popup)
type BfTermin = { konec: string | null; zacatek: string | null }
const BfKonecContext = createContext<BfTermin>({ konec: null, zacatek: null })

export function BfKonecProvider({ konec, zacatek, children }: { konec?: string | null; zacatek?: string | null; children: ReactNode }) {
  return <BfKonecContext.Provider value={{ konec: konec ?? null, zacatek: zacatek ?? null }}>{children}</BfKonecContext.Provider>
}

export const useBfKonec = () => useContext(BfKonecContext)
