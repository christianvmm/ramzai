import { Star } from "lucide-react"

const testimonials = [
  {
    name: "María García",
    text: "Le regalé una canción a mi esposo por nuestro aniversario y lloró de emoción. ¡Increíble trabajo, captaron cada detalle de nuestra historia!",
  },
  {
    name: "Carlos Rodríguez",
    text: "La calidad de la producción es de otro nivel. Ramzai captó exactamente el estilo que quería. Fue el mejor regalo de cumpleaños.",
  },
  {
    name: "Sofía López",
    text: "No sabía qué regalarle a mi novio y esto fue la mejor decisión. 100% recomendado para cualquiera que busque algo único.",
  },
  {
    name: "Alejandro Martínez",
    text: "Súper rápido y profesional. La letra quedó perfecta y la melodía es muy pegajosa. A mi mamá le encantó su canción.",
  },
  {
    name: "Valentina Torres",
    text: "Me encantó la voz y la melodía. Fue un momento mágico cuando la escuchamos juntos. Definitivamente volveré a pedir otra.",
  },
  {
    name: "Diego Sánchez",
    text: "Excelente servicio. La canción superó mis expectativas y la atención al cliente fue maravillosa. ¡Gracias por todo!",
  },
  {
    name: "Camila Pérez",
    text: "Un detalle único y original. Gracias por ayudarme a expresar mis sentimientos de una forma tan hermosa. ¡Son los mejores!",
  },
  {
    name: "Javier Hernández",
    text: "La atención fue excelente y el resultado final, una obra de arte. Mi prometida no para de escuchar su canción.",
  },
  {
    name: "Lucía Fernández",
    text: "Nunca imaginé que una canción personalizada pudiera sonar tan profesional. ¡Gracias por hacer nuestro día tan especial!",
  },
  {
    name: "Andrés Benítez",
    text: "El mejor regalo que he hecho. Ver la cara de felicidad de mi familia no tuvo precio. Vale cada centavo.",
  },
]

export function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-gray-50/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-linear-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-600 text-lg">Historias reales convertidas en canciones inolvidables.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col h-full"
            >
              <div className="flex gap-1 mb-4 text-orange-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 grow leading-relaxed">&quot;{testimonial.text}&quot;</p>
              <div className="mt-auto">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-purple-600">Cliente verificado</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
