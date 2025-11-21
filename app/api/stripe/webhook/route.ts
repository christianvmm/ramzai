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

    // ✅ Usar metadata que pusiste al crear la sesión
    const songId = session.metadata?.songId

    if (!songId) {
      console.error('⚠️ No se encontró songId en metadata')
      return NextResponse.json({ received: true })
    }

    // 4. Marcar como comprada
    await db.song.update({
      where: { id: songId },
      data: { purchasedAt: new Date() },
    })

    console.log('✅ Canción marcada como comprada, songId:', songId)
  }

  return NextResponse.json({ received: true })
}

// Desactivar body parser (Stripe requiere el raw body)
export const config = {
  api: {
    bodyParser: false,
  },
}
