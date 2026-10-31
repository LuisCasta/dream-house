import Image from "next/image";
import { venta } from "@/data/venta";
import type { Proyecto } from "@/data/proyectos";
import { recurso } from "@/lib/rutas";
import Fachada from "../ilustraciones/Fachada";
import Interior from "../ilustraciones/Interior";

export default function ImagenVenta({
  p,
  indice = 0,
  prioridad = false,
  className = "",
  encajar = false,
}: {
  p: Proyecto;
  indice?: number;
  prioridad?: boolean;
  className?: string;
  encajar?: boolean;
}) {
  const medio = venta(p).imagenes[indice];
  return (
    <div
      className={`imagen-venta ${className}`}
      role={medio.src ? undefined : "img"}
      aria-label={
        medio.src ? undefined : `${medio.alt}. Ilustración provisional.`
      }
    >
      {medio.src ? (
        <Image
          src={recurso(medio.src)}
          alt={medio.alt}
          fill
          sizes="(min-width:1024px) 45vw, 100vw"
          priority={prioridad}
          className="object-contain"
        />
      ) : medio.espacio === "fachada" ? (
        <Fachada p={p} className="h-full w-full" encajar={encajar} />
      ) : (
        <Interior
          p={p}
          espacio={medio.espacio}
          className="h-full w-full"
          encajar={encajar}
        />
      )}
      {medio.provisional && (
        <span className="etiqueta-ilustracion">Ilustración provisional</span>
      )}
    </div>
  );
}
