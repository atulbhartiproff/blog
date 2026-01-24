'use client'

import { useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import type { Post, PostCategory } from '@/data/posts'
import CreatePostForm from './CreatePostForm'

const categoryColors: Record<PostCategory, string> = {
  album: 'bg-purple-100 text-purple-800',
  game: 'bg-blue-100 text-blue-800',
  book: 'bg-green-100 text-green-800',
  film: 'bg-red-100 text-red-800',
  essay: 'bg-yellow-100 text-yellow-800',
}

const categoryLabels: Record<PostCategory, string> = {
  album: 'Album',
  game: 'Game',
  book: 'Book',
  film: 'Film',
  essay: 'Essay',
}

interface PostListProps {
  initialPosts: Post[]
}

export default function PostList({ initialPosts }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)

  const refreshPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const allPosts: Post[] = await response.json()
        setPosts(allPosts)
      }
    } catch (error) {
      console.error('Error refreshing posts:', error)
    }
  }

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {post.image && (
              <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${categoryColors[post.category]}`}>
                  {categoryLabels[post.category]}
                </span>
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category]}`}>
                  {categoryLabels[post.category]}
                </span>
                <span className="text-sm text-gray-500">
                  {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2 hover:text-primary-600 transition">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <span>By {post.author.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts yet. Check back soon!</p>
        </div>
      )}

      <CreatePostForm onPostCreated={refreshPosts} />
    </>
  )
}

