import { entregablesDe, type Proyecto, type Espacio } from "./proyectos";

// Configuración editorial centralizada. Ningún dato comercial del catálogo está aprobado aún.
// Reemplazar src por rutas de public y provisional por false al recibir los activos reales.
export const EXCLUSIONES = [
  "Cálculo estructural",
  "Proyectos de instalaciones",
  "Permisos y trámites",
  "Modificaciones o adaptación al terreno",
];
export const VIDEOS: Partial<Record<string, string>> = {};
export function venta(p: Proyecto) {
  const espacios = [
    "fachada",
    "sala",
    "cocina",
  ] as const satisfies readonly Espacio[];
  const renders = p.renders.filter((render) => render.src);
  const imagenes = renders.length
    ? renders
    : espacios.map((espacio) => p.renders.find((render) => render.espacio === espacio)!);
  return {
    moneda: "MXN",
    demo: true,
    disponibilidad: p.estado === "proximamente" ? "proximamente" as const : "demostracion" as const,
    datosConfirmados: Boolean(p.documentacionVerificada),
    imagenes: imagenes.map((render) => ({
      espacio: render.espacio,
      titulo: render.titulo,
      src: render.src,
      alt: `${render.titulo} de ${p.nombre}`,
      provisional: !render.src,
    })),
    youtubeId: VIDEOS[p.slug],
    entregables: entregablesDe(p).filter((e) => !e.pendiente),
    exclusiones: EXCLUSIONES,
  };
}
