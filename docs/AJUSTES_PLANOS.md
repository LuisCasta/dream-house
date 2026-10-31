# Banner y bloque complementario del catálogo

Se conserva el catálogo existente y su flujo de compra de una casa. El componente compartido se usa en inicio, Planos y rutas antiguas de medidas.

- `BannerColaboracion.tsx` usa ahora el fondo limpio recibido después y los dos logos separados (ver `LOGOS.md`). El título y los enlaces son HTML. El JPEG anterior se conserva como referencia, sin usarse como fondo para evitar duplicar marcas.
- El único título del catálogo está dentro del encabezado; búsqueda y filtro quedan debajo. Se retiró el bloque personalizado que interrumpía las tarjetas tras la tercera casa.
- `InformacionCatalogo.tsx` concentra al final del listado la fila de atención, la tarjeta de adaptación y cuatro acordeones cerrados inicialmente. Los botones exponen `aria-expanded`, relacionan la respuesta y admiten teclado y foco visible.
- `src/config/compra.ts` centraliza el modo y las capacidades. Sigue en demostración, con pagos, entrega y soporte sin integrar. `src/data/informacionCatalogo.ts` deriva los textos de ese estado; no muestra promesas de producción mientras no se habiliten las capacidades verificadas.
- `ContactoProyecto` admite un mensaje específico para adaptar un proyecto. Si el contacto no está confirmado, dirige al formulario existente, que prepara una consulta sin enviarla. La adaptación se cotiza por separado.
- El footer global conserva el logo real, enlaces útiles y copyright. Solo muestra canales y perfiles marcados como confirmados. No muestra datos fiscales ni contactos ficticios. No se añadieron testimonios ni responsables profesionales de ejemplo.
- Se enfoca explícitamente el enlace que abre la ficha: Safari no lo enfoca necesariamente al tocarlo. Así se conserva el origen para la restitución de foco al cerrar.

## Validación

Lint y build correctos. Export de 34 páginas con `NEXT_PUBLIC_BASE_PATH=/dream-house` y URL de GitHub Pages. Verificación mediante servidor de archivos estáticos en Chrome y WebKit, a 390, 768 y 1440 px: imagen completa con proporción original, orden de secciones, ausencia de scroll horizontal, acordeones con teclado, búsqueda, compra directa, cierre/foco y acceso por slug. Revisión de capturas del banner, bloque complementario y footer. Los enlaces de ayuda, contacto, recuperación y documentos legales conservan sus rutas exportadas.

## Datos pendientes

- Contactos y perfiles sociales reales: todavía no están confirmados; no se publican los valores ilustrativos.
- Nombre y datos profesionales del equipo: el elemento se omite mientras no estén confirmados.
- Condiciones, privacidad y política de compra definitivas: las rutas existentes siguen siendo informativas y de demostración, sin presentarse como documentos aprobados.
- Pagos, email transaccional y entrega protegida: no se añadieron integraciones. Cambiar una bandera no implementa estos servicios; verificar capacidades antes de modificar el modo.

No se publicaron ni desplegaron estos ajustes.
