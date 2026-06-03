import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { akceSchema } from './sanity/schemas/akce'
import { inspiraceSchema } from './sanity/schemas/inspirace'
import { referenceSchema } from './sanity/schemas/reference'
import { nastaveniSchema } from './sanity/schemas/nastaveni'
import { projektSchema } from './sanity/schemas/projekt'

export default defineConfig({
  name: 'pokladameee',
  title: 'pokládámeee.cz — Admin',
  basePath: '/studio',
  projectId: '8cvsenqb',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: [akceSchema, inspiraceSchema, referenceSchema, nastaveniSchema, projektSchema] },
})
