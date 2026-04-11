"use client"
export default function SluzbySekce() {
  const sluzby = [
    {
      icon: '🪵',
      title: 'Vinylová podlaha lepená',
      desc: 'Nejtrvanlivější varianta. Ideální do kuchyní, koupelen a prostor s vyšší zátěží. Lepíme pouze prémiové kolekce UpFloor.',
      detail: 'Od 346 Kč/m² materiál',
    },
    {
      icon: '🏠',
      title: 'Vinylová podlaha plovoucí',
      desc: 'Rychlá montáž bez lepidla. Skvělá volba pro obývací pokoje a ložnice. Perfektní imitace dřeva i kamene.',
      detail: 'Montáž do 1 dne',
    },
    {
      icon: '♻️',
      title: 'Výměna staré podlahy',
      desc: 'Ekologicky odstraníme vaši starou podlahu a připravíme podklad. Vše v jedné návštěvě bez zbytečného čekání.',
      detail: 'Ekologická likvidace zdarma',
    },
    {
      icon: '📐',
      title: 'Zaměření a konzultace',
      desc: 'Přijedeme se podívat, poradíme s výběrem materiálu, barvy i vzoru. Připravíme nezávaznou kalkulaci do 24 hodin.',
      detail: 'Zdarma po celém MSK',
    },
  ]

  return (
    <section id="sluzby" className="section" style={{ background: 'var(--gray-50)' }}>
      <div className="container">
        <div style={{ marginBottom: 56 }}>
          <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
            Co pokládámeee
          </p>
          <h2 className="section-title">
            Specializujeme se<br />na <span>vinylové podlahy</span>
          </h2>
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            Vinyl je dnes nejlepší volbou pro moderní domácnosti — odolný, vodovzdorný, snadná údržba a krásný design.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
        }}>
          {sluzby.map((s) => (
            <div key={s.title} style={{
              background: 'white',
              borderRadius: 12,
              padding: '32px 28px',
              border: '1px solid var(--gray-100)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'default',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 20 }}>{s.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.65, marginBottom: 20 }}>{s.desc}</p>
              <div style={{
                display: 'inline-block',
                background: 'var(--orange-light)',
                color: 'var(--orange)',
                fontWeight: 700,
                fontSize: 13,
                padding: '5px 12px',
                borderRadius: 100,
              }}>{s.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <a href="#kontakt" className="btn-primary" style={{ fontSize: 16 }}>
            Nezávazně poptat →
          </a>
        </div>
      </div>
    </section>
  )
}
