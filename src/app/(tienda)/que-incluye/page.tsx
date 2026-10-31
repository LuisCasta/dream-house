import Link from "next/link";
import { ENTREGABLES } from "@/data/proyectos";
import { EXCLUSIONES } from "@/data/venta";
export default function QueIncluye() {
  return (
    <div className="ancho pagina-ayuda">
      <p className="sobrelinea">EL PAQUETE</p>
      <h1 className="titulo-pagina">Qué incluye tu proyecto</h1>
      <p className="text-gris mt-4">
        Contenido de ejemplo. El alcance comercial está por confirmar.
      </p>
      <div className="grid gap-5 md:grid-cols-3 mt-9">
        {Object.values(ENTREGABLES)
          .filter((e) => !e.pendiente)
          .map((e) => (
            <section className="panel p-6" key={e.id}>
              <p className="sobrelinea">{e.formato}</p>
              <h2 className="font-display text-2xl mt-3">{e.nombre}</h2>
              <p className="text-sm text-gris mt-3 leading-relaxed">
                {e.descripcion}
              </p>
            </section>
          ))}
      </div>
      <div className="aviso mt-8">
        <strong>Antes de construir</strong>
        <p>
          No incluye: {EXCLUSIONES.join(", ").toLowerCase()}. El archivo DWG
          editable está pendiente de confirmación. Requiere revisión y
          adaptación local.
        </p>
        <p className="mt-2">
          Esta demo no entrega archivos de proyectos reales.
        </p>
      </div>
      <Link href="/planos" className="boton mt-8">
        Ver proyectos
      </Link>
    </div>
  );
}
