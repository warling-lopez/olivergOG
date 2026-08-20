import { IS_DEV } from './env'
import { services } from '@/content/services'

export interface SeoMeta {
  /** ≤ 60 caracteres */
  title: string
  /** 150–160 caracteres */
  description: string
  /** Ruta sin basename: '/', '/agenda', '/servicios/mentoria-empresarial' */
  path: string
  /** Nombre del archivo dentro de /og/ */
  image?: string
  noindex?: boolean
  type?: 'website' | 'profile' | 'article'
}

export const seoByPath: Record<string, SeoMeta> = {
  '/': {
    title: 'Oliver G. | Consultoría de Negocios en Santiago, RD',
    description:
      'Consultoría y estrategia empresarial en Santiago, RD. Agenda 30 minutos sin costo y descubre cómo hacer crecer tu negocio con visión, estrategia e impacto.',
    path: '/',
    image: 'og-default.jpg',
    type: 'profile',
  },
  '/agenda': {
    title: 'Agenda tu cita con Oliver G. | 30 min sin costo',
    description:
      'Reserva una conversación de 30 minutos, sin costo y sin compromiso. Analizamos juntos tu negocio y definimos el siguiente paso concreto para que crezca.',
    path: '/agenda',
    image: 'og-agenda.jpg',
  },
  '/servicios/diagnostico-empresarial': {
    title: 'Diagnóstico Empresarial | Oliver G.',
    description:
      'Radiografía completa de tu negocio: números, procesos y equipo. Recibe un informe con las prioridades claras y un plan de acción que puedes ejecutar ya.',
    path: '/servicios/diagnostico-empresarial',
    image: 'og-servicio-diagnostico-empresarial.jpg',
  },
  '/servicios/consultoria-estrategica': {
    title: 'Consultoría Estratégica para Empresas | Oliver G.',
    description:
      'Diseñamos la estrategia de crecimiento de tu empresa por fases, con métricas, responsables y fechas claras. Consultoría en Santiago, República Dominicana.',
    path: '/servicios/consultoria-estrategica',
    image: 'og-servicio-consultoria-estrategica.jpg',
  },
  '/servicios/mentoria-empresarial': {
    title: 'Mentoría Empresarial | Acompañamiento | Oliver G.',
    description:
      'Acompañamiento continuo para dueños de negocio: decide con criterio, enfócate en lo que mueve la aguja y sostén la ejecución mes a mes junto a Oliver.',
    path: '/servicios/mentoria-empresarial',
    image: 'og-servicio-mentoria-empresarial.jpg',
  },
  '/privacidad': {
    title: 'Política de Privacidad | Oliver G.',
    description:
      'Qué datos personales recogemos al usar este sitio y al contactarnos, con qué finalidad los tratamos, con quién se comparten y cómo ejercer tus derechos.',
    path: '/privacidad',
  },
  '/terminos': {
    title: 'Términos y Condiciones | Oliver G.',
    description:
      'Condiciones de uso del sitio y de los servicios de consultoría de Oliver G.: alcance, confidencialidad, propiedad intelectual y ley aplicable en RD.',
    path: '/terminos',
  },
  '/gracias': {
    title: 'Ya casi | Oliver G.',
    description:
      'Tu mensaje quedó listo en WhatsApp. Dale enviar y coordinamos la hora en el mismo chat, con los puntos de tu negocio que más te urge conversar.',
    path: '/gracias',
    noindex: true,
  },
}

/** Rutas indexables — alimenta el sitemap y el prerender. */
export const INDEXABLE_PATHS = Object.values(seoByPath)
  .filter((meta) => !meta.noindex)
  .map((meta) => meta.path)

/** Sanidad en desarrollo: cada servicio debe tener su entrada de metadatos. */
if (IS_DEV) {
  for (const service of services) {
    if (!seoByPath[`/servicios/${service.slug}`]) {
      console.warn(`[seo] falta metadata para /servicios/${service.slug}`)
    }
  }
}

/* Re-exportados desde config/site: ese es el único lugar donde vive el origen. */
export { absUrl as absoluteUrl, absAsset as absoluteAsset } from './site'

export function getSeo(path: string): SeoMeta {
  return (
    seoByPath[path] ?? {
      title: 'Página no encontrada | Oliver G.',
      description: 'La página que buscas no existe. Vuelve al inicio o agenda una conversación.',
      path,
      noindex: true,
    }
  )
}
