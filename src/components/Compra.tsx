"use client";
import Link from "next/link";
import { checkoutUrl } from "@/lib/rutas";
import { track } from "@/lib/analytics";
import type { Proyecto } from "@/data/proyectos";
import { guardarSeleccion } from "@/lib/seleccion";

export default function Compra({
  p,
  className = "",
}: {
  p: Proyecto;
  className?: string;
}) {
  return (
    <Link
      href={checkoutUrl(p.slug)}
      className={`boton ${className}`}
      onClick={() => {
        guardarSeleccion(p.slug);
        track("demo_begin_checkout", { proyecto: p.slug });
      }}
    >
      Comprar planos <span aria-hidden>→</span>
    </Link>
  );
}
