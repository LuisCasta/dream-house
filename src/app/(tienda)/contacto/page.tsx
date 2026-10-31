import type { Metadata } from "next";
import Link from "next/link";
import { CONTACTO, enlaceWhatsApp } from "@/config/sitio";
export const metadata: Metadata = { title: "Contacto y soporte" };
export default function Contacto() {
  return (
    <div className="ancho pagina-ayuda">
      <p className="sobrelinea">CONTACTO Y SOPORTE</p>
      <h1 className="titulo-pagina">Hablemos de tu proyecto.</h1>
      <p className="text-gris mt-5 max-w-xl">
        Para una adaptación, una casa a tu medida o ayuda con tus archivos.
      </p>
      <div className="panel p-7 mt-8 max-w-2xl">
        {CONTACTO.pendiente ? (
          <>
            <h2 className="font-display text-2xl">
              Canales de contacto por confirmar
            </h2>
            <p className="text-gris mt-3">
              Esta versión es una demostración. El WhatsApp y correo del negocio
              todavía no están confirmados.
            </p>
            <Link href="/adaptar" className="enlace inline-block mt-5">
              Preparar una consulta de adaptación →
            </Link>
          </>
        ) : (
          <>
            <a
              className="boton"
              href={enlaceWhatsApp("Hola, necesito ayuda con Dream House.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contactar por WhatsApp
            </a>
            <a className="enlace block mt-5" href={`mailto:${CONTACTO.email}`}>
              {CONTACTO.email}
            </a>
          </>
        )}
      </div>
      <div className="flex flex-wrap gap-6 mt-8">
        <Link className="enlace" href="/recuperar">
          Recuperar mis archivos
        </Link>
        <Link className="enlace" href="/planos">
          Volver al catálogo
        </Link>
      </div>
    </div>
  );
}
