import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { getPostBySlug, getAllPosts, type PostCategory } from '@/data/posts'
import Image from 'next/image'
import { useTheme } from '@/app/components/ThemeContext'

const categoryColorsLight: Record<PostCategory, string> = {
  album: 'bg-purple-100 text-purple-800',
  game: 'bg-blue-100 text-blue-800',
  book: 'bg-green-100 text-green-800',
  film: 'bg-red-100 text-red-800',
  essay: 'bg-yellow-100 text-yellow-800',
}

const categoryColorsDark: Record<PostCategory, string> = {
  album: 'bg-lime-300/20 text-lime-200 border border-lime-400/70',
  game: 'bg-lime-300/20 text-lime-200 border border-lime-400/70',
  book: 'bg-lime-300/20 text-lime-200 border border-lime-400/70',
  film: 'bg-lime-300/20 text-lime-200 border border-lime-400/70',
  essay: 'bg-lime-300/20 text-lime-200 border border-lime-400/70',
}

const categoryLabels: Record<PostCategory, string> = {
  album: 'Album',
  game: 'Game',
  book: 'Book',
  film: 'Film',
  essay: 'Essay',
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Note: PostPage is a server component, so it can't call useTheme directly.
  // We style the shell neutrally; the ThemeProvider in layout already applies
  // the global dark background and text, and components inside can use useTheme
  // if needed via a separate client wrapper.

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md dark:border-lime-500/40 dark:bg-black/80">
        <div className="pb-6 p-8 md:p-12">
          <div className="mb-6 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              {categoryLabels[post.category]}
            </span>
            <time className="text-sm text-gray-500">
              {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
            </time>
          </div>

          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            {post.title}
          </h1>
        </div>

        {post.image ? (
          <div className="relative h-64 bg-gray-200 md:h-96">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="relative flex h-64 items-center justify-center bg-gradient-to-br from-primary-500 to-purple-600 md:h-96">
            <div className="text-6xl text-white opacity-50">
              {post.category === 'album' && '🎵'}
              {post.category === 'game' && '🎮'}
              {post.category === 'book' && '📚'}
              {post.category === 'film' && '🎬'}
              {post.category === 'essay' && '✍️'}
            </div>
          </div>
        )}
        
        <div className="p-8 md:p-12">

          <div className="mb-8 flex items-center gap-4 border-b pb-8">
            <div className="flex items-center gap-3">
              {post.author.image && (
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900"> {post.author.name}</p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.trim() === '') return null
              
              if (paragraph.startsWith('# ')) {
                return <h1 key={index}>{paragraph.replace('# ', '')}</h1>
              }
              if (paragraph.startsWith('## ')) {
                return <h2 key={index}>{paragraph.replace('## ', '')}</h2>
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={index}>{paragraph.replace('### ', '')}</h3>
              }
              if (paragraph.startsWith('- **')) {
                const match = paragraph.match(/- \*\*(.+?)\*\*: (.+)/)
                if (match) {
                  return (
                    <p key={index} className="mb-2">
                      <strong>{match[1]}:</strong> {match[2]}
                    </p>
                  )
                }
              }
              if (paragraph.startsWith('- ')) {
                return <p key={index} className="mb-2">• {paragraph.replace('- ', '')}</p>
              }
              
              return <p key={index}>{paragraph}</p>
            })}
          </div>
        </div>
      </div>
    </article>
  )
}

