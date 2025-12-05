import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const songId = (await params).id

  // 1. Buscar la canción
  const song = await db.song.findUnique({
    where: { id: songId },
  })

  if (!song) {
    return NextResponse.json({ error: 'Song not found' }, { status: 404 })
  }

  // 2. Referral code (si lo estás usando)
  const cookieStore = await cookies()
  const referralId = cookieStore.get('_fprom_tid')?.value ?? '' // opcional
  console.log('MANDO', { referralId })
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: song.stripePriceId,
        quantity: 1,
      },
    ],

    allow_promotion_codes: true,
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${song.slug}?paid=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/${song.slug}?paid=false`,

    metadata: {
      songId: song.id.toString(),
      slug: song.slug,
      priceId: song.stripePriceId,
      referral: referralId,
    },

    payment_intent_data: {
      metadata: {
        songId: song.id.toString(),
        slug: song.slug,
        priceId: song.stripePriceId,
        referral: referralId,
      },
    },
  })

  // 4. Redirigir directamente a Stripe
  return NextResponse.redirect(session.url!, 303)
}
