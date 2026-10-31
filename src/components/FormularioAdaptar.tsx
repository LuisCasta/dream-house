"use client";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { CONTACTO, enlaceWhatsApp } from "@/config/sitio";
import { PROYECTOS } from "@/data/proyectos";
import { track } from "@/lib/analytics";

export default function FormularioAdaptar() {
  const params = useSearchParams();
  const [mensajePreparado, setMensajePreparado] = useState("");
  const enviar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const p = PROYECTOS.find((x) => x.slug === d.get("proyecto"));
    const mensaje = [
      "Hola, quiero cotizar una adaptación o un proyecto personalizado.",
      p ? `Proyecto: ${p.nombre}` : "Aún no elijo proyecto.",
      `Mi terreno mide: ${d.get("terreno") || "por definir"}`,
      d.get("mensaje") ? `Detalles: ${d.get("mensaje")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    track("demo_contact", { proyecto: p?.slug ?? null });
    setMensajePreparado(mensaje);
  };
  return (
    <form onSubmit={enviar} className="space-y-5">
      <label className="block text-sm">
        Proyecto
        <select
          name="proyecto"
          defaultValue={params.get("proyecto") ?? ""}
          className="campo mt-2"
        >
          <option value="">Proyecto personalizado</option>
          {PROYECTOS.map((p) => (
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
        Adaptación con cotización separada.{" "}
        {CONTACTO.pendiente
          ? "Canal de contacto por confirmar. Puedes preparar tu mensaje; no se enviará."
          : "Revisa el mensaje antes de abrir WhatsApp."}
      </p>
      <button type="submit" className="boton w-full">
        Preparar consulta
      </button>
      {mensajePreparado && (
        <div className="aviso" role="status">
          <p className="whitespace-pre-line">{mensajePreparado}</p>
          {CONTACTO.pendiente ? (
            <p className="font-medium mt-4">
              Consulta preparada. No se envió: falta confirmar el contacto del
              negocio.
            </p>
          ) : (
            <a
              className="enlace inline-block mt-4"
              href={enlaceWhatsApp(mensajePreparado)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Continuar en WhatsApp →
            </a>
          )}
        </div>
      )}
    </form>
  );
}
