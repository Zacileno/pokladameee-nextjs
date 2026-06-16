import Image from 'next/image'

type Nastaveni = {
  telefon?: string
  email?: string
  pracovniDoba?: string
  region?: string
  popisFooter?: string
}

export default function Footer({ nastaveni }: { nastaveni?: Nastaveni }) {
  const telefon = nastaveni?.telefon || '+420 739 229 922'
  const email = nastaveni?.email || 'adam.hajdusek@pokladameee.cz'
  const pracovniDoba = nastaveni?.pracovniDoba || 'Po–Pá 7:00–18:00'
  const region = nastaveni?.region || 'Moravskoslezský kraj'
  const popis = nastaveni?.popisFooter || 'Profesionální pokládka vinylových podlah v Moravskoslezském kraji. Zaměření zdarma, hotovo do týdne.'

  return (
    <footer style={{ background: 'var(--black)', color: 'white', padding: '56px 0 32px' }}>
      <div className="container">
        <div className="footer-grid">
          <div>
            <Image src="/assets/logo/logo-zakladni.svg" alt="pokládámeee.cz" width={180} height={32}
              style={{ height: 32, width: 'auto', marginBottom: 20, filter: 'brightness(0) invert(1)' }} />
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.7, maxWidth: 320 }}>
              {popis}
            </p>
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Navigace</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[['#sluzby','Služby'],['#jak-to-funguje','Jak to funguje'],['#reference','Reference'],['#kontakt','Kontakt']].map(([href, label]) => (
                <a key={href} href={href} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, fontWeight: 500 }}>{label}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Kontakt</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href={`tel:${telefon.replace(/\s/g, '')}`} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>{telefon}</a>
              <a href={`mailto:${email}`} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>{email}</a>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>{pracovniDoba}</div>
              <div style={{ color: 'var(--orange)', fontSize: 15, fontWeight: 700 }}>{region}</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>© 2026 pokládámeee.cz — Všechna práva vyhrazena</p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <a href="/ochrana-osobnich-udaju" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Ochrana osobních údajů</a>
            <a href="/obchodni-podminky" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Obchodní podmínky</a>
            <a href="/reklamacni-rad" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>Reklamační řád</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
