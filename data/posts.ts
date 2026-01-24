import { author } from './author'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

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

const DYNAMIC_POSTS_FILE = path.join(process.cwd(), 'data', 'dynamic-posts.json')

async function getDynamicPosts(): Promise<Post[]> {
  try {
    if (existsSync(DYNAMIC_POSTS_FILE)) {
      const fileContent = await readFile(DYNAMIC_POSTS_FILE, 'utf-8')
      return JSON.parse(fileContent)
    }
  } catch (error) {
    console.error('Error reading dynamic posts:', error)
  }
  return []
}

export const posts: Post[] = []

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const dynamicPosts = await getDynamicPosts()
  const allPosts = [...posts, ...dynamicPosts]
  return allPosts.find(post => post.slug === slug)
}

export async function getPostsByCategory(category: PostCategory): Promise<Post[]> {
  const dynamicPosts = await getDynamicPosts()
  const allPosts = [...posts, ...dynamicPosts]
  return allPosts
    .filter(post => post.category === category)
    .sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
}

export async function getAllPosts(): Promise<Post[]> {
  const dynamicPosts = await getDynamicPosts()
  const allPosts = [...posts, ...dynamicPosts]
  return allPosts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

