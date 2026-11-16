import { cabeEn, type Terreno } from "./terrenos";

// ─────────────────────────────────────────────────────────────
// Modelo de producto
// ─────────────────────────────────────────────────────────────

export type Entregable = {
  id: string;
  nombre: string;
  descripcion: string;
  formato: string;
  pendiente?: boolean; // contenido por confirmar con el equipo de arquitectura
};

// Catálogo de documentos que puede incluir un paquete.
export const ENTREGABLES: Record<string, Entregable> = {
  planos: {
    id: "planos",
    nombre: "Planos arquitectónicos",
    descripcion: "Plantas arquitectónicas, plantas acotadas, fachadas y cortes.",
    formato: "PDF",
  },
  renders: {
    id: "renders",
    nombre: "Renders del proyecto",
    descripcion: "Imágenes de la fachada y de los interiores en alta resolución.",
    formato: "JPG",
  },
  especificaciones: {
    id: "especificaciones",
    nombre: "Especificaciones generales",
    descripcion: "Acabados sugeridos, cuadro de áreas y notas generales del proyecto.",
    formato: "PDF",
  },
  editable: {
    id: "editable",
    nombre: "Archivo editable",
    descripcion: "Planos en formato CAD para que tu arquitecto local los adapte.",
    formato: "DWG",
    pendiente: true,
  },
};

// Contenido verificado del PDF de Casa Brisa; no se añade al paquete genérico.
const ENTREGABLES_BRISA: Record<string, Entregable> = {
  "brisa-planta": {
    id: "brisa-planta",
    nombre: "Planta arquitectónica acotada",
    descripcion: "PA-01: distribución de planta baja con cotas, niveles y espacios identificados.",
    formato: "PDF",
  },
  "brisa-fachada": {
    id: "brisa-fachada",
    nombre: "Fachada principal",
    descripcion: "PA-02: alzado de fachada con cotas y niveles, acceso principal y acceso lateral.",
    formato: "PDF",
  },
  "brisa-cortes": {
    id: "brisa-cortes",
    nombre: "Cortes arquitectónicos",
    descripcion: "PA-03 y PA-04: corte longitudinal A-A y corte transversal B-B con cotas y niveles.",
    formato: "PDF",
  },
  "brisa-cimentacion": {
    id: "brisa-cimentacion",
    nombre: "Planta de cimentación",
    descripcion: "PA-05: planta de cimentación con ejes y claves de elementos. No sustituye el cálculo estructural ni los detalles de ingeniería.",
    formato: "PDF",
  },
  "brisa-portada": {
    id: "brisa-portada",
    nombre: "Render de fachada",
    descripcion: "Imagen de referencia de la fachada incluida en la portada del documento de seis páginas.",
    formato: "PDF",
  },
};

// Preparado para varios paquetes (Esencial / Completo / + Adaptación).
// Mientras solo exista uno, la web no muestra selector de paquete.
export type Paquete = {
  id: string;
  nombre: string;
  precio: number; // MXN
  entregables: string[]; // ids de ENTREGABLES
  linkPago?: string; // Stripe Payment Link. Si existe, "Comprar" manda directo a pagar.
};

export type Espacio = "fachada" | "sala" | "cocina" | "recamara" | "recamara2" | "bano" | "patio" | "pasillo";

export type Render = {
  espacio: Espacio;
  titulo: string;
  texto: string;
  src?: string; // ruta en /public. Sin src se muestra una ilustración provisional.
};

export type Paleta = { muro: string; acento: string; madera: string };

export type Proyecto = {
  estado: "listo" | "proximamente";
  slug: string; // también es la URL corta: dreamhouse.mx/brisa
  codigo: string; // código interno, siempre secundario
  nombre: string;
  lema: string;
  descripcion: string;
  estilo: string;
  terreno: Terreno; // terreno para el que fue diseñado
  m2: number;
  documentacionVerificada?: boolean;
  plantas: 1 | 2;
  recamaras: number;
  banos: number; // 2.5 = 2 baños completos + medio baño
  cochera: number; // autos
  paquetes: Paquete[];
  renders: Render[];
  paleta: Paleta;
  arcos?: boolean;
  destacado?: boolean;
  nuevo?: boolean;
};

const ENTREGABLES_COMPLETO = ["planos", "renders", "especificaciones", "editable"];

function paqueteCompleto(precio: number, linkPago?: string): Paquete[] {
  return [{ id: "completo", nombre: "Proyecto completo", precio, entregables: ENTREGABLES_COMPLETO, linkPago }];
}

function recorrido(nombre: string, plantas: number, extra: Partial<Record<Espacio, string>> = {}): Render[] {
  const base: Record<Exclude<Espacio, "pasillo">, [string, string]> = {
    fachada: ["Fachada", `Así se ve ${nombre} desde la calle.`],
    sala: ["Sala", "Un espacio abierto que recibe luz natural durante el día."],
    cocina: ["Cocina-comedor", "Cocina integrada al comedor para convivir mientras cocinas."],
    recamara: ["Recámara principal", plantas === 2 ? "En planta alta, lejos del ruido de la calle." : "Separada de las áreas sociales para más privacidad."],
    recamara2: ["Recámara secundaria", "Pensada para hijos, visitas u oficina en casa."],
    bano: ["Baño", "Ventilación e iluminación natural."],
    patio: ["Patio", "Un respiro al aire libre al fondo del terreno."],
  };
  return (Object.keys(base) as (keyof typeof base)[]).map((e) => ({
    espacio: e,
    titulo: base[e][0],
    texto: extra[e] ?? base[e][1],
  }));
}

// ─────────────────────────────────────────────────────────────
// Proyectos de ejemplo — nombres, precios y medidas POR CONFIRMAR
// ─────────────────────────────────────────────────────────────

export const DATOS_DE_EJEMPLO = true;

export const PROYECTOS: Proyecto[] = [
  {
    slug: "brisa",
    estado: "listo",
    codigo: "DH-0715-01",
    nombre: "Casa Brisa",
    lema: "Una casa con alma de playa.",
    descripcion:
      "Casa de una planta para un terreno de 7 × 15 m, con dos recámaras y un baño completo. Sala, comedor y cocina integrados se abren hacia una estancia exterior y un jardín lateral. Un pasillo interior conecta las habitaciones con el patio interior; al fondo se encuentra el patio de servicio. Sin cochera.",
    estilo: "Mediterráneo tropical",
    terreno: { frente: 7, fondo: 15 },
    m2: 72,
    documentacionVerificada: true,
    plantas: 1,
    recamaras: 2,
    banos: 1,
    cochera: 0,
    // TODO: link de PRUEBA (test_). Cambiar por el link de producción antes de vender.
    paquetes: [{
      id: "completo",
      nombre: "Proyecto completo",
      precio: 2490,
      entregables: ["brisa-planta", "brisa-fachada", "brisa-cortes", "brisa-cimentacion", "brisa-portada"],
      linkPago: "https://buy.stripe.com/test_dRmbJ03IZ54629n4kQ7IY00",
    }],
    renders: [
      {
        espacio: "fachada",
        titulo: "Fachada",
        texto: "Fachada en tonos cálidos, madera y vegetación tropical al atardecer.",
        src: "/renders/brisa/fachada.webp",
      },
      {
        espacio: "cocina",
        titulo: "Sala-comedor",
        texto: "Sala, comedor y cocina integrados junto a un jardín lateral.",
        src: "/renders/brisa/sala-comedor.webp",
      },
      {
        espacio: "sala",
        titulo: "Sala",
        texto: "Una sala luminosa con tonos cálidos, madera y detalles naturales.",
        src: "/renders/brisa/sala.webp",
      },
      {
        espacio: "pasillo",
        titulo: "Pasillo",
        texto: "Pasillo hacia las habitaciones y el patio interior.",
        src: "/renders/brisa/pasillo.webp",
      },
    ],
    paleta: { muro: "#efe7da", acento: "#b4552d", madera: "#9a6b45" },
    destacado: true,
  },
  {
    slug: "nido",
    estado: "proximamente",
    codigo: "DH-0715-02",
    nombre: "Casa Nido",
    lema: "Una planta, todo a la mano.",
    descripcion:
      "Casa de una sola planta para parejas o familias pequeñas. Distribución sencilla, sin escaleras y fácil de construir por etapas.",
    estilo: "Compacta",
    terreno: { frente: 7, fondo: 15 },
    m2: 66,
    plantas: 1,
    recamaras: 2,
    banos: 1,
    cochera: 1,
    paquetes: paqueteCompleto(1690),
    renders: recorrido("Casa Nido", 1),
    paleta: { muro: "#ece4d6", acento: "#7d8b6a", madera: "#8f6646" },
  },
  {
    slug: "santorini",
    estado: "proximamente",
    codigo: "DH-0815-01",
    nombre: "Casa Santorini",
    lema: "Muros blancos, arcos y terraza en planta alta.",
    descripcion:
      "Inspirada en el Mediterráneo: muros blancos, arcos suaves y una terraza en planta alta para las tardes. Tres recámaras y cochera.",
    estilo: "Mediterráneo",
    terreno: { frente: 8, fondo: 15 },
    m2: 132,
    plantas: 2,
    recamaras: 3,
    banos: 2.5,
    cochera: 1,
    paquetes: paqueteCompleto(2790),
    renders: recorrido("Casa Santorini", 2),
    paleta: { muro: "#f7f4ee", acento: "#3f6b8a", madera: "#a77a52" },
    arcos: true,
    destacado: true,
  },
  {
    slug: "jacaranda",
    estado: "proximamente",
    codigo: "DH-0815-02",
    nombre: "Casa Jacaranda",
    lema: "Tres recámaras con baño propio.",
    descripcion:
      "Dos plantas con tres recámaras, cada una con su baño. Sala y comedor abiertos hacia un patio posterior.",
    estilo: "Contemporáneo",
    terreno: { frente: 8, fondo: 15 },
    m2: 140,
    plantas: 2,
    recamaras: 3,
    banos: 3,
    cochera: 1,
    paquetes: paqueteCompleto(2890),
    renders: recorrido("Casa Jacaranda", 2),
    paleta: { muro: "#e9e3da", acento: "#6e5a8a", madera: "#8a5f40" },
    nuevo: true,
  },
  {
    slug: "patio",
    estado: "proximamente",
    codigo: "DH-1010-01",
    nombre: "Casa Patio",
    lema: "Todo gira alrededor de un patio.",
    descripcion:
      "Para terrenos cuadrados: los espacios se abren hacia un patio interior que da luz y privacidad a toda la casa.",
    estilo: "Contemporáneo mexicano",
    terreno: { frente: 10, fondo: 10 },
    m2: 78,
    plantas: 1,
    recamaras: 2,
    banos: 1.5,
    cochera: 0,
    paquetes: paqueteCompleto(1890),
    renders: recorrido("Casa Patio", 1),
    paleta: { muro: "#e8dccb", acento: "#a2542e", madera: "#94683f" },
  },
  {
    slug: "barro-y-luz",
    estado: "proximamente",
    codigo: "DH-1015-01",
    nombre: "Casa Barro y Luz",
    lema: "Tonos de barro y una planta bien resuelta.",
    descripcion:
      "Una planta con tres recámaras, muros en tonos barro y grandes ventanas hacia el patio. Cochera para dos autos.",
    estilo: "Mexicano moderno",
    terreno: { frente: 10, fondo: 15 },
    m2: 96,
    plantas: 1,
    recamaras: 3,
    banos: 2,
    cochera: 2,
    paquetes: paqueteCompleto(2490),
    renders: recorrido("Casa Barro y Luz", 1),
    paleta: { muro: "#dcbfa1", acento: "#8c3f22", madera: "#7e5534" },
    destacado: true,
  },
  {
    slug: "mezquite",
    estado: "proximamente",
    codigo: "DH-1015-02",
    nombre: "Casa Mezquite",
    lema: "Cuatro recámaras para familias que crecen.",
    descripcion:
      "Dos plantas con cuatro recámaras, estudio y cochera doble. Madera y concreto aparente en fachada.",
    estilo: "Contemporáneo",
    terreno: { frente: 10, fondo: 15 },
    m2: 165,
    plantas: 2,
    recamaras: 4,
    banos: 3,
    cochera: 2,
    paquetes: paqueteCompleto(3190),
    renders: recorrido("Casa Mezquite", 2),
    paleta: { muro: "#e6e0d6", acento: "#5d6b55", madera: "#7a5233" },
    nuevo: true,
  },
  {
    slug: "hacienda-de-luz",
    estado: "proximamente",
    codigo: "DH-1020-01",
    nombre: "Casa Hacienda de Luz",
    lema: "Arcos, corredor y una sola planta.",
    descripcion:
      "Reinterpreta la casa de hacienda en un terreno urbano: corredor con arcos, techos altos y todo en una planta.",
    estilo: "Hacienda contemporánea",
    terreno: { frente: 10, fondo: 20 },
    m2: 140,
    plantas: 1,
    recamaras: 3,
    banos: 2.5,
    cochera: 2,
    paquetes: paqueteCompleto(3290),
    renders: recorrido("Casa Hacienda de Luz", 1),
    paleta: { muro: "#ecdcc4", acento: "#a14a2a", madera: "#6f4a2e" },
    arcos: true,
    destacado: true,
  },
  {
    slug: "laurel",
    estado: "proximamente",
    codigo: "DH-1020-02",
    nombre: "Casa Laurel",
    lema: "Amplia, luminosa y con jardín.",
    descripcion:
      "Dos plantas, cuatro recámaras y un jardín posterior generoso. Pensada para quien tiene un terreno de 10 × 20.",
    estilo: "Contemporáneo",
    terreno: { frente: 10, fondo: 20 },
    m2: 210,
    plantas: 2,
    recamaras: 4,
    banos: 3.5,
    cochera: 2,
    paquetes: paqueteCompleto(3690),
    renders: recorrido("Casa Laurel", 2),
    paleta: { muro: "#f0ebe2", acento: "#4d5d4b", madera: "#8b6243" },
  },
];

// ─────────────────────────────────────────────────────────────
// Consultas
// ─────────────────────────────────────────────────────────────

export function obtenerProyecto(slug: string) {
  return PROYECTOS.find((p) => p.slug === slug);
}

export function precioDesde(p: Proyecto) {
  return Math.min(...p.paquetes.map((k) => k.precio));
}

export function disenadosPara(t: Terreno) {
  return PROYECTOS.filter((p) => p.terreno.frente === t.frente && p.terreno.fondo === t.fondo);
}

// Proyectos de terrenos más pequeños que también caben en el terreno indicado.
export function compatiblesCon(t: Terreno) {
  return PROYECTOS.filter(
    (p) => cabeEn(p.terreno, t) && !(p.terreno.frente === t.frente && p.terreno.fondo === t.fondo),
  );
}

export function destacados() {
  return PROYECTOS.filter((p) => p.destacado);
}

export function entregablesDe(p: Proyecto, paqueteId?: string) {
  const paquete = p.paquetes.find((k) => k.id === paqueteId) ?? p.paquetes[0];
  return paquete.entregables.map((id) => ENTREGABLES_BRISA[id] ?? ENTREGABLES[id]);
}

// Link de pago directo (Stripe) del paquete, si ya está conectado.
export function linkPago(p: Proyecto, paquete = p.paquetes[0].id) {
  if (p.estado === "proximamente") return undefined;
  return p.paquetes.find((x) => x.id === paquete)?.linkPago;
}
