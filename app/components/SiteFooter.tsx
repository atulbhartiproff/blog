'use client'

import { author } from '@/data/author'
import { useTheme } from './ThemeContext'

export default function SiteFooter() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <footer
      className={`mt-auto border-t transition-colors duration-300 ${
        isDark ? 'border-lime-500/30 bg-black/90 text-lime-200/80' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} {author.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}


