import Stripe from 'stripe'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// ⛔ Requerido por Stripe para leer el raw body
export const runtime = 'nodejs'

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  // 1. Obtener raw body (texto)
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    // 2. Verificar que Stripe haya firmado la petición
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('❌ Error verificando firma del webhook:', err)
    return new NextResponse('Signature error', { status: 400 })
  }

  // 3. Evento importante: pago completado
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // IMPORTANTE: aquí llega el ID del Payment Link usado
    const paymentLinkId = session.payment_link?.toString()

    if (!paymentLinkId) {
      console.error('⚠️ No llegó payment_link en la sesión')
      return NextResponse.json({ received: true })
    }

    // 4. Buscar la canción asociada
    const song = await db.song.findFirst({
      where: { stripePaymentLinkId: paymentLinkId },
    })

    if (!song) {
      console.error(
        '⚠️ No se encontró canción para payment_link:',
        paymentLinkId
      )
      return NextResponse.json({ received: true })
    }

    // 5. Marcar como comprada
    await db.song.update({
      where: { id: song.id },
      data: {
        purchasedAt: new Date(),
      },
    })

    console.log('🎉 Canción marcada como comprada:', song.title)
  }

  return NextResponse.json({ received: true })
}

// ⛔ Necesario para desactivar el body parser
export const config = {
  api: {
    bodyParser: false,
  },
}
