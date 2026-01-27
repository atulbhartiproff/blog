import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { getPostBySlug, getAllPosts, type PostCategory } from '@/data/posts'
import Image from 'next/image'

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
        <div className="p-8 pb-6 md:p-12">
          <div className="mb-6 flex items-center justify-between">
            <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-lime-300/20 dark:text-lime-200 dark:ring-1 dark:ring-lime-400/70">
              {categoryLabels[post.category]}
            </span>
            <time className="text-sm text-gray-500 dark:text-lime-200/70">
              {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
            </time>
          </div>

          <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-lime-100 md:text-5xl">
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

          <div className="mb-8 flex items-center gap-4 border-b border-gray-200 pb-8 dark:border-lime-500/40">
            <div className="flex items-center gap-3">
              {post.author.image && (
                <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-primary-400 dark:ring-lime-400/80">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-lime-100">
                  {post.author.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-lime-200/70">
                  Author
                </p>
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

