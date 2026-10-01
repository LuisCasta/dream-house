"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { SERVICIOS } from "@/data/contenido";
import { entregablesDe, obtenerProyecto } from "@/data/proyectos";
import { track } from "@/lib/analytics";
import { vaciarCarrito } from "@/lib/carrito";
import { entrega, type EnlaceDescarga } from "@/lib/entrega";
import type { Orden } from "@/lib/pagos";
import { precio } from "@/lib/formato";
import { useMontado } from "@/lib/useMontado";
import { IconoCheck, IconoDescarga, IconoDocumento, IconoFlecha } from "../Iconos";
import { claseBoton } from "../ui";

function leerOrden(id: string | null): Orden | null {
  if (!id) return null;
  try {
    const v = sessionStorage.getItem(`dh_orden_${id}`);
    return v ? JSON.parse(v) : null;
  } catch {
    return null;
  }
}

export default function Confirmacion() {
  const params = useSearchParams();
  const ordenId = params.get("orden");
  const demo = params.get("demo") === "1";
  const montado = useMontado();
  const orden = useMemo(() => (montado ? leerOrden(ordenId) : undefined), [montado, ordenId]);
  const [enlaces, setEnlaces] = useState<EnlaceDescarga[] | null>(null);
  const registrado = useRef(false);

  useEffect(() => {
    const o = orden;
    if (!o || registrado.current) return;
    registrado.current = true;
    vaciarCarrito();
    track("purchase", { orden: o.id, valor: o.total, moneda: "MXN", proyectos: o.items.map((i) => i.slug), metodo: o.metodo, demo });
    entrega.enlacesDeDescarga(o.id).then(setEnlaces);
  }, [orden, demo]);

  if (orden === undefined) return <div className="min-h-[60vh]" />;

  if (!orden) {
    return (
      <div className="mx-auto max-w-md px-5 py-24 text-center">
        <p className="font-display text-4xl tracking-tight">No encontramos tu orden</p>
        <p className="mt-3 text-gris">Revisa el correo con el que compraste: ahí están tus enlaces de descarga.</p>
        <Link href="/contacto" className={`${claseBoton()} mt-8`}>Contactar soporte</Link>
      </div>
    );
  }

  const proyectos = orden.items.map((i) => ({ ...i, p: obtenerProyecto(i.slug)! })).filter((i) => i.p);
  const principal = proyectos[0]?.p;

  return (
    <div className="mx-auto max-w-2xl px-5 pt-10 sm:px-8 sm:pt-16">
      {demo && (
        <p className="mb-8 rounded-xl bg-amber-100 px-4 py-3 text-sm text-amber-900">
          Compra de demostración: no se realizó ningún cargo.
        </p>
      )}

      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e5ebdd] text-[#4d6340]">
        <IconoCheck className="h-7 w-7" />
      </span>
      <h1 className="mt-6 font-display text-5xl leading-none tracking-tight">
        Listo, {orden.comprador.nombre.split(" ")[0]}.
        <br />
        <em className="text-oro-oscuro">Tu proyecto ya es tuyo.</em>
      </h1>
      <p className="mt-4 text-gris">
        Orden <span className="tabular-nums">{orden.id}</span> · {precio(orden.total)}. Enviamos una copia de tus enlaces a <strong className="font-medium text-noche">{orden.comprador.email}</strong>.
      </p>

      {/* Descargas */}
      {proyectos.map(({ p, paquete }) => (
        <section key={p.slug} className="mt-10 rounded-3xl border border-linea bg-white p-5 sm:p-6">
          <p className="font-display text-2xl">{p.nombre}</p>
          <ul className="mt-4 divide-y divide-linea">
            {entregablesDe(p, paquete).map((e) => {
              const enlace = enlaces?.find((x) => x.entregable === e.id);
              return (
                <li key={e.id} className="flex items-center gap-3 py-3">
                  <IconoDocumento formato={e.formato} className="h-10 w-8 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{e.nombre}</p>
                    <p className="text-xs text-gris">{e.formato}</p>
                  </div>
                  {enlace ? (
                    <a href={enlace.url} className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-noche px-4 text-sm text-hueso">
                      <IconoDescarga /> Descargar
                    </a>
                  ) : (
                    <span className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-linea px-4 text-sm text-gris" title="Disponible al conectar la entrega de archivos">
                      <IconoDescarga /> Descargar
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          {!enlaces && <p className="mt-2 text-xs text-gris">Las descargas se activarán al conectar el almacenamiento de archivos.</p>}
        </section>
      ))}

      {/* Qué sigue */}
      <section className="mt-12">
        <h2 className="font-display text-3xl tracking-tight">Qué sigue</h2>
        <ol className="mt-5 space-y-4">
          {[
            ["Descarga tus archivos", "Guárdalos en un lugar seguro."],
            ["Llévalos con un profesional local", "Para revisarlos con el reglamento de tu municipio y tu terreno."],
            ["Construye a tu ritmo", "Por etapas o de una vez, como te convenga."],
          ].map(([t, d], i) => (
            <li key={t} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-arena text-sm font-medium">{i + 1}</span>
              <div>
                <p className="font-medium">{t}</p>
                <p className="text-sm text-gris">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Upsell: después de la compra, nunca antes */}
      {principal && (
        <section className="mt-14 rounded-3xl bg-noche p-6 text-hueso sm:p-10">
          <h2 className="font-display text-4xl leading-tight tracking-tight">¿Quieres adaptar esta casa exactamente a tu terreno?</h2>
          <p className="mt-3 text-hueso/70">Nuestro equipo puede ajustar {principal.nombre} a tu terreno, tu familia y tu presupuesto.</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {SERVICIOS.slice(0, 4).map((s) => (
              <li key={s.titulo} className="rounded-2xl bg-hueso/5 p-4">
                <p className="font-medium">{s.titulo}</p>
                <p className="mt-1 text-sm text-hueso/60">{s.texto}</p>
              </li>
            ))}
          </ul>
          <Link href={`/adaptar?proyecto=${principal.slug}`} className={`${claseBoton("acento")} mt-8`}>
            Quiero adaptarla <IconoFlecha />
          </Link>
        </section>
      )}
    </div>
  );
}
