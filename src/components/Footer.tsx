import Link from "next/link";
export default function Footer() {
  return (
    <footer className="pie">
      <div className="ancho flex flex-col gap-5 py-7 text-xs text-gris md:flex-row md:items-center md:justify-between">
        <nav
          aria-label="Soporte y políticas"
          className="flex flex-wrap gap-x-6 gap-y-4"
        >
          <Link href="/nosotros/">Conoce Dream House</Link>
          <Link href="/recuperar">Recuperar mis archivos</Link>
          <Link href="/ayuda">Ayuda</Link>
          <Link href="/contacto">Soporte</Link>
          <Link href="/legal/terminos">Condiciones</Link>
          <Link href="/legal/privacidad">Privacidad</Link>
          <Link href="/legal/politica-de-compra">Política de compra</Link>
        </nav>
        <p>Dream House · Propuesta visual y compra demo</p>
      </div>
    </footer>
  );
}
