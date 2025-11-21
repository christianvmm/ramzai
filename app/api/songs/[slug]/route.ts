import { NextResponse } from 'next/server'
import { getSong } from '@/features/songs/api/get-song'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug

    if(!slug?.length) {
      return NextResponse.json({ error: 'Song not found' }, { status: 404 })
    }

    const song = await getSong(slug)

    if (!song) {
      return NextResponse.json({ error: 'Song not found' }, { status: 404 })
    }

    return NextResponse.json(song)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
