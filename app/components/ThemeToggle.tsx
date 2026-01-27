'use client'

import { motion } from 'framer-motion'

type Theme = 'light' | 'dark'

type ThemeToggleProps = {
  theme: Theme
  onThemeChange: (theme: Theme) => void
}

export default function ThemeToggle({ theme, onThemeChange }: ThemeToggleProps) {
  const isDark = theme === 'dark'

  return (
    <motion.button
      type="button"
      onClick={() => onThemeChange(isDark ? 'light' : 'dark')}
      className={`relative flex items-center rounded-full border px-2 py-1 text-xs font-semibold transition-all duration-300 ${
        isDark
          ? 'border-lime-400/70 bg-black/70 text-lime-300 shadow-[0_0_18px_rgba(190,242,100,0.7)]'
          : 'border-gray-200 bg-white/90 text-gray-900 shadow-md backdrop-blur'
      }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
    >
      <span
        className={`relative flex h-6 w-10 items-center rounded-full border transition-colors duration-300 ${
          isDark ? 'border-lime-400 bg-black' : 'border-gray-300 bg-gray-100'
        }`}
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className={`flex h-5 w-5 items-center justify-center rounded-full shadow-md ${
            isDark ? 'ml-4 bg-lime-400 text-black' : 'ml-1 bg-yellow-300 text-yellow-900'
          }`}
        >
          {isDark ? '⚡' : '☀️'}
        </motion.span>
      </span>
    </motion.button>
  )
}


