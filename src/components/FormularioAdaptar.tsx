"use client";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { CONTACTO, enlaceWhatsApp } from "@/config/sitio";
import { PROYECTOS } from "@/data/proyectos";
import { track } from "@/lib/analytics";

export default function FormularioAdaptar() {
  const params = useSearchParams();
  const proyectosListos = PROYECTOS.filter((p) => p.estado === "listo");
  const [mensajePreparado, setMensajePreparado] = useState("");
  const enviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const p = proyectosListos.find((x) => x.slug === d.get("proyecto"));
    const mensaje = [
      "Hola, quiero cotizar una adaptación o un proyecto personalizado.",
      p ? `Proyecto: ${p.nombre}` : "Aún no elijo proyecto.",
      `Mi terreno mide: ${d.get("terreno") || "por definir"}`,
      d.get("mensaje") ? `Detalles: ${d.get("mensaje")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    track("prepare_modification_request", { proyecto: p?.slug ?? null });
    setMensajePreparado(mensaje);
  };
  return (
    <form onSubmit={enviar} className="space-y-5" data-clarity-mask="true">
      <label className="block text-sm">
        Proyecto
        <select
          name="proyecto"
          defaultValue={proyectosListos.some((p) => p.slug === params.get("proyecto")) ? params.get("proyecto")! : ""}
          className="campo mt-2"
        >
          <option value="">Proyecto personalizado</option>
          {proyectosListos.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.nombre}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm">
        Medidas de tu terreno
        <input
          name="terreno"
          defaultValue={params.get("terreno")?.replace("x", " × ") ?? ""}
          placeholder="Ej. 8 × 17 m"
          className="campo mt-2"
        />
      </label>
      <label className="block text-sm">
        ¿Qué te gustaría cambiar?
        <textarea name="mensaje" rows={3} className="campo mt-2" />
      </label>
      <p className="nota">
        Adaptación con cotización separada. Revisa el mensaje antes de abrir WhatsApp.
      </p>
      <button type="submit" className="boton w-full">
        Preparar consulta
      </button>
      {mensajePreparado && (
        <div className="aviso" role="status">
          <p className="whitespace-pre-line">{mensajePreparado}</p>
          <button
              type="button"
              className="enlace inline-block mt-4"
              onClick={() => {
                track("request_modification", { canal: "whatsapp" });
                window.open(enlaceWhatsApp(mensajePreparado), "_blank", "noopener,noreferrer");
              }}
            >
              Continuar en WhatsApp →
            </button>
          <p className="nota mt-3">Se abrirá WhatsApp para {CONTACTO.whatsappVisible}. Envía el mensaje para completar la consulta.</p>
        </div>
      )}
    </form>
  );
}
