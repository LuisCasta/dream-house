# Métricas de Dream House

Proyecto Microsoft Clarity: `zes9rzo2fv`. Integración en el layout raíz, compatible con la exportación estática a GitHub Pages. No requiere claves secretas ni paquetes adicionales.

## Activación y privacidad

- Solo se descarga Clarity en una compilación de producción y después de aceptar la analítica. El desarrollo local no contamina el panel.
- El pie de página permite cambiar la preferencia. Aceptar y rechazar tienen la misma presentación; la elección dura 180 días.
- Se envía `consentv2` con `analytics_Storage: granted` y `ad_Storage: denied`. Al retirar el permiso se deniega el almacenamiento, se eliminan las cookies propias de Clarity y los datos locales de atribución, y se recarga para descargar el código de la memoria.
- Los formularios están marcados con `data-clarity-mask`. El mensaje personalizado de adaptación no se publica como destino de un enlace en el DOM. No se envían correos, teléfonos ni textos de formularios en eventos o etiquetas.
- Los eventos de prueba no se reenvían a Clarity. La preferencia aplica también al registro local en `dataLayer` y a la captura de UTM.
- El aviso de privacidad documenta Clarity y enlaza sus políticas. La opción predeterminada del proyecto Clarity para enmascarar contenido sensible debe conservarse; el propietario puede revisar el modo en Settings → Masking.

## Eventos

| Evento | Acción que representa |
| --- | --- |
| `page_view` | Página vista después de aceptar |
| `view_project` | Apertura de la ficha de una casa |
| `view_gallery_image` | Cambio manual de imagen, sin contar el avance automático |
| `open_gallery` | Apertura del visor ampliado |
| `begin_checkout` | Clic que inicia la salida hacia Stripe |
| `prepare_modification_request` | Preparación de una consulta |
| `request_modification` | Clic para continuar la consulta por WhatsApp |
| `launch_notification_interest` | Clic para abrir una solicitud de aviso por correo |
| `save_project` / `remove_saved_project` | Guardar o quitar una casa |
| `select_lot_size` | Selección de una medida del catálogo |

Las etiquetas incluyen identificadores controlados como `proyecto`, `canal` e `indice`. La navegación por fichas mediante `?casa=...` se mide con `view_project`, aunque no cambie la ruta de la página.

## Panel y campañas

En el panel de Clarity, crear un embudo de eventos `page_view` → `view_project` → `begin_checkout`, y segmentarlo por Source, Medium y Campaign. Los eventos personalizados aparecen entre los Smart events después de recibir tráfico real.

Usar enlaces distintos en cada red, conservando el dominio y la ruta públicos del sitio:

```text
/brisa/?utm_source=tiktok&utm_medium=social&utm_campaign=lanzamiento&utm_content=video_01
/brisa/?utm_source=youtube&utm_medium=social&utm_campaign=lanzamiento&utm_content=video_01
```

No incluir datos de personas en las etiquetas UTM. Solo se conservan valores de campaña con letras, números, guiones, puntos o guiones bajos; las referencias almacenadas se reducen al origen, sin parámetros.

Un clic a Stripe no demuestra pago ni compra completada. El evento `purchase` requiere una confirmación real de Stripe; no se genera a partir del clic ni del checkout de demostración. Los bloqueadores y la negativa a la analítica pueden reducir los datos disponibles. Las personas, sesiones y clics del panel son estimaciones de actividad medida.

El despliegue del código y la comprobación de recepción en el panel son pasos distintos. Tras publicar, realizar una visita autorizada con UTM, aceptar la analítica y recorrer una ficha; comprobar recepción en el proyecto correcto. No es necesario completar un pago para comprobar clics.
