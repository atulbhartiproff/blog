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
  "author": author->{
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
  "author": author->{
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
  "author": author->{
    name,
    bio,
    "image": image.asset->url,
    email,
    social
  }
}`

export async function getAllPosts() {
  const posts = await client.fetch(postsQuery)
  return posts.map(transformSanityPost)
}

export async function getPostBySlug(slug) {
  const post = await client.fetch(postBySlugQuery, { slug })
  if (!post) return undefined
  return transformSanityPost(post)
}

export async function getPostsByCategory(category) {
  const posts = await client.fetch(postsByCategoryQuery, { category })
  return posts.map(transformSanityPost)
}

function transformSanityPost(post) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    author: post.author || {
      name: 'Unknown',
      bio: '',
      image: '',
      email: '',
      social: {},
    },
    publishedAt: post.publishedAt,
    image: post.image || undefined,
  }
}

