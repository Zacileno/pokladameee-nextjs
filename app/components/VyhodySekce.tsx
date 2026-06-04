type Ikonka = {
  emoji?: string
  title?: string
  sub?: string
}

const FALLBACK: Ikonka[] = [
  { emoji: '📐', title: 'Zaměření zdarma', sub: 'a konzultace u vás doma' },
  { emoji: '⚡', title: 'U vás do 48 hod', sub: 'dojedeme v expresním čase' },
  { emoji: '♻️', title: 'Odvoz staré podlahy', sub: 'ekologická likvidace' },
  { emoji: '🎨', title: 'Výběr na míru', sub: 'vzory, barvy, materiály' },
  { emoji: '📍', title: 'Celý MSK', sub: 'ověřeno zákazníky' },
]

interface Props {
  ikonky?: Ikonka[]
}

export default function VyhodySekce({ ikonky }: Props) {
  const items = ikonky?.length ? ikonky : FALLBACK

  return (
    <div style={{ background: 'white', borderBottom: '1px solid var(--gray-100)', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
      <div className="container">
        <div className="vyhody-lista">
          {items.map((item, i) => (
            <div key={i} className="vyhody-item">
              <div style={{ fontSize: 28, marginBottom: 8, lineHeight: 1 }}>{item.emoji}</div>
              <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 3, color: 'var(--black)' }}>{item.title}</div>
              <div style={{ fontSize: 12, color: 'var(--gray-400)', lineHeight: 1.4 }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
