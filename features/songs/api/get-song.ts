import { db } from '@/lib/db'

export async function getSong(slug: string) {
  const song = await db.song.findUnique({ where: { slug } })

  if(!song) return null


  return {
    ...song,
    price: song.price.toNumber()
  }
}

export type Song = NonNullable<Awaited<ReturnType<typeof getSong>>>
