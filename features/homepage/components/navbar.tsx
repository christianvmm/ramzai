import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-text.png" alt="RamzAl Logo" width={240} height={80} className="h-10 w-auto" />
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="#como-funciona" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            ¿Cómo funciona?
          </Link>
          <Link href="#testimonios" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Testimonios
          </Link>
          <Link href="#video-testimonios" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Videos
          </Link>
          <Link href="#precios" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Precios
          </Link>
        </div>
        <Button
          asChild
          className="rounded-full bg-linear-to-r from-purple-600 to-orange-500 hover:opacity-90 transition-opacity text-white shadow-lg shadow-purple-500/20"
        >
          <Link href="https://wa.me/5213352098093" target="_blank">
            Crear canción
          </Link>
        </Button>
      </div>
    </nav>
  )
}
