'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { author } from '@/data/author'
import { useTheme } from './ThemeContext'
import ThemeToggle from './ThemeToggle'

export default function SiteHeader() {
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  const isDark = theme === 'dark'

  return (
    <header
      className={`border-b shadow-sm transition-colors duration-300 ${
        isDark ? 'border-lime-500/40 bg-black/80 backdrop-blur' : 'border-gray-200 bg-white'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-2xl font-bold transition-colors ${
              isDark
                ? 'text-lime-300 hover:text-lime-200'
                : 'text-primary-600 hover:text-primary-700'
            }`}
          >
            {author.name}'s Blog
          </Link>
          <div className="hidden items-center space-x-6 text-sm font-medium sm:flex">
            <Link
              href="/"
              className={`transition-colors ${
                isDark
                  ? 'text-lime-200/80 hover:text-lime-100'
                  : 'text-gray-700 hover:text-primary-600'
              } ${pathname === '/' ? (isDark ? 'underline decoration-lime-400' : 'underline decoration-primary-500') : ''}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`transition-colors ${
                isDark
                  ? 'text-lime-200/80 hover:text-lime-100'
                  : 'text-gray-700 hover:text-primary-600'
              } ${pathname === '/about' ? (isDark ? 'underline decoration-lime-400' : 'underline decoration-primary-500') : ''}`}
            >
              About
            </Link>
          </div>
        </div>

        {/* Show theme toggle in header, available on all pages */}
        <ThemeToggle
          theme={theme}
          onThemeChange={() => toggleTheme()}
        />
      </nav>
    </header>
  )
}


