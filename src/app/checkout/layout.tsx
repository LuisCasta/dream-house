import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import { IconoAtras, IconoCandado } from "@/components/Iconos";

export const metadata: Metadata = { title: "Pago", robots: { index: false } };

// Checkout sin navegación ni distracciones.
export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-linea bg-hueso">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link href="/planos" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-arena sm:hidden" aria-label="Volver">
            <IconoAtras className="h-5 w-5" />
          </Link>
          <Logo />
          <span className="flex items-center gap-1.5 text-xs text-gris">
            <IconoCandado className="h-4 w-4" />
            <span className="hidden sm:inline">Pago seguro</span>
          </span>
        </div>
      </header>
      <main className="flex-1 pb-16">{children}</main>
    </>
  );
}
