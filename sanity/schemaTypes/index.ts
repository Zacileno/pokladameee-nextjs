import { type SchemaTypeDefinition } from 'sanity'
import { inspiraceSchema } from '../schemas/inspirace'
import { akceSchema } from '../schemas/akce'
import { referenceSchema } from '../schemas/reference'
import { projektSchema } from '../schemas/projekt'
import { heroSekceSchema } from '../schemas/heroSekce'
import { heroIkonkySchema } from '../schemas/heroIkonky'
import { obecneNastaveniSchema } from '../schemas/obecneNastaveni'
import { kontaktSekceSchema } from '../schemas/kontaktSekce'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [inspiraceSchema, akceSchema, referenceSchema, projektSchema, heroSekceSchema, heroIkonkySchema, obecneNastaveniSchema, kontaktSekceSchema],
}
