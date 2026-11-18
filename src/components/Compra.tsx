"use client";
import Link from "next/link";
import { track } from "@/lib/analytics";
import { linkPago, type Proyecto } from "@/data/proyectos";
import { guardarSeleccion } from "@/lib/seleccion";

export default function Compra({
  p,
  className = "",
}: {
  p: Proyecto;
  className?: string;
}) {
  if (p.estado === "proximamente")
    return <span className={`estado-proximamente ${className}`}>Próximamente</span>;
  const link = linkPago(p);
  if (link)
    return (
      <a
        href={link}
        className={`boton ${className}`}
        onClick={() => {
          guardarSeleccion(p.slug);
          track("begin_checkout", { proyecto: p.slug, proveedor: "stripe" });
        }}
      >
        Comprar planos <span aria-hidden>→</span>
      </a>
    );
  return (
    <Link href="/contacto/" className={`boton ${className}`}>
      Consultar compra <span aria-hidden>→</span>
    </Link>
  );
}
