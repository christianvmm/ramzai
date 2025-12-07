import {
  MessageCircle,
  FileQuestion,
  Clock,
  Music,
  CreditCard,
} from 'lucide-react'

const steps = [
  {
    number: 1,
    title: 'Envías un mensaje',
    description:
      'Inicia una conversación con nosotros por WhatsApp para contarnos tu idea.',
    icon: MessageCircle,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    number: 2,
    title: 'Respondes 10 preguntas',
    description:
      'Compartes detalles sobre la persona, historia o emociones para tu canción.',
    icon: FileQuestion,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    number: 3,
    title: 'Esperas máx. 24 horas',
    description:
      'Nuestros artistas profesionales trabajan en tu canción personalizada.',
    icon: Clock,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    number: 4,
    title: 'Recibes un adelanto',
    description:
      'Te enviamos un link con los primeros segundos de tu canción para que la escuches.',
    icon: Music,
    color: 'bg-pink-100 text-pink-600',
  },
  {
    number: 5,
    title: 'Pagas y recibes todo',
    description:
      'Si te encanta el adelanto, realizas el pago y recibes la versión completa.',
    icon: CreditCard,
    color: 'bg-green-100 text-green-600',
  },
]

export function HowItWorks() {
  return (
    <section
      id='como-funciona'
      className='py-20 bg-gray-50/80 backdrop-blur-sm'
    >
      <div className='container mx-auto px-4 md:px-6'>
        <div className='text-center max-w-3xl mx-auto mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            ¿Cómo funciona?
          </h2>
          <p className='text-lg text-gray-600'>
            En solo 5 simples pasos, tendrás tu canción personalizada lista para
            compartir y emocionar.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {steps.map((step) => (
            <div
              key={step.number}
              className='bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group'
            >
              <div className='absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-gray-50 to-gray-100 rounded-bl-full -mr-10 -mt-10 z-0 group-hover:scale-110 transition-transform duration-500' />

              <div className='relative z-10'>
                <div
                  className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mb-6 shadow-sm`}
                >
                  <step.icon className='w-6 h-6' />
                </div>

                <div className='flex items-baseline gap-2 mb-3'>
                  <span className='text-5xl font-bold text-gray-100 font-mono select-none absolute right-4 top-4'>
                    0{step.number}
                  </span>
                  <h3 className='text-xl font-bold text-gray-900 relative z-10'>
                    {step.title}
                  </h3>
                </div>

                <p className='text-gray-600 leading-relaxed relative z-10'>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
