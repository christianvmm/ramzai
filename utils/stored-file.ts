const base = process.env.NEXT_PUBLIC_BASE_URL

export function storedFile(path: string | null | undefined) {
  if (!path) return null
  return `${base}/api/file?path=${path}`
}
