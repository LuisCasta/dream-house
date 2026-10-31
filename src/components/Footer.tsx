import Link from "next/link";
import Logo from "./Logo";
import { CONTACTO, REDES, SITIO, enlaceWhatsApp } from "@/config/sitio";
import { COMPRA_REAL_HABILITADA } from "@/config/compra";

export default function Footer() {
  const redesConfirmadas = REDES.filter((r) => !r.pendiente);
  return (
    <footer className="pie pie-compacto">
      <div className="ancho">
        <div className="pie-primera-fila">
          <Logo />
          <nav aria-label="Soporte y políticas">
            <Link href="/nosotros/">Conoce Dream House</Link>
            <Link href="/ayuda/">Ayuda</Link>
            <Link href="/recuperar/">Recuperar archivos</Link>
            <Link href="/contacto/">Contacto</Link>
            <Link href="/legal/terminos/">Términos</Link>
            <Link href="/legal/privacidad/">Privacidad</Link>
            <Link href="/legal/politica-de-compra/">Política de compra</Link>
          </nav>
        </div>
        {(!CONTACTO.pendiente || redesConfirmadas.length > 0) && (
          <div className="pie-contactos">
            {!CONTACTO.pendiente && (
              <>
                <a
                  href={enlaceWhatsApp("Hola, necesito ayuda con Dream House.")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp {CONTACTO.whatsappVisible}
                </a>
                <a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a>
              </>
            )}
            {redesConfirmadas.map((r) => (
              <a
                key={r.nombre}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {r.nombre}
              </a>
            ))}
          </div>
        )}
        <div className="pie-ultima-fila">
          <p>
            © {new Date().getFullYear()} {SITIO.nombre}
          </p>
          <p>
            {COMPRA_REAL_HABILITADA
              ? "Proyectos arquitectónicos · Entrega digital"
              : "Versión de demostración · Sin cobros reales"}
          </p>
        </div>
      </div>
    </footer>
  );
}
