/**
 * Pasos posteriores al build. Hoy solo uno: prerenderizar los metadatos de cada
 * ruta dentro de dist/olivergOG/.
 *
 * Este proyecto NO publica robots.txt. Google lo lee únicamente en la raíz del
 * host, que es compartida con el landing de Grolow Portfolios; si los dos
 * proyectos lo escribieran, el último despliegue pisaría al otro. La
 * responsabilidad es del landing, que declara los sitemaps de ambos sitios.
 * Ver docs/CONTRATO-HOST.md.
 */
import { prerender } from './prerender'

prerender()
