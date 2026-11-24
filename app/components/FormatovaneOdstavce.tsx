// Vykreslí pole typu "formatovaneOdstavce" ze Sanity — každý odstavec jako <p>.
// Prázdné pole = výchozí text (fallback, už s vlastními <p>).

import FormatovanyText from './FormatovanyText'
import { prostyText, type RT } from '@/lib/prostyText'

export type Odstavce = Exclude<RT, string>

export default function FormatovaneOdstavce({ value, fallback }: { value?: Odstavce; fallback: React.ReactNode }) {
  const odstavce = (value ?? []).filter(blok => prostyText([blok]).trim())
  if (!odstavce.length) return <>{fallback}</>
  return <>{odstavce.map((blok, i) => <p key={i}><FormatovanyText value={[blok]} fallback={null} /></p>)}</>
}
