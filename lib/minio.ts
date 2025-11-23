import * as Minio from 'minio'

const URL_MINIO = process.env.URL_MINIO!
const PORT_MINIO = process.env.PORT_MINIO!
const ACCESS_KEY_MINIO = process.env.ACCESS_KEY_MINIO!
const SECRET_KEY_MINIO = process.env.SECRET_KEY_MINIO!
const SSL_MINIO = process.env.SSL_MINIO
const BUCKET_NAME = process.env.BUCKET_NAME!

const minioClient = new Minio.Client({
  endPoint: URL_MINIO,
  port: Number(PORT_MINIO),
  useSSL: Boolean(SSL_MINIO),
  accessKey: ACCESS_KEY_MINIO,
  secretKey: SECRET_KEY_MINIO,
  region: 'us-east-1',
})

export const downloadMedia = async (path: string) => {
  try {
    const stream = await minioClient.getObject(BUCKET_NAME, path)
    const chunks: Buffer[] = []
    for await (const chunk of stream) {
      chunks.push(chunk as Buffer)
    }

    const buffer = Buffer.concat(chunks)

    return buffer
  } catch {
    return null
  }
}

export const uploadMedia = async (
  path: string,
  media: Buffer
): Promise<string | null> => {
  try {
    const fileUploaded = await minioClient.putObject(BUCKET_NAME, path, media)

    if (fileUploaded) return path
  } catch {
    return null
  }

  return null
}
