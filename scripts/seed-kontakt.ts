import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '8cvsenqb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

async function seed() {
  const doc = await client.fetch(`*[_type == "kontaktSekce"][0]{ _id }`)
  if (!doc?._id) {
    console.error('Sanity dokument kontaktSekce nenalezen. Založ ho nejdřív přes Studio.')
    process.exit(1)
  }

  const result = await client
    .patch(doc._id)
    .setIfMissing({
      nadpis: 'Napište přímo nám',
      podnadpis: 'Zaměření je zdarma. Odpovíme do 24 hodin, obvykle dřív. Přijedeme k vám v celém MSK.',
      jmeno: 'Adam Hajdušek',
      role: 'Zakladatel & hlavní technik',
      citat: 'Každou podlahu řešíme osobně. Přijedeme se podívat.',
      telefon: '+420 739 229 922',
      email: 'adam.hajdusek@pokladameee.cz',
      pracovniDoba: 'Po–Pá 7:00–18:00',
      region: 'Moravskoslezský kraj',
    })
    .commit()

  console.log('Seed hotov:', result._id)
}

seed().catch(console.error)
