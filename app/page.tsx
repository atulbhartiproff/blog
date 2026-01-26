import { getAllPosts } from '@/data/posts'
import HomeContent from './components/HomeContent'

export default async function Home() {
  try {
    const posts = await getAllPosts()
    console.log('Home page: Loaded', posts.length, 'posts')
    return <HomeContent initialPosts={posts} />
  } catch (error) {
    console.error('Home page: Error loading posts:', error)
    return <HomeContent initialPosts={[]} />
  }
}

