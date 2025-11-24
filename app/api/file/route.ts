import { NextResponse, type NextRequest } from 'next/server'
import { notFound } from 'next/navigation'
import { downloadMedia } from '@/lib/minio'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  /**
   * Validate path format
   */
  const searchParams = request.nextUrl.searchParams
  const path = searchParams.get('path')
  if (!path) notFound()

  const allowedPattern = /^[a-zA-Z0-9/_\-\.]+$/
  if (
    !allowedPattern.test(path) ||
    path.includes('..') ||
    path.includes('//')
  ) {
    notFound()
  }

  /**
   * Download File
   */
  const file = await downloadMedia(path)
  if (!file) notFound()

  const extension = path.split('.').reverse()[0]
  if (!extension) notFound()

  const response = new NextResponse(file)

  return response
}
