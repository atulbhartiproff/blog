import { author } from '@/data/author'
import Image from 'next/image'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            {author.image && (
              <div className="relative w-48 h-48 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {author.name}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {author.bio}
              </p>
            </div>
          </div>

          <div className="border-t pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Blog</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              This is a space where I share my thoughts and experiences with the media that moves me. 
              Whether it's an album that soundtracked a season of my life, a game that challenged my 
              perspective, a book that expanded my worldview, a film that left me speechless, or an 
              essay exploring the complexities of modern existence - you'll find it here.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              I believe that art in all its forms has the power to connect us, challenge us, and 
              help us understand ourselves and the world around us better. Through this blog, I hope 
              to share that journey with you.
            </p>
          </div>

          {(author.email || author.social) && (
            <div className="border-t pt-8 mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Connect</h2>
              <div className="flex flex-wrap gap-4">
                {author.email && (
                  <a
                    href={`mailto:${author.email}`}
                    className="text-primary-600 hover:text-primary-700 transition"
                  >
                    Email
                  </a>
                )}
                {author.social?.twitter && (
                  <a
                    href={author.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 transition"
                  >
                    Twitter
                  </a>
                )}
                {author.social?.github && (
                  <a
                    href={author.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 transition"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

