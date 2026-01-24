import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { getPostBySlug, getAllPosts, type PostCategory } from '@/data/posts'
import Image from 'next/image'

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

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8 md:p-12 pb-6">
          <div className="flex items-center justify-between mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[post.category]}`}>
              {categoryLabels[post.category]}
            </span>
            <time className="text-sm text-gray-500">
              {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
            </time>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
        </div>

        {post.image && (
          <div className="relative h-64 md:h-96 bg-gray-200">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div className="p-8 md:p-12">

          <div className="flex items-center gap-4 mb-8 pb-8 border-b">
            <div className="flex items-center gap-3">
              {post.author.image && (
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={post.author.image}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-medium text-gray-900">{post.author.name}</p>
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

