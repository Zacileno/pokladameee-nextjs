import { type SchemaTypeDefinition } from 'sanity'
import { inspiraceSchema } from '../schemas/inspirace'
import { akceSchema } from '../schemas/akce'
import { referenceSchema } from '../schemas/reference'
import { nastaveniSchema } from '../schemas/nastaveni'
import { projektSchema } from '../schemas/projekt'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [inspiraceSchema, akceSchema, referenceSchema, nastaveniSchema, projektSchema],
}
