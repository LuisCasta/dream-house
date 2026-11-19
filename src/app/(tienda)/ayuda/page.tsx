import Link from "next/link";
import type { Metadata } from "next";
import { CONTACTO, enlaceWhatsApp } from "@/config/sitio";
export const metadata: Metadata = {
  title: "Ayuda",
  description: "Resuelve tus dudas sobre Casa Brisa, los documentos del proyecto y las consultas de adaptación. Contacta a Dream House por WhatsApp o correo.",
};
export default function Ayuda() {
  return (
    <div className="ancho pagina-ayuda">
      <p className="sobrelinea">ESTAMOS PARA AYUDARTE</p>
      <h1 className="titulo-pagina">¿En qué te ayudamos?</h1>
      <div className="grid gap-5 md:grid-cols-2 mt-9">
        <a className="panel bloque-ayuda" href={`mailto:${CONTACTO.email}?subject=${encodeURIComponent("Ayuda con mis archivos de Dream House")}`}>
          <span aria-hidden>✉</span>
          <h2>Ayuda con mis archivos</h2>
          <p>Escríbenos con el nombre del proyecto y los datos de tu pedido para revisar tu solicitud.</p>
          <span className="enlace">Escribir por correo →</span>
        </a>
        <a className="panel bloque-ayuda" href={enlaceWhatsApp("Hola, tengo una consulta sobre un proyecto de Dream House.")} target="_blank" rel="noopener noreferrer">
          <span aria-hidden>⌁</span>
          <h2>Hablar con Dream House</h2>
          <p>Consulta el contenido del proyecto o cuéntanos qué necesitas para tu terreno.</p>
          <span className="enlace">Contactar por WhatsApp →</span>
        </a>
      </div>
      <section className="preguntas">
        <h2 className="font-display text-3xl mb-5">Antes de elegir tu casa</h2>
        <details>
          <summary>¿Puedo comprar y descargar planos ahora?</summary>
          <p>
            Sí, la compra y la descarga automática de los planos están habilitadas.
            Realiza tu pago con Stripe y, una vez que se acredite, podrás descargar
            el archivo ZIP con los planos, renders y demás documentos incluidos en
            el paquete de tu proyecto.
          </p>
        </details>
        <details>
          <summary>¿Qué incluye el paquete?</summary>
          <p>
            Casa Brisa incluye la planta arquitectónica acotada, la fachada
            principal, cortes longitudinal y transversal, y la planta de
            cimentación en PDF, además de imágenes de los renders de fachada e
            interiores. El paquete no incluye archivo DWG, cálculo estructural,
            proyectos de instalaciones, trámites ni adaptación al terreno.
          </p>
          <Link href="/brisa/" className="enlace">Ver Casa Brisa y sus entregables →</Link>
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
            Comparte las medidas de tu terreno y los cambios que necesitas en
            Proyecto personalizado. Revisa el mensaje y envíalo por WhatsApp.
            La viabilidad, el alcance y el precio se revisan para cada solicitud;
            la adaptación se cotiza por separado del paquete de planos.
          </p>
          <Link href="/adaptar" className="enlace">
            Consultar proyecto personalizado →
          </Link>
        </details>
        <details>
          <summary>¿Qué pasa con los otros proyectos del catálogo?</summary>
          <p>Están en preparación. Puedes ver su imagen conceptual y solicitar un aviso por correo desde su ficha. El mensaje identifica el proyecto que te interesa; envíalo para completar tu solicitud.</p>
        </details>
      </section>
      <section className="panel p-7 mt-9" aria-labelledby="contacto-ayuda">
        <h2 id="contacto-ayuda" className="font-display text-2xl">¿Necesitas atención?</h2>
        <div className="flex flex-wrap gap-5 mt-4">
          <a className="enlace" href={enlaceWhatsApp("Hola, necesito ayuda con Dream House.")} target="_blank" rel="noopener noreferrer">WhatsApp {CONTACTO.whatsappVisible}</a>
          <a className="enlace break-all" href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a>
        </div>
      </section>
    </div>
  );
}
