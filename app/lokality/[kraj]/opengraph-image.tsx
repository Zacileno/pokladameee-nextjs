import { notFound } from 'next/navigation'
import { nahledLokality, NAHLED_VELIKOST } from '@/lib/nahledLokality'
import { getKraj } from '@/lib/lokality'

// Náhled pro sdílení stránky kraje — Adam s cedulí kraje, jako na začátku stránky
export const alt = 'Pokládámeee podlahy v kraji – pokládámeee.cz'
export const size = NAHLED_VELIKOST
export const contentType = 'image/png'
export const revalidate = 3600

export default async function Image({ params }: { params: Promise<{ kraj: string }> }) {
  const kraj = getKraj((await params).kraj)
  if (!kraj) notFound()
  return nahledLokality(kraj.nazev, kraj.nazev)
}
