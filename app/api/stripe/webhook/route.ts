import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error(err)
    return new NextResponse('Invalid signature', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    const paymentLinkId = session.payment_link

    const song = await db.song.findFirst({
      where: { stripePaymentLinkId: paymentLinkId },
    })

    if (song) {
      await db.song.update({
        where: { id: song.id },
        data: { purchasedAt: new Date() },
      })
    }
  }

  return NextResponse.json({ received: true })
}

export const config = {
  api: { bodyParser: false },
}
