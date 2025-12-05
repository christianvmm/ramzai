import { db } from '@/lib/db'

export async function markSongAsPaid(
  id: string,
  referral?: string | null,
  customerEmail?: string | null
) {
  await db.song.update({
    where: { id },
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
