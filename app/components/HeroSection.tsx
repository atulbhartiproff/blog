'use client'

import { motion } from 'framer-motion'
import { author } from '@/data/author'
import type { PostCategory } from '@/data/posts'

interface HeroSectionProps {
  selectedCategories: Set<PostCategory>
  onCategoryToggle: (category: PostCategory) => void
}

const categories: { category: PostCategory; label: string; emoji: string }[] = [
  { category: 'album', label: 'Albums', emoji: '🎵' },
  { category: 'game', label: 'Games', emoji: '🎮' },
  { category: 'book', label: 'Books', emoji: '📚' },
  { category: 'film', label: 'Films', emoji: '🎬' },
  { category: 'essay', label: 'Essays', emoji: '✍️' },
]

export default function HeroSection({ selectedCategories, onCategoryToggle }: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-purple-800">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight"
          >
            Welcome to{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              {author.name}'s Blog
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl sm:text-2xl text-primary-100 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Exploring albums, games, books, films, and essays that inspire and move me.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map(({ category, label, emoji }) => {
              const isActive = selectedCategories.has(category)
              return (
                <motion.button
                  key={category}
                  onClick={() => onCategoryToggle(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-white text-primary-700 shadow-lg scale-105'
                      : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                  }}
                >
                  {emoji} {label}
                </motion.button>
              )
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-12 text-gray-50"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  )
}

