import { nahledLokality, NAHLED_VELIKOST } from '@/lib/nahledLokality'

// Náhled pro sdílení stránky /lokality — Adam s cedulí „Morava“ (přehled nemá vlastní ceduli)
export const alt = 'Pokládámeee podlahy na Moravě – pokládámeee.cz'
export const size = NAHLED_VELIKOST
export const contentType = 'image/png'
export const revalidate = 3600

export default function Image() {
  return nahledLokality('Morava', 'Morava')
}
