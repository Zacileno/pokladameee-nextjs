export default function ReferenceSekce() {
  const recenze = [
    { jmeno: 'Martin K.', mesto: 'Ostrava', hvezdy: 5, text: 'Vinyl položen za jeden den, parta přišla přesně, po sobě uklidili. Doporučuji!' },
    { jmeno: 'Petra N.', mesto: 'Opava', hvezdy: 5, text: 'Konečně firma, která splní co slíbí. Zaměřili v úterý, v pátek máme novou podlahu.' },
    { jmeno: 'Radek Š.', mesto: 'Frýdek-Místek', hvezdy: 5, text: 'Skvělý výběr vinylu, poradili s barvou i s tím co vydrží se psem. Spokojenost.' },
    { jmeno: 'Jana H.', mesto: 'Karviná', hvezdy: 5, text: 'Výborná práce, přesná komunikace. Starou kobercovku vzali s sebou, nemuseli jsme nic řešit.' },
    { jmeno: 'Tomáš B.', mesto: 'Havířov', hvezdy: 5, text: 'Cena odpovídá kvalitě. Vinyl vypadá skvěle, montáž proběhla hladce. Rozhodně doporučuji.' },
    { jmeno: 'Lenka M.', mesto: 'Třinec', hvezdy: 5, text: 'Přijeli rychle, zaměření i nabídka do druhého dne. Nakonec jsme zvolili tmavý vinyl — naprosto spokojeni.' },
  ]

  return (
    <section id="reference" className="section" style={{ background: 'var(--gray-50)' }}>
      <div className="container">
        <div style={{ marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <p style={{ color: 'var(--orange)', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
              Hodnoceeení zákazníků
            </p>
            <h2 className="section-title">
              Co říkají<br /><span>naši zákazníci</span>
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div>
              <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1 }}>5.0</div>
              <div style={{ color: 'var(--orange)', fontSize: 20, marginTop: 2 }}>★★★★★</div>
              <div style={{ color: 'var(--gray-400)', fontSize: 13, marginTop: 4 }}>Google recenze</div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 20,
        }}>
          {recenze.map((r, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: 12,
              padding: '28px 24px',
              border: '1px solid var(--gray-100)',
            }}>
              <div style={{ color: 'var(--orange)', fontSize: 18, marginBottom: 12 }}>
                {'★'.repeat(r.hvezdy)}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.65, marginBottom: 20, color: 'var(--gray-700)' }}>
                „{r.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'var(--blue)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 800, fontSize: 15,
                }}>{r.jmeno[0]}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{r.jmeno}</div>
                  <div style={{ color: 'var(--gray-400)', fontSize: 13 }}>{r.mesto}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
