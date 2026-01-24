'use client'

import { useState } from 'react'
import { author } from '@/data/author'
import type { PostCategory } from '@/data/posts'

interface CreatePostFormProps {
  onPostCreated: () => void
}

export default function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<PostCategory>('essay')
  const [content, setContent] = useState('')
  const [bannerImage, setBannerImage] = useState<File | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBannerImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setBannerPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) {
      alert('Please fill in the title and content')
      return
    }

    setIsSubmitting(true)

    try {
      let imageUrl = ''

      // Upload image if provided
      if (bannerImage) {
        const formData = new FormData()
        formData.append('image', bannerImage)

        const imageResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (imageResponse.ok) {
          const imageData = await imageResponse.json()
          imageUrl = imageData.url
        }
      }

      // Create post
      const postData = {
        title: title.trim(),
        category,
        content: content.trim(),
        image: imageUrl,
        excerpt: content.trim().substring(0, 150) + (content.length > 150 ? '...' : ''),
        author: author,
        publishedAt: new Date().toISOString().split('T')[0],
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        // Reset form
        setTitle('')
        setContent('')
        setBannerImage(null)
        setBannerPreview(null)
        setIsOpen(false)
        onPostCreated()
      } else {
        alert('Failed to create post')
      }
    } catch (error) {
      console.error('Error creating post:', error)
      alert('An error occurred while creating the post')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-primary-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-primary-700 transition-colors z-50 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        New Post
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Create New Post</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Post Title (Heading)
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter post title..."
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as PostCategory)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="album">Album</option>
                  <option value="game">Game</option>
                  <option value="book">Book</option>
                  <option value="film">Film</option>
                  <option value="essay">Essay</option>
                </select>
              </div>

              <div>
                <label htmlFor="bannerImage" className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Image
                </label>
                <input
                  type="file"
                  id="bannerImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {bannerPreview && (
                  <div className="mt-4">
                    <img
                      src={bannerPreview}
                      alt="Banner preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Post Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Write your post content here..."
                  required
                />
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

