'use client'
import { createContext, useContext, type ReactNode } from 'react'

// Konec Black Friday ze Sanity pro klientské komponenty (horní lišta, hlavička, popup)
const BfKonecContext = createContext<string | null>(null)

export function BfKonecProvider({ konec, children }: { konec?: string | null; children: ReactNode }) {
  return <BfKonecContext.Provider value={konec ?? null}>{children}</BfKonecContext.Provider>
}

export const useBfKonec = () => useContext(BfKonecContext)
