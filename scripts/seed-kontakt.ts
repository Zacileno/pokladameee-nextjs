import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '8cvsenqb',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

async function seed() {
  const doc = await client.fetch(`*[_type == "nastaveni"][0]{ _id }`)
  if (!doc?._id) {
    console.error('Sanity dokument nastaveni nenalezen. Založ ho nejdřív přes Studio.')
    process.exit(1)
  }

  const result = await client
    .patch(doc._id)
    .setIfMissing({
      nadpisKontakt: 'Napište přímo nám',
      podnadpisKontakt: 'Zaměření je zdarma. Odpovíme do 24 hodin, obvykle dřív. Přijedeme k vám v celém MSK.',
      jmenoKontakt: 'Adam Hajdušek',
      roleKontakt: 'Zakladatel & hlavní technik',
      citatKontakt: 'Každou podlahu řešíme osobně. Přijedeme se podívat.',
      telefonKontakt: '+420 739 229 922',
      emailKontakt: 'adam.hajdusek@pokladameee.cz',
      pracovniDobaKontakt: 'Po–Pá 7:00–18:00',
      regionKontakt: 'Moravskoslezský kraj',
    })
    .commit()

  console.log('Seed hotov:', result._id)
}

seed().catch(console.error)
