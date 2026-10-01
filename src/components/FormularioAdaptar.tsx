"use client";

import { useSearchParams } from "next/navigation";
import { enlaceWhatsApp } from "@/config/sitio";
import { PROYECTOS } from "@/data/proyectos";
import { track } from "@/lib/analytics";
import { IconoWhatsApp } from "./Iconos";
import { claseBoton } from "./ui";

// Solicitud de adaptación: arma un mensaje y abre WhatsApp.
// BACKLOG: guardar la solicitud en un CRM o enviarla por email (ver BACKLOG.md).
export default function FormularioAdaptar() {
  const params = useSearchParams();
  const proyecto = params.get("proyecto") ?? "";
  const terreno = params.get("terreno") ?? "";

  const enviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const p = PROYECTOS.find((x) => x.slug === d.get("proyecto"));
    const mensaje = [
      `Hola, soy ${d.get("nombre")}. Quiero adaptar un proyecto.`,
      p ? `Proyecto: ${p.nombre} (${p.codigo})` : "Aún no elijo proyecto.",
      `Mi terreno mide: ${d.get("terreno") || "no lo sé"}`,
      d.get("mensaje") ? `Detalles: ${d.get("mensaje")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    track("request_modification", { proyecto: p?.slug ?? null, terreno: d.get("terreno") });
    window.open(enlaceWhatsApp(mensaje), "_blank", "noopener");
  };

  const campo = "mt-1.5 w-full rounded-xl border border-linea bg-white px-4 py-3.5 text-base outline-none focus:border-noche";

  return (
    <form onSubmit={enviar} className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium">Tu nombre</span>
        <input name="nombre" required autoComplete="name" className={campo} />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Proyecto</span>
        <select name="proyecto" defaultValue={proyecto} className={campo}>
          <option value="">Aún no elijo</option>
          {PROYECTOS.map((p) => (
            <option key={p.slug} value={p.slug}>{p.nombre}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-medium">¿Cuánto mide tu terreno?</span>
        <input name="terreno" defaultValue={terreno.replace("x", " × ")} placeholder="Ej. 8 × 17 m" className={campo} />
      </label>
      <label className="block">
        <span className="text-sm font-medium">¿Qué te gustaría cambiar? <span className="font-normal text-gris">(opcional)</span></span>
        <textarea name="mensaje" rows={3} className={campo} />
      </label>
      <button type="submit" className={`${claseBoton()} w-full`}>
        <IconoWhatsApp className="h-5 w-5" /> Enviar por WhatsApp
      </button>
    </form>
  );
}
