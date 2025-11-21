/* eslint-disable @next/next/no-img-element */
'use client'

import { Song } from '@/features/songs/api/get-song'
import { PlayIcon } from 'lucide-react'
import { useState } from 'react'

export function PreviewContent({ song }: { song: Song }) {
  // const [isFavorited, setIsFavorited] = useState(false)
  const [isPlayingPreview, setIsPlayingPreview] = useState(false)

  // Sample song data - easily customizable

  return (
    <div className='min-h-screen bg-black text-white overflow-hidden'>
      {/* Hero Section with Background Image */}
      <div className='relative min-h-screen flex items-center justify-center'>
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
          {/* Album Cover */}
          <div className='w-full lg:w-auto flex justify-center shrink-0'>
            <div className='relative group w-64 h-64 md:w-72 md:h-72 shrink-0'>
              <img
                src={song.coverImage || '/placeholder.svg'}
                alt={`${song.title} album cover`}
                className='w-full h-full object-cover rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-105'
              />

              {/* Play Button Overlay */}
              <button
                onClick={() => setIsPlayingPreview(!isPlayingPreview)}
                className='absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm'
                aria-label='Play preview'
              >
                <div className='w-20 h-20 rounded-full bg-amber-400 flex items-center justify-center hover:bg-amber-300 transition-colors shadow-lg'>
                  <PlayIcon className='w-8 h-8 text-black fill-black ml-1' />
                </div>
              </button>

              {/* Now Playing Indicator */}
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

          {/* Song Information */}
          <div className='flex-1 text-center lg:text-left'>
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
              <span>Released {song.createdAt.toLocaleDateString()}</span>
              <span className='hidden lg:inline'>•</span>
              <span>05:03</span>
            </div>

            {/* Description */}
            <p className='text-lg text-gray-300 mb-8 leading-relaxed max-w-xl'>
              {song.dedication}
            </p>

            {/* Emotional Hook */}
            <div className='bg-linear-to-r from-amber-400/10 to-amber-400/5 border border-amber-400/30 rounded-xl p-6 mb-10 backdrop-blur-sm'>
              <p className='text-lg text-amber-100 font-medium italic text-balance'>
                {song.lyricsPreview}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-4'>
              {/* Primary Button */}
              <button
                onClick={() => setIsPlayingPreview(!isPlayingPreview)}
                className='flex-1 bg-amber-400 hover:bg-amber-300 text-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl'
              >
                <PlayIcon className='w-5 h-5 fill-current' />
                <span>Listen Preview</span>
              </button>

              {/* Secondary Button */}
              <a className='flex-1 bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl text-center'
                href='https://buy.stripe.com/7sY00i5ahgC35bp0k343S00'
              >
                Buy Now — {song.price}
              </a>
            </div>

            {/* Secondary Actions */}
            {/* <div className='flex gap-3 justify-center lg:justify-start mt-6'>
              <button
                onClick={() => setIsFavorited(!isFavorited)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                  isFavorited
                    ? 'bg-amber-400/10 border-amber-400 text-amber-400'
                    : 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-600'
                }`}
              >
                <HeartIcon
                  className='w-4 h-4'
                  fill={isFavorited ? 'currentColor' : 'none'}
                />
                <span className='text-sm font-medium'>Add to Favorites</span>
              </button>

              <button className='flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-all duration-200'>
                <Share2Icon className='w-4 h-4' />
                <span className='text-sm font-medium'>Share</span>
              </button>
            </div> */}
          </div>
        </main>
      </div>

      {/* Footer */}
      {/* <footer className="border-t border-gray-800 py-6 px-6">
        <div className="max-w-5xl mx-auto text-center text-xs text-gray-500">
          <p>© 2025 Soundscape. All rights reserved. By purchasing, you agree to our terms.</p>
        </div>
      </footer> */}
    </div>
  )
}
