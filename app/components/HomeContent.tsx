'use client'

import { useState, useEffect } from 'react'
import type { Post, PostCategory } from '@/data/posts'
import HeroSection from './HeroSection'
import PostList from './PostList'
import GlitchIntro from './GlitchIntro'

interface HomeContentProps {
  initialPosts: Post[]
}

export default function HomeContent({ initialPosts }: HomeContentProps) {
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
    <div className="min-h-screen">
      {showGlitchIntro && <GlitchIntro key={introKey} onComplete={handleGlitchComplete} />}
      
      <HeroSection 
        selectedCategories={selectedCategories}
        onCategoryToggle={toggleCategory}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <PostList 
          initialPosts={initialPosts}
          selectedCategories={selectedCategories}
        />
      </div>
    </div>
  )
}

