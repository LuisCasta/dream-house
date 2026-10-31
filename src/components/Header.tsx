"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Dialogo from "./Dialogo";
import Logo from "./Logo";

const OPCIONES = [
  { href: "/planos/", texto: "Planos" },
  { href: "/nosotros/", texto: "Conoce Dream House" },
  { href: "/adaptar/", texto: "Proyecto personalizado" },
  { href: "/ayuda/", texto: "Ayuda" },
];

export default function Header() {
  const [abierto, setAbierto] = useState(false);
  useEffect(() => {
    const escritorio = window.matchMedia("(min-width: 768px)");
    const cerrarEnEscritorio = () => {
      if (escritorio.matches) setAbierto(false);
    };
    escritorio.addEventListener("change", cerrarEnEscritorio);
    return () => escritorio.removeEventListener("change", cerrarEnEscritorio);
  }, []);
  return (
    <header className="cabecera">
      <div className="ancho flex min-h-20 items-center justify-between gap-3">
        <Logo />
        <nav
          aria-label="Principal"
          className="nav-escritorio items-center gap-8 text-sm"
        >
          {OPCIONES.map((opcion) => (
            <Link key={opcion.href} href={opcion.href} className="py-3">
              {opcion.texto}
            </Link>
          ))}
        </nav>
        <button
          className="hamburguesa"
          aria-label="Abrir menú"
          aria-expanded={abierto}
          aria-haspopup="dialog"
          onClick={() => setAbierto(true)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      {abierto && (
        <Dialogo
          titulo="Menú principal"
          cerrar={() => setAbierto(false)}
          className="menu-movil"
        >
          <div className="menu-movil-titulo">
            <p className="sobrelinea">EXPLORA DREAM HOUSE</p>
            <button
              className="cerrar"
              aria-label="Cerrar menú"
              onClick={() => setAbierto(false)}
            >
              ×
            </button>
          </div>
          <nav aria-label="Navegación móvil">
            {OPCIONES.map((opcion) => (
              <Link
                key={opcion.href}
                href={opcion.href}
                onClick={() => setAbierto(false)}
              >
                {opcion.texto}
                <span aria-hidden>↗</span>
              </Link>
            ))}
          </nav>
        </Dialogo>
      )}
    </header>
  );
}
