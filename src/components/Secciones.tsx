import Link from "next/link";
import { ARQUITECTO, GARANTIAS } from "@/config/sitio";
import { LIMITES, PREGUNTAS, type Pregunta } from "@/data/contenido";
import type { Entregable } from "@/data/proyectos";
import { IconoCandado, IconoCheck, IconoDocumento, IconoNube, IconoSoporte } from "./Iconos";
import { BloquePendiente, Pendiente } from "./ui";

export function QueRecibes({ entregables }: { entregables: Entregable[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {entregables.map((e) => (
        <li key={e.id} className="flex gap-4 rounded-2xl border border-linea bg-white/70 p-5">
          <IconoDocumento formato={e.formato} className="h-12 w-10 shrink-0" />
          <div>
            <p className="flex flex-wrap items-center gap-2 font-medium">
              {e.nombre} <span className="text-xs font-normal text-gris">· {e.formato}</span>
              {e.pendiente && <Pendiente />}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-gris">{e.descripcion}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Garantias({ className = "" }: { className?: string }) {
  const items = [
    GARANTIAS.entregaDigital && { icono: <IconoNube className="h-5 w-5" />, titulo: "Entrega digital", texto: "Descarga tus archivos al terminar el pago." },
    GARANTIAS.pagoSeguro && { icono: <IconoCandado className="h-5 w-5" />, titulo: "Pago seguro", texto: "Procesado por una pasarela de pago reconocida." },
    GARANTIAS.soporte && { icono: <IconoSoporte className="h-5 w-5" />, titulo: "Soporte después de tu compra", texto: "Resolvemos tus dudas sobre el proyecto." },
  ].filter(Boolean) as { icono: React.ReactNode; titulo: string; texto: string }[];
  return (
    <ul className={`grid gap-4 sm:grid-cols-3 ${className}`}>
      {items.map((g) => (
        <li key={g.titulo} className="flex gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-arena text-noche">{g.icono}</span>
          <div>
            <p className="text-sm font-medium">{g.titulo}</p>
            <p className="text-sm text-gris">{g.texto}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Transparencia() {
  return (
    <div className="rounded-3xl bg-arena/70 p-6 sm:p-10">
      <p className="font-display text-3xl leading-tight tracking-tight sm:text-4xl">
        Compra el proyecto. Adáptalo localmente. <em className="text-oro-oscuro">Construye a tu ritmo.</em>
      </p>
      <p className="mt-4 max-w-2xl leading-relaxed text-gris">
        Un proyecto prediseñado te ahorra empezar desde cero, pero cada terreno es distinto. Antes de construir, un profesional local debe revisar:
      </p>
      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {LIMITES.map((l) => (
          <li key={l} className="flex items-start gap-2.5 text-sm">
            <IconoCheck className="mt-0.5 h-4 w-4 shrink-0 text-oro-oscuro" />
            {l}
          </li>
        ))}
      </ul>
      <Link href="/adaptar" className="mt-6 inline-block text-sm font-medium underline decoration-noche/30 underline-offset-4 hover:decoration-oro">
        ¿Necesitas ayuda para adaptarla?
      </Link>
    </div>
  );
}

export function Arquitecto() {
  return (
    <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-arena font-display text-3xl text-gris" aria-hidden>
        DH
      </div>
      <div>
        <p className="flex flex-wrap items-center gap-2 text-lg font-medium">
          {ARQUITECTO.nombre} {ARQUITECTO.pendiente && <Pendiente />}
        </p>
        <p className="text-sm text-gris">{ARQUITECTO.cedula}</p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-gris">{ARQUITECTO.descripcion}</p>
      </div>
    </div>
  );
}

export function Testimonios() {
  // No inventar testimonios. Cuando existan, reemplazar este bloque por testimonios reales
  // (nombre, ciudad y, de ser posible, foto de la obra con autorización).
  return (
    <BloquePendiente titulo="Testimonios de clientes">
      Este espacio mostrará opiniones reales de personas que compraron un proyecto. No se publicarán testimonios hasta tenerlos.
    </BloquePendiente>
  );
}

export function ListaPreguntas({ preguntas = PREGUNTAS }: { preguntas?: Pregunta[] }) {
  return (
    <div className="divide-y divide-linea border-y border-linea">
      {preguntas.map((q) => (
        <details key={q.p} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[17px] font-medium [&::-webkit-details-marker]:hidden">
            {q.p}
            <span className="mt-0.5 text-2xl leading-none font-light text-gris transition group-open:rotate-45" aria-hidden>+</span>
          </summary>
          <p className="mt-3 max-w-2xl leading-relaxed text-gris">
            {q.r} {q.pendiente && <Pendiente className="ml-1 align-middle" />}
          </p>
        </details>
      ))}
    </div>
  );
}
