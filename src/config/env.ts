/**
 * Acceso a las variables de entorno que funciona igual en el navegador (Vite)
 * y en Node (scripts de build: gen-sitemap, prerender), donde `import.meta.env`
 * no existe.
 */
interface Env {
  VITE_SITE_URL?: string
  VITE_GA4_ID?: string
  VITE_META_PIXEL_ID?: string
  VITE_CALENDLY_URL?: string
  VITE_FORM_ENDPOINT?: string
  VITE_WHATSAPP?: string
  BASE_URL?: string
  DEV?: boolean
}

const viteEnv: Env = (import.meta.env as Env | undefined) ?? {}
const nodeEnv: Env = ((globalThis as { process?: { env?: Env } }).process?.env ?? {}) as Env

export const ENV: Env = { ...nodeEnv, ...viteEnv }
export const IS_DEV = viteEnv.DEV === true
