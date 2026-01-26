import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import { author } from '@/data/author'

export const metadata: Metadata = {
  title: `${author.name}'s Blog`,
  description: author.bio,
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white shadow-sm border-b">
            <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <Link href="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700">
                  {author.name}'s Blog
                </Link>
                <div className="flex space-x-6">
                  <Link href="/" className="text-gray-700 hover:text-primary-600 transition">
                    Home
                  </Link>
                  <Link href="/about" className="text-gray-700 hover:text-primary-600 transition">
                    About
                  </Link>
                </div>
              </div>
            </nav>
          </header>
          
          <main className="flex-grow">
            {children}
          </main>
          
          <footer className="bg-white border-t mt-auto">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center text-gray-600">
                <p>&copy; {new Date().getFullYear()} {author.name}. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

