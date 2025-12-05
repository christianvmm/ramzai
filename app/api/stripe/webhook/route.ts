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
      console.log('💳 Pago no confirmado aún, NO marcar como comprado. OXXO?', isOxxo)
      return NextResponse.json({ received: true })
    }

    console.log('✅ Canción marcada como comprada, songId:', songId)
    const referral = session.metadata?.referral
    const customerEmail = session.customer_details?.email

    await db.song.update({
      where: { id: songId },
      data: { purchasedAt: new Date() },
    })

    if (referral && customerEmail) {
      try {
        const res = await fetch(
          'https://v2.firstpromoter.com/api/v2/track/signup',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.FP_API_KEY}`,
              'Account-ID': process.env.FP_ACCOUNT_ID!,
            },
            body: JSON.stringify({
              email: customerEmail,
              tid: referral,
            }),
          }
        )

        if (res.ok) {
          const json = await res.json()
          console.log('📨 FirstPromoter response:', json)
        } else {
          console.log('Response not OK', res)
        }
      } catch (error) {
        console.error('❌ Error mandando a FirstPromoter:', error)
      }
    }
  }

  return NextResponse.json({ received: true })
}

// Desactivar body parser (Stripe requiere el raw body)
export const config = {
  api: {
    bodyParser: false,
  },
}
