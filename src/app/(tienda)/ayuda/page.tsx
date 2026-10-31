import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Ayuda" };
export default function Ayuda() {
  return (
    <div className="ancho pagina-ayuda">
      <p className="sobrelinea">ESTAMOS PARA AYUDARTE</p>
      <h1 className="titulo-pagina">¿En qué te ayudamos?</h1>
      <div className="grid gap-5 md:grid-cols-2 mt-9">
        <Link className="panel bloque-ayuda" href="/recuperar">
          <span aria-hidden>✉</span>
          <h2>Recuperar mis archivos</h2>
          <p>Solicita un enlace con tu correo de compra.</p>
          <span className="enlace">Recuperar acceso →</span>
        </Link>
        <Link className="panel bloque-ayuda" href="/contacto">
          <span aria-hidden>⌁</span>
          <h2>Ayuda con mi compra</h2>
          <p>Consulta los canales de soporte disponibles.</p>
          <span className="enlace">Contactar soporte →</span>
        </Link>
      </div>
      <section className="preguntas">
        <h2 className="font-display text-3xl mb-5">Antes de elegir tu casa</h2>
        <details>
          <summary>¿Puedo comprar y descargar planos ahora?</summary>
          <p>
            Este sitio es una demostración. Los precios, proyectos y paquetes
            son de ejemplo. Puedes simular un pago, pero no se cobra ni se
            entregan planos reales.
          </p>
        </details>
        <details>
          <summary>¿Qué incluye el paquete?</summary>
          <p>
            La ficha muestra los entregables de ejemplo y sus formatos. El DWG
            editable está pendiente de confirmar. No incluye cálculo
            estructural, instalaciones, trámites ni adaptación.
          </p>
        </details>
        <details>
          <summary>¿La casa cabe en mi terreno?</summary>
          <p>
            Las dimensiones son una referencia. Un profesional local debe
            revisar orientación, normativa, suelo y restricciones del terreno
            antes de construir.
          </p>
        </details>
        <details>
          <summary>¿Puedo adaptar un proyecto?</summary>
          <p>
            Sí puedes preparar una consulta con el nombre de la casa. La
            adaptación requiere una cotización separada. El canal de contacto
            aún está por confirmar.
          </p>
          <Link href="/adaptar" className="enlace">
            Consultar proyecto personalizado →
          </Link>
        </details>
      </section>
    </div>
  );
}
