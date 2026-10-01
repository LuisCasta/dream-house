import Link from "next/link";
import { CONTACTO, DATOS_FISCALES, REDES, SITIO } from "@/config/sitio";
import Logo from "./Logo";
import { Pendiente } from "./ui";

const columnas = [
  {
    titulo: "Proyectos",
    links: [
      { href: "/planos", texto: "Todos los planos" },
      { href: "/planos/7x15", texto: "Terrenos 7 × 15" },
      { href: "/planos/10x15", texto: "Terrenos 10 × 15" },
      { href: "/adaptar", texto: "Adaptar un proyecto" },
    ],
  },
  {
    titulo: "Ayuda",
    links: [
      { href: "/como-funciona", texto: "Cómo funciona" },
      { href: "/que-incluye", texto: "Qué incluye tu proyecto" },
      { href: "/ayuda", texto: "Preguntas frecuentes" },
      { href: "/contacto", texto: "Contacto" },
    ],
  },
  {
    titulo: "Legal",
    links: [
      { href: "/legal/terminos", texto: "Términos" },
      { href: "/legal/privacidad", texto: "Privacidad" },
      { href: "/legal/politica-de-compra", texto: "Política de compra" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-linea bg-arena/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-gris">
            Proyectos arquitectónicos para terrenos reales. Compra el proyecto, adáptalo localmente y construye a tu ritmo.
          </p>
          <div className="space-y-1 text-sm">
            <p>
              <a href={`mailto:${CONTACTO.email}`} className="hover:text-oro-oscuro">{CONTACTO.email}</a>
            </p>
            <p className="flex flex-wrap items-center gap-2">
              WhatsApp {CONTACTO.whatsappVisible}
              {CONTACTO.pendiente && <Pendiente />}
            </p>
          </div>
        </div>
        {columnas.map((c) => (
          <div key={c.titulo}>
            <h3 className="text-sm font-medium">{c.titulo}</h3>
            <ul className="mt-3 space-y-2.5 text-sm text-gris">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-noche">{l.texto}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-linea">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-6 text-xs text-gris sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            © {new Date().getFullYear()} {SITIO.nombreCompleto} · {DATOS_FISCALES.razonSocial} · {DATOS_FISCALES.rfc}
            {DATOS_FISCALES.pendiente && <Pendiente />}
          </div>
          <ul className="flex flex-wrap gap-4">
            {REDES.map((r) => (
              <li key={r.nombre}>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="hover:text-noche">{r.nombre}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
