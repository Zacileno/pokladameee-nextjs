import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_TOKEN,
  useCdn: !process.env.SANITY_TOKEN, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
