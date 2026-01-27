import Link from 'next/link'
import { format } from 'date-fns'
import { getAllPosts, type PostCategory } from '@/data/posts'

// Revalidate every 60 seconds to pick up new posts from Sanity
export const revalidate = 60

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

export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-4xl font-bold text-gray-900 dark:text-white">All Posts</h1>
      
      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl"
          >
            <div className="mb-3 flex items-start justify-between">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[post.category]}`}>
                {categoryLabels[post.category]}
              </span>
              <span className="text-sm text-gray-500">
                {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
              </span>
            </div>
            <h2 className="mb-2 text-2xl font-semibold text-gray-900 transition hover:text-primary-600 dark:text-white">
              {post.title}
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              {post.excerpt}
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span>By {post.author.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

