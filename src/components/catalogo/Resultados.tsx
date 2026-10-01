"use client";

import { useState } from "react";
import type { Proyecto } from "@/data/proyectos";
import { textoMedida } from "@/data/terrenos";
import { IconoFiltro } from "../Iconos";
import TarjetaProyecto from "../TarjetaProyecto";

type Filtros = { plantas: number; recamaras: number; cochera: boolean; estilo: string };
const SIN_FILTROS: Filtros = { plantas: 0, recamaras: 0, cochera: false, estilo: "" };

function Chip({ activo, onClick, children }: { activo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      className={`min-h-10 rounded-full border px-4 text-sm transition ${activo ? "border-noche bg-noche text-hueso" : "border-linea bg-white hover:border-noche/40"}`}
    >
      {children}
    </button>
  );
}

function aplicar(lista: Proyecto[], f: Filtros) {
  return lista.filter(
    (p) =>
      (!f.plantas || p.plantas === f.plantas) &&
      (!f.recamaras || (f.recamaras === 4 ? p.recamaras >= 4 : p.recamaras === f.recamaras)) &&
      (!f.cochera || p.cochera > 0) &&
      (!f.estilo || p.estilo === f.estilo),
  );
}

export default function Resultados({ disenados, compatibles }: { disenados: Proyecto[]; compatibles: Proyecto[] }) {
  const [abierto, setAbierto] = useState(false);
  const [f, setF] = useState<Filtros>(SIN_FILTROS);
  const todos = [...disenados, ...compatibles];
  const estilos = Array.from(new Set(todos.map((p) => p.estilo)));
  const a = aplicar(disenados, f);
  const b = aplicar(compatibles, f);
  const activos = Number(!!f.plantas) + Number(!!f.recamaras) + Number(f.cochera) + Number(!!f.estilo);
  const cambiar = (parcial: Partial<Filtros>) => setF((x) => ({ ...x, ...parcial }));

  return (
    <div>
      {/* Filtros progresivos: ocultos hasta que se piden */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-gris">
          {a.length + b.length} {a.length + b.length === 1 ? "casa" : "casas"}
        </p>
        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-expanded={abierto}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-linea bg-white px-4 text-sm hover:border-noche/40"
        >
          <IconoFiltro /> Filtrar{activos > 0 && <span className="rounded-full bg-oro px-1.5 text-[11px] text-noche">{activos}</span>}
        </button>
      </div>

      {abierto && (
        <div className="mt-4 space-y-4 rounded-2xl border border-linea bg-white/60 p-4">
          <div className="flex flex-wrap gap-2">
            <Chip activo={f.plantas === 1} onClick={() => cambiar({ plantas: f.plantas === 1 ? 0 : 1 })}>1 planta</Chip>
            <Chip activo={f.plantas === 2} onClick={() => cambiar({ plantas: f.plantas === 2 ? 0 : 2 })}>2 plantas</Chip>
            <Chip activo={f.cochera} onClick={() => cambiar({ cochera: !f.cochera })}>Con cochera</Chip>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs text-gris">Recámaras</span>
            {[2, 3, 4].map((n) => (
              <Chip key={n} activo={f.recamaras === n} onClick={() => cambiar({ recamaras: f.recamaras === n ? 0 : n })}>
                {n === 4 ? "4+" : n}
              </Chip>
            ))}
          </div>
          {estilos.length > 1 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs text-gris">Estilo</span>
              {estilos.map((e) => (
                <Chip key={e} activo={f.estilo === e} onClick={() => cambiar({ estilo: f.estilo === e ? "" : e })}>{e}</Chip>
              ))}
            </div>
          )}
          {activos > 0 && (
            <button type="button" onClick={() => setF(SIN_FILTROS)} className="text-sm underline underline-offset-4">
              Quitar filtros
            </button>
          )}
        </div>
      )}

      {a.length > 0 && (
        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {a.map((p, i) => (
            <TarjetaProyecto key={p.slug} p={p} prioridad={i < 2} />
          ))}
        </div>
      )}

      {b.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-3xl tracking-tight">También caben en tu terreno</h2>
          <p className="mt-2 text-sm text-gris">Diseñadas para terrenos más pequeños: te sobra espacio para patio o jardín.</p>
          <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {b.map((p) => (
              <TarjetaProyecto key={p.slug} p={p} etiqueta={`Diseñada para ${textoMedida(p.terreno)}`} />
            ))}
          </div>
        </div>
      )}

      {a.length + b.length === 0 && (
        <div className="mt-8 rounded-2xl border border-dashed border-linea px-6 py-14 text-center">
          <p className="font-display text-2xl">No hay casas con esos filtros</p>
          <button type="button" onClick={() => setF(SIN_FILTROS)} className="mt-4 text-sm underline underline-offset-4">
            Quitar filtros
          </button>
        </div>
      )}
    </div>
  );
}
