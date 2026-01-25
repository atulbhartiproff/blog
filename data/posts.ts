import { author } from './author'
import { getAllPosts as sanityGetAllPosts, getPostBySlug as sanityGetPostBySlug, getPostsByCategory as sanityGetPostsByCategory } from '@/lib/sanity.queries'

export type PostCategory = 'album' | 'game' | 'book' | 'film' | 'essay'

export interface Post {
  slug: string
  title: string
  excerpt: string
  content: string
  category: PostCategory
  author: typeof author
  publishedAt: string
  image?: string
}

// Re-export Sanity functions
export const getAllPosts: () => Promise<Post[]> = sanityGetAllPosts
export const getPostBySlug: (slug: string) => Promise<Post | undefined> = sanityGetPostBySlug
export const getPostsByCategory: (category: PostCategory) => Promise<Post[]> = sanityGetPostsByCategory
