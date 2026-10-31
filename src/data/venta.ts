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
  return {
    moneda: "MXN",
    demo: true,
    disponibilidad: "demostracion" as const,
    datosConfirmados: false,
    imagenes: espacios.map((espacio) => ({
      espacio,
      src: p.renders.find((r) => r.espacio === espacio)?.src,
      alt: `${espacio === "fachada" ? "Fachada" : espacio === "sala" ? "Sala" : "Cocina"} de ${p.nombre}`,
      provisional: !p.renders.find((r) => r.espacio === espacio)?.src,
    })),
    youtubeId: VIDEOS[p.slug],
    entregables: entregablesDe(p).filter((e) => !e.pendiente),
    exclusiones: EXCLUSIONES,
  };
}
