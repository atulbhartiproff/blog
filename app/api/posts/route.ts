import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { author } from '@/data/author'
import { posts as staticPosts } from '@/data/posts'
import type { Post } from '@/data/posts'

const POSTS_FILE = path.join(process.cwd(), 'data', 'dynamic-posts.json')

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data')
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true })
  }
}

// Read dynamic posts from file
async function getDynamicPosts(): Promise<Post[]> {
  try {
    await ensureDataDir()
    if (existsSync(POSTS_FILE)) {
      const fileContent = await readFile(POSTS_FILE, 'utf-8')
      return JSON.parse(fileContent)
    }
  } catch (error) {
    console.error('Error reading dynamic posts:', error)
  }
  return []
}

// Write dynamic posts to file
async function saveDynamicPosts(posts: Post[]) {
  try {
    await ensureDataDir()
    await writeFile(POSTS_FILE, JSON.stringify(posts, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving dynamic posts:', error)
    throw error
  }
}

export async function GET() {
  try {
    const dynamicPosts = await getDynamicPosts()
    // Merge static and dynamic posts, removing duplicates
    const allPosts = [...staticPosts, ...dynamicPosts]
    const uniquePosts = allPosts.filter((post, index, self) =>
      index === self.findIndex((p) => p.slug === post.slug)
    )
    // Sort by date
    const sortedPosts = uniquePosts.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    return NextResponse.json(sortedPosts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, category, content, image, excerpt } = body

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      + '-' + Date.now()

    const newPost: Post = {
      slug,
      title,
      category,
      content,
      excerpt: excerpt || content.substring(0, 150) + '...',
      author: author,
      publishedAt: new Date().toISOString().split('T')[0],
      image: image || undefined,
    }

    const existingPosts = await getDynamicPosts()
    const updatedPosts = [newPost, ...existingPosts]
    await saveDynamicPosts(updatedPosts)

    return NextResponse.json({ success: true, post: newPost })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}

