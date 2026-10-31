"use client";
import Link from "next/link";
import { CONTACTO, enlaceWhatsApp } from "@/config/sitio";
import { track } from "@/lib/analytics";

export default function ContactoProyecto({
  nombre,
  slug,
  children = "Consultar adaptación",
  mensaje,
}: {
  nombre?: string;
  slug?: string;
  children?: React.ReactNode;
  mensaje?: string;
}) {
  const mensajeContacto =
    mensaje ??
    (nombre
      ? `Hola, quiero cotizar la adaptación de ${nombre}.`
      : "Hola, quiero cotizar un proyecto personalizado.");
  const registrar = () => track("demo_contact", { proyecto: slug ?? null });
  return CONTACTO.pendiente ? (
    <Link
      href={`/adaptar/${slug ? `?proyecto=${slug}` : ""}`}
      onClick={registrar}
      className="enlace"
    >
      {children} <span aria-hidden>↗</span>
    </Link>
  ) : (
    <a
      href={enlaceWhatsApp(mensajeContacto)}
      onClick={registrar}
      target="_blank"
      rel="noopener noreferrer"
      className="enlace"
    >
      {children} <span aria-hidden>↗</span>
    </a>
  );
}
