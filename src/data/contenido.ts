// Textos compartidos entre páginas. Los marcados `pendiente` requieren
// confirmación del negocio antes de publicarse.

export type Pregunta = { p: string; r: string; pendiente?: boolean; tema: "proyecto" | "compra" | "construccion" };

export const PREGUNTAS: Pregunta[] = [
  {
    tema: "construccion",
    p: "¿Puedo construir directamente con estos planos?",
    r: "Un proyecto prediseñado es un punto de partida profesional, no un permiso de construcción. Antes de construir, un arquitecto o ingeniero local debe revisarlo y adaptarlo al reglamento de tu municipio, la orientación y las condiciones de tu terreno, y complementarlo con la ingeniería estructural y de instalaciones que corresponda.",
  },
  {
    tema: "proyecto",
    p: "Mi terreno no mide exactamente eso, ¿me sirve?",
    r: "Si tu terreno es igual o más grande en frente y fondo, la casa cabe. Si es más chico, tiene otra forma o está en esquina, podemos ayudarte a adaptarla.",
  },
  {
    tema: "compra",
    p: "¿Necesito crear una cuenta para comprar?",
    r: "No. Solo te pedimos tu nombre y tu correo para enviarte el proyecto.",
  },
  {
    tema: "compra",
    p: "¿Cómo recibo mi proyecto?",
    r: "La entrega es digital. Después del pago verás los enlaces de descarga en pantalla y también te los enviamos por correo.",
  },
  {
    tema: "compra",
    p: "¿Qué métodos de pago aceptan?",
    r: "Tarjeta de crédito o débito, efectivo en OXXO y transferencia SPEI, a través de una pasarela de pago reconocida.",
    pendiente: true,
  },
  {
    tema: "proyecto",
    p: "¿Incluye cálculo estructural e instalaciones?",
    r: "El proyecto arquitectónico no sustituye la ingeniería estructural ni los proyectos de instalaciones, que dependen de tu terreno y tu localidad. Un profesional local debe realizarlos.",
    pendiente: true,
  },
  {
    tema: "proyecto",
    p: "¿Puedo modificar la casa?",
    r: "Sí. Puedes llevar el proyecto a un arquitecto local o pedirnos una adaptación: cambios de distribución, fachada, ampliaciones o ajustes a tu terreno.",
  },
  {
    tema: "compra",
    p: "¿Cuántas veces puedo construir el mismo proyecto?",
    r: "Los términos de uso y licencia de cada proyecto se publicarán aquí.",
    pendiente: true,
  },
  {
    tema: "compra",
    p: "¿Emiten factura?",
    r: "Información de facturación por confirmar.",
    pendiente: true,
  },
  {
    tema: "compra",
    p: "¿Puedo pedir un reembolso?",
    r: "Por ser un producto digital, la política de reembolsos se detallará en la Política de compra.",
    pendiente: true,
  },
];

export const SERVICIOS = [
  { titulo: "Adaptación a tu terreno", texto: "Ajustamos el proyecto a las medidas, forma y orientación reales de tu terreno." },
  { titulo: "Cambios de distribución", texto: "Una recámara más, un estudio, cocina cerrada o abierta." },
  { titulo: "Cambios de fachada", texto: "Otros materiales, colores o estilo para la misma casa." },
  { titulo: "Ampliaciones", texto: "Un segundo piso, una terraza o un cuarto adicional para después." },
  { titulo: "Renders adicionales", texto: "Nuevas vistas con tus acabados y colores." },
  { titulo: "Proyecto personalizado", texto: "Diseñamos una casa desde cero para tu terreno y tu familia." },
];

export const LIMITES = [
  "Reglamentos de construcción y uso de suelo de tu municipio",
  "Restricciones de tu fraccionamiento o condominio",
  "Orientación, pendiente y tipo de suelo de tu terreno",
  "Ingeniería estructural, instalaciones y licencias de construcción",
];
