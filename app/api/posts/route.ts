import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity.client'
import { getAllPosts } from '@/lib/sanity.queries'
import { author } from '@/data/author'

export async function GET() {
  try {
    const posts = await getAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.SANITY_API_TOKEN) {
      return NextResponse.json({ error: 'SANITY_API_TOKEN is not configured' }, { status: 500 })
    }

    const body = await request.json()
    const { title, category, content, image, excerpt } = body

    // Generate slug from title
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    const slug = `${baseSlug}-${Date.now()}`

    // First, ensure author exists in Sanity
    let authorId = await getOrCreateAuthor()

    // Handle image - if it's a URL, we need to upload it to Sanity
    let imageRef = null
    if (image) {
      try {
        // If image is a Sanity asset ID (from upload endpoint), use it directly
        if (image.startsWith('image-')) {
          imageRef = {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: image,
            },
          }
        } else if (image.startsWith('http') && image.includes('cdn.sanity.io')) {
          // Already a Sanity CDN URL - extract asset ID from URL
          // Format: https://cdn.sanity.io/images/{projectId}/{dataset}/{assetId}-{width}x{height}.{ext}
          const match = image.match(/images\/[^/]+\/[^/]+\/([^-]+)-/)
          if (match && match[1]) {
            imageRef = {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: match[1],
              },
            }
          }
        }
      } catch (error) {
        console.error('Error handling image for Sanity:', error)
      }
    }

    // Create post in Sanity
    const newPost = await client.create({
      _type: 'post',
      title,
      slug: {
        _type: 'slug',
        current: slug,
      },
      excerpt: excerpt || content.substring(0, 150) + '...',
      content,
      category,
      author: {
        _type: 'reference',
        _ref: authorId,
      },
      publishedAt: new Date().toISOString().split('T')[0],
      ...(imageRef && { image: imageRef }),
    })

    return NextResponse.json({ success: true, post: newPost })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}

async function getOrCreateAuthor() {
  // Check if author already exists
  const existingAuthors = await client.fetch(`*[_type == "author" && name == $name]`, {
    name: author.name,
  })

  if (existingAuthors.length > 0) {
    return existingAuthors[0]._id
  }

  // Create author if it doesn't exist
  const newAuthor = await client.create({
    _type: 'author',
    name: author.name,
    bio: author.bio,
    email: author.email,
    social: author.social,
  })

  return newAuthor._id
}
