'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import type { Post, PostCategory } from '@/data/posts'
import CreatePostForm from './CreatePostForm'
import { useTheme } from './ThemeContext'

const categoryColors: Record<PostCategory, string> = {
  album: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
  game: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
  book: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
  film: 'bg-gradient-to-r from-red-500 to-rose-500 text-white',
  essay: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
}

const categoryLabels: Record<PostCategory, string> = {
  album: '🎵 Album',
  game: '🎮 Game',
  book: '📚 Book',
  film: '🎬 Film',
  essay: '✍️ Essay',
}

interface PostListProps {
  initialPosts: Post[]
  selectedCategories: Set<PostCategory>
}

export default function PostList({ initialPosts, selectedCategories }: PostListProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [posts, setPosts] = useState<Post[]>(initialPosts)

  // Auto-refresh posts every 60 seconds to pick up new posts from Sanity
  useEffect(() => {
    const interval = setInterval(refreshPosts, 60000)
    return () => clearInterval(interval)
  }, [])

  // Filter posts based on selected categories
  const filteredPosts = selectedCategories.size > 0
    ? posts.filter((post) => selectedCategories.has(post.category))
    : posts

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={selectedCategories.size} // Re-animate when filters change
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.slug}
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link
              href={`/posts/${post.slug}`}
              className="block group"
            >
              <div className={`h-full flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 shadow-lg hover:shadow-2xl ${
                isDark
                  ? 'border-lime-500/40 bg-black/80'
                  : 'border-gray-100 bg-white'
              }`}>
                {post.image ? (
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <motion.img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <motion.span
                      className={`absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm ${categoryColors[post.category]}`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {categoryLabels[post.category]}
                    </motion.span>
                  </div>
                ) : (
                  <div className={`relative flex h-56 items-center justify-center bg-gradient-to-br ${
                    isDark ? 'from-lime-500 to-emerald-700' : 'from-primary-500 to-purple-600'
                  }`}>
                    <div className="text-6xl opacity-50 text-white">
                      {post.category === 'album' && '🎵'}
                      {post.category === 'game' && '🎮'}
                      {post.category === 'book' && '📚'}
                      {post.category === 'film' && '🎬'}
                      {post.category === 'essay' && '✍️'}
                    </div>
                    <span className={`absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-semibold shadow-lg ${categoryColors[post.category]}`}>
                      {categoryLabels[post.category]}
                    </span>
                  </div>
                )}
                
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${categoryColors[post.category]}`}>
                      {categoryLabels[post.category]}
                    </span>
                    <span className={`text-xs font-medium ${
                      isDark ? 'text-lime-200/70' : 'text-gray-500'
                    }`}>
                      {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                  
                  <h2 className={`mb-3 line-clamp-2 text-2xl font-bold transition-colors group-hover:text-primary-600 ${
                    isDark ? 'text-lime-100' : 'text-gray-900'
                  }`}>
                    {post.title}
                  </h2>
                  
                  <p className={`mb-4 flex-1 text-sm leading-relaxed line-clamp-3 ${
                    isDark ? 'text-lime-100/80' : 'text-gray-600'
                  }`}>
                    {post.excerpt}
                  </p>
                  
                  <div className={`flex items-center justify-between border-t pt-4 ${
                    isDark ? 'border-lime-500/30' : 'border-gray-100'
                  }`}>
                    <div className="flex items-center gap-2">
                      <div className="relative h-8 w-8 overflow-hidden rounded-full">
                        {post.author.image ? (
                          <Image
                            src={post.author.image}
                            alt={post.author.name}
                            fill
                            sizes="32px"
                            className="object-cover"
                          />
                        ) : (
                          <div className={`flex h-full w-full items-center justify-center text-xs font-bold text-white bg-gradient-to-br ${
                            isDark ? 'from-lime-500 to-emerald-600' : 'from-primary-400 to-purple-500'
                          }`}>
                            {post.author.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <span className={`text-sm font-medium ${
                        isDark ? 'text-lime-100/90' : 'text-gray-600'
                      }`}>
                        {post.author.name}
                      </span>
                    </div>
                    <motion.div
                      className="text-primary-600 group-hover:text-primary-700"
                      whileHover={{ x: 5 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <div className="inline-block p-6 bg-gradient-to-br from-primary-100 to-purple-100 rounded-2xl">
            <p className="text-gray-600 text-lg font-medium">
              {selectedCategories.size > 0 
                ? `No posts found in the selected ${selectedCategories.size === 1 ? 'category' : 'categories'}.`
                : 'No posts yet. Check back soon!'}
            </p>
          </div>
        </motion.div>
      )}

      <CreatePostForm onPostCreated={refreshPosts} />
    </>
  )
}

