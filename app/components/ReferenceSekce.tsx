import { client, REFERENCE_QUERY } from '../../lib/sanity'

export const revalidate = 60

type Recenze = {
  _id: string
  jmeno: string
  text: string
  hvezdicky: number
  datum?: string
}

const FALLBACK: Recenze[] = [
  { _id: 'f1', jmeno: 'Martin K.', text: 'Vinyl položen za jeden den, parta přišla přesně, po sobě uklidili. Doporučuji!', hvezdicky: 5 },
  { _id: 'f2', jmeno: 'Petra N.', text: 'Konečně firma, která splní co slíbí. Zaměřili v úterý, v pátek máme novou podlahu.', hvezdicky: 5 },
  { _id: 'f3', jmeno: 'Radek Š.', text: 'Skvělý výběr vinylu, poradili s barvou i s tím co vydrží se psem. Spokojenost.', hvezdicky: 5 },
  { _id: 'f4', jmeno: 'Jana H.', text: 'Výborná práce, přesná komunikace. Starou kobercovku vzali s sebou, nemuseli jsme nic řešit.', hvezdicky: 5 },
  { _id: 'f5', jmeno: 'Tomáš B.', text: 'Cena odpovídá kvalitě. Vinyl vypadá skvěle, montáž proběhla hladce. Rozhodně doporučuji.', hvezdicky: 5 },
  { _id: 'f6', jmeno: 'Lenka M.', text: 'Přijeli rychle, zaměření i nabídka do druhého dne. Nakonec jsme zvolili tmavý vinyl — naprosto spokojeni.', hvezdicky: 5 },
]

export default async function ReferenceSekce() {
  let recenze: Recenze[] = FALLBACK
  try {
    const data = await client.fetch<Recenze[]>(REFERENCE_QUERY)
    if (data?.length) recenze = data
  } catch {}

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
          {recenze.map(r => (
            <div key={r._id} style={{
              background: 'white',
              borderRadius: 12,
              padding: '28px 24px',
              border: '1px solid var(--gray-100)',
            }}>
              <div style={{ color: 'var(--orange)', fontSize: 18, marginBottom: 12 }}>
                {'★'.repeat(r.hvezdicky)}
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
