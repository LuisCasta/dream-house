"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Proyecto } from "@/data/proyectos";
import { agregarAlCarrito } from "@/lib/carrito";
import { track, vieneDeRedes } from "@/lib/analytics";
import { precio } from "@/lib/formato";
import { useMontado } from "@/lib/useMontado";
import { claseBoton } from "../ui";
import Plano from "../ilustraciones/Plano";

export function useComprar(p: Proyecto) {
  const router = useRouter();
  return (paquete = p.paquetes[0].id) => {
    agregarAlCarrito({ slug: p.slug, paquete });
    router.push("/checkout");
  };
}

export function BotonComprar({ p, className = "" }: { p: Proyecto; className?: string }) {
  const comprar = useComprar(p);
  return (
    <button type="button" onClick={() => comprar()} className={`${claseBoton("acento")} w-full ${className}`}>
      Comprar proyecto
    </button>
  );
}

// Registra la vista del proyecto una sola vez.
export function VistaProyecto({ p }: { p: Proyecto }) {
  useEffect(() => {
    track("view_project", { proyecto: p.slug, codigo: p.codigo, precio: p.paquetes[0].precio });
  }, [p]);
  return null;
}

// "¿Viste Casa Brisa en Dream House?" — solo para visitas que vienen de redes.
export function ReferenciaSocial({ p }: { p: Proyecto }) {
  const params = useSearchParams();
  const montado = useMontado();
  if (!montado || !vieneDeRedes(new URLSearchParams(params.toString()))) return null;
  return (
    <div className="mb-4 rounded-2xl bg-noche px-4 py-3 text-sm text-hueso">
      <span className="font-medium">¿Viste {p.nombre} en Dream House?</span>{" "}
      <span className="text-hueso/70">Este es el proyecto completo.</span>
    </div>
  );
}

// Barra de compra fija en móvil: aparece cuando el botón principal sale de pantalla.
export function CompraFijaMovil({ p, ancla }: { p: Proyecto; ancla: string }) {
  const [visible, setVisible] = useState(false);
  const comprar = useComprar(p);

  useEffect(() => {
    const el = document.getElementById(ancla);
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, [ancla]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-linea bg-hueso/95 px-4 pt-3 backdrop-blur-md transition-transform duration-300 sm:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{p.nombre}</p>
          <p className="text-xs text-gris">{precio(p.paquetes[0].precio)}</p>
        </div>
        <button type="button" onClick={() => comprar()} tabIndex={visible ? 0 : -1} className={`${claseBoton("acento")} min-h-11 px-5`}>
          Comprar
        </button>
      </div>
    </div>
  );
}

// Planta con pestañas por nivel; registra `view_floorplan` al verla.
export function PlantaInteractiva({ p }: { p: Proyecto }) {
  const [planta, setPlanta] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const vista = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !vista.current) {
        vista.current = true;
        track("view_floorplan", { proyecto: p.slug, planta: 1 });
      }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [p.slug]);

  return (
    <div ref={ref}>
      {p.plantas === 2 && (
        <div className="mb-4 inline-flex rounded-full bg-arena p-1" role="tablist" aria-label="Nivel">
          {[1, 2].map((n) => (
            <button
              key={n}
              role="tab"
              aria-selected={planta === n}
              onClick={() => {
                setPlanta(n);
                track("view_floorplan", { proyecto: p.slug, planta: n });
              }}
              className={`min-h-10 rounded-full px-5 text-sm transition ${planta === n ? "bg-white font-medium shadow-sm" : "text-gris"}`}
            >
              {n === 1 ? "Planta baja" : "Planta alta"}
            </button>
          ))}
        </div>
      )}
      <div className="overflow-hidden rounded-3xl border border-linea bg-[#fbf9f5] p-3 sm:p-6">
        <Plano p={p} planta={planta} className="mx-auto max-h-[70vh] w-full" />
      </div>
    </div>
  );
}
