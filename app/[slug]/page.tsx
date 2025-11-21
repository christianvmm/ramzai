import { notFound } from 'next/navigation'
import { getSong } from '@/features/songs/api/get-song'
import { SongPageClient } from '@/features/songs/components/song-page'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const slug = (await params).slug

  if (!slug) return {}

  const song = await getSong(slug)

  if (!song) return {}
  return {
    title: `Ramzai - ${song.title}`,
  }
}

export default async function SongPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ paid?: string }>
}) {
  const slug = (await params).slug

  if (!slug) notFound()

  const song = await getSong(slug)

  if (!song) notFound()

  const paid = (await searchParams).paid === 'true'

  return <SongPageClient initialSong={song} paid={paid} />
}
