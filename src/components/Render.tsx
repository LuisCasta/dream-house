import Image from "next/image";
import type { Espacio, Proyecto } from "@/data/proyectos";
import Fachada from "./ilustraciones/Fachada";
import Interior from "./ilustraciones/Interior";

// Muestra el render real si existe; si no, una ilustración provisional marcada como tal.
export default function Render({
  p,
  espacio = "fachada",
  sizes = "100vw",
  prioridad = false,
  marcarProvisional = true,
  className = "",
}: {
  p: Proyecto;
  espacio?: Espacio;
  sizes?: string;
  prioridad?: boolean;
  marcarProvisional?: boolean;
  className?: string;
}) {
  const render = p.renders.find((r) => r.espacio === espacio);

  if (render?.src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={render.src} alt={`${render.titulo} de ${p.nombre}`} fill sizes={sizes} priority={prioridad} className="object-cover" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {espacio === "fachada" ? (
        <Fachada p={p} className="absolute inset-0 h-full w-full" />
      ) : (
        <Interior p={p} espacio={espacio} className="absolute inset-0 h-full w-full" />
      )}
      {marcarProvisional && (
        <span className="absolute right-2 top-2 rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-noche/60 backdrop-blur">
          Ilustración
        </span>
      )}
    </div>
  );
}
