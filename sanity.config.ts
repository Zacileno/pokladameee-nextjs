import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { akceSchema } from './sanity/schemas/akce'
import { inspiraceSchema } from './sanity/schemas/inspirace'
import { referenceSchema } from './sanity/schemas/reference'
import { projektSchema } from './sanity/schemas/projekt'
import { heroSekceSchema } from './sanity/schemas/heroSekce'
import { obecneNastaveniSchema } from './sanity/schemas/obecneNastaveni'
import { kontaktSekceSchema } from './sanity/schemas/kontaktSekce'

export default defineConfig({
  name: 'pokladameee',
  title: 'pokládámeee.cz — Admin',
  basePath: '/studio',
  projectId: '8cvsenqb',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: [akceSchema, inspiraceSchema, referenceSchema, projektSchema, heroSekceSchema, obecneNastaveniSchema, kontaktSekceSchema] },
})
