# Logotipos originales y versiones web

Origen: `Dream_House_Logos_Codex.zip`. Los dos originales se conservan sin cambios en `public/brand/`.

- `dream-house-original.jpg`: 1438 × 1438, fondo blanco.
- `klaro-original.png`: 1410 × 1182, transparencia original.
- `dream-house.png`: 1155 × 800, PNG con alfa, recorte del contenido y margen transparente de 12 px.
- `klaro.png`: 1360 × 384, recorte del alfa con margen de 12 px. Todos los canales de los píxeles conservados coinciden con el original.

El script `node scripts/preparar-logos.mjs` usa Sharp, disponible con la instalación existente de Next.js. No redibuja ni vectoriza. Dream House se separa del blanco mediante referencias locales de tinta saturada y reconstrucción del alfa de los bordes; protege la zona interior de la barra IA, elimina ruido desconectado del JPEG y conserva los huecos de las letras. Klaro solo se recorta y se exporta con su alfa existente.

Verificación: originales inspeccionados, versiones sobre crema `#FAF7F0` y azul noche `#15223B`, IA opaca, huecos transparentes, márgenes libres y preservación de los canales originales de Klaro. La vista comparativa se genera en la carpeta temporal como `dreamhouse-logos-revision.png`. La palabra Klaro tiene poco contraste sobre azul noche por su color original; usar los logos sobre la zona clara del encabezado, sin recolorearlos.

El fondo limpio `dreamFondo.png` ya está integrado. El original (2164 × 727) se conserva como `fondo-arquitectonico-original.png`; la versión WebP es de 1920 × 645 y pesa unos 50 KB. Se comprimió con Sharp a calidad 85, sin generación de imágenes ni alteración de la composición.

`BannerColaboracion.tsx` presenta un único título HTML y enlaces en el 65 % izquierdo; el 35 % derecho muestra Dream House arriba y Klaro debajo, separados por «En colaboración». El fondo decorativo lleva un degradado crema. Laptop: altura inicial de 300 px, ampliable por contenido. Móvil: texto seguido de los logos pequeños en fila. Buscador y filtro quedan debajo. «Ver casas» apunta al listado real.

La entrada de texto y logos usa opacidad y desplazamiento de 10 px durante 400 ms, una vez por montaje; se desactiva con `prefers-reduced-motion`. Recursos y enlaces respetan `basePath`. Se conserva el hash al abrir la ficha y se restituye foco y posición después del historial para evitar saltos al ancla en Safari.

Validación: lint y build con export de 34 páginas. Inspección visual y comprobaciones a 390, 768 y 1440 px en Chrome y WebKit: un solo h1, logos completos y proporcionados, disposición móvil/escritorio, ancla al catálogo, navegación a Nosotros, filtros, cierre de ficha, foco, posición y movimiento reducido. No se publicaron estos archivos ni los ajustes del catálogo.
