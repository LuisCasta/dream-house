# Backlog — Dream House Planos

El frontend está completo a nivel de diseño. Todo lo de abajo quedó **solo firmado**
(interfaz + comentario `CONECTAR PROVEEDOR` / `BACKLOG`), sin implementación real.

## Backend / integraciones

| Tema | Dónde está la interfaz | Qué falta |
| --- | --- | --- |
| Pasarela de pago | `src/lib/pagos.ts` (`ProveedorPago`) | Ruta `POST /api/checkout`, sesión en Stripe / Mercado Pago / Conekta, webhook de pago confirmado. Hoy usa `proveedorDemo` (no cobra y lo avisa). |
| Entrega de archivos | `src/lib/entrega.ts` (`ProveedorEntrega`) | Almacenamiento privado (S3 / R2 / Supabase / Vercel Blob), enlaces firmados con caducidad, solo para órdenes pagadas. |
| Email transaccional | — | Enviar enlaces de descarga y recibo (Resend / Postmark). |
| Órdenes | `Orden` en `src/lib/pagos.ts` | Base de datos de órdenes. Hoy la orden demo vive en `sessionStorage`. |
| Analytics | `src/lib/analytics.ts` | Instalar Google Tag Manager y reenviar eventos a GA4, Meta Pixel y TikTok Pixel. Los eventos ya se emiten a `window.dataLayer` con atribución UTM. |
| Atribución por video | `capturarAtribucion()` | Guardar `primer_toque` / `ultimo_toque` en la orden desde el servidor (ya viajan en `Orden.atribucion`). |
| Solicitudes de adaptación | `src/components/FormularioAdaptar.tsx` | Hoy abre WhatsApp. Guardar en CRM / email. |
| CMS de proyectos | `src/data/proyectos.ts` | Mover el catálogo a un CMS (Sanity, Payload, Supabase) cuando crezca. El modelo `Proyecto` / `Paquete` / `Render` ya está pensado para ello. |
| Paquetes múltiples | `Proyecto.paquetes` | Selector de paquete en la página de proyecto cuando exista más de uno (Esencial / Completo / + Adaptación). |
| Hosting | `next.config.ts`, `.github/workflows/deploy.yml` | Hoy es exportación estática en GitHub Pages. Pagos, webhooks y descargas firmadas necesitan servidor: al conectarlos, quitar `output: "export"` y migrar a Vercel u otro hosting con Node. |
| Protección de planos | `src/components/ilustraciones/Plano.tsx` | Con planos reales: servir previews de baja resolución con marca de agua generada en servidor. |

## Contenido pendiente (marcado en amarillo en la web)

- Renders reales de cada proyecto (`renders[].src` en `src/data/proyectos.ts`).
- Precios definitivos (`DATOS_DE_EJEMPLO` en `src/data/proyectos.ts` quita el aviso global).
- Arquitecto responsable y cédula profesional (`ARQUITECTO` en `src/config/sitio.ts`).
- WhatsApp, correo, redes y datos fiscales (`src/config/sitio.ts`).
- Testimonios reales (`Testimonios` en `src/components/Secciones.tsx`). No inventar.
- Contenido exacto de cada entregable y si incluye DWG.
- Textos legales: términos, privacidad (LFPDPPP) y política de compra, revisados por abogado.
- Respuestas de FAQ marcadas como pendientes (facturación, reembolsos, licencia de uso).
