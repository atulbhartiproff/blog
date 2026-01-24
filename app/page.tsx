import { getAllPosts } from '@/data/posts'
import PostList from './components/PostList'

export default async function Home() {
  const posts = await getAllPosts()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to My Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Exploring albums, games, books, films, and essays that inspire and move me.
        </p>
      </div>

      <PostList initialPosts={posts} />
    </div>
  )
}

