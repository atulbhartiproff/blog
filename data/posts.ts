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

export const posts: Post[] = [
  {
    slug: 'my-favorite-album-2024',
    title: 'My Favorite Album of 2024',
    excerpt: 'A deep dive into the album that defined my year, exploring its themes, production, and emotional impact.',
    content: `
# My Favorite Album of 2024

This album has been on repeat for months. The way it blends genres and tells a story through music is truly remarkable.

## Track Highlights

- **Track 1**: Sets the tone perfectly
- **Track 5**: The emotional peak of the album
- **Final Track**: A beautiful conclusion

The production quality is outstanding, and the lyrics resonate deeply with my current life experiences.
    `,
    category: 'album',
    author: author,
    publishedAt: '2024-01-15',
    image: '/posts/album-2024.jpg',
  },
  {
    slug: 'indie-game-gem',
    title: 'An Indie Game That Blew My Mind',
    excerpt: 'Discovering a hidden gem that combines beautiful art, engaging gameplay, and a touching narrative.',
    content: `
# An Indie Game That Blew My Mind

This game came out of nowhere and completely captivated me. The art style is unique, the gameplay mechanics are innovative, and the story is deeply moving.

## What Makes It Special

The developers clearly poured their hearts into this project. Every detail matters, from the sound design to the character animations.

## Final Thoughts

If you're looking for something different from the AAA titles, this is a must-play.
    `,
    category: 'game',
    author: author,
    publishedAt: '2024-01-10',
    image: '/posts/game-review.jpg',
  },
  {
    slug: 'book-that-changed-perspective',
    title: 'The Book That Changed My Perspective',
    excerpt: 'A literary journey that challenged my worldview and opened my mind to new possibilities.',
    content: `
# The Book That Changed My Perspective

This book has been sitting on my shelf for years, and I finally picked it up. I wish I had read it sooner.

## Key Themes

The author explores complex themes with incredible nuance. Each chapter builds on the last, creating a powerful narrative arc.

## Impact

Reading this book has fundamentally changed how I view certain aspects of life. It's a work that will stay with me for years to come.
    `,
    category: 'book',
    author: author,
    publishedAt: '2024-01-05',
    image: '/posts/book-review.jpg',
  },
  {
    slug: 'cinematic-masterpiece',
    title: 'A Cinematic Masterpiece Worth Revisiting',
    excerpt: 'Revisiting a film that gets better with each viewing, uncovering new layers of meaning.',
    content: `
# A Cinematic Masterpiece Worth Revisiting

Some films reveal their brilliance over time. This is one of them.

## Visual Storytelling

The cinematography alone is worth the price of admission. Every frame is carefully composed, telling a story within the story.

## Performances

The cast delivers career-defining performances. The chemistry between the leads is palpable.

## Why It Matters

This film represents cinema at its finest - art that entertains, challenges, and inspires.
    `,
    category: 'film',
    author: author,
    publishedAt: '2024-01-01',
    image: '/posts/film-review.jpg',
  },
  {
    slug: 'thoughts-on-modern-life',
    title: 'Thoughts on Modern Life',
    excerpt: 'A personal essay reflecting on the complexities and contradictions of contemporary existence.',
    content: `
# Thoughts on Modern Life

Living in the modern world is a constant balancing act. We're more connected than ever, yet often feel more isolated.

## The Paradox of Connection

Technology has given us unprecedented ways to connect, but has it made us closer? This question has been on my mind lately.

## Finding Balance

Perhaps the key is not to reject modernity, but to find ways to maintain our humanity within it.

## Conclusion

These are just thoughts, not answers. But sometimes, the questions are more important than the solutions.
    `,
    category: 'essay',
    author: author,
    publishedAt: '2023-12-28',
    image: '/posts/essay-modern-life.jpg',
  },
]

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

