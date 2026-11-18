import type { Metadata } from "next";
import Logo from "@/components/Logo";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Compra de planos",
  robots: { index: false },
};
export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="cabecera">
        <div className="ancho flex min-h-20 items-center justify-between">
          <Logo />
          <span className="text-xs text-gris">Compra de planos</span>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="pie">
        <div className="ancho py-6 text-center text-sm">
          <Link href="/ayuda" className="enlace">
            ¿Necesitas ayuda?
          </Link>
          <p className="nota mt-3">
            Descarga tus planos una vez acreditado el pago.
          </p>
        </div>
      </footer>
    </>
  );
}
