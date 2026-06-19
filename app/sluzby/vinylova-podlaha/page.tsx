import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import HeroSluzby from '@/app/components/HeroSluzby'
import BenefityGrid from '@/app/components/BenefityGrid'
import SluzbyCtaSekce from '@/app/components/SluzbyCtaSekce'

export const metadata = {
  title: 'Vinylová podlaha — pokládka a montáž | pokládámeee.cz',
  description: 'Profesionální pokládka vinylových podlah v MSK. Lepená i plovoucí (click) vinyl. Přijedeme do 48 hodin, zaměříme a naceníme zdarma.',
}

const BENEFITY = [
  { emoji: '💧', nadpis: 'Voděodolný', text: 'Odolává vlhkosti — vhodný do koupelny, kuchyně i předsíně' },
  { emoji: '🔇', nadpis: 'Tichý a příjemný', text: 'Tlumí kroky, příjemný na chůzi, teplý na dotek' },
  { emoji: '🎨', nadpis: 'Stovky dekorů', text: 'Imitace dřeva, kamene, betonu i moderní neutrální odstíny' },
  { emoji: '🏠', nadpis: 'Podlahové topení', text: 'Kompatibilní s teplovodním i elektrickým vytápěním (lepená verze)' },
]

const KROKY = [
  { cislo: '1', nadpis: 'Zavoláte nebo napíšete', text: 'Do 48 h přijedeme na zaměření — bez závazku a zdarma.' },
  { cislo: '2', nadpis: 'Vyberete materiál', text: 'Přivezeme vzorník UpFloor, poradíme s výběrem a barvou.' },
  { cislo: '3', nadpis: 'Položíme a uklidíme', text: 'Profesionální pokládka, odpad ekologicky zlikvidujeme.' },
]

export default function VinylovaPodlahaPage() {
  return (
    <>
      <Header opaque />

      <HeroSluzby
        nadpis="Vinylová podlaha"
        podnadpis="Lepená i plovoucí — poradíme s výběrem a položíme profesionálně"
      />

      {/* Typy vinylových podlah */}
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: 32 }}>Typy vinylových podlah</h2>
          <div className="typy-grid">
            <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 32, borderLeft: '4px solid #FF8800' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800 }}>Vinylová lepená podlaha</h3>
                <span style={{ background: '#FF8800', color: '#fff', fontWeight: 700, fontSize: 12, padding: '4px 12px', borderRadius: 100, whiteSpace: 'nowrap' }}>Naše hlavní specializace</span>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--gray-700)' }}>
                Lepený vinyl se přilepí přímo k podkladu speciálním lepidlem. Je stabilní, tichý a ideální pro podlahové topení. Pracujeme primárně s kolekcí UpFloor.
              </p>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: 32, borderLeft: '4px solid #FF8800' }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Plovoucí vinyl (click)</h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--gray-700)' }}>
                Click vinyl se spojuje zámkovým systémem bez lepidla. Rychlá montáž, snadná výměna. Vhodný do obývacích pokojů, ložnic a dětských pokojů.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BenefityGrid benefity={BENEFITY} nadpisSecce="Proč zvolit vinylovou podlahu?" />

      {/* Jak to probíhá */}
      <section className="section" style={{ background: '#FFF5E8' }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: 40 }}>Jak to probíhá</h2>
          <div className="kroky-grid">
            {KROKY.map((k) => (
              <div key={k.cislo} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', background: '#FF8800',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 900, fontSize: 20, flexShrink: 0,
                }}>
                  {k.cislo}
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{k.nadpis}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--gray-700)' }}>{k.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ceník */}
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: 32 }}>Orientační ceník</h2>
          <div className="cenik-grid">
            {[
              { sluzba: 'Pokládka lepené vinylové podlahy', cena: 'od 150 Kč/m²' },
              { sluzba: 'Pokládka plovoucí (click) podlahy', cena: 'od 120 Kč/m²' },
              { sluzba: 'Demontáž staré podlahy', cena: 'od 80 Kč/m²' },
              { sluzba: 'Příprava podkladu', cena: 'dle rozsahu' },
            ].map((r, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 16, color: 'var(--gray-700)' }}>{r.sluzba}</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: '#FF8800', whiteSpace: 'nowrap' }}>{r.cena}</span>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16, fontSize: 13, color: 'var(--gray-400)' }}>
            Orientační ceny bez DPH. Přesná kalkulace po bezplatném zaměření.
          </p>
        </div>
      </section>

      <SluzbyCtaSekce />

      <Footer />
    </>
  )
}
