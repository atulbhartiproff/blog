import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// For API routes (server-side with write access)
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'sgfn7xbv',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false, // Don't use CDN for write operations
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

// For read-only operations (can use CDN)
export const readClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'sgfn7xbv',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

