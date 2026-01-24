import Link from 'next/link'
import { format } from 'date-fns'
import { getAllPosts, type PostCategory } from '@/data/posts'

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">All Posts</h1>
      
      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="block bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[post.category]}`}>
                {categoryLabels[post.category]}
              </span>
              <span className="text-sm text-gray-500">
                {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2 hover:text-primary-600 transition">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-4">
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

