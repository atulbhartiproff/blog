import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.client'

export async function POST(request: NextRequest) {
  try {
    if (!process.env.SANITY_API_TOKEN) {
      return NextResponse.json({ error: 'SANITY_API_TOKEN is not configured' }, { status: 500 })
    }

    const formData = await request.formData()
    const file = formData.get('image') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Sanity
    const asset = await client.assets.upload('image', buffer, {
      filename: file.name,
    })

    if (!asset) {
      return NextResponse.json({ error: 'Failed to upload asset' }, { status: 500 })
    }

    // Get the URL for the uploaded image
    const imageBuilder = urlFor(asset)
    if (!imageBuilder) {
      return NextResponse.json({ error: 'Failed to create image builder' }, { status: 500 })
    }
    
    const imageUrl = imageBuilder.url()

    if (!imageUrl) {
      return NextResponse.json({ error: 'Failed to generate image URL' }, { status: 500 })
    }

    return NextResponse.json({ 
      url: imageUrl, 
      assetId: asset._id,
    })
  } catch (error) {
    console.error('Error uploading file to Sanity:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
