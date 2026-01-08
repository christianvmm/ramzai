import { Button } from "@/components/ui/button"
import { BadgeCheckIcon, MessageCircle, CheckCircle2, Zap } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl mix-blend-multiply animate-pulse" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-orange-200/50 rounded-full blur-3xl mix-blend-multiply animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs font-medium text-gray-600">Disponibilidad limitada para hoy</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          Transforma tus emociones en{" "}
          <span className="bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            canciones únicas
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          Crea canciones personalizadas que cuentan tu historia. Artistas virtuales transforman tus recuerdos en
          melodías inolvidables para regalar o atesorar.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <Button
            asChild
            size="lg"
            className="h-14 px-8 rounded-full text-lg bg-gradient-to-r from-purple-600 to-orange-500 hover:opacity-90 transition-all shadow-xl shadow-purple-500/25 w-full sm:w-auto group"
          >
            <Link href="https://wa.me/5213352098093" target="_blank">
              <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Crear mi canción
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 animate-in fade-in duration-1000 delay-500">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-green-100 rounded-full">
              <Zap className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Entrega en 24h</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 bg-purple-100 rounded-full">
              <CheckCircle2 className="h-4 w-4 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">100% Personalizado</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-1 bg-orange-100 rounded-full">
              <BadgeCheckIcon className="h-4 w-4 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Garantía de satisfacción </span>
          </div>
        </div>
      </div>
    </section>
  )
}
