import { readClient as client } from './sanity.client'

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  category,
  publishedAt,
  "image": image.asset->url,
  author->{
    name,
    bio,
    "image": image.asset->url,
    email,
    social
  }
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  category,
  publishedAt,
  "image": image.asset->url,
  author->{
    name,
    bio,
    "image": image.asset->url,
    email,
    social
  }
}`

export const postsByCategoryQuery = `*[_type == "post" && category == $category] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  category,
  publishedAt,
  "image": image.asset->url,
  author->{
    name,
    bio,
    "image": image.asset->url,
    email,
    social
  }
}`

export async function getAllPosts() {
  try {
    console.log('Fetching posts from Sanity...')
    const posts = await client.fetch(postsQuery)
    console.log('Fetched posts from Sanity:', posts?.length || 0, 'posts')
    if (!posts || posts.length === 0) {
      console.log('No posts found in Sanity dataset')
      return []
    }
    const transformed = posts.map(transformSanityPost).filter(Boolean)
    console.log('Transformed posts:', transformed.length)
    return transformed
  } catch (error) {
    console.error('Error fetching posts from Sanity:', error)
    console.error('Error message:', error.message)
    return []
  }
}

export async function getPostBySlug(slug) {
  const post = await client.fetch(postBySlugQuery, { slug })
  if (!post) return undefined
  const transformed = transformSanityPost(post)
  return transformed || undefined
}

export async function getPostsByCategory(category) {
  const posts = await client.fetch(postsByCategoryQuery, { category })
  return posts.map(transformSanityPost)
}

function transformSanityPost(post) {
  if (!post) {
    console.warn('Received null/undefined post')
    return null
  }
  
  // Handle author - might be null if reference is broken
  let authorData = post.author
  if (!authorData || !authorData.name) {
    console.warn('Post missing author data:', post._id, post.title)
    authorData = {
      name: 'Unknown',
      bio: '',
      image: '',
      email: '',
      social: {},
    }
  }
  
  return {
    slug: post.slug || '',
    title: post.title || '',
    excerpt: post.excerpt || '',
    content: post.content || '',
    category: post.category || 'essay',
    author: authorData,
    publishedAt: post.publishedAt || new Date().toISOString().split('T')[0],
    image: post.image || undefined,
  }
}

