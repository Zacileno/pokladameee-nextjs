import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '8cvsenqb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

async function seed() {
  const result = await client.createOrReplace({
    _id: 'vinylovaPodlaha',
    _type: 'vinylovaPodlaha',

    heroNadpis: 'Vinylová podlaha — pokládka a montáž',
    heroPodnadpis: 'Lepená i plovoucí — přijedeme zaměřit do 48 hodin, poradíme s výběrem a profesionálně položíme.',
    heroBadge: '🚛 Odvoz staré podlahy zdarma',

    istrip: [
      { _key: 'i1', emoji: '📐', text: 'Zaměření zdarma' },
      { _key: 'i2', emoji: '⚡', text: 'U vás do 48 hodin' },
      { _key: 'i3', emoji: '🚛', text: 'Odvoz staré podlahy zdarma' },
      { _key: 'i4', emoji: '🛡️', text: 'Záruka na práci' },
      { _key: 'i5', emoji: '📍', text: 'Celý Moravskoslezský kraj' },
    ],

    typyNadpis: 'Typy vinylových podlah',
    typyPodnadpis: 'Pomůžeme vybrat variantu, která sedí vašemu prostoru a životnímu stylu.',
    typy: [
      {
        _key: 't1',
        nazev: 'Vinylová lepená podlaha',
        badge: 'Naše hlavní specializace',
        popis: 'Lepený vinyl se přilepí přímo k podkladu speciálním lepidlem. Je stabilní, tichý a ideální pro podlahové topení. Pracujeme primárně s kolekcí UpFloor.',
        vyhody: ['Vhodný pro podlahové topení', 'Maximální stabilita a ticho', 'Do koupelny, kuchyně i předsíně'],
        barva: 'orange',
      },
      {
        _key: 't2',
        nazev: 'Plovoucí vinyl (click)',
        badge: '',
        popis: 'Click vinyl se spojuje zámkovým systémem bez lepidla. Rychlá montáž, snadná výměna. Vhodný do obývacích pokojů, ložnic a dětských pokojů.',
        vyhody: ['Rychlá a čistá montáž', 'Snadná oprava poškozených dílů', 'Vhodný pro DIY demontáž'],
        barva: 'blue',
      },
    ],

    benefityNadpis: 'Proč zvolit vinylovou podlahu?',
    benefity: [
      { _key: 'b1', emoji: '💧', nadpis: 'Voděodolný', text: 'Odolává vlhkosti — vhodný do koupelny, kuchyně i předsíně' },
      { _key: 'b2', emoji: '🔇', nadpis: 'Tichý a příjemný', text: 'Tlumí kroky, příjemný na chůzi, teplý na dotek' },
      { _key: 'b3', emoji: '🎨', nadpis: 'Stovky dekorů', text: 'Imitace dřeva, kamene, betonu i moderní neutrální odstíny' },
      { _key: 'b4', emoji: '🏠', nadpis: 'Podlahové topení', text: 'Kompatibilní s teplovodním i elektrickým vytápěním (lepená verze)' },
    ],

    krokyNadpis: 'Jak to probíhá',
    krokyPodnadpis: 'Od prvního kontaktu po hotovou podlahu — bez stresu.',
    kroky: [
      { _key: 'k1', nadpis: 'Zavoláte nebo napíšete', text: 'Do 48 h přijedeme na zaměření — bez závazku a zdarma.' },
      { _key: 'k2', nadpis: 'Vyberete materiál', text: 'Přivezeme vzorník UpFloor, poradíme s výběrem a barvou.' },
      { _key: 'k3', nadpis: 'Položíme a uklidíme', text: 'Profesionální pokládka, odpad ekologicky zlikvidujeme.' },
    ],

    referenceHodnoceni: 4.8,
    referenceCitace: 'Adam přijel den po zavolání, zaměřil a rovnou přivezl vzorník. Podlahu položili za jeden den, uklidili po sobě a stará dlažba zmizela. Doporučuju.',
    referenceJmeno: 'Markéta K. — Ostrava',

    faq: [
      {
        _key: 'f1',
        otazka: 'Jaký je rozdíl mezi lepeným a plovoucím vinylem?',
        odpoved: 'Lepený vinyl se přilepí přímo k podkladu — je stabilnější, tišší a ideální pro podlahové topení. Plovoucí (click) vinyl se spojuje zámkovým systémem bez lepidla, takže je rychlejší na montáž a snáze se vyměňuje. Pro většinu domácností doporučujeme lepenou variantu UpFloor.',
      },
      {
        _key: 'f2',
        otazka: 'Jak dlouho trvá pokládka podlahy?',
        odpoved: 'Průměrný pokoj (20–25 m²) zvládneme za jeden pracovní den. Počítejte s tím, že zahrnujeme i demontáž staré podlahy a přípravu podkladu. Přesný harmonogram domluvíme na zaměření.',
      },
      {
        _key: 'f3',
        otazka: 'Musím si zajistit odvoz staré podlahy?',
        odpoved: 'Ne — odvoz a ekologická likvidace staré podlahy je součástí naší ceny. Nemusíte řešit kontejner ani odvoz.',
      },
      {
        _key: 'f4',
        otazka: 'Je vinylová podlaha vhodná do koupelny?',
        odpoved: 'Ano, lepený vinyl je 100% voděodolný a výborně snáší vlhkost. Používáme ho pravidelně do koupelen, kuchyní i předsíní. Plovoucí variantu do trvale vlhkých prostor nedoporučujeme.',
      },
      {
        _key: 'f5',
        otazka: 'Funguje vinyl s podlahovým topením?',
        odpoved: 'Lepená vinylová podlaha je plně kompatibilní s teplovodním i elektrickým podlahovým topením. Plovoucí variantu s topením kombinovat nelze — u té doporučujeme jiný materiál.',
      },
    ],
  })

  console.log('✅ Seed hotov:', result._id)
}

seed().catch(console.error)
