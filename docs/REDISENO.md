# Rediseño Dream House

Implementado sobre Next.js 16.3.8 / React 19.2.8 / Tailwind 4 existentes, sin actualizar dependencias ni añadir servicios. Referencias: ZIP Dream_House_Referencias_Codex y corrección del usuario sobre cierre frente a Atrás.

## Vistas

- `/` y `/planos/`: catálogo con buscador, filtro secundario, compra directa y bloque personalizado tras los primeros tres proyectos. Conserva los nueve productos existentes como ejemplos.
- `?casa=slug` sobre el catálogo: ficha en diálogo nativo; pantalla completa en móvil y dos columnas en escritorio. Tres imágenes (fachada, sala, cocina) y recorrido opcional. Sin vistas previas de planos.
- `/{slug}/`: enlace individual exportado para entrada directa y refresco. Las rutas antiguas de medidas siguen funcionando.
- `/checkout/?proyecto=slug`: compra de una casa; email validado, aceptación de alcance y escenarios aprobado, pendiente y fallido. Sin datos bancarios ni carrito intermedio.
- `/checkout/confirmacion/?orden=DEMO-...`: resultado de simulación persistente en la sesión. Aprobado permite descargar una muestra que contiene solo README.txt; pendiente y fallido no habilitan descargas.
- `/recuperar/`: formulario y feedback solo después de enviar. `?estado=vencido`, `?estado=incorrecto` o cualquier `?token=...` muestran enlace no válido. Ningún token se acepta como autorización.
- Ayuda, contacto, adaptación y páginas informativas anteriores ajustadas al alcance demo. Los contactos no confirmados no abren números ficticios.

## Navegación

Al abrir una tarjeta se añade una entrada de historial con `casa`; el catálogo permanece montado. Cierre o Escape vuelven a la entrada anterior y restauran foco y posición. Atrás elimina la ficha y Adelante la vuelve a abrir. Tras refrescar una URL con `casa`, cerrar elimina ese parámetro sin asumir que existe una entrada previa del catálogo.

Al llegar directamente a `/{slug}/`, incluido TikTok, cerrar reemplaza la entrada actual por `/planos/`. El botón Atrás del navegador conserva su historial normal, incluso si lleva fuera del sitio. No se intercepta `popstate` para forzar un destino.

`dialog.showModal()` proporciona fondo inerte y foco confinado; el visor ampliado tiene su propio diálogo y Escape cierra solo ese visor. El iframe de YouTube se crea únicamente al pulsar Ver recorrido y se desmonta al cambiar de medio o cerrar.

## Selección guardada, landing y carrusel

- La ficha permite guardar o quitar una casa. Iniciar checkout también guarda esa selección. `src/lib/seleccion.ts` persiste únicamente un slug en `localStorage` (`dh_seleccion`), valida que exista y sincroniza otras pestañas del mismo navegador. No guarda precios, correo ni estados de pago. Guardar otra casa reemplaza la anterior.
- Al volver al catálogo aparece la casa guardada, con acceso a su ficha, compra directa y opción de quitarla. Si el almacenamiento está bloqueado, la ficha comunica el error sin afirmar que se guardó. No se sincroniza entre dispositivos o navegadores, incluido el navegador interno de TikTok.
- `/nosotros/` explica brevemente Dream House. El catálogo sigue siendo el inicio. Hay accesos desde navegación, catálogo y pie de página.
- `src/data/recomendados.ts` contiene la lista de futuros productos afiliados de Mercado Libre, actualmente vacía. Al incorporar productos confirmados, la landing muestra enlaces con `rel="sponsored noopener noreferrer"` y una aclaración de afiliación. No hay enlaces ni productos inventados.
- `GaleriaCasa.tsx` comparte el mismo índice entre ficha y visor ampliado: fachada, sala, cocina y recorrido. El ciclo automático avanza cada seis segundos y vuelve al inicio; hay flechas, miniaturas, contador, teclas izquierda/derecha y botón Pausar/Reanudar.
- El avance se suspende al colocar el puntero sobre la galería o esconder la pestaña; la interacción mediante teclado y las miniaturas lo pausan. Con `prefers-reduced-motion: reduce` se utiliza avance manual. Abrir un video detiene el ciclo hasta reanudarlo expresamente. Llegar automáticamente al video solo muestra su portada o estado pendiente: no carga YouTube ni lo reproduce.
- Las imágenes se encajan completas en el visor. Las barras usan crema y dorado; el desplazamiento vive dentro del marco del diálogo, preservando esquinas y borde exterior.

Verificación adicional: export de 34 páginas; ciclo completo automático y avance ampliado, pausa, Escape anidado, selección tras recarga, sincronización entre pestañas, quitar/cambiar casa, almacenamiento bloqueado, compra directa, landing, movimiento reducido y pantallas de 390, 768 y 1440 px (también móvil de 568 px de alto). Inspección de capturas, sin errores JavaScript ni recursos fallidos.

## Archivos y contenido configurable

| Archivo                                   | Responsabilidad                                                               |
| ----------------------------------------- | ----------------------------------------------------------------------------- |
| `src/app/globals.css`                     | Paleta aprobada, tipografía y composición adaptable                           |
| `src/components/catalogo/Catalogo.tsx`    | Listado, búsqueda, filtros y navegación de ficha                              |
| `src/components/proyecto/Ficha.tsx`       | Galería, alcance, entrega y compra                                            |
| `src/components/proyecto/ImagenVenta.tsx` | Activos con encaje completo e ilustraciones de respaldo                       |
| `src/data/proyectos.ts`                   | Productos, dimensiones, precios y rutas `renders[].src`                       |
| `src/data/venta.ts`                       | Tres medios, IDs YouTube opcionales, entregables sin pendientes y exclusiones |
| `src/config/sitio.ts`                     | Contacto y estado de confirmación del negocio                                 |
| `src/lib/demo.ts`                         | Pedidos locales no personales de demostración                                 |
| `src/components/checkout/`                | Formulario, resumen y resultados                                              |
| `src/components/Recuperar.tsx`            | Recuperación y enlace inválido                                                |
| `scripts/finalizar-export.mjs`            | Normalización de segmentos estáticos en Windows y `.nojekyll`                 |

Los renders y videos reales no fueron proporcionados. Se conservan las ilustraciones existentes, identificadas como provisionales. Para cada casa, configurar tres rutas en `renders` para fachada, sala y cocina; agregar el ID confirmado a `VIDEOS`. Los archivos comerciales vendidos nunca deben ir en `public/`. El único ZIP público es una muestra inocua.

## Export y comprobaciones

`npm run dev` inicia la aplicación local; en PowerShell con scripts restringidos se puede usar `npm.cmd run dev`. `npm run build` genera `out/` y ejecuta `postbuild`. `trailingSlash: true` genera `ruta/index.html`, compatible con refresco en hosting estático. Se conserva `NEXT_PUBLIC_BASE_PATH` y el workflow de GitHub Pages.

En Windows, Next 16.3.8 genera algunos segmentos RSC en directorios donde el navegador solicita nombres con puntos. El paso final añade las copias con nombres esperados, sin modificar Next ni borrar los originales; es inofensivo en Linux.

Validación realizada el 30 de octubre de 2026:

- `npm.cmd run lint`: correcto.
- `npm.cmd run build`: correcto, 33 páginas estáticas, incluido acceso por slug.
- Compilación adicional con `NEXT_PUBLIC_BASE_PATH=/dream-house` y URL de GitHub Pages: correcta; navegación probada sobre un servidor de archivos, sin backend Next.
- Chrome headless mediante Playwright instalado fuera del repositorio: flujo completo a 390×844, 768×1000 y 1440×1000; sin desbordamiento horizontal. Inspección visual de capturas. Ficha también a 390×568: compra visible y último bloque accesible sin quedar cubierto.
- Búsqueda vacía, limpiar filtros, cierre, Escape anidado, foco y scroll restaurados, Atrás/Adelante, entrada directa desde historial externo simulado de TikTok, refresco, correo inválido, escenarios de pago, recarga de pedido, recuperación, contacto preseleccionado y pedido inexistente: correctos.
- Descarga de muestra y fallo HTTP simulado: correctos. ZIP inspeccionado: solo README.txt. Correo ausente en estado persistido y URL. Sin errores JavaScript ni recursos fallidos en el recorrido final.

Límites: probado en Chrome de escritorio con tamaños móviles, no en dispositivos iOS/Android físicos. No se probó un video real porque no existen IDs confirmados. No se publicaron cambios ni se ejecutaron cobros, correos o recuperación reales.

### Comprobación del fallo de menú en iPhone

La captura `DreamHousefallo.jpeg` corresponde a la versión anterior que seguía publicada en `https://luiscasta.github.io/dream-house/`. Se reprodujo el fallo en WebKit con viewport móvil de 390×700: el `div` del menú con `position: fixed` quedaba limitado a los 64 px del encabezado, cuyo `backdrop-filter: blur(12px)` creaba el bloque contenedor. Los enlaces desbordaban ese espacio y se superponían al hero.

El menú local actual usa `dialog.showModal()`, que se muestra en la capa superior y evita esa dependencia del encabezado. Verificado en WebKit móvil: cuatro enlaces sin solapamiento, panel dentro de pantalla, cierre, navegación a Planos y apertura/cierre de ficha correctos. Esta prueba amplía la comprobación anterior de Chrome; no sustituye probar en un iPhone físico. El arreglo aún debe publicarse para llegar al enlace de GitHub Pages; no basta con recargar la versión antigua.

## Integración real pendiente

GitHub Pages sirve archivos estáticos. Para cobrar se requiere un servicio externo seguro o migración de hosting, decidida por separado:

1. Crear sesión de pago en servidor con precio autorizado por catálogo y clave secreta; el frontend solo remite identificador del producto.
2. Verificar webhooks firmados de forma idempotente y persistir pedidos y estado en una base de datos.
3. Autorizar entrega únicamente tras verificar pago en servidor; almacenar planos en privado y emitir enlaces firmados con caducidad.
4. Conectar email transaccional y recuperación mediante tokens temporales verificados. Una dirección escrita no concede acceso ni revela compras.
5. Confirmar fotografías, videos, dimensiones, entregables, precios, contactos y textos comerciales/legales antes de habilitar ventas.

`src/lib/pagos.ts` y `src/lib/entrega.ts` conservan contratos orientativos para esa integración; el flujo nuevo usa exclusivamente `src/lib/demo.ts`. `sessionStorage` es editable y no acredita compras. No contiene correo ni datos bancarios. Los eventos nuevos usan prefijo `demo_`, con lista explícita de proyecto/escenario; no representan ventas verificadas ni conectan analítica externa.
