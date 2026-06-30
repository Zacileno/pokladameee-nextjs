import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { akceSchema } from './sanity/schemas/akce'
import { inspiraceSchema } from './sanity/schemas/inspirace'
import { referenceSchema } from './sanity/schemas/reference'
import { projektSchema } from './sanity/schemas/projekt'
import { heroSekceSchema } from './sanity/schemas/heroSekce'
import { heroIkonkySchema } from './sanity/schemas/heroIkonky'
import { sluzbySekceSchema } from './sanity/schemas/sluzbySekce'
import { jakToFungujeSchema } from './sanity/schemas/jakToFunguje'
import { procNasVybratSchema } from './sanity/schemas/procNasVybrat'
import { rodinaZnacekSchema } from './sanity/schemas/rodinaZnacek'
import { obecneNastaveniSchema } from './sanity/schemas/obecneNastaveni'
import { kontaktSekceSchema } from './sanity/schemas/kontaktSekce'
import { vinylovaPodlahaSchema } from './sanity/schemas/vinylovaPodlaha'

export default defineConfig({
  name: 'pokladameee',
  title: 'pokládámeee.cz — Admin',
  basePath: '/studio',
  projectId: '8cvsenqb',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: [akceSchema, inspiraceSchema, referenceSchema, projektSchema, heroSekceSchema, heroIkonkySchema, sluzbySekceSchema, jakToFungujeSchema, procNasVybratSchema, rodinaZnacekSchema, obecneNastaveniSchema, kontaktSekceSchema, vinylovaPodlahaSchema] },
})
