"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCarrito } from "@/lib/carrito";
import Logo from "./Logo";
import { IconoCarrito, IconoCerrar, IconoMenu } from "./Iconos";

export const NAV = [
  { href: "/planos", texto: "Planos" },
  { href: "/como-funciona", texto: "Cómo funciona" },
  { href: "/adaptar", texto: "¿Ya tienes terreno?" },
  { href: "/ayuda", texto: "Ayuda" },
];

function Carrito() {
  const items = useCarrito();
  return (
    <Link href="/checkout" className="relative flex h-11 w-11 items-center justify-center rounded-full hover:bg-arena" aria-label={`Carrito, ${items.length} proyectos`}>
      <IconoCarrito className="h-[22px] w-[22px]" />
      {items.length > 0 && (
        <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-oro px-1 text-[10px] font-semibold text-noche">
          {items.length}
        </span>
      )}
    </Link>
  );
}

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  const ruta = usePathname();

  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
  }, [abierto]);

  return (
    <header className="sticky top-0 z-40 border-b border-linea/70 bg-hueso/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-full px-4 py-2 text-sm transition hover:bg-arena ${ruta.startsWith(n.href) ? "text-noche" : "text-gris"}`}
            >
              {n.texto}
            </Link>
          ))}
        </nav>
        <div className="flex items-center">
          <Carrito />
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-arena md:hidden"
            onClick={() => setAbierto(true)}
            aria-label="Abrir menú"
            aria-expanded={abierto}
          >
            <IconoMenu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {abierto && (
        <div className="fixed inset-0 z-50 flex flex-col bg-hueso md:hidden" role="dialog" aria-modal="true" aria-label="Menú">
          <div className="flex h-16 items-center justify-between border-b border-linea px-5">
            <Logo />
            <button type="button" onClick={() => setAbierto(false)} className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-arena" aria-label="Cerrar menú">
              <IconoCerrar className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 px-5 py-8" aria-label="Principal">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setAbierto(false)} className="border-b border-linea py-4 font-display text-4xl">
                {n.texto}
              </Link>
            ))}
            <Link href="/contacto" onClick={() => setAbierto(false)} className="py-4 font-display text-4xl text-gris">
              Contacto
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
