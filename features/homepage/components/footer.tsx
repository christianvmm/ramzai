import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className='bg-white border-t border-gray-100 py-12'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
          <div className='col-span-1 md:col-span-2'>
            <Link href='/' className='flex items-center gap-2 mb-4'>
              {/* Updated logo to the new official RamzAI logo */}
              <Image
                src='/logo-text.png'
                alt='RamzAl Logo'
                width={240}
                height={80}
                className='h-16 w-auto'
              />
            </Link>
            <p className='text-gray-500 text-sm max-w-xs'>
              Creamos canciones personalizadas que conectan corazones y guardan
              recuerdos para siempre.
            </p>
          </div>

          <div>
            <h4 className='font-semibold text-gray-900 mb-4'>Producto</h4>
            <ul className='space-y-2 text-sm text-gray-600'>
              <li>
                <Link href='#como-funciona' className='hover:text-purple-600'>
                  ¿Cómo funciona?
                </Link>
              </li>
              {/* Removed broken link to examples */}
              <li>
                <Link href='#precios' className='hover:text-purple-600'>
                  Precios
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-semibold text-gray-900 mb-4'>Legal</h4>
            <ul className='space-y-2 text-sm text-gray-600'>
              <li>
                <Link href='#' className='hover:text-purple-600'>
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href='#' className='hover:text-purple-600'>
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4'>
          <p className='text-sm text-gray-500'>
            © 2025 RamzAl. Todos los derechos reservados.
          </p>
          <div className='flex gap-4'>{/* Social icons could go here */}</div>
        </div>
      </div>
    </footer>
  )
}
