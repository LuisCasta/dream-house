"use client";

import { useRef, useState } from "react";
import type { Proyecto } from "@/data/proyectos";
import Render from "../Render";

// Móvil: carrusel a pantalla completa con deslizamiento.
// Escritorio: imagen principal grande + mosaico.
export default function GaleriaProyecto({ p }: { p: Proyecto }) {
  const [actual, setActual] = useState(0);
  const fila = useRef<HTMLDivElement>(null);

  const alDeslizar = () => {
    const el = fila.current;
    if (el) setActual(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div>
      {/* Móvil */}
      <div className="relative sm:hidden">
        <div ref={fila} onScroll={alDeslizar} className="fila flex overflow-x-auto">
          {p.renders.map((r, i) => (
            <div key={r.espacio} className="w-full shrink-0">
              <Render p={p} espacio={r.espacio} className="aspect-[4/4.3] bg-arena" prioridad={i === 0} sizes="100vw" />
            </div>
          ))}
        </div>
        <span className="absolute bottom-3 left-3 rounded-full bg-noche/70 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {p.renders[actual]?.titulo}
        </span>
        <span className="absolute bottom-3 right-3 rounded-full bg-noche/70 px-2.5 py-1 text-xs tabular-nums text-white backdrop-blur">
          {actual + 1} / {p.renders.length}
        </span>
      </div>

      {/* Escritorio */}
      <div className="hidden grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-3xl sm:grid sm:h-[460px] lg:h-[540px]">
        <Render p={p} espacio="fachada" className="col-span-2 row-span-2 bg-arena" prioridad sizes="50vw" />
        {p.renders.slice(1, 5).map((r) => (
          <Render key={r.espacio} p={p} espacio={r.espacio} className="bg-arena" sizes="25vw" marcarProvisional={false} />
        ))}
      </div>
    </div>
  );
}
