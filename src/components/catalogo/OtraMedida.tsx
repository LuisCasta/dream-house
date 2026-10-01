"use client";

import { useState } from "react";
import { PROYECTOS } from "@/data/proyectos";
import { cabeEn, textoMedida } from "@/data/terrenos";
import { track } from "@/lib/analytics";
import TarjetaProyecto from "../TarjetaProyecto";
import { Boton } from "../ui";

function Campo({ label, valor, onChange }: { label: string; valor: string; onChange: (v: string) => void }) {
  return (
    <label className="block flex-1">
      <span className="text-sm font-medium">{label}</span>
      <span className="mt-1.5 flex items-center rounded-2xl border border-linea bg-white focus-within:border-noche">
        <input
          inputMode="decimal"
          value={valor}
          onChange={(e) => onChange(e.target.value.replace(",", "."))}
          placeholder="0"
          className="w-full rounded-2xl bg-transparent px-4 py-3.5 font-display text-3xl outline-none"
        />
        <span className="pr-4 text-gris">m</span>
      </span>
    </label>
  );
}

export default function OtraMedida() {
  const [frente, setFrente] = useState("");
  const [fondo, setFondo] = useState("");
  const t = { frente: parseFloat(frente), fondo: parseFloat(fondo) };
  const valido = t.frente > 0 && t.fondo > 0;
  const caben = valido ? PROYECTOS.filter((p) => cabeEn(p.terreno, t)) : [];

  return (
    <div>
      <form
        className="flex max-w-md items-end gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (valido) track("select_lot_size", { medida: `${t.frente}x${t.fondo}`, personalizada: true });
        }}
      >
        <Campo label="Frente" valor={frente} onChange={setFrente} />
        <span className="pb-4 text-2xl text-gris">×</span>
        <Campo label="Fondo" valor={fondo} onChange={setFondo} />
      </form>

      {valido && (
        <div className="mt-10">
          <p className="text-sm text-gris">
            {caben.length > 0
              ? `${caben.length} ${caben.length === 1 ? "casa cabe" : "casas caben"} en un terreno de ${textoMedida(t)}`
              : `Todavía no tenemos casas para ${textoMedida(t)}.`}
          </p>
          {caben.length > 0 && (
            <div className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {caben.map((p) => (
                <TarjetaProyecto key={p.slug} p={p} etiqueta={`Diseñada para ${textoMedida(p.terreno)}`} />
              ))}
            </div>
          )}
          <div className="mt-12 rounded-3xl bg-arena/70 p-6 sm:p-8">
            <p className="font-display text-3xl tracking-tight">¿Tu terreno es irregular o no encuentras tu medida?</p>
            <p className="mt-2 text-gris">Podemos adaptar un proyecto o diseñar uno para tu terreno.</p>
            <Boton href={`/adaptar?terreno=${t.frente}x${t.fondo}`} className="mt-5">
              Adaptar un proyecto
            </Boton>
          </div>
        </div>
      )}
    </div>
  );
}
