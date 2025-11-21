'use client'

import { useState, type FormEvent, type ChangeEvent } from 'react'
import { Upload, Music } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface FormData {
  title: string
  recipientName: string
  dedication: string
  lyrics: string
  lyricsPreview: string
  audioFile: File | null
  audioPreview: File | null
  coverImage: File | null
  price: string
}

export default function SongRegistrationForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    title: '',
    recipientName: '',
    dedication: '',
    lyrics: '',
    lyricsPreview: '',
    audioFile: null,
    audioPreview: null,
    coverImage: null,
    price: '1499',
  })

  const [uploadedFiles, setUploadedFiles] = useState({
    audioFile: false,
    audioPreview: false,
    coverImage: false,
  })

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }))
      setUploadedFiles((prev) => ({
        ...prev,
        [name]: true,
      }))
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setLoading(true)

    e.preventDefault()

    const fd = new FormData()
    fd.append('title', formData.title)
    fd.append('recipientName', formData.recipientName)
    fd.append('dedication', formData.dedication)
    fd.append('lyrics', formData.lyrics)
    fd.append('lyricsPreview', formData.lyricsPreview)
    fd.append('price', formData.price)

    if (formData.audioFile) fd.append('audioFile', formData.audioFile)
    if (formData.audioPreview) fd.append('audioPreview', formData.audioPreview)
    if (formData.coverImage) fd.append('coverImage', formData.coverImage)

    const res = await fetch('/api/songs', {
      method: 'POST',
      body: fd,
    })

    setLoading(false)

    if (!res.ok) {
      alert('Error al registrar la canción')
      return
    }

    const data = await res.json()
    router.push(`/${data.slug}`)
  }

  return (
    <div className='min-h-screen bg-black text-white py-12 px-4'>
      {/* Header Section */}
      <div className='max-w-3xl mx-auto mb-12'>
        <div className='flex items-center gap-3 mb-4'>
          <Music className='w-8 h-8 text-amber-400' />
          <h1 className='text-4xl md:text-5xl font-bold tracking-tight'>
            Registra Tu <span className='text-amber-400'>Canción</span>
          </h1>
        </div>
        <p className='text-gray-400 text-lg'>
          Sube tu música original y compártela con el mundo. Completa los
          detalles para comenzar.
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className='max-w-3xl mx-auto'>
        <div className='bg-gray-950 border border-gray-800 rounded-xl p-8 space-y-8'>
          {/* Title and Recipient Section */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Title */}
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='title'
                className='text-sm font-semibold text-gray-300 uppercase tracking-wider'
              >
                Título de la Canción
              </label>
              <input
                type='text'
                id='title'
                name='title'
                value={formData.title}
                onChange={handleInputChange}
                placeholder='Escribe el título de la canción'
                className='w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all duration-200'
                required
              />
            </div>

            {/* Recipient Name */}
            <div className='flex flex-col gap-2'>
              <label
                htmlFor='recipientName'
                className='text-sm font-semibold text-gray-300 uppercase tracking-wider'
              >
                Nombre del Destinatario
              </label>
              <input
                type='text'
                id='recipientName'
                name='recipientName'
                value={formData.recipientName}
                onChange={handleInputChange}
                placeholder='¿Para quién es esta canción?'
                className='w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all duration-200'
                required
              />
            </div>
          </div>

          {/* Dedication */}
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='dedication'
              className='text-sm font-semibold text-gray-300 uppercase tracking-wider'
            >
              Mensaje de Dedicación
            </label>
            <textarea
              id='dedication'
              name='dedication'
              value={formData.dedication}
              onChange={handleInputChange}
              placeholder='Comparte la historia detrás de esta canción...'
              rows={4}
              className='w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all duration-200 resize-none'
              required
            />
          </div>

          {/* Lyrics */}
          <div className='flex flex-col gap-2'>
            <label
              htmlFor='lyrics'
              className='text-sm font-semibold text-gray-300 uppercase tracking-wider'
            >
              Letra de la Canción
            </label>
            <textarea
              id='lyrics'
              name='lyrics'
              value={formData.lyrics}
              onChange={handleInputChange}
              placeholder='Pega aquí la letra completa...'
              rows={6}
              className='w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all duration-200 resize-none'
              required
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label
              htmlFor='lyricsPreview'
              className='text-sm font-semibold text-gray-300 uppercase tracking-wider'
            >
              Letra (Preview)
            </label>
            <textarea
              id='lyricsPreview'
              name='lyricsPreview'
              value={formData.lyricsPreview}
              onChange={handleInputChange}
              placeholder='Pega aquí la letra preview...'
              rows={6}
              className='w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all duration-200 resize-none'
              required
            />
          </div>

          {/* Audio Files Section */}
          <div className='border-t border-gray-800 pt-8'>
            <h3 className='text-lg font-semibold text-amber-400 mb-6 uppercase tracking-wider'>
              Archivos de Audio
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Full Audio File */}
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='audioFile'
                  className='text-sm font-semibold text-gray-300 uppercase tracking-wider'
                >
                  Canción Completa (MP3)
                </label>
                <div className='relative'>
                  <input
                    type='file'
                    id='audioFile'
                    name='audioFile'
                    onChange={handleFileChange}
                    accept='audio/mp3'
                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    required
                  />
                  <div
                    className={`w-full border-2 border-dashed rounded-lg px-4 py-6 text-center transition-all duration-200 cursor-pointer ${
                      uploadedFiles.audioFile
                        ? 'border-amber-400 bg-amber-400/5'
                        : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                    }`}
                  >
                    <Upload className='w-5 h-5 mx-auto mb-2 text-amber-400' />
                    <p className='text-sm font-medium text-white'>
                      {uploadedFiles.audioFile
                        ? formData.audioFile?.name || 'Archivo subido'
                        : 'Haz clic para adjuntar MP3'}
                    </p>
                    <p className='text-xs text-gray-500 mt-1'>Máx 50MB</p>
                  </div>
                </div>
              </div>

              {/* Audio Preview File */}
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='audioPreview'
                  className='text-sm font-semibold text-gray-300 uppercase tracking-wider'
                >
                  Vista Previa (MP3)
                </label>
                <div className='relative'>
                  <input
                    type='file'
                    id='audioPreview'
                    name='audioPreview'
                    onChange={handleFileChange}
                    accept='audio/mp3'
                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    required
                  />
                  <div
                    className={`w-full border-2 border-dashed rounded-lg px-4 py-6 text-center transition-all duration-200 cursor-pointer ${
                      uploadedFiles.audioPreview
                        ? 'border-amber-400 bg-amber-400/5'
                        : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                    }`}
                  >
                    <Upload className='w-5 h-5 mx-auto mb-2 text-amber-400' />
                    <p className='text-sm font-medium text-white'>
                      {uploadedFiles.audioPreview
                        ? formData.audioPreview?.name || 'Archivo subido'
                        : 'Haz clic para adjuntar MP3'}
                    </p>
                    <p className='text-xs text-gray-500 mt-1'>
                      Recomendado: 30–60 segundos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cover Image and Price Section */}
          <div className='border-t border-gray-800 pt-8'>
            <h3 className='text-lg font-semibold text-amber-400 mb-6 uppercase tracking-wider'>
              Portada & Precio
            </h3>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Cover Image */}
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='coverImage'
                  className='text-sm font-semibold text-gray-300 uppercase tracking-wider'
                >
                  Portada
                </label>
                <div className='relative'>
                  <input
                    type='file'
                    id='coverImage'
                    name='coverImage'
                    onChange={handleFileChange}
                    accept='image/png,image/jpeg,image/jpg'
                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    required
                  />
                  <div
                    className={`w-full border-2 border-dashed rounded-lg px-4 py-6 text-center transition-all duration-200 cursor-pointer ${
                      uploadedFiles.coverImage
                        ? 'border-amber-400 bg-amber-400/5'
                        : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                    }`}
                  >
                    <Upload className='w-5 h-5 mx-auto mb-2 text-amber-400' />
                    <p className='text-sm font-medium text-white'>
                      {uploadedFiles.coverImage
                        ? formData.coverImage?.name || 'Imagen subida'
                        : 'Haz clic para adjuntar imagen'}
                    </p>
                    <p className='text-xs text-gray-500 mt-1'>PNG o JPG</p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='price'
                  className='text-sm font-semibold text-gray-300 uppercase tracking-wider'
                >
                  Precio (MXN)
                </label>
                <div className='relative'>
                  <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold'>
                    $
                  </span>
                  <input
                    type='number'
                    id='price'
                    name='price'
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder='1.99'
                    step='0.01'
                    min='0.99'
                    className='w-full bg-gray-900 border border-gray-800 rounded-lg pl-7 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all duration-200'
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className='border-t border-gray-800 pt-8 flex gap-4'>
            <button
              type='reset'
              className='flex-1 bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 active:scale-95 disabled:opacity-50'
              disabled={loading}
            >
              Limpiar Formulario
            </button>

            <button
              type='submit'
              className='flex-1 bg-amber-400 hover:bg-amber-300 text-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 active:scale-95 shadow-xl hover:shadow-2xl disabled:opacity-50'
              disabled={loading}
            >
              {loading ? 'Subiendo...' : 'Registrar Canción'}
            </button>
          </div>
        </div>
      </form>

      {/* Footer */}
      {/* <footer className='border-t border-gray-800 mt-16 pt-6 px-4'>
        <div className='max-w-3xl mx-auto text-center text-xs text-gray-500'>
          <p>
            © 2025 Soundscape. Al registrar tu canción, aceptas nuestros
            términos y condiciones.
          </p>
        </div>
      </footer> */}
    </div>
  )
}
