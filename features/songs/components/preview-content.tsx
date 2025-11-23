/* eslint-disable @next/next/no-img-element */
'use client'

import { siteConfig } from '@/config'
import { Song } from '@/features/songs/api/get-song'
import { CheckIcon, PlayIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export function PreviewContent({ song }: { song: Song }) {
  const [isPlayingPreview, setIsPlayingPreview] = useState(false)
  const [copied, setCopied] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio(song.audioPreviewURL)
    audioRef.current.preload = 'auto'

    audioRef.current.onended = () => {
      setIsPlayingPreview(false)
    }

    return () => {
      audioRef.current?.pause()
      audioRef.current = null
    }
  }, [song.audioPreviewURL])

  function handlePlay() {
    const audio = audioRef.current
    if (!audio) return

    if (isPlayingPreview) {
      audio.pause()
      setIsPlayingPreview(false)
    } else {
      audio.currentTime = 0
      audio.play()
      setIsPlayingPreview(true)
    }
  }

  return (
    <div className='min-h-screen bg-black text-white overflow-hidden'>
      <div className='relative min-h-screen flex items-center justify-center py-16'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{
            backgroundImage: `url('${song.coverImage}')`,
            filter: 'blur(40px) brightness(0.3)',
          }}
          aria-hidden='true'
        />

        <div className='absolute inset-0 bg-linear-to-t from-black via-black/80 to-black/40' />

        <main className='relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16'>
          <img
            src='/logo.png'
            className='w-32 h-auto mx-auto lg:hidden'
            alt={siteConfig.name}
          />

          <div className='w-full lg:w-auto flex justify-center shrink-0'>
            <div className='relative group w-64 h-64 md:w-72 md:h-72 shrink-0'>
              <img
                src={song.coverImage || '/placeholder.svg'}
                alt={`Portada del álbum ${song.title}`}
                className='w-full h-full object-cover rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-105'
              />

              <button
                onClick={() => setIsPlayingPreview(!isPlayingPreview)}
                className='absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm'
                aria-label='Reproducir vista previa'
              >
                <div className='w-20 h-20 rounded-full bg-amber-400 flex items-center justify-center hover:bg-amber-300 transition-colors shadow-lg'>
                  <PlayIcon className='w-8 h-8 text-black fill-black ml-1' />
                </div>
              </button>

              {isPlayingPreview && (
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
            </div>
          </div>

          <div className='flex-1 text-center lg:text-left'>
            <img
              src='/logo.png'
              className='w-32 h-auto mb-10 hidden lg:block'
              alt={siteConfig.name}
            />

            <span className='inline-block text-xs font-semibold tracking-widest text-amber-400 mb-4 uppercase'>
              {song.genre}
            </span>

            <h1 className='text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-balance text-white'>
              {song.title}
            </h1>

            <p className='text-xl md:text-2xl text-gray-300 mb-6 font-light tracking-wide'>
              {song.recipientName}
            </p>

            <div className='flex flex-col lg:flex-row items-center lg:items-start gap-3 text-sm text-gray-400 mb-8'>
              <span>Publicado el {song.createdAt.toLocaleDateString()}</span>
              <span className='hidden lg:inline'>•</span>
              <span>05:03</span>
            </div>

            <p className='text-lg text-gray-300 mb-8 leading-relaxed max-w-xl'>
              {song.dedication}
            </p>

            <div className='bg-linear-to-r from-amber-400/10 to-amber-400/5 border border-amber-400/30 rounded-xl p-6 mb-10 backdrop-blur-sm'>
              <p className='text-lg text-amber-100 font-medium italic text-balance whitespace-pre-line'>
                {song.lyricsPreview}
              </p>
            </div>

            <div>
              {/* SECCIÓN DE AVISO + GARANTÍA + CONTADOR */}
              <div className='mt-6 w-full bg-yellow-500/10 border border-yellow-500 rounded-xl p-5 text-yellow-300 space-y-4 mb-4'>
                {/* Título + mensaje + contador */}
                <div>
                  <p className='font-bold text-lg'>
                    TU CANCIÓN ESTARÁ DISPONIBLE PARA LA COMPRA SOLO 24 HORAS.
                  </p>
                  <p className='font-semibold'>
                    POSTERIORMENTE SE ELIMINARÁ DEFINITIVAMENTE DE NUESTROS
                    SERVIDORES —{' '}
                    <span className='font-black'>
                      <Countdown createdAt={song.createdAt} />
                    </span>
                  </p>
                </div>

                {/* Garantía */}
                <div className='flex items-start gap-3 text-yellow-200 leading-snug'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-5 h-5 shrink-0 mt-1'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>

                  <p>
                    <span className='font-bold'>GARANTÍA DE SATISFACCIÓN:</span>{' '}
                    AL COMPRARLA, SI NO ESTÁS SATISFECH@ AL 100% PODRÁS OBTENER
                    UNA NUEVA PROPUESTA TOTALMENTE GRATIS.
                  </p>
                </div>

                {/* Código descuento + copiar */}
                <div className='flex items-center justify-between bg-yellow-500/20 border border-yellow-500/40 rounded-lg px-4 py-2'>
                  <p className='text-sm'>
                    10% de descuento con el código:{' '}
                    <span className='font-bold text-yellow-300'>NAVIDAD25</span>
                  </p>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('NAVIDAD25')
                      setCopied(true)
                    }}
                    className='px-3 py-1 bg-yellow-600 hover:bg-yellow-500 text-black font-bold text-xs rounded-md transition flex'
                  >
                    Copiar
                    {copied && <CheckIcon className='size-4'/>}
                  </button>
                </div>
              </div>

              <div className='flex flex-col sm:flex-row gap-4'>
                <button
                  onClick={handlePlay}
                  className='flex-1 bg-amber-400 hover:bg-amber-300 text-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl cursor-pointer'
                >
                  <PlayIcon className='w-5 h-5 fill-current' />
                  <span>Escuchar vista previa</span>
                </button>

                {song.checkoutURL && (
                  <a
                    className='flex-1 bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl text-center'
                    href={song.checkoutURL}
                  >
                    Comprar — ${song.price} MXN
                  </a>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function Countdown({ createdAt }: { createdAt: Date }) {
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    const target = new Date(new Date(createdAt).getTime() + 12 * 60 * 60 * 1000) // 12 horas después
    const interval = setInterval(() => {
      const now = new Date()
      const diff = target.getTime() - now.getTime()
      setTimeLeft(diff > 0 ? diff : 0)
    }, 1000)

    return () => clearInterval(interval)
  }, [createdAt])

  if (timeLeft <= 0) return null

  const hours = Math.floor(timeLeft / (1000 * 60 * 60))
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000)

  return (
    <span className=''>
      válido por: {hours}h {minutes}m {seconds}s
    </span>
  )
}
