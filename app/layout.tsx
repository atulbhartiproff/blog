import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { author } from '@/data/author'
import { ThemeProvider } from './components/ThemeContext'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'

export const metadata: Metadata = {
  title: `${author.name}'s Blog`,
  description: author.bio,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  var t = localStorage.getItem('theme');
  var isDark = t === 'dark' ? true : t === 'light' ? false : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var scheme = isDark ? 'dark' : 'light';
  var bg = isDark ? '#000' : 'rgb(249 250 251)';
  document.documentElement.style.colorScheme = scheme;
  document.documentElement.style.backgroundColor = bg;
  document.documentElement.setAttribute('data-theme', scheme);
  document.body.style.backgroundColor = bg;
})();
`,
          }}
        />
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-grow">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

