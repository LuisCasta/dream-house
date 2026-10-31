import type { Proyecto } from "@/data/proyectos";
import { precio } from "@/lib/formato";
import ImagenVenta from "../proyecto/ImagenVenta";
export default function Resumen({ p }: { p: Proyecto }) {
  return (
    <aside className="resumen panel">
      <ImagenVenta p={p} />
      <div>
        <h2 className="font-display text-2xl">{p.nombre}</h2>
        <p className="text-gris text-sm mt-2">{p.paquetes[0].nombre}</p>
        <p className="nota mt-1">Paquete y precio de ejemplo</p>
        <p className="precio-resumen mt-3">{precio(p.paquetes[0].precio)}</p>
      </div>
      <div className="total">
        <span>Total simulado</span>
        <strong>{precio(p.paquetes[0].precio)}</strong>
      </div>
    </aside>
  );
}
