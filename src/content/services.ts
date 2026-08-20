import type { Service, SectionIntro } from '@/types'

export const servicesIntro: SectionIntro = {
  eyebrow: 'SERVICIOS',
  lines: [
    { text: 'CÓMO PODEMOS', tone: 'light' },
    { text: 'TRABAJAR JUNTOS', tone: 'brand' },
  ],
  subtitle:
    'Desde un diagnóstico puntual hasta un acompañamiento continuo. Elige el punto de entrada que necesita tu negocio hoy.',
}

/**
 * Fuente única de las tarjetas de #servicios y de las landings /servicios/:slug.
 * Añadir un servicio = añadir un objeto a este array.
 */
export const services: Service[] = [
  {
    slug: 'diagnostico-empresarial',
    name: 'Diagnóstico Empresarial',
    tagline: 'Saber exactamente dónde estás parado antes de mover ficha.',
    audience: 'Dueños que sienten que algo no cuadra pero no logran ponerle nombre.',
    format: 'TODO_CLIENTE: duración y formato (ej. 2 sesiones · 1 semana)',
    featured: false,
    hero: {
      promise: 'Un retrato claro de tu negocio en una semana',
      intro:
        'Revisamos números, procesos y equipo para identificar qué te está frenando realmente.',
    },
    problems: [
      'No sabes cuál de tus productos o servicios deja utilidad real.',
      'Sospechas que hay fugas de dinero, pero no logras ubicarlas.',
      'Cada área te da una versión distinta de cómo va el negocio.',
    ],
    deliverables: [
      'Revisión de estructura de ingresos y costos',
      'Mapa de procesos críticos y cuellos de botella',
      'Informe de hallazgos priorizados por impacto',
      'Sesión de devolución con recomendaciones concretas',
    ],
    steps: [
      { title: 'Levantamiento', description: 'Recolectamos números, procesos y contexto del negocio.' },
      { title: 'Análisis', description: 'Cruzamos la información y ubicamos los puntos de fuga.' },
      { title: 'Devolución', description: 'Te entrego los hallazgos ordenados por impacto y urgencia.' },
    ],
    investment: {
      headline: 'TODO_CLIENTE: inversión (ej. "Desde RD$ X")',
      includes: [
        'Informe escrito de hallazgos',
        'Sesión de devolución de 90 minutos',
        'Plan de primeros pasos',
      ],
    },
    faq: [
      { question: '¿Necesito tener contabilidad al día?', answer: 'TODO_CLIENTE' },
      { question: '¿Cuánto tiempo me va a tomar a mí?', answer: 'TODO_CLIENTE' },
      { question: '¿Qué pasa si el diagnóstico revela algo grave?', answer: 'TODO_CLIENTE' },
      { question: '¿Puedo contratar solo el diagnóstico?', answer: 'TODO_CLIENTE' },
    ],
  },
  {
    slug: 'consultoria-estrategica',
    name: 'Consultoría Estratégica',
    tagline: 'Un plan por fases para llevar tu negocio al siguiente nivel.',
    audience: 'Empresas con operación andando que necesitan dirección y foco.',
    format: 'TODO_CLIENTE: duración y formato (ej. proyecto de 3 meses por fases)',
    featured: true,
    badge: 'Más solicitado',
    hero: {
      promise: 'De la operación diaria a una estrategia con rumbo',
      intro:
        'Construimos juntos el plan que ordena prioridades, responsables y fechas — y lo ejecutamos.',
    },
    problems: [
      'Tienes ideas de crecimiento, pero ninguna termina de aterrizar.',
      'El equipo trabaja duro sin una dirección común.',
      'Creciste en ventas y el desorden creció contigo.',
    ],
    deliverables: [
      'Diagnóstico estratégico inicial',
      'Definición de objetivos y prioridades por fase',
      'Plan de acción con responsables y fechas',
      'Tablero de indicadores para medir avance',
      'Sesiones de seguimiento durante la ejecución',
    ],
    steps: [
      { title: 'Diagnóstico', description: 'Entendemos el negocio a fondo antes de proponer nada.' },
      { title: 'Estrategia', description: 'Definimos hacia dónde vamos y qué dejamos de hacer.' },
      { title: 'Plan de acción', description: 'Bajamos la estrategia a tareas con dueño y fecha.' },
      { title: 'Ejecución', description: 'Acompaño al equipo hasta que los números se muevan.' },
    ],
    investment: {
      headline: 'TODO_CLIENTE: inversión (ej. "Desde RD$ X por fase")',
      includes: [
        'Todas las sesiones de trabajo del proyecto',
        'Documentación del plan estratégico',
        'Tablero de seguimiento',
        'Disponibilidad para consultas durante el proyecto',
      ],
    },
    faq: [
      { question: '¿Trabajas con mi equipo o solo conmigo?', answer: 'TODO_CLIENTE' },
      { question: '¿Qué pasa si a mitad de camino cambian las prioridades?', answer: 'TODO_CLIENTE' },
      { question: '¿Cómo mides los resultados?', answer: 'TODO_CLIENTE' },
      { question: '¿Se puede pagar por fases?', answer: 'TODO_CLIENTE' },
    ],
  },
  {
    slug: 'mentoria-empresarial',
    name: 'Mentoría Empresarial',
    tagline: 'Un sparring de negocios a tu lado, mes a mes.',
    audience: 'Dueños que ya tienen el plan y necesitan con quién pensarlo en voz alta.',
    format: 'TODO_CLIENTE: duración y formato (ej. 2 sesiones al mes · mínimo 6 meses)',
    featured: false,
    hero: {
      promise: 'Nunca más decidas solo lo importante',
      intro:
        'Sesiones periódicas para revisar números, destrabar decisiones y sostener el rumbo.',
    },
    problems: [
      'Tomas todas las decisiones grandes en soledad.',
      'Arrancas iniciativas con energía y las abandonas a las tres semanas.',
      'Nadie en tu entorno te cuestiona con criterio de negocio.',
    ],
    deliverables: [
      'Sesiones recurrentes de trabajo uno a uno',
      'Revisión periódica de indicadores clave',
      'Acuerdos de acción con seguimiento entre sesiones',
      'Canal directo para decisiones urgentes',
    ],
    steps: [
      { title: 'Punto de partida', description: 'Definimos objetivos y qué vamos a medir.' },
      { title: 'Ritmo de sesiones', description: 'Encuentros fijos para revisar avance y destrabar.' },
      { title: 'Seguimiento', description: 'Cada sesión cierra con acuerdos concretos.' },
      { title: 'Revisión trimestral', description: 'Evaluamos resultados y ajustamos el rumbo.' },
    ],
    investment: {
      headline: 'TODO_CLIENTE: inversión (ej. "RD$ X al mes")',
      includes: [
        'Sesiones mensuales de mentoría',
        'Revisión de indicadores',
        'Canal directo entre sesiones',
      ],
    },
    faq: [
      { question: '¿Cuál es el compromiso mínimo?', answer: 'TODO_CLIENTE' },
      { question: '¿Las sesiones son presenciales o virtuales?', answer: 'TODO_CLIENTE' },
      { question: '¿En qué se diferencia de la consultoría?', answer: 'TODO_CLIENTE' },
      { question: '¿Puedo pausar la mentoría?', answer: 'TODO_CLIENTE' },
    ],
  },
]

export function getService(slug: string | undefined): Service | undefined {
  return services.find((service) => service.slug === slug)
}
