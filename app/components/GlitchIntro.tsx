'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function GlitchIntro({ onComplete }: { onComplete: () => void }) {
  const text = 'WELCOME BACK'
  const [isGlitching, setIsGlitching] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Stop glitching after 3 seconds
    const stopGlitch = setTimeout(() => {
      setIsGlitching(false)
    }, 3000)

    // Fade out and complete after 5 seconds total
    const completeTimeout = setTimeout(() => {
      setIsVisible(false)
      // Wait for fade out animation to complete before calling onComplete
      setTimeout(() => {
        onComplete()
      }, 500) // Match the fade out duration
    }, 5000)

    return () => {
      clearTimeout(stopGlitch)
      clearTimeout(completeTimeout)
    }
  }, [onComplete])

  if (!isVisible) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-black z-[9999] flex items-center justify-center px-4"
      >
        <div className="relative w-full max-w-6xl">
          {/* Glitch effect layers */}
          <div className="relative">
            {/* Red glitch layer */}
            <motion.div
              animate={{
                x: isGlitching ? [0, -3, 3, -3, 3, 0] : 0,
                y: isGlitching ? [0, 2, -2, 2, -2, 0] : 0,
              }}
              transition={{
                duration: 0.1,
                repeat: isGlitching ? Infinity : 0,
              }}
              className="absolute inset-0 text-red-500 opacity-80"
              style={{
                clipPath: 'inset(0 0 0 0)',
                textShadow: '2px 0 0 red, -2px 0 0 cyan',
              }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tight sm:tracking-wider text-center leading-tight sm:leading-normal break-words px-2">
                {text}
              </h1>
            </motion.div>

            {/* Cyan glitch layer */}
            <motion.div
              animate={{
                x: isGlitching ? [0, 3, -3, 3, -3, 0] : 0,
                y: isGlitching ? [0, -2, 2, -2, 2, 0] : 0,
              }}
              transition={{
                duration: 0.1,
                repeat: isGlitching ? Infinity : 0,
              }}
              className="absolute inset-0 text-cyan-500 opacity-80"
              style={{
                clipPath: 'inset(0 0 0 0)',
                textShadow: '-2px 0 0 cyan, 2px 0 0 red',
              }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tight sm:tracking-wider text-center leading-tight sm:leading-normal break-words px-2">
                {text}
              </h1>
            </motion.div>

            {/* Main text */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tight sm:tracking-wider text-center text-white relative z-10 leading-tight sm:leading-normal break-words px-2"
              animate={{
                opacity: isGlitching ? [1, 0.9, 1, 0.9, 1] : 1,
              }}
              transition={{
                duration: 0.1,
                repeat: isGlitching ? Infinity : 0,
              }}
            >
              {text}
            </motion.h1>
          </div>

          {/* Scan lines effect */}
          {isGlitching && (
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="w-full h-full"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)',
                }}
              />
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

