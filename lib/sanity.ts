import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

// Queries
export const INSPIRACE_QUERY = `*[_type == "inspirace"] | order(poradiZobrazeni asc) {
  _id, nazev, material, rozloha, lokalita,
  fotoPo { asset->{ url } },
  fotoPred { asset->{ url } }
}`

export const AKCE_QUERY = `*[_type == "akce" && aktivni == true] | order(_createdAt desc) {
  _id, nazev, popis, platnostDo, badge
}`
