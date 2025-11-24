import { db } from '@/lib/db'
import { storedFile } from '@/utils/stored-file'

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

    audioURL: song.purchasedAt ? storedFile(song.audioURL) : null,
    audioPreviewURL: storedFile(song.audioPreviewURL) ?? '',
    coverImage: storedFile(song.coverImage) ?? '',

    price: song.price.toNumber(),
    purchasedAt: song.purchasedAt,
    createdAt: song.createdAt,
    checkoutURL: song.checkoutURL
  }
}

export type Song = NonNullable<Awaited<ReturnType<typeof getSong>>>
