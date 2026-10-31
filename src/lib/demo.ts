import { obtenerProyecto } from "@/data/proyectos";
export type Escenario = "aprobado" | "pendiente" | "fallido";
export type PedidoDemo = {
  id: string;
  slug: string;
  escenario: Escenario;
  demo: true;
  fecha: string;
};
// Solo datos no personales. El correo no se persiste ni viaja en URL/eventos.
export function guardarDemo(slug: string, escenario: Escenario): PedidoDemo {
  const pedido: PedidoDemo = {
    id: `DEMO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    slug,
    escenario,
    demo: true,
    fecha: new Date().toISOString(),
  };
  sessionStorage.setItem(`dh_demo_${pedido.id}`, JSON.stringify(pedido));
  return pedido;
}
export function leerDemo(id: string): PedidoDemo | null {
  try {
    const p = JSON.parse(sessionStorage.getItem(`dh_demo_${id}`) || "null");
    return p?.id === id &&
      p.demo === true &&
      obtenerProyecto(p.slug) &&
      ["aprobado", "pendiente", "fallido"].includes(p.escenario)
      ? p
      : null;
  } catch {
    return null;
  }
}
