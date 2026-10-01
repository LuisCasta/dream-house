export type Terreno = { frente: number; fondo: number };

export type MedidaPopular = Terreno & { slug: string };

// Medidas populares que se muestran como opciones grandes en la web.
export const MEDIDAS: MedidaPopular[] = [
  { slug: "7x15", frente: 7, fondo: 15 },
  { slug: "8x15", frente: 8, fondo: 15 },
  { slug: "10x10", frente: 10, fondo: 10 },
  { slug: "10x15", frente: 10, fondo: 15 },
  { slug: "10x20", frente: 10, fondo: 20 },
];

export function textoMedida(t: Terreno) {
  return `${t.frente} × ${t.fondo} m`;
}

export function slugMedida(t: Terreno) {
  return `${t.frente}x${t.fondo}`;
}

export function obtenerMedida(slug: string) {
  return MEDIDAS.find((m) => m.slug === slug);
}

// Un proyecto cabe en un terreno si el terreno es igual o más grande en ambos sentidos.
export function cabeEn(proyecto: Terreno, terreno: Terreno) {
  return terreno.frente >= proyecto.frente && terreno.fondo >= proyecto.fondo;
}
