'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Post, PostCategory } from '@/data/posts'
import HeroSection from './HeroSection'
import PostList from './PostList'
import GlitchIntro from './GlitchIntro'
import { useTheme } from './ThemeContext'

interface HomeContentProps {
  initialPosts: Post[]
}

export default function HomeContent({ initialPosts }: HomeContentProps) {
  const { theme } = useTheme()
  const [selectedCategories, setSelectedCategories] = useState<Set<PostCategory>>(new Set())
  const [showGlitchIntro, setShowGlitchIntro] = useState(true)
  const [introKey, setIntroKey] = useState(0)

  useEffect(() => {
    // Show glitch intro every time component mounts (when navigating to home)
    setShowGlitchIntro(true)
    setIntroKey((prev) => prev + 1) // Force re-mount of GlitchIntro component
  }, [])

  const handleGlitchComplete = () => {
    setShowGlitchIntro(false)
  }

  const toggleCategory = (category: PostCategory) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(category)) {
        newSet.delete(category)
      } else {
        newSet.add(category)
      }
      return newSet
    })
  }

  return (
    <div className="transition-colors duration-500">
      {showGlitchIntro && <GlitchIntro key={introKey} onComplete={handleGlitchComplete} />}

      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <HeroSection
            selectedCategories={selectedCategories}
            onCategoryToggle={toggleCategory}
            theme={theme}
          />

          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <PostList
              initialPosts={initialPosts}
              selectedCategories={selectedCategories}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

