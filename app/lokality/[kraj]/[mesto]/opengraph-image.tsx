import { notFound } from 'next/navigation'
import { nahledLokality, NAHLED_VELIKOST } from '@/lib/nahledLokality'
import { getKraj, getMesto } from '@/lib/lokality'

// Náhled pro sdílení stránky města — Adam s cedulí města, jako na začátku stránky
export const alt = 'Pokládámeee podlahy ve městě – pokládámeee.cz'
export const size = NAHLED_VELIKOST
export const contentType = 'image/png'
export const revalidate = 3600

export default async function Image({ params }: { params: Promise<{ kraj: string; mesto: string }> }) {
  const p = await params
  const kraj = getKraj(p.kraj)
  const mesto = kraj && getMesto(kraj, p.mesto)
  if (!mesto) notFound()
  return nahledLokality(mesto.nazev, mesto.nazev)
}
