/* eslint-disable @next/next/no-img-element */
import { Song } from '@/features/songs/api/get-song'
import { CheckCircleIcon } from 'lucide-react'

export function ConfirmingPayment({ song }: { song: Song }) {
  return (
    <div className='min-h-screen bg-black text-white overflow-hidden'>
      {/* Hero Section with Background Image */}
      <div className='relative min-h-screen flex items-center justify-center py-16'>
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
                className='w-full h-full object-cover rounded-lg shadow-2xl'
              />

              {/* Purchase Badge */}
              <div className='absolute -top-4 -right-4 bg-amber-400 rounded-full p-2 shadow-lg'>
                <CheckCircleIcon className='w-6 h-6 text-black' />
              </div>
            </div>
          </div>

          {/* Song Information */}
          <div className='flex-1 text-center lg:text-left'>
            {/* Purchase Status Badge */}

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
              <span>10:05</span>
            </div>

            {/* Description */}
            <p className='text-lg text-gray-300 mb-10 leading-relaxed max-w-xl'>
              {song.dedication}
            </p>

            {/* CTA Buttons - Primary is now Play Full Version */}
            <div className='flex flex-col lg:flex-row gap-4 items-center'>
              <div className='flex items-center gap-2 mb-4 animate-pulse'>
                <div className='w-2 h-2 bg-amber-400 rounded-full' />
                <span className='text-xs font-semibold tracking-widest text-amber-400 uppercase'>
                  Confirmando tu pago...
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
