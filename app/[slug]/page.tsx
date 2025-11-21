import { notFound } from 'next/navigation'
import { PreviewContent } from '@/features/songs/components/preview-content'
import { getSong } from '@/features/songs/api/get-song'

export default async function SongPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const p = await params
  const slug = p.slug
  const song = await getSong(slug)

  if (!song) {
    notFound()
  }

  return <PreviewContent song={song} />
}
