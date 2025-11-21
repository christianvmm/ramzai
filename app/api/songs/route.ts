import { db } from "@/lib/db"
import { randomHash } from "@/utils/random-hash"
import { slugify } from "@/utils/slugify"
import { NextResponse } from "next/server"
import { UTApi } from "uploadthing/server"

const utapi = new UTApi()

export async function POST(req: Request) {
  try {
    const form = await req.formData()

    const title = form.get("title") as string
    const recipientName = form.get("recipientName") as string
    const dedication = form.get("dedication") as string
    const lyrics = form.get("lyrics") as string
    const lyricsPreview = form.get('lyricsPreview') as string
    const price = form.get("price") as string

    const audioFile = form.get("audioFile") as File
    const audioPreview = form.get("audioPreview") as File
    const coverImage = form.get("coverImage") as File

    if (!audioFile || !audioPreview || !coverImage) {
      return NextResponse.json({ error: "Missing files" }, { status: 400 })
    }

    // UploadThing (accepts single file)
    const [audioRes, previewRes, imageRes] = await Promise.all([
      utapi.uploadFiles(audioFile),
      utapi.uploadFiles(audioPreview),
      utapi.uploadFiles(coverImage),
    ])

    if(!audioRes.data || !previewRes.data || !imageRes.data) {
      throw new Error()
    }

    const slug = `${slugify(title)}-${randomHash(5)}`

    const song = await db.song.create({
      data: {
        title,
        slug,
        recipientName,
        dedication,
        lyrics,
        lyricsPreview,
        price,
        audioURL: audioRes.data.ufsUrl,
        audioPreviewURL: previewRes.data.ufsUrl,
        coverImage: imageRes.data.ufsUrl,
      },
    })

    return NextResponse.json(song)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
