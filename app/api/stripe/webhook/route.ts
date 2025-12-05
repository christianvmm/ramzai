import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { markSongAsPaid } from '@/features/songs/utils/mark-song-as-paid'

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
    console.error('❌ Error verificando firma del webhook:', err)
    return new NextResponse('Signature error', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const songId = session.metadata?.songId

    if (!songId) {
      console.error('⚠️ No se encontró songId en metadata')
      return NextResponse.json({ received: true })
    }

    console.log(session.payment_method_types)
    console.log(session.payment_status)
    console.log('METADATA', session.metadata)

    const isOxxo =
      session.payment_method_types?.includes('oxxo') ||
      session.payment_method_options?.oxxo !== undefined

    const isPaid = session.payment_status === 'paid'

    if (!isPaid) {
      console.log(
        '💳 Pago no confirmado aún, NO marcar como comprado. OXXO?',
        isOxxo
      )
      return NextResponse.json({ received: true })
    }

    const referral = session.metadata?.referral
    const customerEmail = session.customer_details?.email

    await markSongAsPaid(songId, referral, customerEmail)
    console.log('✅ Canción marcada como comprada, songId:', songId)
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent
    const songId = paymentIntent.metadata?.songId

    if (!songId) {
      console.error('⚠️ payment_intent.succeeded sin songId en metadata')
      return NextResponse.json({ received: true })
    }

    const referral = paymentIntent.metadata?.referral
    const customerEmail = paymentIntent.customer?.toString()

    await markSongAsPaid(songId, referral, customerEmail)
    console.log('✅ Canción marcada como comprada por PaymentIntent:', songId)
  }

  return NextResponse.json({ received: true })
}

// Desactivar body parser (Stripe requiere el raw body)
export const config = {
  api: {
    bodyParser: false,
  },
}
