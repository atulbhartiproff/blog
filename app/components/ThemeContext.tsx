'use client'

import { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react'

type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Always start as 'light' so server and client first paint match (avoids hydration error).
  // Script in layout already set document color-scheme + html/body background from localStorage.
  const [theme, setTheme] = useState<Theme>('light')

  // After mount, apply saved theme so React tree matches the script/appearance.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem('theme')
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
      return
    }
    const dataTheme = document.documentElement.getAttribute('data-theme')
    if (dataTheme === 'dark' || dataTheme === 'light') {
      setTheme(dataTheme)
      return
    }
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])

  // Persist theme choice
  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('theme', theme)
  }, [theme])

  // Sync browser chrome and overscroll: color-scheme + html/body background
  useEffect(() => {
    if (typeof window === 'undefined') return
    const root = document.documentElement
    const bg = theme === 'dark' ? '#000' : 'rgb(249 250 251)'
    root.style.colorScheme = theme
    root.style.backgroundColor = bg
    root.setAttribute('data-theme', theme)
    document.body.style.backgroundColor = bg
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    [theme],
  )

  return (
    <ThemeContext.Provider value={value}>
      <div className={theme === 'dark' ? 'dark' : ''} suppressHydrationWarning>
        <div
          className={
            theme === 'dark'
              ? 'min-h-screen bg-gradient-to-br from-black via-black to-emerald-900 text-lime-200 transition-colors duration-500 ease-out'
              : 'min-h-screen bg-gray-50 text-gray-900 transition-colors duration-500 ease-out'
          }
          suppressHydrationWarning
        >
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}


