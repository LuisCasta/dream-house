# Proyectos y avisos de lanzamiento

## Publicación

- Casa Brisa encabeza el catálogo con sus renders, información revisada y acceso a la ficha.
- Los proyectos con `estado: "proximamente"` muestran únicamente nombre, imagen conceptual, estado y acceso al aviso. Sus medidas, entregables y precios no se presentan como definitivos.
- Los filtros por medida del catálogo solo incluyen proyectos listos; las medidas provisionales no determinan resultados públicos.
- Antes de cambiar un proyecto a `estado: "listo"`, revisar planos, medidas, superficies, distribución, renders, entregables y precio. Marcar `documentacionVerificada` al terminar la revisión.
- La preparación del contenido y la habilitación de cobros reales son tareas separadas. Casa Brisa conserva su enlace de Stripe de prueba.

## Avisos por correo

Destino confirmado: `dream.house.ia.store@gmail.com`, configurado en `src/config/avisos.ts`.

“Avísame cuando esté listo” abre la aplicación de correo del visitante con asunto y mensaje específicos del proyecto. El visitante debe enviar el mensaje. La web no afirma que el registro esté completado al pulsar el enlace.

Las solicitudes recibidas en el buzón permiten medir interés real por proyecto. Crear una etiqueta por proyecto y contar remitentes únicos; los mensajes duplicados no deben contarse como personas distintas. Al lanzar un proyecto, responder a los solicitantes de ese proyecto. La petición cubre un aviso de lanzamiento, sin suscripción a publicidad ni fecha prometida.

El evento `launch_notification_interest` registra la intención de abrir el correo en `window.dataLayer`, sin correo ni contenido del mensaje. Un clic no equivale a una solicitud enviada. Para consultar estadísticas de clics debe conectarse el proveedor de analítica previsto por el proyecto.

Para una lista automática en el futuro, sustituir el flujo por un formulario conectado a un servicio de correo. No guardar direcciones de visitantes en el repositorio ni en almacenamiento local como sustituto de un servicio real.
