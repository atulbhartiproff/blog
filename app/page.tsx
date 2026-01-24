import { getAllPosts } from '@/data/posts'
import HomeContent from './components/HomeContent'

export default async function Home() {
  const posts = await getAllPosts()

  return <HomeContent initialPosts={posts} />
}

