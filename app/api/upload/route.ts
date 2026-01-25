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

    // Get the URL for the uploaded image
    const imageUrl = urlFor(asset).url()

    return NextResponse.json({ 
      url: imageUrl, 
      assetId: asset._id,
    })
  } catch (error) {
    console.error('Error uploading file to Sanity:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
