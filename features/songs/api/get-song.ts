import { db } from '@/lib/db'

export async function getSong(slug: string) {
  const song = await db.song.findUnique({ where: { slug } })

  if (!song) return null

  return {
    id: song.id,
    slug: song.slug,
    title: song.title,
    recipientName: song.recipientName,
    dedication: song.dedication,
    genre: song.genre,
    lyrics: song.purchasedAt ? song.lyrics : null,
    lyricsPreview: song.lyricsPreview,
    audioURL: song.purchasedAt ? song.audioURL : null,
    audioPreviewURL: song.audioPreviewURL,
    coverImage: song.coverImage,
    price: song.price.toNumber(),
    purchasedAt: song.purchasedAt,
    createdAt: song.createdAt,
    paymentLink: song.paymentLink
  }
}

export type Song = NonNullable<Awaited<ReturnType<typeof getSong>>>
