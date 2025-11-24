import { db } from '@/lib/db'
import { randomHash } from '@/utils/random-hash'
import { slugify } from '@/utils/slugify'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { uploadMedia } from '@/lib/minio'
import { randomUUID } from 'crypto'

export const runtime = 'nodejs'
export const maxDuration = 60

async function fileToPath(file: File, name: string) {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const pathFile = await uploadMedia(name, buffer)
  return pathFile
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  try {
    const form = await req.formData()

    const title = form.get('title') as string
    const recipientName = form.get('recipientName') as string
    const dedication = form.get('dedication') as string
    const lyrics = form.get('lyrics') as string
    const lyricsPreview = form.get('lyricsPreview') as string
    const price = form.get('price') as string

    const audioFile = form.get('audioFile') as File
    const audioPreview = form.get('audioPreview') as File
    const coverImage = form.get('coverImage') as File

    if (!audioFile || !audioPreview || !coverImage) {
      return NextResponse.json({ error: 'Missing files' }, { status: 400 })
    }

    const audioPath = await fileToPath(
      audioFile,
      `/songs/audio-${randomUUID()}.mp3`
    )
    const audioPreviewPath = await fileToPath(
      audioPreview,
      `/songs/preview-${randomUUID()}.mp3`
    )
    const coverImagePath = await fileToPath(
      coverImage,
      `/songs/preview-${randomUUID()}.mp3`
    )

    if (!audioPath || !audioPreviewPath || !coverImagePath) {
      throw new Error('Upload failed')
    }

    const slug = `${slugify(title)}-${randomHash(5)}`
    const priceAsNumber = Number(price)

    // 1. Create Product
    const product = await stripe.products.create({
      name: `Canción personalizada - ${title}`,
      description: `Canción para ${recipientName}`,
    })

    // // 2. Create Price
    const priceObj = await stripe.prices.create({
      product: product.id,
      currency: 'mxn',
      unit_amount: priceAsNumber * 100,
    })

    // 3. Create Song in DB (to get ID)
    const song = await db.song.create({
      data: {
        title,
        slug,
        recipientName,
        dedication,
        lyrics,
        lyricsPreview,
        price,
        audioURL: audioPath,
        audioPreviewURL: audioPreviewPath,
        coverImage: coverImagePath,
        stripeProductId: product.id,
        stripePriceId: priceObj.id,
      },
    })

    return NextResponse.json({ slug: song.slug })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
