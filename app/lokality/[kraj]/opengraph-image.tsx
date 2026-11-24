import { notFound } from 'next/navigation'
import { nahledLokality, NAHLED_VELIKOST } from '@/lib/nahledLokality'
import { getKraj } from '@/lib/lokality'
import { nactiKraj } from '@/lib/lokality-sanity'

// Náhled pro sdílení stránky kraje — Adam s cedulí kraje, jako na začátku stránky
export const alt = 'Pokládámeee podlahy v kraji – pokládámeee.cz'
export const size = NAHLED_VELIKOST
export const contentType = 'image/jpeg'
export const revalidate = 3600

export default async function Image({ params }: { params: Promise<{ kraj: string }> }) {
  const kraj = getKraj((await params).kraj)
  if (!kraj) notFound()
  const texty = await nactiKraj(kraj.slug)
  return nahledLokality(texty?.cedule || kraj.nazev, texty?.nazev || kraj.nazev)
}
