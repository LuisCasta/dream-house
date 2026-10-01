import Link from "next/link";
import { precioDesde, type Proyecto } from "@/data/proyectos";
import { banos, precio } from "@/lib/formato";
import Render from "./Render";
import { EtiquetaTerreno } from "./ui";

// Datos clave en una línea: lo mínimo para decidir si abrir el proyecto.
export function DatosClave({ p, className = "" }: { p: Proyecto; className?: string }) {
  const datos = [
    `${p.m2} m²`,
    `${p.recamaras} rec.`,
    `${banos(p.banos)} ${p.banos === 1 ? "baño" : "baños"}`,
    p.plantas === 1 ? "1 planta" : "2 plantas",
  ];
  return (
    <p className={`flex flex-wrap items-center gap-x-2 text-sm text-gris ${className}`}>
      {datos.map((d, i) => (
        <span key={d} className="flex items-center gap-2">
          {i > 0 && <span className="h-0.5 w-0.5 rounded-full bg-gris" aria-hidden />}
          {d}
        </span>
      ))}
    </p>
  );
}

export default function TarjetaProyecto({
  p,
  etiqueta,
  prioridad = false,
}: {
  p: Proyecto;
  etiqueta?: string; // ej. "Diseñada para 7 × 15 · también cabe en tu terreno"
  prioridad?: boolean;
}) {
  return (
    <article className="group relative">
      <div className="relative">
        <Render
          p={p}
          className="aspect-[4/5] rounded-2xl bg-arena transition duration-500 group-hover:shadow-xl group-hover:shadow-noche/10 sm:aspect-[4/4.4]"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 85vw"
          prioridad={prioridad}
        />
        {/* Rótulo como en las portadas de los videos: m² grande + terreno */}
        <div className="pointer-events-none absolute inset-x-0 top-0 rounded-t-2xl bg-gradient-to-b from-noche/60 to-transparent px-4 pb-10 pt-6 text-center">
          <p className="font-display text-[2.6rem] font-semibold leading-none tracking-tight text-hueso drop-shadow-sm">{p.m2} m²</p>
          <EtiquetaTerreno {...p.terreno} oscura className="mt-2.5" />
        </div>
        {p.nuevo && (
          <span className="absolute bottom-3 left-3 rounded-full bg-oro px-2.5 py-1 font-romana text-[10px] font-semibold uppercase tracking-[0.15em] text-noche">Nuevo</span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-[1.55rem] font-medium leading-tight tracking-tight">
            <Link href={`/${p.slug}`} className="after:absolute after:inset-0">
              {p.nombre}
            </Link>
          </h3>
          <DatosClave p={p} className="mt-1" />
          {etiqueta && <p className="mt-2 text-xs font-medium text-oro-oscuro">{etiqueta}</p>}
        </div>
        <p className="shrink-0 pt-1.5 text-right text-[15px] font-semibold">{precio(precioDesde(p)).replace(" MXN", "")}<span className="block text-[11px] font-normal text-gris">MXN</span></p>
      </div>
      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium underline decoration-noche/20 underline-offset-4 transition group-hover:decoration-oro">
        Ver proyecto
      </span>
    </article>
  );
}

// Fila deslizable en móvil (tipo Netflix), cuadrícula en escritorio.
export function FilaProyectos({ proyectos, etiqueta }: { proyectos: Proyecto[]; etiqueta?: (p: Proyecto) => string | undefined }) {
  return (
    <div className="fila -mx-5 flex scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-12 lg:overflow-visible lg:px-0">
      {proyectos.map((p, i) => (
        <div key={p.slug} className="w-[82%] shrink-0 sm:w-[45%] lg:w-auto">
          <TarjetaProyecto p={p} etiqueta={etiqueta?.(p)} prioridad={i === 0} />
        </div>
      ))}
    </div>
  );
}
