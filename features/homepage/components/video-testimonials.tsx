'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'

const videoTestimonials = [
  {
    id: 1,
    videoUrl: '/testimonial-1.mp4',
    name: 'Juan Pérez',
    title: 'Empresario',
    duration: '2:15',
  },
  {
    id: 2,
    videoUrl: '/testimonial-2.mp4',
    name: 'María López',
    title: 'Artista',
    duration: '1:45',
  },
  {
    id: 3,
    videoUrl: '/testimonial-3.mp4',
    name: 'Carlos Martínez',
    title: 'Productor',
    duration: '3:05',
  },
  {
    id: 4,
    videoUrl: '/testimonial-4.mp4',
    name: 'Sofía García',
    title: 'Emprendedora',
    duration: '2:30',
  },
  {
    id: 5,
    videoUrl: '/testimonial-5.mp4',
    name: 'Luis Rodríguez',
    title: 'Músico',
    duration: '2:00',
  },
]

export function VideoTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null)

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? videoTestimonials.length - 3 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= videoTestimonials.length - 3 ? 0 : prev + 1
    )
  }

  const getVisibleVideos = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % videoTestimonials.length
      visible.push(videoTestimonials[index])
    }
    return visible
  }

  const visibleVideos = getVisibleVideos()

  return (
    <section
      id='video-testimonios'
      className='py-24 bg-linear-to-b from-white via-purple-50/20 to-white overflow-hidden relative'
    >
      <div className='absolute inset-0 opacity-30 pointer-events-none'>
        <div className='absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20'></div>
        <div className='absolute bottom-0 left-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20'></div>
      </div>

      <div className='container mx-auto px-4 md:px-6 relative z-10'>
        <div className='text-center max-w-3xl mx-auto mb-20'>
          <h2 className='text-4xl md:text-5xl font-bold tracking-tight mb-4'>
            <span className='bg-linear-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent'>
              Lo que dicen nuestros clientes
            </span>
          </h2>
          <p className='text-gray-600 text-lg font-light'>
            Historias reales convertidas en canciones inolvidables.
          </p>
        </div>

        <div className='relative flex items-center justify-center gap-6 md:gap-8'>
          <button
            onClick={handlePrev}
            className='absolute left-0 z-20 p-3 rounded-full bg-linear-to-r from-purple-600 to-orange-500 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300'
            aria-label='Previous testimonial'
          >
            <ChevronLeft className='w-6 h-6' />
          </button>

          <div className='flex justify-center items-stretch gap-4 md:gap-6 px-20 md:px-24 w-full overflow-hidden'>
            {visibleVideos.map((video) => (
              <div
                key={video.id}
                className='shrink-0 w-full max-w-sm'
                onMouseEnter={() => setHoveredCard(video.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className='relative group h-full cursor-pointer'>
                  <div className='relative overflow-hidden rounded-2xl bg-gray-900 aspect-9/16 shadow-2xl transform transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/30'>
                    {playingVideoId === video.id ? (
                      <video
                        autoPlay
                        controls
                        className='w-full h-full object-cover'
                        src={video.videoUrl}
                      />
                    ) : (
                      <>
                        <video
                          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                          src={video.videoUrl}
                          muted
                          playsInline
                        />

                        <div
                          className={`absolute inset-0 transition-all duration-300 ${
                            hoveredCard === video.id
                              ? 'bg-linear-to-t from-black/80 via-transparent to-black/20'
                              : 'bg-linear-to-t from-black/60 via-transparent to-transparent'
                          }`}
                        ></div>

                        {hoveredCard === video.id && (
                          <div
                            className='absolute inset-0 flex items-center justify-center animate-fadeIn'
                            onClick={() => setPlayingVideoId(video.id)}
                          >
                            <div className='bg-white/20 backdrop-blur-md p-5 rounded-full hover:bg-white/30 transition-all'>
                              <Play className='w-8 h-8 text-white fill-white' />
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {playingVideoId !== video.id && (
                      <div className='absolute bottom-0 left-0 right-0 p-5 bg-linear-to-t from-black/90 via-black/50 to-transparent'>
                        <div className='flex items-center justify-between'>
                          <div className='flex gap-1.5'>
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className='w-1.5 h-1.5 rounded-full bg-orange-400'
                              ></div>
                            ))}
                          </div>
                          <span className='text-gray-300 text-xs'>
                            {video.duration}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className='absolute right-0 z-20 p-3 rounded-full bg-linear-to-r from-purple-600 to-orange-500 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110'
            aria-label='Next testimonial'
          >
            <ChevronRight className='w-6 h-6' />
          </button>
        </div>

        <div className='flex justify-center items-center gap-3 mt-12'>
          {videoTestimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() =>
                setCurrentIndex(idx >= videoTestimonials.length - 3 ? 0 : idx)
              }
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? 'h-3 w-8 bg-linear-to-r from-purple-600 to-orange-500'
                  : idx === currentIndex + 1 || idx === currentIndex + 2
                  ? 'h-2.5 w-2.5 bg-purple-300'
                  : 'h-2 w-2 bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  )
}
