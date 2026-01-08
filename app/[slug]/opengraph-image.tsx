import { getSong } from '@/features/songs/api/get-song'
import { ImageResponse } from 'next/og'

// Image metadata
export const alt = 'Ramzai'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

function DefaultImage() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '5px',
        justifyContent: 'center',
        backgroundColor: '#141414',
        position: 'relative',
      }}
    >
      <AppLogo />
    </div>
  )
}

export default async function ImageGeneration({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const p = await params
  const defaultResponse = new ImageResponse(<DefaultImage />, { ...size })

  if (!p.slug) return defaultResponse

  const song = await getSong(p.slug)

  if (!song) return defaultResponse

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '5px',
          paddingTop: '5%',
          justifyContent: 'flex-start',
          backgroundColor: '#000000',
          position: 'relative',
        }}
      >
        <AppLogo />

        <h1
          style={{
            color: '#ffffff',
            textTransform: 'uppercase',
            fontWeight: 800,
            paddingTop: '14px',
            fontSize: '1.3rem',
            marginBottom: '0px'
          }}
        >
          {song.title}
        </h1>

        <h1
          style={{
            color: '#ffffff',
            textTransform: 'uppercase',
            fontWeight: 800,
            fontSize: '0.75rem',
          }}
        >
          para {song.recipientName}
        </h1>

        <img
          alt={song.title}
          src={song.coverImage}
          style={{
            width: '50%',
            marginTop: 10,
            borderRadius: '12px',
          }}
        />
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}

function AppLogo() {
  return (
    <img
      src={process.env.NEXT_PUBLIC_BASE_URL + '/logo-ramzai.png'}
      alt='Logo'
      style={{
        width: 256,
      }}
    />
  )
}
