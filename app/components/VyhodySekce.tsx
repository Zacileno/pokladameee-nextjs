export default function VyhodySekce() {
  const items = [
    { icon: '📐', title: 'Zaměření zdarma', sub: 'a konzultace u vás doma' },
    { icon: '⚡', title: 'U vás do 48 hod', sub: 'dojedeme v expresním čase' },
    { icon: '♻️', title: 'Odvoz staré podlahy', sub: 'ekologická likvidace' },
    { icon: '🎨', title: 'Výběr na míru', sub: 'vzory, barvy, materiály' },
    { icon: '📍', title: 'Celý MSK', sub: 'ověřeno zákazníky' },
  ]

  return (
    <div style={{
      background: 'white',
      borderBottom: '1px solid var(--gray-100)',
      boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {items.map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '28px 36px',
              flex: '1 1 160px',
              borderRight: i < items.length - 1 ? '1px solid var(--gray-100)' : 'none',
              transition: 'background 0.2s',
            }}>
              <div style={{ fontSize: 32, marginBottom: 10, lineHeight: 1 }}>{item.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4, color: 'var(--black)' }}>{item.title}</div>
              <div style={{ fontSize: 13, color: 'var(--gray-400)', lineHeight: 1.4 }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
