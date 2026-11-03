import { MAPA_KRAJE, MAPA_SIRKA, MAPA_VYSKA } from '../../lib/mapa-kraju'
import { naMapu, type Kraj, type Mesto } from '../../lib/lokality'

// Mapa ČR s vyznačeným krajem a vlaječkou na městě (podstránka /lokality/[kraj]/[mesto])
export default function MestoMapa({ kraj, mesto }: { kraj: Kraj; mesto: Mesto }) {
  const [x, y] = naMapu(mesto.gps)

  return (
    <svg viewBox={`0 0 ${MAPA_SIRKA} ${MAPA_VYSKA}`} className="mapa-svg" role="img" aria-label={`${mesto.nazev} na mapě – ${kraj.nazev}`}>
      {MAPA_KRAJE.map(k => (
        <path key={k.id} d={k.d} className={k.id === kraj.mapaId ? 'mapa-kraj mesto-mapa-kraj' : 'mapa-kraj'} fillRule="evenodd" />
      ))}
      <g transform={`translate(${x} ${y})`}>
        <circle r="6" fill="var(--blue)" stroke="white" strokeWidth="2" />
        <rect x="-2" y="-78" width="4" height="78" rx="2" fill="var(--blue)" />
        <path d="M2 -78 L52 -66 L2 -50 Z" fill="var(--orange)" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      </g>
    </svg>
  )
}
