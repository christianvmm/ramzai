import Link from "next/link"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Pricing() {
  return (
    <section id="precios" className="py-20 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Precio transparente</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Inversión simple</h2>
          <p className="text-lg text-gray-600">
            Una canción única, creada especialmente para ti o tu ser querido. Sin cargos ocultos.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2 bg-gradient-to-r from-purple-600 to-orange-500" />

            <div className="text-center mb-8">
              <h3 className="text-lg font-medium text-gray-600 mb-2">Canción Completa Personalizada</h3>
              <div className="flex items-center justify-center gap-1 mb-4">
                <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                  $1,499
                </span>
                <span className="text-gray-500 self-end mb-2">MXN</span>
              </div>
              <p className="text-sm text-gray-500">Pago único. Entrega en 24h.</p>
            </div>

            <div className="space-y-4 mb-8">
              {[
                "Letra 100% original basada en tu historia",
                "Melodía y producción profesional",
                "Voz de artista real (Hombre o Mujer)",
                "Formato MP3 de alta calidad",
                "Garantía de satisfacción",
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="p-1 bg-green-100 rounded-full mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-600 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Button
              asChild
              className="w-full h-12 rounded-xl text-lg bg-gray-900 hover:bg-gray-800 text-white shadow-lg"
            >
              <Link href="https://wa.me/5213352098093" target="_blank">
                Comenzar ahora
              </Link>
            </Button>

            <p className="text-center text-xs text-gray-400 mt-4">*Si no te gusta el adelanto, no pagas nada.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
