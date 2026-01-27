'use client'

import { motion } from 'framer-motion'
import { author } from '@/data/author'
import type { PostCategory } from '@/data/posts'

interface HeroSectionProps {
  selectedCategories: Set<PostCategory>
  onCategoryToggle: (category: PostCategory) => void
  theme: 'light' | 'dark'
}

const categories: { category: PostCategory; label: string; emoji: string }[] = [
  { category: 'album', label: 'Albums', emoji: '🎵' },
  { category: 'game', label: 'Games', emoji: '🎮' },
  { category: 'book', label: 'Books', emoji: '📚' },
  { category: 'film', label: 'Films', emoji: '🎬' },
  { category: 'essay', label: 'Essays', emoji: '✍️' },
]

export default function HeroSection({ selectedCategories, onCategoryToggle, theme }: HeroSectionProps) {
  const isDark = theme === 'dark'

  return (
    <div
      className={`relative overflow-hidden ${
        isDark
          ? 'bg-black border-b border-lime-500/40'
          : 'bg-gradient-to-br from-primary-600 via-primary-700 to-purple-800'
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {isDark ? (
          <>
            {/* Chaotic neon lines */}
            <div className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.3),_transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(74,222,128,0.3),_transparent_60%)]" />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,transparent_0,transparent_12px,rgba(34,197,94,0.18)_12px,rgba(34,197,94,0.18)_16px)]" />
              <div className="absolute inset-0 bg-[repeating-linear-gradient(-65deg,transparent_0,transparent_18px,rgba(22,163,74,0.25)_18px,rgba(22,163,74,0.25)_22px)] mix-blend-overlay" />
            </div>
            {/* Glow grid */}
            <div className="pointer-events-none absolute inset-0 opacity-20">
              <div className="h-full w-full bg-[linear-gradient(to_right,rgba(34,197,94,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>
          </>
        ) : (
          <>
            <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-white opacity-10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500 opacity-10 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-blue-500 opacity-10 blur-3xl" />
          </>
        )}
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
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
            className={`mb-6 text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl ${
              isDark ? 'text-lime-300 drop-shadow-[0_0_25px_rgba(190,242,100,0.9)]' : 'text-white'
            }`}
          >
            Welcome to{' '}
            <span
              className={
                isDark
                  ? 'border border-lime-400/70 bg-black/60 px-3 py-1 text-lime-200 shadow-[0_0_25px_rgba(190,242,100,0.7)]'
                  : 'bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent'
              }
            >
              {author.name}'s Blog
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`mx-auto mb-8 max-w-3xl text-xl sm:text-2xl ${
              isDark ? 'text-lime-100/80' : 'text-primary-100'
            } leading-relaxed`}
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
                  className={`px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    isDark
                      ? isActive
                        ? 'border border-lime-400 bg-lime-300/20 text-lime-200 shadow-[0_0_20px_rgba(190,242,100,0.8)]'
                        : 'border border-lime-500/40 bg-black/60 text-lime-200 hover:border-lime-300 hover:bg-black/40'
                      : isActive
                        ? 'scale-105 bg-white text-primary-700 shadow-lg'
                        : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                  } rounded-full`}
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
        {isDark ? (
          <svg
            className="h-10 w-full text-lime-500/60"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <polyline
              points="0,80 80,40 160,100 260,20 360,90 460,30 560,100 660,40 760,90 860,10 960,95 1060,35 1160,80 1200,60 1200,120 0,120"
              fill="currentColor"
            />
          </svg>
        ) : (
          <svg
            className="h-12 w-full text-gray-50"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
              fill="currentColor"
            />
          </svg>
        )}
      </div>
    </div>
  )
}

