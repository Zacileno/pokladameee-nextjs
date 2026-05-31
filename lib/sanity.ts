import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8cvsenqb',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

export const INSPIRACE_QUERY = `*[_type == "inspirace"] | order(poradiZobrazeni asc) {
  _id, nazev, material, rozloha, lokalita,
  fotoPo { asset->{ url } },
  fotoPred { asset->{ url } }
}`

export const AKCE_QUERY = `*[_type == "akce" && aktivni == true] | order(_createdAt desc) {
  _id, nazev, popis, platnostDo, badge
}`

export const REFERENCE_QUERY = `*[_type == "reference" && aktivni == true] | order(_createdAt desc) {
  _id, jmeno, text, hvezdicky, datum
}`

export const PROJEKTY_QUERY = `*[_type == "projekt" && aktivni == true] | order(_createdAt asc) {
  _id, nazev, url, pocetKlientu,
  logo { asset->{ url } }
}`

export const NASTAVENI_QUERY = `*[_type == "nastaveni"][0] {
  telefon, email,
  heroFotka { asset->{ url } }
}`
