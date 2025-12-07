import { Footer } from '@/features/homepage/components/footer'
import { Hero } from '@/features/homepage/components/hero'
import { HowItWorks } from '@/features/homepage/components/how-it-works'
import { MusicalBackground } from '@/features/homepage/components/musical-background'
import { Navbar } from '@/features/homepage/components/navbar'
import { Pricing } from '@/features/homepage/components/pricing'
import { Testimonials } from '@/features/homepage/components/testimonials'
import { VideoTestimonials } from '@/features/homepage/components/video-testimonials'

export default function Home() {
  return (
    <main className='min-h-screen bg-white selection:bg-purple-100 selection:text-purple-900 relative'>
      <MusicalBackground />
      <Navbar />
      <Hero />
      <HowItWorks />
      <Testimonials />
      <VideoTestimonials />
      <Pricing />
      <Footer />
    </main>
  )
}
