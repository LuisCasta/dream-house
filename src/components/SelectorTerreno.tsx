"use client";

import Link from "next/link";
import { MEDIDAS } from "@/data/terrenos";
import { compatiblesCon, disenadosPara } from "@/data/proyectos";
import { track } from "@/lib/analytics";
import { IconoMas } from "./Iconos";

// Silueta del terreno a escala: ayuda a reconocer la medida sin leer.
function Silueta({ frente, fondo, activo }: { frente: number; fondo: number; activo?: boolean }) {
  const k = 3.4;
  return (
    <svg viewBox="0 0 40 72" className="h-16 w-10" aria-hidden>
      <rect
        x={(40 - frente * k) / 2}
        y={72 - fondo * k}
        width={frente * k}
        height={fondo * k}
        rx={1.5}
        className={activo ? "fill-oro/15 stroke-oro" : "fill-arena stroke-noche/40 transition group-hover:fill-oro/10 group-hover:stroke-oro"}
        strokeWidth={1.2}
      />
    </svg>
  );
}

export default function SelectorTerreno({ activa, compacto = false }: { activa?: string; compacto?: boolean }) {
  return (
    <ul className={`grid grid-cols-2 gap-3 ${compacto ? "sm:grid-cols-6" : "sm:grid-cols-3 lg:grid-cols-6"}`}>
      {MEDIDAS.map((m) => {
        const n = disenadosPara(m).length + compatiblesCon(m).length;
        const activo = activa === m.slug;
        return (
          <li key={m.slug}>
            <Link
              href={`/planos/${m.slug}`}
              onClick={() => track("select_lot_size", { medida: m.slug })}
              aria-current={activo ? "page" : undefined}
              className={`group flex h-full items-end justify-between gap-2 rounded-2xl border p-4 transition ${
                activo ? "border-oro bg-white shadow-sm" : "border-linea bg-white/70 hover:-translate-y-0.5 hover:border-noche/30 hover:bg-white hover:shadow-md hover:shadow-noche/5"
              }`}
            >
              <span>
                <span className="block font-display text-[1.9rem] leading-none tracking-tight">
                  {m.frente}<span className="text-gris">×</span>{m.fondo}
                </span>
                <span className="mt-2 block text-xs text-gris">
                  {n} {n === 1 ? "casa" : "casas"}
                </span>
              </span>
              <Silueta frente={m.frente} fondo={m.fondo} activo={activo} />
            </Link>
          </li>
        );
      })}
      <li>
        <Link
          href="/planos/otras"
          onClick={() => track("select_lot_size", { medida: "otra" })}
          aria-current={activa === "otras" ? "page" : undefined}
          className={`group flex h-full items-end justify-between gap-2 rounded-2xl border border-dashed p-4 transition ${
            activa === "otras" ? "border-oro bg-white" : "border-noche/20 hover:border-noche/40 hover:bg-white"
          }`}
        >
          <span>
            <span className="block font-display text-[1.45rem] leading-none tracking-tight">Otra medida</span>
            <span className="mt-2 block text-xs text-gris">Escribe la tuya</span>
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-arena transition group-hover:bg-noche group-hover:text-hueso">
            <IconoMas />
          </span>
        </Link>
      </li>
    </ul>
  );
}
