/* eslint-disable @next/next/no-img-element */
'use client'
import { Song } from '@/features/songs/api/get-song'
import {
  CheckCircleIcon,
  DownloadIcon,
  PauseIcon,
  PlayIcon,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

export function SongFullVersion({ song }: { song: Song }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)
  const progressPercent =
    totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateDuration = () => {
      if (!isNaN(audio.duration) && audio.duration > 0) {
        setTotalDuration(audio.duration)
      }
    }

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
    }

    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('durationchange', updateDuration)
    audio.addEventListener('timeupdate', updateTime)

    // En caso de que metadata ya esté cargada antes del effect
    if (audio.readyState >= 1) {
      updateDuration()
    }

    return () => {
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('durationchange', updateDuration)
      audio.removeEventListener('timeupdate', updateTime)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [isPlaying])

  const togglePlay = () => setIsPlaying((prev) => !prev)

  async function downloadAudio() {
    try {
      const response = await fetch(song.audioURL!)
      const blob = await response.blob()

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${song.title}.mp3` // o el formato que uses
      a.click()

      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading audio', error)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={song.audioURL!} preload='metadata' />
      <div className='min-h-screen bg-black text-white overflow-hidden flex flex-col'>
        {/* Hero Section with Background Image */}
        <div className='relative flex-1 flex items-center justify-center py-16'>
          {/* Background Image with Overlay */}
          <div
            className='absolute inset-0 bg-cover bg-center'
            style={{
              backgroundImage: `url('${song.coverImage}')`,
              filter: 'blur(40px) brightness(0.3)',
            }}
            aria-hidden='true'
          />

          {/* Dark Gradient Overlay */}
          <div className='absolute inset-0 bg-linear-to-t from-black via-black/80 to-black/40' />

          <main className='relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16'>
            {/* Album Cover with Purchase Badge */}
            <div className='w-full lg:w-auto flex justify-center shrink-0'>
              <div className='relative group w-64 h-64 md:w-72 md:h-72 shrink-0'>
                <img
                  src={song.coverImage || '/placeholder.svg'}
                  alt={`${song.title} album cover`}
                  className='w-full h-full object-cover rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-105'
                />

                {/* Play Button Overlay */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className='absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm'
                  aria-label='Reproducir versión completa'
                >
                  <div className='w-20 h-20 rounded-full bg-amber-400 flex items-center justify-center hover:bg-amber-300 transition-colors shadow-lg'>
                    {isPlaying ? (
                      <PauseIcon className='w-8 h-8 text-black fill-black' />
                    ) : (
                      <PlayIcon className='w-8 h-8 text-black fill-black ml-1' />
                    )}
                  </div>
                </button>

                {/* Now Playing Indicator */}
                {isPlaying && (
                  <div className='absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1 items-center'>
                    <div className='animate-pulse w-1 h-3 bg-amber-400 rounded-full' />
                    <div
                      className='animate-pulse w-1 h-4 bg-amber-400 rounded-full'
                      style={{ animationDelay: '100ms' }}
                    />
                    <div
                      className='animate-pulse w-1 h-3 bg-amber-400 rounded-full'
                      style={{ animationDelay: '200ms' }}
                    />
                  </div>
                )}

                {/* Purchase Badge */}
                <div className='absolute -top-4 -right-4 bg-amber-400 rounded-full p-2 shadow-lg'>
                  <CheckCircleIcon className='w-6 h-6 text-black' />
                </div>
              </div>
            </div>

            {/* Song Information */}
            <div className='flex-1 text-center lg:text-left'>
              {/* Purchase Status Badge */}
              <div className='flex items-center gap-2 mb-4 justify-center lg:justify-start'>
                <div className='w-2 h-2 bg-amber-400 rounded-full' />
                <span className='text-xs font-semibold tracking-widest text-amber-400 uppercase'>
                  Compra Desbloqueada — {song.purchasedAt?.toDateString()}
                </span>
              </div>

              {/* Genre Tag */}
              <span className='inline-block text-xs font-semibold tracking-widest text-amber-400 mb-4 uppercase'>
                {song.genre}
              </span>

              {/* Title */}
              <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-balance text-white'>
                {song.title}
              </h1>

              {/* Artist */}
              <p className='text-xl md:text-2xl text-gray-300 mb-6 font-light tracking-wide'>
                {song.recipientName}
              </p>

              {/* Release Info */}
              <div className='flex flex-col lg:flex-row items-center lg:items-start gap-3 text-sm text-gray-400 mb-8'>
                <span>Lanzado el {song.createdAt.toDateString()}</span>
                <span className='hidden lg:inline'>•</span>
                <span>{formatTime(totalDuration)}</span>
              </div>

              {/* Description */}
              <p className='text-lg text-gray-300 mb-10 leading-relaxed max-w-xl'>
                {song.dedication}
              </p>

              {/* CTA Buttons - Primary is now Play Full Version */}
              <div className='flex flex-col sm:flex-row gap-4 mb-10'>
                {/* Primary Button - Play Now */}
                <button
                  onClick={togglePlay}
                  className='flex-1 bg-amber-400 hover:bg-amber-300 text-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl'
                >
                  {isPlaying ? (
                    <>
                      <PauseIcon className='w-5 h-5 fill-current' />
                      <span>Pausar</span>
                    </>
                  ) : (
                    <>
                      <PlayIcon className='w-5 h-5 fill-current' />
                      <span>Reproducir</span>
                    </>
                  )}
                </button>

                {/* Secondary Button */}
                <button
                  className='flex-1 bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer'
                  onClick={downloadAudio}
                >
                  <DownloadIcon className='w-5 h-5' />
                  <span>Descargar</span>
                </button>
              </div>

              {/* Progress Bar */}
              <div className='mb-8'>
                <div className='w-full bg-gray-800 rounded-full h-1 overflow-hidden'>
                  <div
                    className='bg-amber-400 h-full transition-all duration-300'
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className='flex justify-between text-xs text-gray-400 mt-2'>
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(totalDuration)}</span>
                </div>
              </div>

              {/* Secondary Actions */}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

// <div className='flex flex-wrap gap-3 justify-center lg:justify-start'>
//   <button
//     onClick={() => setIsFavorited(!isFavorited)}
//     className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
//       isFavorited
//         ? 'bg-amber-400/10 border-amber-400 text-amber-400'
//         : 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'
//     }`}
//   >
//     <HeartIcon
//       className='w-4 h-4'
//       fill={isFavorited ? 'currentColor' : 'none'}
//     />
//     <span className='text-sm font-medium'>Save</span>
//   </button>

//   <button className='flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-all duration-200'>
//     <Share2Icon className='w-4 h-4' />
//     <span className='text-sm font-medium'>Share</span>
//   </button>

//   <button className='flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-all duration-200'>
//     <MusicIcon className='w-4 h-4' />
//     <span className='text-sm font-medium'>Add to Playlist</span>
//   </button>
// </div>
