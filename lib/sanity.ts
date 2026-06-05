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

export const REFERENCE_QUERY = `*[_type == "recenze" && aktivni == true] | order(_createdAt desc) {
  _id, jmeno, text, hvezdicky, datum
}`

export const PROJEKTY_QUERY = `*[_type == "projekt" && aktivni == true] | order(_createdAt asc) {
  _id, nazev, claim, popis, url, pocetKlientu, hodnoceni, barva, barvaBtn,
  "logoUrl": logo.asset->url,
  "fotkaUrl": fotkaRemselniku.asset->url
}`

export const HERO_SEKCE_QUERY = `*[_type == "heroSekce"][0] {
  heroFotka { asset->{ url } }
}`

export const HERO_IKONKY_QUERY = `*[_type == "heroIkonky"][0] {
  ikonky[] { emoji, title, sub }
}`

export const SLUZBY_SEKCE_QUERY = `*[_type == "sluzbySekce"][0] {
  nadpis, podnadpis,
  sluzby[] { emoji, title, desc, detail }
}`

export const JAK_TO_FUNGUJE_QUERY = `*[_type == "jakToFunguje"][0] {
  kroky[] { title, desc }
}`

export const PROC_NAS_VYBRAT_QUERY = `*[_type == "procNasVybrat"][0] {
  nadpis, podnadpis,
  vyhody[] { emoji, title, desc }
}`

export const RODINA_ZNACEK_QUERY = `*[_type == "rodinaZnacek"][0] {
  nadpis, podnadpis, pocetKlientuCelkem
}`

export const OBECNE_NASTAVENI_QUERY = `*[_type == "obecneNastaveni"][0] {
  telefon, email, pracovniDoba, region, popisFooter
}`

export const KONTAKT_SEKCE_QUERY = `*[_type == "kontaktSekce"][0] {
  nadpis, podnadpis,
  jmeno, role, citat,
  "fotoUrl": foto.asset->url,
  telefon, email,
  pracovniDoba, region
}`
