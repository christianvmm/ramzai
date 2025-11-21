'use client'

import { useEffect, useState } from 'react'
import { PreviewContent } from '@/features/songs/components/preview-content'
import { SongFullVersion } from '@/features/songs/components/full-version'
import { Song } from '@/features/songs/api/get-song'
import { ConfirmingPayment } from '@/features/songs/components/confirming-payment'

interface Props {
  initialSong: Song
  paid: boolean
}

export function SongPageClient({ initialSong, paid }: Props) {
  const [song, setSong] = useState<Song>(initialSong)
  const [loading, setLoading] = useState(paid && !song.purchasedAt)

  useEffect(() => {
    if (!loading) return

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/songs/${song.slug}`)
        const updatedSong: Song = await res.json()
        if (updatedSong.purchasedAt) {
          setSong({
            ...updatedSong,
            createdAt: new Date(updatedSong.createdAt),
            purchasedAt: new Date(updatedSong.purchasedAt),
          })
          setLoading(false)
        }
      } catch (err) {
        console.error(err)
      }
    }, 2000) // revisa cada 1.5s

    return () => clearInterval(interval)
  }, [loading, song.slug])

  if (song.purchasedAt) {
    return <SongFullVersion song={song} />
  }

  if (loading) {
    return <ConfirmingPayment song={song}/>
  }

  return <PreviewContent song={song} />
}
