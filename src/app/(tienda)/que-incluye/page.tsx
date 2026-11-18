import Link from "next/link";
import { PROYECTOS, entregablesDe } from "@/data/proyectos";
import { EXCLUSIONES } from "@/data/venta";
export default function QueIncluye() {
  return (
    <div className="ancho pagina-ayuda">
      <p className="sobrelinea">EL PAQUETE</p>
      <h1 className="titulo-pagina">Qué incluye tu proyecto</h1>
      <p className="text-gris mt-4">
        Consulta en la ficha de cada casa los documentos y formatos incluidos en su paquete.
      </p>
      <div className="grid gap-5 md:grid-cols-3 mt-9">
        {entregablesDe(PROYECTOS.find((p) => p.estado === "listo")!)
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
          editable no está incluido. Requiere revisión y
          adaptación local.
        </p>
        <p className="mt-2">
          Descarga el archivo ZIP con tu paquete una vez acreditado el pago.
        </p>
      </div>
      <Link href="/planos" className="boton mt-8">
        Ver proyectos
      </Link>
    </div>
  );
}
